if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/zcq/sw.js', { scope: '/zcq/' })
    .then(reg => {
      console.log(reg)
    })
    .catch(error => {
      console.log(error)
    })
}
