import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { AddTransactionModalComponent } from './components/add-transaction-modal/add-transaction-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    SummaryCardsComponent,
    DonutChartComponent,
    ExpenseListComponent,
    RightPanelComponent,
    AddTransactionModalComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  modalOpen = signal(false);
}
