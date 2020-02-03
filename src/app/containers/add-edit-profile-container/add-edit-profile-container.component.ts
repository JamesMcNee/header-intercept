import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/domain/profile.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileRepository } from 'src/app/repository/profile-repository';
import { PROFILE_REPOSITORY } from 'src/app/configuration/injection-tokens';

@Component({
  selector: 'app-add-edit-profile-container',
  templateUrl: './add-edit-profile-container.component.html',
  styleUrls: ['./add-edit-profile-container.component.scss']
})
export class AddEditProfileContainerComponent implements OnInit {

  activeProfile: Observable<Profile>;

  constructor(private activatedRoute: ActivatedRoute, @Inject(PROFILE_REPOSITORY) private profileRepository: ProfileRepository) { }

  ngOnInit() {
    this.activeProfile = this.activatedRoute.params.pipe(
      map(params => params['id']),
      map(id => {
        if (!this.profileRepository.has(id)) {
          this.profileRepository.persist({id: id, name: 'New profile', enabled: false, urlMatches: [], requestHeaders: []});
        }

        return this.profileRepository.get(id);
      })
    );
  }

}
