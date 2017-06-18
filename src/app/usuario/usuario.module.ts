import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';

//Modules
import { SharedModule } from './../shared/shared.module';
import { UsuarioRoutingModule } from './usuario.routing.module';

//Components
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ConfirmeEmailComponent } from './confirme-email/confirme-email.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { ResetarSenhaComponent } from './resetar-senha/resetar-senha.component';

//Serviços
import { UsuarioService } from './../services/usuario.service';

//Directives
import { EqualValidator } from './../directives/validate-equal.directive';

@NgModule({
    imports: [FormsModule,SharedModule,UsuarioRoutingModule],
    exports: [RegistroComponent,LoginComponent,ConfirmeEmailComponent,RecuperarSenhaComponent,ResetarSenhaComponent],
    declarations: [RegistroComponent,EqualValidator,LoginComponent,ConfirmeEmailComponent, 
    RecuperarSenhaComponent, ResetarSenhaComponent],
    providers: [UsuarioService],
})
export class UsuarioModule { }
