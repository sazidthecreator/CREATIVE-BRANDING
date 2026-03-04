import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nexus_theme') as 'dark' | 'light' | null;
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setPressed(true);
    setTimeout(() => setPressed(false), 300);
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('nexus_theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        width: '34px',
        height: '34px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border2)',
        background: 'transparent',
        color: 'var(--muted2)',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s var(--ease-spring)',
        transform: pressed ? 'scale(0.85)' : 'scale(1)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted2)';
      }}
    >
      <span style={{
        display: 'inline-block',
        transition: 'transform 0.3s var(--ease-spring), opacity 0.2s',
        transform: pressed ? 'rotate(180deg) scale(0.7)' : 'rotate(0deg) scale(1)',
      }}>
        {theme === 'dark' ? '☀' : '🌙'}
      </span>
    </button>
  );
}
