import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceService } from '../../services/finance.service';
import { TransactionType } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction-modal.component.html',
})
export class AddTransactionModalComponent {
  isOpen = input(false);
  close = output<void>();
  finance = inject(FinanceService);

  name = '';
  amount: number | null = null;
  type: TransactionType = 'expense';
  category = 'Food';

  categories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Subscription', 'Income', 'Other'];

  submit(): void {
    if (!this.name.trim() || !this.amount || isNaN(this.amount)) return;
    this.finance.addTransaction(this.name.trim(), this.amount, this.type, this.category);
    this.reset();
    this.close.emit();
  }

  reset(): void {
    this.name = '';
    this.amount = null;
    this.type = 'expense';
    this.category = 'Food';
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }
}
