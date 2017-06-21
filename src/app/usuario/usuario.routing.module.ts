import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { ConfirmeEmailComponent } from './confirme-email/confirme-email.component';
import { RegistroComponent } from './registro/registro.component';
import { ResetarSenhaComponent } from './resetar-senha/resetar-senha.component';

const usuarioRoutes: Routes = [
  { 
    path: '', component: UsuarioMainComponent,
    children : [
      { path: 'registrar', component: RegistroComponent},
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
