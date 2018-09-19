import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { CarouselModule } from "ngx-bootstrap/carousel";
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { HomeMainComponent } from './home-main/home-main.component';

import { HomeService } from './../services/home.service';

@NgModule({
    imports: [SharedModule,
        CarouselModule.forRoot(),
        HomeRoutingModule
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent, AcessoNegadoComponent, HomeMainComponent],
    providers: [HomeService],
})
export class HomeModule { }
