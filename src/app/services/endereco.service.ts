import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptions, Headers, Http } from "@angular/http";

import { ServiceBase } from "app/services/service.base";

@Injectable()
export class EnderecoService extends ServiceBase {

    constructor(private http: Http) {
        super();
     }

     listarUf(){
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

        let response = this.http
            .get(this.UrlServiceV1 + "listar-uf", options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
     }

     consultarCep(cep:string){
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

        let response = this.http
            .get(`${this.UrlViaCep}/${cep}/json/` , options)
            .map(super.extractDataCep)
            .catch(super.serviceError);

        return response;
     }
    
}