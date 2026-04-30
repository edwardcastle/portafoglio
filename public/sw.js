const CACHE_NAME = 'portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/en',
  '/it',
  '/es',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Skip API routes and analytics
  if (request.url.includes('/api/') || request.url.includes('umami')) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetched = fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // If offline and no cache, return a basic offline response for HTML requests
        if (request.headers.get('accept')?.includes('text/html')) {
          return new Response('<html><body style="background:#050510;color:#f1f5f9;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace"><p>Offline — please reconnect</p></body></html>', {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      });
      return cached || fetched;
    })
  );
});
