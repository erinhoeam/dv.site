import { Response } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewContainerRef, ElementRef } from '@angular/core';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import { MessageResource } from './message-resource';
import { GenericValidator } from './../utils/generic-form-validator';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.prod';

export abstract class BaseComponent {
    
    protected message:MessageResource;
    public errors: any[] = [];
    protected toastActual: Toast;
    public loading: boolean = false;
    public displayMessage: { [key: string]: string } = {};
    protected validationMessages: { [key: string]: { [key: string]: string } };
    protected genericValidator: GenericValidator;
    public title:String;
    public maskCep = [/[0-9]/, /\d/, /\d/,  /\d/, /\d/, '-', /\d/, /\d/, /\d/];
    public maskCnpj = [/[0-9]/, /\d/, '.', /\d/,  /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/,'-',/\d/, /\d/];
    public maskCpf = [/[0-9]/, /\d/, /\d/, '.', /\d/,  /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
    public totalRegistros:Number = 0;
    public pageNumber:Number = 1;
    public rowsPage:Number = 5;
    public qtdAdjacentes = 5;
    public icon:String;


    constructor(public toastr: ToastsManager,
                vcr: ViewContainerRef,
                private router:Router){
        this.toastr.setRootViewContainerRef(vcr);
        this.message = new MessageResource();
    }

    formIsValid(form:FormGroup):boolean{
        return form.dirty && form.valid;
    }

    aplicarCssErro(msg){
        return {
            'has-error has-feedback': msg
        };
    }

    verificaValidTouched(campo,submitted){
        return !campo.valid && (submitted || campo.touched);
    }

    showToastrSuccess(msg:string, title:string, route:string = null, time:Number = 3500){
        
        this.toastr.success(msg,title, { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.loading = false;
          this.toastr.dismissToast(toast);
          if (route != null){
             this.router.navigate([route]);
          }
          
        }, time);
      });
    }
    showSuccess(msg:string, title:string){
        this.toastr.success(msg,title);
    }
    showToastrError(msg:string,error: any,route:string = null){
        this.toastr.error(msg, 'Ops :(');
        this.loading = false;
        this.errors = JSON.parse(error._body).erros;
        
    }

    showToastrInfo(msg:string){
        this.loading = true;
        this.toastr.info(msg,this.message.titles.SISTEMA.TITLE, { dismiss: 'controlled' })
        .then((toast: Toast) =>
        {
            this.toastActual = toast;
        }
        );
    }

    hideToastrInfo(){
        this.loading = false;
        this.toastr.dismissToast(this.toastActual);
    }
    verifyUnauthorized(response:Response) : boolean {
        if (response.status && response.status == 401)
        {
            localStorage.removeItem('dv.service.token');
            localStorage.removeItem('dv.service.user');
            this.router.navigate(['/login/entrar']);
            return true;
        }
        return false;
    }
    verificaValidacoesForm(formulario: FormGroup){
        Object.keys(formulario.controls).forEach(campo => {
            const controle = formulario.get(campo);
            controle.markAsTouched();
            if (controle instanceof FormGroup){
                this.verificaValidacoesForm(controle);
            }
        });
    }
    protected onError(error: any) 
    {
      if(this.verifyUnauthorized(error)) return;
      this.hideToastrInfo();
      this.showToastrError(this.message.messages.SHARED.MSG_FAIL_OPERATION,error);
    }

    onCompleteSuccess(response: any, msg:string,rota:string=null) {
        this.hideToastrInfo();
        this.errors = [];
        this.showToastrSuccess(msg,'DV - Site',rota);
    }
    protected validateOnBlur(formInputElements: ElementRef[], formulario: FormGroup){
        let controlBlurs: Observable<any>[] = formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));
  
      Observable.merge(formulario.valueChanges, ...controlBlurs).debounceTime(10).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(formulario);
      });
    }
}