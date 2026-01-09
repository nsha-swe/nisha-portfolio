"use client";

import { useState, useMemo } from "react";
import { Transaction, TransactionStatus } from "../types";
import { generateMockTransactions } from "../utils/mockData";

type SortOption = "newest" | "oldest" | "amount_high" | "amount_low";

export default function TransactionTimeline() {
  const [transactions] = useState<Transaction[]>(() => generateMockTransactions(50));
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading] = useState(false);

  const filteredAndSorted = useMemo(() => {
    let filtered = [...transactions];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filtered = filtered.filter((t) => t.createdAt >= fromDate);
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => t.createdAt <= toDate);
    }

    // Amount filters
    if (minAmount) {
      const min = parseFloat(minAmount);
      if (!isNaN(min)) {
        filtered = filtered.filter((t) => t.amount >= min);
      }
    }
    if (maxAmount) {
      const max = parseFloat(maxAmount);
      if (!isNaN(max)) {
        filtered = filtered.filter((t) => t.amount <= max);
      }
    }

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(query) ||
          t.merchant.toLowerCase().includes(query) ||
          t.rails.toLowerCase().includes(query)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "amount_high":
          return b.amount - a.amount;
        case "amount_low":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, statusFilter, dateFrom, dateTo, minAmount, maxAmount, searchQuery, sortBy]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-[var(--bg)] text-[var(--fg)] border-[var(--border)]";
      case "pending":
        return "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]";
      case "failed":
        return "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]";
      case "reversed":
        return "bg-[var(--bg)] text-[var(--muted)] border-[var(--border)]";
    }
  };

  return (
    <div className="border border-[var(--border)] bg-white p-8 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
      <div className="mb-6">
        <h2 className="font-headline text-2xl font-semibold mb-2">Transaction Timeline</h2>
        <p className="text-sm text-[var(--muted)]">
          Explore and filter simulated transaction data. All data is generated locally—no external APIs.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "all")}
            className="w-full border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 hover:border-[var(--fg)]/20 transition-colors"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="reversed">Reversed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Date From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 hover:border-[var(--fg)]/20 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Date To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 hover:border-[var(--fg)]/20 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 hover:border-[var(--fg)]/20 transition-colors"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount_high">Amount (High)</option>
            <option value="amount_low">Amount (Low)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Min Amount</label>
          <input
            type="number"
            step="0.01"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Max Amount</label>
          <input
            type="number"
            step="0.01"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="10000.00"
            className="w-full border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-mono"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-[var(--muted)] mb-1 font-mono uppercase tracking-wider">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, merchant, or rails..."
            className="w-full border border-[var(--border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 hover:border-[var(--fg)]/20 transition-colors"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-[var(--muted)] font-mono uppercase text-xs tracking-wider">
        Showing {filteredAndSorted.length} of {transactions.length} transactions
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12 text-[var(--muted)]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--border)]"></div>
          <p className="mt-2">Loading transactions...</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-[var(--muted)]">
          <p className="text-lg font-medium mb-2">No transactions found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}

      {/* Transaction list */}
      {!isLoading && filteredAndSorted.length > 0 && (
        <div className="space-y-3">
          {filteredAndSorted.map((txn) => (
            <div
              key={txn.id}
              className="border border-[var(--border)] bg-white p-4 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[var(--muted)]">{txn.id}</span>
                    <span
                      className={`text-xs px-2 py-0.5 border ${getStatusColor(txn.status)}`}
                    >
                      {txn.status}
                    </span>
                    <span className="text-xs text-[var(--muted)] font-mono">{txn.rails}</span>
                  </div>
                  <div className="text-sm font-medium">{txn.merchant}</div>
                  <div className="text-xs text-[var(--muted)] mt-1 font-mono">{formatDate(txn.createdAt)}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold font-mono">
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

