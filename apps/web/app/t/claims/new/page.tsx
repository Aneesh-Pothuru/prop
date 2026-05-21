"use client";
import * as React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Droplets,
  Zap,
  KeyRound,
  Wind,
  Bug,
  AlertTriangle,
  Wrench,
  Camera,
  Mic,
  ArrowRight,
} from "lucide-react";

const categories = [
  { id: "electrical", label: "Electrical", icon: Zap, hint: "Outlets, lights, breakers" },
  { id: "plumbing", label: "Plumbing", icon: Droplets, hint: "Leaks, drains, water" },
  { id: "hvac", label: "Heating · AC", icon: Wind, hint: "Furnace, AC, thermostat" },
  { id: "lock", label: "Locks · keys", icon: KeyRound, hint: "Lockouts, broken locks" },
  { id: "pest", label: "Pests", icon: Bug, hint: "Insects, rodents" },
  { id: "appliance", label: "Appliances", icon: Wrench, hint: "Fridge, oven, washer" },
];

export default function NewClaimPage() {
  const [selected, setSelected] = React.useState<string | null>("electrical");
  const [urgency, setUrgency] = React.useState<string>("medium");
  const [text, setText] = React.useState(
    "Outlet in kitchen sparked when I plugged in the toaster. Tripped the breaker. Smells faintly of plastic."
  );

  return (
    <div className="px-5 space-y-6">
      <Link href="/t" className="inline-flex items-center gap-1 text-[13px] text-text-secondary">
        <ChevronLeft className="h-3.5 w-3.5" /> Home
      </Link>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
          Report an issue
        </p>
        <h1 className="mt-1 font-display text-[28px] leading-[1.1] tracking-tight text-text-primary">
          What's going on?
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          Pick a category. Add a photo if you can. We'll take it from there.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {categories.map((c) => {
          const active = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={[
                "rounded-xl p-4 text-left transition-all duration-180",
                active
                  ? "bg-[var(--surface-paper)] ring-1 ring-brass-500 shadow-md"
                  : "bg-[var(--surface-paper)] shadow-hairline hover:shadow-md",
              ].join(" ")}
            >
              <div
                className={[
                  "h-9 w-9 rounded-lg flex items-center justify-center mb-3",
                  active ? "bg-brass-500 text-ink-900" : "bg-cream-100 text-text-secondary",
                ].join(" ")}
              >
                <c.icon className="h-4.5 w-4.5" />
              </div>
              <div className="text-[14px] font-medium text-text-primary">{c.label}</div>
              <div className="text-[12px] text-text-muted">{c.hint}</div>
            </button>
          );
        })}
      </div>

      {/* Urgency */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted mb-3">
          Urgency
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "low", label: "Not urgent", desc: "Whenever" },
            { id: "medium", label: "Soon", desc: "This week" },
            { id: "high", label: "Now", desc: "Today, please" },
          ].map((u) => {
            const active = urgency === u.id;
            return (
              <button
                key={u.id}
                onClick={() => setUrgency(u.id)}
                className={[
                  "rounded-xl p-3 text-left transition-all duration-180",
                  active
                    ? u.id === "high"
                      ? "bg-[var(--signal-danger-bg)] ring-1 ring-[var(--signal-danger-border)]"
                      : "bg-[var(--surface-paper)] ring-1 ring-brass-500"
                    : "bg-[var(--surface-paper)] shadow-hairline hover:shadow-md",
                ].join(" ")}
              >
                <div className="text-[13.5px] font-medium text-text-primary">{u.label}</div>
                <div className="text-[11px] text-text-muted">{u.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-text-muted mb-3">
          Tell us what's happening
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-xl bg-[var(--surface-paper)] p-4 text-[14.5px] leading-[22px] text-text-primary placeholder:text-text-placeholder shadow-hairline focus:outline-none focus:ring-1 focus:ring-brass-500"
          placeholder="Be as detailed as you like. We'll ask follow-ups if needed."
        />
        <div className="mt-3 flex gap-2">
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--surface-paper)] py-3 text-[13px] text-text-secondary shadow-hairline">
            <Camera className="h-4 w-4" /> Photo
          </button>
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--surface-paper)] py-3 text-[13px] text-text-secondary shadow-hairline">
            <Mic className="h-4 w-4" /> Voice note
          </button>
        </div>
      </div>

      {/* What happens next */}
      <div className="rounded-xl bg-cream-100 p-4 text-[13px] text-text-secondary leading-[20px]">
        <div className="flex items-center gap-2 mb-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          <span className="font-medium text-text-primary text-[13.5px]">What happens next</span>
        </div>
        Diagnosis will ask 1–4 quick questions, often just to confirm. About half the time you can resolve it yourself. If a visit is needed, your PM is looped in before anyone is sent.
      </div>

      <div className="sticky bottom-24 -mx-5 px-5 bg-gradient-to-t from-[var(--surface-canvas)] from-50% to-transparent pt-2">
        <button className="group w-full rounded-xl bg-brass-500 px-5 py-4 text-[15px] font-medium text-ink-900 hover:bg-brass-600 transition-colors duration-180 flex items-center justify-between">
          <span>Send to Diagnosis</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-180 group-hover:translate-x-0.5" />
        </button>
        <p className="mt-2 text-center text-[12px] text-text-muted">
          You'll get a reply in seconds.
        </p>
      </div>
    </div>
  );
}
