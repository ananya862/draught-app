// Minimal service worker — network always first, cache only for offline
const CACHE_NAME = "draught-v4";

self.addEventListener("install", () => {
  self.skipWaiting(); // activate immediately, no waiting
});

self.addEventListener("activate", (e) => {
  // Wipe ALL old caches on every activation
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim(); // take control of all tabs immediately
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  // Always try network first — never serve stale cache as primary
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        // Only use cache when offline
        caches.match(e.request).then(
          (cached) => cached || caches.match("/index.html")
        )
      )
  );
});
