import { Injectable } from '@angular/core';
import { ProfileRepository } from './profile-repository';
import { Profile } from '../domain/profile.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class LocalstorageProfileRepository implements ProfileRepository {

    private static PROFILES_KEY: string = 'profiles';

    private profileSubject: Subject<Profile[]>;

    constructor() {
        this.profileSubject = new BehaviorSubject<Profile[]>(this.getAll());
    }
    
    has(id: string): boolean {
        return !!this.getAllProfiles().find(profile => profile.id === id);
    }  

    get(id: string): Profile {
        return this.getAllProfiles().find(profile => profile.id === id);
    }

    getAll(): Profile[] {
        return this.getAllProfiles();
    }

    getAllAsObservable(): Observable<Profile[]> {
        this.profileSubject.next(this.getAll());

        return this.profileSubject.asObservable(); 
    }

    persist(profile: Profile): void {
        const profiles: Profile[] = this.getAllProfiles();

        const transformed: Profile[] = profiles.filter(p => p.id !== profile.id);
        transformed.push(profile);

        this.persistAllProfiles(transformed);
    }

    persistAll(profiles: Profile[]): void {
        const storedProfiles: Profile[] = this.getAllProfiles();

        let transformed: Profile[] = storedProfiles.filter(profile => !profiles.map(p => p.id).includes(profile.id));
        transformed = transformed.concat(profiles);

        this.persistAllProfiles(transformed);
    }

    remove(input: string | Profile): Profile {
        const storedProfiles: Profile[] = this.getAllProfiles();

        if (typeof input === 'string') {
            const transformed: Profile[] = storedProfiles.filter(profile => profile.id !== input);

            this.persistAllProfiles(transformed);

            return storedProfiles.find(profile => profile.id === input);
        } else if (!!input.id && typeof input.id === 'string') {
            return this.remove(input.id)
        } 
        
        throw Error('Invalid paramater passed, must be of type string | { id: string }');
    }

    private getAllProfiles(): Profile[] {
        const encodedProfiles: string = localStorage.getItem(LocalstorageProfileRepository.PROFILES_KEY);

        if (!!encodedProfiles) {
            const decodedProfiles: { profiles: Profile[] } = JSON.parse(encodedProfiles);

            if (!!decodedProfiles && !!decodedProfiles.profiles) {
                return decodedProfiles.profiles;
            }
        }

        return [];
    }

    private persistAllProfiles(profiles: Profile[]): void {
        const objectToEncode: { profiles: Profile[] } = {
            profiles: profiles
        }

        localStorage.setItem(LocalstorageProfileRepository.PROFILES_KEY, JSON.stringify(objectToEncode));
        this.profileSubject.next(this.getAll());
    }
}