import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { version } from '../../../manifest.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public get appVersion(): string {
    return version;
  }
}
