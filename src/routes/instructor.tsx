import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { StatusDot } from "@/components/attendance/StatusBadge";
import { ROSTER, type Learner, type Status } from "@/components/attendance/data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { WifiOff, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/instructor")({
  head: () => ({
    meta: [{ title: "Roster · Kraftshala Attendance" }],
  }),
  component: Page,
});

const STATUS_OPTIONS: { id: Status; label: string }[] = [
  { id: "present", label: "Present" },
  { id: "late", label: "Late" },
  { id: "absent", label: "Absent" },
  { id: "excused", label: "Excused" },
];

function Page() {
  const [roster, setRoster] = useState<Learner[]>(ROSTER);
  const [editing, setEditing] = useState<Learner | null>(null);
  const [draftStatus, setDraftStatus] = useState<Status>("present");
  const [reason, setReason] = useState("");

  const checkedIn = roster.filter((r) => r.status === "present" || r.status === "late").length;

  const openEdit = (l: Learner) => {
    setEditing(l);
    setDraftStatus(l.status === "pending" ? "present" : (l.status as Status));
    setReason("");
  };

  const save = () => {
    if (!editing) return;
    setRoster((r) => r.map((x) => (x.id === editing.id ? { ...x, status: draftStatus } : x)));
    setEditing(null);
  };

  return (
    <MobileShell>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 bg-warning/20 px-4 py-2 text-xs font-medium text-warning-foreground">
          <WifiOff className="h-4 w-4" />
          Offline — 12 updates queued, will sync when online
        </div>

        <div className="px-4 pt-4 pb-3">
          <h1 className="text-xl font-semibold tracking-tight">Session 14</h1>
          <p className="text-sm text-muted-foreground">
            {checkedIn} of 30 checked in · AI for B2B Marketing
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-32">
          <div className="overflow-hidden rounded-2xl border bg-card">
            {roster.map((l, i) => (
              <button
                key={l.id}
                onClick={() => openEdit(l)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40 ${
                  i !== 0 ? "border-t" : ""
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {l.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="flex-1 text-sm font-medium">{l.name}</span>
                <StatusDot status={l.status} />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <div className="sticky bottom-[57px] z-10 border-t bg-background/95 p-3 backdrop-blur">
          <Button className="w-full" size="lg">Confirm Roster</Button>
        </div>
      </div>

      <Sheet open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>{editing?.name}</SheetTitle>
            <p className="text-xs text-muted-foreground">Override attendance status</p>
          </SheetHeader>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {STATUS_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setDraftStatus(o.id)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                  draftStatus === o.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Reason (optional)</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Arrived 9:24 AM after traffic delay"
              rows={3}
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={save}>Save override</Button>
          </div>
        </SheetContent>
      </Sheet>
    </MobileShell>
  );
}