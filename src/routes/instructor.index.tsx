import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { StatusDot } from "@/components/attendance/StatusBadge";
import { ROSTER, type Learner, type Status } from "@/components/attendance/data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WifiOff, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/instructor/")({
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
  const [confirmStage, setConfirmStage] = useState<"hidden" | "review" | "submitted">("hidden");
  const [submittedAt, setSubmittedAt] = useState<string>("");

  const counts = {
    present: roster.filter((r) => r.status === "present").length,
    late: roster.filter((r) => r.status === "late").length,
    absent: roster.filter((r) => r.status === "absent").length,
    excused: roster.filter((r) => r.status === "excused").length,
    pending: roster.filter((r) => r.status === "pending").length,
  };
  const checkedIn = counts.present + counts.late;
  const absentTotal = counts.absent + counts.pending;

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

  const openConfirm = () => setConfirmStage("review");
  const submitRoster = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
    setSubmittedAt(time);
    setConfirmStage("submitted");
  };
  const closeConfirm = () => setConfirmStage("hidden");

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
                <span className="flex-1">
                  <span className="block text-sm font-medium">{l.name}</span>
                  {l.checkInTime && (
                    <span className="block text-[11px] text-muted-foreground">in at {l.checkInTime}</span>
                  )}
                </span>
                <StatusDot status={l.status} />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <div className="sticky bottom-[57px] z-10 border-t bg-background/95 p-3 backdrop-blur">
          <Button className="w-full" size="lg" onClick={openConfirm}>
            Confirm Roster
          </Button>
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

      <Dialog open={confirmStage !== "hidden"} onOpenChange={(o) => !o && closeConfirm()}>
        <DialogContent className="max-w-[360px] rounded-2xl">
          {confirmStage === "review" && (
            <>
              <DialogHeader>
                <DialogTitle>Confirm roster for Session 14</DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-2 text-sm">
                <div className="rounded-xl border bg-card p-3">
                  <Row label="Present" value={counts.present} tone="text-success" />
                  <Row label="Late" value={counts.late} tone="text-warning-foreground" />
                  <Row label="Absent" value={absentTotal} tone="text-destructive" />
                  {counts.excused > 0 && <Row label="Excused" value={counts.excused} tone="text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  Once you submit, learners see their status within 5 minutes. Disputes open for 48 hours.
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={closeConfirm}>Keep editing</Button>
                <Button className="flex-1" onClick={submitRoster}>
                  Submit to LMS <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </>
          )}

          {confirmStage === "submitted" && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">Roster submitted</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-3 py-2 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-base font-semibold">Roster submitted to LMS</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {counts.present} Present · {counts.late} Late · {absentTotal} Absent · synced at {submittedAt}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Learners will receive a push notification within 5 minutes. You can still raise a correction up to end-of-day.
                </p>
                <Button className="w-full" onClick={closeConfirm}>Done</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MobileShell>
  );
}

function Row({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${tone}`}>{value}</span>
    </div>
  );
}
