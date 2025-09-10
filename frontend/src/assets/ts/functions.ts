import {serviceDomains} from "./utils.ts";

export const isUrl = (value: string) => {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};


export function isValidServiceUrl(service: string, url: string): boolean {
    try {

        const parsed = new URL(url);
        return serviceDomains[service]?.some(domain => parsed.hostname.includes(domain));
    } catch {

        return false;
    }
}