import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/attendance/Shell";
import { Check, CalendarClock, Users } from "lucide-react";

export const Route = createFileRoute("/instructor/sessions")({
  head: () => ({ meta: [{ title: "Sessions · Instructor" }] }),
  component: Page,
});

type Row = {
  id: string;
  n: number;
  title: string;
  date: string;
  time: string;
  pct: number;
  state: "upcoming" | "live" | "confirmed";
};

const ROWS: Row[] = [
  { id: "s15", n: 15, title: "Performance Creative Sprint II", date: "Thu 13 Mar", time: "10:00 AM – 12:00 PM", pct: 0, state: "upcoming" },
  { id: "s14", n: 14, title: "AI for B2B Marketing", date: "Wed 12 Mar", time: "9:00 AM – 11:00 AM", pct: 73, state: "live" },
  { id: "s13", n: 13, title: "Agentic Workflows with n8n", date: "Mon 10 Mar", time: "9:00 AM – 11:00 AM", pct: 90, state: "confirmed" },
  { id: "s12", n: 12, title: "Performance Creative Sprint", date: "Fri 8 Mar", time: "9:00 AM – 11:00 AM", pct: 87, state: "confirmed" },
  { id: "s11", n: 11, title: "Cohort Business Review", date: "Wed 6 Mar", time: "2:00 PM – 4:00 PM", pct: 83, state: "confirmed" },
  { id: "s10", n: 10, title: "Generative Content Systems", date: "Mon 4 Mar", time: "9:00 AM – 11:00 AM", pct: 93, state: "confirmed" },
  { id: "s09", n: 9, title: "Performance Marketing Foundations", date: "Fri 1 Mar", time: "9:00 AM – 11:00 AM", pct: 80, state: "confirmed" },
];

function StateChip({ state }: { state: Row["state"] }) {
  if (state === "upcoming") {
    return <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">Upcoming</span>;
  }
  if (state === "live") {
    return <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">Live now</span>;
  }
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
      <Check className="h-3 w-3" /> Confirmed
    </span>
  );
}

function Page() {
  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <p className="text-xs font-medium text-muted-foreground">Cohort PGP-AI-LED-MKT-01</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">Your sessions <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 align-middle text-[10px] font-semibold text-primary">v2</span></h1>
          <p className="text-xs text-muted-foreground">Past 14 days · taught by Anika Rao</p>
        </header>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border bg-card p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Avg attendance</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">87%</p>
            <p className="text-[11px] text-muted-foreground">across 6 confirmed</p>
          </div>
          <div className="rounded-2xl border bg-card p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">On-time confirm</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">5 / 6</p>
            <p className="text-[11px] text-muted-foreground">within 30 min of EOS</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card">
          {ROWS.map((s, i) => (
            <Row key={s.id} s={s} divider={i !== 0} />
          ))}
        </div>

        <p className="px-1 text-[11px] text-muted-foreground">
          Tap a confirmed session to view the full roster or raise a post-hoc correction (within 24 hours of EOS).
        </p>
      </div>
    </MobileShell>
  );
}

function Row({ s, divider }: { s: Row; divider: boolean }) {
  const body = (
    <>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">Session {s.n} · {s.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarClock className="h-3 w-3" /> {s.date} · {s.time}
                  </p>
                </div>
                <StateChip state={s.state} />
              </div>
              {s.state !== "upcoming" && (
                <div className="mt-2 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium">{s.pct}% attendance</span>
                  <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`absolute inset-y-0 left-0 ${s.pct >= 80 ? "bg-success" : "bg-warning"}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              )}
    </>
  );
  const cls = `block px-4 py-3 ${divider ? "border-t" : ""}`;
  if (s.state === "upcoming") {
    return <div className={cls}>{body}</div>;
  }
  return (
    <Link to="/instructor" className={`${cls} hover:bg-muted/40`}>{body}</Link>
  );
}
