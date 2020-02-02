import { Component, OnInit, Inject } from '@angular/core';
import { ProfileRepository } from 'src/app/repository/profile-repository';
import { PROFILE_REPOSITORY } from 'src/app/configuration/injection-tokens';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/domain/profile.model';

@Component({
  selector: 'app-profiles-container',
  templateUrl: './profiles-container.component.html',
  styleUrls: ['./profiles-container.component.scss']
})
export class ProfilesContainerComponent implements OnInit {

  protected profiles$: Observable<Profile[]>;

  constructor(@Inject(PROFILE_REPOSITORY) private profileRepository: ProfileRepository) { }

  ngOnInit() {
    // this.profileRepository.persist({...TestProfileBuilder.anExampleFullProfile(), id: (Math.random() * 100).toString()});
    this.profiles$ = this.profileRepository.getAllAsObservable();
  }

  handleProfileUpdate(profile: Profile): void {
    this.profileRepository.persist(profile);
  }

  handleDeleteProfile(id: string): void {
    this.profileRepository.remove(id);
  }
}
