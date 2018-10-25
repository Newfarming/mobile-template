// offline ga init
workbox.googleAnalytics.initialize();

// precache files
workbox.precaching.precacheAndRoute(
  self.__precacheManifest || [], {
    ignoreUrlParametersMatching: [/./],
    cleanUrls: false,
  }
);

// cache static image
// cache country flag image
workbox.routing.registerRoute(
  new RegExp('/static/img/flags/'),
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'flags-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        // Cache only 30 images
        maxEntries: 30,
      })
    ],
  })
)

// 跨域的请求一般要用networkFirst，staleWhileRevalidate，下面这种强制缓存不推荐
workbox.routing.registerRoute(
  new RegExp('^https://d3kpm7yklociqe.cloudfront.net/nsr/static/img/display_category/'),
  workbox.strategies.cacheFirst({
    cacheName: 'categories-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        // Cache only 120 images
        maxEntries: 120,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ]
  }),
)

// 商品图片缓存
workbox.routing.registerRoute(
  new RegExp('^https://d1vs5fqeka2glf.cloudfront.net/'),
  workbox.strategies.cacheFirst({
    cacheName: 'product-images-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 300,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ]
  }),

)

workbox.routing.registerRoute(
  new RegExp('^https://d3kpm7yklociqe.cloudfront.net/ext/theme/'),
  workbox.strategies.cacheFirst({
    cacheName: 'banner-images-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 10,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ]
  }),
)

workbox.routing.registerRoute(
  new RegExp('^https://d1n1fwner8zc14.cloudfront.net/static/img/'),
  workbox.strategies.cacheFirst({
    cacheName: 'static-images',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://storage.googleapis.com/workbox-cdn/releases/'),
  workbox.strategies.cacheFirst({
    cacheName: 'workbox-cdn',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 10
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('^https://d1n1fwner8zc14.cloudfront.net/static/icons'),
  workbox.strategies.cacheFirst({
    cacheName: 'icons-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ],
  })
)


// cache google analytics js
workbox.routing.registerRoute(
  new RegExp('^https://www.google-analytics.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-analytics',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 2
      })
    ]
  })
)

// cache facebook pixel js
workbox.routing.registerRoute(
  new RegExp('^https://connect.facebook.net/'),
  workbox.strategies.cacheFirst({
    cacheName: 'facebook-pixel',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 2
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('/static/'),
  workbox.strategies.cacheFirst({
    cacheName: 'server-static',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 50
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.networkFirst({
    cacheName: 'api-cache',
  })
)

const routerName = ["home","product","payment","account","service","orders","order","categories","cart","size","search","reviews","cod","trackinginfo","forgot","resetpassword"];
workbox.routing.registerRoute(
  // new RegExp('/')
  new RegExp('/('+routerName.join("|")+')(?!(.html|.html?.*))'),
  workbox.strategies.networkFirst({
    cacheName: 'url-cache',
  })
)
