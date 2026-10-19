# ⚡ ExO Canvas — SIP Lite

Exponential Organization (ExO) Canvas tool for the Student Innovation Programme (SIP Lite) by Inunity.

## What is the ExO Canvas?

The ExO Canvas maps an organisation across 10 attributes of an Exponential Organisation, anchored to a Massive Transformative Purpose (MTP):

**SCALE** (External Mechanisms)
- **S** — Staff on Demand
- **C** — Community & Crowd
- **A** — Algorithms
- **L** — Leveraged Assets
- **E** — Engagement

**IDEAS** (Internal Mechanisms)
- **I** — Interfaces
- **D** — Dashboards
- **E** — Experimentation
- **A** — Autonomy
- **S** — Social Technologies

## Features
- Dark-themed canvas with SCALE | MTP | IDEAS three-column layout
- MTP block as the glowing centrepiece
- Per-attribute guiding hints (toggleable)
- Character progress bars per attribute
- Completion tracking: MTP + SCALE + IDEAS progress bars
- Submit flow with attribute completion grid
- Context panel for prior SIP Lite tool outputs
- Auto-save timestamp
- Session only — no server data storage

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Stack
- React + Vite
- Zustand (state management)
- Tailwind CSS

## Canvas Layout
```
┌────────────────┬──────────────────┬────────────────┐
│   S — Staff    │                  │  I — Interfaces│
│   C — Community│      MTP         │  D — Dashboards│
│   A — Algorithms│  (centre star)  │  E — Experiment│
│   L — Leveraged│                  │  A — Autonomy  │
│   E — Engagement│  + Progress     │  S — Social    │
└────────────────┴──────────────────┴────────────────┘
```

## Roadmap
- [ ] PDF export
- [ ] ExO Score / maturity assessment
- [ ] Mentor review panel
- [ ] Integration with SIP Lite platform API

## Built by
Inunity Pvt Ltd · SIP Lite Programme
