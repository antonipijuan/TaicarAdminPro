import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';
import { ReservaService } from '../../services/reserva/reserva.service';
import { DespesaService } from '../../services/despesa/despesa.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styles: []
})
export class VehicleComponent implements OnInit {

  vehicle: Vehicle = new Vehicle('', '', '', '', '', 0, '', '', null , '', 0, 0, 0, 0,  '');

  constructor(
    public _vehicleService: VehicleService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _reservaService: ReservaService,
    public _despesaService: DespesaService
  ) {
    activatedRoute.params.subscribe( params => {

      const id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarVehicle( id );
      }

    });
   }

   ngOnInit() {

  }

  cargarVehicle( id: string ) {
    this._vehicleService.carregarVehicle( id )
          .subscribe( vehicle => {
            this.vehicle = vehicle;
          });
  }

  guardarVehicle( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._vehicleService.guardarVehicle( this.vehicle )
            .subscribe( vehicle => {

              this.vehicle._id = vehicle._id;
              this.router.navigate(['/vehicles']);
              // this.router.navigate(['/vehicle', vehicle._id ]);

            });

  }

  creaCalendari() {

      this._reservaService.creacioPeriodeBooking('2018-01-01', '2018-12-31', this.vehicle._id)
        .subscribe( resp => {
          console.log(resp);
        });
  }

  esborraCalendari() {

      this._reservaService.esborraPeriode('2018-01-01', '2018-12-31', this.vehicle._id)
        .subscribe( resp => {
          console.log(resp);
        });
  }
  creaCalendari2019() {

      this._reservaService.creacioPeriodeBooking('2019-01-01', '2019-12-31', this.vehicle._id)
        .subscribe( resp => {
          console.log(resp);
        });
  }

  esborraCalendari2019() {

      this._reservaService.esborraPeriode('2019-01-01', '2019-12-31', this.vehicle._id)
        .subscribe( resp => {
          console.log(resp);
        });
  }

  esborraDespeses() {

    this._despesaService.borrarDespesesVehicle(this.vehicle._id)
      .subscribe( resp => {
        console.log(resp);
      });
}
  // cambioHospital( id: string ) {

  //   this._hospitalService.obtenerHospital( id )
  //         .subscribe( hospital => this.hospital = hospital );

  // }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'vehicles', this.vehicle._id );

  }

}
