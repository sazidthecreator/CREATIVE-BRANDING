import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
}

const BUDGETS = ['< $500', '$500–$2k', '$2k–$5k', '$5k–$10k', '$10k+', 'Let\'s discuss'];

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
      // TODO: Replace with your real Formspree endpoint (e.g. https://formspree.io/f/YOUR_FORM_ID)
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

  const field = (key: keyof FormState, label: string, type = 'text', placeholder = '') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: 'var(--text-xs)', letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--muted2)',
        fontFamily: 'var(--font-mono)',
      }}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={form[key]}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
          placeholder={placeholder}
          rows={5}
          style={{
            background: 'var(--surface2)', border: `1px solid ${errors[key] ? 'var(--accent3)' : 'var(--border2)'}`,
            borderRadius: '8px', padding: '12px 16px', color: 'var(--text)',
            fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
            resize: 'vertical', outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = errors[key] ? 'var(--accent3)' : 'var(--border2)')}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
          placeholder={placeholder}
          style={{
            background: 'var(--surface2)', border: `1px solid ${errors[key] ? 'var(--accent3)' : 'var(--border2)'}`,
            borderRadius: '8px', padding: '12px 16px', color: 'var(--text)',
            fontSize: 'var(--text-sm)', fontFamily: 'var(--font-body)',
            outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = errors[key] ? 'var(--accent3)' : 'var(--border2)')}
        />
      )}
      {errors[key] && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent3)' }}>{errors[key]}</span>}
    </div>
  );

  if (status === 'sent') {
    return (
      <div style={{
        padding: '60px 40px', textAlign: 'center',
        background: 'var(--surface)', borderRadius: '16px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--accent)', marginBottom: '12px' }}>
          Message Sent!
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>
          I'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{
        padding: '60px 40px', textAlign: 'center',
        background: 'var(--surface)', borderRadius: '16px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✗</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--accent3)', marginBottom: '12px' }}>
          Something Went Wrong
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 'var(--text-sm)', marginBottom: '24px' }}>
          Please try again or email me directly at contact@sazid.dev
        </p>
        <button className="btn btn-outline" onClick={() => setStatus('idle')}>Try Again</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {field('name', 'Your Name', 'text', 'Sazid Hossain')}
        {field('email', 'Email Address', 'email', 'hello@example.com')}
      </div>
      {field('subject', 'Subject', 'text', 'Let\'s collaborate on...')}

      {/* Budget selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{
          fontSize: 'var(--text-xs)', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--muted2)',
          fontFamily: 'var(--font-mono)',
        }}>
          Budget Range (optional)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {BUDGETS.map(b => (
            <button
              key={b}
              type="button"
              onClick={() => setForm(f => ({ ...f, budget: b }))}
              style={{
                padding: '6px 14px', borderRadius: '99px',
                border: `1px solid ${form.budget === b ? 'var(--accent)' : 'var(--border2)'}`,
                background: form.budget === b ? 'var(--accent-dim)' : 'transparent',
                color: form.budget === b ? 'var(--accent)' : 'var(--muted2)',
                fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                cursor: 'pointer', transition: 'all 0.2s',
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
        className="btn btn-primary"
        style={{ alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}
