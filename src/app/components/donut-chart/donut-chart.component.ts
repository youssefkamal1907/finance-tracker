import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const Chart: any;

interface CategoryData { label: string; color: string; pct: number; amount: number; }

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut-chart.component.html',
})
export class DonutChartComponent implements AfterViewInit {
  @ViewChild('donutCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  categories: CategoryData[] = [
    { label: 'Food',          color: '#4af4a0', pct: 35, amount: 1124 },
    { label: 'Rent',          color: '#60a5fa', pct: 30, amount: 963  },
    { label: 'Transport',     color: '#f59e0b', pct: 15, amount: 482  },
    { label: 'Entertainment', color: '#a78bfa', pct: 12, amount: 385  },
    { label: 'Other',         color: '#6b7280', pct: 8,  amount: 257  },
  ];

  ngAfterViewInit(): void {
    new Chart(this.canvasRef.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: this.categories.map(c => c.label),
        datasets: [{
          data: this.categories.map(c => c.pct),
          backgroundColor: this.categories.map(c => c.color),
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c: any) => c.label + ': ' + c.parsed + '%' } }
        },
        animation: { duration: 800 }
      }
    });
  }
}
