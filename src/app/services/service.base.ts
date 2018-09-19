import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

import { environment } from './../../environments/environment';

export abstract class ServiceBase {
    
    public Token: string = "";

    constructor(){
        this.Token = localStorage.getItem('dv.service.token');
    }

    protected UrlServiceV1: string = environment.urlServiceV1;
    protected UrlViaCep: string = environment.urlServiceViaCep;

    protected serviceError(error: Response | any) {
        let errMsg: string;
        if(error.status && error.status == 401)
        {
            
            //this.router.navigate(['/login']);
            //return;
        }
        else if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(error);
    }

    protected extractData(response: Response) {
        
        let body = response.json();
        return body.data || {};
    }
    protected extractDataCep(response: Response) {
        let body = response.json();
        return body || {};
    }
    protected obterAuthHeader(): RequestOptions {

        this.Token = localStorage.getItem('dv.service.token');
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${this.Token}`);
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}