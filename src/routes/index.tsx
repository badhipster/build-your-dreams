import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ScanLine, Check, Clock, Info, MapPin, CalendarDays } from "lucide-react";
import { MobileShell } from "@/components/attendance/Shell";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Check In · Kraftshala Attendance" },
      { name: "description", content: "Scan to check in to today's session." },
    ],
  }),
  component: CheckInPage,
});

type View = "idle" | "scanning" | "present" | "late";

function CheckInPage() {
  const [view, setView] = useState<View>("idle");

  const startScan = () => {
    setView("scanning");
    setTimeout(() => setView("present"), 1600);
  };

  return (
    <MobileShell>
      <div className="flex h-full flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <p className="text-xs font-medium text-muted-foreground">Today · 9:00 AM IST</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">Session 14</h1>
          <p className="text-sm text-muted-foreground">AI for B2B Marketing</p>
        </header>

        <div className="rounded-2xl border bg-card p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Confirm before scanning</p>
          <div className="mt-2 space-y-1.5 text-sm">
            <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-muted-foreground" /> Wed 12 Mar · 9:00–11:00 AM</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> Studio B, Kraftshala Campus</div>
          </div>
        </div>

        {view === "idle" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="relative flex h-48 w-48 items-center justify-center rounded-3xl border-2 border-dashed border-primary/40 bg-primary/5">
              <ScanLine className="h-16 w-16 text-primary/70" />
            </div>
            <Button size="lg" className="w-full" onClick={startScan}>
              <ScanLine className="mr-2 h-4 w-4" /> Scan to Check In
            </Button>
            <button onClick={() => setView("late")} className="text-xs text-muted-foreground underline">
              Preview late check-in state
            </button>
          </div>
        )}

        {view === "scanning" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border-2 border-primary bg-primary/10">
              <div className="absolute inset-x-0 h-1 animate-[scan_1.4s_ease-in-out_infinite] bg-primary" style={{ top: 0 }} />
              <ScanLine className="absolute inset-0 m-auto h-16 w-16 text-primary" />
            </div>
            <p className="text-sm font-medium">Reading QR…</p>
            <style>{`@keyframes scan { 0%{top:0} 50%{top:calc(100% - 4px)} 100%{top:0} }`}</style>
          </div>
        )}

        {view === "present" && (
          <ResultCard
            tone="success"
            icon={<Check className="h-5 w-5" />}
            title="You're marked Present"
            time="9:02 AM"
            note="Synced with the LMS · visible to your instructor."
            onReset={() => setView("idle")}
          />
        )}

        {view === "late" && (
          <ResultCard
            tone="warning"
            icon={<Clock className="h-5 w-5" />}
            title="Marked Late"
            time="arrived 9:24 AM"
            note={
              <span className="inline-flex items-center gap-1">
                Late after 9:15 AM grace window.
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="inline-flex items-center gap-0.5 underline"><Info className="h-3 w-3" /> Why?</button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[220px] text-xs">
                      Sessions allow a 15-min grace. Check-ins after 9:15 AM are flagged Late automatically.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            }
            onReset={() => setView("idle")}
            dispute
          />
        )}
      </div>
    </MobileShell>
  );
}

function ResultCard({
  tone,
  icon,
  title,
  time,
  note,
  onReset,
  dispute,
}: {
  tone: "success" | "warning";
  icon: React.ReactNode;
  title: string;
  time: string;
  note: React.ReactNode;
  onReset: () => void;
  dispute?: boolean;
}) {
  const cls =
    tone === "success"
      ? "border-success/30 bg-success/10 text-success"
      : "border-warning/40 bg-warning/15 text-warning-foreground";
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className={`rounded-2xl border-2 p-5 ${cls}`}>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/60">
            {icon}
          </span>
          <div>
            <p className="text-base font-semibold leading-tight">{title}</p>
            <p className="text-xs opacity-80">{time}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground/90">{note}</p>
        {dispute && (
          <button className="mt-3 text-xs font-medium text-foreground underline">
            This isn't right? Raise a dispute
          </button>
        )}
      </div>
      <Link to="/learner/dashboard" className="text-center text-xs font-medium text-muted-foreground underline">
        View attendance dashboard →
      </Link>
      <Button variant="outline" onClick={onReset}>Reset demo</Button>
    </div>
  );
}