import { getPilots } from '@/lib/data';

export const revalidate = 60;

export default async function PilotsPage() {
  const pilots = await getPilots();
  return (
    <main className="container">
      <div className="page-title"><div className="eyebrow">Competitors</div><h1>Pilots</h1><p className="muted">Verified racing pilots across supported championships.</p></div>
      {pilots.length ? <div className="grid">{pilots.map((pilot) => (
        <article className="card" key={pilot.id}><span className="verified">✓ {pilot.verification_status.toUpperCase()}</span><h3>{pilot.name}</h3><p className="muted">{pilot.nationality_code ?? 'Nationality not published'}</p>{pilot.biography && <p className="muted">{pilot.biography}</p>}</article>
      ))}</div> : <div className="empty"><strong>Verified pilot roster coming next</strong><span className="muted">SkyRacing will not invent pilot profiles. Official competitor records will populate this screen.</span></div>}
    </main>
  );
}
