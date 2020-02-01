import { LocalstorageProfileRepository } from "../localstorage-profile-repository.service";
import { ProfileRepository } from "../profile-repository";
import { TestBed, getTestBed } from '@angular/core/testing';
import { MockLocalstorage } from './mock-localstorage';
import { Profile } from 'src/app/domain/profile.model';
import { TestProfileBuilder } from './test-profile.builder';
import { skip } from 'rxjs/operators';

describe('Localstorage Profile Repository', () => {

    let repository: ProfileRepository;

    let mockLocalstorage: MockLocalstorage

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocalstorageProfileRepository
            ]
        });

        const testBed = getTestBed();
        repository = testBed.get(LocalstorageProfileRepository);

        mockLocalstorage = MockLocalstorage.createStore();

        spyOn(localStorage, 'getItem').and.callFake(key => mockLocalstorage.getItem(key));
        spyOn(localStorage, 'setItem').and.callFake((key, value) => mockLocalstorage.setItem(key, value));
        spyOn(localStorage, 'removeItem').and.callFake(key => mockLocalstorage.removeItem(key));
        spyOn(localStorage, 'clear').and.callFake(() => mockLocalstorage.clear());
    });

    describe('has(id: string)', () => {
        it('should return true when profile is present', () => {
            // given
            const presentProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'NEW_ID' };
            populateProfileStore(presentProfile);

            // when
            const hasProfile: boolean = repository.has('NEW_ID');

            // then
            expect(hasProfile).toBe(true);
        });

        it('should return false when profile is not present', () => {
            // given
            createEmptyProfileStore();

            // when
            const hasProfile: boolean = repository.has('NEW_ID');

            // then
            expect(hasProfile).toBe(false);
        });
    });

    describe('get(id: string)', () => {
        it('should return profile when profile with matching id is present', () => {
            // given
            const presentProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'NEW_ID' };
            populateProfileStore(presentProfile);

            // when
            const actual: Profile = repository.get('NEW_ID');

            // then
            expect(actual).toEqual(presentProfile);
        });

        it('should return undefined when profile with matching id is not present', () => {
            // given
            const presentProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'SOME_RANDOM_ID' };
            populateProfileStore(presentProfile);

            // when
            const actual: Profile = repository.get('NEW_ID');

            // then
            expect(actual).toBeUndefined();
        });
    });

    describe('getAll()', () => {
        it('should return all stored profiles when there are profiles stored', () => {
            // given
            const profileOne: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_ONE' };
            const profileTwo: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_TWO' };
            populateProfileStore(profileOne, profileTwo);

            // when
            const actual: Profile[] = repository.getAll();

            // then
            expect(actual).toEqual([profileOne, profileTwo]);
        });

        it('should return an empty array when there are no profiles', () => {
            // given
            createEmptyProfileStore();

            // when
            const actual: Profile[] = repository.getAll();

            // then
            expect(actual.length).toBe(0);
        });
    });

    describe('getAllAsObservable()', () => {
        it('should return all stored profiles when there are profiles stored', (done) => {
            // given
            const profileOne: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_ONE' };
            const profileTwo: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_TWO' };
            populateProfileStore(profileOne, profileTwo);

            // when / then
            repository.getAllAsObservable().subscribe(profiles => {
                expect(profiles.length).toEqual(2);
                expect(profiles).toContain(profileOne);
                expect(profiles).toContain(profileTwo);
                done();
            });
        });

        it('should refire the observable when profile is persisted', (done) => {
            // given
            createEmptyProfileStore();

            // then
            repository.getAllAsObservable().pipe(skip(1)).subscribe(profiles => {
                expect(profiles.length).toEqual(1);
                expect(profiles).toContain(newProfile);
                done();
            });

            // when
            const newProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'NEW_PROFILE' };
            repository.persist(newProfile);
        });
    });

    describe('persist(profile: Profile)', () => {
        it('should persist the passed in profile', () => {
            // given
            const profile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_ONE' };
            createEmptyProfileStore();

            // when
            repository.persist(profile);

            // then
            expect(repository.has("PROFILE_ONE")).toBe(true);
        });

        it('should overwrite a profile if one with the same ID is found', () => {
            // given
            const existingProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE', name: "OLD_NAME" };
            populateProfileStore(existingProfile);

            // when
            const updatedProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE', name: "NEW_NAME" };
            repository.persist(updatedProfile);

            // then
            const actual: Profile = repository.get("EXISTING_PROFILE");
            expect(actual).toEqual(updatedProfile);
            expect(actual.name).toEqual("NEW_NAME");
        });
    });

    describe('persistAll(profiles: Profile[])', () => {
        it('should persist all the passed in profiles', () => {
            // given
            const profileOne: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_ONE' };
            const profileTwo: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_TWO' };
            createEmptyProfileStore();

            // when
            repository.persistAll([profileOne, profileTwo]);

            // then
            expect(repository.has("PROFILE_ONE")).toBe(true);
            expect(repository.has("PROFILE_TWO")).toBe(true);
        });

        it('should persist all the passed in profiles; overwriting any that already exist', () => {
            // given
            const existingProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE', name: "OLD_NAME" };
            const newProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'NEW_PROFILE' };
            populateProfileStore(existingProfile);

            // when
            const updatedProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE', name: "NEW_NAME" };
            repository.persistAll([updatedProfile, newProfile]);

            // then
            expect(repository.getAll()).toEqual([updatedProfile, newProfile]);
        });
    });

    describe('remove(id: string)', () => {
        it('should delete a profile where the id matches; returning the profile that has been removed', () => {
            // given
            const existingProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE' };
            populateProfileStore(existingProfile);
            expect(repository.has("EXISTING_PROFILE")).toEqual(true);

            // when
            const actual = repository.remove("EXISTING_PROFILE");

            // then
            expect(repository.has("EXISTING_PROFILE")).toEqual(false);
            expect(actual).toEqual(existingProfile);
        });

        it('should return undefined when no profile with a matching ID could be found', () => {
            // given
            createEmptyProfileStore();
            expect(repository.has("PROFILE_ID")).toEqual(false);

            // when
            const actual = repository.remove("PROFILE_ID");

            // then
            expect(actual).toBeUndefined();
        });
    });

    describe('remove(profile: Profile)', () => {
        it('should delete a profile where the id of the input profile matches; returning the profile that has been removed', () => {
            // given
            const existingProfile: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE', name: "ACTUAL_NAME" };
            populateProfileStore(existingProfile);
            expect(repository.has("EXISTING_PROFILE")).toEqual(true);

            // when
            const profileToRemove: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'EXISTING_PROFILE', name: "FAKE_NAME" };
            const actual = repository.remove(profileToRemove);

            // then
            expect(repository.has("EXISTING_PROFILE")).toEqual(false);
            expect(actual.name).toEqual("ACTUAL_NAME");
            expect(actual).toEqual(existingProfile);
        });

        it('should return undefined when no profile with a matching ID could be found', () => {
            // given
            createEmptyProfileStore();
            expect(repository.has("PROFILE_ID")).toEqual(false);

            // when
            const profileToRemove: Profile = { ...TestProfileBuilder.anExampleProfile(), id: 'PROFILE_ID' };
            const actual = repository.remove(profileToRemove);

            // then
            expect(actual).toBeUndefined();
        });
    });

    /* TEST HELPER FUNCTIONS */
    function createEmptyProfileStore(): void {
        populateProfileStore();
    }

    function populateProfileStore(...profile: Profile[]): void {
        localStorage.setItem('profiles', JSON.stringify({ 'profiles': profile }))
    }
});