import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user';
import { UserReport } from '../model/UserReport';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getProfissaoList():Observable<any>{

     return this.http.get<any>(AppConstants.getBaseurlPath + 'profissao/');
  }

  getStudentList(): Observable<any>{

      return this.http.get<any>(AppConstants.baseUrl);
  }

  getStudentListPage(pagina:any): Observable<any>{

    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
}


  getStudent(id:any):Observable<any>{

    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  deletarUsuario(id:Number):Observable<any>{

    return this.http.delete(AppConstants.baseUrl + id, {responseType:'text'});
  }

  deleteFone(id:Number):Observable<any>{

    return this.http.delete(AppConstants.baseUrl + "removerfone/" + id,{responseType:'text'});
  }

  consultarUser(nome:string): Observable<any>{

     return this.http.get(AppConstants.baseUrl + "consultarnome/" + nome);

  }

  consultarUserPorPage(nome:string, page:number): Observable<any>{

    return this.http.get(AppConstants.baseUrl + "consultarnome/" + nome + "/page/" + page);

 }

  salvarUsuario(user: User):Observable<any>{

    return this.http.post<any>(AppConstants.baseUrlCadastrar,user);

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

  downloadPdfRelatorio() {

    return this.http.get(AppConstants.baseUrl + 'relatorio', { responseType: 'text' }).subscribe(
      (data => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.src = data;
        } else {
          console.error("Elemento 'iframe' não encontrado.");
        }
      })
    );
  }

  downloadPdfRelatorioParam(userreport:UserReport) {

    return this.http.post(AppConstants.baseUrl + 'relatorio/',userreport ,{ responseType: 'text' }).subscribe(
      (data => {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.src = data;
        } else {
          console.error("Elemento 'iframe' não encontrado.");
        }
      })
    );
  }


}
