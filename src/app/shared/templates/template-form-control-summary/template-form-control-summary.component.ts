import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-form-control-summary',
  templateUrl: './template-form-control-summary.component.html',
  styleUrls: ['./template-form-control-summary.component.scss']
})
export class TemplateFormControlSummaryComponent {

  @Input() errors: any[];

  constructor() { }

}
