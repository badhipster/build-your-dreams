import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, StubScreen } from "@/components/attendance/Shell";

export const Route = createFileRoute("/coordinator/settings")({
  component: () => (<MobileShell><StubScreen title="Settings" /></MobileShell>),
});