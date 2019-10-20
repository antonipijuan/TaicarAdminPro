import { Component, AfterViewInit, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { NgbPanelChangeEvent, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NotificacionsService } from '../../services/service.index';
import * as moment from 'moment';
import { Pressupost } from '../../models/pressupost.model';
declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  pressupostosambvigencia: Pressupost[] = [];
  pressupostosCaducats: Pressupost[] = [];

  public config: PerfectScrollbarConfigInterface = {};
  public carregant = false;

  constructor(
    private modalService: NgbModal,
    public _notificacionsService: NotificacionsService
    ) {
        this.carregant = true;
        this.carregarPressupostosSegonsDataVigencia();
        this.carregarPressupostosCaducats();
        this.carregant = false;
    }

  public showSearch = false;

  // This is for Notifications
  notifications: Object[] = [
    // {
    //   round: 'round-danger',
    //   icon: 'ti-link',
    //   title: 'Luanch Admin',
    //   subject: 'Just see the my new admin!',
    //   time: '9:30 AM'
    // },
    // {
    //   round: 'round-success',
    //   icon: 'ti-calendar',
    //   title: 'Event today',
    //   subject: 'Just a reminder that you have event',
    //   time: '9:10 AM'
    // },
    // {
    //   round: 'round-info',
    //   icon: 'ti-settings',
    //   title: 'Settings',
    //   subject: 'You can customize this template as you want',
    //   time: '9:08 AM'
    // },
    // {
    //   round: 'round-primary',
    //   icon: 'ti-user',
    //   title: 'Pavan kumar',
    //   subject: 'Just see the my admin!',
    //   time: '9:00 AM'
    // }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  ngAfterViewInit() {}

  carregarPressupostosSegonsDataVigencia() {
    this._notificacionsService.carregarpressupostos_datavigencia(moment().add(3, 'days').format('YYYY-MM-DD'))
      .subscribe( resp => {
        this.pressupostosambvigencia = resp;
        console.log(this.pressupostosambvigencia);
        for (const entry of this.pressupostosambvigencia) {
          const notificacio: Object = {

            image: 'assets/images/users/5.jpg',
            name: 'Pressupost a punt de caducar',
            comment: 'Pressupost:' + entry._id + '/ Vigència:' + entry.data_vigencia,
            status: 'Pending',
            date: 'April 14, 2016',
            labelcolor: 'label-light-info',
            pressupost: entry._id
          };
          this.notifications.push(notificacio);
        }
        console.log(this.notifications);
      });
}
carregarPressupostosCaducats() {
  this._notificacionsService.carregarPressupostosCaducats()
    .subscribe( resp2 => {
      console.log(resp2);
      this.pressupostosCaducats = resp2;
      console.log(this.pressupostosCaducats);
      for (const entry of this.pressupostosCaducats) {
        const notificacio2: Object = {

          image: 'assets/images/users/5.jpg',
          name: 'Pressupost caducat',
          comment: 'Pressupost:' + entry._id + '/ Vigència:' + entry.data_vigencia,
          status: 'Pending',
          date: 'April 14, 2016',
          labelcolor: 'label-light-danger',
          pressupost: entry._id
        };
        this.notifications.push(notificacio2);
      }
      console.log(this.notifications);
    });
}
}
