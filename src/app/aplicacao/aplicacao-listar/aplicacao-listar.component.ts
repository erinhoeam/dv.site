import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { Aplicacao } from './../../models/aplicacao';
import { AplicacaoService } from './../../services/aplicacao.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

@Component({
  selector: 'app-aplicacao-listar',
  templateUrl: './aplicacao-listar.component.html',
  styleUrls: ['./aplicacao-listar.component.css']
})
export class AplicacaoListarComponent extends BaseComponent implements OnInit {
  
  public aplicacoes:Aplicacao[];

  constructor(private aplicacaoService:AplicacaoService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) { 
    super(toastr,vcr,routerC);
  }

  ngOnInit() {
    this.showToastrInfo('Listando...');
    this.aplicacaoService.listar()
      .subscribe(
        response => { this.onListarComplete(response) },
        error => { this.onError(error) });
  }
  onListarComplete(entities: Aplicacao[]) {
    this.aplicacoes = entities;
    this.hideToastrInfo();
    this.errors = [];
  }
  onError(error: any) 
  {
    if(this.verifyUnauthorized(error)) return;
    this.hideToastrInfo();
    this.showToastrError('Falha ao realizar a operação!',error);
  }

}
