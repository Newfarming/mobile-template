console.log('hello from sw.js')
if (workbox) {
  console.log('workbox=>', workbox)
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

// precache files
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Register a Navigation Route
workbox.routing.registerNavigationRoute('index.html')

// cache static image
// cache country flag image
workbox.routing.registerRoute(
  new RegExp('/static/img/flags/*'),
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'flags-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        // maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
)

// 跨域的请求一般要用networkFirst，staleWhileRevalidate，下面这种强制缓存不推荐
workbox.routing.registerRoute(
  new RegExp('^http://114.55.75.116:10080/nsr/static/img/display_category/'),
  workbox.strategies.cacheFirst({
    cacheName: 'categories-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
)

workbox.routing.registerRoute(
  new RegExp('^http://d1vs5fqeka2glf.cloudfront.net/'),
  workbox.strategies.networkFirst({
    cacheName: 'product-images-cache',
  }),
)

workbox.routing.registerRoute(
  new RegExp('^http://d3kpm7yklociqe.cloudfront.net/ext/theme/'),
  workbox.strategies.networkFirst({
    cacheName: 'banner-images-cache',
  }),
)

workbox.routing.registerRoute(
  new RegExp('/static/img/*'),
  workbox.strategies.staleWhileRevalidate()
)

// cache response
workbox.routing.registerRoute(
  new RegExp('/v1|v2/*'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200, 404],
        // headers: {
        //   'X-Is-Cacheable': 'true',
        // },
      })
    ]
  })
)
