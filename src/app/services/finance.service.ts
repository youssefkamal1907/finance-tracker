import { Injectable, signal, computed } from '@angular/core';
import { Transaction, Subscription, TransactionType } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class FinanceService {

  readonly catIcons: Record<string, string> = {
    Food: '🛒', Rent: '🏠', Transport: '🚗',
    Entertainment: '🎬', Subscription: '🎵', Income: '💰', Other: '📦'
  };

  readonly catBg: Record<string, string> = {
    Food: '#1a2e1a', Rent: '#1a1f2e', Transport: '#2e1a1a',
    Entertainment: '#1a1a2e', Subscription: '#2e1e0d', Income: '#0d2318', Other: '#1a1a1a'
  };

  private nextId = 8;

  transactions = signal<Transaction[]>([
    { id: 1, name: 'Grocery Shopping',  category: 'Food',         type: 'expense',      amount: 124.50, date: 'Apr 21', icon: '🛒', iconBg: '#1a2e1a' },
    { id: 2, name: 'Monthly Rent',      category: 'Rent',         type: 'expense',      amount: 963.00, date: 'Apr 20', icon: '🏠', iconBg: '#1a1f2e' },
    { id: 3, name: 'Salary Deposit',    category: 'Income',       type: 'income',       amount: 5800.00,date: 'Apr 20', icon: '💰', iconBg: '#0d2318' },
    { id: 4, name: 'Uber Rides',        category: 'Transport',    type: 'expense',      amount: 48.20,  date: 'Apr 19', icon: '🚗', iconBg: '#2e1a1a' },
    { id: 5, name: 'Netflix',           category: 'Subscription', type: 'subscription', amount: 15.99,  date: 'Apr 18', icon: '🎬', iconBg: '#1a1a2e' },
    { id: 6, name: 'Restaurant Dinner', category: 'Food',         type: 'expense',      amount: 67.30,  date: 'Apr 17', icon: '🍕', iconBg: '#1a2a1a' },
    { id: 7, name: 'Spotify',           category: 'Subscription', type: 'subscription', amount: 9.99,   date: 'Apr 15', icon: '🎵', iconBg: '#2e1e0d' },
  ]);

  subscriptions = signal<Subscription[]>([
    { name: 'Netflix',     icon: '🎬', iconBg: '#1a1a2e', price: 15.99, renewDate: 'May 18' },
    { name: 'Spotify',     icon: '🎵', iconBg: '#2e1e0d', price: 9.99,  renewDate: 'May 15' },
    { name: 'iCloud 200GB',icon: '☁️', iconBg: '#0d1f2e', price: 2.99,  renewDate: 'May 1'  },
    { name: 'Adobe CC',    icon: '📊', iconBg: '#1a2e20', price: 54.99, renewDate: 'May 10' },
  ]);

  balance = signal(12450);

  totalSpent = computed(() =>
    this.transactions().filter(t => t.type !== 'income').reduce((s, t) => s + t.amount, 0)
  );

  totalIncome = computed(() =>
    this.transactions().filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  );

  recentTransactions = computed(() => [...this.transactions()].slice(0, 5));

  addTransaction(name: string, amount: number, type: TransactionType, category: string): void {
    const icon = this.catIcons[category] || '📦';
    const iconBg = this.catBg[category] || '#1a1a1a';
    const newTxn: Transaction = {
      id: this.nextId++, name, category, type, amount,
      date: 'Today', icon, iconBg
    };
    this.transactions.update(list => [newTxn, ...list]);
    const sign = type === 'income' ? 1 : -1;
    this.balance.update(b => b + sign * amount);
  }

  deleteTransaction(id: number): void {
    const txn = this.transactions().find(t => t.id === id);
    if (txn) {
      const sign = txn.type === 'income' ? -1 : 1;
      this.balance.update(b => b + sign * txn.amount);
      this.transactions.update(list => list.filter(t => t.id !== id));
    }
  }
}
