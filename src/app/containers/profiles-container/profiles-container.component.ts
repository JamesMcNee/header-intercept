import { Component, OnInit, Inject } from '@angular/core';
import { ProfileRepository } from 'src/app/repository/profile-repository';
import { PROFILE_REPOSITORY } from 'src/app/configuration/injection-tokens';
import { Observable } from 'rxjs';
import { Guid } from "guid-typescript";
import { Profile } from 'src/app/domain/profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-container',
  templateUrl: './profiles-container.component.html',
  styleUrls: ['./profiles-container.component.scss']
})
export class ProfilesContainerComponent implements OnInit {

  profiles$: Observable<Profile[]>;

  constructor(@Inject(PROFILE_REPOSITORY) private profileRepository: ProfileRepository, private router: Router) { }

  ngOnInit() {
    this.profiles$ = this.profileRepository.getAllAsObservable();
  }

  handleProfileUpdate(profile: Profile): void {
    this.profileRepository.persist(profile);
  }

  handleDeleteProfile(id: string): void {
    this.profileRepository.remove(id);
  }

  handleAddProfile(): void {
    this.navigateToEditProfile();
  }

  handleEditProfile(id: string): void {
    this.navigateToEditProfile(id);
  }

  private navigateToEditProfile(id?: string): void {
    this.router.navigate(['/profile', id || Guid.create().toString()]);
  }
}
