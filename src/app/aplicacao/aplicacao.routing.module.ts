import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacaoListarComponent } from './aplicacao-listar/aplicacao-listar.component';
import { AplicacaoFormComponent } from './aplicacao-form/aplicacao-form.component';
import { AuthService } from './../shared/auth.service';

const aplicacaoRoutes: Routes = [
    { path: 'aplicacao-listar', canActivate: [AuthService], component: AplicacaoListarComponent },
    { path: 'aplicacao-form', canActivate: [AuthService], component: AplicacaoFormComponent },
    { path: 'aplicacao-form/:id', canActivate: [AuthService], component: AplicacaoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(aplicacaoRoutes)],
  exports: [RouterModule]
})
export class AplicacaoRoutingModule { }