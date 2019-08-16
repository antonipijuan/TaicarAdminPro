import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../component/modal-upload/modal-upload.service';
import { DespesaService } from './despesa/despesa.service';



import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  VehicleService,
  PersonaService,
  PressupostService,
  ReservaService,
  NotificacionsService,
  FacturaService,
  PagamentService,
  VerificaTokenGuard
 } from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    PersonaService,
    VehicleService,
    PressupostService,
    ReservaService,
    NotificacionsService,
    FacturaService,
    DespesaService,
    PagamentService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
