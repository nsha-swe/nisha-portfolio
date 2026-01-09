import { Brawler } from "next/font/google";
import { Metadata } from "next";
import Link from "next/link";
import Section from "../../components/Section";
import DataTable from "../../components/DataTable";
import KeyDecisions from "../../components/KeyDecisions";
import ScreenPlaceholder from "../../components/ScreenPlaceholder";

const brawler = Brawler({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Fintech Payment Platform — Case Study | Nisha Ahamed",
  description: "Engineering case study: Building a reliable payment processing platform with idempotency, reconciliation, and auditability. Architecture, data models, and reliability patterns.",
};

export default function FintechPlatformCaseStudy() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.06),transparent_60%)]">
      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-16 sm:pt-24">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black/60 hover:text-black transition-colors mb-6"
        >
          ← Back to home
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium backdrop-blur-md mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Case Study
        </div>
        <h1 className={`${brawler.className} text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.05] mb-4`}>
          Fintech Payment Platform
        </h1>
        <p className="max-w-3xl text-black/70 text-lg leading-relaxed">
          A payment processing platform built for financial institutions and fintech companies that need to handle 
          high-volume transactions with strict requirements for correctness, auditability, and reliability. The system 
          processes payments, maintains a double-entry ledger, reconciles with external payment processors, and provides 
          real-time transaction monitoring for compliance and risk management.
        </p>
      </header>

      {/* Why This Matters in Fintech */}
      <Section>
        <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Why this matters in fintech</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-lg mb-2">Correctness</h3>
              <p className="text-black/70 text-sm leading-relaxed">
                Every transaction must be recorded accurately. A single missing or duplicate entry can cause 
                reconciliation failures and compliance issues. The system enforces atomic operations and 
                maintains referential integrity across all financial records.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Auditability</h3>
              <p className="text-black/70 text-sm leading-relaxed">
                Financial systems require complete audit trails. Every state change is logged as an immutable 
                event, allowing full reconstruction of account balances and transaction history at any point in time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Idempotency</h3>
              <p className="text-black/70 text-sm leading-relaxed">
                Network failures and retries are inevitable. All payment operations accept idempotency keys, 
                ensuring that retrying a request produces the same result without creating duplicate transactions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Traceability</h3>
              <p className="text-black/70 text-sm leading-relaxed">
                Each transaction links to its source (user action, webhook, reconciliation job) and includes 
                correlation IDs for cross-system debugging. This is essential for investigating discrepancies 
                and responding to customer inquiries.
              </p>
            </div>
          </div>
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
            "Circuit breakers and exponential backoff for external payment processor calls to prevent cascade failures"
          ]}
        />
      </Section>

      {/* Architecture */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Architecture</h2>
        <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="space-y-6">
            {/* Client Layer */}
            <div>
              <div className="text-sm text-black/60 mb-2">Client Layer</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md text-center">
                  <div className="text-sm font-medium">Web Dashboard</div>
                  <div className="text-xs text-black/60 mt-1">React + TypeScript</div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md text-center">
                  <div className="text-sm font-medium">Mobile App</div>
                  <div className="text-xs text-black/60 mt-1">React Native</div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md text-center">
                  <div className="text-sm font-medium">API Clients</div>
                  <div className="text-xs text-black/60 mt-1">REST + Webhooks</div>
                </div>
              </div>
            </div>

            {/* API Layer */}
            <div>
              <div className="text-sm text-black/60 mb-2">API Layer</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">API Gateway</div>
                  <div className="text-xs text-black/70 space-y-1">
                    <div>• Rate limiting & auth</div>
                    <div>• Idempotency key validation</div>
                    <div>• Request logging</div>
                  </div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">Payment Service</div>
                  <div className="text-xs text-black/70 space-y-1">
                    <div>• Transaction processing</div>
                    <div>• Ledger updates</div>
                    <div>• Webhook dispatch</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Layer */}
            <div>
              <div className="text-sm text-black/60 mb-2">Data Layer</div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">PostgreSQL</div>
                  <div className="text-xs text-black/70">Primary database</div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">Redis</div>
                  <div className="text-xs text-black/70">Idempotency cache</div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">S3</div>
                  <div className="text-xs text-black/70">Audit logs</div>
                </div>
              </div>
            </div>

            {/* External Services */}
            <div>
              <div className="text-sm text-black/60 mb-2">External Services</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">Payment Processors</div>
                  <div className="text-xs text-black/70">Stripe, Plaid, ACH</div>
                </div>
                <div className="rounded-xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
                  <div className="text-sm font-medium mb-2">Monitoring</div>
                  <div className="text-xs text-black/70">Datadog, Sentry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Data Model */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Data model</h2>
        <div className="space-y-6">
          <DataTable
            tableName="users"
            columns={[
              { name: "id", type: "UUID", description: "Primary key" },
              { name: "email", type: "VARCHAR(255)", description: "Unique email address" },
              { name: "created_at", type: "TIMESTAMP", description: "Account creation time" },
              { name: "kyc_status", type: "ENUM", description: "KYC verification status" },
              { name: "metadata", type: "JSONB", description: "Additional user attributes" }
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
              { name: "created_at", type: "TIMESTAMP", description: "Account creation time" }
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
              { name: "completed_at", type: "TIMESTAMP", description: "Transaction completion time (nullable)" }
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
              { name: "created_at", type: "TIMESTAMP", description: "Entry creation time (immutable)" }
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
              { name: "created_at", type: "TIMESTAMP", description: "Event timestamp" }
            ]}
          />
        </div>
      </Section>

      {/* Reliability */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Reliability</h2>
        <div className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Idempotency keys</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              All payment endpoints require an idempotency key in the request header. The key is stored in Redis 
              with a 24-hour TTL. If a request with the same key arrives, we return the cached response without 
              processing. Keys are scoped per user to prevent cross-user collisions.
            </p>
            <div className="bg-black/5 rounded-lg p-4 font-mono text-xs">
              <div>POST /api/v1/payments</div>
              <div className="mt-2 text-black/70">Headers: X-Idempotency-Key: {`{uuid}`}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Retries and backoff</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              External payment processor calls use exponential backoff with jitter. Retries are limited to 3 attempts 
              for idempotent operations (GET, idempotent POSTs). Non-idempotent operations fail fast to prevent 
              duplicate charges. Circuit breakers prevent overwhelming failing services.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div>
                <div className="text-sm font-medium mb-1">Initial delay</div>
                <div className="text-sm text-black/70">100ms</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Max delay</div>
                <div className="text-sm text-black/70">5s</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Max retries</div>
                <div className="text-sm text-black/70">3 attempts</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Webhook handling</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              Incoming webhooks are verified using HMAC-SHA256 signatures. Each webhook includes a nonce that's 
              checked against a Redis set to prevent replay attacks. Webhooks are processed asynchronously with 
              a queue, and failed deliveries are retried with exponential backoff.
            </p>
            <div className="bg-black/5 rounded-lg p-4 text-sm">
              <div className="font-medium mb-2">Verification steps:</div>
              <ol className="list-decimal list-inside space-y-1 text-black/70">
                <li>Verify HMAC signature matches payload</li>
                <li>Check nonce hasn't been seen (Redis SET with TTL)</li>
                <li>Validate timestamp is within 5-minute window</li>
                <li>Process webhook and update transaction status</li>
              </ol>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Validation</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              All inputs are validated at the API boundary using JSON Schema. Business rules (sufficient balance, 
              account status, limits) are enforced in the service layer. Database constraints provide a final safety 
              net. Validation errors return structured responses with field-level details.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <div className="text-sm font-medium mb-2">Input validation</div>
                <ul className="text-sm text-black/70 space-y-1 list-disc list-inside">
                  <li>Schema validation (JSON Schema)</li>
                  <li>Type checking</li>
                  <li>Range validation</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Business rules</div>
                <ul className="text-sm text-black/70 space-y-1 list-disc list-inside">
                  <li>Account status checks</li>
                  <li>Balance verification</li>
                  <li>Rate limiting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Frontend */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Frontend</h2>
        <div className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">State management</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              React Query handles server state with automatic caching, background refetching, and optimistic updates. 
              Local UI state uses React hooks. For complex forms, we use React Hook Form with Zod validation. 
              Global app state (auth, theme) is managed with Context API.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-4">
              <div>
                <div className="text-sm font-medium mb-1">Server state</div>
                <div className="text-sm text-black/70">React Query</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Form state</div>
                <div className="text-sm text-black/70">React Hook Form</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Global state</div>
                <div className="text-sm text-black/70">Context API</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Loading states</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              All async operations show loading indicators. Skeletons are used for initial page loads to prevent 
              layout shift. Optimistic updates provide immediate feedback for user actions. Error boundaries 
              catch and display errors gracefully.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              All interactive elements are keyboard navigable. ARIA labels and roles are used where semantic HTML 
              isn't sufficient. Color contrast meets WCAG AA standards. Screen reader announcements are provided 
              for dynamic content updates.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Performance</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              Code splitting at the route level reduces initial bundle size. Images are optimized with Next.js Image. 
              API responses are cached with appropriate TTLs. Virtual scrolling is used for large transaction lists. 
              Lighthouse scores: Performance 95+, Accessibility 100, Best Practices 95+.
            </p>
          </div>
        </div>
      </Section>

      {/* Testing & Observability */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Testing & observability</h2>
        <div className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Unit & integration tests</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              Unit tests cover business logic with Jest. Integration tests use a test database and verify 
              end-to-end flows. Payment processor calls are mocked. Test coverage is maintained above 80% for 
              critical paths (payment processing, ledger updates, reconciliation).
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div>
                <div className="text-sm font-medium mb-1">Unit tests</div>
                <div className="text-sm text-black/70">Jest, 85% coverage</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Integration tests</div>
                <div className="text-sm text-black/70">Testcontainers, PostgreSQL</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Logging</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              Structured logging with correlation IDs for request tracing. Logs include transaction IDs, user IDs, 
              and timing information. Sensitive data (account numbers, SSNs) is redacted. Logs are shipped to 
              centralized storage with retention policies.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-4">Metrics</h3>
            <p className="text-black/70 mb-4 leading-relaxed">
              Key metrics are tracked: transaction volume, success/failure rates, API latency (p50, p95, p99), 
              payment processor response times, and reconciliation match rates. Dashboards provide real-time 
              visibility. Alerts fire on anomalies (error rate spikes, latency degradation).
            </p>
            <div className="grid gap-4 sm:grid-cols-4 mt-4">
              <div>
                <div className="text-sm font-medium mb-1">Volume</div>
                <div className="text-sm text-black/70">Transactions/min</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Success rate</div>
                <div className="text-sm text-black/70">Target: 99.5%+</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Latency (p95)</div>
                <div className="text-sm text-black/70">Target: &lt;200ms</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Reconciliation</div>
                <div className="text-sm text-black/70">Match rate: 99%+</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Screens */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Screens</h2>
        <div className="grid gap-6 sm:grid-cols-3">
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

      {/* Tradeoffs & Improvements */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Tradeoffs & what I'd improve next</h2>
        <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Tradeoffs made</h3>
              <ul className="space-y-2 text-black/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>Event sourcing complexity:</strong> Added operational overhead but provides complete auditability. Worth it for financial systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>Redis for idempotency:</strong> Single point of failure, but necessary for performance. Mitigated with Redis Cluster and fallback to database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>PostgreSQL for everything:</strong> Not optimized for analytics, but simplifies operations. Planning to add read replicas and materialized views.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Next improvements</h3>
              <ul className="space-y-2 text-black/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>Read replicas:</strong> Offload reporting queries to dedicated read replicas to reduce load on primary database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>Streaming reconciliation:</strong> Move from batch jobs to event-driven reconciliation for near-real-time matching.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>Multi-region support:</strong> Add active-active replication for disaster recovery and lower latency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>GraphQL API:</strong> Add GraphQL layer for mobile clients to reduce over-fetching and improve performance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span><strong>ML-based fraud detection:</strong> Enhance rule-based risk checks with machine learning models for anomaly detection.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs text-black/50">
        <Link href="/" className="hover:text-black transition-colors">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}

