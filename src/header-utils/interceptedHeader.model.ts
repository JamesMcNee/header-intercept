export interface InterceptedRequest {
    documentUrl: string,
    incognito: boolean,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | string,
    originUrl: string,
    parentFrameId: number,
    requestHeaders: BrowserRequestHeader[],
    requestId: string,
    requestSize: number,
    responseSize: number,
    tabId: number,
    thirdParty: boolean,
    timeStamp: number,
    type: string,
    url: string
}

export interface BrowserRequestHeader {
    name: string,
    value: string
}