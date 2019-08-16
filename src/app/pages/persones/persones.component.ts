import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/service.index';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-persones',
  templateUrl: './persones.component.html'
})
export class PersonesComponent implements OnInit {

  persones: Persona[] = [];
  // desde = 0;

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
    this.cargarPersones();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarPersones() );
  }

  cargarPersones() {

    this.cargando = true;
    this._personaService.cargarPersones()
      .subscribe( persones => {
        this.persones = persones,
        this.totalRegistros = persones.total;
      });
      this.cargando = false;
  }

  buscarPersona( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarPersones();
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

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + persona.nombre,
      type: 'warning',
      showCancelButton: true,
    })
    .then( borrar => {

      if (borrar) {

        this._personaService.borrarPersona( persona._id )
                  .subscribe( borrado => {
                      this.cargarPersones();
                  });

      }

    });

  }

}
