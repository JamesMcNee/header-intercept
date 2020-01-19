import { HeaderOverride } from './headerOverride.model';

export interface URLFilter {
    id: string;
    name: string;
    matcher: RegExp;
    requestHeaderOverrides: HeaderOverride[];
    enabled: boolean;
    precidence: number;
}