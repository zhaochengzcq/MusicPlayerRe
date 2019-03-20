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
let flg = 0
let arr = ['a', 'b', 'c']
function clickMe() {
  flg === 2 ? (flg = 0) : (flg += 1)
  document.getElementById('myImg').src = 'img/img_' + arr[flg] + '.jpg'
  console.log(document.getElementById('myImg').src)
}
document.getElementById('click').addEventListener('click', clickMe)
