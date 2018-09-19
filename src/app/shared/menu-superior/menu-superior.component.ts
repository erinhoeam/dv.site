import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.scss']
})
export class MenuSuperiorComponent implements OnInit {

  isCollapsed: boolean = true;
  private token: string;
  public user;
  edificioNome:String;
  pushRightClass: string = 'push-right';
  public nome: string = "";
  public status: {isopen: boolean} = {isopen: false};
  public items:string[] = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

  constructor(private router: Router) {
    this.token = localStorage.getItem('dv.service.token');
    this.user = JSON.parse(localStorage.getItem('dv.service.user'));
   }

  ngOnInit() {
    if(this.user){
        this.nome = this.user.nome;
    }
    this.edificioNome = this.user.edificioNome;
  }
  usuarioLogado(): boolean {
    this.token = localStorage.getItem('dv.service.token');
    if (!this.token) {
      return false;
    }
    return true;
  }
  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }
  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }
  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  logout() {
    localStorage.removeItem('dv.service.token');
    localStorage.removeItem('dv.service.user');
    this.router.navigate(['/login/entrar']);
  }
}
