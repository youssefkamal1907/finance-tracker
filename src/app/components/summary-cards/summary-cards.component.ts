import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-cards">
      <div class="scard">
        <div class="scard-label">Total Spent</div>
        <div class="scard-val red">{{ finance.totalSpent() | currency:'USD':'symbol':'1.0-0' }}</div>
        <div class="scard-change">vs $2,980 last month</div>
      </div>
      <div class="scard">
        <div class="scard-label">Income</div>
        <div class="scard-val green">{{ finance.totalIncome() | currency:'USD':'symbol':'1.0-0' }}</div>
        <div class="scard-change">+12% vs last month</div>
      </div>
      <div class="scard">
        <div class="scard-label">Subscriptions</div>
        <div class="scard-val blue">$127/mo</div>
        <div class="scard-change">4 active plans</div>
      </div>
    </div>
  `
})
export class SummaryCardsComponent {
  finance = inject(FinanceService);
}
