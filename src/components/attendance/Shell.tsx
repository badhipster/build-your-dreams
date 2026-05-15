import { Link, useLocation } from "@tanstack/react-router";
import { GraduationCap, ClipboardCheck, LayoutDashboard, ScanLine, CalendarDays, User, Users, Settings, Bell } from "lucide-react";

type Persona = "learner" | "instructor" | "coordinator";

function personaFromPath(pathname: string): Persona {
  if (pathname.startsWith("/instructor")) return "instructor";
  if (pathname.startsWith("/coordinator")) return "coordinator";
  return "learner";
}

const personaHomes: Record<Persona, string> = {
  learner: "/",
  instructor: "/instructor",
  coordinator: "/coordinator",
};

export function PersonaSwitcher() {
  const { pathname } = useLocation();
  const active = personaFromPath(pathname);
  const items: { id: Persona; label: string }[] = [
    { id: "learner", label: "Learner" },
    { id: "instructor", label: "Instructor" },
    { id: "coordinator", label: "Coordinator" },
  ];
  return (
    <div className="flex items-center gap-2 px-4 pt-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCap className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Kraftshala · PGP-AI-LED-MKT-01</p>
        <p className="text-xs font-semibold">Attendance</p>
      </div>
      <div className="flex rounded-full border bg-card p-0.5 text-xs">
        {items.map((it) => (
          <Link
            key={it.id}
            to={personaHomes[it.id]}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
              active === it.id ? "bg-foreground text-background" : "text-muted-foreground"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

const tabsByPersona: Record<Persona, { to: string; label: string; icon: React.ElementType; exact?: boolean }[]> = {
  learner: [
    { to: "/", label: "Check-In", icon: ScanLine, exact: true },
    { to: "/learner/dashboard", label: "Sessions", icon: CalendarDays },
    { to: "/learner/profile", label: "Profile", icon: User },
  ],
  instructor: [
    { to: "/instructor", label: "Roster", icon: Users, exact: true },
    { to: "/instructor/sessions", label: "Sessions", icon: CalendarDays },
    { to: "/instructor/settings", label: "Settings", icon: Settings },
  ],
  coordinator: [
    { to: "/coordinator", label: "Overview", icon: LayoutDashboard, exact: true },
    { to: "/coordinator/alerts", label: "Alerts", icon: Bell },
    { to: "/coordinator/settings", label: "Settings", icon: Settings },
  ],
};

export function BottomTabBar() {
  const { pathname } = useLocation();
  const persona = personaFromPath(pathname);
  const tabs = tabsByPersona[persona];
  return (
    <nav className="sticky bottom-0 z-20 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="grid grid-cols-3">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40 md:flex md:items-center md:justify-center md:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-background md:min-h-0 md:h-[860px] md:rounded-[2.25rem] md:border md:shadow-2xl md:overflow-hidden">
        <PersonaSwitcher />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BottomTabBar />
      </div>
    </div>
  );
}

export function StubScreen({ title }: { title: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
      <ClipboardCheck className="mb-3 h-8 w-8 text-muted-foreground" />
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Not part of this prototype.</p>
    </div>
  );
}