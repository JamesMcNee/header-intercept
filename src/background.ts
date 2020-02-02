/// <reference types="chrome"/>

chrome.webRequest.onBeforeSendHeaders.addListener(
    (x) => console.log(x),
      { urls: ['<all_urls>'] },
      ['requestHeaders', 'blocking']
)