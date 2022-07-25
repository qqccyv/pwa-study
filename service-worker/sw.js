self.addEventListener('install', (event) => {
  console.log('install', event);
  // self.skipWaiting() serviceWorker下载后手动跳过等待阶段，直接激活 触发active事件
  // event.waitUntil 包裹一个异步事件，防止在异步事件执行完之前 serviceWorker 就已经安装完成了。
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', (event) => {
  console.log('activate', event);
  // clients.claim()  使当前激活的serviceWorker立即生效并控制当前的页面
  event.waitUntil(clients.claim());
})
self.addEventListener('fetch', (event) => {
  console.log('fetch', event);
})