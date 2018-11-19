
navigator.serviceWorker.register('/sw_practice.js').then(ServiceWorkerRegistration => {
  console.log('sw registered');
}).catch(err => {
  console.log('not registered', err);
});

fetch('https://www.omdbapi.com/?t=dangal&apikey=BanMePlz').then(res => { res.json().then(data => { 
  document.getElementById('data').innerHTML = `
    <h2>${data.Title}</h2>
    <img src="${data.Poster}">
  `;
}).catch(err=>{console.log(err,'1')});
}).catch(err => { console.log(err,'2'); })

