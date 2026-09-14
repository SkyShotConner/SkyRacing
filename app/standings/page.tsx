import { getStandings } from '@/lib/data';

export const revalidate = 60;

export default async function StandingsPage() {
  const standings = await getStandings();
  return (
    <main className="container">
      <div className="page-title"><div className="eyebrow">Championship</div><h1>Standings</h1><p className="muted">Current verified championship positions by class.</p></div>
      {standings.length ? <div className="table-wrap"><table><thead><tr><th>Pos</th><th>Competitor</th><th>Class</th><th>Points</th><th>Wins</th><th>Podiums</th></tr></thead><tbody>{standings.map((row) => <tr key={row.id}><td className="pos">{row.position}</td><td>{row.pilots?.name ?? row.teams?.name ?? '—'}</td><td>{row.racing_classes?.short_name ?? row.racing_classes?.name ?? 'Overall'}</td><td><strong>{row.points}</strong></td><td>{row.wins ?? '—'}</td><td>{row.podiums ?? '—'}</td></tr>)}</tbody></table></div> : <div className="empty"><strong>No verified standings yet</strong><span className="muted">SkyRacing will show standings only when the championship publishes reliable data.</span></div>}
    </main>
  );
}
