// ──────────────────────────────────────────────────────
// THEME
// ──────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('nexus_admin_theme') ||
                localStorage.getItem('nexus_setting_theme') || 'dark';
  const theme = saved === 'auto'
    ? (window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark')
    : saved;
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeBtn').textContent = theme === 'dark' ? '🌙' : '☀️';
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nexus_admin_theme', next);
  document.getElementById('themeBtn').textContent = next === 'dark' ? '🌙' : '☀️';
}

// ──────────────────────────────────────────────────────
// LANGUAGE
// ──────────────────────────────────────────────────────
let currentLang = 'en';
function initLang() {
  currentLang = localStorage.getItem('nexus_setting_lang') || 'en';
  document.documentElement.setAttribute('data-lang', currentLang);
  document.getElementById('langBtn').textContent = currentLang === 'en' ? 'বাং' : 'EN';
  applyLang();
}
function toggleLang() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  localStorage.setItem('nexus_setting_lang', currentLang);
  document.documentElement.setAttribute('data-lang', currentLang);
  document.getElementById('langBtn').textContent = currentLang === 'en' ? 'বাং' : 'EN';
  applyLang();
}
function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute(currentLang === 'en' ? 'data-en' : 'data-bn') || el.getAttribute('data-en');
    // For inputs and form elements, set placeholder or value; for others set textContent
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'OPTION') {
      el.textContent = val;
    } else {
      el.textContent = val;
    }
  });
  // Update submit button
  const submitLabel = document.getElementById('submitLabel');
  if (submitLabel) {
    submitLabel.textContent = currentLang === 'en' ? 'Send Message →' : 'বার্তা পাঠান →';
  }
  // Update form title
  const formTitle = document.querySelector('.form-title');
  if (formTitle) {
    formTitle.textContent = currentLang === 'en' ? 'Send a Message' : 'বার্তা পাঠান';
  }
}

// ──────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────
function applySettings() {
  const email = localStorage.getItem('nexus_setting_email');
  if (email) {
    const el = document.getElementById('contactEmail');
    if (el) { el.href = 'mailto:' + email; el.textContent = email; }
  }
  const loc = localStorage.getItem('nexus_setting_location');
  if (loc) {
    const el = document.getElementById('contactLocation');
    if (el) el.textContent = loc;
  }
  const status = localStorage.getItem('nexus_setting_status');
  if (status) {
    const avail = document.querySelector('.avail-badge span');
    if (avail && currentLang === 'en') avail.textContent = status;
  }
}

// ──────────────────────────────────────────────────────
// CONTACT FORM
// ──────────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value;
  const msg = document.getElementById('fmsg').value.trim();
  const msgEl = document.getElementById('formMsg');
  const btn = document.getElementById('submitBtn');
  const isBn = currentLang === 'bn';

  // Validation
  if (!name) {
    showMsg('error', isBn ? '⚠️ আপনার নাম দিন' : '⚠️ Please enter your name');
    document.getElementById('fname').focus();
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMsg('error', isBn ? '⚠️ বৈধ ইমেইল ঠিকানা দিন' : '⚠️ Please enter a valid email address');
    document.getElementById('femail').focus();
    return;
  }
  if (!msg) {
    showMsg('error', isBn ? '⚠️ একটি বার্তা লিখুন' : '⚠️ Please write a message');
    document.getElementById('fmsg').focus();
    return;
  }

  // Simulate send (no backend — mailto fallback)
  btn.disabled = true;
  document.getElementById('submitLabel').textContent = isBn ? 'পাঠানো হচ্ছে...' : 'Sending...';

  setTimeout(() => {
    // Build mailto link as fallback
    const contactEmail = document.getElementById('contactEmail').href.replace('mailto:', '');
    const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'General Inquiry'}\nBudget: ${document.getElementById('fbudget').value || 'Not specified'}\n\nMessage:\n${msg}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent((subject || 'Portfolio Inquiry') + ' — from ' + name)}&body=${encodeURIComponent(body)}`;

    // Store in localStorage for admin visibility
    const inquiries = JSON.parse(localStorage.getItem('nexus_inquiries') || '[]');
    inquiries.unshift({
      name, email, subject: subject || 'General', message: msg,
      budget: document.getElementById('fbudget').value || '',
      date: new Date().toISOString(), read: false,
    });
    localStorage.setItem('nexus_inquiries', JSON.stringify(inquiries.slice(0, 50)));

    // Open mailto
    window.location.href = mailtoUrl;

    showMsg('success', isBn ? '✅ ধন্যবাদ! আপনার মেইল অ্যাপ খুলছে...' : '✅ Thank you! Opening your mail app to send...');
    document.getElementById('contactForm').reset();
    btn.disabled = false;
    document.getElementById('submitLabel').textContent = isBn ? 'বার্তা পাঠান →' : 'Send Message →';
  }, 800);
}

function showMsg(type, text) {
  const el = document.getElementById('formMsg');
  el.className = 'form-msg ' + type;
  el.textContent = text;
  setTimeout(() => el.className = 'form-msg', 5000);
}

// ──────────────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show' + (type === 'error' ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

// ──────────────────────────────────────────────────────
// CROSS-TAB SYNC
// ──────────────────────────────────────────────────────
window.addEventListener('storage', e => {
  if (e.key === 'nexus_admin_theme' || e.key === 'nexus_setting_theme') initTheme();
  if (e.key === 'nexus_setting_lang') initLang();
});

// ──────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────
initTheme();
initLang();
applySettings();
