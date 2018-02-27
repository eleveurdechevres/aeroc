module.exports = { contents: "\"use strict\";\r\n// In production, we register a service worker to serve assets from local cache.\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n// This lets the app load faster on subsequent visits in production, and gives\r\n// it offline capabilities. However, it also means that developers (and users)\r\n// will only see deployed updates on the \"N+1\" visit to a page, since previously\r\n// cached resources are updated in the background.\r\n// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.\r\n// This link also includes instructions on opting out of this behavior.\r\nvar isLocalhost = Boolean(window.location.hostname === 'localhost' ||\r\n    // [::1] is the IPv6 localhost address.\r\n    window.location.hostname === '[::1]' ||\r\n    // 127.0.0.1/8 is considered localhost for IPv4.\r\n    window.location.hostname.match(/^127(?:\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));\r\nfunction register() {\r\n    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {\r\n        // The URL constructor is available in all browsers that support SW.\r\n        var publicUrl = new URL(process.env.PUBLIC_URL, window.location);\r\n        if (publicUrl.origin !== window.location.origin) {\r\n            // Our service worker won't work if PUBLIC_URL is on a different origin\r\n            // from what our page is served on. This might happen if a CDN is used to\r\n            // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374\r\n            return;\r\n        }\r\n        window.addEventListener('load', function () {\r\n            var swUrl = process.env.PUBLIC_URL + \"/service-worker.js\";\r\n            if (isLocalhost) {\r\n                // This is running on localhost. Lets check if a service worker still exists or not.\r\n                checkValidServiceWorker(swUrl);\r\n            }\r\n            else {\r\n                // Is not local host. Just register service worker\r\n                registerValidSW(swUrl);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.default = register;\r\nfunction registerValidSW(swUrl) {\r\n    navigator.serviceWorker\r\n        .register(swUrl)\r\n        .then(function (registration) {\r\n        registration.onupdatefound = function () {\r\n            var installingWorker = registration.installing;\r\n            installingWorker.onstatechange = function () {\r\n                if (installingWorker.state === 'installed') {\r\n                    if (navigator.serviceWorker.controller) {\r\n                        // At this point, the old content will have been purged and\r\n                        // the fresh content will have been added to the cache.\r\n                        // It's the perfect time to display a \"New content is\r\n                        // available; please refresh.\" message in your web app.\r\n                        console.log('New content is available; please refresh.');\r\n                    }\r\n                    else {\r\n                        // At this point, everything has been precached.\r\n                        // It's the perfect time to display a\r\n                        // \"Content is cached for offline use.\" message.\r\n                        console.log('Content is cached for offline use.');\r\n                    }\r\n                }\r\n            };\r\n        };\r\n    })\r\n        .catch(function (error) {\r\n        console.error('Error during service worker registration:', error);\r\n    });\r\n}\r\nfunction checkValidServiceWorker(swUrl) {\r\n    // Check if the service worker can be found. If it can't reload the page.\r\n    fetch(swUrl)\r\n        .then(function (response) {\r\n        // Ensure service worker exists, and that we really are getting a JS file.\r\n        if (response.status === 404 ||\r\n            response.headers.get('content-type').indexOf('javascript') === -1) {\r\n            // No service worker found. Probably a different app. Reload the page.\r\n            navigator.serviceWorker.ready.then(function (registration) {\r\n                registration.unregister().then(function () {\r\n                    window.location.reload();\r\n                });\r\n            });\r\n        }\r\n        else {\r\n            // Service worker found. Proceed as normal.\r\n            registerValidSW(swUrl);\r\n        }\r\n    })\r\n        .catch(function () {\r\n        console.log('No internet connection found. App is running in offline mode.');\r\n    });\r\n}\r\nfunction unregister() {\r\n    if ('serviceWorker' in navigator) {\r\n        navigator.serviceWorker.ready.then(function (registration) {\r\n            registration.unregister();\r\n        });\r\n    }\r\n}\r\nexports.unregister = unregister;\r\n",
dependencies: ["process"],
sourceMap: {},
headerContent: ["/* fuse:injection: */ var process = require(\"process\");"],
mtime: 1514562041978,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}