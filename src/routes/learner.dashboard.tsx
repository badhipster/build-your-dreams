import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/attendance/Shell";
import { StatusBadge } from "@/components/attendance/StatusBadge";
import { LEARNER_SESSIONS } from "@/components/attendance/data";
import { Award, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/learner/dashboard")({
  head: () => ({
    meta: [{ title: "Your Attendance · Kraftshala" }],
  }),
  component: Page,
});

type DisputeTarget = { id: string; n: number; title: string; status: string } | null;
type DisputeStage = "hidden" | "form" | "submitted";

function Page() {
  const pct = 92;
  const [target, setTarget] = useState<DisputeTarget>(null);
  const [stage, setStage] = useState<DisputeStage>("hidden");
  const [text, setText] = useState("");

  const openDispute = (s: typeof LEARNER_SESSIONS[number]) => {
    setTarget({ id: s.id, n: s.n, title: s.title, status: s.status });
    setText("");
    setStage("form");
  };
  const close = () => {
    setStage("hidden");
    setTarget(null);
  };

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
            {LEARNER_SESSIONS.map((s, i) => {
              const eligibleForDispute = (s.status === "late" || s.status === "absent") && !s.dispute;
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i !== 0 ? "border-t" : ""}`}
                >
                  <div className="min-w-0 flex-1">
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
                    {eligibleForDispute && (
                      <button
                        onClick={() => openDispute(s)}
                        className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium text-foreground underline"
                      >
                        Raise dispute <ChevronRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              );
            })}
          </div>
          <p className="mt-2 px-1 text-[11px] text-muted-foreground">
            Disputes can be raised within 48 hours of a marked session.
          </p>
        </div>
      </div>

      <Dialog open={stage !== "hidden"} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-[360px] rounded-2xl">
          {stage === "form" && target && (
            <>
              <DialogHeader>
                <DialogTitle>Raise a dispute</DialogTitle>
              </DialogHeader>
              <div className="mt-1 space-y-3">
                <div className="rounded-xl border bg-card p-3 text-xs">
                  <p className="text-muted-foreground">Session {target.n} · {target.title}</p>
                  <p className="mt-0.5 font-medium capitalize">Marked {target.status}</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    What happened?
                  </label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us what we got wrong, briefly."
                    rows={4}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Vikram Nair (Coordinator) reviews within 48 hours.
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={close}>Cancel</Button>
                <Button className="flex-1" disabled={text.trim().length === 0} onClick={() => setStage("submitted")}>
                  Submit dispute
                </Button>
              </div>
            </>
          )}

          {stage === "submitted" && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">Dispute submitted</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-3 py-2 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-base font-semibold">Dispute raised</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    You'll get a notification once your coordinator resolves it.
                  </p>
                </div>
                <Button className="w-full" onClick={close}>Done</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MobileShell>
  );
}
