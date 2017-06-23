import { Response } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import { GenericValidator } from './../utils/generic-form-validator';

export abstract class BaseComponent {
    
    public errors: any[] = [];
    protected toastActual: Toast;
    public loading: boolean = false;
    public displayMessage: { [key: string]: string } = {};
    protected validationMessages: { [key: string]: { [key: string]: string } };
    protected genericValidator: GenericValidator;
    public title:String;

    constructor(public toastr: ToastsManager,
                vcr: ViewContainerRef,
                private router:Router){
        this.toastr.setRootViewContainerRef(vcr);
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
        this.toastr.info(msg,'Concurseiro Amigo', { dismiss: 'controlled' })
        .then((toast: Toast) =>
        {
            this.toastActual = toast;
        }
        );
    }

    hideToastrInfo(){
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
}