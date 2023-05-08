import { Component } from '@angular/core';
import { LoginServiceService } from './service/login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curso-angular-rest';

  usuario = {login:'', senha:''};

  constructor(private loginservice:LoginServiceService){}

  public login (){

    this.loginservice.login(this.usuario);
  }
}
