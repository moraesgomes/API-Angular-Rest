import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }  from  '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'; /*Requisições Ajax*/
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add/usuario-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe



  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})

export class AppModule { }
