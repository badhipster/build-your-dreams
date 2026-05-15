import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { Switch } from "@/components/ui/switch";
import { Mail, Phone, MapPin, Bell, ChevronRight, LogOut, BookOpen } from "lucide-react";

export const Route = createFileRoute("/learner/profile")({
  head: () => ({ meta: [{ title: "Profile · Learner" }] }),
  component: Page,
});

function Page() {
  const [push, setPush] = useState(true);
  const [parentDigest, setParentDigest] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);

  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-base font-semibold text-primary">DS</span>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Diya Sharma</h1>
            <p className="text-xs text-muted-foreground">Cohort PGP-AI-LED-MKT-01 · seat #14</p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Attendance" value="92%" sub="this term" />
          <Stat label="On-time" value="86%" sub="of present" />
          <Stat label="Disputes" value="1" sub="under review" />
        </div>

        <div className="rounded-2xl border bg-card">
          <Group title="Contact">
            <Row icon={<Mail className="h-4 w-4" />} title="diya.sharma@gmail.com" sub="primary email" />
            <Row icon={<Phone className="h-4 w-4" />} title="+91 98xxx xxx08" sub="primary phone · WhatsApp enabled" />
            <Row icon={<MapPin className="h-4 w-4" />} title="Gurugram · 4.2 km from campus" sub="commute by metro + bus" />
          </Group>

          <Group title="Notifications" border>
            <Toggle
              icon={<Bell className="h-4 w-4" />}
              title="Push notifications"
              sub="When your attendance is updated or a dispute resolves"
              checked={push}
              onChange={setPush}
            />
            <Toggle
              icon={<Mail className="h-4 w-4" />}
              title="Parent Friday digest"
              sub="Weekly summary to your linked guardian"
              checked={parentDigest}
              onChange={setParentDigest}
            />
            <Toggle
              icon={<Phone className="h-4 w-4" />}
              title="WhatsApp reminders"
              sub="Session reminders 60 min before start"
              checked={whatsapp}
              onChange={setWhatsapp}
            />
          </Group>

          <Group title="Program" border>
            <ButtonRow icon={<BookOpen className="h-4 w-4" />} title="Program handbook" sub="Attendance policy · disputes · escalations" />
            <ButtonRow icon={<Bell className="h-4 w-4" />} title="Raise a non-attendance concern" sub="Routes to your Student Success POC" />
          </Group>
        </div>

        <button className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <LogOut className="h-4 w-4" /> Sign out
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <p className="px-1 text-[11px] text-muted-foreground">
          Profile data syncs from the Kraftshala LMS. Reach out to programs@kraftshala.com to correct anything that looks off.
        </p>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border bg-card p-3 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
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

function Row({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function ButtonRow({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <button className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/40">
      <span className="text-muted-foreground">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
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
