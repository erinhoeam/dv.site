import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Empresa } from './../../models/empresa';
import { Aplicacao } from './../../models/aplicacao';
import { EmpresaAplicacao } from './../../models/empresaAplicacao';
import { ExcluirAplicacaoEmpresa } from './../../models/excluir-Aplicacao-Empresa';

import { EmpresaService } from './../../services/empresa.service';
import { AplicacaoService } from './../../services/aplicacao.service';

import { DateUtils } from './../../utils/date-utils';
import { GenericValidator } from './../../utils/generic-form-validator';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SelectComponent, SelectItem } from "ng2-select";

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.scss']
})
export class EmpresaFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('SelectAplicacao') selectAplicacao: SelectComponent
  @ViewChild('childModal') public childModal:ModalDirective;

  private myDatePickerOptions = DateUtils.getMyDatePickerOptions();
  inscricao: Subscription;
  success:boolean = false;
  public empresa:Empresa;
  empresaAplicacao:EmpresaAplicacao;
  excluirAplicacaoEmpresa:ExcluirAplicacaoEmpresa;
  formulario: FormGroup;
  formularioAplicacao:FormGroup;
  public aplicacoes:Aplicacao[];
  public items:Array<string>;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private empresaService:EmpresaService,
              private aplicacaoService:AplicacaoService) { 

            super(toastr,vcr,routerC);

            this.validationMessages = {
              nome: {
                  required: 'Nome requerido.',
                  minlength: 'O Nome precisa ter no mínimo 2 caracteres.',
                  maxlength: 'O Nome precisa ter no máximo 150 caracteres.'
              }
            };

            this.genericValidator = new GenericValidator(this.validationMessages);

            this.empresa = new Empresa();
            this.empresaAplicacao = new EmpresaAplicacao();
  }

  ngOnInit() {
    this.formulario = this.fb.group({
          nome: ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)]],
          bloqueada:''
        });
    this.formularioAplicacao = this.fb.group({
          aplicacaoId:'',
          dataValidade:'',
          disponivel:''
        });
        this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            if(params['id']){
              this.title = "Atualizar Empresa";

              this.empresa.id = params['id'];
              
              this.showToastrInfo('Carregando...');

              this.empresaService.obter(this.empresa.id)
              .subscribe(
                  result => { this.onObterComplete(result) },
                  error => { this.onSaveError(error) }
              );
              this.aplicacaoService.listar()
              .subscribe(
              apiAplicacao => {
                this.aplicacoes = apiAplicacao;
                this.aplicacoes.forEach(item => {
                  item.id = item.id.toString();
                  this.selectAplicacao.itemObjects.push(new SelectItem({ id: item.id, text: item.nome }))
                });
              },
              error => this.errors
              );

            }
            else{
              this.title = "Nova Empresa";
            }
        }
    );
  }
  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.formulario.valueChanges, ...controlBlurs).debounceTime(10).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  save(){

    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.empresa, this.formulario.value);
      p.id = this.empresa.id;
      p.bloqueada = p.bloqueada == "" ? false : true;
      this.showToastrInfo('Salvando...');
      if (this.empresa.id){
          this.empresaService.atualizar(p)
          .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) });
      }
      else
      {
          this.empresaService.novo(p)
          .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) });
      }

    }
  }
  adicionarAplicacao(){
    this.showToastrInfo('Incluindo...');
    this.empresaAplicacao = new EmpresaAplicacao();
    
    let p = Object.assign({}, this.empresaAplicacao, this.formularioAplicacao.value);
    p.aplicacao.nome = p.aplicacaoId[0].text;
    p.aplicacaoId = p.aplicacaoId[0].id;
    p.empresaId = this.empresa.id;
    p.dataValidade = DateUtils.getMyDatePickerDate(p.dataValidade);
    p.disponivel = p.disponivel == "" || p.disponivel == null ? false : p.disponivel;

    this.empresaService.incluirAplicacaoEmpresa(p)
          .subscribe(
          result => { this.onSaveAplicacaoComplete(result); this.empresa.empresaAplicacoes.push(p); },
          error => { this.onSaveError(error) });
          
  }
  onSaveError(error: any) 
  {
    if(this.verifyUnauthorized(error)) return;
    this.hideToastrInfo();
    this.showToastrError('Falha ao realizar o cadastro!',error);
  }
  onSaveComplete(response: any) {
    this.hideToastrInfo();
    this.errors = [];
    this.showToastrSuccess('Salvo com sucesso!','DV',null);
    this.routerC.navigate(['/empresa/listar']);
  }
  onSaveAplicacaoComplete(response: any) {
    this.hideToastrInfo();
    this.errors = [];
  }
  onObterComplete(response: Empresa) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.empresa = response;
     this.formulario.setValue({
       nome: this.empresa.nome,
       bloqueada: this.empresa.bloqueada
     });
  }
  public selected(value:any):void {
    this.empresaAplicacao.aplicacaoId = value;
  }
  public showChildModal(aplicacaoId:String,empresaId:String):void {
    this.excluirAplicacaoEmpresa = new ExcluirAplicacaoEmpresa(aplicacaoId,empresaId);

    this.childModal.show();
  }
  public hideChildModal():void {
    this.childModal.hide();
  }
  public excluirAplicacao():void{
    this.hideChildModal();
    this.empresaService.excluirAplicacaoEmpresa(this.excluirAplicacaoEmpresa)
          .subscribe(
          result => { this.onExcluirAplicacaoComplete(result); },
          error => { this.onSaveError(error) });
  }
  onExcluirAplicacaoComplete(response: any) {
    this.hideToastrInfo();
    this.errors = [];
    let empresaApli:EmpresaAplicacao = this.empresa.empresaAplicacoes.find(x => x.aplicacaoId === response.aplicacaoId && x.empresaId === response.empresaId);
    let index = this.empresa.empresaAplicacoes.indexOf(empresaApli);
    this.empresa.empresaAplicacoes.splice(index,1);
    this.showToastrSuccess('Excluido com sucesso!','DV',null);
  }  
}
