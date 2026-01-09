"use client";

import { useState, useMemo } from "react";
import {
  ProviderTransaction,
  InternalLedgerEntry,
  ReconciliationResult,
  ReconciliationMismatch,
} from "../types";
import { generateProviderTransactions, generateInternalLedger } from "../utils/mockData";
import { reconcileTransactions } from "../utils/reconcile";

export default function ReconciliationExplorer() {
  const [providerTransactions] = useState<ProviderTransaction[]>(() => generateProviderTransactions(30));
  const [ledgerEntries] = useState<InternalLedgerEntry[]>(() => generateInternalLedger(30));
  const [amountTolerance, setAmountTolerance] = useState<string>("0.01");
  const [currencyMatchRequired, setCurrencyMatchRequired] = useState<boolean>(true);

  const reconciliationResult = useMemo<ReconciliationResult>(() => {
    const tolerance = parseFloat(amountTolerance) || 0.01;
    return reconcileTransactions(providerTransactions, ledgerEntries, {
      amountTolerance: tolerance,
      currencyMatchRequired,
    });
  }, [providerTransactions, ledgerEntries, amountTolerance, currencyMatchRequired]);

  const handleExport = () => {
    const data = {
      providerTransactions,
      ledgerEntries,
      reconciliation: reconciliationResult,
      options: {
        amountTolerance: parseFloat(amountTolerance) || 0.01,
        currencyMatchRequired,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reconciliation_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMismatchTypeColor = (type: ReconciliationMismatch["type"]) => {
    switch (type) {
      case "missing_in_ledger":
        return "bg-[var(--bg)] text-[var(--fg)] border-[var(--border)]";
      case "extra_in_ledger":
        return "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]";
      case "amount_mismatch":
        return "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]";
      case "currency_mismatch":
        return "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]";
    }
  };

  return (
    <div className="border border-[var(--border)] bg-white p-8 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
      <div className="mb-6">
        <h2 className="font-headline text-2xl font-semibold mb-2">Reconciliation Explorer</h2>
        <p className="text-sm text-[var(--muted)]">
          Compare provider transaction data with internal ledger entries. Identifies matches and mismatches using
          configurable tolerance rules.
        </p>
      </div>

      {/* Configuration */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6 p-4 border border-[var(--border)] bg-neutral-50">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Amount Tolerance</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amountTolerance}
            onChange={(e) => setAmountTolerance(e.target.value)}
            className="w-full border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-mono hover:border-[var(--fg)]/20 transition-colors"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currencyMatchRequired}
              onChange={(e) => setCurrencyMatchRequired(e.target.checked)}
              className="border-[var(--border)]"
            />
            <span className="text-sm text-[var(--muted)]">Require currency match</span>
          </label>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleExport}
            className="w-full border border-[var(--fg)] bg-[var(--fg)] text-white px-4 py-2 text-sm font-medium hover:-translate-y-1 hover:opacity-90 transition-all duration-200 ease-out font-mono"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="border border-[var(--border)] bg-white p-4 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
          <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Provider Transactions</div>
          <div className="text-2xl font-semibold font-mono">{reconciliationResult.summary.totalProvider}</div>
        </div>
        <div className="border border-[var(--border)] bg-white p-4 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
          <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Ledger Entries</div>
          <div className="text-2xl font-semibold font-mono">{reconciliationResult.summary.totalLedger}</div>
        </div>
        <div className="border border-[var(--border)] bg-[var(--bg)] p-4 border-[var(--accent)]/30">
          <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Matched</div>
          <div className="text-2xl font-semibold font-mono">{reconciliationResult.summary.matched}</div>
        </div>
        <div className="border border-[var(--border)] bg-white p-4 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
          <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Mismatches</div>
          <div className="text-2xl font-semibold font-mono">
            {reconciliationResult.mismatches.length}
          </div>
        </div>
      </div>

      {/* Mismatch breakdown */}
      {reconciliationResult.mismatches.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {reconciliationResult.summary.missingInLedger > 0 && (
            <div className="border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Missing in Ledger</div>
              <div className="text-lg font-semibold font-mono">
                {reconciliationResult.summary.missingInLedger}
              </div>
            </div>
          )}
          {reconciliationResult.summary.extraInLedger > 0 && (
            <div className="border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Extra in Ledger</div>
              <div className="text-lg font-semibold font-mono">
                {reconciliationResult.summary.extraInLedger}
              </div>
            </div>
          )}
          {reconciliationResult.summary.amountMismatches > 0 && (
            <div className="border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Amount Mismatches</div>
              <div className="text-lg font-semibold font-mono">
                {reconciliationResult.summary.amountMismatches}
              </div>
            </div>
          )}
          {reconciliationResult.summary.currencyMismatches > 0 && (
            <div className="border border-[var(--border)] bg-[var(--panel)] p-3">
              <div className="text-xs text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Currency Mismatches</div>
              <div className="text-lg font-semibold font-mono">
                {reconciliationResult.summary.currencyMismatches}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mismatches table */}
      {reconciliationResult.mismatches.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Mismatches</h3>
          <div className="space-y-3">
            {reconciliationResult.mismatches.map((mismatch, idx) => (
              <div
                key={idx}
                className="border border-[var(--border)] bg-white p-4 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span
                    className={`text-xs px-2 py-0.5 border font-mono uppercase tracking-wider ${getMismatchTypeColor(mismatch.type)}`}
                  >
                    {mismatch.type.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{mismatch.details}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mismatch.providerTransaction && (
                    <div className="border border-[var(--border)] bg-white p-3 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
                      <div className="text-xs font-medium text-[var(--muted)] mb-2 font-mono uppercase tracking-wider">Provider Transaction</div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-[var(--muted)] font-mono uppercase text-xs">ID:</span>{" "}
                          <span className="font-mono text-xs">{mismatch.providerTransaction.id}</span>
                        </div>
                        <div>
                          <span className="text-[var(--muted)] font-mono uppercase text-xs">Amount:</span>{" "}
                          <span className="font-medium font-mono">
                            ${mismatch.providerTransaction.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--muted)] font-mono">
                          {formatDate(mismatch.providerTransaction.timestamp)}
                        </div>
                      </div>
                    </div>
                  )}
                  {mismatch.ledgerEntry && (
                    <div className="border border-[var(--border)] bg-white p-3 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
                      <div className="text-xs font-medium text-[var(--muted)] mb-2 font-mono uppercase tracking-wider">Ledger Entry</div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-[var(--muted)] font-mono uppercase text-xs">Transaction ID:</span>{" "}
                          <span className="font-mono text-xs">{mismatch.ledgerEntry.transactionId}</span>
                        </div>
                        <div>
                          <span className="text-[var(--muted)] font-mono uppercase text-xs">Amount:</span>{" "}
                          <span className="font-medium font-mono">
                            ${mismatch.ledgerEntry.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--muted)] font-mono">
                          {formatDate(mismatch.ledgerEntry.recordedAt)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matches (collapsible or summary) */}
      {reconciliationResult.matches.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Matched Transactions ({reconciliationResult.matches.length})
          </h3>
          <div className="border border-[var(--border)] bg-white p-4 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
            <div className="text-sm text-[var(--muted)] mb-3">
              {reconciliationResult.matches.length} transactions matched successfully between provider and ledger.
            </div>
            <details className="cursor-pointer">
              <summary className="text-sm font-medium text-[var(--fg)] hover:text-[var(--muted)] transition-colors">
                View all matches
              </summary>
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                {reconciliationResult.matches.map((match, idx) => (
                  <div
                    key={idx}
                    className="border border-[var(--border)] bg-white p-3 text-sm hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out"
                  >
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <span className="text-[var(--muted)] font-mono uppercase text-xs">Provider:</span>{" "}
                        <span className="font-mono text-xs">{match.provider.id}</span> -{" "}
                        <span className="font-medium font-mono">
                          ${match.provider.amount.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[var(--muted)] font-mono uppercase text-xs">Ledger:</span>{" "}
                        <span className="font-mono text-xs">{match.ledger.transactionId}</span> -{" "}
                        <span className="font-medium font-mono">
                          ${match.ledger.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}

