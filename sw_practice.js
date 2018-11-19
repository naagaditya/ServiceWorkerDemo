let cacheName = 'v1';

self.addEventListener('install', event => {
  console.log('insatlling service worker.......');
  event.waitUntil(
    console.log('intalled'),
    // caches.open(cacheName).then(cache => {
    //   cache.addAll(['/' ,'./index.html','./main.css','./main.js']);
    // })
  );
});

self.addEventListener('activate', event => {
  console.log('activating service worker.......');
  event.waitUntil(

    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {

        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {

          // Delete that cached file
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    }).then(x=>{console.log(x,'done')})
  ); 
});

self.addEventListener('fetch', event => {
  console.log('fetching', event.request.url);
  event.waitUntil(console.log('fetched'));
  event.respondWith(
    fetch(event.request).then(response => {
      const responseClone = response.clone();
      if (!responseClone.ok && responseClone.type !='opaque') {
        throw new Error('s w w');
      }
      caches.open(cacheName).then(cache => {
        // cache.add(event.request.url);
        cache.put(event.request, responseClone).then(y=>{
          console.log('cached ', event.request.url, ' in ', cacheName, responseClone);
          // caches.open(cacheName).then(cache => {
          //   cache.keys().then(key => {
          //     key.forEach(k=>{
  
          //       caches.match(k, { ignoreSearch: true, ignoreMethod: true, ignoreVary:true}).then(r=>{
          //         if (k.url == event.request.url) {
                    
          //           console.log(k,r);
          //         }
          //       })
          //     })
          //   });
          // });
        });
      });
      return response;
    }).catch(err => {
      console.log('getting from cache', event.request.url);
      return caches.match(event.request, { ignoreVary: true }).then(res => {
        return res;
      });
    })
  );
});