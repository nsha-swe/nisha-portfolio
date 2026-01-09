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
        return "bg-red-100 text-red-700 border-red-200";
      case "extra_in_ledger":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "amount_mismatch":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "currency_mismatch":
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Reconciliation Explorer</h2>
        <p className="text-sm text-black/70">
          Compare provider transaction data with internal ledger entries. Identifies matches and mismatches using
          configurable tolerance rules.
        </p>
      </div>

      {/* Configuration */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6 p-4 rounded-xl border border-black/10 bg-white/50">
        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Amount Tolerance</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amountTolerance}
            onChange={(e) => setAmountTolerance(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currencyMatchRequired}
              onChange={(e) => setCurrencyMatchRequired(e.target.checked)}
              className="rounded border-black/20"
            />
            <span className="text-sm text-black/70">Require currency match</span>
          </label>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleExport}
            className="w-full rounded-lg border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Export JSON
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
          <div className="text-xs text-black/60 mb-1">Provider Transactions</div>
          <div className="text-2xl font-semibold">{reconciliationResult.summary.totalProvider}</div>
        </div>
        <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
          <div className="text-xs text-black/60 mb-1">Ledger Entries</div>
          <div className="text-2xl font-semibold">{reconciliationResult.summary.totalLedger}</div>
        </div>
        <div className="rounded-xl border border-black/10 bg-emerald-50 p-4 backdrop-blur-md">
          <div className="text-xs text-emerald-700 mb-1">Matched</div>
          <div className="text-2xl font-semibold text-emerald-700">{reconciliationResult.summary.matched}</div>
        </div>
        <div className="rounded-xl border border-black/10 bg-red-50 p-4 backdrop-blur-md">
          <div className="text-xs text-red-700 mb-1">Mismatches</div>
          <div className="text-2xl font-semibold text-red-700">
            {reconciliationResult.mismatches.length}
          </div>
        </div>
      </div>

      {/* Mismatch breakdown */}
      {reconciliationResult.mismatches.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {reconciliationResult.summary.missingInLedger > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <div className="text-xs text-red-700 mb-1">Missing in Ledger</div>
              <div className="text-lg font-semibold text-red-700">
                {reconciliationResult.summary.missingInLedger}
              </div>
            </div>
          )}
          {reconciliationResult.summary.extraInLedger > 0 && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <div className="text-xs text-yellow-700 mb-1">Extra in Ledger</div>
              <div className="text-lg font-semibold text-yellow-700">
                {reconciliationResult.summary.extraInLedger}
              </div>
            </div>
          )}
          {reconciliationResult.summary.amountMismatches > 0 && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
              <div className="text-xs text-orange-700 mb-1">Amount Mismatches</div>
              <div className="text-lg font-semibold text-orange-700">
                {reconciliationResult.summary.amountMismatches}
              </div>
            </div>
          )}
          {reconciliationResult.summary.currencyMismatches > 0 && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
              <div className="text-xs text-purple-700 mb-1">Currency Mismatches</div>
              <div className="text-lg font-semibold text-purple-700">
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
                className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${getMismatchTypeColor(mismatch.type)}`}
                  >
                    {mismatch.type.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs text-black/60">{mismatch.details}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mismatch.providerTransaction && (
                    <div className="rounded-lg border border-black/10 bg-white/50 p-3">
                      <div className="text-xs font-medium text-black/60 mb-2">Provider Transaction</div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-black/60">ID:</span>{" "}
                          <span className="font-mono text-xs">{mismatch.providerTransaction.id}</span>
                        </div>
                        <div>
                          <span className="text-black/60">Amount:</span>{" "}
                          <span className="font-medium">
                            ${mismatch.providerTransaction.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-black/60">
                          {formatDate(mismatch.providerTransaction.timestamp)}
                        </div>
                      </div>
                    </div>
                  )}
                  {mismatch.ledgerEntry && (
                    <div className="rounded-lg border border-black/10 bg-white/50 p-3">
                      <div className="text-xs font-medium text-black/60 mb-2">Ledger Entry</div>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="text-black/60">Transaction ID:</span>{" "}
                          <span className="font-mono text-xs">{mismatch.ledgerEntry.transactionId}</span>
                        </div>
                        <div>
                          <span className="text-black/60">Amount:</span>{" "}
                          <span className="font-medium">
                            ${mismatch.ledgerEntry.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-black/60">
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
          <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
            <div className="text-sm text-black/70 mb-3">
              {reconciliationResult.matches.length} transactions matched successfully between provider and ledger.
            </div>
            <details className="cursor-pointer">
              <summary className="text-sm font-medium text-black/80 hover:text-black">
                View all matches
              </summary>
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                {reconciliationResult.matches.map((match, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm"
                  >
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <span className="text-black/60">Provider:</span>{" "}
                        <span className="font-mono text-xs">{match.provider.id}</span> -{" "}
                        <span className="font-medium">
                          ${match.provider.amount.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-black/60">Ledger:</span>{" "}
                        <span className="font-mono text-xs">{match.ledger.transactionId}</span> -{" "}
                        <span className="font-medium">
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

