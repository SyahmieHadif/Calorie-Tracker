# Decision log

## 2026-11-01: Removed Flask backend
Supabase provides the database, auth and per-user security (RLS), so a
separate Python server added hosting and security work with no benefit
for V1. Frontend stays React + Vite in JavaScript; TypeScript may come later.