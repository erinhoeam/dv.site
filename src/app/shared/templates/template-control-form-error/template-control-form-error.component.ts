import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-control-form-error',
  templateUrl: './template-control-form-error.component.html',
  styleUrls: ['./template-control-form-error.component.scss']
})
export class TemplateControlFormErrorComponent implements OnInit {

  @Input() msgError: string;
  @Input() notInline:boolean = true;
  @Input() formFeedBack:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
