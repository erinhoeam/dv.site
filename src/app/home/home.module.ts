import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home.component';

import { CarouselModule } from "ngx-bootstrap/carousel";

@NgModule({
    imports: [SharedModule,
        CarouselModule.forRoot(),
    ],
    exports: [HomeComponent],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
