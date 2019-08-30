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
export class ReservaService {

  totalReserves = 0;
  nodisponibles = [];


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  carregarReserves() {
    const url = URL_SERVICIOS + '/reserva';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalReserves = resp.total;
          return resp.reserves;
        });
  }

  guardarReserva( vpressupostdetall: PressupostDetall) {
    console.log(vpressupostdetall);

    const reserva = new Reserva(vpressupostdetall.id_pressupost,
                                vpressupostdetall.vehicle,
                                vpressupostdetall.data_inicial,
                                vpressupostdetall.data_final);

    let url = URL_SERVICIOS + '/reserva';

      url += '?token=' + this._usuarioService.token;
      console.log(reserva);
      return this.http.post( url, reserva )
          .map( (resp: any) => {
            // swal('Pressupost Detall Creado', pressupost._id, 'success');
            return resp.reserva;
          });
      }

      creacioPeriodeBooking(datainici: string, datafi: string, vehicle: string) {

        const v_post = {
          'datainici': datainici,
          'datafi': datafi,
          'vehicle': vehicle

        };

        let url = URL_SERVICIOS + '/booking/creacioperiode_post';
        url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http.post( url, v_post )
            .map( (resp: any) => {
              return resp;
            });
        }

        esborraPeriode(datainici: string, datafi: string, vehicle: string) {

          // const v_post = {
          //   'datainici': datainici,
          //   'datafi': datafi,
          //   'vehicle': vehicle

          // };

          let url = URL_SERVICIOS + '/booking/esborrarperperiode/' + vehicle + '/' + datainici + '/' + datafi ;
          url += '?token=' + this._usuarioService.token;
          console.log(url);
          return this.http.delete( url )
              .map( (resp: any) => {
                return resp;
              });
          }

      comprovaReservaDates(datainici: string, datafi: string, vehicle: string) {

        let url = URL_SERVICIOS + '/booking/obtenirbookingperiode/' + vehicle + '/' + datainici + '/' + datafi + '/false';
        url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http.get( url )
            .map( (resp: any) => {
              return resp;
            });
        }

        comprovaReserves() {

          let url = URL_SERVICIOS + '/reserva';
          url += '?token=' + this._usuarioService.token;
          console.log(url);
          return this.http.get( url )
              .map( (resp: any) => {
                return resp;
              });
          }

        reservadatesBooking(datainici: string, datafi: string, vehicle: string, vpressu: Pressupost) {

          let url = URL_SERVICIOS + '/booking/put_actualitzarperiodebooking/' + vehicle + '/' + datainici + '/' + datafi + '/false';
          url += '?token=' + this._usuarioService.token;
          console.log(url);
          console.log(vpressu);
          return this.http.put( url, vpressu )
              .map( (resp: any) => {
                return resp;
              });
        }

        lliuradatesBooking(datainici: string, datafi: string, vehicle: string, vpressu: Pressupost) {

          let url = URL_SERVICIOS + '/booking/actualitzarperiodebooking/' + vehicle['_id'] + '/' + datainici + '/' + datafi + '/true';
          url += '?token=' + this._usuarioService.token;
          console.log(url);
          return this.http.get( url )
              .map( (resp: any) => {
                return resp;
              });
        }

        lliuradatesBookingPerPressupos( idpressupost: string) {

          let url = URL_SERVICIOS + '/booking/actualitzarperpressupost/' + idpressupost + '/true';
          url += '?token=' + this._usuarioService.token;
          console.log(url);
          return this.http.get( url )
              .map( (resp: any) => {
                return resp;
              });
        }

      buscarReserva( termino: string ) {

        const url = URL_SERVICIOS + '/busqueda/coleccion/reserves/' + termino;
        console.log(url);
        return this.http.get( url )
                    .map( (resp: any) => resp.reserves );
      }

      buscarReservesperVehicle( termino: string ) {

        let url = URL_SERVICIOS + '/reserva/reservespervehicle/' + termino;
        url += '?token=' + this._usuarioService.token;
        console.log(url);
        return this.http.get( url )
                    .map( (resp: any) => resp.reserves );
      }

      borrarReserva( idreserva: string) {

        let url = URL_SERVICIOS + '/reserva/' + idreserva;
        url += '?token=' + this._usuarioService.token;
        return this.http.delete( url )
                    .map( (resp: any) => resp.reserva );
      }

      anular( id: string) {

        let url = URL_SERVICIOS + '/reserva/anular/' + id;
        url += '?token=' + this._usuarioService.token;
        return this.http.get( url )
                    .map( (resp: any) => resp.reserva );
      }

      confirmar( id: string) {

        let url = URL_SERVICIOS + '/reserva/confirmar/' + id;
        url += '?token=' + this._usuarioService.token;
        return this.http.get( url )
                    .map( (resp: any) => resp.reserva );
      }

      facturar( id: string) {

        let url = URL_SERVICIOS + '/reserva/facturar/' + id;
        url += '?token=' + this._usuarioService.token;
        return this.http.get( url )
                    .map( (resp: any) => resp.reserva );
      }
}
