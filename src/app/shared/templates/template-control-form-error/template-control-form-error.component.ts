import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-control-form-error',
  templateUrl: './template-control-form-error.component.html',
  styleUrls: ['./template-control-form-error.component.css']
})
export class TemplateControlFormErrorComponent implements OnInit {

  @Input() msgError: string;
  @Input() notInline:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
