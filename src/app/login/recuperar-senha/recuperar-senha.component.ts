import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { RecuperarSenha } from './../../models/recuperar-senha';
import { GenericValidator } from './../../utils/generic-form-validator';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  recuperarSenha:RecuperarSenha;
  success:boolean = false;
  formulario:FormGroup;

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
              }
            };

            this.genericValidator = new GenericValidator(this.validationMessages);
            this.recuperarSenha = new RecuperarSenha();
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required,
      CustomValidators.email]]
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
  recuperar(){
    
    if (this.formIsValid(this.formulario)){
      let p = Object.assign({}, this.recuperarSenha, this.formulario.value);  
      
      this.showToastrInfo('Enviando...');
      this.usuarioService.recuperarSenha(p)
      .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onSaveError(error) }
      );
    }
  }
  onSaveComplete(response: any) {
    this.success = true;
    this.hideToastrInfo();
    this.errors = [];
    this.recuperarSenha = new RecuperarSenha();
  }

  onSaveError(error: any) 
  {
    this.success = false;
    this.hideToastrInfo();
    this.showToastrError('Falha ao enviar E-mail de recuperação.',error);
  }
}
