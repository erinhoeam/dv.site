import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";

import { Empresa } from 'app/models/empresa';
import { EmpresaAplicacao } from './../models/empresaAplicacao';
import { ExcluirAplicacaoEmpresa } from './../models/excluir-Aplicacao-Empresa';

@Injectable()
export class EmpresaService extends ServiceBase {

  constructor(private http: Http) { 
    super();
    
  }

  novo(empresa: Empresa) : Observable<Empresa>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}empresa`, empresa, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  atualizar(empresa: Empresa) : Observable<Empresa>{
        let options = this.obterAuthHeader();

        let response = this.http
            .put(`${this.UrlServiceV1}empresa`, empresa, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  listar() : Observable<Empresa[]>{
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}empresa`, options)
                        .map((res:Response) => <Empresa[]>res.json())
                        .catch(super.serviceError);
  }
  obter(id:String) : Observable<Empresa>{
        
        let options = this.obterAuthHeader();

        return this.http.get(`${this.UrlServiceV1}empresa/${id}`, options)
                        .map((res:Response) => <Empresa>res.json())
                        .catch(super.serviceError);
  }
  incluirAplicacaoEmpresa(aplicacao: EmpresaAplicacao) : Observable<EmpresaAplicacao>{
        let options = this.obterAuthHeader();

        let response = this.http
            .post(`${this.UrlServiceV1}aplicacao-empresa`, aplicacao, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
  excluirAplicacaoEmpresa(aplicacao: ExcluirAplicacaoEmpresa) : Observable<ExcluirAplicacaoEmpresa>{
        let options = this.obterAuthHeader();

        let response = this.http
            .delete(`${this.UrlServiceV1}aplicacao-empresa/${aplicacao.aplicacaoId}/${aplicacao.empresaId}`, options)
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
  }
}