import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SelectModule} from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';

import { MenuLoginComponent } from './menu-login/menu-login.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TemplateControlFormErrorComponent } from './templates/template-control-form-error/template-control-form-error.component';
import { TemplateFormControlSummaryComponent } from './templates/template-form-control-summary/template-form-control-summary.component';

@NgModule({
  imports: [CommonModule,
           ReactiveFormsModule,
           BsDropdownModule.forRoot(),
           CollapseModule,
           RouterModule,
           ModalModule,
           SelectModule,
           MyDatePickerModule],

  exports: [CommonModule,
            SelectModule,
            MyDatePickerModule,
            ReactiveFormsModule,
            ModalModule,
            MenuLoginComponent,
            MenuSuperiorComponent,
            SidebarComponent,
            TemplateControlFormErrorComponent,
            TemplateFormControlSummaryComponent],

  declarations: [TemplateControlFormErrorComponent, 
                 TemplateFormControlSummaryComponent,
                MenuLoginComponent,
                MenuSuperiorComponent,
                SidebarComponent
                 ],
  providers:[]
})
export class SharedModule { }
