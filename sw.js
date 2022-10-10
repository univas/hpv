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
                './src/img/utero.png',
                './src/img/ALERTA.png',
                './src/img/canto inferior.png',
                './src/img/canto superior.png',
                './src/img/ESTETO.png',
                './src/img/icon-512x512.png',
                './src/img/INTERROGAÇÃO.png',
                './src/img/logo-univas.png',
                './src/img/LUVA.png',
                './src/img/MULHER.png',
                './src/img/PROTEÇÃO.png',
                '.src/img/maskable_icon_x384.png'
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