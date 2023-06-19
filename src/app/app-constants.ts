export class AppConstants {

     public static get baseServidor():string {

         return "http://localhost:8080/"
     }


     public static baseLogin():string {

        return this.baseServidor + "apirestspring/login"
     }



     public static get baseUrlCadastrar():string {

      return this.baseServidor + "apirestspring/usuario/cadastrar"
 }


     public static get baseUrl():string {

      return this.baseServidor + "apirestspring/usuario/"
 }

 public static get getBaseurlPath(): string {

    return this.baseServidor + "apirestspring/"
 }

}
