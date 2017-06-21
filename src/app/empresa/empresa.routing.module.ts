import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { EmpresaMainComponent } from './empresa-main/empresa-main.component';
import { EmpresaListarComponent } from './empresa-listar/empresa-listar.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';

const aplicacaoRoutes: Routes = [
    { path: '', canActivate: [AuthService], component: EmpresaMainComponent, 
    children: [
    { path: 'listar', canActivate: [AuthService], component: EmpresaListarComponent },
    { path: 'novo', canActivate: [AuthService], component: EmpresaFormComponent },
    { path: 'editar/:id', canActivate: [AuthService], component: EmpresaFormComponent }]}
];

@NgModule({
  imports: [RouterModule.forChild(aplicacaoRoutes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }