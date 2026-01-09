import {
  ProviderTransaction,
  InternalLedgerEntry,
  ReconciliationResult,
  ReconciliationMismatch,
} from "../types";

interface ReconciliationOptions {
  amountTolerance: number; // e.g., 0.01 for 1 cent tolerance
  currencyMatchRequired: boolean;
}

export function reconcileTransactions(
  providerTransactions: ProviderTransaction[],
  ledgerEntries: InternalLedgerEntry[],
  options: ReconciliationOptions = { amountTolerance: 0.01, currencyMatchRequired: true }
): ReconciliationResult {
  const matches: Array<{ provider: ProviderTransaction; ledger: InternalLedgerEntry }> = [];
  const mismatches: ReconciliationMismatch[] = [];
  const usedLedgerIds = new Set<string>();

  // Try to match each provider transaction
  for (const provider of providerTransactions) {
    let matched = false;

    for (const ledger of ledgerEntries) {
      if (usedLedgerIds.has(ledger.transactionId)) continue;

      // Match by transaction ID (exact match)
      if (provider.id === ledger.transactionId) {
        // Check amount tolerance
        const amountDiff = Math.abs(provider.amount - ledger.amount);
        const amountMatches = amountDiff <= options.amountTolerance;

        // Check currency
        const currencyMatches = !options.currencyMatchRequired || provider.currency === ledger.currency;

        if (amountMatches && currencyMatches) {
          matches.push({ provider, ledger });
          usedLedgerIds.add(ledger.transactionId);
          matched = true;
          break;
        } else {
          // ID matches but amount/currency doesn't
          if (!amountMatches) {
            mismatches.push({
              type: "amount_mismatch",
              providerTransaction: provider,
              ledgerEntry: ledger,
              details: `Amount mismatch: provider ${provider.amount} vs ledger ${ledger.amount} (diff: ${amountDiff.toFixed(2)})`,
            });
          } else if (!currencyMatches) {
            mismatches.push({
              type: "currency_mismatch",
              providerTransaction: provider,
              ledgerEntry: ledger,
              details: `Currency mismatch: provider ${provider.currency} vs ledger ${ledger.currency}`,
            });
          }
          usedLedgerIds.add(ledger.transactionId);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      mismatches.push({
        type: "missing_in_ledger",
        providerTransaction: provider,
        details: `Transaction ${provider.id} not found in ledger`,
      });
    }
  }

  // Find extra entries in ledger (not in provider)
  for (const ledger of ledgerEntries) {
    if (!usedLedgerIds.has(ledger.transactionId)) {
      const foundInProvider = providerTransactions.some((p) => p.id === ledger.transactionId);
      if (!foundInProvider) {
        mismatches.push({
          type: "extra_in_ledger",
          ledgerEntry: ledger,
          details: `Transaction ${ledger.transactionId} found in ledger but not in provider data`,
        });
      }
    }
  }

  // Calculate summary
  const summary = {
    totalProvider: providerTransactions.length,
    totalLedger: ledgerEntries.length,
    matched: matches.length,
    missingInLedger: mismatches.filter((m) => m.type === "missing_in_ledger").length,
    extraInLedger: mismatches.filter((m) => m.type === "extra_in_ledger").length,
    amountMismatches: mismatches.filter((m) => m.type === "amount_mismatch").length,
    currencyMismatches: mismatches.filter((m) => m.type === "currency_mismatch").length,
  };

  return {
    matches,
    mismatches,
    summary,
  };
}

