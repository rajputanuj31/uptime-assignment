A single-page React + Vite dashboard that visualises alert KPIs for multiple reports, with a sidebar selector, KPI summary cards, and bar / donut charts.

### Tech stack

- **Framework**: React 19 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + a small set of custom utility classes in `src/index.css`
- **Charts**: `react-chartjs-2` + `chart.js`
- **Icons**: `lucide-react`

### Features

- **Report selector with pagination**
  - Left sidebar lets you search and select from many reports.
  - Pagination keeps each page compact while still supporting a long list.
  - Selected report is stored in `localStorage`, so it is restored after reload.

- **Dynamic header & KPIs**
  - `ReportHeader` shows the currently selected report title, subtitle, and range.
  - KPI row shows:
    - **Open Alerts** (bell icon)
    - **Closing Rate %** (check icon)
    - **Oldest Unacknowledged Alert** (clock icon)
  - Each KPI card uses a soft gradient background and circular icon chip to match the reference design.

- **Charts**
  - **Bar chart**: “Best Unit Operations with Latest Number of Alerts”, stacked by alert status.
  - **Donut chart**: “Alert Rates Distribution” with legend and percentages.
  - Both charts update automatically when you change the selected report.

- **Add report**
  - `ADD` button opens a modal.
  - Simple form validates title / subtitle.
  - New report is inserted at the top of the list, auto-selected, and persisted.

### Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build & lint

```bash
npm run build   # type-check + production build
npm run lint    # ESLint
```

### Tailwind CSS v4 notes

Tailwind is configured using the Vite plugin:

- `vite.config.ts` includes `tailwindcss()` from `@tailwindcss/vite` in `plugins`.
- `src/index.css` imports Tailwind with:

```css
@import "tailwindcss";
```

Utility classes are used throughout the JSX (for layout, spacing, typography) and are complemented by a few custom classes in `index.css` for colours and shadows.

### State & persistence

`src/features/reports/context/ReportsContext.tsx` is the single source of truth for report data:

- Holds the full list of reports, search term, pagination, and the currently selected report.
- Persists both `reports` and `selectedReportId` to `localStorage` under `uptime-dashboard:state_v1`.
- On load, it restores persisted state if present, falling back to `mockReports`.

If you want to reset to the seed data, clear the key in DevTools:

- `localStorage.removeItem('uptime-dashboard:state_v1')`

### Project structure (high level)

- `src/App.tsx` – top-level layout composition.
- `src/components/layout/AppLayout.tsx` – shell (header + page background).
- `src/features/reports/` – all report-related code:
  - `data/mockReports.ts` – seed data.
  - `context/ReportsContext.tsx` – report state & persistence.
  - `components/ReportSidebar.tsx` – sidebar, search, pagination.
  - `components/ReportKpiRow.tsx` – KPI cards.
  - `components/ReportChartsRow.tsx` – mini stats + bar / donut charts.
  - `components/AddReportModal.tsx` – create report modal.

This should give you everything you need to run, tweak, or extend the dashboard quickly.

