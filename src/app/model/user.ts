import { Profissao } from "./profissao";
import { Telefone } from "./telefone";

export class User {
  id!: number;
  login!: string;
  nome!: string;
  senha!:string;
  cpf!: string;
  dataNascimento!:String;

  profissao: Profissao = new Profissao();
  salario!: DoubleRange;

  telefones: Telefone[] = [];



}
