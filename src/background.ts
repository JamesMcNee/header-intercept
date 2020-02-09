/// <reference types="chrome"/>

import { Profile } from "./app/domain/profile.model";
import { InterceptedRequest, BrowserRequestHeader } from "./header-utils/interceptedHeader.model";

class ProfileStore {
  public getProfiles(): Profile[] {
    const encodedProfiles: string = localStorage.getItem("profiles");

    if (!!encodedProfiles) {
      const decodedProfiles: { profiles: Profile[] } = JSON.parse(encodedProfiles);

      if (!!decodedProfiles && !!decodedProfiles.profiles) {
        return decodedProfiles.profiles;
      }
    }

    return [];
  }
}

class HeaderApplicationUtils {
  public static filterProfilesMatchingRequest(request: InterceptedRequest, profiles: Profile[]): Profile[] {
    return profiles.filter(profile => profile.enabled && 
      profile.urlMatches.some(urlMatch => {
        let passesRegex: boolean;

        try {
          passesRegex = new RegExp(urlMatch.regex, "g").test(request.documentUrl);
        } catch (error) {
          passesRegex = urlMatch.regex === request.documentUrl;
        }

        return urlMatch.enabled && passesRegex;
      })
    );
  }

  public static createRequestHeaders(request: InterceptedRequest, profiles: Profile[]): BrowserRequestHeader[] {
    const headerMap: {[key: string]: string} = {};
    request.requestHeaders.forEach((header: BrowserRequestHeader) => headerMap[header.name] = header.value);

    // Reverse first so that the order of overriding will cascade from last -> first.
    profiles.reverse().forEach(profile => {
      if (profile.enabled) {
        profile.requestHeaders.forEach(requestHeader => {
          if (requestHeader.enabled) {
            headerMap[requestHeader.name] = requestHeader.value;
          }
        })
      }
    });

    return Object.entries(headerMap).map(entry => { return { name: entry[0], value: entry[1]} }).sort((a, b) => a.name.localeCompare(b.name));
  }
}

const profileStore: ProfileStore = new ProfileStore();

chrome.webRequest.onBeforeSendHeaders.addListener(
  (currentRequest: any) => {
    const matchingProfiles = HeaderApplicationUtils.filterProfilesMatchingRequest(currentRequest, profileStore.getProfiles());
    const newRequestHeaders = HeaderApplicationUtils.createRequestHeaders(currentRequest, matchingProfiles);

    return { requestHeaders: newRequestHeaders };
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders', 'blocking']
)