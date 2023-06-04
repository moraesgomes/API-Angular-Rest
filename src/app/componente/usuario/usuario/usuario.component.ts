import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { NotificacaoService } from '../../../service/notificacao.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  users: User[] = [];
  nome:string = "";
  p: number = 1;


  constructor(private usuarioService: UsuarioService , private notificacaoService:NotificacaoService) { }

    ngOnInit():void {

      this.getStudent();
    }


     getStudent():void{
      this.usuarioService.getStudentList().subscribe((users) =>
        (this.users = users));

    }

    deleteUsuario(id:Number){

      if(confirm('Deseja mesmo a exclusão?')){

       this.usuarioService.deletarUsuario(id).subscribe(data =>{

            console.log("Retorno do método delete " + data);
            this.getStudent();
            this.notificacaoService.notificar("Removido com sucesso !")
       });
      }
    }

    consultarUserNome(){

      this.usuarioService.consultarUser(this.nome).subscribe( data => {
          this.users=data;

      });
    }
  }




