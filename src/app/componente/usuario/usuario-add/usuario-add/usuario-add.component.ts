import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NotificacaoService } from '../../../../service/notificacao.service';

import { Validacoes } from './../../../../validacoes/validacoes';
import { Observable, map } from 'rxjs';
import { Telefone } from 'src/app/model/telefone';



@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  valid = new Validacoes();

  usuario = new User ();

  telefone = new Telefone();



  constructor(private routeActive: ActivatedRoute , private userService:UsuarioService,
    private notificacaoService:NotificacaoService ,
    ){}

  ngOnInit(){

    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id !=null){

     this.userService.getStudent(id).subscribe(data => {
           this.usuario = data;
     });
    }

  }

  salvarUser() {

    if (this.usuario.id != null && this.usuario.id.toString().trim() != "") {
      this.userService.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("user atualizado" + data);
        this.notificacaoService.notificar("Gravado com Sucesso");
      });
    } else if (!this.valid.validarCPF(this.usuario.cpf)) {
      this.notificacaoService.notificar("CPF inválido , Favor insira o CPF correto!");
    }

    else {
      this.validarLogin(this.usuario.login).subscribe(existingUser => {
        if (existingUser !== null) {
          this.notificacaoService.notificar("Esse Login já está cadastrado, favor informe outro Login!");
        } else {
          this.userService.salvarUsuario(this.usuario).subscribe(data => {
            this.novo();
            console.info("Gravou user: " + data);
            this.notificacaoService.notificar("Gravado com Sucesso");
          });
        }
      });
    }
  }

  addFone(){

     if(this.usuario.telefones === undefined){

         this.usuario.telefones = new Array<Telefone>();
     }

     this.usuario.telefones.push(this.telefone);
     this.telefone = new Telefone();

  }

  deletarFone(id:any,i:any){

     if(id == null){

         this.usuario.telefones.splice(i,1);
         return;


     }

     if(id!= null && confirm("Deseja remover?")) {

          this.userService.deleteFone(id).subscribe(data =>{

              this.usuario.telefones.splice(i,1);

              this.notificacaoService.notificar("Telefone removido com sucesso");
          })
     }


  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

  validarLogin(login: string): Observable<User | null> {

    return this.userService.getStudentList().pipe(
      map(studentList => {
        for (const student of studentList) {
          if (student.login === login) {
            return student; // O login já existe no banco de dados
          }
        }

        return null; // O login não existe no banco de dados
      })
    );
  }


}
