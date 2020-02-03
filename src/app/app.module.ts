import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AddEditProfileContainerComponent } from './containers/add-edit-profile-container/add-edit-profile-container.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilesContainerComponent,
    HeaderComponent,
    ViewProfilesComponent,
    IsArePipe,
    FooterComponent,
    AddEditProfileContainerComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: PROFILE_REPOSITORY, useClass: LocalstorageProfileRepository },
    { provide: HINTS_SERVICE, useClass: LocalHintsService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
