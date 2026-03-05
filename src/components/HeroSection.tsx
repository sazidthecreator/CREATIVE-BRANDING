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

const STATS = [
  { num: 50, suffix: '+', label: 'Projects Shipped', labelBn: 'প্রজেক্ট সম্পন্ন' },
  { num: 3, suffix: '+', label: 'Years Experience', labelBn: 'বছরের অভিজ্ঞতা' },
  { num: 200, suffix: '+', label: 'Clients Helped', labelBn: 'ক্লায়েন্ট' },
];

function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatItem({ num, suffix, label, labelBn, lang, active }: {
  num: number; suffix: string; label: string; labelBn: string;
  lang: 'en' | 'bn'; active: boolean;
}) {
  const count = useCountUp(num, 1200, active);
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'var(--text-3xl)',
        color: 'var(--accent)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--muted2)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginTop: '6px',
        fontFamily: 'var(--font-mono)',
      }}>
        {lang === 'en' ? label : labelBn}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roles = lang === 'en' ? ROLES : ROLES_BN;
  const currentRole = roles[roleIdx % roles.length];

  // Typewriter
  useEffect(() => {
    const speed = isDeleting ? 38 : 75;
    if (!isDeleting && displayed === currentRole) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2400);
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

  // Trigger stat counters when stats come into view
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setStatsActive(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(80px,12vw,140px) clamp(20px,5vw,80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%',
        width: 'clamp(300px,50vw,700px)', height: 'clamp(300px,50vw,700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,255,87,0.055) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '2%',
        width: 'clamp(200px,35vw,500px)', height: 'clamp(200px,35vw,500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(87,255,218,0.045) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '20%',
        width: 'clamp(100px,18vw,240px)', height: 'clamp(100px,18vw,240px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,87,136,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '99px', padding: '6px 16px', marginBottom: '36px',
          fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
          color: 'var(--muted2)',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#22c55e', animation: 'dotPulse 2s infinite',
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
          letterSpacing: '-0.03em',
          marginBottom: '24px',
          color: 'var(--text)',
        }}>
          {lang === 'en' ? (
            <>
              I Build<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 55%, var(--accent3) 100%)',
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
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 55%)',
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
          height: 'clamp(28px,3vw,50px)',
          display: 'flex', alignItems: 'center',
          marginBottom: '32px',
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
              display: 'inline-block', width: '2px', height: '1.1em',
              background: 'var(--accent)', marginLeft: '2px',
              verticalAlign: 'middle', animation: 'blink 1s step-end infinite',
            }} />
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'var(--text-lg)', color: 'var(--text2)',
          maxWidth: '600px', lineHeight: 1.85, marginBottom: '44px',
        }}>
          {lang === 'en'
            ? 'Philosophy-trained designer from Dhaka. I architect AI-native products, automated funnels, and bilingual digital experiences that scale.'
            : <span style={{ fontFamily: 'var(--font-bn)' }}>ঢাকা থেকে ফিলোসফি-প্রশিক্ষিত ডিজাইনার। আমি AI-নেটিভ পণ্য, স্বয়ংক্রিয় ফানেল এবং দ্বিভাষিক ডিজিটাল অভিজ্ঞতা তৈরি করি।</span>
          }
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: 'clamp(48px,8vw,80px)' }}>
          <a href="/portfolio" className="btn btn-primary">
            {lang === 'en' ? 'View My Work' : 'আমার কাজ দেখুন'}
            <span style={{ transition: 'transform 0.2s' }}>→</span>
          </a>
          <a href="/contact" className="btn btn-outline">
            {lang === 'en' ? "Let's Talk" : 'কথা বলুন'}
          </a>
        </div>

        {/* Stat counters */}
        <div
          ref={statsRef}
          style={{
            display: 'flex', gap: 'clamp(24px,5vw,64px)',
            paddingTop: 'clamp(24px,4vw,40px)',
            borderTop: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}
        >
          {STATS.map(stat => (
            <StatItem key={stat.label} {...stat} lang={lang} active={statsActive} />
          ))}
        </div>
      </div>

      {/* Lang toggle (hero bottom-right) */}
      <button
        onClick={() => setLang(l => l === 'en' ? 'bn' : 'en')}
        style={{
          position: 'absolute', bottom: '40px', right: 'clamp(20px,5vw,80px)',
          background: 'var(--surface)', border: '1px solid var(--border2)',
          borderRadius: '8px', padding: '8px 16px', cursor: 'pointer',
          color: 'var(--muted2)', fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', gap: '6px',
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
        <span style={{ fontSize: '10px', opacity: 0.6 }}>↻</span>
        {lang === 'en' ? '→ বাংলায় দেখুন' : '→ View in English'}
      </button>
    </section>
  );
}

