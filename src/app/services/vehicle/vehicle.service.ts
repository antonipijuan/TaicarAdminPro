import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../component/config';
// import { UsuarioService } from '../service.index';
import { Vehicle } from '../../models/vehicle.model';

import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable()
export class VehicleService {

  totalVehicles: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarVehicles() {
    let url = URL_SERVICIOS + '/vehicle';

    return this.http.get (url)
        .map( (resp: any) => {
          this.totalVehicles = resp.total;
          return resp.vehicles;
        });
  }

  carregarVehicle( id: string) {

    let url = URL_SERVICIOS + '/vehicle/' + id;

    return this.http.get(url)
        .map( (resp: any) => resp.vehicle );

  }

  buscarVehicles( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/vehicles/' + termino;
    return this.http.get( url )
          .map( (resp: any) => resp.vehicles);
  }

  borrarVehicle( id: string) {

    let url = URL_SERVICIOS + '/vehicle/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
    .map( resp => {
      Swal.fire( 'Vehicle Borrado', 'Vehicle borrado correctamente', 'success' );
      return resp;
    });

}

guardarVehicle( vehicle: Vehicle ) {

let url = URL_SERVICIOS + '/vehicle';

if ( vehicle._id ) {
// actualizando
url += '/' + vehicle._id;
url += '?token=' + this._usuarioService.token;

return this.http.put( url, vehicle )
      .map( (resp: any) => {
        Swal.fire('Vehicle Actualizado', vehicle.marca, 'success');
        return resp.vehicle;

      });

}else {
// creando
url += '?token=' + this._usuarioService.token;
return this.http.post( url, vehicle )
    .map( (resp: any) => {
      Swal.fire('Vehicle Creado', vehicle.marca, 'success');
      return resp.vehicle;
    });
}




}

obtenirPreuTemporada( temporada: string, vehicle: string) {
  let url = URL_SERVICIOS + '/vehicle/getpreutemporada/' + temporada + '/' + vehicle;
  url += '?token=' + this._usuarioService.token;
  return this.http.get(url)
      .map( (resp: any) => resp.preu);
}



}
