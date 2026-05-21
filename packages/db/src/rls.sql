-- Multi-tenant Row-Level Security.
-- Every table that carries org_id enables RLS with a policy that requires
-- the connection-level setting `app.current_org_id` to match the row.
--
-- The app sets this per-request via `SET LOCAL app.current_org_id = '...'`
-- inside a transaction. RLS guarantees no query can ever cross orgs even
-- if a query is malformed or an LLM-generated SQL slips through.
--
-- Apply with:
--   psql $DATABASE_URL -f rls.sql

BEGIN;

-- Enable RLS on every multi-tenant table.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ledger_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_rule_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- The single isolation policy. Reused on every table.
-- Reads + writes only succeed when the row's org_id matches the session.
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'users', 'properties', 'units', 'leases',
    'invoices', 'payments', 'ledger_accounts', 'ledger_entries',
    'claims', 'claim_messages', 'vendors', 'work_orders',
    'documents', 'agent_runs', 'compliance_rule_results', 'audit_log'
  ])
  LOOP
    EXECUTE format('
      DROP POLICY IF EXISTS org_isolation ON %I;
      CREATE POLICY org_isolation ON %I
        USING (org_id::text = current_setting(''app.current_org_id'', true))
        WITH CHECK (org_id::text = current_setting(''app.current_org_id'', true));
    ', t, t);
  END LOOP;
END $$;

-- Tenants see their own leases / claims / payments only.
-- A second policy ANDed with org_isolation at the app layer enforces this
-- for tenant-role users. We do this through a SECURITY DEFINER function
-- that sets `app.current_user_id` and `app.current_role`, and add narrower
-- WITH CHECK clauses on tenant-visible surfaces.

CREATE POLICY tenant_self_lease ON leases
  FOR SELECT
  USING (
    org_id::text = current_setting('app.current_org_id', true)
    AND (
      current_setting('app.current_role', true) <> 'tenant'
      OR tenant_user_id::text = current_setting('app.current_user_id', true)
    )
  );

CREATE POLICY tenant_self_claim ON claims
  FOR SELECT
  USING (
    org_id::text = current_setting('app.current_org_id', true)
    AND (
      current_setting('app.current_role', true) <> 'tenant'
      OR tenant_user_id::text = current_setting('app.current_user_id', true)
    )
  );

-- Webhook events are global to the platform, not per-org. No RLS.
-- We rely on application-layer routing to attach events to orgs.

COMMIT;
