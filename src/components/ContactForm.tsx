import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
}

const BUDGETS = ['< $500', '$500–$2k', '$2k–$5k', '$5k–$10k', '$10k+', "Let's discuss"];

const inputBase: React.CSSProperties = {
  background: 'var(--surface2)',
  borderRadius: 'var(--clay-radius-sm)',
  padding: '14px 18px',
  color: 'var(--text)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'all 0.25s var(--ease)',
  width: '100%',
  boxSizing: 'border-box',
};

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
    await new Promise(r => setTimeout(r, 1500));
    setStatus('sent');
  };

  const getInputStyle = (key: keyof FormState): React.CSSProperties => ({
    ...inputBase,
    border: `1px solid ${errors[key] ? 'var(--accent3)' : 'var(--border2)'}`,
    boxShadow: `inset 0 2px 6px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.04)`,
  });

  const field = (key: keyof FormState, label: string, type = 'text', placeholder = '') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
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
            ...getInputStyle(key),
            resize: 'vertical',
            lineHeight: 1.7,
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--accent)';
            e.target.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.1), 0 0 0 3px var(--accent-dim), 0 1px 0 rgba(255,255,255,0.04)';
          }}
          onBlur={e => {
            e.target.style.borderColor = errors[key] ? 'var(--accent3)' : 'var(--border2)';
            e.target.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.04)';
          }}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(err => ({ ...err, [key]: '' })); }}
          placeholder={placeholder}
          style={getInputStyle(key)}
          onFocus={e => {
            e.target.style.borderColor = 'var(--accent)';
            e.target.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.1), 0 0 0 3px var(--accent-dim), 0 1px 0 rgba(255,255,255,0.04)';
          }}
          onBlur={e => {
            e.target.style.borderColor = errors[key] ? 'var(--accent3)' : 'var(--border2)';
            e.target.style.boxShadow = 'inset 0 2px 6px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.04)';
          }}
        />
      )}
      {errors[key] && (
        <span style={{
          fontSize: 'var(--text-xs)', color: 'var(--accent3)',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          ⚠ {errors[key]}
        </span>
      )}
    </div>
  );

  if (status === 'sent') {
    return (
      <div style={{
        padding: '60px 40px', textAlign: 'center',
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        borderRadius: 'var(--clay-radius)',
        border: '1px solid rgba(180,255,87,0.2)',
        boxShadow: 'var(--clay-shadow-accent)',
        animation: 'scaleIn 0.4s var(--ease-spring)',
      }}>
        <div style={{
          fontSize: '52px', marginBottom: '16px',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '80px', height: '80px',
          background: 'rgba(180,255,87,0.12)', borderRadius: '50%',
          border: '2px solid rgba(180,255,87,0.3)',
          animation: 'pulseRing 2s infinite',
        }}>✓</div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
          color: 'var(--accent)', marginBottom: '12px',
        }}>
          Message Sent!
        </h3>
        <p style={{ color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>
          I'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {field('name', 'Your Name', 'text', 'Sazid Hossain')}
        {field('email', 'Email Address', 'email', 'hello@example.com')}
      </div>
      {field('subject', 'Subject', 'text', "Let's collaborate on...")}

      {/* Budget selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                padding: '7px 16px', borderRadius: '99px',
                border: `1px solid ${form.budget === b ? 'var(--accent)' : 'var(--border2)'}`,
                background: form.budget === b ? 'var(--accent-dim)' : 'var(--surface)',
                color: form.budget === b ? 'var(--accent)' : 'var(--muted2)',
                fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'all 0.25s var(--ease-spring)',
                boxShadow: form.budget === b ? 'var(--clay-shadow-accent)' : 'var(--clay-shadow)',
                transform: form.budget === b ? 'translateY(-1px)' : 'translateY(0)',
                fontWeight: form.budget === b ? 600 : 400,
              }}
              onMouseEnter={e => {
                if (form.budget !== b) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={e => {
                if (form.budget !== b) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border2)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted2)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }
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
        style={{
          alignSelf: 'flex-start',
          opacity: status === 'sending' ? 0.75 : 1,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'sending' ? (
          <>
            <span style={{ animation: 'blink 1s step-end infinite' }}>⏳</span>
            Sending...
          </>
        ) : (
          <>Send Message →</>
        )}
      </button>
    </form>
  );
}
