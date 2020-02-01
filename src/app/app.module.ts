import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilesContainerComponent } from './containers/profiles-container/profiles-container.component';
import { PROFILE_REPOSITORY, HINTS_SERVICE } from './configuration/injection-tokens';
import { LocalstorageProfileRepository } from './repository/localstorage-profile-repository.service';
import { HeaderComponent } from './components/header/header.component';
import { ViewProfilesComponent } from './components/view-profiles/view-profiles.component';
import { IsArePipe } from './pipes/is-are.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { LocalHintsService } from './services/local-hints.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfilesContainerComponent,
    HeaderComponent,
    ViewProfilesComponent,
    IsArePipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: PROFILE_REPOSITORY, useClass: LocalstorageProfileRepository },
    { provide: HINTS_SERVICE, useClass: LocalHintsService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
