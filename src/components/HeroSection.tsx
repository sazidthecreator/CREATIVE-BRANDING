import { useState, useEffect, useRef } from 'react';

const ROLES = [
  'Creative Technologist',
  'AI Automation Strategist',
  'Full-Stack Designer',
  'Brand Architect',
  'Philosophy-Driven Builder',
];

const ROLES_BN = [
  'ক্রিয়েটিভ টেকনোলজিস্ট',
  'এআই অটোমেশন স্ট্র্যাটেজিস্ট',
  'ব্র্যান্ড আর্কিটেক্ট',
  'ফিলোসফি-ড্রিভেন বিল্ডার',
];

interface OrbConfig {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  size: string;
  color: string;
  blur: string;
  dur: string;
}

const ORB_CONFIGS: OrbConfig[] = [
  { top: '15%', left: '8%', size: 'clamp(320px,48vw,680px)', color: 'rgba(180,255,87,0.07)', blur: '70px', dur: '18s' },
  { bottom: '8%', right: '4%', size: 'clamp(240px,36vw,520px)', color: 'rgba(87,255,218,0.055)', blur: '90px', dur: '22s' },
  { top: '55%', left: '55%', size: 'clamp(160px,22vw,340px)', color: 'rgba(255,87,136,0.04)', blur: '60px', dur: '14s' },
];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roles = lang === 'en' ? ROLES : ROLES_BN;
  const currentRole = roles[roleIdx % roles.length];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    if (!isDeleting && displayed === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setRoleIdx(i => i + 1);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(prev =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, currentRole]);

  useEffect(() => {
    setDisplayed('');
    setIsDeleting(false);
    setRoleIdx(0);
  }, [lang]);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background orbs */}
      {ORB_CONFIGS.map((orb, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: orb.top,
          left: orb.left,
          bottom: orb.bottom,
          right: orb.right,
          width: orb.size,
          height: orb.size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
          pointerEvents: 'none',
          filter: `blur(${orb.blur})`,
          animation: `orbDrift ${orb.dur} ease-in-out infinite`,
          animationDelay: `${i * -4}s`,
          willChange: 'transform',
        }} />
      ))}

      <div style={{
        maxWidth: '1200px', margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.8s var(--ease), transform 0.8s var(--ease)',
      }}>
        {/* Status badge — clay pill */}
        <div
          className="clay-badge"
          style={{
            marginBottom: '36px',
            animation: 'scaleIn 0.6s var(--ease-spring) 0.1s both',
          }}
        >
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#22c55e',
            animation: 'dotPulse 2s infinite',
            flexShrink: 0,
          }} />
          Available for collaboration · Dhaka, Bangladesh
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'var(--text-hero)',
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          marginBottom: '24px',
          color: 'var(--text)',
          animation: 'slideIn 0.7s var(--ease) 0.2s both',
        }}>
          {lang === 'en' ? (
            <>
              I Build<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 60%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 5s ease infinite',
              }}>
                Digital
              </span>{' '}
              Systems<br />
              That Think.
            </>
          ) : (
            <>
              আমি তৈরি করি<br />
              <span style={{
                fontFamily: 'var(--font-bn)',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 60%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 5s ease infinite',
              }}>
                ডিজিটাল
              </span>{' '}
              <span style={{ fontFamily: 'var(--font-bn)' }}>সিস্টেম।</span>
            </>
          )}
        </h1>

        {/* Typewriter role */}
        <div style={{
          height: 'clamp(32px,3.5vw,52px)',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px',
          animation: 'slideIn 0.7s var(--ease) 0.35s both',
        }}>
          <span style={{
            fontFamily: lang === 'bn' ? 'var(--font-bn)' : 'var(--font-serif)',
            fontStyle: lang === 'en' ? 'italic' : 'normal',
            fontSize: 'var(--text-2xl)',
            color: 'var(--accent)',
            fontWeight: lang === 'en' ? 400 : 600,
          }}>
            {displayed}
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1.1em',
              background: 'var(--accent)',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
              boxShadow: '0 0 8px var(--accent)',
            }} />
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--text2)',
          maxWidth: '580px',
          lineHeight: 1.8,
          marginBottom: '48px',
          animation: 'slideIn 0.7s var(--ease) 0.45s both',
        }}>
          {lang === 'en'
            ? 'Philosophy-trained designer from Dhaka. I architect AI-native products, automated funnels, and bilingual digital experiences that scale.'
            : <span style={{ fontFamily: 'var(--font-bn)' }}>ঢাকা থেকে ফিলোসফি-প্রশিক্ষিত ডিজাইনার। আমি AI-নেটিভ পণ্য, স্বয়ংক্রিয় ফানেল এবং দ্বিভাষিক ডিজিটাল অভিজ্ঞতা তৈরি করি।</span>
          }
        </p>

        {/* CTA */}
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap',
          animation: 'slideIn 0.7s var(--ease) 0.55s both',
        }}>
          <a href="/portfolio" className="btn btn-primary">
            View My Work
            <span style={{ transition: 'transform 0.2s var(--ease-spring)' }}>→</span>
          </a>
          <a href="/contact" className="btn btn-outline">
            Let's Talk
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 'clamp(24px,5vw,60px)',
          marginTop: 'clamp(48px,8vw,80px)',
          flexWrap: 'wrap',
          animation: 'slideIn 0.7s var(--ease) 0.65s both',
        }}>
          {[
            { num: '6+', label: 'Projects Shipped' },
            { num: '2+', label: 'Years Experience' },
            { num: '100%', label: 'Client Satisfaction' },
          ].map(({ num, label }) => (
            <div key={label} style={{
              padding: '16px 24px',
              background: 'var(--surface)',
              borderRadius: 'var(--clay-radius-sm)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--clay-shadow)',
              transition: 'all 0.3s var(--ease-spring)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--clay-shadow-accent)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--clay-shadow)';
            }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'var(--text-3xl)',
                color: 'var(--accent)',
                lineHeight: 1,
              }}>
                {num}
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--muted2)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop: '6px',
                fontFamily: 'var(--font-mono)',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lang toggle (hero) */}
      <button
        onClick={() => setLang(l => l === 'en' ? 'bn' : 'en')}
        style={{
          position: 'absolute', bottom: '40px', right: 'clamp(20px,5vw,80px)',
          background: 'var(--surface)', border: '1px solid var(--border2)',
          borderRadius: 'var(--clay-radius-sm)', padding: '9px 18px', cursor: 'pointer',
          color: 'var(--muted2)', fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)', transition: 'all 0.3s var(--ease-spring)',
          boxShadow: 'var(--clay-shadow)',
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
      >
        {lang === 'en' ? '→ বাংলায় দেখুন' : '→ View in English'}
      </button>
    </section>
  );
}
