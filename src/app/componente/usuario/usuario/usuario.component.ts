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
  nome!: string;
  p: number = 1;
  total:number = 0;


  constructor(private usuarioService: UsuarioService , private notificacaoService:NotificacaoService) { }

    ngOnInit():void {

      this.carregarDadosUsuarios();


    }

    carregarDadosUsuarios(): void {

        this.usuarioService.getStudentList().subscribe(data => {

       if(data && data.content){

        this.users = data.content;
        this.total = data.totalElements;

       }


      });



    }

    deleteUsuario(id:Number,index:any){

      if(confirm('Deseja mesmo a exclusão?')){

       this.usuarioService.deletarUsuario(id).subscribe(data =>{

            console.log("Retorno do método delete " + data);
            this.notificacaoService.notificar("Removido com sucesso !");
            this.users.splice(index,1)

       });
      }
    }

    consultarUserNome(){

         if(this.nome === ''){

            this.carregarDadosUsuarios();

         }

          else {

              this.usuarioService.consultarUser(this.nome).subscribe( data => {
              this.users = data.content;
              this.total = data.totalElements;

          });


         }


    }

    carregarPagina(pagina:any){

       if(this.nome !==''){

          this.usuarioService.consultarUserPorPage(this.nome,(pagina-1)).subscribe( data => {
          this.users = data.content;
          this.total = data.totalElements;

      });


       }

        this.usuarioService.getStudentListPage(pagina-1).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;


      });

    }

    }







