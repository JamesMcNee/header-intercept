import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesContainerComponent } from './containers/profiles-container/profiles-container.component';


const routes: Routes = [
  {
    path: '',
    component: ProfilesContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
