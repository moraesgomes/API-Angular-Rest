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
  p: number = 0;
  total:number = 0;


  constructor(private usuarioService: UsuarioService , private notificacaoService:NotificacaoService) { }

    ngOnInit():void {

      this.carregarDadosUsuarios();

    }

   carregarDadosUsuarios() {


          this.usuarioService.getStudentList().subscribe(data => {
          this.users = data.content;
          this.total = data.totalElements;


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

    consultarUserNome() {
      if (this.nome === '') {
        this.carregarDadosUsuarios();
      } else {
          this.usuarioService.consultarUser(this.nome).subscribe(data => {
          this.users = data.content;
          this.total = data.totalElements;
        });
      }
    }

    carregarPagina(p: number) {

        this.p = p;

        if (this.nome && this.nome.trim() !== '') {
          // Executa quando nome não é vazio
            this.usuarioService.consultarUserPorPage(this.nome, this.p-1).subscribe(data => {
            this.users = data.content;
            this.total = data.totalElements;


          });
        }

        this.usuarioService.getStudentListPage(this.p).subscribe(data => {
        this.users = data.content;
        this.total = data.totalElements;


      });
    }

        imprimeRelatorio(){

          return this.usuarioService.downloadPdfRelatorio();
        }

    }







