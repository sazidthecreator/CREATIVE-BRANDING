import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
}

const BUDGETS = ['< $500', '$500–$2k', '$2k–$5k', '$5k–$10k', '$10k+', "Let's discuss"];

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${hasError ? 'var(--accent3)' : 'var(--border2)'}`,
  borderRadius: 'var(--radius-md)',
  padding: '14px 16px',
  color: 'var(--text)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  width: '100%',
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
});

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '', budget: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.boxShadow = '0 0 0 3px rgba(180,255,87,0.12)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof FormState) => {
    e.target.style.borderColor = errors[key] ? 'var(--accent3)' : 'var(--border2)';
    e.target.style.boxShadow = errors[key] ? '0 0 0 3px rgba(255,87,136,0.12)' : 'none';
  };

  const field = (key: keyof FormState, label: string, type = 'text', placeholder = '') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '9px', letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--accent)',
        fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ width: '16px', height: '1px', background: 'var(--accent)', display: 'block' }} />
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={form[key]}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
          placeholder={placeholder}
          rows={5}
          style={{ ...inputStyle(!!errors[key]), resize: 'vertical' }}
          onFocus={handleFocus}
          onBlur={e => handleBlur(e as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, key)}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
          placeholder={placeholder}
          style={inputStyle(!!errors[key])}
          onFocus={handleFocus}
          onBlur={e => handleBlur(e as React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, key)}
        />
      )}
      {errors[key] && (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent3)', fontFamily: 'var(--font-mono)' }}>
          ⚠ {errors[key]}
        </span>
      )}
    </div>
  );

  if (status === 'sent') {
    return (
      <div className="card" style={{
        padding: '60px 40px', textAlign: 'center',
        animation: 'scaleIn 0.5s var(--ease-spring)',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid rgba(180,255,87,0.4)',
            animation: 'pulseRing 1.5s ease-out infinite',
          }} />
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'var(--accent-dim)', border: '2px solid var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', margin: '0 auto',
          }}>✓</div>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--accent)', marginBottom: '12px' }}>
          <span className="inline-en">Message Sent!</span>
          <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>বার্তা পাঠানো হয়েছে!</span>
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>
          <span className="inline-en">I'll get back to you within 24 hours.</span>
          <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>আমি ২৪ ঘন্টার মধ্যে সাড়া দেব।</span>
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="card" style={{ padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✗</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--accent3)', marginBottom: '12px' }}>
          Something Went Wrong
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 'var(--text-sm)', marginBottom: '24px' }}>
          Please try again or email me directly at contact@sazid.dev
        </p>
        <button className="btn-ghost" onClick={() => setStatus('idle')}>Try Again</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-fields-grid">
        {field('name', 'Your Name', 'text', 'Sazid Hossain')}
        {field('email', 'Email Address', 'email', 'hello@example.com')}
      </div>
      {field('subject', 'Subject', 'text', "Let's collaborate on...")}

      {/* Budget selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{
          fontSize: '9px', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--accent)',
          fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '16px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          Budget Range (optional)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BUDGETS.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setForm(f => ({ ...f, budget: b }))}
              style={{
                padding: '7px 16px', borderRadius: 'var(--radius-pill)',
                border: `1px solid ${form.budget === b ? 'rgba(180,255,87,0.4)' : 'var(--border2)'}`,
                background: form.budget === b ? 'rgba(180,255,87,0.1)' : 'transparent',
                color: form.budget === b ? 'var(--accent)' : 'var(--muted2)',
                fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.2s var(--ease-spring)',
                transform: form.budget === b ? 'translateY(-1px)' : 'none',
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {field('message', 'Message', 'textarea', 'Tell me about your project...')}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary"
        style={{
          width: '100%',
          justifyContent: 'center',
          opacity: status === 'sending' ? 0.8 : 1,
          gap: '10px',
        }}
      >
        {status === 'sending' ? (
          <>
            <span style={{
              display: 'inline-block',
              width: '14px', height: '14px',
              border: '2px solid rgba(3,3,16,0.3)',
              borderTopColor: '#030310',
              borderRadius: '50%',
              animation: 'spinnerRing 0.7s linear infinite',
              flexShrink: 0,
            }} />
            <span className="inline-en">Sending...</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>পাঠানো হচ্ছে...</span>
          </>
        ) : (
          <>
            <span className="inline-en">Send Message →</span>
            <span className="inline-bn" style={{ fontFamily: 'var(--font-bn)' }}>বার্তা পাঠান →</span>
          </>
        )}
      </button>

      <style>{`
        @media (max-width: 580px) {
          .contact-fields-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
