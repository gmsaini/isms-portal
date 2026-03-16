# Changelog

All notable changes to the ISMS Portal are documented here.

---

## [1.0.0-beta] — 2025-03-16

### 🎉 Initial Release

#### Core Portal
- Role-based access: Admin, Manager, Member
- Light grey sidebar navigation with section groupings
- User switcher with role-aware nav rendering

#### Dashboard
- 6 KPI cards with sparklines — all clickable to target pages
- Team Utilisation bars, Activity Status donut, Daily Trend sparkline
- Hours by Team/Member, Activity Types, Time by Category charts
- Top Activities and Most Time-Consuming rankings
- Drill-down overlay for all charts — click any segment/bar to see filtered data

#### Activities
- Create/edit/delete activities (Manager only)
- Fields: Nature (Proactive/Reactive), Work Type (Request/Change/Incident), Ticket Number
- Nature and Work Type pills displayed in table and bandwidth views
- Admin has read-only view with info banner

#### Time Log
- Tabular Log Time modal — log multiple activities in one session
- Per-row time presets, date picker, notes
- Member cards clickable to filter log table
- Member filter chip with clear button

#### Bandwidth & Capacity
- Capacity summary table with utilisation bars
- Time Spent per Activity section with per-member breakdown
- Leave calendar

#### Productivity (New Section)
- **Overview** — team score rings, proactive/reactive donut, member utilisation league table, activity health
- **Flags & Risks** — member and activity flags with risk levels (Critical / High / Medium / Low)
- **Effort Heatmap** — member × day heat map and activity effort bar chart, all cells clickable
- **Suggestions** — up to 11 live data-driven recommendations, ITIL & DORA aligned, expandable with KPI targets and action steps

#### Data Connect (New Section)
- **Upload Tickets** — drag-and-drop CSV import with auto column mapping, 8-row preview, member matching
- **Integrations** — catalog and configuration UI for JIRA, Power BI, HP Service Manager, OpenText SMAX

#### Team & Member Management
- Add, edit, delete teams with emoji/colour picker and cascade rename
- Add, edit, delete members (Admin only) — name, title, role, team assignment
- Members grouped by role (Admin / Manager / Member)

---

## Planned for v1.1.0

- [ ] Persistent backend (Node.js / FastAPI)
- [ ] Live JIRA REST API sync
- [ ] Power BI embedded panel
- [ ] Excel / PDF export
- [ ] Dark mode toggle
