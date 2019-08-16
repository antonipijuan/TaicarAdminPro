import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-caravana2',
  templateUrl: './caravana2.component.html'
})
export class Caravana2Component implements OnInit {

  vehicle: Vehicle = new Vehicle('', '', '', '', '', 0, '', '', '', '', 0, 0, 0, 0, '');

  constructor(
  public _vehicleService: VehicleService,
  public router: Router,
  public activatedRoute: ActivatedRoute

  // public _modalUploadService: ModalUploadService
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

  // cambioHospital( id: string ) {

  //   this._hospitalService.obtenerHospital( id )
  //         .subscribe( hospital => this.hospital = hospital );

  // }

  cambiarFoto() {

    // this._modalUploadService.mostrarModal( 'vehicles', this.vehicle._id );

  }

}

