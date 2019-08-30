import { Component, OnInit } from '@angular/core';
import { Pagament } from 'src/app/models/pagament.model';
import { Persona } from 'src/app/models/persona.model';

import { PersonaService } from '../../services/service.index';

import swal from 'sweetalert2';
import { PagamentService } from '../../services/pagament/pagament.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagaments',
  templateUrl: './pagaments.component.html'
})
export class PagamentsComponent implements OnInit {

  carregant = false;
  clickedItem;
  totalPagaments = 0;
  nomsclients = [];
  clients: Persona[] = [];
  pagaments: Pagament[] = [];


  constructor(
    public _pagamentsService: PagamentService,
    public _personesService: PersonaService
  ) { }

  ngOnInit() {
    this.carregant = true;
    this.carregarPagaments();

  }

  carregarPagaments() {

    this._pagamentsService.carregarPagaments()
      .subscribe( pagaments => {
        this.pagaments = pagaments;
        this.totalPagaments = pagaments.total;
        this.carregant = false;
      });

  }

  borrarPagament(vpagament: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true
    }).then((result) => {
        this._pagamentsService.esborraPagament(vpagament)
          .subscribe( pagament => {
            console.log('pagament esborrat', pagament);
            this.carregarPagaments();
          });
        });
  }

}
