import { Observable, map } from "rxjs";
import { User } from "../model/user";
import { UsuarioService } from '../service/usuario.service';
import { Injectable } from "@angular/core";


export class Validacoes {

  usuario = new User ();


  validarCPF(cpf:string) {
    // Remova caracteres especiais do CPF
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    // Verifique se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Validação do CPF
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }



}


