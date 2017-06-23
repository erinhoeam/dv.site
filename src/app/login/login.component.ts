import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Login } from './../models/login';
import { BaseComponent } from './../shared/base.component';
import { UsuarioService } from './../services/usuario.service';
import { GenericValidator } from './../utils/generic-form-validator';

import { ModalDirective } from 'ngx-bootstrap/modal';
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
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  @ViewChild('childModal') public childModal:ModalDirective;

  login:Login;
  formulario: FormGroup;
  public token: string;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {

    super(toastr,vcr,routerC);

    this.token = localStorage.getItem('dv.service.token');

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
    if (this.token) {
       this.routerC.navigate(['/home']);
      return;
    }
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
    localStorage.setItem('dv.service.token', response.result.access_token);
    localStorage.setItem('dv.service.user', JSON.stringify(response.result.user));
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.formulario.reset();
    //this.showToastrSuccess('DV','Login Efetuado com sucesso!','/home',1000);
    this.routerC.navigate(['/home']);
  }

  onSaveError(error: any) 
  {
    this.loading = false;
    this.formulario.reset();
    this.hideToastrInfo();
    this.showToastrError('Falha ao realizar login.',error);
  }

  public showChildModal():void {
    this.childModal.show();
  }
  public hideChildModal(){
    this.childModal.hide();
  }
}
