const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Helper to load .env config
function getEnvConfig() {
  const envPaths = [
    path.join(ROOT, 'api', '.env'),
    path.join(ROOT, '.env')
  ];
  const env = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    GETYOURGUIDE_PARTNER_ID: process.env.GETYOURGUIDE_PARTNER_ID || 'CUNP4U8'
  };

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
          const idx = line.indexOf('=');
          if (idx > 0) {
            const key = line.substring(0, idx).trim();
            const val = line.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
            env[key] = val;
          }
        }
      });
      break;
    }
  }
  return env;
}

// Handle AI Travel Planner API POST requests
async function handleTripPlannerApi(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body || '{}');
      const env = getEnvConfig();

      if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY === 'EnteryourAPIKey' || env.OPENAI_API_KEY === 'sk-proj-yourActualOpenAiApiKeyHere') {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({
          error: 'OpenAI API key is not configured. Please add your real key to api/.env file (OPENAI_API_KEY=sk-...)'
        }));
        return;
      }

      const destination = (payload.destination || '').trim();
      const duration = Math.min(Math.max(parseInt(payload.duration, 10) || 3, 1), 14);
      const travelStyle = payload.travelStyle || 'Balanced';
      const budget = payload.budget || 'Moderate';
      const travelers = payload.travelers || 'Solo Traveler';
      const interests = Array.isArray(payload.interests) ? payload.interests.join(', ') : (payload.interests || 'Sightseeing, Food, Culture');
      const customNotes = (payload.customNotes || '').substring(0, 300);

      if (!destination) {
        res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: 'Destination is required.' }));
        return;
      }

      const systemPrompt = "You are a world-class luxury travel curator and master local guide. Your task is to generate rich, vivid, immersive, and highly detailed travel itineraries in structured JSON format. For every single activity, provide an in-depth, engaging description of AT LEAST 50 to 75 words explaining exactly what to see, practical local secrets, sensory highlights, and why it is unmissable. ALL budgets, estimates, and financial figures MUST BE STRICTLY IN US DOLLARS (USD, $).";

      const userPrompt = `Plan an unforgettable trip with the following details:
- Destination: ${destination}
- Duration: ${duration} Days
- Travel Style: ${travelStyle}
- Budget Tier: ${budget}
- Travelers / Party: ${travelers}
- Specific Interests: ${interests}
${customNotes ? `- Special Preferences: ${customNotes}\n` : ''}

REQUIREMENTS:
1. For every activity (Morning, Afternoon, Evening), write a richly detailed, vivid description of AT LEAST 50 WORDS containing historical context, specific things to explore, local tips, and sensory details.
2. CURRENCY: ALL budget estimates MUST be in US Dollars (USD $) (e.g. "$1,200 - $1,600 USD"). Do not use INR or any other currency.
3. Provide a realistic total budget estimate in USD in estimatedTotalBudget. Do not put individual prices on activities.

Respond STRICTLY with a valid JSON object adhering to this exact schema (do not include markdown ticks, just raw JSON):
{
  "tripTitle": "Catchy and descriptive trip title",
  "tagline": "Inspiring 1-sentence trip summary",
  "destination": "${destination}",
  "bestTimeToVisit": "Ideal seasons or months and travel timing advice",
  "currency": "USD ($)",
  "estimatedTotalBudget": "Estimated price range in USD (e.g. $1,200 - $1,800 USD)",
  "weatherSummary": "Expected climate summary and temperature notes",
  "packingChecklist": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
  "localDishesToTry": [
    {"dish": "Name", "description": "Why it is special & where to find"}
  ],
  "insiderTips": ["Practical tip 1", "Safety / transport tip 2", "Money saving tip 3"],
  "days": [
    {
      "dayNumber": 1,
      "dayTitle": "Theme of the day",
      "morning": {
        "time": "09:00 AM - 12:30 PM",
        "activity": "Activity Title",
        "location": "Location Name",
        "description": "Comprehensive, engaging description of AT LEAST 50 words with specific sights, hidden corners, and practical advice."
      },
      "afternoon": {
        "time": "01:00 PM - 05:00 PM",
        "activity": "Activity Title",
        "location": "Location Name",
        "description": "Comprehensive, engaging description of AT LEAST 50 words including recommended local lunch spots and exploration highlights."
      },
      "evening": {
        "time": "06:30 PM - 10:00 PM",
        "activity": "Activity Title",
        "location": "Location Name",
        "description": "Comprehensive, engaging description of AT LEAST 50 words for dinner, twilight views, cultural entertainment, or nightlife."
      }
    }
  ]
}`;

      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
          max_tokens: 3500
        })
      });

      const openAiData = await openAiRes.json();
      if (openAiData.error) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: openAiData.error.message || 'OpenAI request failed' }));
        return;
      }

      const content = openAiData.choices?.[0]?.message?.content || '{}';
      const parsedItinerary = JSON.parse(content);
      parsedItinerary.getYourGuidePartnerId = env.GETYOURGUIDE_PARTNER_ID || 'CUNP4U8';

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ success: true, data: parsedItinerary }));
    } catch (err) {
      console.error('API Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: err.message || 'Server error processing request' }));
    }
  });
}

function requestHandler(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Block direct access to .env and hidden/sensitive files
  if (reqPath.includes('.env') || reqPath.startsWith('/.') || reqPath.includes('/.')) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden: Access to configuration and hidden files is strictly denied.');
    return;
  }

  // Handle API proxy endpoint
  if (req.method === 'POST' && (reqPath === '/api/trip-planner.php' || reqPath === '/api/trip-planner')) {
    handleTripPlannerApi(req, res);
    return;
  }

  if (reqPath === '/') reqPath = '/index.html';
  
  let filePath = path.join(ROOT, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Check if adding .html helps (e.g. /flights -> /flights.html or /ai-travel-planner -> /ai-travel-planner.html)
      const htmlPath = filePath + '.html';
      if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
        filePath = htmlPath;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    fs.createReadStream(filePath).pipe(res);
  });
}

function startServer(port) {
  const srv = http.createServer(requestHandler);
  srv.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
