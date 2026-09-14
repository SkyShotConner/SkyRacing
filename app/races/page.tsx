import Link from 'next/link';
import { getEvents } from '@/lib/data';

export const revalidate = 60;

function fmt(value: string) {
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00Z`));
}

export default async function RacesPage() {
  const events = await getEvents();
  return (
    <main className="container">
      <div className="page-title"><div className="eyebrow">Calendar</div><h1>Race weekends</h1><p className="muted">Verified events across the air racing world.</p></div>
      {events.length ? <div className="grid">{events.map((event) => (
        <Link className="card race-card" href={`/races/${event.slug}`} key={event.id}>
          <span className={`status ${event.status}`}>{event.status}</span>
          <h3>{event.name}</h3>
          <p className="muted">{event.venues?.name ?? 'Venue pending'}{event.venues?.city ? ` · ${event.venues.city}` : ''}</p>
          <div className="race-meta"><span>{fmt(event.start_date)} — {fmt(event.end_date)}</span><span>{event.seasons?.year}</span></div>
        </Link>
      ))}</div> : <div className="empty"><strong>No verified events</strong><span className="muted">The calendar only displays source-checked events.</span></div>}
    </main>
  );
}
