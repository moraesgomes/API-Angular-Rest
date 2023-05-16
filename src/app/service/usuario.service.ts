import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<User[]>{

      return this.http.get<User[]>(AppConstants.baseUrl);
  }
}
