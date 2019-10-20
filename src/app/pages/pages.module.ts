import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

// import { PAGES_ROUTES } from './pages.routes';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarHeaderComponent } from './calendari/calendari-header.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import localEs from '@angular/common/locales/es';

registerLocaleData(localEs);


// Calendari
import './../../../node_modules/flatpickr/dist/flatpickr.css';
import { FlatpickrModule } from 'angularx-flatpickr';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
// import { NbLayoutModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './dashboard/dashboard.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import {NgxPaginationModule} from 'ngx-pagination';

// import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
// import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
// import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
// import { ProfileComponent } from './profile/profile.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';
import { CalendariComponent } from './calendari/calendari.component';
import { Calendari2Component } from './calendari/calendari2.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
// import { HospitalesComponent } from './hospitales/hospitales.component';
// import { MedicosComponent } from './medicos/medicos.component';
// import { MedicoComponent } from './medicos/medico.component';
// import { BusquedaComponent } from './busqueda/busqueda.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ClientComponent } from './clients/client.component';
import { VehicleComponent } from './vehicles/vehicle.component';
import { PersonesComponent } from './persones/persones.component';
import { PersonaComponent } from './persones/persona.component';
import { PressupostosComponent } from './pressupostos/pressupostos.component';
import { PressupostComponent } from './pressupostos/pressupost.component';
import { FacturacioComponent } from './facturacio/facturacio.component';
import { FacturaComponent } from './facturacio/factura.component';

import { ReservesComponent } from './reserves/reserves.component';
import { Caravana2Component } from './vehicles/caravana2.component';
import { VerificaTokenGuard, AdminGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Toast, ToastPackage, ToastrIconClasses, ToastrService } from 'ngx-toastr';
// import { ToastrModule } from 'ngx-toastr';
import { NotificacionsComponent } from './notificacions/notificacions.component';
import { DespesesComponent } from './despeses/despeses.component';
import { DespesaComponent } from './despeses/despesa.component';
import { Select2Module } from 'ng2-select2';
import { NotificacioComponent } from './notificacions/notificacio.component';
import { PagamentsComponent } from './pagaments/pagaments.component';
import { PagamentComponent } from './pagaments/pagament.component';

import { ProfileComponent} from './profile/profile.component';
import {NgxPrintModule} from 'ngx-print';

const routes: Routes = [
    {
    path: '',
    children: [
      {
      path: 'dashboard',
      canActivate: [ VerificaTokenGuard ],
      data: {
        title: 'Starter Page',
        urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Starter Page' }]
      },
      component: DashboardComponent
    },
    {
        path: 'pressupostos',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PressupostosComponent
    },
    {
        path: 'pressupost/:id?/:idclient?',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupost', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PressupostComponent
    },
    {
        path: 'vehicles',
        data: {
          title: 'Vehicles',
          urls: [{ title: 'Vehicles', url: '/dashboard' }, { title: 'Gestió de vehicles' }]
        },
        component: VehiclesComponent
    },
    {
        path: 'vehicle/:id',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: VehicleComponent
    },
    {
        path: 'persones',
        data: {
          title: '',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PersonesComponent
    },
    {
        path: 'persona/:dni?/:dnipers?',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: PersonaComponent
    },
    {
        path: 'reserves',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: ReservesComponent
    },
    {
        path: 'factura/:id',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Factura', url: '/factura' }, { title: 'Gestió de Factura' }]
        },
        component: FacturaComponent
    },
    {
        path: 'facturacio',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Pressupostos', url: '/dashboard' }, { title: 'Gestió de pressupostos' }]
        },
        component: FacturacioComponent
    },
    {
        path: 'calendari',
        data: {
          title: 'Starter Page',
          urls: [{ title: 'Calendari', url: '/calendari' }, { title: 'Gestió de calendari' }]
        },
        component: Calendari2Component
    },
    {
        path: 'notificacions',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Notificacions', url: '/notificacions' }, { title: 'Gestió de notificacons' }]
        },
        component: NotificacionsComponent
    },
    {
        path: 'notificacio',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Notificacio', url: '/notificacio' }, { title: 'Gestió de notificació' }]
        },
        component: NotificacioComponent
    },
    {
        path: 'despeses',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Despeses', url: '/despeses' }, { title: 'Gestió de despeses' }]
        },
        component: DespesesComponent
    },
    {
        path: 'despesa/:id',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Despesa', url: '/despesa' }, { title: 'Gestió de despesa' }]
        },
        component: DespesaComponent
    },
    {
        path: 'pagaments',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Pagaments', url: '/pagaments' }, { title: 'Gestió de Pagaments' }]
        },
        component: PagamentsComponent
    },
    {
        path: 'pagament/:id',
        data: {
          title: 'Taicar - Admin',
          urls: [{ title: 'Pagament', url: '/pagament' }, { title: 'Gestió de Pagaments' }]
        },
        component: PagamentComponent
    }
    ]
    }
  ];


@NgModule({
    declarations: [
        // CommonModule,
        DashboardComponent,
        PressupostosComponent,
        UsuariosComponent,
        CalendariComponent,
        Calendari2Component,
        CalendarHeaderComponent,
        // PagesComponent,
        // DashboardComponent,
        // ProgressComponent,
        // Graficas1Component,
        // IncrementadorComponent,
        // GraficoDonaComponent,
        // AccoutSettingsComponent,
        // PromesasComponent,
        // RxjsComponent,
        // ProfileComponent,
        // UsuariosComponent,
        // // ModalUploadComponent,
        // HospitalesComponent,
        // MedicosComponent,
        // MedicoComponent,
        // BusquedaComponent,
        VehiclesComponent,
        Caravana2Component,
        ClientComponent,
        VehicleComponent,
        PersonesComponent,
        PersonaComponent,
        PressupostosComponent,
        PressupostComponent,
        ReservesComponent,
        FacturacioComponent,
        FacturaComponent,
        NotificacionsComponent,
        DespesesComponent,
        DespesaComponent,
        NotificacioComponent,
        PagamentsComponent,
        PagamentComponent,
        ProfileComponent
    ],
    exports: [
        Calendari2Component,
        CalendarHeaderComponent
        // DashboardComponent,
        // ProgressComponent,
        // Graficas1Component
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        Select2Module,
        Ng2SmartTableModule,
        // ToastrModule.forRoot(),
        FlatpickrModule.forRoot(),
        ChartsModule,
        PipesModule,
        NgxPaginationModule,
        NgxPrintModule,
        NgbModalModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        }),
        RouterModule.forChild(routes)
    ]
})
export class PagesModule { }
