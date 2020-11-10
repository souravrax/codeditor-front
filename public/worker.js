const CACHE_NAME = "codeditor-cache";
const urlsToCache = [
    "/",
    "/robots.text",
    "/worker.js",
    "/ts.worker.js",
    "/favicon.ico",
    "/editor.worker.js",
    "/css.worker.js",
    "/asset-manifest.json",
    "/manifest.json",
    "/static/js/main.chunk.js",
    "/static/js/bundle.js",
    "/static/js/2.chunk.js",
];

// Install a service worker
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

// Cache and return requests
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                console.log("Found in Cache");
                return response;
            }
            return fetch(event.request);
        })
    );
});

// Update a service worker
self.addEventListener("activate", function (event) {
    var cacheWhitelist = ["codeditor-cache"];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
