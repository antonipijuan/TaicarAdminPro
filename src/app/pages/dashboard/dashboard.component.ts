import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng2-select2';
import { DespesaService } from '../../services/service.index';
import { Despesa } from 'src/app/models/despesa.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  despesesGener: Despesa[] = [];
  despesesFebrer: Despesa[] = [];
  despesesMarç: Despesa[] = [];
  despesesAbril: Despesa[] = [];
  despesesMaig: Despesa[] = [];
  despesesJuny: Despesa[] = [];
  despesesJuliol: Despesa[] = [];
  despesesAgost: Despesa[] = [];
  despesesSetembre: Despesa[] = [];
  despesesOctubre: Despesa[] = [];
  despesesNovembre: Despesa[] = [];
  despesesDesembre: Despesa[] = [];





  constructor(
    public _serviceDespeses: DespesaService
  ) { }

  public lineChartData: Array<any> = [
    { data: [0, 50, 30, 60, 180, 120, 180, 80], label: 'Vehiculo 1 ' },
    { data: [0, 100, 70, 100, 240, 180, 220, 140], label: 'Vehiculo 2 ' },
    { data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Vehiculo 3 ' },
    { data: [0, 150, 110, 240, 200, 200, 300, 200], label: 'Vehiculo 4 ' }
  ];

  public lineChartLabels: Array<any> = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Aug', 'Set', 'Oct', 'Nov', 'Des'];
  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors: Array<any> = [
    {
      // dark grey
      backgroundColor: 'rgba(234,237,242,1)',
      borderColor: 'rgba(234,237,242,1)',
      pointBackgroundColor: 'rgba(234,237,242,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(234,237,242,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(76,139,236,1)',
      borderColor: 'rgba(76,139,236,1)',
      pointBackgroundColor: 'rgba(76,139,236,1)',
      pointBorderColor: '#fff',

      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(76,139,236,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(117,91,241,1)',
      borderColor: 'rgba(117,91,241,1)',
      pointBackgroundColor: 'rgba(117,91,241,1)',
      pointBorderColor: '#fff',

      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(117,91,241,1)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // Doughnut
  public doughnutChartLabels: string[] = ['Tablet', 'Desktop', 'Mobile', 'Other'];
  public doughnutChartOptions: any = {
    borderWidth: 2,
    maintainAspectRatio: false
  };
  public doughnutChartData: number[] = [150, 450, 200, 20];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = false;

  ngOnInit() {
    this._serviceDespeses.mostrarDespesesMes('gener', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesGener = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('febrer', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesFebrer = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('març', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesMarç = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('abril', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesAbril = despeses;
              });
      this._serviceDespeses.mostrarDespesesMes('maig', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesMaig = despeses;


      });
      this._serviceDespeses.mostrarDespesesMes('juny', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesJuny = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('juliol', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesJuliol = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('agost', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesAgost = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('setembre', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesSetembre = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('octubre', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesOctubre = despeses;

      });
      this._serviceDespeses.mostrarDespesesMes('novembre', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesNovembre = despeses;

      }); this._serviceDespeses.mostrarDespesesMes('desembre', '5c02012f36b65a03e46b46c8')
      .subscribe( despeses => {
        console.log(despeses);
        this.despesesDesembre = despeses;

      });

      console.log(this.despesesAbril);
      console.log(this.despesesDesembre);
  }

}
