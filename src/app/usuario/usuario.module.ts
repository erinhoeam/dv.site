import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';

//Modules
import { SharedModule } from './../shared/shared.module';
import { UsuarioRoutingModule } from './usuario.routing.module';

//Components
import { RegistroComponent } from './registro/registro.component';
import { ConfirmeEmailComponent } from './confirme-email/confirme-email.component';
import { ResetarSenhaComponent } from './resetar-senha/resetar-senha.component';

//Serviços
import { UsuarioService } from './../services/usuario.service';

//Directives
import { EqualValidator } from './../directives/validate-equal.directive';
import { UsuarioMainComponent } from './usuario-main/usuario-main.component';

@NgModule({
    imports: [FormsModule,SharedModule,UsuarioRoutingModule],
    exports: [RegistroComponent,ConfirmeEmailComponent,ResetarSenhaComponent],
    declarations: [RegistroComponent,EqualValidator,ConfirmeEmailComponent, 
    ResetarSenhaComponent, UsuarioMainComponent],
    providers: [UsuarioService],
})
export class UsuarioModule { }
