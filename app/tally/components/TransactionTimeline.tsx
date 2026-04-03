"use client";

import { useState, useMemo } from "react";
import { Transaction, TransactionStatus } from "../types";
import { generateMockTransactions } from "../utils/mockData";

type SortOption = "newest" | "oldest" | "amount_high" | "amount_low";

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

const statusColors: Record<TransactionStatus, string> = {
  completed: "rgba(52,211,153,0.15)",
  pending: "rgba(251,191,36,0.12)",
  failed: "rgba(248,113,113,0.12)",
  reversed: "rgba(148,163,184,0.1)",
};

const statusTextColors: Record<TransactionStatus, string> = {
  completed: "rgba(110,231,183,0.9)",
  pending: "rgba(252,211,77,0.9)",
  failed: "rgba(252,165,165,0.9)",
  reversed: "rgba(203,213,225,0.7)",
};

export default function TransactionTimeline() {
  const [transactions] = useState<Transaction[]>(() => generateMockTransactions(50));
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredAndSorted = useMemo(() => {
    let filtered = [...transactions];

    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter((t) => t.createdAt >= fromDate);
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => t.createdAt <= toDate);
    }
    if (minAmount) {
      const min = parseFloat(minAmount);
      if (!isNaN(min)) filtered = filtered.filter((t) => t.amount >= min);
    }
    if (maxAmount) {
      const max = parseFloat(maxAmount);
      if (!isNaN(max)) filtered = filtered.filter((t) => t.amount <= max);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(query) ||
          t.merchant.toLowerCase().includes(query) ||
          t.rails.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest": return b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest": return a.createdAt.getTime() - b.createdAt.getTime();
        case "amount_high": return b.amount - a.amount;
        case "amount_low": return a.amount - b.amount;
        default: return 0;
      }
    });

    return filtered;
  }, [transactions, statusFilter, dateFrom, dateTo, minAmount, maxAmount, searchQuery, sortBy]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="glass p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="font-headline text-2xl font-semibold mb-2" style={{ color: "var(--fg)" }}>
          Transaction Timeline
        </h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Explore and filter simulated transaction data. All data is generated locally — no external APIs.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-sm p-4 mb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label style={labelStyle}>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "all")}
              style={inputStyle}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="reversed">Reversed</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Date To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} style={inputStyle}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount_high">Amount (High)</option>
              <option value="amount_low">Amount (Low)</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Min Amount</label>
            <input type="number" step="0.01" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder="0.00" style={{ ...inputStyle, fontFamily: "var(--font-mono)" }} />
          </div>
          <div>
            <label style={labelStyle}>Max Amount</label>
            <input type="number" step="0.01" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder="10000.00" style={{ ...inputStyle, fontFamily: "var(--font-mono)" }} />
          </div>
          <div className="sm:col-span-2">
            <label style={labelStyle}>Search</label>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by ID, merchant, or rails..." style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="mb-4 text-xs font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
        Showing {filteredAndSorted.length} of {transactions.length} transactions
      </div>

      {/* Empty state */}
      {filteredAndSorted.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--muted)" }}>
          <p className="text-lg font-medium mb-2">No transactions found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}

      {/* Transaction list */}
      {filteredAndSorted.length > 0 && (
        <div className="space-y-2">
          {filteredAndSorted.map((txn) => (
            <div key={txn.id} className="glass-sm glass-hover p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs" style={{ color: "rgba(240,240,255,0.35)" }}>
                      {txn.id}
                    </span>
                    <span
                      style={{
                        background: statusColors[txn.status],
                        color: statusTextColors[txn.status],
                        border: `1px solid ${statusTextColors[txn.status].replace("0.9", "0.25")}`,
                        borderRadius: "999px",
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        padding: "2px 8px",
                      }}
                    >
                      {txn.status}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "rgba(240,240,255,0.4)" }}>
                      {txn.rails}
                    </span>
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--fg)" }}>{txn.merchant}</div>
                  <div className="text-xs font-mono mt-1" style={{ color: "var(--muted)" }}>
                    {formatDate(txn.createdAt)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold font-mono" style={{ color: "var(--fg)" }}>
                    ${txn.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
