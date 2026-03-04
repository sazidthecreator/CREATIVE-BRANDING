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

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roles = lang === 'en' ? ROLES : ROLES_BN;
  const currentRole = roles[roleIdx % roles.length];

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

  // Reset on lang change
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
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '10%',
        width: 'clamp(300px,50vw,700px)',
        height: 'clamp(300px,50vw,700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,255,87,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '5%',
        width: 'clamp(200px,35vw,500px)',
        height: 'clamp(200px,35vw,500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(87,255,218,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '99px', padding: '6px 16px', marginBottom: '32px',
          fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
          color: 'var(--muted2)',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#22c55e', animation: 'dotPulse 2s infinite',
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
        }}>
          {lang === 'en' ? (
            <>
              I Build<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ডিজিটাল
              </span>{' '}
              <span style={{ fontFamily: 'var(--font-bn)' }}>সিস্টেম।</span>
            </>
          )}
        </h1>

        {/* Typewriter role */}
        <div style={{
          height: 'clamp(28px,3vw,48px)',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <span
            role="status"
            aria-live="polite"
            style={{
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
        }}>
          {lang === 'en'
            ? 'Philosophy-trained designer from Dhaka. I architect AI-native products, automated funnels, and bilingual digital experiences that scale.'
            : <span style={{ fontFamily: 'var(--font-bn)' }}>ঢাকা থেকে ফিলোসফি-প্রশিক্ষিত ডিজাইনার। আমি AI-নেটিভ পণ্য, স্বয়ংক্রিয় ফানেল এবং দ্বিভাষিক ডিজিটাল অভিজ্ঞতা তৈরি করি।</span>
          }
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/portfolio" className="btn btn-primary">
            View My Work
            <span>→</span>
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
        }}>
          {[
              { num: '50+', label: 'Projects Shipped' },
              { num: '3+', label: 'Years Experience' },
              { num: '200+', label: 'Clients Helped' },
          ].map(({ num, label }, i) => (
            <div key={label} style={{ animation: `slideIn 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s both` }}>
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
        onClick={() => {
          const newLang = lang === 'en' ? 'bn' : 'en';
          setLang(newLang);
          localStorage.setItem('nexus_lang', newLang);
          document.documentElement.setAttribute('data-lang', newLang);
        }}
        aria-label={lang === 'en' ? 'Switch to Bengali' : 'Switch to English'}
        style={{
          position: 'absolute', bottom: '40px', right: 'clamp(20px,5vw,80px)',
          background: 'var(--surface)', border: '1px solid var(--border2)',
          borderRadius: '8px', padding: '8px 16px', cursor: 'pointer',
          color: 'var(--muted2)', fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
        }}
      >
        {lang === 'en' ? '→ বাংলায় দেখুন' : '→ View in English'}
      </button>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        animation: 'bounce 2s ease-in-out infinite',
        color: 'var(--muted)',
        pointerEvents: 'none',
      }} aria-hidden="true">
        <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3L8 13M8 13L4 9M8 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
