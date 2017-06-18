import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Login } from './../../models/login';
import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { GenericValidator } from './../../utils/generic-form-validator';

import { CustomValidators, CustomFormsModule } from 'ng2-validation'
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  login:Login;
  formulario: FormGroup;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {

    super(toastr,vcr,routerC);

    this.validationMessages = {
      email: {
          required: 'Informe o e-mail.',
          email: 'Email invalido.'
      },
      senha:{
          required: 'Informe a senha.',
          minlength: 'A senha deve possuir no mínimo 6 caracteres.'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.login = new Login();

  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.formulario = this.fb.group({
      email: ['', [Validators.required,
      CustomValidators.email]],
      senha: senha
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

  loginUsuario(){
    
    if (this.formIsValid(this.formulario)){

      this.showToastrInfo('Efetuando Login...');
      let p = Object.assign({}, this.login, this.formulario.value);  
      this.usuarioService.loginUsuario(p)
      .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) }
      );
    }
  }

  onSaveComplete(response: any) {
    
    this.hideToastrInfo();
    this.errors = [];

    localStorage.setItem('dv.service.token', response.result.access_token);
    localStorage.setItem('dv.service.user', JSON.stringify(response.result.user));

    this.routerC.navigate(['/home']);
    
  }

  onSaveError(error: any) 
  {
    
    this.hideToastrInfo();
    this.showToastrError('Falha ao realizar login.',error);
  }
}
