/// <reference types="chrome"/>

import { Profile } from "./app/domain/profile.model";

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

const profileStore: ProfileStore = new ProfileStore();

chrome.webRequest.onBeforeSendHeaders.addListener(
  (x) => {
    console.log(x);
    console.log(profileStore.getProfiles())
  },
  { urls: ['<all_urls>'] },
  ['requestHeaders', 'blocking']
)