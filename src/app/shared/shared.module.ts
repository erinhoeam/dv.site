import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SelectModule} from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';

import { MenuLoginComponent } from './menu-login/menu-login.component';
import { FooterComponent } from './footer/footer.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { TemplateControlFormErrorComponent } from './templates/template-control-form-error/template-control-form-error.component';
import { TemplateFormControlSummaryComponent } from './templates/template-form-control-summary/template-form-control-summary.component';


@NgModule({
  imports: [CommonModule,
           ReactiveFormsModule,
           RouterModule,
           CollapseModule,
           BsDropdownModule,
           ModalModule,
           SelectModule,
           MyDatePickerModule],

  exports: [CommonModule,
            SelectModule,
            MyDatePickerModule,
            ReactiveFormsModule,
            ModalModule,
            FooterComponent, 
            MenuSuperiorComponent,
            MenuLoginComponent,
            TemplateControlFormErrorComponent,
            TemplateFormControlSummaryComponent],

  declarations: [FooterComponent,
                 MenuSuperiorComponent,
                 MenuLoginComponent,
                 TemplateControlFormErrorComponent, 
                 TemplateFormControlSummaryComponent]
})
export class SharedModule { }
