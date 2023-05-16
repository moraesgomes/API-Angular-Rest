export class AppConstants {

     public static get baseServidor():string {

         return "http://localhost:8080/"
     }


     public static baseLogin():string {

        return this.baseServidor + "apirestspring/login"
     }


     public static get baseUrlConsulta():string {

          return this.baseServidor + "apirestspring/usuario/consultartodos"
     }

     public static get baseUrl():string {

      return this.baseServidor + "apirestspring/usuario/"
 }
}
