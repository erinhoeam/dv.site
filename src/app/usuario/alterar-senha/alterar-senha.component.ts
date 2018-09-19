import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { GenericValidator } from './../../utils/generic-form-validator';

import { AlterarSenha } from './../../models/alterar-senha';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

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

      this.title = this.message.titles.ALTERAR_SENHA.TITLE;
      
      this.validationMessages = {
        senhaAtual:{
            required: this.message.messages.ALTERAR_SENHA.SENHA_ATUAL_REQUIRED,
            minlength: this.message.messages.ALTERAR_SENHA.SENHA_ATUAL_REQUIRED
        },
        senha:{
            required: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_REQUIRED,
            minlength: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_MIN_LENGTH
        },
        confirmeSenha:{
            required: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_REQUIRED,
            minlength: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_MIN_LENGTH,
            equalTo: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_EQUAL_TO
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
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  save(){

    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.alterarSenhaModel, this.formulario.value); 

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      this.usuarioService.alterarSenha(p)
      .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onError(error) }
      );
    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onSaveComplete(response: any) {
    localStorage.removeItem('dv.service.token');
    localStorage.removeItem('dv.service.user');
    this.hideToastrInfo();
    this.errors = [];
    this.formulario.reset();
    this.showToastrSuccess(this.message.messages.SHARED.MSG_SAVE_SUCCESS,'CondomínioMais',this.message.routes.LOGIN.ENTRAR);
  }
}
