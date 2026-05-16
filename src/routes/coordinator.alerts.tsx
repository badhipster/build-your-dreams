import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { AlertTriangle, CheckCircle2, Clock, Filter } from "lucide-react";

export const Route = createFileRoute("/coordinator/alerts")({
  head: () => ({ meta: [{ title: "Alerts · Coordinator" }] }),
  component: Page,
});

type Severity = "high" | "medium" | "low";
type Status = "open" | "resolved";

type Alert = {
  id: string;
  kind: string;
  title: string;
  meta: string;
  severity: Severity;
  status: Status;
  age: string;
};

const ALERTS: Alert[] = [
  { id: "a1", kind: "Unconfirmed roster", title: "Session 14 · AI for B2B Marketing", meta: "Anika Rao · 2h overdue", severity: "high", status: "open", age: "2h" },
  { id: "a2", kind: "Open dispute", title: "Kabir Ahuja · Session 13 Late", meta: "Metro disruption claim · evidence pending", severity: "medium", status: "open", age: "4h" },
  { id: "a3", kind: "Watchlist", title: "Ishaan Kapoor · 71%", meta: "4 absences this month · trend down", severity: "high", status: "open", age: "1d" },
  { id: "a4", kind: "Watchlist", title: "Aditya Rao · 76%", meta: "3 absences this month · stable", severity: "medium", status: "open", age: "1d" },
  { id: "a5", kind: "Late session start", title: "Session 14 started 8 min late", meta: "Instructor flagged AC outage · ops notified", severity: "low", status: "resolved", age: "today" },
  { id: "a6", kind: "Resolved dispute", title: "Diya Sharma · Session 11", meta: "Approved as Excused · family emergency", severity: "low", status: "resolved", age: "yesterday" },
  { id: "a7", kind: "Resolved nudge", title: "Anika Rao confirmed Session 12 roster", meta: "Confirmed 22 min after nudge", severity: "low", status: "resolved", age: "5d" },
];

function SevDot({ s }: { s: Severity }) {
  const cls = s === "high" ? "bg-destructive" : s === "medium" ? "bg-warning" : "bg-muted-foreground/40";
  return <span className={`inline-block h-2 w-2 rounded-full ${cls}`} />;
}

function Page() {
  const [tab, setTab] = useState<"open" | "resolved">("open");
  const filtered = ALERTS.filter((a) => a.status === tab);

  const counts = {
    open: ALERTS.filter((a) => a.status === "open").length,
    resolved: ALERTS.filter((a) => a.status === "resolved").length,
  };

  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Alerts <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 align-middle text-[10px] font-semibold text-primary">v2</span></h1>
            <p className="text-xs text-muted-foreground">Cohort PGP-AI-LED-MKT-01 · all sources</p>
          </div>
          <button className="rounded-full border bg-card p-2 text-muted-foreground">
            <Filter className="h-4 w-4" />
          </button>
        </header>

        <div className="grid grid-cols-2 gap-1 rounded-2xl border bg-card p-1">
          <button
            onClick={() => setTab("open")}
            className={`rounded-xl px-3 py-2 text-sm font-medium ${tab === "open" ? "bg-foreground text-background" : "text-muted-foreground"}`}
          >
            Open · {counts.open}
          </button>
          <button
            onClick={() => setTab("resolved")}
            className={`rounded-xl px-3 py-2 text-sm font-medium ${tab === "resolved" ? "bg-foreground text-background" : "text-muted-foreground"}`}
          >
            Resolved · {counts.resolved}
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card">
          {filtered.map((a, i) => (
            <AlertRow key={a.id} a={a} divider={i !== 0} />
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No {tab} alerts.
            </div>
          )}
        </div>

        <p className="px-1 text-[11px] text-muted-foreground">
          Severity dot: red high, amber medium, grey low. Resolved items archived after 30 days.
        </p>
      </div>
    </MobileShell>
  );
}

function AlertRow({ a, divider }: { a: Alert; divider: boolean }) {
  const body = (
    <div className="flex items-start gap-2">
      {a.status === "open" ? <AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-warning-foreground" /> : <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-success" />}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{a.kind}</p>
          <SevDot s={a.severity} />
        </div>
        <p className="mt-0.5 truncate text-sm font-medium">{a.title}</p>
        <p className="text-[11px] text-muted-foreground">{a.meta}</p>
      </div>
      <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
        <Clock className="h-3 w-3" /> {a.age}
      </span>
    </div>
  );
  const cls = `block px-4 py-3 ${divider ? "border-t" : ""}`;
  if (a.status === "open") {
    return <Link to="/coordinator" className={`${cls} hover:bg-muted/40`}>{body}</Link>;
  }
  return <div className={cls}>{body}</div>;
}
