import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AplicacaoRoutingModule } from './aplicacao.routing.module';
import { AplicacaoListarComponent } from './aplicacao-listar/aplicacao-listar.component';
import { AplicacaoFormComponent } from './aplicacao-form/aplicacao-form.component';
import { AplicacaoService } from './../services/aplicacao.service';

@NgModule({
  imports: [
    FormsModule,SharedModule, AplicacaoRoutingModule
  ],
  exports: [AplicacaoListarComponent, AplicacaoFormComponent],
  declarations: [AplicacaoListarComponent, AplicacaoFormComponent],
  providers:[AplicacaoService]
})
export class AplicacaoModule { }
