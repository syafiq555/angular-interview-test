import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { DashboardData, DashboardService } from '../services/dashboard.service';

Chart.register(...registerables)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  chartDonut: DashboardData['chartDonut'];
  chartBar: DashboardData['chartBar'];
  tableUsers: DashboardData['tableUsers'];
  @ViewChild('donutChartContainer') donutChartContainer!: ElementRef;
  @ViewChild('barChartContainer') barChartContainer!: ElementRef;

  constructor(private dashboardService: DashboardService) {
    this.chartBar = [];
    this.chartDonut = [];
    this.tableUsers = [];
  }

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(
      (data: DashboardData) => {
        this.chartDonut = data.chartDonut;
        this.chartBar = data.chartBar;
        this.tableUsers = data.tableUsers;
        console.log(this.tableUsers)
        this.createDonutChart();
        this.createBarChart();
      },
      (error) => {
        // Handle error responses (e.g., display error message)
        console.error('Failed to fetch dashboard data:', error);
      }
    );
  }

  createDonutChart(): void {
    const canvas = this.donutChartContainer.nativeElement;
    const donutData = this.chartDonut;

    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: donutData.map((d: any) => d.name),
        datasets: [
          {
            label: 'bar',
            data: donutData.map((d: any) => d.value),
            backgroundColor: ['red', 'green', 'blue', 'yellow'], // Define colors for the chart slices
          },
        ],
      },
      options: {
        // Add options and customizations as needed
      },
    });
  }

  createBarChart(): void {
    const canvas = this.barChartContainer.nativeElement;
    const barData = this.chartBar;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: barData.map((d: any) => d.name),
        datasets: [
          {
            label: 'Bar chart',
            data: barData.map((d: any) => d.value),
            backgroundColor: ['red', 'green', 'blue', 'yellow', 'pink', 'black'], // Define colors for the chart slices
          },
        ],
      },
      options: {
        // Add options and customizations as needed
      },
    });
  }
}
