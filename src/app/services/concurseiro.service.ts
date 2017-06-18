import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from "@angular/http";

import { ServiceBase } from "app/services/service.base";

@Injectable()
export class ConcurseiroService extends ServiceBase {

    constructor(private http: Http) {
        super();
     }

     listarSexo(){
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

        let response = this.http
            .get(`${this.UrlServiceV1}listar-sexo`, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
     }

     listarEstadoCivil(){
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

        let response = this.http
            .get(`${this.UrlServiceV1}listar-estado-civil`, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
     }

     listarProfissao(){
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

        let response = this.http
            .get(`${this.UrlServiceV1}listar-profissao`, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
     }
    
}