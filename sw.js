/**
 * Service Worker dla eCVjob.pl
 * Cache strategia i offline support
 */

const CACHE_NAME = 'ecvjob-v1.0.0';
const STATIC_CACHE = 'ecvjob-static-v1';
const DYNAMIC_CACHE = 'ecvjob-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
    './index.html',
    './images/tlo.jpg',
    './favicon.ico'
];

// Install event
// Install event z obsługą błędów cache.addAll
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                return cache.addAll(STATIC_FILES)
                    .catch(err => {
                        console.warn('Nie udało się dodać pliku do cache:', err);
                    });
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - Cache First strategy for static assets, Network First for API calls
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Static assets - Cache First
    if (request.url.includes('.css') || request.url.includes('.js') || request.url.includes('.jpg') || request.url.includes('.png') || request.url.includes('.webp')) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    return response || fetch(request)
                        .then(fetchResponse => {
                            const responseClone = fetchResponse.clone();
                            caches.open(STATIC_CACHE)
                                .then(cache => cache.put(request, responseClone));
                            return fetchResponse;
                        });
                })
        );
        return;
    }
    
    // HTML pages - Network First with cache fallback
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then(cache => cache.put(request, responseClone));
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => {
                            return response || caches.match('./index.html');
                        });
                })
        );
        return;
    }
    
    // Default - Network First
    event.respondWith(
        fetch(request)
            .catch(() => caches.match(request))
    );
});
