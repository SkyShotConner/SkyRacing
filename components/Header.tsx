import Link from 'next/link';
import { CalendarDays, Gauge, Home, Plane, Trophy, Users } from 'lucide-react';

const nav = [
  ['Home', '/', Home],
  ['Races', '/races', CalendarDays],
  ['Standings', '/standings', Trophy],
  ['Pilots', '/pilots', Users],
  ['Aircraft', '/aircraft', Plane],
  ['Results', '/results', Gauge],
] as const;

export function Header() {
  return (
    <>
      <header className="topbar">
        <Link href="/" className="brand" aria-label="SkyRacing home">
          <span className="brand-mark">SR</span>
          <span><strong>SKY</strong>RACING</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="live-pill"><span /> VERIFIED DATA</div>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.slice(0,5).map(([label, href, Icon]) => (
          <Link key={href} href={href}><Icon size={19}/><small>{label}</small></Link>
        ))}
      </nav>
    </>
  );
}
