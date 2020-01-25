import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_REDUCERS } from './+state/reducers';
import { APP_EFFECTS } from './+state/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forFeature('app', APP_REDUCERS),
    EffectsModule.forFeature(APP_EFFECTS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
