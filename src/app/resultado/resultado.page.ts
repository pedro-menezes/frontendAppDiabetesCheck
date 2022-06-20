import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, LineController,
  PointElement, LineElement,
} from 'chart.js';

Chart.register( LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, LineController,
  PointElement, LineElement);

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements AfterViewInit, OnInit  {
  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable 
  // that we have added to the canvas element in the HTML template.
  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;
  resultadoIntervencao: number;
  resultadoComparativo: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(resultado=>{
        this.resultadoIntervencao = resultado.rInt;
        this.resultadoComparativo = resultado.rComp;
      });
  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    this.barChartMethod();
  }

  barChartMethod() {
    // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Intervention', 'Comparative'],
        datasets: [{
          label: '# of Votes',
          data: [this.resultadoIntervencao, this.resultadoComparativo],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true
          }
        }
      }
    });
  }
}