import { getAircraft } from '@/lib/data';

export const revalidate = 60;

export default async function AircraftPage() {
  const aircraft = await getAircraft();
  return (
    <main className="container">
      <div className="page-title"><div className="eyebrow">Machines</div><h1>Aircraft</h1><p className="muted">Race aircraft with source-verified identity and specifications where available.</p></div>
      {aircraft.length ? <div className="grid">{aircraft.map((item) => (
        <article className="card" key={item.id}>
          <span className="verified">✓ {item.verification_status.toUpperCase()}</span>
          <h3>{item.name ?? item.aircraft_models?.model ?? 'Race aircraft'}</h3>
          <p className="muted">{item.aircraft_models ? `${item.aircraft_models.manufacturer} ${item.aircraft_models.model}` : 'Model details pending'}</p>
          <div className="race-meta"><span>{item.racing_number ? `#${item.racing_number}` : 'No race number published'}</span><span>{item.racing_classes?.short_name ?? item.racing_classes?.name ?? ''}</span></div>
          <p className="muted">Pilot: {item.pilots?.name ?? 'Not linked'}</p>
        </article>
      ))}</div> : <div className="empty"><strong>Verified aircraft roster coming next</strong><span className="muted">Aircraft will appear only after their racing identity is checked against official sources.</span></div>}
    </main>
  );
}
