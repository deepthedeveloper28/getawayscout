<?php
/**
 * AI Travel Trip Planner - Secure Backend Proxy
 * 
 * Protects your OpenAI API Key from theft and browser inspection.
 * Supports .env configuration, domain whitelisting (CORS), and IP rate limiting.
 */

// 1. Set JSON Headers
header('Content-Type: application/json; charset=utf-8');

// 2. Load Configuration / .env
function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2) + [NULL, NULL];
        if ($name !== NULL && $value !== NULL) {
            $name = trim($name);
            $value = trim(trim($value), '"\'');
            putenv("$name=$value");
            $_ENV[$name] = $value;
        }
    }
}

// Check for .env file in the current directory or one level up
loadEnv(__DIR__ . '/.env');
loadEnv(__DIR__ . '/../.env');

$OPENAI_API_KEY = getenv('OPENAI_API_KEY') ?: (defined('OPENAI_API_KEY') ? OPENAI_API_KEY : '');
$ALLOWED_ORIGINS = getenv('ALLOWED_ORIGINS') ?: '*'; // Comma-separated domains e.g. "https://example.com,https://client-site.com" or "*"
$OPENAI_MODEL = getenv('OPENAI_MODEL') ?: 'gpt-4o-mini'; // default cost-effective & ultra-fast model
$RATE_LIMIT_MAX = (int)(getenv('RATE_LIMIT_MAX') ?: 10); // max requests per window
$RATE_LIMIT_WINDOW = (int)(getenv('RATE_LIMIT_WINDOW') ?: 600); // 10 minutes window (in seconds)

// 3. Handle CORS (Cross-Origin Resource Sharing)
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($ALLOWED_ORIGINS === '*' || in_array($origin, array_map('trim', explode(',', $ALLOWED_ORIGINS)))) {
    header("Access-Control-Allow-Origin: " . ($ALLOWED_ORIGINS === '*' ? '*' : $origin));
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed. Please send a POST request.']);
    exit;
}

// 4. Validate OpenAI API Key existence
if (empty($OPENAI_API_KEY) || $OPENAI_API_KEY === 'sk-your-actual-openai-api-key-here') {
    http_response_code(500);
    echo json_encode([
        'error' => 'OpenAI API key is missing or not configured on the server. Please set OPENAI_API_KEY in .env file.'
    ]);
    exit;
}

// 5. Basic File-Based IP Rate Limiting (Prevents API abuse & wallet drain)
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitDir = sys_get_temp_dir() . '/atp_rate_limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0777, true);
}
$rateFile = $rateLimitDir . '/' . md5($clientIp) . '.json';

$rateData = ['count' => 0, 'first_request' => time()];
if (file_exists($rateFile)) {
    $existing = json_decode(file_get_contents($rateFile), true);
    if ($existing && (time() - $existing['first_request']) < $RATE_LIMIT_WINDOW) {
        $rateData = $existing;
    }
}

$rateData['count']++;
if ($rateData['count'] > $RATE_LIMIT_MAX) {
    http_response_code(429);
    echo json_encode([
        'error' => 'Too many requests. You have reached the limit of ' . $RATE_LIMIT_MAX . ' trip plans per 10 minutes. Please try again later.'
    ]);
    exit;
}
@file_put_contents($rateFile, json_encode($rateData));

// 6. Read and sanitize request body
$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true);

if (!$payload || !is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input.']);
    exit;
}

// Extract & sanitize parameters
$destination = htmlspecialchars(trim($payload['destination'] ?? ''), ENT_QUOTES, 'UTF-8');
$duration = min(max((int)($payload['duration'] ?? 3), 1), 14); // 1 to 14 days
$travelStyle = htmlspecialchars(trim($payload['travelStyle'] ?? 'Balanced'), ENT_QUOTES, 'UTF-8');
$budget = htmlspecialchars(trim($payload['budget'] ?? 'Moderate'), ENT_QUOTES, 'UTF-8');
$travelers = htmlspecialchars(trim($payload['travelers'] ?? 'Solo'), ENT_QUOTES, 'UTF-8');
$interests = is_array($payload['interests'] ?? null) 
    ? implode(', ', array_map(function($i) { return htmlspecialchars(trim($i), ENT_QUOTES, 'UTF-8'); }, array_slice($payload['interests'], 0, 8)))
    : htmlspecialchars(trim($payload['interests'] ?? 'Sightseeing, Food, Culture'), ENT_QUOTES, 'UTF-8');
$customNotes = htmlspecialchars(substr(trim($payload['customNotes'] ?? ''), 0, 300), ENT_QUOTES, 'UTF-8');

if (empty($destination)) {
    http_response_code(400);
    echo json_encode(['error' => 'Destination is required.']);
    exit;
}

// 7. Construct OpenAI Prompt
$systemPrompt = "You are a world-class luxury travel curator and master local guide. Your task is to generate rich, vivid, immersive, and highly detailed travel itineraries in structured JSON format. For every single activity, provide an in-depth, engaging description of AT LEAST 50 to 75 words explaining exactly what to see, practical local secrets, sensory highlights, and why it is unmissable. ALL budgets, estimates, and financial figures MUST BE STRICTLY IN US DOLLARS (USD, $).";

$userPrompt = "Plan an unforgettable trip with the following details:
- Destination: {$destination}
- Duration: {$duration} Days
- Travel Style: {$travelStyle}
- Budget Tier: {$budget}
- Travelers / Party: {$travelers}
- Specific Interests: {$interests}
" . (!empty($customNotes) ? "- Special Preferences: {$customNotes}\n" : "") . "

REQUIREMENTS:
1. For every activity (Morning, Afternoon, Evening), write a richly detailed, vivid description of AT LEAST 50 WORDS containing historical context, specific things to explore, local tips, and sensory details.
2. CURRENCY: ALL budget estimates MUST be in US Dollars (USD $) (e.g. \"$1,200 - $1,600 USD\"). Do not use INR or any other currency.
3. Provide a realistic total budget estimate in USD in estimatedTotalBudget. Do not put individual prices on activities.

Respond STRICTLY with a valid JSON object adhering to this exact schema (do not include markdown ticks, just raw JSON):
{
  \"tripTitle\": \"Catchy and descriptive trip title\",
  \"tagline\": \"Inspiring 1-sentence trip summary\",
  \"destination\": \"{$destination}\",
  \"bestTimeToVisit\": \"Ideal seasons or months and travel timing advice\",
  \"currency\": \"USD ($)\",
  \"estimatedTotalBudget\": \"Estimated price range in USD (e.g. $1,200 - $1,800 USD)\",
  \"weatherSummary\": \"Expected climate summary and temperature notes\",
  \"packingChecklist\": [\"Item 1\", \"Item 2\", \"Item 3\", \"Item 4\", \"Item 5\", \"Item 6\"],
  \"localDishesToTry\": [
    {\"dish\": \"Name\", \"description\": \"Why it is special & where to find\"}
  ],
  \"insiderTips\": [\"Practical tip 1\", \"Safety / transport tip 2\", \"Money saving tip 3\"],
  \"days\": [
    {
      \"dayNumber\": 1,
      \"dayTitle\": \"Theme of the day\",
      \"morning\": {
        \"time\": \"09:00 AM - 12:30 PM\",
        \"activity\": \"Activity Title\",
        \"location\": \"Location Name\",
        \"description\": \"Comprehensive, engaging description of AT LEAST 50 words with specific sights, hidden corners, and practical advice.\"
      },
      \"afternoon\": {
        \"time\": \"01:00 PM - 05:00 PM\",
        \"activity\": \"Activity Title\",
        \"location\": \"Location Name\",
        \"description\": \"Comprehensive, engaging description of AT LEAST 50 words including recommended local lunch spots and exploration highlights.\"
      },
      \"evening\": {
        \"time\": \"06:30 PM - 10:00 PM\",
        \"activity\": \"Activity Title\",
        \"location\": \"Location Name\",
        \"description\": \"Comprehensive, engaging description of AT LEAST 50 words for dinner, twilight views, cultural entertainment, or nightlife.\"
      }
    }
  ]
}";

// 8. Call OpenAI API via cURL
$ch = curl_init('https://api.openai.com/v1/chat/completions');
$postData = [
    'model' => $OPENAI_MODEL,
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $userPrompt]
    ],
    'response_format' => ['type' => 'json_object'],
    'temperature' => 0.7,
    'max_tokens' => 3500
];

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($postData),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $OPENAI_API_KEY
    ],
    CURLOPT_TIMEOUT => 60,
    CURLOPT_SSL_VERIFYPEER => true
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL Error: ' . $curlError]);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    $errorObj = json_decode($response, true);
    $msg = $errorObj['error']['message'] ?? 'Failed to communicate with OpenAI API.';
    echo json_encode(['error' => $msg]);
    exit;
}

$openAiResult = json_decode($response, true);
$contentStr = $openAiResult['choices'][0]['message']['content'] ?? '{}';
$itineraryJson = json_decode($contentStr, true);

if (!$itineraryJson) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to parse AI response into structured itinerary.']);
    exit;
}

$itineraryJson['getYourGuidePartnerId'] = getenv('GETYOURGUIDE_PARTNER_ID') ?: 'ZAA56FW';

// 9. Return structured itinerary safely
echo json_encode([
    'success' => true,
    'data' => $itineraryJson
]);
