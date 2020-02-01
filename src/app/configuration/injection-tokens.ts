import { InjectionToken } from '@angular/core';
import { ProfileRepository } from '../repository/profile-repository';
import { HintsService } from '../services/hits-service';

export const PROFILE_REPOSITORY = new InjectionToken<ProfileRepository>('Profile repository implementation');
export const HINTS_SERVICE = new InjectionToken<HintsService>('Hints service implementation');