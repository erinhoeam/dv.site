import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";

import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from 'app/models/empresa';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.css']
})
export class EmpresaListarComponent extends BaseComponent implements OnInit {
  
  public empresas:Empresa[];

  constructor(private empresaService:EmpresaService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
      super(toastr,vcr,routerC);
  }

  ngOnInit() {
     this.showToastrInfo('Listando...');
     this.empresaService.listar()
       .subscribe(
         response => { this.onListarComplete(response) },
         error => { this.onError(error) });
  }

  onListarComplete(entities: Empresa[]) {
    this.empresas = entities;
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
