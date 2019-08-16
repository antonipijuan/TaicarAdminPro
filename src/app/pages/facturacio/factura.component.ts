import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PersonaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../services/factura/factura.service';
import { Factura } from '../../models/factura.model';
import { FacturaDetall } from 'src/app/models/facturadetall.model';
import { Pagament } from 'src/app/models/pagament.model';
import { PagamentService } from '../../services/pagament/pagament.service';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  closeResult: string;
  public model: any;

  pagament: Pagament;

  pagaments: Pagament[] = [];
  factura: Factura = new Factura(0, '', '', null, null, 0, 0, 'vigent', '');
  factures_detall: FacturaDetall[] = [];
  vid: string;
  carregant = true;


  constructor(
    public modalService: NgbModal,
    public _pagamentService: PagamentService,
    public _facturaService: FacturaService,
    public _clientsService: PersonaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe( params => {
      this.carregant = true;
      this.vid = params['id'];
      this.cargarFactura(this.vid);
    });
   }

  ngOnInit() {
  }

  cargarFactura( id: string ) {
    this._facturaService.carregarFactura( id )
          .subscribe( factura => {
            this.factura = factura;
            console.log(factura);
            // this.cargarDetall(id);
            this.carregant = false;
            this._pagamentService.carregarPagamentsFactura(id)
              .subscribe( pagaments => {
                this.pagaments = pagaments;
                console.log(pagaments);
              });
            this._facturaService.carregaFacturesDetall(id)
              .subscribe( factures_detall => {
                console.log(factures_detall);
                this.factures_detall = factures_detall;
              });
          });
  }

  guardaPagament(vpago: Pagament) {
    console.log(vpago);

    if (this.factura.pendent_pagament >= vpago.import_pagat) {

      this._facturaService.actualitzar_importsFactra(vpago.import_pagat, this.factura)
        .subscribe( resp => {
          console.log(resp);
          console.log('imports actualitzats');
          this._pagamentService.altaPagament(vpago)
          .subscribe( pagament => {
            console.log(pagament);
            console.log('alta de pagament realitzat');
            this.cargarFactura(this.vid);
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
      swal({
        type: 'error',
        title: 'Pagament incorrecte',
        text: 'Limport anotat es superior a limport pendent de la factura',
        footer: '<a href>Why do I have this issue?</a>'
      });
    }

  }
  open(contenedor) {
    console.log(this.factura);
    this.pagament = new Pagament(this.factura.client['_id'], this.factura['_id'], 0, null);
    this.modalService.open(contenedor, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
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
