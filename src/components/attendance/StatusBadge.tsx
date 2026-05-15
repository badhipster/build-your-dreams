import { Check, Clock, Circle, ShieldCheck } from "lucide-react";
import type { Status } from "./data";

const map: Record<Status | "pending", { label: string; icon: React.ElementType; cls: string }> = {
  present: { label: "Present", icon: Check, cls: "bg-success/15 text-success" },
  late: { label: "Late", icon: Clock, cls: "bg-warning/20 text-warning-foreground" },
  absent: { label: "Absent", icon: Circle, cls: "bg-muted text-muted-foreground" },
  excused: { label: "Excused", icon: ShieldCheck, cls: "bg-accent text-accent-foreground" },
  pending: { label: "Not marked", icon: Circle, cls: "bg-muted text-muted-foreground" },
};

export function StatusBadge({ status }: { status: Status | "pending" }) {
  const { label, icon: Icon, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export function StatusDot({ status }: { status: Status | "pending" }) {
  const { icon: Icon, cls } = map[status];
  return (
    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${cls}`}>
      <Icon className="h-4 w-4" />
    </span>
  );
}