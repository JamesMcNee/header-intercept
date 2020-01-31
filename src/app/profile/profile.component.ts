import { Component, OnInit } from '@angular/core';
import { ProfileDatabaseService } from '../database/profile/profile.database.service';
import { Profile } from '../database/profile/domain/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _profileDatabaseService: ProfileDatabaseService) { }

  ngOnInit() {
  }

  addProfile() {
    this._profileDatabaseService.addProfile({
      id: "test",
      name: "Test name",
      enabled: true,
      urlMatches: [],
      requestHeaders: []
    });
  }

  getProfiles(): Profile[] {
    return this._profileDatabaseService.getProfiles();
  }

}
