import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

import { BaseComponent } from './../shared/base.component';
import { UsuarioService } from './../services/usuario.service';
import { GenericValidator } from './../utils/generic-form-validator';

import { Login } from './../models/login';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('childModal') public childModal:ModalDirective;

  login:Login;
  formulario: FormGroup;
  public token: string;

  constructor(private usuarioService:UsuarioService,
              private facebookService: FacebookService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {

    super(toastr,vcr,routerC);
    
    this.token = localStorage.getItem('dv.service.token');

    this.validationMessages = {
      email: {
          required: this.message.messages.USUARIO.EMAIL_REQUIRED,
          email: this.message.messages.USUARIO.EMAIL_INVALID
      },
      senha:{
          required: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_REQUIRED,
          minlength: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_MIN_LENGTH
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.login = new Login();

  }

  ngOnInit() {

    this.formulario = this.fb.group({
      email: ['', [Validators.required,
      CustomValidators.email]],
      senha: ['', [Validators.required,Validators.minLength(6)]]
    });

    if (this.token) {
       this.routerC.navigate(['/home/inicial']);
      return;
    }
  }

  ngAfterViewInit(): void {
      this.validateOnBlur(this.formInputElements,this.formulario);
  }

  loginUsuario(){
    
    if (this.formIsValid(this.formulario)){

      this.showToastrInfo(this.message.messages.SHARED.LOGIN);

      let p = Object.assign({}, this.login, this.formulario.value);  
      this.usuarioService.loginUsuario(p)
      .subscribe(
          result => { this.onLoginComplete(result) },
          error => { this.onLoginError(error) }
      );
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  onLoginComplete(response: any) {
    localStorage.setItem('dv.service.token', response.result.access_token);
    localStorage.setItem('dv.service.user', JSON.stringify(response.result.user));
    this.formulario.reset();
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    
    this.routerC.navigate(['/home/inicial']);
  }

  onLoginError(error: any) 
  {
    this.formulario.reset();
    super.onError(error);
  }

  public showChildModal():void {
    this.childModal.show();
  }
  public hideChildModal(){
    this.childModal.hide();
  }
}