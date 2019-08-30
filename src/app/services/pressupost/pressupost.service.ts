import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../component/config';
import { Pressupost } from '../../models/pressupost.model';
import { Persona } from '../../models/persona.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { PressupostDetall } from '../../models/pressupostdetall';

import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Injectable()
export class PressupostService {

  totalPressupostos = 0;
  totalPersones = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarClients() {

    const url = URL_SERVICIOS + '/persona';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalPersones = resp.total;
          return resp.persones;
        });

  }

  carregarPressupostos() {
    const url = URL_SERVICIOS + '/pressupost';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalPressupostos = resp.total;
          return resp.pressupostos;
        });
  }

  carregarPressupostosVigents(){
    const url = URL_SERVICIOS + '/pressupost/vigents';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalPressupostos = resp.total;
          return resp.pressupostos;
        });
  }

  carregarPressupost( id: string) {
    const url = URL_SERVICIOS + '/pressupost/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.pressupost );
  }

  guardaPressupost( vpressupost: Pressupost) {
    let url = URL_SERVICIOS + '/pressupost';

      if ( vpressupost._id ) {
      // actualizando
      url += '/' + vpressupost._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, vpressupost )
            .map( (resp: any) => {
              Swal.fire('Pressupost actualitzat', resp.pressupost._id, 'success');
              return resp.pressupost;

            });

      } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, vpressupost )
          .map( (resp: any) => {
            Swal.fire('Pressupost Creado', resp.pressupost._id, 'success');
            return resp.pressupost;
          });
      }

      }
      guardaPressupostDetall( vpressupostdetall: PressupostDetall) {
        let url = URL_SERVICIOS + '/pressupostdetall';

          url += '?token=' + this._usuarioService.token;
          return this.http.post( url, vpressupostdetall )
              .map( (resp: any) => {
                // swal('Pressupost Detall Creado', pressupost._id, 'success');
                return resp.pressupost_detall;
              });
          }
      esborraPressupostosDetallDePressupost( id_pressupost: string) {
        let url = URL_SERVICIOS + '/pressupostdetall/perpressupost/' + id_pressupost;

        url += '?token=' + this._usuarioService.token;
        return this.http.delete( url )
            .map( (resp: any) => {
              // swal('Pressupost Detall Creado', pressupost._id, 'success');
              return resp.pressupost_detall;
            });
      }

      carregaPressupostosDetalldePressupost( id_pressupost: string ) {
         let url = URL_SERVICIOS + '/pressupostdetall/perpressupost/' + id_pressupost;
          url += '?token=' + this._usuarioService.token;
         return this.http.get( url )
             .map( (resp: any) => {
                return resp.pressupostos_detall;
             });
       }

       buscarPressupostos( termino: string ) {

        const url = URL_SERVICIOS + '/busqueda/coleccion/pressupostos/' + termino;
        console.log(url);
        return this.http.get( url )
                    .map( (resp: any) => resp.pressupostos );
      }

      borrarPressupost( idpressupost: string) {

        let url = URL_SERVICIOS + '/pressupost/' + idpressupost;
        url += '?token=' + this._usuarioService.token;
        return this.http.delete( url )
                    .map( (resp: any) => resp.pressupost );
      }

      anularPressupost( idpressupost: string ) {
        let url = URL_SERVICIOS + '/pressupost/anular/' + idpressupost;
        url += '?token=' + this._usuarioService.token;
        return this.http.get( url )
                    .map( (resp: any) => resp.pressupost );
      }
     }

