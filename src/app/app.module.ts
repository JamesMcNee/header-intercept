import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilesContainerComponent } from './containers/profiles-container/profiles-container.component';
import { PROFILE_REPOSITORY } from './configuration/injection-tokents';
import { LocalstorageProfileRepository } from './repository/localstorage-profile-repository.service';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilesContainerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: PROFILE_REPOSITORY, useClass: LocalstorageProfileRepository }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
