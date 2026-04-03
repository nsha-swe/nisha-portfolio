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

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "8px 12px",
  fontSize: "0.875rem",
  color: "var(--fg)",
  outline: "none",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  colorScheme: "dark",
  fontFamily: "var(--font-mono)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.65rem",
  fontFamily: "var(--font-mono)",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--muted)",
  marginBottom: "6px",
};

const mismatchColors: Record<ReconciliationMismatch["type"], { bg: string; text: string; border: string }> = {
  missing_in_ledger: { bg: "rgba(248,113,113,0.1)", text: "rgba(252,165,165,0.9)", border: "rgba(252,165,165,0.25)" },
  extra_in_ledger:   { bg: "rgba(251,191,36,0.08)", text: "rgba(252,211,77,0.85)", border: "rgba(252,211,77,0.2)" },
  amount_mismatch:   { bg: "rgba(129,140,248,0.1)", text: "rgba(165,180,252,0.9)", border: "rgba(165,180,252,0.25)" },
  currency_mismatch: { bg: "rgba(148,163,184,0.08)", text: "rgba(203,213,225,0.8)", border: "rgba(203,213,225,0.2)" },
};

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
      providerTransactions, ledgerEntries, reconciliation: reconciliationResult,
      options: { amountTolerance: parseFloat(amountTolerance) || 0.01, currencyMatchRequired },
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

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="glass p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="font-headline text-2xl font-semibold mb-2" style={{ color: "var(--fg)" }}>
          Reconciliation Explorer
        </h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Compare provider transaction data with internal ledger entries. Identifies matches and mismatches
          using configurable tolerance rules.
        </p>
      </div>

      {/* Configuration */}
      <div className="glass-sm p-4 mb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label style={labelStyle}>Amount Tolerance</label>
            <input
              type="number" step="0.01" min="0"
              value={amountTolerance}
              onChange={(e) => setAmountTolerance(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currencyMatchRequired}
                onChange={(e) => setCurrencyMatchRequired(e.target.checked)}
                style={{ accentColor: "var(--accent)" }}
              />
              <span className="text-sm" style={{ color: "var(--muted)" }}>Require currency match</span>
            </label>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="btn-primary w-full justify-center"
              style={{ borderRadius: "12px" }}
            >
              Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Provider Transactions", value: reconciliationResult.summary.totalProvider },
          { label: "Ledger Entries",        value: reconciliationResult.summary.totalLedger },
          { label: "Matched",               value: reconciliationResult.summary.matched,   accent: true },
          { label: "Mismatches",            value: reconciliationResult.mismatches.length },
        ].map(({ label, value, accent }) => (
          <div key={label} className="glass-sm p-4">
            <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>
              {label}
            </div>
            <div
              className="text-2xl font-semibold font-mono"
              style={{ color: accent ? "var(--accent)" : "var(--fg)" }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Mismatch breakdown */}
      {reconciliationResult.mismatches.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {[
            { key: "missingInLedger",  label: "Missing in Ledger" },
            { key: "extraInLedger",    label: "Extra in Ledger" },
            { key: "amountMismatches", label: "Amount Mismatches" },
            { key: "currencyMismatches", label: "Currency Mismatches" },
          ]
            .filter(({ key }) => (reconciliationResult.summary as Record<string, number>)[key] > 0)
            .map(({ key, label }) => (
              <div key={key} className="glass-sm p-3">
                <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>
                  {label}
                </div>
                <div className="text-lg font-semibold font-mono" style={{ color: "var(--fg)" }}>
                  {(reconciliationResult.summary as Record<string, number>)[key]}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Mismatches table */}
      {reconciliationResult.mismatches.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--fg)" }}>Mismatches</h3>
          <div className="space-y-3">
            {reconciliationResult.mismatches.map((mismatch, idx) => {
              const colors = mismatchColors[mismatch.type];
              return (
                <div key={idx} className="glass-sm p-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "999px",
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        padding: "2px 10px",
                      }}
                    >
                      {mismatch.type.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{mismatch.details}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {mismatch.providerTransaction && (
                      <div className="glass-sm p-3">
                        <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>
                          Provider Transaction
                        </div>
                        <div className="space-y-1 text-xs font-mono" style={{ color: "var(--muted)" }}>
                          <div><span className="opacity-60">ID:</span> {mismatch.providerTransaction.id}</div>
                          <div>
                            <span className="opacity-60">Amount:</span>{" "}
                            <span style={{ color: "var(--fg)" }}>${mismatch.providerTransaction.amount.toFixed(2)}</span>
                          </div>
                          <div>{formatDate(mismatch.providerTransaction.timestamp)}</div>
                        </div>
                      </div>
                    )}
                    {mismatch.ledgerEntry && (
                      <div className="glass-sm p-3">
                        <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>
                          Ledger Entry
                        </div>
                        <div className="space-y-1 text-xs font-mono" style={{ color: "var(--muted)" }}>
                          <div><span className="opacity-60">TX ID:</span> {mismatch.ledgerEntry.transactionId}</div>
                          <div>
                            <span className="opacity-60">Amount:</span>{" "}
                            <span style={{ color: "var(--fg)" }}>${mismatch.ledgerEntry.amount.toFixed(2)}</span>
                          </div>
                          <div>{formatDate(mismatch.ledgerEntry.recordedAt)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Matches */}
      {reconciliationResult.matches.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--fg)" }}>
            Matched Transactions ({reconciliationResult.matches.length})
          </h3>
          <div className="glass-sm p-4">
            <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
              {reconciliationResult.matches.length} transactions matched successfully between provider and ledger.
            </p>
            <details className="cursor-pointer">
              <summary className="text-sm font-medium transition-opacity hover:opacity-70" style={{ color: "var(--fg)" }}>
                View all matches
              </summary>
              <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                {reconciliationResult.matches.map((match, idx) => (
                  <div key={idx} className="glass-sm p-3 text-xs font-mono" style={{ color: "var(--muted)" }}>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div>
                        <span className="opacity-60">Provider:</span> {match.provider.id} —{" "}
                        <span style={{ color: "var(--fg)" }}>${match.provider.amount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="opacity-60">Ledger:</span> {match.ledger.transactionId} —{" "}
                        <span style={{ color: "var(--fg)" }}>${match.ledger.amount.toFixed(2)}</span>
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
