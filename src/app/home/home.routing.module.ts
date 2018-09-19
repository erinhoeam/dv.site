import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';

import { HomeMainComponent } from './home-main/home-main.component';
import { HomeComponent } from './home.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: HomeMainComponent,
    children: [ 
      { path: 'inicial', canActivate: [AuthService], component: HomeComponent },
      { path: 'acesso-negado', component: AcessoNegadoComponent } 
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }