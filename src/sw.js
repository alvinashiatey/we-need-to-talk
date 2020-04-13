let CACHE_STATIC_NAME = "WNTT--2";
let CACHE_DYNAMIC_NAME = "dynamic";

const trimCache = (cacheName, maxItems) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
};

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll(["/", "/index.js", "/index.html", "main.css"]);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_STATIC_NAME) {
            console.log("[Service Worker] removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      } else {
        return (
          fetch(e.request)
            //   .then((r) => {
            //     trimCache(CACHE_DYNAMIC_NAME, 3);
            //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            //       cache.put(e.request.url, r.clone());
            //       return r;
            //     });
            //   })
            .catch((er) => {
              // console.log(er);
            })
        );
      }
    })
  );
});
