import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.tsx';

interface NavbarProps {
  activePage?: string;
}

const NAV_LINKS = [
  { href: '/', label: 'Home', labelBn: 'হোম' },
  { href: '/about', label: 'About', labelBn: 'পরিচয়' },
  { href: '/portfolio', label: 'Work', labelBn: 'কাজ' },
  { href: '/services', label: 'Services', labelBn: 'সেবা' },
  { href: '/blog', label: 'Blog', labelBn: 'ব্লগ' },
  { href: '/philosophy', label: 'Philosophy', labelBn: 'দর্শন' },
  { href: '/resume', label: 'Resume', labelBn: 'রেজুমে' },
];

export default function Navbar({ activePage = '' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  useEffect(() => {
    // Restore lang from localStorage on mount
    const saved = localStorage.getItem('nexus_lang') as 'en' | 'bn' | null;
    if (saved === 'en' || saved === 'bn') {
      setLang(saved);
      document.documentElement.setAttribute('data-lang', saved);
    } else {
      document.documentElement.setAttribute('data-lang', 'en');
    }
    // Restore theme
    const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
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

  const toggleLang = () => {
    const next = lang === 'en' ? 'bn' : 'en';
    setLang(next);
    localStorage.setItem('nexus_lang', next);
    document.documentElement.setAttribute('data-lang', next);
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : activePage;

  return (
    <nav
      className={`nav-fixed${scrolled ? ' scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} aria-label="Sazid Hossain — Home">
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
          SAZID.SYS
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '9px',
          color: 'var(--muted)', letterSpacing: '0.1em',
        }}>
          [v7]
        </span>
      </a>

      {/* Desktop Nav */}
      <ul style={{
        display: 'flex', gap: '4px', listStyle: 'none', alignItems: 'center',
      }} className="hidden md:flex">
        {NAV_LINKS.map(({ href, label, labelBn }) => {
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
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  transition: 'all 0.2s var(--ease-spring)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 600 : 400,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-dim)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted2)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }
                }}
              >
                <span className="inline-en">{label}</span>
                <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)', fontSize: '9px' }}>{labelBn}</span>
                {isActive && (
                  <span style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: 'var(--accent)', display: 'block',
                  }} />
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          aria-label={`Switch to ${lang === 'en' ? 'Bengali' : 'English'}`}
          style={{
            height: '34px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border2)', background: 'transparent',
            color: 'var(--muted2)', cursor: 'pointer', fontSize: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s var(--ease-spring)', fontFamily: 'var(--font-display)',
            fontWeight: 600, letterSpacing: '0.05em', padding: '0 12px',
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(180,255,87,0.4)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted2)';
          }}
        >
          {lang === 'en' ? 'বাং' : 'EN'}
        </button>

        <ThemeToggle />

        <a
          href="/contact"
          aria-label="Hire Me"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            background: 'var(--accent)', color: '#030310',
            padding: '8px 18px', borderRadius: 'var(--radius-sm)',
            textDecoration: 'none', fontSize: '10px',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.3s var(--ease-spring)',
            boxShadow: 'var(--clay-shadow-accent)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px) scale(1.02)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(180,255,87,0.35)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0) scale(1)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--clay-shadow-accent)';
          }}
        >
          <span className="inline-en">Hire Me →</span>
          <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>নিয়োগ করুন →</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: '34px', height: '34px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border2)', background: 'transparent',
            color: 'var(--muted2)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '4px', padding: '8px',
            transition: 'all 0.2s',
          }}
          className="md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span style={{
            display: 'block', width: '16px', height: '1.5px',
            background: 'currentColor', borderRadius: '2px',
            transition: 'transform 0.25s, opacity 0.25s',
            transform: menuOpen ? 'translateY(5.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '16px', height: '1.5px',
            background: 'currentColor', borderRadius: '2px',
            transition: 'opacity 0.25s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: '16px', height: '1.5px',
            background: 'currentColor', borderRadius: '2px',
            transition: 'transform 0.25s, opacity 0.25s',
            transform: menuOpen ? 'translateY(-5.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </div>

      {/* Mobile Menu overlay */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation menu"
          style={{
            position: 'fixed', inset: 0, zIndex: 800,
            background: 'rgba(3,3,16,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            padding: '80px clamp(24px,6vw,60px) 40px',
            animation: 'fadeIn 0.2s var(--ease-expo)',
          }}
        >
          {NAV_LINKS.map(({ href, label, labelBn }, i) => {
            const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(href));
            return (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--accent)' : 'var(--text2)',
                  textDecoration: 'none',
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s',
                  borderBottom: '1px solid rgba(180,255,87,0.06)',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  animation: `slideInLeft 0.4s var(--ease-expo) ${i * 0.05}s both`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>
                  <span className="inline-en">{label}</span>
                  <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>{labelBn}</span>
                </span>
                {isActive && <span style={{ color: 'var(--accent)' }}>→</span>}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
