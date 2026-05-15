import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ScanLine, Users, LayoutDashboard, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Kraftshala Attendance · Sign in" }],
  }),
  component: RolePicker,
});

const roles = [
  {
    to: "/learner",
    icon: ScanLine,
    label: "Learner",
    name: "Diya Sharma",
    detail: "Cohort PGP-AI-LED-MKT-01",
    tone: "bg-primary text-primary-foreground",
  },
  {
    to: "/instructor",
    icon: Users,
    label: "Instructor",
    name: "Anika Rao",
    detail: "Session 14 · 30 learners",
    tone: "bg-foreground text-background",
  },
  {
    to: "/coordinator",
    icon: LayoutDashboard,
    label: "Coordinator",
    name: "Vikram Nair",
    detail: "Program leadership",
    tone: "bg-success text-success-foreground",
  },
] as const;

function RolePicker() {
  return (
    <div className="min-h-screen bg-muted/40 md:flex md:items-center md:justify-center md:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-background px-6 pt-10 pb-8 md:min-h-0 md:h-[860px] md:rounded-[2.25rem] md:border md:shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Kraftshala</p>
            <p className="text-sm font-semibold leading-none">Attendance</p>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick the experience you want to demo. Each role sees a different app.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.to}
                to={r.to}
                className="group flex items-center gap-3 rounded-2xl border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${r.tone}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.label}</p>
                  <p className="text-[11px] text-muted-foreground">{r.name} · {r.detail}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>

        <p className="mt-auto pt-8 text-center text-[10px] text-muted-foreground">
          Prototype · personas are isolated experiences, not a single app with a toggle.
        </p>
      </div>
    </div>
  );
}