import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  { 
    path: '', 
    loadChildren: './main-principal/main-principal.module#MainPrincipalModule'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
