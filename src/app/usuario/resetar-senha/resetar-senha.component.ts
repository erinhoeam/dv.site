import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { ResetarSenha } from './../../models/resetar-senha';
import { GenericValidator } from './../../utils/generic-form-validator';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.scss']
})
export class ResetarSenhaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  formulario:FormGroup;
  resetarModel:ResetarSenha;
  inscricao: Subscription;
  
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
      this.resetarModel = new ResetarSenha();
   }

  ngOnInit() {
    this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            this.resetarModel = new ResetarSenha();

            this.resetarModel.Id = params['id'];
        } 
    );

    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.formulario = this.fb.group({
      senha: senha,
      confirmeSenha: senhaConfirmacao
    });

    this.formulario.setValue({
      senha:'',
      confirmeSenha:''
    });
  }

  ngAfterViewInit(): void {
      this.validateOnBlur(this.formInputElements,this.formulario);
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  resetar(){
    if (this.formIsValid(this.formulario)){
          this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);
         
          this.resetarModel.Senha = this.formulario.get("senha").value;
          this.resetarModel.ConfirmeSenha = this.formulario.get("confirmeSenha").value;

          this.usuarioService.resetarSenha(this.resetarModel)
          .subscribe(
              result => { this.onCompleteSuccess(result,
                this.message.messages.SHARED.MSG_SAVE_SUCCESS,
                this.message.routes.LOGIN.ENTRAR) },
              error => { this.onError(error) }
          );
    }
  }
}
