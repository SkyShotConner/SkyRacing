import { getResults } from '@/lib/data';

export const revalidate = 60;

function fmtMs(ms: number | null) {
  if (ms == null) return '—';
  const seconds = ms / 1000;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${(seconds % 60).toFixed(3).padStart(6,'0')}`;
}

export default async function ResultsPage() {
  const results = await getResults();
  return (
    <main className="container">
      <div className="page-title"><div className="eyebrow">Official timing</div><h1>Results</h1><p className="muted">Provisional and official results, exactly as verified from race sources.</p></div>
      {results.length ? <div className="table-wrap"><table><thead><tr><th>Pos</th><th>Pilot</th><th>Race #</th><th>Session</th><th>Time</th><th>Status</th></tr></thead><tbody>{results.map((result) => <tr key={result.id}><td className="pos">{result.position ?? '—'}</td><td>{result.entries?.pilots?.name ?? '—'}</td><td>{result.entries?.racing_number ?? '—'}</td><td>{result.sessions?.name ?? '—'}</td><td>{fmtMs(result.total_time_ms)}</td><td><span className="verified">{result.result_status}</span></td></tr>)}</tbody></table></div> : <div className="empty"><strong>No verified results yet</strong><span className="muted">Results will publish here when official or reliably sourced timing data becomes available.</span></div>}
    </main>
  );
}
