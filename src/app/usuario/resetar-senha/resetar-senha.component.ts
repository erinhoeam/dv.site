import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';
import { ResetarSenha } from './../../models/resetar-senha';
import { GenericValidator } from './../../utils/generic-form-validator';

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
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
      this.resetarModel = new ResetarSenha();
   }

  ngOnInit() {
    this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            this.resetarModel = new ResetarSenha();

            this.resetarModel.Id = params['id'];
            this.resetarModel.Code = params['code'];
        } 
    );

    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.formulario = this.fb.group({
      Id: '',
      Code: '',
      senha: senha,
      confirmeSenha: senhaConfirmacao
    });

    this.formulario.setValue({
      Id: this.resetarModel.Id,
      Code: this.resetarModel.Code,
      senha:'',
      confirmeSenha:''
    });
  }

  ngAfterViewInit(): void {
      let controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      Observable.merge(this.formulario.valueChanges, ...controlBlurs).debounceTime(10).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.formulario);
      });
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  onSaveComplete(response: any) {
    this.hideToastrInfo();
    this.errors = [];
    this.formulario.reset();
    this.showToastrSuccess('Senha resetada com sucesso!','ConcurseiroAmigo','/login/entrar');
  }

  onSaveError(error: any) 
  {
    this.formulario.reset();
    this.hideToastrInfo();
    this.showToastrError('Falha ao resetar a senha!',error);
  }
  resetar(){
    if (this.formIsValid(this.formulario)){
          this.showToastrInfo('Resetando...');
          let p = Object.assign({}, this.resetarModel, this.formulario.value);  
          this.usuarioService.resetarSenha(p)
          .subscribe(
              result => { this.onSaveComplete(result) },
              error => { this.onSaveError(error) }
          );
    }
  }
}
