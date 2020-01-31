import { Component, OnInit, Inject } from '@angular/core';
import { ProfileRepository } from 'src/app/repository/profile-repository';
import { PROFILE_REPOSITORY } from 'src/app/configuration/injection-tokents';

@Component({
  selector: 'app-profiles-container',
  templateUrl: './profiles-container.component.html',
  styleUrls: ['./profiles-container.component.scss']
})
export class ProfilesContainerComponent implements OnInit {

  constructor(@Inject(PROFILE_REPOSITORY) private profileRepository: ProfileRepository) { }

  ngOnInit() {
    
  }

}
