import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { GenericValidator } from './../../utils/generic-form-validator';

import { AlterarSenha } from './../../models/alterar-senha';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  formulario: FormGroup;
  alterarSenhaModel:AlterarSenha;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {

      super(toastr,vcr,routerC);
      this.title = "Alterar Senha";
      this.validationMessages = {
      senhaAtual:{
          required: 'Informe a senha atual.',
          minlength: 'A senha atual deve possuir no mínimo 6 caracteres.'
      },
      senha:{
          required: 'Informe a senha.',
          minlength: 'A senha deve possuir no mínimo 6 caracteres.'
      },
      confirmeSenha:{
          required: 'Informe a senha novamente.',
          minlength: 'A senha deve possuir no mínimo 6 caracteres.',
          equalTo: 'As senhas não conferem.'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.alterarSenhaModel = new AlterarSenha();
  }

  ngOnInit() {
    let senhaAtual = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.formulario = this.fb.group({
      senhaAtual: senhaAtual,
      senha: senha,
      confirmeSenha: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.formulario.valueChanges, ...controlBlurs).debounceTime(10).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    });
  }

  save(){

    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.alterarSenhaModel, this.formulario.value); 

      this.showToastrInfo('Alterando...');

      this.usuarioService.alterarSenha(p)
      .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) }
      );
    }
  }

  onSaveComplete(response: any) {
    localStorage.removeItem('dv.service.token');
    localStorage.removeItem('dv.service.user');
    this.hideToastrInfo();
    this.errors = [];
    this.formulario.reset();
    this.showToastrSuccess('Senha alterada com sucesso!','Bem Vindo!','/login/entrar');
  }

  onSaveError(error: any) 
  {
    if(this.verifyUnauthorized(error)) return;
    this.hideToastrInfo();
    this.showToastrError('Ocorreu um erro!',error);
  }
}
