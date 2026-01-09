export type TransactionStatus = "pending" | "completed" | "failed" | "reversed";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  status: TransactionStatus;
  createdAt: Date;
  rails: string; // payment rails: "stripe", "ach", "wire", etc.
}

export interface ProviderTransaction {
  id: string;
  amount: number;
  currency: string;
  timestamp: Date;
  reference: string;
}

export interface InternalLedgerEntry {
  transactionId: string;
  amount: number;
  currency: string;
  recordedAt: Date;
  accountId: string;
}

export type ReconciliationMismatchType = 
  | "missing_in_ledger" 
  | "extra_in_ledger" 
  | "amount_mismatch" 
  | "currency_mismatch";

export interface ReconciliationMismatch {
  type: ReconciliationMismatchType;
  providerTransaction?: ProviderTransaction;
  ledgerEntry?: InternalLedgerEntry;
  details: string;
}

export interface ReconciliationResult {
  matches: Array<{
    provider: ProviderTransaction;
    ledger: InternalLedgerEntry;
  }>;
  mismatches: ReconciliationMismatch[];
  summary: {
    totalProvider: number;
    totalLedger: number;
    matched: number;
    missingInLedger: number;
    extraInLedger: number;
    amountMismatches: number;
    currencyMismatches: number;
  };
}

