import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { Pressupost } from '../../models/pressupost.model';
import { FacturaService, PersonaService, PressupostService } from '../../services/service.index';
import swal from 'sweetalert2';
import { Factura } from '../../models/factura.model';



@Component({
  selector: 'app-facturacio',
  templateUrl: './facturacio.component.html'
})
export class FacturacioComponent implements OnInit {


  clients: Persona[] = [];
  factures: Factura[] = [];
  constructor(
    public _facturesService: FacturaService,
    public _personesService: PersonaService
  ) { }

  ngOnInit() {
    this.carregarFactures();
  }

  carregarClients() {
    this._personesService.cargarPersonesTotes()
        .subscribe( persones => this.clients = persones);
  }

  carregarFactures() {
    this._facturesService.carregarFactures()
        .subscribe( factures => this.factures = factures);
  }

  buscarClient( termino: string ) {

    if ( termino.length <= 0 ) {
      this.carregarClients();
      return;
    }
    this._personesService.buscarPersones( termino )
      .subscribe( persones => this.clients = persones);

  }

  buscarFactura( termino: string ) {

    console.log('buscant pressupost!' + termino);
    if ( termino.length <= 0 ) {
      this.carregarFactures();
      return;
    }
    // this._pressupostosService.buscarPressupostos( termino )
    //   .subscribe( pressupostos => this.pressupostos = pressupostos);

  }

  // borrarPressupost (termino: string) {
  //   swal({
  //     title: 'Are you sure?',
  //     text: 'You wont be able to revert this!',
  //     type: 'warning',
  //     showCancelButton: true
  //   }).then((result) => {
  //     if (result.value) {
  //       this._pressupostosService.borrarPressupost(termino)
  //     .subscribe( pressupost => {
  //       this.carregarPressupostos();
  //       console.log(pressupost);
  //     });
  //     }
  //   });

  // }

}
