import { Transaction, ProviderTransaction, InternalLedgerEntry } from "../types";

const merchants = [
  "Target",
  "Best Buy",
  "Walmart",
  "Costco",
  "Home Depot",
  "Lowe's",
  "Amazon",
  "Walgreens",
  "CVS",
  "Kroger",
  "Starbucks"
];

const rails = ["stripe", "ach", "wire", "card", "paypal"];

const currencies = ["USD"];

const statuses: Array<Transaction["status"]> = ["pending", "completed", "failed", "reversed"];

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateMockTransactions(count: number = 50): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    transactions.push({
      id: `txn_${Math.random().toString(36).slice(2, 11)}`,
      amount: Math.round((Math.random() * 10000 + 10) * 100) / 100,
      currency: randomElement(currencies),
      merchant: randomElement(merchants),
      status: randomElement(statuses),
      createdAt: randomDate(thirtyDaysAgo, now),
      rails: randomElement(rails),
    });
  }

  return transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function generateProviderTransactions(count: number = 30): ProviderTransaction[] {
  const transactions: ProviderTransaction[] = [];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    transactions.push({
      id: `provider_${Math.random().toString(36).slice(2, 11)}`,
      amount: Math.round((Math.random() * 10000 + 10) * 100) / 100,
      currency: randomElement(currencies),
      timestamp: randomDate(sevenDaysAgo, now),
      reference: `ref_${Math.random().toString(36).slice(2, 11)}`,
    });
  }

  return transactions;
}

export function generateInternalLedger(count: number = 30): InternalLedgerEntry[] {
  const entries: InternalLedgerEntry[] = [];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    entries.push({
      transactionId: `txn_${Math.random().toString(36).slice(2, 11)}`,
      amount: Math.round((Math.random() * 10000 + 10) * 100) / 100,
      currency: randomElement(currencies),
      recordedAt: randomDate(sevenDaysAgo, now),
      accountId: `acc_${Math.random().toString(36).slice(2, 11)}`,
    });
  }

  return entries;
}

