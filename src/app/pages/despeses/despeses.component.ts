import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Despesa } from '../../models/despesa.model';
import { Vehicle } from '../../models/vehicle.model';
import { DespesaService, VehicleService} from '../../services/service.index';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';

import swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as dadesTaula from './datos_despeses';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/component/modal-upload/modal-upload.service';

@Component({
  selector: 'app-despeses',
  templateUrl: './despeses.component.html',
  styles: [`.form-control { width: 300px; }`]
})
export class DespesesComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  closeResult: string;
  public model: any;

  totalDespeses: Number;
  totalPagines: Number;
  paginaActual: Number;

  despesa: Despesa = new Despesa('', 0, null , '', '', '');
  vehicles: Vehicle[] = [];


  total: Promise<number>;

  totalRegistros = 0;
  despeses: Despesa[] = [];
  clickedItem: Vehicle;

  public filter = '';
  public config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.totalRegistros
};

  // source: LocalDataSource;

  // settings = dadesTaula.settings;
  carregant = false;
  constructor(
    public _despesaService: DespesaService,
    public _vehicleService: VehicleService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.carregant = true;
    // this.paginarDespeses(1);
    this.cargarDespesesTotes();
    // this.carregarDespeses();
    this.carregarVehicles();
    // this.carregant = false;
  }
/*
  carregarDespeses(i: number = 0) {
    this._despesaService.carregarDespeses(i)
      .subscribe( despeses => {
        this.despeses = despeses;
        this.source = new LocalDataSource(this.despeses);
      });
  } */

/*   paginarDespeses(pagin: number) {
    this._despesaService.paginarDespesa(pagin)
      .subscribe( resposta => {
        this.despeses = resposta.despeses;
        this.source = new LocalDataSource(this.despeses);
        this.totalPagines = resposta.totalPagines;
        this.paginaActual = resposta.pag_actual;
        this.carregant = false;

      });
  } */
  pageChanged(event) {
    this.config.currentPage = event;
  }

  paginarDespeses(pagin: number) {
    console.log(pagin);
    this._despesaService.paginarDespesa(pagin)
      .subscribe( resposta => {
        this.despeses = resposta.despeses;
        this.total = resposta.conteo;
        this.totalPagines = resposta.totalPagines;
        this.paginaActual = resposta.pag_actual;
        this.carregant = false;

      });
  }

  cargarDespesesTotes() {
    this._despesaService.cargarDespesesTotes()
      .subscribe( despeses => {
        this.despeses = despeses,
        this.totalRegistros = despeses.total;
        this.carregant = false;
      });

  }

  guardaDespesa( vdesp: Despesa ) {
    this._despesaService.guardarDespesa(vdesp)
        .subscribe( despesa => {
          this.despesa = despesa;
          this.despesa = new Despesa('', 0, null , '', '', '');
          this.cargarDespesesTotes();
          this.modalService.dismissAll();
        });
  }
/*
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? []
      : this.vehicles.filter(v => v.nom.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

formatter = (x: {nom: string}) => x.nom;


    selectedItem(item) {
      this.clickedItem = item.item;
      console.log(item);
      this.buscarDespeses(this.clickedItem._id);
    } */

  buscarDespeses( termino: string ) {
    if (termino.length <= 0) {
      this.cargarDespesesTotes();
      return;
    }
    this.despeses = [];
    this._despesaService.buscarDespesa(termino)
      .subscribe( despeses => this.despeses = despeses);

  }

  carregarVehicles() {
    this._vehicleService.cargarVehicles()
        .subscribe( vehicles => {
          this.vehicles = vehicles;

        });

      }
  borrarDespesa( vdespesa: string ) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + vdespesa,
      type: 'warning',
      showCancelButton: true,
    })
    .then( result => {
      if (result.value) {
        this._despesaService.borrarDespesa( vdespesa )
            .subscribe( () =>  this.cargarDespesesTotes() );
      }
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
