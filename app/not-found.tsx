import Link from 'next/link';

export default function NotFound() {
  return <main className="container"><div className="empty"><strong>Race data not found</strong><span className="muted">This record may not exist or may not be verified yet.</span><p><Link className="verified" href="/races">Return to race calendar →</Link></p></div></main>;
}
