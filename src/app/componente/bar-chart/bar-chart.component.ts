// bar-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { UsuarioService } from '../../service/usuario.service';
import { UserChart } from '../../model/UserChart';
import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService:UsuarioService){ }

  userChart = new UserChart();

  ngOnInit(): void {

    this.usuarioService.carregarGrafico().subscribe(data => {

      this.userChart = data;

      this.barChartLabels = this.userChart.nome.split(',');

      var arraySalario = JSON.parse('['+ this.userChart.salario + ']');

      this.barChartData = [
        { data: arraySalario, label: 'Salário' },
      ];

    })
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];

  barChartType: ChartType = 'bar';

  barChartLegend = true;

  barChartPlugins = [];

  barChartData: ChartDataset[] = [
    { data: [], label: 'Salário' },
  ];
}
