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
    const saved = localStorage.getItem('nexus_lang') as 'en' | 'bn' | null;
    if (saved === 'en' || saved === 'bn') {
      setLang(saved);
      document.documentElement.setAttribute('data-lang', saved);
    } else {
      document.documentElement.setAttribute('data-lang', 'en');
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
        display: 'flex', gap: '4px', listStyle: 'none', alignItems: 'center',
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
                  color: isActive ? 'var(--text)' : 'var(--muted2)',
                  textDecoration: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-dim)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted2)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
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
          onClick={() => {
            const newLang = lang === 'en' ? 'bn' : 'en';
            setLang(newLang);
            localStorage.setItem('nexus_lang', newLang);
            document.documentElement.setAttribute('data-lang', newLang);
          }}
          style={{
            width: '34px', height: '34px', borderRadius: '8px',
            border: '1px solid var(--border2)', background: 'transparent',
            color: 'var(--muted2)', cursor: 'pointer', fontSize: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', fontFamily: 'var(--font-display)',
            fontWeight: 600, letterSpacing: '0.05em',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted2)';
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
            padding: '7px 18px', borderRadius: '6px',
            textDecoration: 'none', fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px var(--accent-glow)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
          }}
        >
          Hire Me
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: '34px', height: '34px', borderRadius: '8px',
            border: '1px solid var(--border2)', background: 'transparent',
            color: 'var(--muted2)', cursor: 'pointer', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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
          position: 'fixed', top: '62px', left: 0, right: 0,
          background: 'color-mix(in srgb, var(--bg2) 92%, transparent)', borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(18px) saturate(135%)',
          padding: '20px clamp(20px,5vw,48px)',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));
            return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '12px 16px', borderRadius: '8px',
                  color: isActive ? 'var(--text)' : 'var(--text2)', textDecoration: 'none',
                  fontSize: 'var(--text-sm)', fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 700 : 500, transition: 'all 0.2s',
                  borderBottom: '1px solid var(--border)',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
