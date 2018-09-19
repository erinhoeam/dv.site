import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ElementRef, OnDestroy, AfterViewInit, ViewChildren } from '@angular/core';

import { Subscription } from 'rxjs/Rx';

import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';

import { ConfirmaEmail } from './../../models/confirmar-email';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-confirme-email',
  templateUrl: './confirme-email.component.html',
  styleUrls: ['./confirme-email.component.scss']
})
export class ConfirmeEmailComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  id: string;
  code:string;
  inscricao: Subscription;
  success:boolean = false;
  formulario:FormGroup;
  confirmEmail:ConfirmaEmail;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder) {
            super(toastr,vcr,routerC);
            this.validationMessages = {
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
  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);
    
    this.formulario = this.fb.group({
      senha: senha,
      confirmeSenha: senhaConfirmacao
    });

    this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            this.id = params['id'];;

            this.confirmEmail = new ConfirmaEmail(this.id);
        } 
    );
  }

  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }
  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  confirmar(){

    this.confirmEmail.senha = this.formulario.get("senha").value;
    this.confirmEmail.confirmeSenha = this.formulario.get("confirmeSenha").value;

    if (this.formIsValid(this.formulario)){

        this.showToastrInfo(this.message.messages.SHARED.MSG_CONFIRMING);

        this.usuarioService.confirmarEmail(this.confirmEmail)
        .subscribe(
            result => { this.onCompleteSuccess(result,
              this.message.messages.CONFIRM_EMAIL.EMAIL_CONFIRMED_SUCCESS,
              this.message.routes.LOGIN.ENTRAR) },
            error => { this.onError(error) }
        );
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }

  }
}
