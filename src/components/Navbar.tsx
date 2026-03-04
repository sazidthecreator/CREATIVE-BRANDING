import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.tsx';

interface NavbarProps {
  activePage?: string;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/resume', label: 'Resume' },
];

export default function Navbar({ activePage = '' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : activePage;

  return (
    <nav
      className={`nav-fixed${scrolled ? ' scrolled' : ''}`}
    >
      {/* Logo */}
      <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: 'var(--accent)', animation: 'dotPulse 2.5s infinite',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '12px', letterSpacing: '0.2em',
          color: 'var(--text)', textTransform: 'uppercase',
        }}>
          {lang === 'en' ? 'Sazid Hossain' : 'সাজিদ হোসেন'}
        </span>
      </a>

      {/* Desktop Nav */}
      <ul style={{
        display: 'flex', gap: '2px', listStyle: 'none', alignItems: 'center',
      }} className="hidden md:flex">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));
          return (
            <li key={href}>
              <a
                href={href}
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent)' : 'var(--muted2)',
                  textDecoration: 'none',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  border: isActive ? '1px solid rgba(180,255,87,0.18)' : '1px solid transparent',
                  transition: 'all 0.25s var(--ease)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 700 : 400,
                  boxShadow: isActive ? '0 2px 8px rgba(180,255,87,0.1)' : 'none',
                  display: 'block',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted2)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }
                }}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Lang toggle */}
        <button
          onClick={() => setLang(l => l === 'en' ? 'bn' : 'en')}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid var(--border2)', background: 'var(--surface)',
            color: 'var(--muted2)', cursor: 'pointer', fontSize: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s var(--ease-spring)', fontFamily: 'var(--font-display)',
            fontWeight: 700, letterSpacing: '0.05em',
            boxShadow: 'var(--clay-shadow)',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--clay-shadow-accent)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted2)';
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--clay-shadow)';
          }}
          aria-label="Toggle language"
        >
          {lang === 'en' ? 'বাং' : 'EN'}
        </button>

        <ThemeToggle />

        <a
          href="/contact"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            background: 'var(--accent)', color: '#030310',
            padding: '8px 20px', borderRadius: '10px',
            textDecoration: 'none', fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.3s var(--ease-spring)',
            boxShadow: '0 4px 16px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px) scale(1.03)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 28px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.18)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0) scale(1)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.18)';
          }}
        >
          Hire Me
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid var(--border2)', background: 'var(--surface)',
            color: 'var(--muted2)', cursor: 'pointer', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s var(--ease)',
            boxShadow: 'var(--clay-shadow)',
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0,
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(24px)',
          padding: '20px clamp(20px,5vw,48px) 28px',
          display: 'flex', flexDirection: 'column', gap: '4px',
          animation: 'slideIn 0.3s var(--ease) both',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '13px 16px', borderRadius: '10px',
                color: 'var(--text2)', textDecoration: 'none',
                fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)',
                fontWeight: 500, transition: 'all 0.2s var(--ease)',
                borderBottom: '1px solid var(--border)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)';
                (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-dim)';
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '22px';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '16px';
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
