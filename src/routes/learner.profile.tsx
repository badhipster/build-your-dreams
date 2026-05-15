import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, StubScreen } from "@/components/attendance/Shell";

export const Route = createFileRoute("/learner/profile")({
  component: () => (<MobileShell><StubScreen title="Profile" /></MobileShell>),
});