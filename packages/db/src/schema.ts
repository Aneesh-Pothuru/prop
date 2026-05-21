/**
 * Drizzle schema — the data model contract.
 *
 * Multi-tenant invariants:
 *   1. Every row that belongs to a customer carries `org_id`.
 *   2. Postgres RLS (see rls.sql) enforces that no query crosses orgs.
 *   3. Money is stored as bigint cents. Never float.
 *   4. Every agent-driven mutation writes to both `agent_runs` (trace)
 *      and `audit_log` (reversibility surface).
 *   5. Soft-delete via `deleted_at` is the only deletion path for
 *      financial rows. Hard delete is reserved for GDPR/CCPA requests
 *      and goes through a runbook.
 *
 * See docs/research/03-ca-compliance.md for the rules these fields back.
 */

import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  bigint,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  uniqueIndex,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────

export const userRole = pgEnum("user_role", [
  "pm",
  "owner",
  "tenant",
  "contractor",
  "support",
]);

export const propertyType = pgEnum("property_type", [
  "single_family",
  "multi_family",
  "commercial",
  "short_term_rental",
]);

export const leaseStatus = pgEnum("lease_status", [
  "draft",
  "pending_signature",
  "active",
  "ending_soon",
  "expired",
  "month_to_month",
  "terminated",
]);

export const claimStatus = pgEnum("claim_status", [
  "new",
  "in_progress",
  "awaiting_tenant",
  "awaiting_pm",
  "resolved",
  "blocked",
  "duplicate",
  "withdrawn",
]);

export const claimCategory = pgEnum("claim_category", [
  "electrical",
  "plumbing",
  "hvac",
  "appliance",
  "lock",
  "pest",
  "structural",
  "noise",
  "other",
]);

export const claimUrgency = pgEnum("claim_urgency", [
  "low",
  "medium",
  "high",
  "emergency",
]);

export const paymentMethod = pgEnum("payment_method", [
  "ach",
  "card",
  "cash",
  "check",
  "money_order",
  "adjustment",
]);

export const paymentStatus = pgEnum("payment_status", [
  "pending",
  "processing",
  "succeeded",
  "failed",
  "refunded",
  "disputed",
]);

export const ledgerEntryType = pgEnum("ledger_entry_type", [
  "invoice",
  "payment",
  "credit",
  "late_fee",
  "reversal",
  "manual_adjustment",
  "owner_disbursement",
  "mgmt_fee",
  "reserve_contribution",
]);

export const agentName = pgEnum("agent_name", [
  "triage",
  "diagnosis",
  "dispatch",
  "ledger",
  "communications",
  "compliance",
  "knowledge",
  "owner_reporting",
  "leasing",
]);

// ─── Orgs + Users ─────────────────────────────────────────────────────

export const orgs = pgTable("orgs", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: text("name").notNull(),
  pmCompanyName: text("pm_company_name"),
  brokerLicense: varchar("broker_license", { length: 32 }), // CalBRE
  trustAccountId: uuid("trust_account_id"),
  defaultJurisdiction: varchar("default_jurisdiction", { length: 64 }).default("CA"),
  planTier: varchar("plan_tier", { length: 16 }).default("free"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    email: varchar("email", { length: 256 }).notNull(),
    fullName: text("full_name"),
    role: userRole("role").notNull(),
    phone: varchar("phone", { length: 32 }),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => ({
    emailUq: uniqueIndex("users_email_org_uq").on(t.orgId, t.email),
    orgIdx: index("users_org_idx").on(t.orgId),
  })
);

// ─── Properties / Units / Leases ──────────────────────────────────────

export const properties = pgTable(
  "properties",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    address1: text("address1").notNull(),
    address2: text("address2"),
    city: varchar("city", { length: 128 }).notNull(),
    state: varchar("state", { length: 2 }).notNull(),
    zip: varchar("zip", { length: 10 }).notNull(),
    jurisdictionCity: varchar("jurisdiction_city", { length: 64 }), // for AB-1482 + city rent control overlays
    type: propertyType("type").notNull(),
    yearBuilt: integer("year_built"),
    ownerUserId: uuid("owner_user_id").references(() => users.id),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => ({ orgIdx: index("properties_org_idx").on(t.orgId) })
);

export const units = pgTable(
  "units",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    propertyId: uuid("property_id").notNull().references(() => properties.id, { onDelete: "cascade" }),
    label: text("label").notNull(), // "B", "3A", "Unit 12"
    beds: integer("beds"),
    baths: integer("baths"),
    sqft: integer("sqft"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => ({
    propIdx: index("units_property_idx").on(t.propertyId),
    orgIdx: index("units_org_idx").on(t.orgId),
  })
);

export const leases = pgTable(
  "leases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    unitId: uuid("unit_id").notNull().references(() => units.id),
    tenantUserId: uuid("tenant_user_id").references(() => users.id),
    status: leaseStatus("status").notNull().default("draft"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    monthlyRentCents: bigint("monthly_rent_cents", { mode: "number" }).notNull(),
    depositCents: bigint("deposit_cents", { mode: "number" }).notNull(),
    // AB-12 enforcement: deposit_cents must be <= monthly_rent_cents (1x rent cap eff 7/1/2024)
    // unless small-landlord exemption is claimed
    lateFeePolicy: jsonb("late_fee_policy"), // { type: "flat"|"pct", value: 5000|0.05, grace_days: 5 }
    autopayEnabled: boolean("autopay_enabled").default(false),
    rentControlRegime: varchar("rent_control_regime", { length: 32 }), // "ab1482", "la_rso", "sf_chapter_37", "exempt"
    documents: jsonb("documents"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    signedAt: timestamp("signed_at"),
    terminatedAt: timestamp("terminated_at"),
  },
  (t) => ({
    unitIdx: index("leases_unit_idx").on(t.unitId),
    tenantIdx: index("leases_tenant_idx").on(t.tenantUserId),
    orgIdx: index("leases_org_idx").on(t.orgId),
  })
);

// ─── Money: invoices, payments, ledger (double-entry) ─────────────────

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  leaseId: uuid("lease_id").notNull().references(() => leases.id),
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  dueDate: timestamp("due_date").notNull(),
  amountCents: bigint("amount_cents", { mode: "number" }).notNull(),
  lineItems: jsonb("line_items"), // [{ label, cents }]
  status: varchar("status", { length: 16 }).notNull().default("open"), // open|paid|partial|void
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    invoiceId: uuid("invoice_id").references(() => invoices.id),
    leaseId: uuid("lease_id").notNull().references(() => leases.id),
    amountCents: bigint("amount_cents", { mode: "number" }).notNull(),
    method: paymentMethod("method").notNull(),
    status: paymentStatus("status").notNull().default("pending"),
    providerEventId: varchar("provider_event_id", { length: 128 }), // stripe/plaid charge id
    providerPayload: jsonb("provider_payload"),
    processedAt: timestamp("processed_at"),
    refundedAt: timestamp("refunded_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    providerUq: uniqueIndex("payments_provider_event_uq").on(t.providerEventId),
    leaseIdx: index("payments_lease_idx").on(t.leaseId),
  })
);

export const ledgerAccounts = pgTable("ledger_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  kind: varchar("kind", { length: 32 }).notNull(), // "trust", "operating", "owner_a", ...
  label: text("label").notNull(),
  ownerUserId: uuid("owner_user_id").references(() => users.id),
  isClosed: boolean("is_closed").default(false),
});

export const ledgerEntries = pgTable(
  "ledger_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    accountId: uuid("account_id").notNull().references(() => ledgerAccounts.id),
    type: ledgerEntryType("type").notNull(),
    debitCents: bigint("debit_cents", { mode: "number" }).default(0),
    creditCents: bigint("credit_cents", { mode: "number" }).default(0),
    refType: varchar("ref_type", { length: 32 }), // "invoice" | "payment" | "claim" | "manual"
    refId: uuid("ref_id"),
    memo: text("memo"),
    postedAt: timestamp("posted_at").notNull().defaultNow(),
    createdBy: uuid("created_by").references(() => users.id),
    agentRunId: uuid("agent_run_id"), // set if posted by an agent
  },
  (t) => ({
    acctIdx: index("ledger_acct_idx").on(t.accountId),
    refIdx: index("ledger_ref_idx").on(t.refType, t.refId),
  })
);

// ─── Claims (maintenance + general tenant communication) ──────────────

export const claims = pgTable(
  "claims",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    leaseId: uuid("lease_id").notNull().references(() => leases.id),
    tenantUserId: uuid("tenant_user_id").notNull().references(() => users.id),
    category: claimCategory("category").notNull(),
    urgency: claimUrgency("urgency").notNull().default("medium"),
    status: claimStatus("status").notNull().default("new"),
    title: text("title").notNull(),
    description: text("description"),
    summary: text("summary"), // AI-generated short summary
    media: jsonb("media"), // [{ url, type, exif_stripped_at }]
    assignedAgent: agentName("assigned_agent"),
    assignedUserId: uuid("assigned_user_id").references(() => users.id),
    resolvedAt: timestamp("resolved_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => ({
    leaseIdx: index("claims_lease_idx").on(t.leaseId),
    statusIdx: index("claims_status_idx").on(t.orgId, t.status),
  })
);

export const claimMessages = pgTable("claim_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  claimId: uuid("claim_id").notNull().references(() => claims.id, { onDelete: "cascade" }),
  senderUserId: uuid("sender_user_id").references(() => users.id),
  senderAgent: agentName("sender_agent"),
  body: text("body").notNull(),
  media: jsonb("media"),
  isInternal: boolean("is_internal").default(false), // PM-only notes
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Vendors / Work orders / Dispatch ─────────────────────────────────

export const vendors = pgTable("vendors", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  cslbNumber: varchar("cslb_number", { length: 16 }),
  cslbLicenseClasses: text("cslb_license_classes").array(), // ["C-10", "B"]
  cslbVerifiedAt: timestamp("cslb_verified_at"),
  insuranceVerifiedAt: timestamp("insurance_verified_at"),
  phone: varchar("phone", { length: 32 }),
  email: varchar("email", { length: 256 }),
  stripeConnectId: varchar("stripe_connect_id", { length: 128 }),
  source: varchar("source", { length: 16 }).default("pm_imported"), // pm_imported | marketplace
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const workOrders = pgTable("work_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  claimId: uuid("claim_id").notNull().references(() => claims.id),
  vendorId: uuid("vendor_id").references(() => vendors.id),
  quoteCents: bigint("quote_cents", { mode: "number" }),
  scheduledWindow: jsonb("scheduled_window"), // { start, end, tenant_confirmed }
  approvedByUserId: uuid("approved_by_user_id").references(() => users.id),
  approvedAt: timestamp("approved_at"),
  completedAt: timestamp("completed_at"),
  invoiceCents: bigint("invoice_cents", { mode: "number" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Documents, Notices ───────────────────────────────────────────────

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  kind: varchar("kind", { length: 32 }).notNull(), // "lease" | "notice" | "addendum" | "receipt" | ...
  ownerType: varchar("owner_type", { length: 16 }), // "lease" | "claim" | "org"
  ownerId: uuid("owner_id"),
  title: text("title"),
  url: text("url").notNull(), // R2 url
  signedAt: timestamp("signed_at"),
  signerId: uuid("signer_id").references(() => users.id),
  citationCodes: text("citation_codes").array(), // ["AB-1482", "Civ. § 1947.12"]
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Agent traces + compliance + audit ────────────────────────────────

export const agentRuns = pgTable(
  "agent_runs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    agent: agentName("agent").notNull(),
    parentRunId: uuid("parent_run_id"),
    sourceType: varchar("source_type", { length: 32 }), // "claim_message" | "webhook" | "cron" | "user_action"
    sourceId: uuid("source_id"),
    input: jsonb("input"),
    output: jsonb("output"),
    toolCalls: jsonb("tool_calls"), // [{ name, args, result, latency_ms, error }]
    costUsdMicrocents: bigint("cost_usd_microcents", { mode: "number" }).default(0),
    latencyMs: integer("latency_ms"),
    langfuseTraceId: varchar("langfuse_trace_id", { length: 64 }),
    status: varchar("status", { length: 16 }).default("ok"), // ok | err | timeout
    startedAt: timestamp("started_at").notNull().defaultNow(),
    completedAt: timestamp("completed_at"),
  },
  (t) => ({ agentIdx: index("agent_runs_agent_idx").on(t.orgId, t.agent) })
);

export const complianceRuleResults = pgTable("compliance_rule_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
  ruleId: varchar("rule_id", { length: 64 }).notNull(), // "ab-12.deposit-cap"
  citation: varchar("citation", { length: 64 }), // "AB-12 § 1950.5"
  subjectType: varchar("subject_type", { length: 32 }), // "lease" | "payment" | "notice"
  subjectId: uuid("subject_id").notNull(),
  passed: boolean("passed").notNull(),
  blocked: boolean("blocked").notNull().default(false),
  reason: text("reason"),
  overrideUserId: uuid("override_user_id").references(() => users.id),
  overrideReason: text("override_reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull().references(() => orgs.id, { onDelete: "cascade" }),
    actorUserId: uuid("actor_user_id").references(() => users.id),
    actorAgent: agentName("actor_agent"),
    action: varchar("action", { length: 64 }).notNull(), // "claim.create", "payment.refund", ...
    targetType: varchar("target_type", { length: 32 }),
    targetId: uuid("target_id"),
    before: jsonb("before"),
    after: jsonb("after"),
    reversibleUntil: timestamp("reversible_until"),
    reversedAt: timestamp("reversed_at"),
    reversedByUserId: uuid("reversed_by_user_id").references(() => users.id),
    agentRunId: uuid("agent_run_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    targetIdx: index("audit_target_idx").on(t.targetType, t.targetId),
    timeIdx: index("audit_time_idx").on(t.orgId, t.createdAt),
  })
);

// ─── Provider webhooks (idempotency layer) ────────────────────────────

export const webhookEvents = pgTable(
  "webhook_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    provider: varchar("provider", { length: 32 }).notNull(), // stripe | plaid | twilio | resend | docusign
    providerEventId: varchar("provider_event_id", { length: 128 }).notNull(),
    payload: jsonb("payload").notNull(),
    receivedAt: timestamp("received_at").notNull().defaultNow(),
    processedAt: timestamp("processed_at"),
    error: text("error"),
  },
  (t) => ({
    uq: uniqueIndex("webhook_provider_event_uq").on(t.provider, t.providerEventId),
  })
);
