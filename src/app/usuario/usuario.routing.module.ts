import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';

import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { ConfirmeEmailComponent } from './confirme-email/confirme-email.component';
import { RegistroComponent } from './registro/registro.component';
import { ResetarSenhaComponent } from './resetar-senha/resetar-senha.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

const usuarioRoutes: Routes = [
  { 
    path: '', component: UsuarioMainComponent,
    children : [
      { path: 'registrar', canActivate: [AuthService], component: RegistroComponent},
      { path: 'alterar-senha', canActivate: [AuthService], component: AlterarSenhaComponent},
      { path: 'confirmacao/:id/:code', component:ConfirmeEmailComponent},
      { path: 'resetar/:id/:code', component:ResetarSenhaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usuarioRoutes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
