import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, BellRing, WifiOff, Clock3, FileText, LogOut } from "lucide-react";

export const Route = createFileRoute("/instructor/settings")({
  head: () => ({ meta: [{ title: "Settings · Instructor" }] }),
  component: Page,
});

function Page() {
  const [smsBackup, setSmsBackup] = useState(true);
  const [offlineCache, setOfflineCache] = useState(true);
  const [endOfDayReminder, setEndOfDayReminder] = useState(true);

  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
          <p className="text-xs text-muted-foreground">Anika Rao · instructor for PGP-AI-LED-MKT-01</p>
        </header>

        <div className="rounded-2xl border bg-card">
          <Group title="Notifications">
            <Toggle
              icon={<BellRing className="h-4 w-4" />}
              title="SMS backup for nudges"
              sub="Push + SMS when coordinator nudges you"
              checked={smsBackup}
              onChange={setSmsBackup}
            />
            <Toggle
              icon={<Clock3 className="h-4 w-4" />}
              title="End-of-day confirm reminder"
              sub="Reminder at 5:30 PM if any roster is still pending"
              checked={endOfDayReminder}
              onChange={setEndOfDayReminder}
            />
          </Group>

          <Group title="Classroom" border>
            <Toggle
              icon={<WifiOff className="h-4 w-4" />}
              title="Pre-cache roster on WiFi"
              sub="Auto-downloads today's roster when you connect to campus WiFi"
              checked={offlineCache}
              onChange={setOfflineCache}
            />
            <ReadOnly
              icon={<Clock3 className="h-4 w-4" />}
              title="Late grace window"
              value="15 minutes"
              hint="Coordinator-managed"
            />
            <ReadOnly
              icon={<FileText className="h-4 w-4" />}
              title="Default override reasons"
              value="Traffic, Medical, Family emergency, Other"
              hint="Tap to edit templates"
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
          Build v0.4.2 · prototype mode. Real instances would version-control settings via the LMS admin.
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
      <p className="max-w-[140px] truncate text-right text-xs text-muted-foreground">{value}</p>
    </div>
  );
}
