import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        border: '1px solid var(--border2)',
        background: 'var(--surface)',
        color: theme === 'dark' ? 'var(--gold)' : 'var(--accent)',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s var(--ease-spring)',
        boxShadow: 'var(--clay-shadow)',
        transform: spinning ? 'rotate(180deg) scale(0.9)' : 'rotate(0deg) scale(1)',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.08)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--clay-shadow-accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--clay-shadow)';
      }}
    >
      {theme === 'dark' ? '☀' : '◑'}
    </button>
  );
}
