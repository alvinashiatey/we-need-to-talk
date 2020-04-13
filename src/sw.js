self.addEventListener("install", (e) => {
  console.log("installing service worker....", e);
});

self.addEventListener("activate", (e) => {
  console.log("installing service worker....", e);
});

self.addEventListener("fetch", (e) => {
  console.log("we just fecthed something", e);
  e.respondWith(fetch(e.request));
});
