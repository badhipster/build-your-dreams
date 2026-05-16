## Audit results

**Routes — all wired, no dead links:**
- `/` (sign in) → `/learner`, `/instructor`, `/coordinator` ✓
- Learner tabs: `/learner`, `/learner/dashboard`, `/learner/profile` ✓
- Instructor tabs: `/instructor`, `/instructor/sessions`, `/instructor/settings` ✓
- Coordinator tabs: `/coordinator`, `/coordinator/alerts`, `/coordinator/settings` ✓
- "Switch role" pill in every top bar → `/` ✓

**Problems found:**

1. **Theming leaks across personas.** Only the top bar is persona-colored. Inside content, `bg-primary` / `text-primary` is yellow everywhere — including the instructor "Live now" chip, the coordinator bar chart, every `v2` pill, and the bottom-tab active icon. Instructor app should read dark-foreground; Coordinator app should read green.
2. **Dead buttons:**
   - "Sign out" in `learner.profile`, `instructor.settings`, `coordinator.settings` — no `onClick`, doesn't return to `/`.
   - Instructor `/instructor/sessions` rows aren't tappable even though the helper text says "Tap a confirmed session…".
   - Coordinator `/coordinator/alerts` items aren't tappable; open items have no way to act, while `/coordinator` Needs-attention items open action dialogs for the same alerts.
   - Learner profile rows "Program handbook" and "Raise a non-attendance concern" are buttons with no action.
3. **Contrast nit:** "DS" avatar uses `bg-primary/15 text-primary` (yellow on light yellow).

## Fix plan

### 1. Per-persona theme via CSS cascade (one change, app-wide)
In `src/styles.css`, add three scope classes that override the shared color tokens for everything rendered inside the shell:

```css
.persona-learner      { /* keep current yellow primary */ }
.persona-instructor   { --primary: var(--foreground);
                        --primary-foreground: var(--background);
                        --ring: var(--foreground); }
.persona-coordinator  { --primary: var(--success);
                        --primary-foreground: var(--success-foreground);
                        --ring: var(--success); }
```

In `Shell.tsx`, apply the matching `persona-*` class on `MobileShell`'s outer container. This automatically retones every existing `bg-primary` / `text-primary` / `ring-primary` usage — bottom-tab active icon, chips, charts, "v2" pills, scan frame, buttons — without touching individual screens.

### 2. Wire up navigation gaps
- `learner.profile`, `instructor.settings`, `coordinator.settings`: convert "Sign out" buttons into `<Link to="/">` (or `useNavigate` on click) so they return to the role picker.
- `instructor.sessions`: wrap each non-upcoming row in `<Link to="/instructor">` so taps land on the roster (the only roster screen we have); leave upcoming rows non-interactive with a clear visual.
- `coordinator.alerts`: make open items tappable → `<Link to="/coordinator">` so the coordinator lands on the Needs-attention list where the action dialogs live. Resolved items stay non-interactive.
- Learner profile "Program handbook" / "Raise a non-attendance concern" rows: link to `/learner/dashboard` and `/learner/profile` respectively (no extra surface) OR drop the chevron and add a "coming soon" affordance — pick the link approach to keep all buttons functional.

### 3. Avatar contrast
Switch the learner profile avatar to `bg-primary text-primary-foreground` so the yellow chip stays readable.

### Files touched
- `src/styles.css` — add 3 persona scope classes.
- `src/components/attendance/Shell.tsx` — apply `persona-*` class on the shell wrapper.
- `src/routes/learner.profile.tsx` — Sign out link, avatar contrast, link 2 stub rows.
- `src/routes/instructor.sessions.tsx` — tappable session rows.
- `src/routes/instructor.settings.tsx` — Sign out link.
- `src/routes/coordinator.alerts.tsx` — tappable open-alert rows.
- `src/routes/coordinator.settings.tsx` — Sign out link.

### Out of scope
- No new screens, no real auth, no backend.
- Persona switching stays via the "Switch role" pill → `/`.
