import { Injectable } from '@angular/core';
import { Pressupost } from '../../models/pressupost.model';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { PressupostDetall } from '../../models/pressupostdetall';
import { URL_SERVICIOS } from '../../config/config';
import { Reserva } from '../../models/reserva.model';

import * as moment from 'moment';
import { Factura } from '../../models/factura.model';
import { FacturaDetall } from '../../models/facturadetall.model';

@Injectable()
export class FacturaService {

  totalFactures = 0;
  nodisponibles = [];
  numfactura: number;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  carregarFactures() {
    const url = URL_SERVICIOS + '/factura';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalFactures = resp.total;
          return resp.factures;
        });
  }

  crearFactura( vpressupost: Pressupost, vdetallpressupost: PressupostDetall[], numfactura: number) {
    console.log(vpressupost);

        const factura = new Factura(numfactura, moment().format('YYYY-MM-DD'), moment().add(30, 'days').format('YYYY-MM-DD'),
          vpressupost.client, null , vpressupost.preu_brut, vpressupost.preu_net, 'vigent', vpressupost.observacions);


      let url = URL_SERVICIOS + '/factura';

        url += '?token=' + this._usuarioService.token;
        console.log(factura);
        return this.http.post( url, factura )
            .map( (resp: any) => {
              // swal('Pressupost Detall Creado', pressupost._id, 'success');
              console.log(resp);
              for (const x of vdetallpressupost) {
                const detallfactura = new FacturaDetall(x.vehicle, x.temporada, x.data_inicial, x.data_final,
                  x.dies, resp.factura['_id'], x.observacions, x.preu, '');
                  this.guardaDetall(detallfactura)
                      .subscribe( facturadetall => {
                        console.log(facturadetall);
                          return resp.facturadetall;
                          });
                }
                return resp.factura;

      });

      }
      carregarFactura( id: string) {
        const url = URL_SERVICIOS + '/factura/' + id;

        return this.http.get( url )
                  .map( (resp: any) => resp.factura );
      }

      actualitzar_idfactura_pressupostdetall( pressupost: string, factura: string) {
        let url = URL_SERVICIOS + '/pressupostdetall/actualitzafactura_perpressupost/' + pressupost + '/' + factura ;

        url += '?token=' + this._usuarioService.token;

        return this.http.get( url )
            .map( (resp: any) => {
              // swal('Pressupost Detall Creado', pressupost._id, 'success');
              return resp.pressupostos;
            });
      }

      actualitzar_importsFactra( varimport: Number, fact: Factura) {
        let url = URL_SERVICIOS + '/factura/actualitzaPagaments/' + fact._id ;

        url += '?token=' + this._usuarioService.token;
      console.log(url);
      console.log(fact);
        return this.http.put( url, { varimport, fact} )
            .map( (resp: any) => {
              // swal('Pressupost Detall Creado', pressupost._id, 'success');
              console.log(resp);
              return resp.factura;
            });
      }

      guardaDetall( vfacturadetall: FacturaDetall) {
        let url = URL_SERVICIOS + '/facturadetall';

          url += '?token=' + this._usuarioService.token;
          return this.http.post( url, vfacturadetall )
              .map( (resp: any) => {
                // swal('Pressupost Detall Creado', pressupost._id, 'success');
                return resp.facturadetall;
              });
          }

          carregaFacturesDetall( id_factura: string ) {
            let url = URL_SERVICIOS + '/facturadetall/perfactura/' + id_factura;
             url += '?token=' + this._usuarioService.token;
            return this.http.get( url )
                .map( (resp: any) => {
                   return resp.factures_detall;
                });
          }

          obtenirultimnum( anualitat: number ) {
            let url = URL_SERVICIOS + '/numeraciofact/ultim/' + anualitat;
             url += '?token=' + this._usuarioService.token;
            return this.http.get( url )
                .map( (resp: any) => {
                   return resp.numeracio;
                });
          }
}
