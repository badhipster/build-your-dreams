import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, StubScreen } from "@/components/attendance/Shell";

export const Route = createFileRoute("/coordinator/alerts")({
  component: () => (<MobileShell><StubScreen title="Alerts" /></MobileShell>),
});