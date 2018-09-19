import { Component } from '@angular/core';

import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    isActive: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    constructor(private commonService:CommonService){
        
    }

    verificarPermissao(claimName:String,claimValue:String):boolean{
        return this.commonService.verificarClaim(claimName,claimValue);
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

}
