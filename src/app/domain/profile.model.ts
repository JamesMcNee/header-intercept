export interface Profile {
    id: string;
    name: string;
    enabled: boolean;
    urlMatches: URLMatch[];
    requestHeaders: RequestHeaders[];
}

interface URLMatch {
    enabled: boolean;
    regex: RegExp | string;
}

interface RequestHeaders {
    enabled: boolean;
    name: string;
    value: string;
} 