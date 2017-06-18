import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Shared
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { AuthService } from './shared/auth.service';

//Module Components
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AplicacaoModule } from './aplicacao/aplicacao.module';
import { EmpresaModule } from './empresa/empresa.module';

import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainPrincipalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpModule,
    SharedModule,
    HomeModule,
    UsuarioModule,
    AplicacaoModule,
    EmpresaModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
