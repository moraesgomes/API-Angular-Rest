import { Component } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario = {login:'', senha:''};

  constructor(private loginservice:LoginServiceService){}

  public login (){

    this.loginservice.login(this.usuario);
  }

}
