import { Metadata } from "next";
import Link from "next/link";
import Section from "../../components/Section";
import DataTable from "../../components/DataTable";
import KeyDecisions from "../../components/KeyDecisions";
import ScreenPlaceholder from "../../components/ScreenPlaceholder";
import SpotlightBg from "../../components/SpotlightBg";

export const metadata: Metadata = {
  title: "Fintech Payment Platform — Case Study | Nisha Ahamed",
  description: "Engineering case study: Building a reliable payment processing platform with idempotency, reconciliation, and auditability. Architecture, data models, and reliability patterns.",
};

/* Reusable glass card for the many content blocks in this page */
function GlassBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass glass-hover p-8">
      <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--fg)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function FintechPlatformCaseStudy() {
  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg)" }}>
      <SpotlightBg />

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm mb-4 transition-opacity hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          ← Back to home
        </Link>
        <div className="mb-4">
          <span className="glass-pill">
            <span className="glow-dot" />
            Case Study
          </span>
        </div>
        <h1
          className="font-headline text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--fg)" }}
        >
          Fintech Payment Platform
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          A payment processing platform built for financial institutions and fintech companies that need to handle
          high-volume transactions with strict requirements for correctness, auditability, and reliability. The system
          processes payments, maintains a double-entry ledger, reconciles with external payment processors, and provides
          real-time transaction monitoring for compliance and risk management.
        </p>
      </header>

      {/* Why This Matters */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
          Why this matters in fintech
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Correctness",
              body: "Every transaction must be recorded accurately. A single missing or duplicate entry can cause reconciliation failures and compliance issues. The system enforces atomic operations and maintains referential integrity across all financial records.",
            },
            {
              title: "Auditability",
              body: "Financial systems require complete audit trails. Every state change is logged as an immutable event, allowing full reconstruction of account balances and transaction history at any point in time.",
            },
            {
              title: "Idempotency",
              body: "Network failures and retries are inevitable. All payment operations accept idempotency keys, ensuring that retrying a request produces the same result without creating duplicate transactions.",
            },
            {
              title: "Traceability",
              body: "Each transaction links to its source (user action, webhook, reconciliation job) and includes correlation IDs for cross-system debugging. This is essential for investigating discrepancies and responding to customer inquiries.",
            },
          ].map(({ title, body }) => (
            <div key={title} className="glass glass-hover p-6">
              <h3 className="font-semibold text-base mb-2" style={{ color: "var(--fg)" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Key Decisions */}
      <Section>
        <KeyDecisions
          decisions={[
            "Event sourcing for ledger entries to maintain immutable audit trail and enable point-in-time queries",
            "Idempotency keys at the API layer, stored in Redis with TTL to prevent duplicate processing",
            "Separate read and write models: PostgreSQL for transactional writes, optimized views for reporting",
            "Webhook verification using HMAC signatures and replay protection via nonce tracking",
            "Reconciliation jobs run asynchronously with configurable matching rules and manual review workflows",
            "Circuit breakers and exponential backoff for external payment processor calls to prevent cascade failures",
          ]}
        />
      </Section>

      {/* Architecture */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Architecture</h2>
        <div className="glass p-8">
          <div className="space-y-6">
            {[
              {
                label: "Client Layer",
                items: [
                  { title: "Web Dashboard", sub: "React + TypeScript" },
                  { title: "Mobile App", sub: "React Native" },
                  { title: "API Clients", sub: "REST + Webhooks" },
                ],
                cols: 3,
              },
              {
                label: "API Layer",
                items: [
                  { title: "API Gateway", sub: "Rate limiting · Auth · Idempotency · Logging" },
                  { title: "Payment Service", sub: "Transaction processing · Ledger · Webhook dispatch" },
                ],
                cols: 2,
              },
              {
                label: "Data Layer",
                items: [
                  { title: "PostgreSQL", sub: "Primary database" },
                  { title: "Redis", sub: "Idempotency cache" },
                  { title: "S3", sub: "Audit logs" },
                ],
                cols: 3,
              },
              {
                label: "External Services",
                items: [
                  { title: "Payment Processors", sub: "Stripe, Plaid, ACH" },
                  { title: "Monitoring", sub: "Datadog, Sentry" },
                ],
                cols: 2,
              },
            ].map(({ label, items, cols }) => (
              <div key={label}>
                <div
                  className="text-xs font-mono uppercase tracking-wider mb-3"
                  style={{ color: "var(--muted)" }}
                >
                  {label}
                </div>
                <div className={`grid gap-3 ${cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {items.map(({ title, sub }) => (
                    <div key={title} className="glass-sm p-4 text-center">
                      <div className="text-sm font-medium mb-1" style={{ color: "var(--fg)" }}>{title}</div>
                      <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Data Model */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Data model</h2>
        <div className="space-y-4">
          <DataTable
            tableName="users"
            columns={[
              { name: "id", type: "UUID", description: "Primary key" },
              { name: "email", type: "VARCHAR(255)", description: "Unique email address" },
              { name: "created_at", type: "TIMESTAMP", description: "Account creation time" },
              { name: "kyc_status", type: "ENUM", description: "KYC verification status" },
              { name: "metadata", type: "JSONB", description: "Additional user attributes" },
            ]}
          />
          <DataTable
            tableName="accounts"
            columns={[
              { name: "id", type: "UUID", description: "Primary key" },
              { name: "user_id", type: "UUID", description: "Foreign key to users" },
              { name: "account_type", type: "ENUM", description: "checking, savings, wallet" },
              { name: "currency", type: "VARCHAR(3)", description: "ISO currency code" },
              { name: "balance", type: "DECIMAL(19,4)", description: "Current balance (immutable via ledger)" },
              { name: "created_at", type: "TIMESTAMP", description: "Account creation time" },
            ]}
          />
          <DataTable
            tableName="transactions"
            columns={[
              { name: "id", type: "UUID", description: "Primary key" },
              { name: "idempotency_key", type: "VARCHAR(255)", description: "Unique key for idempotency" },
              { name: "from_account_id", type: "UUID", description: "Source account (nullable for deposits)" },
              { name: "to_account_id", type: "UUID", description: "Destination account" },
              { name: "amount", type: "DECIMAL(19,4)", description: "Transaction amount" },
              { name: "currency", type: "VARCHAR(3)", description: "Transaction currency" },
              { name: "status", type: "ENUM", description: "pending, completed, failed, reversed" },
              { name: "external_reference", type: "VARCHAR(255)", description: "Reference from payment processor" },
              { name: "created_at", type: "TIMESTAMP", description: "Transaction initiation time" },
              { name: "completed_at", type: "TIMESTAMP", description: "Transaction completion time (nullable)" },
            ]}
          />
          <DataTable
            tableName="ledger_entries"
            columns={[
              { name: "id", type: "UUID", description: "Primary key" },
              { name: "transaction_id", type: "UUID", description: "Foreign key to transactions" },
              { name: "account_id", type: "UUID", description: "Account affected by this entry" },
              { name: "entry_type", type: "ENUM", description: "debit, credit" },
              { name: "amount", type: "DECIMAL(19,4)", description: "Entry amount (always positive)" },
              { name: "balance_after", type: "DECIMAL(19,4)", description: "Account balance after this entry" },
              { name: "created_at", type: "TIMESTAMP", description: "Entry creation time (immutable)" },
            ]}
          />
          <DataTable
            tableName="events"
            columns={[
              { name: "id", type: "UUID", description: "Primary key" },
              { name: "event_type", type: "VARCHAR(100)", description: "transaction.created, webhook.received, etc." },
              { name: "entity_type", type: "VARCHAR(50)", description: "transaction, account, user" },
              { name: "entity_id", type: "UUID", description: "ID of the affected entity" },
              { name: "payload", type: "JSONB", description: "Event data snapshot" },
              { name: "correlation_id", type: "VARCHAR(255)", description: "Request correlation ID" },
              { name: "created_at", type: "TIMESTAMP", description: "Event timestamp" },
            ]}
          />
        </div>
      </Section>

      {/* Reliability */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Reliability</h2>
        <div className="space-y-4">
          <GlassBlock title="Idempotency keys">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              All payment endpoints require an idempotency key in the request header. The key is stored in Redis
              with a 24-hour TTL. If a request with the same key arrives, we return the cached response without
              processing. Keys are scoped per user to prevent cross-user collisions.
            </p>
            <div
              className="glass-sm p-4 font-mono text-xs"
              style={{ color: "var(--muted)" }}
            >
              <div style={{ color: "var(--fg)" }}>POST /api/v1/payments</div>
              <div className="mt-2">Headers: X-Idempotency-Key: {`{uuid}`}</div>
            </div>
          </GlassBlock>

          <GlassBlock title="Retries and backoff">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              External payment processor calls use exponential backoff with jitter. Retries are limited to 3 attempts
              for idempotent operations. Non-idempotent operations fail fast to prevent duplicate charges.
              Circuit breakers prevent overwhelming failing services.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Initial delay", value: "100ms" },
                { label: "Max delay", value: "5s" },
                { label: "Max retries", value: "3 attempts" },
              ].map(({ label, value }) => (
                <div key={label} className="glass-sm p-4">
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="text-sm font-mono font-semibold" style={{ color: "var(--fg)" }}>{value}</div>
                </div>
              ))}
            </div>
          </GlassBlock>

          <GlassBlock title="Webhook handling">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              Incoming webhooks are verified using HMAC-SHA256 signatures. Each webhook includes a nonce {"that's"}
              checked against a Redis set to prevent replay attacks. Webhooks are processed asynchronously with
              a queue, and failed deliveries are retried with exponential backoff.
            </p>
            <div className="glass-sm p-4">
              <div
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: "var(--accent)" }}
              >
                Verification steps
              </div>
              <ol className="space-y-1.5 text-sm" style={{ color: "var(--muted)" }}>
                {[
                  "Verify HMAC signature matches payload",
                  "Check nonce hasn't been seen (Redis SET with TTL)",
                  "Validate timestamp is within 5-minute window",
                  "Process webhook and update transaction status",
                ].map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "var(--accent)" }}>{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </GlassBlock>

          <GlassBlock title="Validation">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              All inputs are validated at the API boundary using JSON Schema. Business rules (sufficient balance,
              account status, limits) are enforced in the service layer. Database constraints provide a final
              safety net. Validation errors return structured responses with field-level details.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Input validation", items: ["Schema validation (JSON Schema)", "Type checking", "Range validation"] },
                { label: "Business rules", items: ["Account status checks", "Balance verification", "Rate limiting"] },
              ].map(({ label, items }) => (
                <div key={label} className="glass-sm p-4">
                  <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: "var(--accent)" }}>{label}</div>
                  <ul className="space-y-1 text-sm" style={{ color: "var(--muted)" }}>
                    {items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span style={{ color: "var(--accent)" }}>›</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassBlock>
        </div>
      </Section>

      {/* Frontend */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Frontend</h2>
        <div className="space-y-4">
          <GlassBlock title="State management">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              React Query handles server state with automatic caching, background refetching, and optimistic updates.
              Local UI state uses React hooks. For complex forms, we use React Hook Form with Zod validation.
              Global app state (auth, theme) is managed with Context API.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Server state", value: "React Query" },
                { label: "Form state", value: "React Hook Form" },
                { label: "Global state", value: "Context API" },
              ].map(({ label, value }) => (
                <div key={label} className="glass-sm p-4">
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="text-sm font-mono font-semibold" style={{ color: "var(--fg)" }}>{value}</div>
                </div>
              ))}
            </div>
          </GlassBlock>

          <GlassBlock title="Loading states">
            <p className="leading-relaxed text-sm" style={{ color: "var(--muted)" }}>
              All async operations show loading indicators. Skeletons are used for initial page loads to prevent
              layout shift. Optimistic updates provide immediate feedback for user actions. Error boundaries
              catch and display errors gracefully.
            </p>
          </GlassBlock>

          <GlassBlock title="Accessibility">
            <p className="leading-relaxed text-sm" style={{ color: "var(--muted)" }}>
              All interactive elements are keyboard navigable. ARIA labels and roles are used where semantic HTML
              {" isn't"} sufficient. Color contrast meets WCAG AA standards. Screen reader announcements are
              provided for dynamic content updates.
            </p>
          </GlassBlock>

          <GlassBlock title="Performance">
            <p className="leading-relaxed text-sm" style={{ color: "var(--muted)" }}>
              Code splitting at the route level reduces initial bundle size. Images are optimized with Next.js Image.
              API responses are cached with appropriate TTLs. Virtual scrolling is used for large transaction lists.
              Lighthouse scores: Performance 95+, Accessibility 100, Best Practices 95+.
            </p>
          </GlassBlock>
        </div>
      </Section>

      {/* Testing & Observability */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
          Testing & observability
        </h2>
        <div className="space-y-4">
          <GlassBlock title="Unit & integration tests">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              Unit tests cover business logic with Jest. Integration tests use a test database and verify
              end-to-end flows. Payment processor calls are mocked. Test coverage is maintained above 80% for
              critical paths (payment processing, ledger updates, reconciliation).
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Unit tests", value: "Jest, 85% coverage" },
                { label: "Integration tests", value: "Testcontainers, PostgreSQL" },
              ].map(({ label, value }) => (
                <div key={label} className="glass-sm p-4">
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="text-sm font-mono font-semibold" style={{ color: "var(--fg)" }}>{value}</div>
                </div>
              ))}
            </div>
          </GlassBlock>

          <GlassBlock title="Logging">
            <p className="leading-relaxed text-sm" style={{ color: "var(--muted)" }}>
              Structured logging with correlation IDs for request tracing. Logs include transaction IDs, user IDs,
              and timing information. Sensitive data (account numbers, SSNs) is redacted. Logs are shipped to
              centralized storage with retention policies.
            </p>
          </GlassBlock>

          <GlassBlock title="Metrics">
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "var(--muted)" }}>
              Key metrics are tracked: transaction volume, success/failure rates, API latency (p50, p95, p99),
              payment processor response times, and reconciliation match rates. Dashboards provide real-time
              visibility. Alerts fire on anomalies (error rate spikes, latency degradation).
            </p>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { label: "Volume", value: "Transactions/min" },
                { label: "Success rate", value: "Target: 99.5%+" },
                { label: "Latency (p95)", value: "Target: <200ms" },
                { label: "Reconciliation", value: "Match rate: 99%+" },
              ].map(({ label, value }) => (
                <div key={label} className="glass-sm p-3 text-center">
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                  <div className="text-xs font-mono font-semibold" style={{ color: "var(--accent)" }}>{value}</div>
                </div>
              ))}
            </div>
          </GlassBlock>
        </div>
      </Section>

      {/* Screens */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>Screens</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <ScreenPlaceholder
            title="Transaction Dashboard"
            description="Real-time view of transaction volume, success rates, and recent activity with filtering and search"
          />
          <ScreenPlaceholder
            title="Account Details"
            description="Account balance, transaction history, and ledger entries with export functionality"
          />
          <ScreenPlaceholder
            title="Reconciliation View"
            description="Matching status, discrepancies, and manual review queue for reconciliation jobs"
          />
        </div>
      </Section>

      {/* Tradeoffs */}
      <Section>
        <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
          {"Tradeoffs & what I'd improve next"}
        </h2>
        <div className="glass p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--fg)" }}>Tradeoffs made</h3>
              <ul className="space-y-3">
                {[
                  { label: "Event sourcing complexity", body: "Added operational overhead but provides complete auditability. Worth it for financial systems." },
                  { label: "Redis for idempotency", body: "Single point of failure, but necessary for performance. Mitigated with Redis Cluster and fallback to database." },
                  { label: "PostgreSQL for everything", body: "Not optimized for analytics, but simplifies operations. Planning to add read replicas and materialized views." },
                ].map(({ label, body }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span style={{ color: "var(--accent)" }} className="mt-1 font-mono">›</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      <strong style={{ color: "var(--fg)" }}>{label}:</strong> {body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="glass-divider" />
            <div>
              <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--fg)" }}>Next improvements</h3>
              <ul className="space-y-3">
                {[
                  { label: "Read replicas", body: "Offload reporting queries to dedicated read replicas to reduce load on primary database." },
                  { label: "Streaming reconciliation", body: "Move from batch jobs to event-driven reconciliation for near-real-time matching." },
                  { label: "Multi-region support", body: "Add active-active replication for disaster recovery and lower latency." },
                  { label: "GraphQL API", body: "Add GraphQL layer for mobile clients to reduce over-fetching and improve performance." },
                  { label: "ML-based fraud detection", body: "Enhance rule-based risk checks with machine learning models for anomaly detection." },
                ].map(({ label, body }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span style={{ color: "var(--accent)" }} className="mt-1 font-mono">›</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      <strong style={{ color: "var(--fg)" }}>{label}:</strong> {body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <footer
        className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs"
        style={{ color: "rgba(240,240,255,0.3)" }}
      >
        <Link href="/" className="transition-opacity hover:opacity-70">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
