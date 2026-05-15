import { Link, useLocation } from "@tanstack/react-router";
import { ClipboardCheck, LayoutDashboard, ScanLine, CalendarDays, User, Users, Settings, Bell, ArrowLeft } from "lucide-react";

export type Persona = "learner" | "instructor" | "coordinator";

const personaTheme: Record<Persona, { label: string; bar: string; chipBg: string; chipText: string; accent: string }> = {
  learner: {
    label: "Learner",
    bar: "bg-primary text-primary-foreground",
    chipBg: "bg-primary-foreground/15",
    chipText: "text-primary-foreground",
    accent: "primary",
  },
  instructor: {
    label: "Instructor",
    bar: "bg-foreground text-background",
    chipBg: "bg-background/15",
    chipText: "text-background",
    accent: "foreground",
  },
  coordinator: {
    label: "Coordinator",
    bar: "bg-success text-success-foreground",
    chipBg: "bg-success-foreground/15",
    chipText: "text-success-foreground",
    accent: "success",
  },
};

function personaFromPath(pathname: string): Persona {
  if (pathname.startsWith("/instructor")) return "instructor";
  if (pathname.startsWith("/coordinator")) return "coordinator";
  return "learner";
}

const personaHomes: Record<Persona, string> = {
  learner: "/learner",
  instructor: "/instructor",
  coordinator: "/coordinator",
};

function PersonaTopBar({ persona }: { persona: Persona }) {
  const t = personaTheme[persona];
  return (
    <div className={`flex items-center gap-2 px-4 py-2.5 ${t.bar}`}>
      <Link to="/" className={`inline-flex items-center gap-1 rounded-full ${t.chipBg} ${t.chipText} px-2 py-1 text-[11px] font-medium`}>
        <ArrowLeft className="h-3 w-3" /> Switch role
      </Link>
      <div className="flex-1 text-right">
        <p className="text-[10px] uppercase tracking-wider opacity-80">Signed in as</p>
        <p className="text-xs font-semibold">{t.label} · {sampleNameFor(persona)}</p>
      </div>
    </div>
  );
}

function sampleNameFor(p: Persona) {
  return p === "learner" ? "Diya Sharma" : p === "instructor" ? "Anika Rao" : "Vikram Nair";
}

const tabsByPersona: Record<Persona, { to: string; label: string; icon: React.ElementType; exact?: boolean }[]> = {
  learner: [
    { to: "/learner", label: "Check-In", icon: ScanLine, exact: true },
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
  const { pathname } = useLocation();
  const persona = personaFromPath(pathname);
  return (
    <div className="min-h-screen bg-muted/40 md:flex md:items-center md:justify-center md:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-background md:min-h-0 md:h-[860px] md:rounded-[2.25rem] md:border md:shadow-2xl md:overflow-hidden">
        <PersonaTopBar persona={persona} />
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