import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/domain/profile.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() profile: Profile;

  profileForm: FormGroup;
  urlFiltersArray: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.urlFiltersArray = this.formBuilder.array(this.profile.urlMatches.map(urlMatch => {
      return this.formBuilder.group({
        'url': urlMatch.regex,
        'enabled': urlMatch.enabled
      })
    }));

    this.profileForm = this.formBuilder.group({
      'name': this.profile.name,
      'enabled': this.profile.enabled,
      'urlFilters': this.urlFiltersArray
    });
  }

  addUrlFilter(): void {
    this.urlFiltersArray.push(this.formBuilder.group({
      'url': '',
      'enabled': false
    }));
  }

}
