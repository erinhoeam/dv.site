import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacaoMainComponent } from './aplicacao-main/aplicacao-main.component';
import { AplicacaoListarComponent } from './aplicacao-listar/aplicacao-listar.component';
import { AplicacaoFormComponent } from './aplicacao-form/aplicacao-form.component';
import { AuthService } from './../shared/auth.service';

const aplicacaoRoutes: Routes = [
    { path: '', canActivate: [AuthService], component: AplicacaoMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: AplicacaoListarComponent },  
    { path: 'novo', canActivate: [AuthService], component: AplicacaoFormComponent },
    { path: 'editar/:id', canActivate: [AuthService], component: AplicacaoFormComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(aplicacaoRoutes)],
  exports: [RouterModule]
})
export class AplicacaoRoutingModule { }