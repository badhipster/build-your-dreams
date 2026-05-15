import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Percent, AlarmClock, Users, MessageSquare, ShieldCheck, LogOut } from "lucide-react";

export const Route = createFileRoute("/coordinator/settings")({
  head: () => ({ meta: [{ title: "Settings · Coordinator" }] }),
  component: Page,
});

function Page() {
  const [autoNudge, setAutoNudge] = useState(true);
  const [parentDigest, setParentDigest] = useState(true);
  const [disputeDeadlineHint, setDisputeDeadlineHint] = useState(true);

  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <h1 className="text-xl font-semibold tracking-tight">Cohort settings <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 align-middle text-[10px] font-semibold text-primary">v2</span></h1>
          <p className="text-xs text-muted-foreground">PGP-AI-LED-MKT-01 · Vikram Nair</p>
        </header>

        <div className="rounded-2xl border bg-card">
          <Group title="Thresholds">
            <ReadOnly
              icon={<Percent className="h-4 w-4" />}
              title="Completion threshold"
              value="80%"
              hint="Below this, learners forfeit the completion certificate"
            />
            <ReadOnly
              icon={<Percent className="h-4 w-4" />}
              title="Watchlist threshold"
              value="75%"
              hint="Triggers coordinator outreach"
            />
            <ReadOnly
              icon={<AlarmClock className="h-4 w-4" />}
              title="Late grace window"
              value="15 minutes"
              hint="After session start, check-ins are marked Late"
            />
            <ReadOnly
              icon={<AlarmClock className="h-4 w-4" />}
              title="Absent cutoff"
              value="30 minutes"
              hint="After this, learners default to Absent unless instructor overrides"
            />
          </Group>

          <Group title="Automation" border>
            <Toggle
              icon={<MessageSquare className="h-4 w-4" />}
              title="Auto-nudge unconfirmed rosters"
              sub="Push + SMS to instructor 2 hours after end-of-session"
              checked={autoNudge}
              onChange={setAutoNudge}
            />
            <Toggle
              icon={<Users className="h-4 w-4" />}
              title="Friday parent digest"
              sub="Weekly attendance email to opted-in parents"
              checked={parentDigest}
              onChange={setParentDigest}
            />
            <Toggle
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Show 48h dispute hint to learners"
              sub="Reminds learners they can dispute within 48 hours"
              checked={disputeDeadlineHint}
              onChange={setDisputeDeadlineHint}
            />
          </Group>
        </div>

        <button className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <p className="px-1 text-[11px] text-muted-foreground">
          Threshold changes apply at the start of the next session day. Audit log captures every change.
        </p>
      </div>
    </MobileShell>
  );
}

function Group({ title, border, children }: { title: string; border?: boolean; children: React.ReactNode }) {
  return (
    <div className={border ? "border-t" : ""}>
      <p className="px-4 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="divide-y">{children}</div>
    </div>
  );
}

function Toggle({
  icon,
  title,
  sub,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function ReadOnly({ icon, title, value, hint }: { icon: React.ReactNode; title: string; value: string; hint: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
      <p className="text-right text-sm font-semibold">{value}</p>
    </div>
  );
}
