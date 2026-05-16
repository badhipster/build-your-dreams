import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/coordinator")({
  component: () => <Outlet />,
});
