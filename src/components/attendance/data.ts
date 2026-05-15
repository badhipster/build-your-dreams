export type Status = "present" | "late" | "absent" | "excused";

export type Learner = {
  id: string;
  name: string;
  status: Status | "pending";
  checkInTime?: string;
};

export const ROSTER: Learner[] = [
  { id: "1", name: "Aarav Mehta", status: "present", checkInTime: "8:58 AM" },
  { id: "2", name: "Diya Sharma", status: "present", checkInTime: "9:01 AM" },
  { id: "3", name: "Kabir Ahuja", status: "late", checkInTime: "9:20 AM" },
  { id: "4", name: "Riya Verma", status: "late", checkInTime: "9:20 AM" },
  { id: "5", name: "Ishaan Kapoor", status: "absent" },
  { id: "6", name: "Ananya Iyer", status: "late", checkInTime: "9:21 AM" },
  { id: "7", name: "Vihaan Singh", status: "late", checkInTime: "9:22 AM" },
  { id: "8", name: "Saanvi Patel", status: "present", checkInTime: "9:03 AM" },
  { id: "9", name: "Aditya Rao", status: "absent" },
  { id: "10", name: "Myra Joshi", status: "pending" },
];

export const LEARNER_SESSIONS = [
  { id: "s14", n: 14, title: "AI for B2B Marketing", date: "Mar 12", status: "present" as Status },
  { id: "s13", n: 13, title: "Agentic Workflows with n8n", date: "Mar 10", status: "late" as Status, dispute: true },
  { id: "s12", n: 12, title: "Performance Creative Sprint", date: "Mar 8", status: "present" as Status },
  { id: "s11", n: 11, title: "Cohort Business Review", date: "Mar 6", status: "absent" as Status },
  { id: "s10", n: 10, title: "Generative Content Systems", date: "Mar 4", status: "present" as Status },
];

export const ALERTS = [
  {
    id: "a1",
    kind: "Unconfirmed roster",
    detail: "Session 14 · AI for B2B Marketing",
    meta: "Submitted 2h ago by Anika Rao",
    cta: "Nudge instructor",
  },
  {
    id: "a2",
    kind: "Open dispute",
    detail: "Kabir Ahuja · Session 13 marked Late",
    meta: "Raised 4h ago",
    cta: "Review dispute",
  },
  {
    id: "a3",
    kind: "Attendance watchlist",
    detail: "Ishaan Kapoor · 4 absences this month",
    meta: "Now at 71% (threshold 80%)",
    cta: "Contact learner",
  },
];
