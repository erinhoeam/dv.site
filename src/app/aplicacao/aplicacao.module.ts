import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AplicacaoRoutingModule } from './aplicacao.routing.module';
import { AplicacaoListarComponent } from './aplicacao-listar/aplicacao-listar.component';
import { AplicacaoFormComponent } from './aplicacao-form/aplicacao-form.component';
import { AplicacaoService } from './../services/aplicacao.service';
import { AplicacaoMainComponent } from './aplicacao-main/aplicacao-main.component';

@NgModule({
  imports: [
    FormsModule,SharedModule, AplicacaoRoutingModule
  ],
  exports: [AplicacaoListarComponent, AplicacaoFormComponent],
  declarations: [AplicacaoListarComponent, AplicacaoFormComponent, AplicacaoMainComponent],
  providers:[AplicacaoService]
})
export class AplicacaoModule { }
