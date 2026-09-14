# SkyRacing

SkyRacing is a production-oriented, mobile-first platform for following real-world air racing. It is designed to support multiple championships and race formats rather than being tied to a single organiser.

## MVP

- Home dashboard
- Race calendar
- Race centre / event pages
- Pilots
- Aircraft
- Results
- Standings
- Verified-source data model
- Responsive dark interface

## Stack

- Next.js 15 + React 19 + TypeScript
- Supabase Postgres
- Supabase-ready architecture for Auth and Realtime
- Vercel deployment target

## Data policy

SkyRacing must not fabricate championship, event, pilot, aircraft, timing, result, or standings data. Records support source URLs and verification states so the frontend can distinguish checked data from incomplete data.

## Environment

The repository uses the public Supabase project URL and publishable client key as safe fallbacks for the read-only MVP. For deployment, set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wbkdqrblnwfyzkpjobrw.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Never expose a Supabase secret or service-role key to the browser.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

Organisation → Championship → Season → Event → Class → Session → Entry → Result

Aircraft models and individual race aircraft are kept separate so modified race aircraft can carry their own specifications without overwriting manufacturer data.

## Next milestones

1. Import complete verified 2026 rosters and session schedules.
2. Add user authentication and favourites.
3. Add the private SkyRacing Control admin dashboard.
4. Add news and notifications.
5. Integrate official timing feeds if organisers/providers make them available.
6. Add Realtime live race status and timing.
