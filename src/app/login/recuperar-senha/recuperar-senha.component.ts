import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { RecuperarSenha } from './../../models/recuperar-senha';
import { GenericValidator } from './../../utils/generic-form-validator';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  recuperarSenha:RecuperarSenha;
  formulario:FormGroup;
  success:boolean = false;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) { 

    super(toastr,vcr,routerC);

    this.validationMessages = {
      emailRecuperar: {
          required: this.message.messages.RECUPERAR_SENHA.EMAIL_REQUIRED,
          email: this.message.messages.RECUPERAR_SENHA.EMAIL_INVALID
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.recuperarSenha = new RecuperarSenha();
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      emailRecuperar: ['', [Validators.required,
      CustomValidators.email]]
    });

  }

  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  recuperar(){
    
    if (this.formIsValid(this.formulario)){
      this.recuperarSenha = new RecuperarSenha();
      this.recuperarSenha.Email = this.formulario.get("emailRecuperar").value;  
      
      this.showToastrInfo(this.message.messages.SHARED.MSG_SENDING);
      this.usuarioService.recuperarSenha(this.recuperarSenha)
      .subscribe(
          result => { this.onSendingComplete(result) },
          error => { this.onError(error) }
      );
    }
  }

  onSendingComplete(response: any) {
    this.success = true;
    this.hideToastrInfo();
    this.errors = [];
    this.recuperarSenha = new RecuperarSenha();
  }
}
