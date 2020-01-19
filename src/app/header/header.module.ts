import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { HEADER_REDUCERS } from './+state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { HEADER_EFFECTS } from './+state/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('header', HEADER_REDUCERS),
    EffectsModule.forFeature(HEADER_EFFECTS)
  ]
})
export class HeaderModule { }
