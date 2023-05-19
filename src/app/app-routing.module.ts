import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';

const routes: Routes = [

   {path:'home',component:HomeComponent, canActivate:[GuardiaoGuard]},
   {path:'login',component:LoginComponent},
   {path:'',component:LoginComponent},
   {path:'usuarioList', component:UsuarioComponent, canActivate:[GuardiaoGuard]},
   {path:'usuarioAdd', component:UsuarioAddComponent,canActivate:[GuardiaoGuard]},
   {path:'usuarioAdd/:id', component:UsuarioAddComponent,canActivate:[GuardiaoGuard]}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
