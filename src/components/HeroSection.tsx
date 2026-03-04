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
  { num: '3+', label: 'Years Experience', labelBn: 'বছরের অভিজ্ঞতা' },
  { num: '32+', label: 'Projects Delivered', labelBn: 'প্রজেক্ট ডেলিভার' },
  { num: '12+', label: 'Industries', labelBn: 'শিল্পখাত' },
  { num: '100%', label: 'Philosophy-Driven', labelBn: 'দর্শন-চালিত' },
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

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const saved = localStorage.getItem('nexus_lang') as 'en' | 'bn' | null;
    if (saved === 'en' || saved === 'bn') setLang(saved);
  }, []);

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
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-5%',
        width: 'clamp(400px, 55vw, 700px)',
        height: 'clamp(400px, 55vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180,255,87,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(60px)',
        animation: 'orbDrift 12s ease-in-out infinite',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-5%', right: '0%',
        width: 'clamp(250px, 38vw, 500px)',
        height: 'clamp(250px, 38vw, 500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(87,255,218,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
        animation: 'orbDrift 16s ease-in-out infinite reverse',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute',
        top: '40%', right: '15%',
        width: 'clamp(150px, 22vw, 280px)',
        height: 'clamp(150px, 22vw, 280px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,87,136,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(50px)',
        animation: 'orbDrift 20s 4s ease-in-out infinite',
        willChange: 'transform',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'none' : 'translateY(20px)',
        transition: '1s var(--ease-expo)',
      }}>
        {/* Section label */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.7s var(--ease-expo) 0.1s, transform 0.7s var(--ease-expo) 0.1s',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 16px',
            marginBottom: '32px',
            fontSize: '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase' as const,
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#22c55e', animation: 'dotPulse 2s infinite',
              flexShrink: 0,
            }} />
            <span className="inline-en">⟨ NEXUS_v7.0 ⟩ · Available</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>⟨ NEXUS_v7.0 ⟩ · উপলব্ধ</span>
          </div>
        </div>

        {/* Name heading */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s var(--ease-expo) 0.2s, transform 0.8s var(--ease-expo) 0.2s',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            marginBottom: '28px',
            color: 'var(--text)',
          }}>
            <span className="inline-en">
              SAZID<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                HOSSAIN
              </span>
            </span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>
              সাজিদ<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                হোসেন
              </span>
            </span>
          </h1>
        </div>

        {/* Typewriter role badge */}
        <div style={{
          marginBottom: '28px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.8s var(--ease-expo) 0.4s, transform 0.8s var(--ease-expo) 0.4s',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 'clamp(36px, 4vw, 52px)',
            background: 'rgba(180,255,87,0.1)',
            border: '1px solid rgba(180,255,87,0.2)',
            borderRadius: 'var(--radius-pill)',
            padding: '8px 20px',
          }}>
            <span style={{
              fontFamily: lang === 'bn' ? 'var(--font-bn)' : 'var(--font-mono)',
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              color: 'var(--accent)',
              fontWeight: 600,
            }}>
              {displayed}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: 'var(--accent)',
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
              }} />
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(12px)',
          transition: 'opacity 0.8s var(--ease-expo) 0.5s, transform 0.8s var(--ease-expo) 0.5s',
          marginBottom: '48px',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'var(--text-lg)',
            color: 'var(--muted2)',
            maxWidth: '520px',
            lineHeight: 1.7,
          }}>
            <span className="inline-en">Philosophy meets technology. Strategy before execution — always.</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)', fontStyle: 'normal' }}>দর্শন মিলিত প্রযুক্তি। সর্বদা কৌশল সর্বাগ্রে।</span>
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{
          display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(12px)',
          transition: 'opacity 0.8s var(--ease-expo) 0.6s, transform 0.8s var(--ease-expo) 0.6s',
        }}>
          <a href="/contact" className="btn-primary">
            <span className="inline-en">Start a Project →</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>প্রজেক্ট শুরু করুন →</span>
          </a>
          <a href="/portfolio" className="btn-ghost">
            <span className="inline-en">View Work</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>কাজ দেখুন</span>
          </a>
        </div>

        {/* Social proof */}
        <div style={{
          marginBottom: '64px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s var(--ease-expo) 0.7s',
        }}>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
          }}>
            <span className="inline-en">32+ projects delivered · Available now</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>৩২+ প্রজেক্ট সম্পন্ন · এখন উপলব্ধ</span>
          </span>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', gap: 'clamp(12px, 3vw, 32px)',
          flexWrap: 'wrap',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.8s var(--ease-expo) 0.8s, transform 0.8s var(--ease-expo) 0.8s',
        }}>
          {STATS.map(({ num, label, labelBn }) => (
            <div key={label} className="card" style={{
              padding: 'clamp(14px, 2.5vw, 20px) clamp(18px, 3vw, 28px)',
              textAlign: 'center',
              minWidth: 'clamp(80px, 12vw, 110px)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'var(--text-2xl)',
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {num}
              </div>
              <div style={{
                fontSize: '9px',
                color: 'var(--muted2)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.4,
              }}>
                <span className="inline-en">{label}</span>
                <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)', fontSize: '10px' }}>{labelBn}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lang toggle */}
      <button
        onClick={() => {
          const next = lang === 'en' ? 'bn' : 'en';
          setLang(next);
          localStorage.setItem('nexus_lang', next);
          document.documentElement.setAttribute('data-lang', next);
        }}
        aria-label="Toggle language"
        style={{
          position: 'absolute', bottom: '40px', right: 'clamp(20px,5vw,80px)',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 16px', cursor: 'pointer',
          color: 'var(--muted2)', fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)', transition: 'all 0.2s var(--ease-spring)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(180,255,87,0.3)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--glass-border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted2)';
        }}
      >
        {lang === 'en' ? '→ বাংলায় দেখুন' : '→ View in English'}
      </button>
    </section>
  );
}
