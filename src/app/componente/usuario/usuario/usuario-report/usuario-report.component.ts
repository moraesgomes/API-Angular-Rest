import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NotificacaoService } from '../../../../service/notificacao.service';

import { Validacoes } from '../../../../validacoes/validacoes';
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
import { UserReport } from 'src/app/model/UserReport';

@Injectable()
export class FormatDateAdpater extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }

    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }

  toModel(date: NgbDateStruct | null): string  {
    return date
      ?validarDia (date.day) + this.DELIMITER + validarDia (date.month) + this.DELIMITER + date.year
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

    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
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
      ?validarDia(date.day) + this.DELIMITER + validarDia (date.month) + this.DELIMITER + date.year
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
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdpater },
  ],
})
export class UsuarioReportComponent  {
[x: string]: any;

  userReport = new UserReport();


  constructor(
    private routeActive: ActivatedRoute,
    private userService: UsuarioService,
    private notificacaoService: NotificacaoService,
    private config: NgbDatepickerConfig
  )

  {
    config.minDate = { year: 1900, month: 1, day: 1 };
  }



  imprimeRelatorio() {

    this.userService.downloadPdfRelatorioParam(this.userReport);


  }





}
