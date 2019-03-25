self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/zcq/',
        '/zcq/index.html',
        '/zcq/index.js',
        '/zcq/error.html',
        '/zcq/img/img_404error.png'
      ])
    })
  )
})
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response !== undefined) {
          console.log('caches.match() message is:' + response)
          return response
        } else {
          return fetch(event.request).then(response => {
            let responseClone = response.clone()
            caches.open('v1').then(cache => {
              cache.put(event.request, responseClone)
            })
            return response
          })
        }
      })
      .catch(() => {
        return caches.match('/error.html')
      })
  )
})
