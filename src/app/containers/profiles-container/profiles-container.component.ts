import { Component, OnInit, Inject } from '@angular/core';
import { ProfileRepository } from 'src/app/repository/profile-repository';
import { PROFILE_REPOSITORY } from 'src/app/configuration/injection-tokents';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/domain/profile.model';
import { TestProfileBuilder } from 'src/app/repository/test/test-profile.builder';

@Component({
  selector: 'app-profiles-container',
  templateUrl: './profiles-container.component.html',
  styleUrls: ['./profiles-container.component.scss']
})
export class ProfilesContainerComponent implements OnInit {

  protected profiles$: Observable<Profile[]>;

  constructor(@Inject(PROFILE_REPOSITORY) private profileRepository: ProfileRepository) { }

  ngOnInit() {
    this.profileRepository.persist({...TestProfileBuilder.anExampleFullProfile()});
    this.profiles$ = this.profileRepository.getAllAsObservable();
  }

}
