# Calorie Calculator & Tracker

A mobile-friendly web app for estimating daily calorie needs and logging food intake.

**Live demo:** https://calorie-tracker-henna-mu.vercel.app

> **Status:** Early development. The calculator is live; accounts and food logging are in progress.

## Features

**Available now**
- Estimate resting energy expenditure (REE) and maintenance calories
- Activity levels based on a cited expert source, covering work and daily movement, not just exercise
- Input validation with adult-only ranges
- Unit-tested calculation logic

**Planned for Version 1.0**
- Accounts with secure, per-user data
- Saved calorie targets (lose, maintain or gain)
- Manual food logging with daily totals
- History that keeps the target that applied on each past day

## How the estimate works

**Resting energy expenditure** uses the Mifflin–St Jeor equation:

- Male: `10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5`
- Female: `10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161`

**Maintenance calories** = REE × activity factor. Factors are the midpoints of the
FAO/WHO/UNU (2004) physical activity level bands:

| Activity level | Band | Factor used |
|---|---|---|
| Sedentary or light activity | 1.40–1.69 | 1.55 |
| Active or moderately active | 1.70–1.99 | 1.85 |
| Vigorous or vigorously active | 2.00–2.40 | 2.20 |

Values are rounded only for display. Results will be higher than calculators that use 1.2
for "sedentary"; see [docs/decisions.md](docs/decisions.md) for why.

## Limitations

- Results are estimates, not measurements or medical advice.
- Intended for adults (18+). Not suitable during pregnancy or breastfeeding.
- The Mifflin–St Jeor equation was developed from adults aged 19–78; accuracy outside that range is less certain.

## Tech stack

- **Frontend:** React, Vite, JavaScript
- **Testing:** Vitest
- **Hosting:** Vercel (deploys automatically from `main`)
- **Planned:** Supabase (PostgreSQL database, authentication, row-level security)

## Run locally

```bash
git clone https://github.com/SyahmieHadif/Calorie-Tracker.git
cd Calorie-Tracker
npm install
npm run dev      # start the app at http://localhost:5173
npm test         # run the unit tests
```

## Project documentation

- [Decision log](docs/decisions.md): key technical decisions and the reasoning behind them

## Sources

1. Mifflin MD, St Jeor ST, et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. https://pubmed.ncbi.nlm.nih.gov/2305711/
2. FAO/WHO/UNU (2004). Human energy requirements: Energy requirement of adults. https://www.fao.org/docrep/007/y5686e/y5686e07.htm
