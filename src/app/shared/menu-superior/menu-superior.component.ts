import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  constructor() { }
  isCollapsed: boolean = true;
  private token: string;
  ngOnInit() {
  }
  usuarioLogado(): boolean {
    this.token = localStorage.getItem('dv.service.token');
    if (!this.token) {
      return false;
    }

    return true;
  }
}
