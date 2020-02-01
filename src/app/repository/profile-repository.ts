import { Profile } from '../domain/profile.model';
import { Observable } from 'rxjs';

export interface ProfileRepository {

    /**
     * Check if a profile exists by ID.
     * @param id the ID of the profile to check existence
     */
    has(id: string): boolean;

    /**
     * Get a profile by ID.
     * @param id the ID of the profile to retrieve
     */
    get(id: string): Profile | undefined;

    /**
     * Get all stored profiles.
    */
    getAll(): Profile[];

    /**
     * Get all stored profiles as observable
     * @returns an observable stream of all the avaliable profiles
     */
    getAllAsObservable(): Observable<Profile[]>;

    /**
     * Persist a profile, overwriting if a profile with the same ID is found.
     * @param profile the profile to persist
    */
    persist(profile: Profile): void;

    /**
     * Persist a collection of profiles, overwriting if a profile with the same ID is found.
     * @param profiles the profiles to persist
    */
    persistAll(profiles: Profile[]): void;

   /**
     * Remove a profile by ID.
     * @param id the ID of the profile to be removed
    */
    remove(id: string): Profile;

    /**
     * Remove the given profile
     * @param profile the Profile to be removed (based on ID match)
    */
    remove(profile: Profile): Profile;
}