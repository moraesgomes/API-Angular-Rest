import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  users: User[] = [];

  constructor(private usuarioService: UsuarioService) { }

    ngOnInit():void {

      this.getStudent();
    }


     getStudent():void{
      this.usuarioService.getStudentList().subscribe((users) =>
        (this.users = users));

    }
  }




