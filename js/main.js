/**
 * ==============================================================================
 * MAIN INTERACTION SCRIPT (PURE JAVASCRIPT)
 * Handles mobile navbar, dynamic widgets injection, tabs, FAQ accordions,
 * and Lucide icon initialization.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Initialize Lucide Icons quickly
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Setup Navigation, Interactivity and Dynamic Branding
  applySiteBranding();
  setupMobileNav();
  highlightActiveNav();
  setupFaqAccordions();
  setupDestinationFilters();
  setupContactForm();
  setupNewsletterForms();

  // 3. Setup Home Search Tabs
  setupHomeSearchTabs();

  // 4. Inject Widgets
  injectPageWidgets();
  initExpediaWidgets();

  // 5. Render 3 Random Live WordPress Blogs on Homepage (Ultra-fast 0ms cache + fresh live fetch)
  if (typeof VoyageurWP !== 'undefined' && typeof VoyageurWP.renderHomeBlogs === 'function') {
    VoyageurWP.renderHomeBlogs('homeBlogsGrid', 3);
  }

  // 6. Background Prefetch WordPress & WooCommerce data for 0ms instant transitions
  if (typeof VoyageurWP !== 'undefined') {
    setTimeout(() => {
      if (typeof VoyageurWP.fetchPosts === 'function') VoyageurWP.fetchPosts();
      if (typeof VoyageurWP.fetchCategories === 'function') VoyageurWP.fetchCategories();
      if (typeof VoyageurWP.fetchProducts === 'function') VoyageurWP.fetchProducts();
      if (typeof VoyageurWP.fetchProductCategories === 'function') VoyageurWP.fetchProductCategories();
    }, 250);
  }
});

/**
 * Global HTML Entity Decoder helper
 */
function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return str || '';
  if (!str.includes('&')) return str;
  try {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    let decoded = doc.documentElement.textContent || str;
    if (decoded.includes('&')) {
      const doc2 = new DOMParser().parseFromString(decoded, 'text/html');
      decoded = doc2.documentElement.textContent || decoded;
    }
    return decoded;
  } catch (e) {
    return str
      .replace(/&#8217;/g, "’")
      .replace(/&#8216;/g, "‘")
      .replace(/&#8220;/g, '“')
      .replace(/&#8221;/g, '”')
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&#038;/g, '&')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
}
window.decodeHtmlEntities = decodeHtmlEntities;

/**
 * Automatically applies siteName branding across all pages from affiliateConfig
 */
function applySiteBranding() {
  if (typeof affiliateConfig !== 'undefined') {
    if (affiliateConfig.siteName) {
      document.querySelectorAll('.brand-name').forEach(el => {
        el.textContent = affiliateConfig.siteName;
      });
    }
    if (affiliateConfig.contactEmail) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        el.href = `mailto:${affiliateConfig.contactEmail}`;
        if (el.textContent.includes('@')) {
          el.textContent = affiliateConfig.contactEmail;
        }
      });
    }

    // Dynamic sync for Top Destinations in Austria on homepage
    const dealsGrid = document.querySelector('#deals .grid-cards-4');
    if (dealsGrid && Array.isArray(affiliateConfig.austriaTopDestinations) && affiliateConfig.austriaTopDestinations.length > 0) {
      dealsGrid.innerHTML = affiliateConfig.austriaTopDestinations.map(item => `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="deal-card">
          <div class="deal-card-img-wrap">
            ${item.tag ? `<span class="deal-tag">${item.tag}</span>` : ''}
            <img src="${item.image}" alt="${item.name} Austria" onerror="this.src='images/dest_vienna.png'" />
          </div>
          <div class="deal-card-body">
            <div class="deal-location">${item.location}</div>
            <h3 class="deal-title">${item.title}</h3>
            <div class="deal-rating-row">
              <i data-lucide="star" class="star-icon"></i>
              <span style="font-weight: 700; color: var(--color-navy);">${item.rating}</span>
              <span style="color: var(--color-text-muted);">(${item.reviews})</span>
            </div>
            <div class="deal-price-footer">
              <div>
                <span class="old-price">${item.oldPrice}</span>
                <span class="current-price">${item.price}</span>
              </div>
              <div class="deal-action-btn">
                <i data-lucide="arrow-up-right" style="width: 20px; height: 20px;"></i>
              </div>
            </div>
          </div>
        </a>
      `).join('');
      if (window.lucide) window.lucide.createIcons();
    }

    // Dynamic sync for "We've Got Some Great Deals" (10 Cities Grid) on homepage
    const greatDealsGrid = document.querySelector('.great-deals-grid');
    if (greatDealsGrid && Array.isArray(affiliateConfig.greatDeals) && affiliateConfig.greatDeals.length > 0) {
      greatDealsGrid.innerHTML = affiliateConfig.greatDeals.map(item => `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="great-deal-item">
          <div class="great-deal-img-box">
            <img src="${item.image}" alt="${item.city}" onerror="this.src='images/dest_paris.png'" />
            <span class="great-deal-price-badge">${item.price}</span>
          </div>
          <div class="great-deal-activity-row">
            <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--color-primary); flex-shrink: 0;"></i>
            <span>${item.activity}</span>
          </div>
          <div class="great-deal-city">${item.city}</div>
        </a>
      `).join('');
      if (window.lucide) window.lucide.createIcons();
    }

    // Dynamic sync for Hand Picked Top Destinations (Circular Grid) on homepage
    if (affiliateConfig.destinationLinks) {
      document.querySelectorAll('.dest-circle-item').forEach(el => {
        const nameEl = el.querySelector('.dest-circle-name');
        if (nameEl) {
          const name = nameEl.textContent.trim();
          if (affiliateConfig.destinationLinks[name]) {
            el.href = affiliateConfig.destinationLinks[name];
          }
        }
      });

      // Dynamic sync for Top Destinations Bento Masonry Grid (Paris, Bali, Tokyo, Maldives)
      document.querySelectorAll('.bento-destinations-grid .bento-card').forEach(el => {
        const titleEl = el.querySelector('.bento-title');
        if (titleEl) {
          const name = titleEl.textContent.trim();
          if (affiliateConfig.destinationLinks[name]) {
            el.href = affiliateConfig.destinationLinks[name];
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
          }
        }
      });

      const viewAllDestLink = document.querySelector('.bento-view-all-link');
      if (viewAllDestLink) {
        const targetUrl = affiliateConfig.viewAllDestinationsLink || affiliateConfig.toursMainLink || affiliateConfig.toursBookMoreLink;
        if (targetUrl) {
          viewAllDestLink.href = targetUrl;
          viewAllDestLink.target = '_blank';
          viewAllDestLink.rel = 'noopener noreferrer';
        }
      }
    }
  }
}

/**
 * Directly initializes Expedia Widgets (.eg-widget) into iframes
 * Handles both initial DOM loads and dynamic tab rendering without relying on DOMContentLoaded timing
 */
function initExpediaWidgets() {
  window.eg = window.eg || {};
  window.eg.widgets = window.eg.widgets || {};
  window.eg.widgets.elements = window.eg.widgets.elements || {};

  // Setup message resize listener once
  if (!window.eg.widgets._messageListenerAttached) {
    window.addEventListener("message", function (event) {
      if (
        event &&
        (event.origin === "https://creator.expediagroup.com" ||
         event.origin === "https://creatorexpediagroupcom.staging.exp-test.net") &&
        event.data &&
        event.data.type === "eg-widget/resize"
      ) {
        const meta = event.data.meta;
        const payload = event.data.payload;
        if (meta && meta.instance && window.eg.widgets.elements[meta.instance]) {
          const element = window.eg.widgets.elements[meta.instance];
          const frame = element.querySelector(".eg-widget-frame");
          if (frame && payload && payload.frame && payload.frame.style) {
            frame.style.width = payload.frame.style.width || "100%";
            frame.style.height = payload.frame.style.height || "auto";
          }
        }
      }
    });
    window.eg.widgets._messageListenerAttached = true;
  }

  const widgets = document.querySelectorAll(".eg-widget");
  widgets.forEach((element) => {
    // Remove any accidental duplicate frames
    const existingFrames = element.querySelectorAll("iframe");
    if (existingFrames.length > 1) {
      for (let i = 1; i < existingFrames.length; i++) {
        existingFrames[i].remove();
      }
    }
    if (existingFrames.length >= 1) return; // already initialized

    const widget = element.getAttribute("data-widget") || "search";
    const program = element.getAttribute("data-program") || "us-expedia";
    const lobs = element.getAttribute("data-lobs") || "stays";
    const network = element.getAttribute("data-network") || "pz";
    const camRef = element.getAttribute("data-camref") || "";
    const pubRef = element.getAttribute("data-pubref") || "";
    const adRef = element.getAttribute("data-adref") || "";
    const mdpcid = element.getAttribute("data-mdpcid") || "";
    const rffrid = element.getAttribute("data-rffrid") || "";

    const timestamp = Date.now().toString(36);
    const key = Math.random().toString(36).substring(2);
    const instance = timestamp + key;

    element.setAttribute("data-instance", instance);
    element.classList.add("eg-" + widget + "-widget");

    const params = new URLSearchParams();
    if (program) params.set("program", program);
    if (lobs) params.set("lobs", lobs);
    if (network) params.set("network", network);
    if (mdpcid) params.set("mdpcid", mdpcid);
    if (rffrid) params.set("rffrid", rffrid);
    if (camRef) params.set("camref", camRef);
    if (pubRef) params.set("pubref", pubRef);
    if (adRef) params.set("adref", adRef);
    params.set("instance", instance);

    const frame = document.createElement("iframe");
    frame.className = "eg-widget-frame eg-" + widget + "-widget-frame";
    frame.src = `https://creator.expediagroup.com/products/widgets/${widget}-widget?${params.toString()}`;
    frame.style.width = "100%";
    frame.style.minHeight = "60px";
    frame.style.margin = "auto";
    frame.style.border = "none";
    frame.style.display = "block";

    element.appendChild(frame);
    window.eg.widgets.elements[instance] = element;
  });

  // Flag as loaded so eg-widgets.js does not run a redundant loop
  window.eg.widgets.loaded = true;
}

/**
 * Safely parses and injects third-party widget HTML and scripts into a container
 */
function renderWidget(containerId, widgetHtml) {
  const container = document.getElementById(containerId);
  if (!container || !widgetHtml) return;

  // Clear previous widget content
  container.innerHTML = "";

  // Reset Expedia initialization flag if previously initialized so it processes new elements
  if (window.eg && window.eg.widgets) {
    window.eg.widgets.initialized = false;
  }

  // Parse widget HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(widgetHtml, "text/html");

  const scriptsToExecute = [];

  // Append all nodes into container
  Array.from(doc.body.childNodes).forEach((node) => {
    if (node.nodeName.toLowerCase() === "script") {
      scriptsToExecute.push(node);
    } else {
      const clone = node.cloneNode(true);
      if (clone.querySelectorAll) {
        clone.querySelectorAll("script").forEach((s) => {
          scriptsToExecute.push(s);
          s.parentNode.removeChild(s);
        });
      }
      container.appendChild(clone);
    }
  });

  // Re-create and append script tags so browser executes them
  scriptsToExecute.forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) => {
      newScript.setAttribute(attr.name, attr.value);
    });
    if (oldScript.textContent) {
      newScript.textContent = oldScript.textContent;
    }
    container.appendChild(newScript);
  });

  // Immediately initialize Expedia widgets if present
  initExpediaWidgets();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Mobile Navbar Toggle Logic
 */
function setupMobileNav() {
  const toggleBtn = document.getElementById("mobileToggleBtn");
  const mobileDrawer = document.getElementById("mobileMenuDrawer");

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileDrawer.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileDrawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        mobileDrawer.classList.remove("open");
      }
    });
  }
}

/**
 * Highlight Current Active Page Link in Navbar
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (
      (currentPath === "" || currentPath === "index.html") &&
      (href === "index.html" || href === "/")
    ) {
      link.classList.add("active");
    } else if (href === currentPath) {
      link.classList.add("active");
    }
  });
}

/**
 * Setup FAQ Accordion Toggles
 */
function setupFaqAccordions() {
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach((header) => {
    // Avoid attaching multiple listeners
    if (header._hasFaqListener) return;
    header._hasFaqListener = true;

    header.addEventListener("click", function (e) {
      e.preventDefault();
      const currentItem = this.closest(".faq-item");
      if (!currentItem) return;
      const isOpen = currentItem.classList.contains("open");

      // Close sibling items in the same container
      const container = currentItem.closest("#faqAccordionContainer") || currentItem.closest(".faq-container") || currentItem.parentElement;
      if (container) {
        container.querySelectorAll(".faq-item").forEach((item) => {
          if (item !== currentItem) item.classList.remove("open");
        });
      }

      if (isOpen) {
        currentItem.classList.remove("open");
      } else {
        currentItem.classList.add("open");
      }
    });
  });
}

/**
 * Home Page Multi-Service Search Engine Tabs
 */
function setupHomeSearchTabs() {
  const tabButtons = document.querySelectorAll(".hero-search-tabs .tab-btn");
  const tabPanes = document.querySelectorAll(".hero-tab-pane");

  if (!tabButtons.length) return;

  function activateTab(tabId) {
    tabButtons.forEach((btn) => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    tabPanes.forEach((pane) => {
      if (pane.id === `heroTab-${tabId}`) {
        pane.style.display = "block";
        pane.classList.add("active");
      } else {
        pane.style.display = "none";
        pane.classList.remove("active");
      }
    });

    if (tabId === "Hotel") {
      initExpediaWidgets();
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      activateTab(tabId);
    });
  });
}

/**
 * Home Page Destination Category Filter
 */
function setupDestinationFilters() {
  const filterChips = document.querySelectorAll(".filter-chip");
  const destItems = document.querySelectorAll(".dest-circle-item");

  if (!filterChips.length || !destItems.length) return;

  filterChips.forEach((chip) => {
    chip.addEventListener("click", function () {
      filterChips.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      destItems.forEach((item) => {
        const itemCategories = item.getAttribute("data-categories") || "";
        if (category === "All" || itemCategories.includes(category)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/**
 * Safely mount widgets only if the container doesn't already contain pre-rendered markup/scripts
 */
function injectPageWidgets() {
  const cfg = window.affiliateConfig;
  if (!cfg) return;

  function renderIfEmpty(id, html) {
    const el = document.getElementById(id);
    if (el && el.children.length === 0 && html) {
      renderWidget(id, html);
    }
  }

  // Flight Page
  renderIfEmpty("flightMainSearchWidget", cfg.flightSearchWidget);
  renderIfEmpty("flightCalendarWidget", cfg.flightRoundTripCalendar);
  renderIfEmpty("flightMapWidget", cfg.flightRoundTripMap);

  // Flight Deal Cards (London, NYC, Dubai, etc.)
  const cityWidgetContainers = document.querySelectorAll("[data-flight-city-widget]");
  cityWidgetContainers.forEach((container) => {
    const city = container.getAttribute("data-flight-city-widget");
    if (cfg.flightDealsWidgets && cfg.flightDealsWidgets[city] && container.children.length === 0) {
      renderWidget(container.id, cfg.flightDealsWidgets[city]);
    }
  });

  // Hotel Page
  renderIfEmpty("hotelMainSearchWidget", cfg.hotelSearchWidget);

  // Car Page
  renderIfEmpty("carMainSearchWidget", cfg.carSearchWidget);
  renderIfEmpty("carBestPricesWidget", cfg.carBestPricesWidget);

  // Cab Page
  renderIfEmpty("cabMainSearchWidget", cfg.cabSearchWidget);

  // Bike Page
  renderIfEmpty("bikeMainSearchWidget", cfg.bikeSearchWidget);

  // SIM & eSIM Page
  renderIfEmpty("simMainSearchWidget", cfg.simSearchWidget);

  // Tours Page
  renderIfEmpty("toursMainSearchWidget", cfg.toursSearchWidget);
  const toursHeroBtn = document.getElementById("toursHeroBtn");
  if (toursHeroBtn && cfg.toursMainLink) {
    toursHeroBtn.href = cfg.toursMainLink;
  }
  const toursBookMoreBtn = document.getElementById("toursBookMoreBtn");
  if (toursBookMoreBtn && (cfg.toursBookMoreLink || cfg.toursMainLink)) {
    toursBookMoreBtn.href = cfg.toursBookMoreLink || cfg.toursMainLink;
  }

  // Flight Compensation Page
  renderIfEmpty("compensationMainSearchWidget", cfg.compensationSearchWidget);
}

/**
 * Contact Form Submission with simulated success alert
 */
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const targetEmail = (window.affiliateConfig && window.affiliateConfig.newsletterEmail) || "support@getawayscout.com";
    contactForm.action = `https://formsubmit.co/${targetEmail}`;
    contactForm.method = "POST";
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    const thankYouUrl = window.location.origin + (basePath.startsWith('/') ? basePath : '/' + basePath) + 'thank-you.html';
    
    let nextInput = contactForm.querySelector('input[name="_next"]');
    if (nextInput) {
      nextInput.value = thankYouUrl;
    }
  }
}

/**
 * Automatically configures FormSubmit.co for all newsletter forms
 * Redirects to thank-you.html and delivers submissions to the configured email
 */
function setupNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");
  const targetEmail = (window.affiliateConfig && window.affiliateConfig.newsletterEmail) || "support@getawayscout.com";
  const formAction = (window.affiliateConfig && window.affiliateConfig.newsletterAction) || `https://formsubmit.co/${targetEmail}`;
  
  // Calculate absolute URL for thank-you.html so FormSubmit can safely redirect
  const currentPath = window.location.pathname;
  const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  const thankYouUrl = window.location.origin + (basePath.startsWith('/') ? basePath : '/' + basePath) + 'thank-you.html';

  forms.forEach(form => {
    form.removeAttribute("onsubmit");
    form.action = formAction;
    form.method = "POST";

    const emailInput = form.querySelector('input[type="email"], .newsletter-input');
    if (emailInput) {
      emailInput.setAttribute("name", "email");
      emailInput.setAttribute("required", "true");
    }

    let nextInput = form.querySelector('input[name="_next"]');
    if (!nextInput) {
      nextInput = document.createElement("input");
      nextInput.type = "hidden";
      nextInput.name = "_next";
      form.prepend(nextInput);
    }
    nextInput.value = thankYouUrl;

    let captchaInput = form.querySelector('input[name="_captcha"]');
    if (!captchaInput) {
      captchaInput = document.createElement("input");
      captchaInput.type = "hidden";
      captchaInput.name = "_captcha";
      captchaInput.value = "false";
      form.prepend(captchaInput);
    }

    let subjectInput = form.querySelector('input[name="_subject"]');
    if (!subjectInput) {
      subjectInput = document.createElement("input");
      subjectInput.type = "hidden";
      subjectInput.name = "_subject";
      subjectInput.value = "New Newsletter Subscription - Getawayscout.com";
      form.prepend(subjectInput);
    }
  });
}

// Support automatic height resizing for Kiwitaxi & embedded widgets
window.addEventListener("message", function (e) {
  if (e.data && e.data.name === "resize-height") {
    const iframes = document.querySelectorAll("#kw-search-form, iframe[src*='kiwitaxi']");
    iframes.forEach((ifr) => {
      ifr.style.height = e.data.height + "px";
    });
  }
}, true);

/**
 * Train & Bus Search Handlers (12Go Asian Public Transportation)
 */
function setupTrainBusDates() {
  const dateInput = document.getElementById("trainDateInput");
  if (dateInput && !dateInput.value) {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    dateInput.value = d.toISOString().split("T")[0];
  }
}

function handleTrainBusSearch(e) {
  if (e) e.preventDefault();
  const origin = document.getElementById("trainOriginInput")?.value.trim() || "Bangkok";
  const dest = document.getElementById("trainDestInput")?.value.trim() || "Phuket";
  const date = document.getElementById("trainDateInput")?.value || "";

  const fromSlug = encodeURIComponent(origin.toLowerCase().replace(/[^a-z0-9]/g, "-"));
  const toSlug = encodeURIComponent(dest.toLowerCase().replace(/[^a-z0-9]/g, "-"));

  let searchUrl = `https://agent.12go.asia/en/travel/${fromSlug}/${toSlug}?z=56330&sub_id=bba932a6d98341338bf703630-187570`;
  if (date) {
    searchUrl += `&date=${date}`;
  }
  window.open(searchUrl, "_blank");
}

function swapTrainLocations() {
  const originInput = document.getElementById("trainOriginInput");
  const destInput = document.getElementById("trainDestInput");
  if (originInput && destInput) {
    const temp = originInput.value;
    originInput.value = destInput.value;
    destInput.value = temp;
  }
}

// Attach to window so inline event handlers work everywhere
window.handleTrainBusSearch = handleTrainBusSearch;
window.swapTrainLocations = swapTrainLocations;
window.setupTrainBusDates = setupTrainBusDates;

// Initialize dates on load
document.addEventListener("DOMContentLoaded", setupTrainBusDates);


