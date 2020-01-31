import { InjectionToken } from '@angular/core';
import { ProfileRepository } from '../repository/profile-repository';

export const PROFILE_REPOSITORY = new InjectionToken<ProfileRepository>('Profile repository implementation');