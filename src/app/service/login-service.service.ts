import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Route, Router } from '@angular/router';
import { User } from '../model/user';
import { NotificacaoService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient ,private router:Router , private notificao: NotificacaoService ) { }

   login(usuario:any){

     return this.http.post(AppConstants.baseLogin(),JSON.stringify(usuario)).subscribe(data =>{

         /*Retorno Http */

         var token = (JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1]);

         localStorage.setItem("token",token);
          console.info("Token: " + localStorage.getItem("token"));
          this.router.navigate(['home']);


     },

       error => {
         console.error("Erro ao fazer login ");
         alert('Acesso negado!')
       }
     )


  }


  recuperar(login: any){

    let user = new User();
    user.login = login;

    return this.http.post(AppConstants.getBaseurlPath + 'recuperar/',user).subscribe(data =>{

     this.notificao.notificar(JSON.parse(JSON.stringify(data)).error);

    },

      error => {
        console.error("Erro ao recuperar login ");
        alert('Erro ao recuperar o login!!')
      }
    );


 }




}
