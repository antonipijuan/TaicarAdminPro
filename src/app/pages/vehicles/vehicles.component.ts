import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/service.index';

import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styles: []
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(
    public _vehicleService: VehicleService,
    public _modalService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarVehicles();
  }

  cargarVehicles() {
    this._vehicleService.cargarVehicles()
        .subscribe( vehicles => this.vehicles = vehicles);
  }

  mostrarModal( id: string) {
    this._modalService.mostrarModal( 'vehicles', id);
    console.log('mostrar modal');
  }

  buscarVehicle( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarVehicles();
      return;
    }

    this._vehicleService.buscarVehicles( termino )
            .subscribe( vehicles =>  this.vehicles = vehicles );
  }

  borrarVehicle( vehicle: Vehicle ) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + vehicle._id,
      type: 'warning',
      showCancelButton: true,
    })
    .then( result => {
      if (result.value) {
        this._vehicleService.borrarVehicle( vehicle._id )
            .subscribe( () =>  this.cargarVehicles() );
      }
    });
  }

}
