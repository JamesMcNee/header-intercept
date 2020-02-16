export interface Profile {
    id: string;
    name: string;
    enabled: boolean;
    urlMatches: URLMatch[];
    requestHeaders: RequestHeader[];
}

interface URLMatch {
    enabled: boolean;
    regex: string;
}

export interface RequestHeader {
    id: string;
    enabled: boolean;
    name: string;
    value: string;
    functionsToApply?: string[];
} 