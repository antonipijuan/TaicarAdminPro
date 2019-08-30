import { Injectable } from '@angular/core';
import { Pressupost } from '../../models/pressupost.model';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { PressupostDetall } from '../../models/pressupostdetall';
import { URL_SERVICIOS } from '../../component/config';
import { Reserva } from '../../models/reserva.model';

import * as moment from 'moment';

@Injectable()
export class NotificacionsService {

  totalReserves = 0;
  notificacions = [];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  carregarpressupostos_datavigencia(vdata: String) {
    let url = URL_SERVICIOS + '/pressupost/caduquensegonsvigencia/' + vdata;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pressupostos;
        });
  }

  carregarPressupostosCaducats() {
    let url = URL_SERVICIOS + '/pressupost/caducats/desdeavui';
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pressupostos;
        });
  }

}
