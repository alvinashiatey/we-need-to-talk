self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) => {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(["/", "/index.js", "/index.html", "main.css"]);
    })
  );
});

self.addEventListener("activate", (e) => {});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      } else {
        return fetch(e.request)
          .then((r) => {
            caches.open("dynamic").then((cache) => {
              cache.put(e.request.url, r.clone());
              return r;
            });
          })
          .catch((er) => {});
      }
    })
  );
});
