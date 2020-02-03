import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesContainerComponent } from './containers/profiles-container/profiles-container.component';
import { AddEditProfileContainerComponent } from './containers/add-edit-profile-container/add-edit-profile-container.component';


const routes: Routes = [
  {
    path: '',
    component: ProfilesContainerComponent
  },
  {
    path: 'profile/:id',
    component: AddEditProfileContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
