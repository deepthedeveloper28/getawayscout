/**
 * ==============================================================================
 * GETAWAYSCOUT ULTRA-FAST SERVICE WORKER CACHE (PWA / OFFLINE / SPEED)
 * Provides 0ms instant repeat load times and intelligent background caching.
 * ==============================================================================
 */

const CACHE_NAME = 'getawayscout-v1.2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/flights.html',
  '/hotels.html',
  '/cars.html',
  '/cabs.html',
  '/bikes.html',
  '/tours.html',
  '/sim.html',
  '/compensation.html',
  '/shop.html',
  '/blog.html',
  '/about.html',
  '/contact.html',
  '/faq.html',
  '/privacy.html',
  '/terms.html',
  '/cookies.html',
  '/disclaimer.html',
  '/thank-you.html',
  '/css/styles.min.css',
  '/js/affiliate.min.js',
  '/js/wordpress.min.js',
  '/js/product-single.min.js',
  '/js/main.min.js',
  '/images/logo.webp',
  '/images/logo_white.webp',
  '/favicon.png',
  '/js/lucide.min.js'
];

// Install Event: Precache core static shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'no-cache' }))).catch((err) => {
        console.warn('SW Precache non-critical item fallback:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up outdated cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate for HTML / Navigation, Cache-First for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET, chrome-extension, and external widget APIs
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Pass-through live third-party affiliate endpoints (Expedia, GYG, Travelpayouts, FormSubmit)
  if (
    url.hostname.includes('creator.expediagroup.com') ||
    url.hostname.includes('widget.getyourguide.com') ||
    url.hostname.includes('tp-em.com') ||
    url.hostname.includes('tpemb.com') ||
    url.hostname.includes('formsubmit.co')
  ) {
    return;
  }

  // 1. Static Assets (Images, WebP, Fonts, CSS, JS) -> Cache First with Network Fallback
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(webp|png|jpg|jpeg|svg|css|js|woff2|woff|ttf|ico)$/i)
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately; update cache in background
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // 2. HTML Navigation & Pages -> Stale While Revalidate
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
