const cacheName = 'hpvproject'

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            cache.addAll([
                './',
                './index.html',
                'manifest.webmanifest',
                'script.js',
                'style.css',
                'reset.css',
                'img/utero.png',
                'img/ALERTA.png',
                'img/canto inferior.png',
                'img/canto superior.png',
                'img/ESTETO.png',
                'img/icon-512x512.png',
                'img/INTERROGAÇÃO.png',
                'img/logo-univas.png',
                'img/LUVA.png',
                'img/MULHER.png',
                'img/PROTEÇÃO.png',
                'img/utero-icon-main.png',
                'favicon.icon'

            ])
        })
    )
    return self.skipWaiting()
})

self.addEventListener('activate', e => {
    self.clients.claim()
})

self.addEventListener('fetch', async e => {
    const req = e.request
    const url = new URL(req.url)

    if (url.login === location.origin) {
        e.respondWith(cacheFirst(req))
    } else {
        e.respondWith(networkAndCache(req))
    }
})

async function cacheFirst(req) {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)

    return cached || fetch(req)
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName)
    try {
        const refresh = await fetch(req)
        await cache.put(req, refresh.clone)
        return refresh
    } catch (e) {
        const cached = await cache.match(req)
        return cached
    }
}