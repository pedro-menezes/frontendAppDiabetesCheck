import { AlertController, ModalController} from '@ionic/angular';
import { DataPacienteService, Paciente } from '../services/data-paciente.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLancamentoService, Dados} from '../services/data-lancamento.service';
import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento.page';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, LineController,
  PointElement, LineElement,
} from 'chart.js';

Chart.register( LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, LineController,
  PointElement, LineElement);

@Component({
  selector: 'app-visualizar-historico',
  templateUrl: './visualizar-historico.page.html',
  styleUrls: ['./visualizar-historico.page.scss'],
})
export class VisualizarHistoricoPage implements OnInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;
  pacientes: Paciente[] = [];
  lancamentos: Dados[] = [];

  constructor(
    private dataLancamentoService: DataLancamentoService,
    private alertController: AlertController,
    private dataPacienteService: DataPacienteService,  
    private cd: ChangeDetectorRef,
    private router: Router,
    private modalCtrl: ModalController
  ) { 
    this.dataPacienteService.getPacientes().subscribe(res => {
      this.pacientes = res;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.lineChartMethod();
  }

  ngOnInit() {
  }

  listarLancamentos(id){
    this.dataLancamentoService.getLancamentosByIdPaciente(id).subscribe(res => {
     this.lancamentos = res;
     this.cd.detectChanges();
   });
  }

  async openLancamento(lancamento: Dados) {
    const modal = await this.modalCtrl.create({
      component: ModalLancamentoPage,
      componentProps: { id: lancamento.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });
 
    await modal.present();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ["", "", "", "", ""],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
           // lineTension: 0.1,
            backgroundColor: 'rgba(56,113,28,1)',
            borderColor: 'rgba(56,113,28,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(56,113,28,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(56,113,28,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [2.2, -1.09, -3.5, -0.01, 0.000988],
            spanGaps: false,
          },
          {
            label: 'Sell per week',
            fill: false,
           // lineTension: 0.1,
            backgroundColor: 'rgba(8,82,138,1)',
            borderColor: 'rgba(8,82,138,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(8,82,138,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(8,82,138,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [-1.1, -2.09, 1.99999, 2.4, 1.0007766],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
