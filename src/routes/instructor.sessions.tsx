import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, StubScreen } from "@/components/attendance/Shell";

export const Route = createFileRoute("/instructor/sessions")({
  component: () => (<MobileShell><StubScreen title="Sessions" /></MobileShell>),
});