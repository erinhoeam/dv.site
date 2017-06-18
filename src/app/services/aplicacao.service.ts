import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Aplicacao } from './../models/aplicacao';

@Injectable()
export class AplicacaoService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(aplicacao: Aplicacao) : Observable<Aplicacao>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}aplicacao`, aplicacao, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  atualizar(aplicacao: Aplicacao) : Observable<Aplicacao>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}aplicacao`, aplicacao, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  listar() : Observable<Aplicacao[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}aplicacao`, options)
                        .map((res:Response) => <Aplicacao[]>res.json())
                        .catch(super.serviceError);
  }
  obter(id:String) : Observable<Aplicacao>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}aplicacao/${id}`, options)
                        .map((res:Response) => <Aplicacao>res.json())
                        .catch(super.serviceError);
  }
}