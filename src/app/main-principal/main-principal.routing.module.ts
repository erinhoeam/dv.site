import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPrincipalComponent } from './main-principal.component';

const ROUTES: Routes = [
    {
        path: '', component: MainPrincipalComponent,
        children: [
            { path: 'aplicacao', loadChildren: './../aplicacao/aplicacao.module#AplicacaoModule' },
            { path: 'empresa', loadChildren: './../empresa/empresa.module#EmpresaModule' },
            { path: 'home', loadChildren: './../home/home.module#HomeModule' },
            { path: 'usuario', loadChildren: './../usuario/usuario.module#UsuarioModule' },
            { path: 'login', loadChildren: './../login/login.module#LoginModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MainPrincipalRoutingModule { }
