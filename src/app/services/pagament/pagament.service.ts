import { Injectable } from '@angular/core';
import { Pressupost } from '../../models/pressupost.model';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { PressupostDetall } from '../../models/pressupostdetall';
import { URL_SERVICIOS } from '../../config/config';
import { Reserva } from '../../models/reserva.model';

import * as moment from 'moment';
import { Pagament } from 'src/app/models/pagament.model';

@Injectable()
export class PagamentService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  carregarPagaments() {
    let url = URL_SERVICIOS + '/pagament';
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagaments;
        });
  }

  carregarPagamentsID(vid: String) {
    let url = URL_SERVICIOS + '/pagament/' + vid ;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagament;
        });
  }

  altaPagament(vpago: Pagament) {
    let url = URL_SERVICIOS + '/pagament';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, vpago )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagament;
        });
  }

  actualitzaPagament(vpago: Pagament) {
    let url = URL_SERVICIOS + '/pagament/' + vpago._id ;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, vpago )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagament;
        });
  }
  carregarPagamentsFactura(vdata: String) {
    let url = URL_SERVICIOS + '/pagament/perfactura/' + vdata;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagaments;
        });
  }

  carregarPagamentsClient(vdata: String) {
    let url = URL_SERVICIOS + '/pagament/perclient/' + vdata;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagaments;
        });
  }

  esborraPagament(vdata: string) {

    let url = URL_SERVICIOS + '/pagament/' + vdata;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
        .map( (resp: any) => {
          // this.totalReserves = resp.total;
          return resp.pagament;
        });
  }

}
