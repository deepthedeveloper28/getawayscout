/**
 * AI Travel Trip Planner - Standalone Embeddable Widget
 * Universal JavaScript engine compatible with HTML, WordPress, Webflow, and any CMS.
 */

(function (window, document) {
  'use strict';

  const DEFAULT_CONFIG = {
    container: '#ai-trip-planner',
    endpoint: './api/trip-planner.php', // Backend proxy URL (or /wp-json/trip-planner/v1/generate)
    apiKey: '', // Optional direct client key for development/testing
    currencySymbol: '$',
    getYourGuidePartnerId: 'ZAA56FW', // Easily swappable per client
    defaultDestination: '',
    theme: {
      primaryColor: '#0284c7',
      primaryHover: '#0369a1',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      borderRadius: '16px',
    },
    labels: {
      badge: '✨ Custom Trip Concierge',
      title: 'Plan Your Dream Vacation',
      subtitle: 'Instant personalized multi-day itineraries, daily activities, food guides & budget estimates (USD).',
      submitButton: '✨ Generate My Custom Travel Plan'
    }
  };

  const INTEREST_OPTIONS = [
    { id: 'sightseeing', label: '🏛️ Sightseeing & Landmarks' },
    { id: 'food', label: '🍜 Local Food & Culinary' },
    { id: 'nature', label: '🌲 Nature & Outdoors' },
    { id: 'adventure', label: '🧗 Adventure & Sports' },
    { id: 'relaxation', label: '🏖️ Relaxation & Beaches' },
    { id: 'culture', label: '🎨 Art, History & Museums' },
    { id: 'nightlife', label: '🍸 Nightlife & Bars' },
    { id: 'shopping', label: '🛍️ Shopping & Markets' },
    { id: 'photography', label: '📸 Photography Spots' }
  ];

  class AITripPlannerInstance {
    constructor(userOptions) {
      this.config = Object.assign({}, DEFAULT_CONFIG, userOptions);
      if (userOptions.theme) {
        this.config.theme = Object.assign({}, DEFAULT_CONFIG.theme, userOptions.theme);
      }
      if (userOptions.labels) {
        this.config.labels = Object.assign({}, DEFAULT_CONFIG.labels, userOptions.labels);
      }

      this.containerEl = typeof this.config.container === 'string'
        ? document.querySelector(this.config.container)
        : this.config.container;

      if (!this.containerEl) {
        console.error(`[AITripPlanner] Container element "${this.config.container}" not found in DOM.`);
        return;
      }

      this.selectedInterests = new Set(['sightseeing', 'food', 'culture']);
      this.currentItinerary = null;
      this.activeDay = 1;

      this.applyThemeStyles();
      this.render();
      this.attachEvents();
    }

    applyThemeStyles() {
      const root = this.containerEl;
      if (this.config.theme.primaryColor) {
        root.style.setProperty('--atp-primary', this.config.theme.primaryColor);
        root.style.setProperty('--atp-primary-hover', this.config.theme.primaryHover || this.config.theme.primaryColor);
      }
      if (this.config.theme.fontFamily) {
        root.style.setProperty('--atp-font-family', this.config.theme.fontFamily);
      }
      if (this.config.theme.borderRadius) {
        root.style.setProperty('--atp-radius-lg', this.config.theme.borderRadius);
      }
    }

    render() {
      this.containerEl.classList.add('atp-widget-container');
      this.containerEl.innerHTML = `
        <!-- Header -->
        <header class="atp-header">
          <div class="atp-badge">${this.escapeHtml(this.config.labels.badge)}</div>
          <h1 class="atp-title">${this.escapeHtml(this.config.labels.title)}</h1>
          <p class="atp-subtitle">${this.escapeHtml(this.config.labels.subtitle)}</p>
        </header>

        <!-- Planning Form -->
        <form class="atp-form-card" id="atp-form">
          <div class="atp-form-grid">
            
            <!-- Destination -->
            <div class="atp-form-group atp-full-width">
              <label class="atp-label" for="atp-destination">
                📍 Where do you want to go?
              </label>
              <input type="text" id="atp-destination" class="atp-input" required 
                placeholder="e.g. Kyoto, Japan or Paris & Amalfi Coast" 
                value="${this.escapeHtml(this.config.defaultDestination)}" />
            </div>

            <!-- Duration -->
            <div class="atp-form-group">
              <label class="atp-label" for="atp-duration">
                🗓️ Duration
              </label>
              <select id="atp-duration" class="atp-select">
                <option value="1">1 Day (Quick Escapade)</option>
                <option value="2">2 Days (Weekend Getaway)</option>
                <option value="3" selected>3 Days (Long Weekend)</option>
                <option value="4">4 Days (Mini Vacation)</option>
                <option value="5">5 Days (Standard Trip)</option>
                <option value="7">7 Days (Full Week Discovery)</option>
                <option value="10">10 Days (Deep Exploration)</option>
                <option value="14">14 Days (Grand Tour)</option>
              </select>
            </div>

            <!-- Travel Style -->
            <div class="atp-form-group">
              <label class="atp-label" for="atp-style">
                🧭 Travel Style
              </label>
              <select id="atp-style" class="atp-select">
                <option value="Balanced" selected>Balanced & Diverse</option>
                <option value="Fast-Paced">Fast-Paced (See Everything)</option>
                <option value="Slow & Relaxed">Slow & Relaxed Pace</option>
                <option value="Romantic & Couple">Romantic & Couple</option>
                <option value="Family Friendly">Family Friendly</option>
                <option value="Solo Explorer">Solo Adventure</option>
              </select>
            </div>

            <!-- Budget -->
            <div class="atp-form-group">
              <label class="atp-label" for="atp-budget">
                💰 Budget Tier
              </label>
              <select id="atp-budget" class="atp-select">
                <option value="Budget-Friendly">Budget / Backpacker</option>
                <option value="Moderate" selected>Moderate / Comfortable</option>
                <option value="Luxury">Luxury / Premium</option>
              </select>
            </div>

            <!-- Travelers -->
            <div class="atp-form-group">
              <label class="atp-label" for="atp-travelers">
                👥 Travelers
              </label>
              <select id="atp-travelers" class="atp-select">
                <option value="Solo Traveler" selected>Solo Traveler</option>
                <option value="Couple (2 People)">Couple (2 People)</option>
                <option value="Friends Group (3-5 People)">Friends (3-5 People)</option>
                <option value="Family with Kids">Family with Kids</option>
              </select>
            </div>

            <!-- Interests Chips -->
            <div class="atp-form-group atp-full-width">
              <label class="atp-label">🎯 Interests & Activities (Pick what you love)</label>
              <div class="atp-chips-grid">
                ${INTEREST_OPTIONS.map(opt => `
                  <button type="button" class="atp-chip ${this.selectedInterests.has(opt.id) ? 'active' : ''}" data-id="${opt.id}">
                    ${opt.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Custom Notes -->
            <div class="atp-form-group atp-full-width">
              <label class="atp-label" for="atp-notes">
                📝 Special Requests or Dietary Notes (Optional)
              </label>
              <textarea id="atp-notes" class="atp-textarea" placeholder="e.g. Vegetarian friendly, prefer morning walks, traveling without a car..."></textarea>
            </div>

          </div>

          <button type="submit" class="atp-submit-btn" id="atp-submit-btn">
            ${this.escapeHtml(this.config.labels.submitButton)}
          </button>

          <div class="atp-error-banner" id="atp-error"></div>
        </form>

        <!-- Loading State -->
        <div class="atp-loading-state" id="atp-loading">
          <div class="atp-plane-spinner"></div>
          <h3 class="atp-loading-title">Crafting Your Tailored Journey...</h3>
          <p class="atp-loading-desc">Our travel concierge is curating optimal daily routes, hidden gems, and local dining spots.</p>
        </div>

        <!-- Itinerary Results Container -->
        <div class="atp-results" id="atp-results"></div>
      `;
    }

    attachEvents() {
      const form = this.containerEl.querySelector('#atp-form');
      const chipButtons = this.containerEl.querySelectorAll('.atp-chip');

      // Interest Chips Toggle
      chipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (this.selectedInterests.has(id)) {
            this.selectedInterests.delete(id);
            btn.classList.remove('active');
          } else {
            this.selectedInterests.add(id);
            btn.classList.add('active');
          }
        });
      });

      // Form Submit
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleGenerate();
      });
    }

    async handleGenerate() {
      const destination = this.containerEl.querySelector('#atp-destination').value.trim();
      const duration = parseInt(this.containerEl.querySelector('#atp-duration').value, 10);
      const travelStyle = this.containerEl.querySelector('#atp-style').value;
      const budget = this.containerEl.querySelector('#atp-budget').value;
      const travelers = this.containerEl.querySelector('#atp-travelers').value;
      const customNotes = this.containerEl.querySelector('#atp-notes').value.trim();

      const interestLabels = Array.from(this.selectedInterests).map(id => {
        const item = INTEREST_OPTIONS.find(o => o.id === id);
        return item ? item.label.replace(/^[^\s]+\s/, '') : id;
      });

      const payload = {
        destination,
        duration,
        travelStyle,
        budget,
        travelers,
        interests: interestLabels,
        customNotes
      };

      this.setLoading(true);
      this.hideError();

      try {
        let itineraryData = null;

        // If direct OpenAI key provided (for quick testing/preview), call OpenAI API directly
        if (this.config.apiKey && (!this.config.endpoint || this.config.useDirectKey)) {
          itineraryData = await this.callOpenAIDirect(payload);
        } else {
          // Call Backend PHP Proxy / WordPress REST Endpoint
          itineraryData = await this.callBackendProxy(payload);
        }

        this.currentItinerary = itineraryData;
        this.activeDay = 1;
        this.renderItinerary(itineraryData);
      } catch (err) {
        console.error('[AITripPlanner Error]', err);
        this.showError(err.message || 'Something went wrong generating your trip plan. Please try again.');
      } finally {
        this.setLoading(false);
      }
    }

    async callBackendProxy(payload) {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || `Server returned error (${response.status})`);
      }
      return data.data;
    }

    async callOpenAIDirect(payload) {
      const systemPrompt = "You are an expert master travel curator. Generate a comprehensive travel itinerary in JSON.";
      const userPrompt = `Plan a ${payload.duration}-day trip to ${payload.destination} for ${payload.travelers}, style: ${payload.travelStyle}, budget: ${payload.budget}, interests: ${payload.interests.join(', ')}. ${payload.customNotes ? 'Notes: ' + payload.customNotes : ''}`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          response_format: { type: 'json_object' }
        })
      });

      const json = await res.json();
      if (json.error) throw new Error(json.error.message);
      return JSON.parse(json.choices[0].message.content);
    }

    renderItinerary(plan) {
      const resultsContainer = this.containerEl.querySelector('#atp-results');
      if (!plan || !plan.days) {
        this.showError('Invalid itinerary format received.');
        return;
      }

      const daysCount = plan.days.length;

      resultsContainer.innerHTML = `
        <!-- Actions Toolbar -->
        <div class="atp-actions-toolbar">
          <button type="button" class="atp-btn-secondary" id="atp-btn-reset">
            🔄 Modify Trip Criteria
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="atp-btn-secondary" id="atp-btn-copy">
              📋 Copy Summary
            </button>
            <button type="button" class="atp-btn-secondary" id="atp-btn-print">
              🖨️ Print / Save PDF
            </button>
          </div>
        </div>

        <!-- Hero Card -->
        <div class="atp-hero-card">
          <div class="atp-hero-content">
            <span class="atp-hero-tag">📍 ${this.escapeHtml(plan.destination || 'Destination')}</span>
            <h2 class="atp-hero-title">${this.escapeHtml(plan.tripTitle || 'Your Tailored Trip Plan')}</h2>
            <p class="atp-hero-tagline">${this.escapeHtml(plan.tagline || '')}</p>

            <div class="atp-meta-grid">
              <div class="atp-meta-item">
                <span class="atp-meta-label">Best Time To Visit</span>
                <span class="atp-meta-val">${this.escapeHtml(plan.bestTimeToVisit || 'Spring / Autumn')}</span>
              </div>
              <div class="atp-meta-item">
                <span class="atp-meta-label">Est. Total Budget (USD)</span>
                <span class="atp-meta-val">${this.escapeHtml(plan.estimatedTotalBudget || '$800 - $1,200 USD')}</span>
              </div>
              <div class="atp-meta-item">
                <span class="atp-meta-label">Weather / Climate</span>
                <span class="atp-meta-val">${this.escapeHtml(plan.weatherSummary || 'Temperate')}</span>
              </div>
              <div class="atp-meta-item">
                <span class="atp-meta-label">Currency</span>
                <span class="atp-meta-val">USD ($)</span>
              </div>
            </div>

            <!-- GetYourGuide Destination Tours Button -->
            <div class="atp-hero-actions">
              <a href="${this.buildGetYourGuideUrl(plan.destination)}" target="_blank" rel="noopener noreferrer" class="atp-hero-book-btn">
                🎟️ Book ${this.escapeHtml(plan.destination)} Tours & Tickets ↗
              </a>
            </div>
          </div>
        </div>

        <!-- Day Navigation Tabs -->
        <div class="atp-day-tabs">
          ${plan.days.map((day, idx) => `
            <button type="button" class="atp-day-tab ${idx === 0 ? 'active' : ''}" data-day="${day.dayNumber || (idx + 1)}">
              Day ${day.dayNumber || (idx + 1)}
            </button>
          `).join('')}
        </div>

        <!-- Day Schedules Panels -->
        <div class="atp-days-container">
          ${plan.days.map((day, idx) => this.renderDayPanel(day, idx === 0)).join('')}
        </div>

        <!-- Extra Highlights Grid (Food, Packing, Insider Tips) -->
        <div class="atp-extras-grid">
          
          <!-- Local Food Highlights -->
          <div class="atp-extra-box">
            <div class="atp-extra-header">
              <span>🍜 Local Culinary Highlights</span>
            </div>
            <div>
              ${(plan.localDishesToTry || []).map(dish => `
                <div class="atp-food-item">
                  <div class="atp-food-name">🍽️ ${this.escapeHtml(dish.dish || dish.name || '')}</div>
                  <div class="atp-food-desc">${this.escapeHtml(dish.description || '')}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Packing Checklist -->
          <div class="atp-extra-box">
            <div class="atp-extra-header">
              <span>🎒 Recommended Packing Essentials</span>
            </div>
            <ul class="atp-checklist">
              ${(plan.packingChecklist || []).map(item => `
                <li class="atp-checklist-item">
                  <input type="checkbox" />
                  <span>${this.escapeHtml(item)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Insider Tips -->
          <div class="atp-extra-box">
            <div class="atp-extra-header">
              <span>💡 Local Secrets & Insider Tips</span>
            </div>
            <ul class="atp-checklist">
              ${(plan.insiderTips || []).map(tip => `
                <li class="atp-checklist-item">
                  <span>✨ ${this.escapeHtml(tip)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

        </div>
      `;

      resultsContainer.classList.add('active');
      this.containerEl.querySelector('#atp-form').style.display = 'none';

      this.attachItineraryEvents();
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    buildGetYourGuideUrl(query) {
      const partnerId = (this.currentItinerary && this.currentItinerary.getYourGuidePartnerId) 
        ? this.currentItinerary.getYourGuidePartnerId 
        : (this.config.getYourGuidePartnerId || 'ZAA56FW');
      const cleanQuery = (query || '').replace(/[\r\n\t]/g, ' ').trim();
      return `https://www.getyourguide.com/s/?q=${encodeURIComponent(cleanQuery)}&partner_id=${encodeURIComponent(partnerId)}&utm_medium=online_publisher`;
    }

    renderDayPanel(day, isActive) {
      const slots = [
        { key: 'morning', label: 'Morning', data: day.morning },
        { key: 'afternoon', label: 'Afternoon', data: day.afternoon },
        { key: 'evening', label: 'Evening', data: day.evening }
      ];

      return `
        <div class="atp-day-panel ${isActive ? 'active' : ''}" data-day="${day.dayNumber}">
          <div class="atp-day-header">
            <h3>Day ${day.dayNumber}: ${this.escapeHtml(day.dayTitle || 'Daily Adventure')}</h3>
          </div>

          <div class="atp-timeline">
            ${slots.map(slot => {
              if (!slot.data) return '';
              const searchQuery = `${slot.data.activity || slot.data.location}, ${this.currentItinerary.destination || ''}`;
              const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
              const gygUrl = this.buildGetYourGuideUrl(searchQuery);

              return `
                <div class="atp-activity-card">
                  <div class="atp-time-badge">
                    <span class="atp-slot-name">${slot.label}</span>
                    <span class="atp-slot-time">${this.escapeHtml(slot.data.time || '')}</span>
                  </div>
                  <div class="atp-activity-body">
                    <div class="atp-activity-title">
                      <span>${this.escapeHtml(slot.data.activity || '')}</span>
                    </div>
                    ${slot.data.location ? `
                      <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="atp-activity-loc">
                        📍 ${this.escapeHtml(slot.data.location)} (View Map ↗)
                      </a>
                    ` : ''}
                    <p class="atp-activity-desc">${this.escapeHtml(slot.data.description || '')}</p>
                    
                    <div class="atp-card-actions">
                      <a href="${gygUrl}" target="_blank" rel="noopener noreferrer" class="atp-book-tour-btn">
                        🎟️ Book Tour & Tickets ↗
                      </a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    attachItineraryEvents() {
      // Day Tabs Switcher
      const tabs = this.containerEl.querySelectorAll('.atp-day-tab');
      const panels = this.containerEl.querySelectorAll('.atp-day-panel');

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const dayNum = tab.getAttribute('data-day');
          tabs.forEach(t => t.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));

          tab.classList.add('active');
          const matchingPanel = this.containerEl.querySelector(`.atp-day-panel[data-day="${dayNum}"]`);
          if (matchingPanel) matchingPanel.classList.add('active');
        });
      });

      // Reset Button
      const resetBtn = this.containerEl.querySelector('#atp-btn-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.containerEl.querySelector('#atp-results').classList.remove('active');
          this.containerEl.querySelector('#atp-form').style.display = 'block';
        });
      }

      // Print Button
      const printBtn = this.containerEl.querySelector('#atp-btn-print');
      if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
      }

      // Copy Summary Button
      const copyBtn = this.containerEl.querySelector('#atp-btn-copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (!this.currentItinerary) return;
          const text = `${this.currentItinerary.tripTitle}\n${this.currentItinerary.tagline}\nDestination: ${this.currentItinerary.destination}\nDuration: ${this.currentItinerary.days.length} Days\nBudget: ${this.currentItinerary.estimatedTotalBudget}`;
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => { copyBtn.textContent = '📋 Copy Summary'; }, 2000);
          });
        });
      }
    }

    setLoading(isLoading) {
      const loading = this.containerEl.querySelector('#atp-loading');
      const submitBtn = this.containerEl.querySelector('#atp-submit-btn');
      if (loading) loading.classList.toggle('active', isLoading);
      if (submitBtn) submitBtn.disabled = isLoading;
    }

    showError(message) {
      const errBox = this.containerEl.querySelector('#atp-error');
      if (errBox) {
        errBox.textContent = message;
        errBox.classList.add('active');
      }
    }

    hideError() {
      const errBox = this.containerEl.querySelector('#atp-error');
      if (errBox) errBox.classList.remove('active');
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Global Expose
  window.AITripPlanner = {
    init: function (options) {
      return new AITripPlannerInstance(options || {});
    }
  };

})(window, document);
