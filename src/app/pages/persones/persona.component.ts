import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona/persona.service';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../component/modal-upload/modal-upload.service';


import swal from 'sweetalert2';
import * as moment from 'moment';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: []
})
export class PersonaComponent implements OnInit {



  persona: Persona = new Persona('', '', '', '', '', '', '');

  constructor(
    public _personaService: PersonaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,

    public _usuarioService: UsuarioService
  ) {
    activatedRoute.params.subscribe( params => {

      const dni = params['dni?'];

      if ( dni !== 'nuevo' ) {
        this.cargarPersona( dni );
      } else {
        if (params['dnipers?'] !== 'null') {
          this.persona.dni = params['dnipers?'];
        }

      }

      });

   }

  ngOnInit() {


  }
  cargarPersona( dni: string) {

    this._personaService.cargarPersona(dni)
          .subscribe( persona => {
            console.log(persona);
            this.persona = persona;

          });
    }

  guardarPersona( f: NgForm ) {

    if (f.invalid) {
      return;
    }

    this._personaService.guardarPersona(this.persona)
          .subscribe( persona => {
            this.persona = persona;
            this.router.navigate(['/persones' ]);
          });
  }

}
