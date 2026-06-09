import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../services/finance.service';
import { TransactionType } from '../../models/transaction.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-list.component.html',
})
export class ExpenseListComponent {
  finance = inject(FinanceService);
  activeFilter = signal<string>('all');
  searchQuery = signal('');

  filteredTransactions = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const f = this.activeFilter();
    return this.finance.transactions().filter(t => {
      const matchesFilter = f === 'all' || t.type === f;
      const matchesSearch = t.name.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  });

  filters = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expenses', value: 'expense' },
    { label: 'Subscriptions', value: 'subscription' },
  ];

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }

  delete(id: number): void {
    this.finance.deleteTransaction(id);
  }
}
