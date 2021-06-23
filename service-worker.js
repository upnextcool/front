workbox.core.setCacheNameDetails({ prefix: "c1-app" });

self.addEventListener("message", (event) => {
  console.log("sw-event", event);
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
