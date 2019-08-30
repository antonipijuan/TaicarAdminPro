import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { PersonaService, DespesaService, VehicleService} from '../../services/service.index';
import { Despesa } from '../../models/despesa.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../models/persona.model';
import { Vehicle } from '../../models/vehicle.model';
import swal from 'sweetalert2';
import * as moment from 'moment';
// import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Subscriber } from 'rxjs/Subscriber';

import { map } from 'rxjs/operator/map';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from '../../component/alert/alert.component';


@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html'

})
export class DespesaComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;


  carregant = true;
  vehicles: Vehicle[] = [];
  esnou: boolean;
 despesa: Despesa;
  closeResult: string;

  constructor(
    // private toastr: ToastrService,
    public _despesaService: DespesaService,
    public _clientsService: PersonaService,
    public _vehiclesService: VehicleService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalService: NgbModal

  ) {
    activatedRoute.params.subscribe( params => {

      const id = params['id'];
      this.carregant = true;

      console.log(params);
      console.log(id);

      if ( id !== 'nuevo' ) {
        this.cargarDespesa( id );
        this.esnou = false;


      } else {
        this.esnou = true;
        this.carregant = false;


      }

    });


   }

  ngOnInit() {

    this.carregarVehicles();


  }



  cargarDespesa( id: string ) {
    this._despesaService.cargarDespesa( id )
          .subscribe( despesa => {
            this.despesa = despesa;
            console.log(this.despesa);
            this.carregant = false;
          });
  }
  guardaDespesa( vdesp: Despesa ) {

    console.log(vdesp);

    if (this.esnou) {
      this._despesaService.guardarDespesa(vdesp)
        .subscribe( despesa => {
          this.despesa = despesa;
          this.despesa = null;
          // this.carregarDespeses();
          this.modalService.dismissAll();
          this.router.navigate(['/despeses' ]);
        });

    } else {
      this._despesaService.actualitzarDespesa(vdesp)
      .subscribe( despesa => {
        this.despesa = despesa;
        this.despesa = null;
        // this.carregarDespeses();
        this.modalService.dismissAll();
        this.router.navigate(['/despeses' ]);
      });
    }

  }





//   cargarClient( id: string ) {
//     this._clientsService.cargarPersona( id )
//           .subscribe( persona => {
//             console.log(persona);
//             this.pressupost.client = persona;
//             this.pressupost.data = new Date(moment().format());
//             this.pressupost.data_vigencia = new Date(moment().add(60, 'days').format());
//             this.carregant = false;

//           });
//   }

  carregarVehicles() {
    this._vehiclesService.cargarVehicles()
    .subscribe( vehicles => {

      this.vehicles = vehicles;
    });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
