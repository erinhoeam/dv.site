import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { MainPrincipalRoutingModule } from './main-principal.routing.module';
import { MainPrincipalComponent } from './main-principal.component';
import { FooterComponent } from './../shared/footer/footer.component';

@NgModule({
    imports: [SharedModule, MainPrincipalRoutingModule],
    exports: [],
    declarations: [MainPrincipalComponent, FooterComponent],
    providers: [],
})
export class MainPrincipalModule { }
