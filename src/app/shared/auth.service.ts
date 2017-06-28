import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from "@angular/router";
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";

@Injectable()
export class AuthService extends ServiceBase implements CanActivate {

    public token: string;
    //public route;
    public user;

    constructor(private router: Router, route: ActivatedRoute, private http:Http) {
        super();
        this.token = localStorage.getItem('dv.service.token');
        this.user = JSON.parse(localStorage.getItem('dv.service.user'));
    }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.token = localStorage.getItem('dv.service.token');
        this.user = JSON.parse(localStorage.getItem('dv.service.user'));
        
        if (!this.token) {
            this.router.navigate(['/login/entrar']);
            return false;
        }

        if (routeAc.data.lenght > 0) {
            let claim = routeAc.data[0]['claim'];

            if (claim) {
                let userClaims = this.user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
                if (!userClaims) {
                    this.router.navigate(['/acesso-negado']);
                    return;
                }
            }
        }

        return true;
    }
}