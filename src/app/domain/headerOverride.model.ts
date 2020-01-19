import { Header } from "./header.model";

export interface HeaderOverride extends Header {
    id: string;
    enabled: boolean;
}