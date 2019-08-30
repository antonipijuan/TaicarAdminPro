import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/service.index';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';

import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
    DAYS_OF_WEEK
} from 'angular-calendar';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,

} from 'angular-calendar';
import { ReservaService } from '../../services/reserva/reserva.service';
import { Reserva } from '../../models/reserva.model';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
import { CustomDateFormatter } from './custom-date.formatter.provider';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mwl-demo-component',
  templateUrl: 'calendari2.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class Calendari2Component implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  reserves: Reserva[] = [];
  vehicles: Vehicle[] = [];
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  locale = 'es';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;

  cargando = false;


  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    /* {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    } */
  ];

  carregarEvents() {
    this._reservaService.carregarReserves()
      .subscribe( resp => {
        this.reserves = resp;
        console.log(resp);
        console.log(this.reserves);
        for (const entry of this.reserves) {
          this.events.push({
            title: 'Reserva:' + entry._id + ' / ' + 'Vehicle:' + entry.vehicle['matricula'] + ' / '
                  + 'Client:' + entry.pressupost['client'],
            start: startOfDay(entry.data_inicial),
            end: endOfDay(entry.data_final),
            color: this.obtenirColor(entry.vehicle['color']),
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            }
          });
          this.refresh.next();
        }
      });
  }

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
    public _reservaService: ReservaService,
    public _vehicleService: VehicleService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  cargarVehicles() {
    this._vehicleService.cargarVehicles()
        .subscribe( vehicles => {
          this.vehicles = vehicles;
          this.cargando = false;
        });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  obtenirColor(color: string) {

    switch (color) {
      case 'red':
          return colors.red;

      case 'blue':
      return  colors.blue;

      case 'yellow':
        return colors.yellow;

      }

  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();

  }

  close(): void {

  }

  ngOnInit() {
    this.cargando = true;
    this.carregarEvents();
    this.cargarVehicles();

  }
}


  