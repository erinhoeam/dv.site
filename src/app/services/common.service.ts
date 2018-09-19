import { Injectable } from '@angular/core';

@Injectable()
export class CommonService{
    user;
    public verificarClaim(claimName:String,claimValue:String):boolean{
        
        this.user = JSON.parse(localStorage.getItem('dv.service.user'));

        if (this.user === null || this.user === undefined) return false;

        let userClaims = this.user.claims.some(x => x.type === claimName && x.value === claimValue);
        
        if (!userClaims) {
            return false;
        }

        return true;
    }
}