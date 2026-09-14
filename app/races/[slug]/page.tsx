import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/data';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

function localTime(value: string | null, timeZone?: string | null) {
  if (!value) return 'TBA';
  return new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric', timeZone: timeZone ?? 'UTC' }).format(new Date(value));
}

export default async function RaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();
  const sessions = [...(event.sessions ?? [])].sort((a, b) => (a.scheduled_start ?? '').localeCompare(b.scheduled_start ?? ''));

  return (
    <main className="container">
      <section className="detail-hero">
        <div className="eyebrow">{event.seasons?.championships?.name ?? 'Championship event'}</div>
        <h1>{event.name}</h1>
        <p className="muted">{event.venues?.name ?? 'Venue pending'}{event.venues?.city ? ` · ${event.venues.city}, ${event.venues.region ?? ''}` : ''}</p>
        <div className="chips">
          <span className={`status ${event.status}`}>{event.status}</span>
          <span className="chip">{event.start_date} → {event.end_date}</span>
          <span className="chip">✓ {event.verification_status}</span>
        </div>
      </section>

      <div className="two-col">
        <section className="card">
          <div className="section-head"><div><div className="eyebrow">Race weekend</div><h2>Schedule</h2></div></div>
          {sessions.length ? <div className="schedule">{sessions.map((session) => (
            <div className="session" key={session.id}>
              <div className="session-time">{localTime(session.scheduled_start, event.timezone)}</div>
              <div><strong>{session.name}</strong><div className="muted">{session.racing_classes?.short_name ?? session.racing_classes?.name ?? session.session_type}</div></div>
              <span className={`status ${session.status}`}>{session.status}</span>
            </div>
          ))}</div> : <div className="empty"><strong>Schedule pending import</strong><span className="muted">Only verified official session times will appear here.</span></div>}
        </section>

        <aside className="card">
          <div className="eyebrow">Event information</div>
          <h3>Race classes</h3>
          <div className="chips">{(event.event_classes ?? []).map((item) => <span className="chip" key={item.id}>{item.racing_classes?.short_name ?? item.racing_classes?.name}</span>)}</div>
          <h3>Course</h3>
          <p className="muted">{event.course_summary ?? 'Course information pending verification.'}</p>
          <h3>Source</h3>
          {event.source_url ? <a className="verified" href={event.source_url} target="_blank" rel="noreferrer">Official event source ↗</a> : <span className="muted">Source pending</span>}
        </aside>
      </div>
    </main>
  );
}
