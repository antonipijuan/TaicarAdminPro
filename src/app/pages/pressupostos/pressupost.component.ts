import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { PressupostService, PersonaService, VehicleService, ReservaService, FacturaService } from '../../services/service.index';
import { Pressupost } from '../../models/pressupost.model';
import { PressupostDetall } from '../../models/pressupostdetall';
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
import { Reserva } from '../../models/reserva.model';
import { map } from 'rxjs/operator/map';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from '../../component/alert/alert.component';
import { FacturaDetall } from 'src/app/models/facturadetall.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pressupost',
  templateUrl: './pressupost.component.html'

})
export class PressupostComponent implements OnInit {
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;


  valor = 'disponible';
  vflag = false;
  article: PressupostDetall;
  reservadisponible = true;
  // article: PressupostDetall = new PressupostDetall(0, '', '', '', '', 0, '', 0, '');
  // pressupost_detall: PressupostDetall[] = [];
  persona: Persona = new Persona('', '', '', '', '', '', '');
  pressupost: Pressupost = new Pressupost(0, null, null, null , new Array<PressupostDetall>(), 0, 0, 'vigent', '', '');
  detallsaborrar: PressupostDetall[] = [];

  esnou: boolean;
  vehicles: Vehicle[] = [];
  nodisponibles: Reserva[] = [];
  numnodisponibles = 0;
  disponibles = true;

  detallfactura: FacturaDetall;

  numfactura: number;

  carregant = true;

  closeResult: string;

  constructor(
    // private toastr: ToastrService,
    public _vehiclesService: VehicleService,
    public _pressupostService: PressupostService,
    public _clientsService: PersonaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _reservaService: ReservaService,
    public modalService: NgbModal,
    public _facturaService: FacturaService

  ) {
    activatedRoute.params.subscribe( params => {

      const id = params['id?'];
      const client = params['idclient?'];

      this.carregant = true;

      console.log(params);
      console.log(id);
      console.log(client);

      if ( id !== 'nuevo' ) {
        this.cargarPressupost( id );
        this.esnou = false;

      } else {
        if (id === 'nuevo') {
          this.esnou = true;
          this.cargarClient( client);

        }

      }

    });


   }

  ngOnInit() {

    this.carregarVehicles();
    this.article = new PressupostDetall('', null, '', '', '', 0 , '', 0, '');

  }

  cargarPressupost( id: string ) {
    this._pressupostService.carregarPressupost( id )
          .subscribe( pressupost => {
            this.pressupost = pressupost;
            console.log(pressupost);
            this.cargarDetall(id);
            this.carregant = false;
          });
  }

  cargarDetall( id: string ) {
    this._pressupostService.carregaPressupostosDetalldePressupost( id )
          .subscribe( pressupostos_detall => {
            this.pressupost.detall = pressupostos_detall;
            console.log(pressupostos_detall);

          });
  }

  calcularDies(data1: string , data2: string) {
    console.log(data1);
    console.log(data2);

    if ((data1.length <= 0 ) || (data2.length <= 0 ))
      // tslint:disable-next-line:one-line
      {
        console.log('una de les dos nules');
      } else {


        const date_1 = moment(data1);
        const date_2 = moment(data2);
        const dias = date_2.diff(date_1, 'days');
        this.article.dies = dias;
        console.log(dias);
        this.canviPreu(this.article);

      }

  }

  cargarClient( id: string ) {
    this._clientsService.cargarPersona( id )
          .subscribe( persona => {
            console.log(persona);
            this.pressupost.client = persona;
            this.pressupost.data = new Date(moment().format());
            this.pressupost.data_vigencia = new Date(moment().add(60, 'days').format());
            this.carregant = false;

          });
  }

  carregarVehicles() {
    this._vehiclesService.cargarVehicles()
    .subscribe( vehicles => {

      this.vehicles = vehicles;
    });
  }

  actualitzarBookings(pressu: Pressupost) {
    for (const entry of this.detallsaborrar) {
      this._reservaService.lliuradatesBooking(entry.data_inicial, entry.data_final, entry.vehicle, pressu)
      .subscribe( resp => {
        console.log(resp);
      });
    }
    this.detallsaborrar = [];
  }

  // guardaPressupost( vpressupost: Pressupost ) {

  //   this.actualitzarBookings(vpressupost);
  //   this._pressupostService.guardaPressupost (vpressupost)
  //           .subscribe( pressupost => {
  //             console.log(pressupost);
  //             const idpressupost = pressupost._id;
  //             vpressupost._id = idpressupost;
  //             // this._pressupostService.esborraPressupostosDetallDePressupost(idpressupost)
  //               // .subscribe( pressupostos_detall => {
  //                 // console.log( pressupostos_detall);
  //                 for (const entry of this.pressupost.detall) {
  //                   entry.id_pressupost = idpressupost;
  //                   this._pressupostService.guardaPressupostDetall(entry)
  //                     .subscribe( pressupost_detall => {
  //                       console.log(pressupost_detall);
  //                       this._reservaService.guardarReserva(pressupost_detall)
  //                         .subscribe( reserva => {
  //                           console.log(reserva);
  //                           this._reservaService.reservadatesBooking(pressupost_detall.data_inicial,
  //                             pressupost_detall.data_final, pressupost_detall.vehicle, vpressupost)
  //                             .subscribe( resp => {
  //                               console.log(resp);
  //                             });
  //                         });

  //                     });
  //               }
  //               this.router.navigate(['/pressupostos']);
  //                 // this.router.navigate(['/vehicle', vehicle._id ]);
  //           });
  // }

  guardaPressupost( vpressupost: Pressupost ) {

    this.actualitzarBookings(vpressupost);
    this._pressupostService.guardaPressupost (vpressupost)
            .subscribe( pressupost => {
              console.log(pressupost);
              const idpressupost = pressupost._id;
              vpressupost._id = idpressupost;
              this._pressupostService.esborraPressupostosDetallDePressupost(idpressupost)
                .subscribe( pressupostos_detall => {
                  console.log( pressupostos_detall);
                  for (const entry of this.pressupost.detall) {
                    entry.id_pressupost = idpressupost;
                    this._pressupostService.guardaPressupostDetall(entry)
                      .subscribe( pressupost_detall => {
                        console.log(pressupost_detall);
                        this._reservaService.guardarReserva(pressupost_detall)
                          .subscribe( reserva => {
                            console.log(reserva);
                            this._reservaService.reservadatesBooking(pressupost_detall.data_inicial,
                              pressupost_detall.data_final, pressupost_detall.vehicle, vpressupost)
                              .subscribe( resp => {
                                console.log(resp);
                              });
                          });

                      });
                }
                this.router.navigate(['/pressupostos']);
                  // this.router.navigate(['/vehicle', vehicle._id ]);
                });
            });
  }

  canviPreu( article: PressupostDetall) {
    if (article.temporada) {
      this._vehiclesService.obtenirPreuTemporada(article.temporada, article.vehicle)
      .subscribe( (resp: any) => {
        article.preu = article.dies * resp;
      });
    }
  }


  guardaDetall( article: PressupostDetall) {

    // let date_1 = moment(article.data_inicial);
    // let date_2 = moment(article.data_final);
    console.log(article);
    if (article.dies > 0) {

      this._reservaService.comprovaReservaDates(article.data_inicial,
        article.data_final, article.vehicle)
        .subscribe( resp => {
          console.log(resp);

          if (resp.total > 0) {
            Swal.fire(
              'Reserva no disponible',
              'You clicked the button!',
              'success'
            );
            // for (const item of resp.bookings) {
            //   this.alerts.push({
            //     id: 1,
            //     type: 'danger',
            //     message: 'Aquest vehicle està reservat en data ' + item.data + ' inclòs al pressupost:' + item.pressupost
            //   });
            // }

            this.article = new PressupostDetall('', '', '', '', '', 0, '', 0, '');
            this.nodisponibles = [];
          } else {

            Swal.fire(
              'Reserva disponible',
              'You clicked the button!',
              'success'
            );
            this._vehiclesService.obtenirPreuTemporada(article.temporada, article.vehicle)
            .subscribe( (resp2: any) => {
              article.preu = article.dies * resp2;
              this.pressupost.detall.push(article);
              this.recalcularPreuPRessupost();
              this.article = new PressupostDetall('', '', '', '', '', 0, '', 0, '');
              this.nodisponibles = [];
              console.log(article);
              console.log(this.pressupost);
            });
            // this._reservaService.guardarReserva(article)
            // .subscribe( (resposta ) => {
            //   console.log(resposta);
            // });
            // this.article = new PressupostDetall('', '', '', '', '', 0, '', 0, '');
            // this.nodisponibles = [];
          }

        });

      // for (let _i = date_1; _i <= date_2; _i.add(1, 'days')) {

      //   console.log(_i.format('YYYY-MM-DD'));
      //   this._reservaS  ervice.comprovaReservaData(_i.format('YYYY-MM-DD'), article.vehicle)
      //   .subscribe (resp => {
      //     console.log(resp);
      //     if (resp.total > 0) {
      //       this.nodisponibles.push(resp.reserva);
      //     }
      //   });
      // }
      //  this.recorrerArrayDates(article)
      //    .then(function() {
      //           console.log(article);
      //  });



      // console.log('array no disponibles:' + this.nodisponibles);





    }

    }
  recalcularPreuPRessupost() {
    let vpreu = 0;

    for (const entry of this.pressupost.detall) {
      vpreu = vpreu + entry.preu;
    }
    console.log(vpreu);

    this.pressupost.preu_brut = vpreu;
    this.pressupost.preu_net = vpreu - (vpreu * 0.1);

  }


  borrarDetall( index: number) {
    // this._reservaService.borrarReserva(pressupost.detall.id);
    console.log(this.pressupost.detall[index]);
    console.log(this.detallsaborrar);
    this.detallsaborrar.push(this.pressupost.detall[index]);
    this.pressupost.detall.splice(index, 1);
    this.recalcularPreuPRessupost();
  }

  cambiaEstat( vpressupost: Pressupost, estatnou: string ) {

    vpressupost.estat = estatnou;

    this._pressupostService.guardaPressupost (vpressupost)
            .subscribe( pressupost => {
              console.log(pressupost);
  });

  }

  anulaPressupost( vpressupost: Pressupost) {
    Swal.fire({
      title: 'Estàs segur danular aquest pressupost?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        vpressupost.estat = 'anulat';

    this._pressupostService.guardaPressupost (vpressupost)
            .subscribe( pressupost => {
              console.log(pressupost);
              // this.toastr.warning('Pressupost anulat');
              this._reservaService.anular(vpressupost._id)
                .subscribe( reserva => {
                  console.log(reserva);
                  this._reservaService.lliuradatesBookingPerPressupos(vpressupost._id)
                    .subscribe( reserva2 => {
                      console.log(reserva2);
                    } );
                });
  });

      }
    });

  }

  confirmarPressupost( vpressupost: Pressupost) {
    Swal.fire({
      title: 'Estàs segur de confirmar aquest pressupost?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        vpressupost.estat = 'confirmat';

    this._pressupostService.guardaPressupost (vpressupost)
            .subscribe( pressupost => {
              console.log(pressupost);
              // this.toastr.info('Pressupost confirmat');
              this._reservaService.confirmar(vpressupost._id)
                .subscribe( reserva => {
                  console.log(reserva);
                });
  });

      }
    });

  }

  facturarPressupost( vpressupost: Pressupost) {
    Swal.fire({
      title: 'Estàs segur de facturar aquest pressupost?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        vpressupost.estat = 'facturat';

    this._pressupostService.guardaPressupost (vpressupost)
            .subscribe( pressupost => {
              console.log(pressupost);
              // this.toastr.success('Pressupost facturat');
              this._reservaService.facturar(vpressupost._id)
                .subscribe( reserva => {
                  console.log(reserva);
                  this.detallfactura = new FacturaDetall(vpressupost.detall['vehicle'], vpressupost.detall['temporada'],
                        vpressupost.detall['temporada'], vpressupost.detall['temporada'], vpressupost.detall['temporada'],
                              vpressupost.detall['temporada'], vpressupost.detall['temporada']);
                  this._facturaService.obtenirultimnum(2019)
                    .subscribe( numeracio => {
                      console.log(numeracio);
                      this._facturaService.crearFactura(vpressupost, vpressupost.detall, numeracio[0].num_correlatiu)
                    .subscribe( factura => {
                      console.log(factura);
                    });

                    });

                });
  });

      }
    });

  }

  cancelaOrdre() {
    this.detallsaborrar = [];
    this.router.navigate(['/pressupostos']);

  }

  calculaTemporada(vdatainici: Date) {


  }

 recorrerArrayDates( vArticle: PressupostDetall) {

    const vreserves: Reserva[] = [];


    const date_1 = moment(vArticle.data_inicial);
    const date_2 = moment(vArticle.data_final);

    console.log(date_1);
    console.log(date_2);

    const promise = new Promise(function (resolve, reject) {
      for (const _i = date_1; _i <= date_2; _i.add(1, 'days')) {

        console.log(_i.format('YYYY-MM-DD'));

        this._reservaService.comprovaReservaData(_i.format('YYYY-MM-DD'), vArticle.vehicle)
          .subscribe( reserves => {
            console.log(reserves);
            if (reserves.length > 0) {
              vreserves.push(reserves);
              this.disponibles = false;
            }
          });

       }
        const salida = {
          reserves: vreserves,
          disponibles: this.disponibles
        };
        resolve(salida);
      //  observer.next(salida);
      // observer.complete();
      //  observer.next(salida);
      //  observer.complete();

      return promise;

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
