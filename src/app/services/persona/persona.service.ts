import { Injectable } from '@angular/core';
import { Persona } from '../../models/persona.model';
// import { Informe } from '../../models/informe.model';
// import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
// import { UsuarioService } from '../../services/service.index';

import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
// import { Observable } from 'rxjs';
// import { AnotacioService } from '../anotacio/anotacio.service';


@Injectable()
export class PersonaService {

  totalPersones = 0;

  persona: Persona;
  token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    // this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }


  crearPersona( persona: Persona ) {

    const url = URL_SERVICIOS + '/persona';

    return this.http.post( url, persona )
              .map( (resp: any) => {

                swal('Persona creado', persona.nombre, 'success' );
                return resp.persona;
              });
  }

  guardarPersona( persona: Persona ) {

    let url = URL_SERVICIOS + '/persona';

    if (persona._id) {
      // Actualizando
      url += '/' + persona._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, persona )
          .map( (resp: any) => {
            //  if ( persona.dni === this.persona.dni ) {
            //     const personaDB: Persona = resp.persona;
            //      // this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
            //    }
                swal('Persona actualizado', persona.nombre, 'success' );
                console.log(persona);
                return resp.persona;
                });

    } else {
      // Guardando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, persona )
          .map( (resp: any) => {
            //  if ( persona.dni === this.persona.dni ) {
            //     const personaDB: Persona = resp.persona;
            //      // this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
            //    }
          swal('Persona creada', persona.nombre, 'success' );
            console.log(persona);
            return resp.persona;

            });

    }

  }

  cargarPersones() {

    const url = URL_SERVICIOS + '/persona';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalPersones = resp.total;
          return resp.persones;
        });

  }

  cargarPersona( id: string ) {

    const url = URL_SERVICIOS + '/persona/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.persona );

  }

  buscarPersones( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/persones/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.persones );

    // const url = URL_SERVICES + '/informe/porpersona/' + termino;
    // return this.http.get( url )
    //     .map( (resp: any) => resp.informe);

  }
  // buscarInformesPerPersones( termino: string ) {

  //   // const url = URL_SERVICES + '/busqueda/coleccion/persones/' + termino;
  //   // return this.http.get( url )
  //   //             .map( (resp: any) => resp.persones );

  //   const url = URL_SERVICIOS + '/informe/porpersona/' + termino;
  //   return this.http.get( url )
  //       .map( (resp: any) => {
  //         return resp.informe;
  //       })
  //       .catch( err => {
  //         return Observable.throw(err);
  //       });

  // }

  borrarPersona( id: string ) {

    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/persona/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .map( resp => {
                  // this._anotacioService.esborrarAnotacionsperPersona(id)
                  //   .subscribe( () => {
                  //     console.log('esborrat');
                  //   });
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }
  // actualitzarInformePersona( id_persona: string, informe: Informe ) {

  //   this.token = localStorage.getItem('token');

  //   let url = URL_SERVICES + '/persona/canvidatainforme/' + id_persona;
  //   url += '?token=' + this.token;

  //   return this.http.put( url, informe )
  //               .map( (resp: any) => {
  //                 console.log(resp);
  //                 // if ( persona._id === this.persona._id ) {
  //                 //   const usuarioDB: Persona = resp.persona;
  //                 //   // this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
  //                 // }

  //                 // swal('Persona actualizado', persona.nombre, 'success' );

  //                 return resp.persona;
  //               });

  // }

  // buscarIdporDni( dni: string ) {

  //   const url = URL_SERVICES + '/persona/obteneridpordni/' + dni;
  //   console.log(url);
  //   return this.http.get( url )
  //       .map( (resp: any) => {
  //         return resp.persona;
  //       })
  //       .catch( err => {

  //         return Observable.throw(err);
  //       });


  // }

}
