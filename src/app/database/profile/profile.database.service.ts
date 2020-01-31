import { DatabaseService, DATABASE_COLLECTIONS } from '../database.service';
import { Profile } from './domain/profile.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileDatabaseService extends DatabaseService {

    private static COLLETION_NAME: string = DATABASE_COLLECTIONS.PROFILES;
    
    constructor() {
        super();
    }

    private get profiles(): Collection<Profile> {
        return this.db.getCollection(ProfileDatabaseService.COLLETION_NAME);
    }

    public clearDownCollection(): boolean {
        return super.clearDownCollection(ProfileDatabaseService.COLLETION_NAME);
    }

    public addProfile(profile: Profile) {
        this.profiles.insert(profile);
    }

    public getProfiles(): Profile[] {
        if (!!this.profiles) {
            console.log(this.profiles);
            return this.profiles.find({});
        }

        return [];
    }

}