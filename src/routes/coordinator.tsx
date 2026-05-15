import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { ALERTS } from "@/components/attendance/data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, ArrowUpRight, TrendingUp, CheckCircle2, BellRing, Phone, Mail, CalendarPlus } from "lucide-react";

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

type ActiveAction =
  | { kind: "none" }
  | { kind: "nudge"; stage: "confirm" | "sent" }
  | { kind: "dispute"; stage: "review" | "resolved"; resolution?: "approve" | "reject"; reasoning?: string }
  | { kind: "contact"; channel?: "call" | "email" | "schedule"; stage: "menu" | "done" };

function Page() {
  const [action, setAction] = useState<ActiveAction>({ kind: "none" });
  const [disputeNote, setDisputeNote] = useState("");

  const openFor = (alertId: string) => {
    if (alertId === "a1") setAction({ kind: "nudge", stage: "confirm" });
    if (alertId === "a2") {
      setAction({ kind: "dispute", stage: "review" });
      setDisputeNote("");
    }
    if (alertId === "a3") setAction({ kind: "contact", stage: "menu" });
  };
  const close = () => setAction({ kind: "none" });

  return (
    <MobileShell>
      <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
        <header>
          <p className="text-xs font-medium text-muted-foreground">Cohort PGP-AI-LED-MKT-01</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight">Coordinator overview</h1>
        </header>

        <div className="grid grid-cols-3 gap-2">
          <Stat label="Today" value="86%" sub="26/30 in" />
          <Stat label="Week avg" value="89%" sub={"↑ 2 pts"} />
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
                <Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => openFor(a.id)}>
                  {a.cta} <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={action.kind !== "none"} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-[360px] rounded-2xl">
          {/* NUDGE */}
          {action.kind === "nudge" && action.stage === "confirm" && (
            <>
              <DialogHeader>
                <DialogTitle>Nudge Anika Rao</DialogTitle>
              </DialogHeader>
              <div className="mt-1 space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Session 14 roster is unconfirmed for 2 hours. A push notification and SMS will be sent.
                </p>
                <div className="rounded-xl border bg-muted/40 p-3 text-xs">
                  <p className="font-medium">Message preview</p>
                  <p className="mt-1 text-muted-foreground">
                    "Hi Anika, your Session 14 roster is still pending confirmation. Tap to confirm or override any marks."
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={close}>Cancel</Button>
                <Button className="flex-1" onClick={() => setAction({ kind: "nudge", stage: "sent" })}>
                  <BellRing className="mr-1 h-3.5 w-3.5" /> Send nudge
                </Button>
              </div>
            </>
          )}
          {action.kind === "nudge" && action.stage === "sent" && (
            <SimpleDone title="Nudge sent" body="Anika will get a push and SMS. Next nudge is auto-scheduled in 2 hours if still unconfirmed." onClose={close} />
          )}

          {/* DISPUTE */}
          {action.kind === "dispute" && action.stage === "review" && (
            <>
              <DialogHeader>
                <DialogTitle>Review dispute</DialogTitle>
              </DialogHeader>
              <div className="mt-1 space-y-3 text-sm">
                <div className="rounded-xl border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Kabir Ahuja · Session 13 · Agentic Workflows with n8n</p>
                  <p className="mt-1 text-sm font-medium">Marked Late · check-in 9:20 AM</p>
                  <p className="mt-2 rounded-lg bg-muted/50 p-2 text-xs">
                    <span className="font-semibold">Learner reason:</span> "Metro Yellow Line breakdown, was at the gate by 9:05, security desk had a queue. Sharing the metro disruption SMS."
                  </p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Resolution note (visible to learner)</label>
                  <Textarea
                    value={disputeNote}
                    onChange={(e) => setDisputeNote(e.target.value)}
                    placeholder="e.g. Verified metro disruption. Updated to Present (Excused)."
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setAction({ kind: "dispute", stage: "resolved", resolution: "reject", reasoning: disputeNote })}>
                  Reject
                </Button>
                <Button onClick={() => setAction({ kind: "dispute", stage: "resolved", resolution: "approve", reasoning: disputeNote })}>
                  Approve · mark Present
                </Button>
              </div>
            </>
          )}
          {action.kind === "dispute" && action.stage === "resolved" && (
            <SimpleDone
              title={action.resolution === "approve" ? "Dispute approved" : "Dispute rejected"}
              body={
                action.resolution === "approve"
                  ? "Kabir's Session 13 status updated to Present (Excused). Notification sent."
                  : "Kabir's Late mark stands. He'll receive your resolution note."
              }
              onClose={close}
            />
          )}

          {/* CONTACT */}
          {action.kind === "contact" && action.stage === "menu" && (
            <>
              <DialogHeader>
                <DialogTitle>Contact Ishaan Kapoor</DialogTitle>
              </DialogHeader>
              <div className="mt-1 space-y-2 text-sm">
                <p className="text-muted-foreground">71% attendance · 4 absences this month. Pick a channel.</p>
                <button
                  className="flex w-full items-center gap-3 rounded-xl border bg-card px-3 py-3 text-left hover:bg-muted/40"
                  onClick={() => setAction({ kind: "contact", channel: "call", stage: "done" })}
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="block text-sm font-medium">Call now</span>
                    <span className="block text-[11px] text-muted-foreground">+91 98xxx xxx12</span>
                  </span>
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-xl border bg-card px-3 py-3 text-left hover:bg-muted/40"
                  onClick={() => setAction({ kind: "contact", channel: "email", stage: "done" })}
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="block text-sm font-medium">Send attendance-check email</span>
                    <span className="block text-[11px] text-muted-foreground">Template: low-attendance check-in</span>
                  </span>
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-xl border bg-card px-3 py-3 text-left hover:bg-muted/40"
                  onClick={() => setAction({ kind: "contact", channel: "schedule", stage: "done" })}
                >
                  <CalendarPlus className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="block text-sm font-medium">Schedule a 1:1</span>
                    <span className="block text-[11px] text-muted-foreground">Books a 20-min slot on your calendar</span>
                  </span>
                </button>
              </div>
              <div className="mt-3">
                <Button variant="outline" className="w-full" onClick={close}>Close</Button>
              </div>
            </>
          )}
          {action.kind === "contact" && action.stage === "done" && (
            <SimpleDone
              title={
                action.channel === "call"
                  ? "Calling Ishaan…"
                  : action.channel === "email"
                  ? "Email sent"
                  : "1:1 scheduled"
              }
              body={
                action.channel === "call"
                  ? "Call logged in CRM. Outcome will save back to his learner profile."
                  : action.channel === "email"
                  ? "Template sent. Reply notification will land in your alerts feed."
                  : "Tomorrow 4:00–4:20 PM, in your calendar. Reminder set 1 hour before."
              }
              onClose={close}
            />
          )}
        </DialogContent>
      </Dialog>
    </MobileShell>
  );
}

function SimpleDone({ title, body, onClose }: { title: string; body: string; onClose: () => void }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="sr-only">{title}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <div>
          <p className="text-base font-semibold">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
        </div>
        <Button className="w-full" onClick={onClose}>Done</Button>
      </div>
    </>
  );
}
