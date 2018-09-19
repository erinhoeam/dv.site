import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";
import { RetornoServico } from '../../models/retorno-servico';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { EmpresaService } from './../../services/empresa.service';
import { Empresa } from 'app/models/empresa';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.scss']
})
export class EmpresaListarComponent extends BaseComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  
  public empresas:Empresa[];
  empresa:Empresa;

  constructor(private empresaService:EmpresaService,
              public toastr: ToastsManager, 
              private routerC: Router,
              vcr: ViewContainerRef) {
    super(toastr,vcr,routerC);
    this.title = this.message.titles.EMPRESA.TITLE_LIST;
  }

  ngOnInit() {
     this.listarEmpresas();
  }

  listarEmpresas(){
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);

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
  public showChildModal(id:String):void {
    this.empresa = new Empresa();
    this.empresa.id = id;
    this.childModal.show();
  }
  public hideChildModal():void {
    this.childModal.hide();
  }
  public excluir(){
    
  }
}
