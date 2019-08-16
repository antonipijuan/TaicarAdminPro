import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/service.index';

import swal from 'sweetalert2';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-reserves',
  templateUrl: './reserves.component.html',
  styles: []
})
export class ReservesComponent implements OnInit {

  reserves: Reserva[] = [];
  vehicles: Vehicle[] = [];
  matricules: String[] = [];

  constructor(
    public _reservaService: ReservaService,
    public _vehiclesService: VehicleService
  ) { }

  ngOnInit() {
    this.cargarVehicles();
    // this.carregarReserves();

  }

  cargarVehicles() {
    this._vehiclesService.cargarVehicles()
        .subscribe( vehicles => this.vehicles = vehicles);
  }

  buscarVehicles( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarVehicles();
      return;
    }

    this.reserves = [];

    this._vehiclesService.buscarVehicles( termino )
            .subscribe( vehicles =>  this.vehicles = vehicles );


  }

  buscarReserves( termino: string ) {

    this.reserves = [];
    this._reservaService.buscarReservesperVehicle(termino)
      .subscribe ( reserves => {
        this.reserves = reserves;
        console.log(this.reserves);
      });
  }

  carregarReserves() {
    this._reservaService.carregarReserves()
      .subscribe( reserves => this.reserves = reserves);

  }

  carregarReservespervehicle(idvehicle: string) {
    this._reservaService.carregarReserves()
    .subscribe( reserves => this.reserves = reserves);
  }

  carregarReservesPerUsuari(idepersona: string) {
    this._reservaService.carregarReserves()
    .subscribe( reserves => this.reserves = reserves);
  }

  borrarReserva( vreserva: Reserva ) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + vreserva._id,
      type: 'warning',
      showCancelButton: true,
    })
    .then( result => {
      if (result.value) {
        this._reservaService.borrarReserva( vreserva._id )
            .subscribe( () =>  this.carregarReserves() );
      }
    });
  }

}
