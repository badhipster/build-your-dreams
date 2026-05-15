## What I'll build

A mobile-first prototype of a classroom attendance system for the Kraftshala AI-LED Marketing program, per `LOVABLE_PROMPT.md`. Three personas (Learner, Instructor, Coordinator), four screens, with a top persona switcher and persona-specific bottom tab bars.

## Routes (TanStack Start)

- `/` — Learner Check-In (default)
- `/learner/dashboard` — Learner Attendance Dashboard
- `/instructor` — Instructor Roster
- `/coordinator` — Coordinator Dashboard

A persistent top bar on every page contains the **Learner / Instructor / Coordinator** view toggle. A persona-aware bottom tab bar:
- Learner: Check-In, Sessions, Profile
- Instructor: Roster, Sessions, Settings
- Coordinator: Overview, Alerts, Settings

Only the 4 screens above are fully fleshed out; other tabs are stubs (consistent with "don't add unnecessary features").

## Screen details

**1. Learner Check-In (`/`)**
- Header: "Session 14 · AI for B2B Marketing", date/time
- Session details card so learners don't scan the wrong session
- Primary "Scan to Check In" button → animated mock QR scan → success state
- Default success: green card "You're marked Present · 9:02 AM"
- Toggle/secondary view to preview the **Late** state: amber card "Marked Late · arrived 9:24 AM" + "This isn't right?" dispute link + "Why was I marked Late?" tooltip

**2. Instructor Roster (`/instructor`)**
- Header: "Session 14 · 30 learners · 22 checked in"
- **Offline banner** across the top: "Offline — 12 updates queued, will sync when online"
- Scrollable list of 10 Indian-named learners with avatar + status icon (5 Present, 2 Late, 2 Absent, 1 to override)
- Tap row → bottom sheet with Present / Late / Absent / Excused + reason textarea
- Sticky bottom "Confirm Roster" button

**3. Learner Attendance Dashboard (`/learner/dashboard`)**
- Header: "Your Attendance · Cohort PGP-AI-LED-MKT-01"
- Big 92% (24/26 sessions), subtitle "Eligible for completion certificate · threshold 80%"
- Progress bar with 80% threshold marker
- Session log (5 rows, mix of statuses); one row tagged "Dispute Raised · under review"

**4. Coordinator Dashboard (`/coordinator`)**
- 3 stat cards: today's attendance %, week average, learners on watch (<75%)
- "Needs Attention" list with 3 items (unconfirmed roster 2h old, open dispute, learner at 4 absences) — each with a clear escalation CTA (Nudge / Review / Contact)

## Design system

Update `src/styles.css` tokens (oklch equivalents of the brand hexes):
- `--primary`: warm yellow `#F5C518` (Kraftshala brand) with dark foreground
- Status tokens: `--success` `#16A34A`, `--warning` `#F59E0B`, `--muted-status` `#94A3B8`, `--destructive` `#DC2626`
- Light mode default, Inter via system sans stack, generous padding, rounded cards
- Mobile-first max-width `420px` centered container with subtle device frame on desktop

Use shadcn primitives already in the project (Button, Card, Sheet, Badge, Progress, Avatar, Tabs).

## Out of scope

No backend, no auth, no real QR scanning — all state is mocked in-memory. No Cloud enablement needed.

## Files to add/modify

- `src/styles.css` — token updates
- `src/routes/__root.tsx` — wrap Outlet in mobile shell with PersonaSwitcher + BottomTabBar
- `src/routes/index.tsx` — replace placeholder with Learner Check-In
- `src/routes/learner.dashboard.tsx`, `src/routes/instructor.tsx`, `src/routes/coordinator.tsx`
- `src/components/attendance/` — PersonaSwitcher, BottomTabBar, StatusBadge, OfflineBanner, MockQRScan, OverrideSheet, sample data
