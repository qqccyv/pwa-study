// 通过更新 CACHE_NAME 版本号来清理旧的缓存
const CACHE_NAME = "cache_v3"

// install 周期中主要工作是缓存对应的资源
self.addEventListener('install', async (event) => {
  console.log('install', event);
  try {
    // 开启一个缓存对象 111
    const cache = await caches.open(CACHE_NAME)
    // 将对应的静态资源缓存
    await cache.addAll([
      './data.json',
      './index.css',
      './index.html',
      './images/256x256.png',
      './manifest.json'
    ])
    // 跳过等待阶段
    await self.skipWaiting()
  } catch (error) {
    console.error(error);
  }
})

// activate 周期中主要工作是清理不需要的缓存资源

self.addEventListener('activate', async (event) => {
  console.log('activate', event);
  const keys = await caches.keys()
  keys.forEach(cacheKey => {
    // 如果缓存名已经过期或者被变更，就删除旧的缓存
    if (cacheKey != CACHE_NAME) {
      caches.delete(cacheKey)
    }
  });
  // clients.claim()  使当前激活的serviceWorker立即生效并控制当前的页面
  await clients.claim()
})
self.addEventListener('fetch', async (event) => {
  // 优先网络，如果请求失败，则读取缓存 
  // event.respondWith(fetch(event.request).catch(() => caches.match(event.request)))
  try {
    console.log('1111111');
    event.respondWith(fetch(event.request.url.replace(new URL(event.request.url).hostname, 'localhost')))
  } catch (error) {
    console.log('2222222');
    event.respondWith(caches.match(event.request))
  }


})

