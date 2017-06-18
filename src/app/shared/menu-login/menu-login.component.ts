import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent implements OnInit {

  public token;
  public user;
  public nome: string = "";
  public status: {isopen: boolean} = {isopen: false};
public items:string[] = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];
 
  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }
  constructor(private router: Router) {
    this.token = localStorage.getItem('dv.service.token');
    this.user = JSON.parse(localStorage.getItem('dv.service.user'));
   }

   public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit() {
    if(this.user)
        this.nome = this.user.email;
  }

  usuarioLogado(): boolean {
    return this.token !== null;
  }

  logout() {
    localStorage.removeItem('dv.service.token');
    localStorage.removeItem('dv.service.user');
    this.router.navigate(['/home']);
  }

}
