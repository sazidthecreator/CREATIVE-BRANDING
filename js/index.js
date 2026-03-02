// ──────────────────────────────────────────────────────
// DEFAULT DATA (mirrors admin panel)
// ──────────────────────────────────────────────────────
const DEFAULT_PROJECTS = [
  {id:'health-care-bd',title:'Health Care BD',titleBn:'হেলথ কেয়ার বিডি',subtitle:'Digital Health Platform',subtitleBn:'ডিজিটাল স্বাস্থ্য প্ল্যাটফর্ম',category:'Healthcare',categoryBn:'স্বাস্থ্যসেবা',tags:['React','TailwindCSS','UI/UX','System Design'],year:2025,status:'live',featured:true,emoji:'🏥',description:'A full-scale digital health infrastructure for Bangladesh, uniting patients, doctors, and hospitals in one ecosystem.',descriptionBn:'বাংলাদেশের জন্য পূর্ণাঙ্গ ডিজিটাল স্বাস্থ্য অবকাঠামো।',link:'#',githubLink:'',image:'Health_care_banner.png',impact:'5,000+ patients',duration:'12 weeks'},
  {id:'shikkha-somaponi',title:'Shikkha Somaponi Utshob 45',titleBn:'শিক্ষা সমাপনী উৎসব ৪৫',subtitle:'University Event Digital System',subtitleBn:'বিশ্ববিদ্যালয় ইভেন্ট',category:'Branding',categoryBn:'ব্র্যান্ডিং',tags:['Branding','Logistics','Digital Portal'],year:2025,status:'live',featured:false,emoji:'🎓',description:'Orchestrated branding and digital portal for 2,000+ graduating students at Jahangirnagar University.',descriptionBn:'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ে ব্র্যান্ডিং।',link:'#',githubLink:'',image:'Ju45_Behance_banner_.png',impact:'2,000+ students',duration:'6 weeks'},
  {id:'vabuuk-portal',title:'Vabuuk Portal',titleBn:'ভাবুক পোর্টাল',subtitle:'Philosophy AI Engine',subtitleBn:'ফিলোসফি এআই',category:'AI Tool',categoryBn:'এআই টুল',tags:['NotebookLM','Philosophy','Cyber-Noir UI'],year:2025,status:'live',featured:false,emoji:'🧠',description:'A digital sage fused with Google NotebookLM for philosophy-driven content engineering.',descriptionBn:'নোটবুকএলএম দিয়ে দর্শন-চালিত কন্টেন্ট।',link:'#',githubLink:'',image:'VABUUK_Behance_banner_.png',impact:'300+ essays',duration:'4 weeks'},
  {id:'mr-rezaul',title:'M.R. Karim Digital Identity',titleBn:'এম.আর. করিম ডিজিটাল আইডেন্টিটি',subtitle:'Professional Digital Portfolio',subtitleBn:'প্রফেশনাল পোর্টফোলিও',category:'Portfolio',categoryBn:'পোর্টফোলিও',tags:['React','TailwindCSS','Glassmorphism'],year:2025,status:'live',featured:false,emoji:'👤',description:'High-trust responsive digital portfolio for a Dhaka WASA Official with glassmorphism UI.',descriptionBn:'ঢাকা ওয়াসা কর্মকর্তার পোর্টফোলিও।',link:'#',githubLink:'',image:'Behance_banner_mrkarim_portfolio.png',impact:'High-trust UX',duration:'3 weeks'},
  {id:'dokan-os',title:'Dokan OS',titleBn:'দোকান ওএস',subtitle:'Retail Automation Engine',subtitleBn:'রিটেইল অটোমেশন',category:'AI Automation',categoryBn:'এআই অটোমেশন',tags:['F-Commerce','Banglish AI','WhatsApp API'],year:2024,status:'live',featured:false,emoji:'🛍️',description:'Retail automation engine with Banglish AI sales bot and WhatsApp inventory. Revenue tripled in 2 months.',descriptionBn:'বাংলিশ এআই সেলস বট সহ রিটেইল অটোমেশন।',link:'#',githubLink:'',image:'unnamed-18.png',impact:'Revenue 3x',duration:'8 weeks'},
  {id:'fashion-model',title:'Fashion Model Agency',titleBn:'ফ্যাশন মডেল এজেন্সি',subtitle:'WordPress Editorial Website',subtitleBn:'ওয়ার্ডপ্রেস ওয়েবসাইট',category:'WordPress',categoryBn:'ওয়ার্ডপ্রেস',tags:['WordPress','Elementor','UI Design'],year:2022,status:'live',featured:false,emoji:'👗',description:'Editorial-style website for a Dhaka fashion model agency with custom WordPress architecture.',descriptionBn:'ফ্যাশন মডেল এজেন্সির ওয়েবসাইট।',link:'#',githubLink:'',image:'',impact:'50+ profiles',duration:'4 weeks'},
];

// ──────────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────────
let projects = [];
let workFilter = 'all';
let currentLang = 'en';

// ──────────────────────────────────────────────────────
// LOAD DATA
// ──────────────────────────────────────────────────────
function loadProjects() {
  try {
    const stored = localStorage.getItem('nexus_projects');
    projects = stored ? JSON.parse(stored) : [...DEFAULT_PROJECTS];
  } catch(e) {
    projects = [...DEFAULT_PROJECTS];
  }
}

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
  renderAll();
}

function applyLang() {
  // Apply data-en/data-bn to all elements that have them
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(currentLang === 'en' ? 'data-en' : 'data-bn') || el.getAttribute('data-en');
  });
  // Typewriter reset
  const tr = document.getElementById('heroRole');
  if (tr) {
    const txt = tr.getAttribute(currentLang === 'en' ? 'data-en' : 'data-bn');
    tr.textContent = txt;
    tr.style.animation = 'none';
    tr.offsetHeight; // reflow
    tr.style.animation = '';
  }
}

// ──────────────────────────────────────────────────────
// STATS
// ──────────────────────────────────────────────────────
function renderStats() {
  const cats = [...new Set(projects.map(p => p.category))];
  const tags = [...new Set(projects.flatMap(p => p.tags || []))];
  animateCount('statTotal', projects.length);
  animateCount('statCats', cats.length);
  animateCount('statTags', tags.length);
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let n = 0;
  const step = Math.ceil(target / 20);
  const t = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n;
    if (n >= target) clearInterval(t);
  }, 40);
}

// ──────────────────────────────────────────────────────
// FEATURED PROJECT
// ──────────────────────────────────────────────────────
function renderFeatured() {
  const featured = projects.find(p => p.featured && p.status !== 'archived');
  const container = document.getElementById('featuredCard');
  if (!featured) {
    document.getElementById('featuredWrap').style.display = 'none';
    return;
  }
  document.getElementById('featuredWrap').style.display = '';

  const isBn = currentLang === 'bn';
  const title = isBn && featured.titleBn ? featured.titleBn : featured.title;
  const subtitle = isBn && featured.subtitleBn ? featured.subtitleBn : (featured.subtitle || '');
  const desc = isBn && featured.descriptionBn ? featured.descriptionBn : (featured.description || '');
  const cat = isBn && featured.categoryBn ? featured.categoryBn : featured.category;

  const hasImage = featured.image && !featured.image.includes('undefined');
  const mediaHTML = hasImage
    ? `<img src="${escapeHtml(featured.image)}" alt="${escapeHtml(title)}" onerror="this.style.display='none'"/><div class="featured-media-emoji">${featured.emoji || '🚀'}</div>`
    : `<div class="featured-media-emoji">${featured.emoji || '🚀'}</div>`;

  const tagsHTML = (featured.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');

  const liveBtn = featured.link && featured.link !== '#'
    ? `<a class="btn btn-accent" href="${escapeHtml(featured.link)}" target="_blank" rel="noopener">View Project ↗</a>`
    : `<span class="btn btn-accent" style="opacity:0.5;cursor:default">Coming Soon</span>`;

  const ghBtn = featured.githubLink
    ? `<a class="btn" href="${escapeHtml(featured.githubLink)}" target="_blank" rel="noopener">GitHub →</a>`
    : '';

  container.innerHTML = `
    <div class="featured-card">
      <div class="featured-inner">
        <div class="featured-media">${mediaHTML}</div>
        <div class="featured-content">
          <div class="featured-label">★ ${isBn ? 'বৈশিষ্ট্যযুক্ত প্রজেক্ট' : 'Featured Project'}</div>
          <h2 class="featured-title">${escapeHtml(title)}</h2>
          <p class="featured-sub">${escapeHtml(subtitle)}</p>
          <p class="featured-desc">${escapeHtml(desc)}</p>
          <div class="tag-list">${tagsHTML}</div>
          <div class="featured-meta">
            ${featured.impact ? `<div class="meta-item"><span>${escapeHtml(featured.impact)}</span>${isBn ? 'প্রভাব' : 'Impact'}</div>` : ''}
            ${featured.duration ? `<div class="meta-item"><span>${escapeHtml(featured.duration)}</span>${isBn ? 'সময়কাল' : 'Duration'}</div>` : ''}
            <div class="meta-item"><span>${escapeHtml(String(featured.year))}</span>${isBn ? 'বছর' : 'Year'}</div>
            <div class="meta-item"><span>${escapeHtml(cat)}</span>${isBn ? 'বিভাগ' : 'Category'}</div>
          </div>
          <div class="featured-actions">${liveBtn}${ghBtn}</div>
        </div>
      </div>
    </div>`;
}

// ──────────────────────────────────────────────────────
// WORK GRID
// ──────────────────────────────────────────────────────
function renderFilterPills() {
  const cats = ['all', ...new Set(projects.map(p => p.category))];
  const isBn = currentLang === 'bn';
  document.getElementById('workFilter').innerHTML = cats.map(c => `
    <button class="filter-pill ${c === workFilter ? 'active' : ''}" data-cat="${escapeHtml(c)}" onclick="setWorkFilter('${escapeHtml(c)}',this)">
      ${c === 'all' ? (isBn ? 'সব' : 'All') : escapeHtml(c)}
    </button>`).join('');
}

function setWorkFilter(cat, btn) {
  workFilter = cat;
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderWorkGrid();
}

function getFilteredProjects() {
  return projects.filter(p => {
    if (p.status === 'archived') return false;
    return workFilter === 'all' || p.category === workFilter;
  });
}

function renderWorkGrid() {
  const filtered = getFilteredProjects();
  const isBn = currentLang === 'bn';
  const grid = document.getElementById('workGrid');
  const countEl = document.getElementById('workCount');

  countEl.textContent = isBn
    ? `${filtered.length}টি প্রজেক্ট দেখানো হচ্ছে`
    : `Showing ${filtered.length} project${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🔍</div>
      <div class="empty-title">${isBn ? 'কোনো প্রজেক্ট পাওয়া যায়নি' : 'No projects found'}</div>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const title = isBn && p.titleBn ? p.titleBn : p.title;
    const subtitle = isBn && p.subtitleBn ? p.subtitleBn : (p.subtitle || '');
    const desc = isBn && p.descriptionBn ? p.descriptionBn : (p.description || '');
    const cat = isBn && p.categoryBn ? p.categoryBn : p.category;
    const hasImage = p.image && !p.image.includes('undefined');
    const mediaHTML = hasImage
      ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(title)}" onerror="this.style.display='none'"/><div class="card-media-emoji">${p.emoji || '🚀'}</div>`
      : `<div class="card-media-emoji">${p.emoji || '🚀'}</div>`;
    const tagsHTML = (p.tags || []).slice(0, 3).map(t => `<span class="card-tag">${escapeHtml(t)}</span>`).join('');
    const href = p.link && p.link !== '#' ? p.link : null;

    return `<div class="project-card" onclick="${href ? `window.open('${escapeHtml(href)}','_blank')` : ''}">
      <div class="card-media">${mediaHTML}</div>
      <div class="card-body">
        <div class="card-cat">${escapeHtml(cat)}</div>
        <div class="card-title">${escapeHtml(title)}</div>
        <div class="card-sub">${escapeHtml(subtitle)}</div>
        <div class="card-desc">${escapeHtml(desc)}</div>
        <div class="card-tags">${tagsHTML}</div>
        <div class="card-footer">
          <span class="card-year">${p.year}</span>
          ${p.impact ? `<span class="card-impact">${escapeHtml(p.impact)}</span>` : ''}
          ${href ? `<a class="card-link" href="${escapeHtml(href)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${isBn ? 'দেখুন' : 'View'} ↗</a>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

// ──────────────────────────────────────────────────────
// SETTINGS INTEGRATION
// ──────────────────────────────────────────────────────
function applySettings() {
  const email = localStorage.getItem('nexus_setting_email');
  if (email) {
    document.querySelectorAll('a[href="mailto:hello@sazid.dev"]').forEach(a => {
      a.href = 'mailto:' + email;
      a.textContent = email;
    });
  }
  const status = localStorage.getItem('nexus_setting_status');
  if (status) {
    const badge = document.querySelector('.hero-badge [data-en]');
    if (badge) {
      badge.setAttribute('data-en', status);
      if (currentLang === 'en') badge.textContent = status;
    }
  }
}

// ──────────────────────────────────────────────────────
// RENDER ALL
// ──────────────────────────────────────────────────────
function renderAll() {
  renderStats();
  renderFeatured();
  renderFilterPills();
  renderWorkGrid();
}

// ──────────────────────────────────────────────────────
// SCROLL REVEAL
// ──────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ──────────────────────────────────────────────────────
// UTILITY
// ──────────────────────────────────────────────────────
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ──────────────────────────────────────────────────────
// CROSS-TAB SYNC
// ──────────────────────────────────────────────────────
window.addEventListener('storage', e => {
  if (e.key === 'nexus_projects') { loadProjects(); renderAll(); }
  if (e.key === 'nexus_admin_theme' || e.key === 'nexus_setting_theme') initTheme();
  if (e.key === 'nexus_setting_lang') initLang();
});

// ──────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────
initTheme();
loadProjects();
initLang();
renderAll();
applySettings();
initReveal();
