import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/attendance/Shell";
import { StatusBadge } from "@/components/attendance/StatusBadge";
import { LEARNER_SESSIONS } from "@/components/attendance/data";
import { Award } from "lucide-react";

export const Route = createFileRoute("/learner/dashboard")({
  head: () => ({
    meta: [{ title: "Your Attendance · Kraftshala" }],
  }),
  component: Page,
});

function Page() {
  const pct = 92;
  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <p className="text-xs font-medium text-muted-foreground">Cohort PGP-AI-LED-MKT-01</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">Your Attendance</h1>
        </header>

        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-5xl font-semibold tracking-tight">{pct}%</p>
              <p className="text-xs text-muted-foreground">24 of 26 sessions</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
              <Award className="h-3.5 w-3.5" /> On track
            </span>
          </div>
          <div className="mt-4">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="absolute inset-y-0 left-0 bg-success" style={{ width: `${pct}%` }} />
              <div className="absolute inset-y-[-3px] w-px bg-foreground/40" style={{ left: "80%" }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
              <span>0%</span>
              <span style={{ marginLeft: "calc(80% - 24px)" }}>80% threshold</span>
              <span>100%</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Eligible for completion certificate · threshold 80%.
          </p>
        </div>

        <div>
          <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent sessions
          </h2>
          <div className="overflow-hidden rounded-2xl border bg-card">
            {LEARNER_SESSIONS.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  i !== 0 ? "border-t" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Session {s.n} · {s.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {s.date}
                    {s.dispute && (
                      <span className="ml-2 rounded-full bg-warning/15 px-1.5 py-0.5 text-[10px] font-medium text-warning-foreground">
                        Dispute raised · under review
                      </span>
                    )}
                  </p>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}