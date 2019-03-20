self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/zcq/', '/zcq/index.html', '/zcq/index.js'])
    })
  )
})
