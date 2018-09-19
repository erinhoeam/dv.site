import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';
import { Aplicacao } from './../../models/aplicacao';
import { AplicacaoService } from './../../services/aplicacao.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-aplicacao-form',
  templateUrl: './aplicacao-form.component.html',
  styleUrls: ['./aplicacao-form.component.scss']
})
export class AplicacaoFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  inscricao: Subscription;
  success:boolean = false;
  aplicacao:Aplicacao;
  formulario: FormGroup;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private aplicacaoService:AplicacaoService) { 

            super(toastr,vcr,routerC);

            this.validationMessages = {
              nome: {
                required: this.message.messages.APLICACAO.NOME_REQUIRED,
                minlength: this.message.messages.APLICACAO.NOME_MIN_LENGTH,
                maxlength: this.message.messages.APLICACAO.NOME_MAX_LENGTH
              },
              classe: {
                required: this.message.messages.APLICACAO.CLASSE_REQUIRED,
                minlength: this.message.messages.APLICACAO.CLASSE_MIN_LENGTH,
                maxlength: this.message.messages.APLICACAO.CLASSE_MAX_LENGTH
              }
            };

            this.genericValidator = new GenericValidator(this.validationMessages);

            this.aplicacao = new Aplicacao();
  }

  ngOnInit() {

        this.formulario = this.fb.group({
          nome: ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)]],
          classe: ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(350)]],
          config: ''
        });

        this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            if(params['id']){

              this.title = this.message.titles.APLICACAO.TITLE_UPDATE;
              this.icon = this.message.titles.ICON.EDIT;

              this.aplicacao.id = params['id'];
              
              this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

              this.aplicacaoService.obter(this.aplicacao.id)
              .subscribe(
                  result => { this.onObterComplete(result) },
                  error => { this.onError(error) }
              );
            }
            else{
              this.title = this.message.titles.APLICACAO.TITLE_NEW;
              this.icon = this.message.titles.ICON.NEW;
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

      let p = Object.assign({}, this.aplicacao, this.formulario.value);
      p.id = this.aplicacao.id;
      
      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.aplicacao.id){

          this.aplicacaoService.atualizar(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.APLICACAO.LISTAR) },
          error => { this.onError(error) });

      }
      else
      {
          this.aplicacaoService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            null) },
          error => { this.onError(error) });
      }

    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }
  
  onObterComplete(response: Aplicacao) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.aplicacao = response;
     this.formulario.patchValue({
       nome: this.aplicacao.nome,
       classe:this.aplicacao.classe,
       config: this.aplicacao.config
     });
  }
}
