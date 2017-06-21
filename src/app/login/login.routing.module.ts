import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginMainComponent } from './login-main/login-main.component';
import { LoginComponent } from './login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

const ROUTES: Routes = [
    { path: '', component: LoginMainComponent,
      children: [
        { path: 'entrar', component: LoginComponent},
        { path: 'recuperar', component: RecuperarSenhaComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
