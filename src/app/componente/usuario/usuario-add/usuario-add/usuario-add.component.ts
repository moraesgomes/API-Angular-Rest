import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User ();

  constructor(private routeActive: ActivatedRoute , private userService:UsuarioService){}

  ngOnInit(){

    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id !=null){

     this.userService.getStudent(id).subscribe(data => {
           this.usuario = data;
     });
    }

  }

  salvarUser(){

    if(this.usuario.id != null && this.usuario.id.toString().trim() != null){

         this.userService.updateUsuario(this.usuario).subscribe(data =>{
          this.novo();

             console.info("user atualizado" + data);
         });
    }else{

      this.userService.salvarUsuario(this.usuario).subscribe(data =>{
        this.novo();

        console.info("Gravou user: " + data);
      })

    }
  }

  novo(){

    this.usuario = new User();
  }

}
