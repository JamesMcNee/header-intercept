/// <reference path="../node_modules/@types/chrome/index.d.ts"/>

chrome.webRequest.onBeforeSendHeaders.addListener(
    (x) => console.log(x),
      { urls: ['<all_urls>'] },
      ['requestHeaders', 'blocking']
)