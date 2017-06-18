import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { EmpresaListarComponent } from './empresa-listar/empresa-listar.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';

const aplicacaoRoutes: Routes = [
    { path: 'empresa-listar', canActivate: [AuthService], component: EmpresaListarComponent },
    { path: 'empresa-form', canActivate: [AuthService], component: EmpresaFormComponent },
    { path: 'empresa-form/:id', canActivate: [AuthService], component: EmpresaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(aplicacaoRoutes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }