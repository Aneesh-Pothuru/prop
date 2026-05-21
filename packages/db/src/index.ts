/**
 * @stoa/db — Drizzle schema + RLS contract.
 * Connection setup happens at the consumer (apps/web or services/agents)
 * because edge runtime vs node runtime takes different drivers.
 */
export * as schema from "./schema";
export type {
  // re-export the row types in case consumers want them
} from "./schema";
