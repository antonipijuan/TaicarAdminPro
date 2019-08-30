import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import Swal from 'sweetalert2';
import {PaginationInstance} from 'ngx-pagination';
// import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module



@Component({
  selector: 'app-persones',
  templateUrl: './persones.component.html',
  styleUrls: ['./persones.styles.css']
})
export class PersonesComponent implements OnInit {

  persones: Persona[] = [];
  // desde = 0;
  public filter: string = '';
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 15,
    currentPage: 1
};  

public labels: any = {
  previousLabel: 'Previous',
  nextLabel: 'Next',
  screenReaderPaginationLabel: 'Pagination',
  screenReaderPageLabel: 'page',
  screenReaderCurrentLabel: `Estàs a ...`
};
pageSize: number;
  
  totalPersones: Number;

  clientstots: Persona[] = [];
  
  total: Promise<number>;
  tpers: String;
  totalPagines: Number;
  paginaActual: Number;
  page = 1;
  totalRegistros = 0;

  cargando = true;
  public model: any;


  constructor(
    public _personaService: PersonaService,
    public _modalUploadService: ModalUploadService
  ) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.persones.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngOnInit() {
    this.cargando = true;

    this.cargarPersonesTotes();
    // this.paginarPersones(1);
    /* this._modalUploadService.notificacion
          .subscribe( resp => this.cargarPersones() ); */
  }

  public onPageChange(pageNum: number): void {
    console.log(pageNum);
    this.pageSize = this.config.itemsPerPage * (pageNum - 1);
    if (this.pageSize === 0) {
      this.pageSize = 1;
    }
    this._personaService.paginarPersona(this.pageSize)
      .subscribe( resposta => {
        this.persones = resposta.persones;
        this.total = resposta.conteo;
        this.totalPagines = resposta.totalPagines;
        this.paginaActual = resposta.pag_actual;
        this.cargando = false;

      });
    console.log(this.pageSize);
  }

  public changePagesize(num: number): void {
    this.config.itemsPerPage = this.pageSize + num;
  }

  paginarPersones(pagin: number) {
    console.log(pagin);
    this._personaService.paginarPersona(pagin)
      .subscribe( resposta => {
        this.persones = resposta.persones;
        this.total = resposta.conteo;
        this.totalPagines = resposta.totalPagines;
        this.paginaActual = resposta.pag_actual;
        this.cargando = false;

      });
  }

  cargarPersonesTotes() {
    this._personaService.cargarPersonesTotes()
      .subscribe( persones => {
        this.persones = persones,
        this.totalRegistros = persones.total;
        this.cargando = false;
      });

  }

  buscarPersona( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarPersonesTotes();
      return;
    }

    this.cargando = true;

    this._personaService.buscarPersones( termino )
            .subscribe( (persones: Persona[]) => {

              this.persones = persones;
              this.cargando = false;
            });

  }

  borrarPersona( persona: Persona ) {
    console.log(persona);
    // if ( persona.dni === this._personaService.persona.dni ) {
    //   swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
    //   return;
    // }

    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + persona.nombre,
      type: 'warning',
      showCancelButton: true,
    })
    .then( borrar => {

      if (borrar) {

        this._personaService.borrarPersona( persona._id )
                  .subscribe( borrado => {
                      this.cargarPersonesTotes();
                  });

      }

    });

  }

}
