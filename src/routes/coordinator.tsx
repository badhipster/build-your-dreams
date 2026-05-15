import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/attendance/Shell";
import { ALERTS } from "@/components/attendance/data";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/coordinator")({
  head: () => ({
    meta: [{ title: "Coordinator · Kraftshala Attendance" }],
  }),
  component: Page,
});

function Stat({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: string }) {
  return (
    <div className="rounded-2xl border bg-card p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-semibold tracking-tight ${accent ?? ""}`}>{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Page() {
  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <p className="text-xs font-medium text-muted-foreground">Cohort PGP-AI-LED-MKT-01</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">Coordinator overview</h1>
        </header>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Today" value="86%" sub="26/30 in" />
          <Stat label="Week avg" value="89%" sub={"\u2191 2 pts"} />
          <Stat label="On watch" value="3" sub="<75%" accent="text-destructive" />
        </div>

        <div className="rounded-2xl border bg-card p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Cohort trend</p>
            <span className="inline-flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3.5 w-3.5" /> Up vs last week
            </span>
          </div>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {[78, 82, 85, 80, 88, 91, 86].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-primary/70" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            {["M", "T", "W", "T", "F", "M", "T"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>

        <div>
          <h2 className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <AlertTriangle className="h-3.5 w-3.5" /> Needs attention
          </h2>
          <div className="space-y-2">
            {ALERTS.map((a) => (
              <div key={a.id} className="rounded-2xl border bg-card p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-warning-foreground">{a.kind}</p>
                <p className="mt-1 text-sm font-medium">{a.detail}</p>
                <p className="text-[11px] text-muted-foreground">{a.meta}</p>
                <Button size="sm" variant="outline" className="mt-3 w-full">
                  {a.cta} <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileShell>
  );
}