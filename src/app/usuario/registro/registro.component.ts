import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { GenericValidator } from './../../utils/generic-form-validator';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario;
  formulario: FormGroup;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {
    
    super(toastr,vcr,routerC);
    
    this.validationMessages = {
      nome: {
          required: 'Nome requerido.',
          minlength: 'O Nome precisa ter no mínimo 2 caracteres.',
          maxlength: 'O Nome precisa ter no máximo 150 caracteres.'
      },
      email: {
          required: 'Informe o e-mail.',
          email: 'Email invalido.'
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
    this.usuario = new Usuario();

  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.formulario = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      email: ['', [Validators.required,
      CustomValidators.email]],
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

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

  save(){

    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.usuario, this.formulario.value);  
      console.log(p);
      this.showToastrInfo('Registrando...');
      this.usuarioService.registrarUsuario(p)
      .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) }
      );
    }

  }

  onSaveComplete(response: any) {
    this.hideToastrInfo();
    this.errors = [];
    this.showToastrSuccess('Registro realizado com sucesso!','Bem Vindo!','/home');
  }

  onSaveError(error: any) 
  {
    this.hideToastrInfo();
    this.showToastrError('Falha ao realizar o cadastro!',error);
  }
}
