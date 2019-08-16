import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/service.index';

import swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styles: []
})
export class VehiclesComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(
    public _vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.cargarVehicles();
  }

  cargarVehicles() {
    this._vehicleService.cargarVehicles()
        .subscribe( vehicles => this.vehicles = vehicles);
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
    swal({
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
