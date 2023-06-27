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
import { Profissao } from 'src/app/model/profissao';

@Injectable()
export class FormatDateAdpater extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct {
    if (typeof value === 'string') {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }

    return { day: 0, month: 0, year: 0 };
  }

  toModel(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Injectable()
export class FormataData implements NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }

    return { day: 0, month: 0, year: 0 };
  }
  format(date: NgbDateStruct): any {
    return date
      ? validarDia(date.day) +
          this.DELIMITER +
          validarDia(date.month) +
          this.DELIMITER +
          date.year
      : '';
  }

  toModel(date: NgbDateStruct | null): any | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

function validarDia(valor: any) {
  if (valor.toString() !== '' && parseInt(valor) <= 9) {
    return '0' + valor;
  }

  return valor;
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdpater },
  ],
})
export class UsuarioAddComponent implements OnInit {
  valid = new Validacoes();

  usuario = new User();

  telefone = new Telefone();

  profissoes!: Array<Profissao>;

  constructor(
    private routeActive: ActivatedRoute,
    private userService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private config: NgbDatepickerConfig
  ) {
    config.minDate = { year: 1900, month: 1, day: 1 };
  }

  ngOnInit() {
    this.carregarProfissoes();

    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getStudent(id).subscribe((data) => {
        this.usuario = data;

        // Conversão da data de nascimento
        if (this.usuario.dataNascimento) {
          const dataNascimentoTimestamp = parseInt(
            this.usuario.dataNascimento.toString()
          );
          const dataNascimento = new Date(dataNascimentoTimestamp);

          // Extrair os componentes da data (dia, mês, ano)
          const dia = dataNascimento.getDate();
          const mes = dataNascimento.getMonth() + 1; // O mês é baseado em zero, então adicionamos 1
          const ano = dataNascimento.getFullYear();

          // Atualizar o objeto de usuário com a data formatada
          this.usuario.dataNascimento = `${dia
            .toString()
            .padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
        }
      });
    }
  }

  carregarProfissoes() {
    this.userService.getProfissaoList().subscribe((data) => {
      this.profissoes = data;

      if (this.usuario.profissao && this.usuario.profissao.id) {
        const profissaoEncontrada = this.profissoes.find(
          (profissao) => profissao.id === this.usuario.profissao.id
        );

        if (profissaoEncontrada) {
          this.usuario.profissao = profissaoEncontrada;
        }
      }
    });
  }

  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != '') {
      this.userService.updateUsuario(this.usuario).subscribe((data) => {
        this.carregarProfissoes();
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
            this.carregarProfissoes();
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
