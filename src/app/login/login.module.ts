import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';

//Modules
import { SharedModule } from './../shared/shared.module';
import { LoginRoutingModule } from './login.routing.module';
import { FacebookModule } from 'ngx-facebook';

//Components
import { LoginComponent } from './login.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';

//Services
import { UsuarioService } from './../services/usuario.service';
import { LoginMainComponent } from './login-main/login-main.component';

@NgModule({
    imports: [
        FormsModule,
        SharedModule,
        LoginRoutingModule,
        FacebookModule.forRoot()
    ],
    exports: [],
    declarations: [LoginComponent,RecuperarSenhaComponent, LoginMainComponent],
    providers: [UsuarioService],
})
export class LoginModule { }
