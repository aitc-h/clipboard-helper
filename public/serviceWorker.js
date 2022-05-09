const CACHE_NAME = "clipboard-helper";

const ASSETS = [
  "/favicon.ico",
  "/icon-32.png",
  "/icon-64.png",
  "/icon-128.png",
  "/icon-256.png",
  "/icon-512.png",
  "/offline.html"
];
// TODO: Will need to add more assets so this actually works offline...
self.addEventListener("install", (e) => {
  console.info(`[Service Worker] Installing...`);
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
      .catch((err) => console.warn(`[Service Worker] Error: `, err))
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url === "https://clipboard-helper-git-dev-aitc-h.vercel.app/"
  ) {
    event.respondWith(
      fetch(event.request).catch((err) =>
        self.cache
          .open(CACHE_NAME)
          .then((cache) => cache.match("/offline.html"))
      )
    );
  } else {
      event.respondWith(
          fetch(event.request).catch(err => caches.match(event.request).then(response => response))
      )
  }
});
