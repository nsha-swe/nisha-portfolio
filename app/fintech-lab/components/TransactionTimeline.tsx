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
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      case "reversed":
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Transaction Timeline</h2>
        <p className="text-sm text-black/70">
          Explore and filter simulated transaction data. All data is generated locally—no external APIs.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "all")}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="reversed">Reversed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Date From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Date To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount_high">Amount (High)</option>
            <option value="amount_low">Amount (Low)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Min Amount</label>
          <input
            type="number"
            step="0.01"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-black/60 mb-1">Max Amount</label>
          <input
            type="number"
            step="0.01"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="10000.00"
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-black/60 mb-1">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, merchant, or rails..."
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-black/60">
        Showing {filteredAndSorted.length} of {transactions.length} transactions
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12 text-black/60">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black/20"></div>
          <p className="mt-2">Loading transactions...</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredAndSorted.length === 0 && (
        <div className="text-center py-12 text-black/60">
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
              className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md hover:bg-white/90 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-black/60">{txn.id}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(txn.status)}`}
                    >
                      {txn.status}
                    </span>
                    <span className="text-xs text-black/50">{txn.rails}</span>
                  </div>
                  <div className="text-sm font-medium">{txn.merchant}</div>
                  <div className="text-xs text-black/60 mt-1">{formatDate(txn.createdAt)}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
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

