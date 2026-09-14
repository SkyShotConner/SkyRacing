import Link from 'next/link';
import { getClasses, getEvents } from '@/lib/data';

export const revalidate = 60;

function fmtDate(value: string) {
  return new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00Z`));
}

export default async function HomePage() {
  const [events, classes] = await Promise.all([getEvents(), getClasses()]);
  const nextEvent = events.find((event) => ['scheduled','upcoming','live'].includes(event.status)) ?? events[0];

  return (
    <main className="container">
      <section className="hero">
        <div className="hero-main">
          <div className="eyebrow">The digital home of air racing</div>
          <h1>Racing belongs in the sky.</h1>
          <p className="muted">One fast, verified platform for real-world air racing championships, race weekends, pilots, aircraft, results and standings.</p>
        </div>
        <div className="hero-side">
          <div className="card metric"><span className="muted">Verified classes</span><strong>{classes.length}</strong><span className="verified">Official-source records</span></div>
          <div className="card metric"><span className="muted">Tracked events</span><strong>{events.length}</strong><span className="muted">Expanding championship by championship</span></div>
          <div className="card metric"><span className="muted">Data policy</span><strong>REAL</strong><span className="muted">No invented race data</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head"><div><div className="eyebrow">Race centre</div><h2>Next event</h2></div><Link href="/races">Full calendar →</Link></div>
        {nextEvent ? (
          <Link href={`/races/${nextEvent.slug}`} className="card race-card">
            <span className={`status ${nextEvent.status}`}>{nextEvent.status}</span>
            <h3>{nextEvent.name}</h3>
            <p className="muted">{nextEvent.venues?.name ?? 'Venue pending'} · {nextEvent.venues?.city ?? ''} {nextEvent.venues?.region ?? ''}</p>
            <div className="race-meta"><span>{fmtDate(nextEvent.start_date)} — {fmtDate(nextEvent.end_date)}</span><span>{nextEvent.seasons?.championships?.short_name ?? nextEvent.seasons?.championships?.name}</span></div>
          </Link>
        ) : <div className="empty"><strong>No verified event yet</strong><span className="muted">Events appear here after source verification.</span></div>}
      </section>

      <section className="section">
        <div className="section-head"><div><div className="eyebrow">Competition</div><h2>Racing classes</h2></div></div>
        <div className="grid">
          {classes.map((item) => <article className="card" key={item.id}><span className="verified">✓ VERIFIED</span><h3>{item.name}</h3><p className="muted">{item.description ?? 'Technical information pending.'}</p></article>)}
        </div>
      </section>
    </main>
  );
}
