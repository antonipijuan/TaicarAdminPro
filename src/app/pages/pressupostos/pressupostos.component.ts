import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


import { PressupostService } from '../../services/service.index';
import { PersonaService } from '../../services/service.index';

import { Persona } from '../../models/persona.model';
import { Pressupost } from '../../models/pressupost.model';


import { Observable } from 'rxjs';
import { ReservaService } from '../../services/reserva/reserva.service';
import { Reserva } from '../../models/reserva.model';
import { Select2OptionData } from 'ng2-select2';
import Swal from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';



@Component({
  selector: 'app-pressupostos',
  templateUrl: './pressupostos.component.html',
  styleUrls: ['../persones/persones.styles.css']

})
export class PressupostosComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  closeResult: string;
  public model: any;
  public exampleData: Array<Select2OptionData>;

  public filter = '';
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 15,
    currentPage: 1
};
  carregant = false;
  clickedItem;
  nomsclients = [];
  clients: Persona[] = [];
  pressupostos: Pressupost[] = [];
  page = 1;
  p: number;

  constructor(

    public _pressupostosService: PressupostService,
    public _personesService: PersonaService,
    public modalService: NgbModal,
    private _reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.carregant = true;
    this.carregarPressupostosVigents();
    this.carregarClients();
    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
    this.carregant = false;
  }

  search2 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.clients.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    selectedItem(item) {
      this.clickedItem = item.item;
      console.log(item);
    }




  obteniretiquetaFormulari( estat: string): string {
    switch (estat) {
      case 'vigent':
          return 'label label-info';

      case 'anulat':
      return 'label label-warning';

      case 'esborrat':
        return 'label label-danger';

        case 'facturat':
        return 'label label-success';

        case 'confirmat':
        return 'label label-primary';


      }
  }

  carregarClients() {
    this._personesService.cargarPersonesTotes()
        .subscribe( persones => {
          console.log(persones);
          this.clients = persones;


          for (let _i = 0; _i < this.clients.length; _i++) {
              this.nomsclients.push(this.clients[_i].nombre);

          }
          console.log(this.nomsclients);


        });
  }

  carregarPressupostosVigents() {
    this._pressupostosService.carregarPressupostosVigents()
        .subscribe( pressupostos => this.pressupostos = pressupostos);
  }

  changed(evt) {
    if (evt.target.checked) {
      this.carregarPressupostos();
    } else {
      this.carregarPressupostosVigents();
    }
 }
  carregarPressupostos() {
    this._pressupostosService.carregarPressupostos()
        .subscribe( pressupostos => this.pressupostos = pressupostos);
  }

  buscarClient( termino: string ) {

    if ( termino.length <= 0 ) {
      this.carregarClients();
      return;
    }
    this._personesService.buscarPersones( termino )
      .subscribe( persones => this.clients = persones);

  }

  buscarPressupost( termino: string ) {

    console.log('buscant pressupost!' + termino);
    if ( termino.length <= 0 ) {
      this.carregarPressupostos();
      return;
    }
    this._pressupostosService.buscarPressupostos( termino )
      .subscribe( pressupostos => this.pressupostos = pressupostos);

  }

  borrarPressupost (termino: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._reservaService.esborraDatesBookingPerPressupost(termino)
        .subscribe( resp => {
          console.log(resp);
          this._pressupostosService.borrarPressupost(termino)
          .subscribe( pressupost => {
            this.carregarPressupostos();
            console.log(pressupost);
          });
        });

      }
    });

  }

  anularPressupost( termino: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._pressupostosService.anularPressupost(termino)
      .subscribe( pressupost => {
        this.carregarPressupostos();
        console.log(pressupost);
        this.carregarPressupostos();
      });
      }
    });
  }

//   openModal() { this.modalRef = this.modalService.open(); }
// closeModal() { this.modalRef.close(); }

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
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

  formatter = (result: string) => result.toUpperCase();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.nomsclients.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

}
