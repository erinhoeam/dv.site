import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { EmpresaRoutingModule } from './empresa.routing.module';

import { EmpresaService } from './../services/empresa.service';
import { AplicacaoService } from './../services/aplicacao.service';

import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpresaListarComponent } from './empresa-listar/empresa-listar.component';

@NgModule({
  imports: [
    FormsModule,SharedModule, EmpresaRoutingModule
  ],
  declarations: [EmpresaListarComponent, EmpresaFormComponent],
  exports: [EmpresaListarComponent,EmpresaFormComponent],
  providers:[EmpresaService,AplicacaoService]
})
export class EmpresaModule { }
