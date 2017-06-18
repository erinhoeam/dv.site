import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from "@angular/http";

import { ServiceBase } from "app/services/service.base";
import { Usuario } from './../models/usuario';
import { Login } from './../models/login';
import { ConfirmaEmail } from './../models/confirmar-email';
import { RecuperarSenha } from './../models/recuperar-senha';
import { ResetarSenha } from './../models/resetar-senha';

@Injectable()
export class UsuarioService extends ServiceBase {

  constructor(private http: Http) { 
    
    super();
    
  }

  registrarUsuario(usuario: Usuario) : Observable<Usuario>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //headers.append('Access-Control-Allow-Origin','*');

        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(`${this.UrlServiceV1}nova-conta`, usuario, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  loginUsuario(usuario: Login) : Observable<Login>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(`${this.UrlServiceV1}login`, usuario, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

  confirmarEmail(confirmaEmail:ConfirmaEmail){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(`${this.UrlServiceV1}confirmar-email`, confirmaEmail, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  recuperarSenha(recuperarModel:RecuperarSenha){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(`${this.UrlServiceV1}recuperar-senha`, recuperarModel, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  resetarSenha(resetarModel:ResetarSenha){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let response = this.http
            .post(`${this.UrlServiceV1}resetar-senha`, resetarModel, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }

}
