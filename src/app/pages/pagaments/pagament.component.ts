import { Component, OnInit } from '@angular/core';
import { PagamentService, PersonaService, FacturaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagament } from 'src/app/models/pagament.model';
import { Factura } from 'src/app/models/factura.model';
import { Persona } from 'src/app/models/persona.model';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagament',
  templateUrl: './pagament.component.html'

})
export class PagamentComponent implements OnInit {

  carregant = true;
  factures: Factura[] = [];
  clients: Persona[] = [];
  vfactura: Factura = new Factura(0, null, null, null, null, 0, 0, 'vigent', '', 0, 0, '');
  esnou: boolean;
 pagament: Pagament;
 pagaments: Pagament[] = [];
  closeResult: string;

  constructor(
    // private toastr: ToastrService,
    public _pagamentService: PagamentService,
    public _clientsService: PersonaService,
    public _facturesService: FacturaService,
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
        this.carregarPagamentId( id );
        this.esnou = false;
        console.log(this.esnou);


      } else {
        this.esnou = true;
        this.carregant = false;
        this.pagament = new Pagament('', '', 0, '', '');
        this.vfactura = new Factura(0, null, null, null, null, 0, 0, 'vigent', '', 0, 0, '');
        console.log(this.esnou);


      }

    });
   }

  ngOnInit() {

    this.carregarClients();
    this.carregarFactures();
  }

  cargarFactura( id: string ) {
    this._facturesService.carregarFactura( id )
          .subscribe( fact => {
            this.vfactura = fact;
            console.log(fact);
            // this.cargarDetall(id);
            this.carregant = false;
            this._pagamentService.carregarPagamentsFactura(id)
              .subscribe( pagaments => {
                this.pagaments = pagaments;
                console.log(pagaments);
              });
            // this._facturesService.carregaFacturesDetall(id)
            //   .subscribe( factures_detall => {
            //     console.log(factures_detall);
            //     this._facturesService = factures_detall;
            //   });
              console.log(this.vfactura);
          });
  }

  guardaPagament(vpago: Pagament) {
    console.log(vpago);

    if (this.vfactura.pendent_pagament >= vpago.import_pagat) {

      this._facturesService.actualitzar_importsFactra(vpago.import_pagat, this.vfactura)
        .subscribe( resp => {
          console.log(resp);
          console.log('imports actualitzats');
          this._pagamentService.altaPagament(vpago)
          .subscribe( pagament => {
            console.log(pagament);
            console.log('alta de pagament realitzat');

            // this.cargarFactura(this.id);
          });

        });
      // this._facturaService.actualitzar_importsFactra(vpago.import_pagat, this.factura._id)
      //   .subscribe ( actual => {
      //     this._pagamentService.altaPagament(vpago)
      //       .subscribe( pagament => {
      //         console.log(pagament);
      //         this._pagamentService.carregarPagamentsFactura(this.vid)
      //               .subscribe( pagaments => {
      //                 this.pagaments = pagaments;
      //                 console.log(pagaments);
      //               });
      //         });

      //   });
    } else {
      Swal.fire({
        type: 'error',
        title: 'Pagament incorrecte',
        text: 'Limport anotat es superior a limport pendent de la factura',
        footer: '<a href>Why do I have this issue?</a>'
      });
    }

  }

  // guardaPagament(vpago: Pagament) {
  //   if (this.esnou) {
  //     this._pagamentService.altaPagament(vpago)
  //     .subscribe( pagament => {
  //       console.log(pagament);
  //     });
  //   } else {
  //     this._pagamentService.actualitzaPagament(vpago)
  //       .subscribe( pagament => {
  //         console.log(pagament);
  //       });
  //   }

  // }

  carregarPagamentId(vpago: string) {
    this._pagamentService.carregarPagamentsID(vpago)
      .subscribe( pagament => {
        console.log(pagament);
        this.pagament = pagament;
        this.carregant = false;
      });
  }

  carregarFactures() {
    this._facturesService.carregarFactures()
    .subscribe( factures => {

      this.factures = factures;
    });
  }
  carregarClients() {
    this._clientsService.cargarPersonesTotes()
    .subscribe( persones => {

      this.clients = persones;
    });
  }

}
