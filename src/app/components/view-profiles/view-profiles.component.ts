import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Profile } from 'src/app/domain/profile.model';

@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProfilesComponent implements OnInit {

  @Input() profiles: Profile[];

  constructor() {

  }

  ngOnInit() {
  }

  getProfileSummary(profile: Profile): { urlMatches: { total: number, active: number, inactive: number }, headers: { total: number, active: number, inactive: number }} {
    const activeUrlMatches: number = profile.urlMatches.filter(match => match.enabled).length;
    const inactiveUrlMatches: number = profile.urlMatches.filter(match => !match.enabled).length;
    const activeHeaders: number = profile.requestHeaders.filter(header => header.enabled).length;
    const inactiveHeaders: number = profile.requestHeaders.filter(header => !header.enabled).length;

    return {
      urlMatches: {
        total: activeUrlMatches + inactiveUrlMatches,
        active: activeUrlMatches,
        inactive: inactiveUrlMatches
      },
      headers: {
        total: activeHeaders + inactiveHeaders,
        active: activeHeaders,
        inactive: inactiveHeaders
      }
    }
  }

}