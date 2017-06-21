import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { BaseComponent } from './../../shared/base.component';
import { UsuarioService } from './../../services/usuario.service';

import { ConfirmaEmail } from './../../models/confirmar-email';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-confirme-email',
  templateUrl: './confirme-email.component.html',
  styleUrls: ['./confirme-email.component.css']
})
export class ConfirmeEmailComponent extends BaseComponent implements OnInit {

  id: string;
  code:string;
  inscricao: Subscription;
  success:boolean = false;
  confirmEmail:ConfirmaEmail;

  constructor(private usuarioService:UsuarioService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute) {
            super(toastr,vcr,routerC);
  }

  ngOnInit() {
    this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            this.id = params['id'];;
            this.code = params['code'];

            this.confirmEmail = new ConfirmaEmail(this.id, this.code);

            this.showToastrInfo('Confirmando...');

            this.usuarioService.confirmarEmail(this.confirmEmail)
            .subscribe(
                result => { this.onSaveComplete(result) },
                error => { this.onSaveError(error) }
            );
        } 
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  onSaveComplete(response: any) {
    this.success = true;
    this.hideToastrInfo();
    this.errors = [];
    this.showToastrSuccess('E-mail confirmado com sucesso!','Bem Vindo!','/login/entrar');
  }

  onSaveError(error: any) 
  {
    this.success = false;
    this.hideToastrInfo();
    this.showToastrError('Falha ao confirmar o E-mail!',error);
  }

}
