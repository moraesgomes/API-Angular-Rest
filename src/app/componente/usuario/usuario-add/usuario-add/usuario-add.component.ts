import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NotificacaoService } from '../../../../service/notificacao.service';

import { Validacoes } from './../../../../validacoes/validacoes';
import { Observable, map } from 'rxjs';
import { Telefone } from 'src/app/model/telefone';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormatDateAdpater extends NgbDateAdapter<any> {
  readonly DELIMITER = '/';

  override fromModel(value: any | null): NgbDateStruct {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }

    // Retorna uma instância  válida de  NgbDateStruc mesmo quando o valor é null
    return { day: 0, month: 0, year: 0 };
  }



  override toModel(date: NgbDateStruct | null): any | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;


  }


}

@Injectable()
export class FormataData extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  override parse(value: any): NgbDateStruct {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }

    throw new Error('Method not implemented.');
  }
  override format(date: NgbDateStruct): any {
    return date
      ? validarDia(date.day) +
          this.DELIMITER +
          validarDia(date.month) +
          this.DELIMITER +
          date.year
      : '';
    throw new Error('Method not implemented.');
  }

  toModel(date: NgbDateStruct | null): any | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

function validarDia(valor: any) {
  if (valor.toString !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }

  return valor;
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
  {provide:NgbDateAdapter,useClass:FormatDateAdpater}],
})
export class UsuarioAddComponent implements OnInit {
  valid = new Validacoes();

  usuario = new User();

  telefone = new Telefone();

  constructor(
    private routeActive: ActivatedRoute,
    private userService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private config: NgbDatepickerConfig
  ) {

    config.minDate = { year: 1900, month: 1, day: 1 };
  }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudent(id).subscribe((data) => {
        this.usuario = data;
      });
    }
  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != '') {
      this.userService.updateUsuario(this.usuario).subscribe((data) => {
        this.novo();
        console.info('user atualizado' + data);
        this.notificacaoService.notificar('Atualizado com Sucesso');
      });
    } else if (!this.valid.validarCPF(this.usuario.cpf)) {
      this.notificacaoService.notificar(
        'CPF inválido , Favor insira o CPF correto!'
      );
    } else {
      this.validarLogin(this.usuario.login).subscribe((existingUser) => {
        if (existingUser !== null) {
          this.notificacaoService.notificar(
            'Esse Login já está cadastrado, favor informe outro Login!'
          );
        } else {
          this.userService.salvarUsuario(this.usuario).subscribe((data) => {
            this.novo();
            console.info('Gravou user: ' + data);
            this.notificacaoService.notificar('Gravado com Sucesso');
          });
        }
      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }

    const phoneNumber = parsePhoneNumberFromString(this.telefone.numero, 'BR');
    if (phoneNumber) {
      this.telefone.numero = phoneNumber.formatNational();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  deletarFone(id: any, i: any) {
    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (id != null && confirm('Deseja remover?')) {
      this.userService.deleteFone(id).subscribe((data) => {
        this.usuario.telefones.splice(i, 1);

        this.notificacaoService.notificar('Telefone removido com sucesso');
      });
    }
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

  validarLogin(login: string): Observable<User | null> {
    return this.userService.getStudentList().pipe(
      map((studentList) => {
        if (studentList && studentList.content) {
          for (const student of studentList.content) {
            if (student.login === login) {
              return student; // O login já existe no banco de dados
            }
          }
        }

        return null; // O login não existe no banco de dados
      })
    );
  }

  formatPhoneNumber(phoneNumber: string): string {
    if (typeof phoneNumber === 'string') {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'BR');
      if (parsedNumber) {
        return parsedNumber.formatInternational();
      }
    }
    return phoneNumber;
  }

  limitarNumeroTelefone(event: any) {
    const maxLength = 14;
    const input = event.target as HTMLInputElement;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }
}
