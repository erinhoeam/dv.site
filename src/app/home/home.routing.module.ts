import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
    { path: '', canActivate: [AuthService], component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }