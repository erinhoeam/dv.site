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
                  required: 'Nome requerido.',
                  minlength: 'O Nome precisa ter no mínimo 2 caracteres.',
                  maxlength: 'O Nome precisa ter no máximo 150 caracteres.'
              },
              classe: {
                  required: 'Classe requerida.',
                  minlength: 'O da classe precisa ter no mínimo 2 caracteres.',
                  maxlength: 'O da classe precisa ter no máximo 50 caracteres.'
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
              this.title = "Atualizar Aplicação";

              this.aplicacao.id = params['id'];
              
              this.showToastrInfo('Carregando...');

              this.aplicacaoService.obter(this.aplicacao.id)
              .subscribe(
                  result => { this.onObterComplete(result) },
                  error => { this.onSaveError(error) }
              );
            }
            else{
              this.title = "Nova Aplicação";
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
      
      this.showToastrInfo('Salvando...');
      if (this.aplicacao.id){
          this.aplicacaoService.atualizar(p)
          .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) });
      }
      else
      {
          this.aplicacaoService.novo(p)
          .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) });
      }

    }
  }
  onSaveComplete(response: any) {
    this.hideToastrInfo();
    this.errors = [];
    this.showToastrSuccess('Salvo com sucesso!','DV','/aplicacao/listar');
  }

  onSaveError(error: any) 
  {
    if(this.verifyUnauthorized(error)) return;
    this.hideToastrInfo();
    this.showToastrError('Falha ao realizar o cadastro!',error);
  }

  onObterComplete(response: Aplicacao) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.aplicacao = response;
     this.formulario.setValue({
       nome: this.aplicacao.nome,
       classe:this.aplicacao.classe,
       config: this.aplicacao.config
     });
  }
}
