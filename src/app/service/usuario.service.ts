import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any>{

      return this.http.get<any>(AppConstants.baseUrlConsulta);
  }

  getStudent(id:any):Observable<any>{

    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  deletarUsuario(id:Number):Observable<any>{

    return this.http.delete(AppConstants.baseUrl + id, {responseType:'text'});
  }

  consultarUser(nome:string): Observable<any>{

     return this.http.get(AppConstants.baseUrl + "consultarnome/" + nome);

  }

  salvarUsuario(user: User):Observable<User[]>{

    return this.http.post<User[]>(AppConstants.baseUrlCadastrar,user);

  }

  updateUsuario(user:User):Observable<User[]>{

    return this.http.put<User[]>(AppConstants.baseUrl,user);

  }

  userAutenticado(){

    if (localStorage.getItem('token') !==null &&
    localStorage.getItem('token')?.toString().trim() !=null) {

       return true;

    }else{

      return false;
    }
  }
}
