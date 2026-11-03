# Decision log

## 2026-11-01: Removed Flask backend
Supabase provides the database, auth and per-user security (RLS), so a
separate Python server added hosting and security work with no benefit
for V1. Frontend stays React + Vite in JavaScript; TypeScript may come later.

## 2026-11-01: Activity factors from FAO/WHO/UNU (2004)
Using midpoints of the FAO/WHO/UNU PAL bands: sedentary/light 1.55,
active/moderate 1.85, vigorous 2.20. Chosen because it is a cited expert
source and its categories include occupation and daily movement, not just
exercise. Results will be higher than calculators that use 1.2 for sedentary.
Source: https://www.fao.org/docrep/007/y5686e/y5686e07.htm

## 2026-11-01: Calculator input ranges
Age 18–100 (adults only; Mifflin's original sample was aged 19–78),
height 100–250 cm, weight 30–300 kg. Ranges catch typing errors
without excluding real users. Results are rounded only for display.

## 2026-11-03: In-memory sample data before the database
Today and Add Food are built with sample data held in React state, so the
screens and calculation logic can be finished and tested before adding
Supabase. Daily totals are calculated from entries, never stored separately.