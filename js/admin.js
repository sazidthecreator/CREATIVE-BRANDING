  // ─────────────────────────────────────────────────────────
  // DATA LAYER
  // ─────────────────────────────────────────────────────────
  const DEFAULT_PROJECTS = [
    {id:'health-care-bd',title:'Health Care BD',titleBn:'হেলথ কেয়ার বিডি',subtitle:'Digital Health Platform',subtitleBn:'ডিজিটাল স্বাস্থ্য প্ল্যাটফর্ম',category:'Healthcare',categoryBn:'স্বাস্থ্যসেবা',tags:['React','TailwindCSS','UI/UX','System Design'],year:2025,status:'live',featured:true,emoji:'🏥',description:'A full-scale digital health infrastructure for Bangladesh, uniting patients, doctors, and hospitals in one ecosystem.',descriptionBn:'বাংলাদেশের জন্য পূর্ণাঙ্গ ডিজিটাল স্বাস্থ্য অবকাঠামো।',link:'#',githubLink:'',image:'Health_care_banner.png',impact:'5,000+ patients',duration:'12 weeks'},
    {id:'shikkha-somaponi',title:'Shikkha Somaponi Utshob 45',titleBn:'শিক্ষা সমাপনী উৎসব ৪৫',subtitle:'University Event Digital System',subtitleBn:'বিশ্ববিদ্যালয় ইভেন্ট',category:'Branding',categoryBn:'ব্র্যান্ডিং',tags:['Branding','Logistics','Digital Portal'],year:2025,status:'live',featured:false,emoji:'🎓',description:'Orchestrated branding and digital portal for 2,000+ graduating students at Jahangirnagar University.',descriptionBn:'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়ে ব্র্যান্ডিং।',link:'#',githubLink:'',image:'Ju45_Behance_banner_.png',impact:'2,000+ students',duration:'6 weeks'},
    {id:'vabuuk-portal',title:'Vabuuk Portal',titleBn:'ভাবুক পোর্টাল',subtitle:'Philosophy AI Engine',subtitleBn:'ফিলোসফি এআই',category:'AI Tool',categoryBn:'এআই টুল',tags:['NotebookLM','Philosophy','Cyber-Noir UI'],year:2025,status:'live',featured:false,emoji:'🧠',description:'A digital sage fused with Google NotebookLM for philosophy-driven content engineering.',descriptionBn:'নোটবুকএলএম দিয়ে দর্শন-চালিত কন্টেন্ট।',link:'#',githubLink:'',image:'VABUUK_Behance_banner_.png',impact:'300+ essays',duration:'4 weeks'},
    {id:'mr-rezaul',title:'M.R. Karim Digital Identity',titleBn:'এম.আর. করিম ডিজিটাল আইডেন্টিটি',subtitle:'Professional Digital Portfolio',subtitleBn:'প্রফেশনাল পোর্টফোলিও',category:'Portfolio',categoryBn:'পোর্টফোলিও',tags:['React','TailwindCSS','Glassmorphism'],year:2025,status:'live',featured:false,emoji:'👤',description:'High-trust responsive digital portfolio for a Dhaka WASA Official with glassmorphism UI.',descriptionBn:'ঢাকা ওয়াসা কর্মকর্তার পোর্টফোলিও।',link:'#',githubLink:'',image:'Behance_banner_mrkarim_portfolio.png',impact:'High-trust UX',duration:'3 weeks'},
    {id:'dokan-os',title:'Dokan OS',titleBn:'দোকান ওএস',subtitle:'Retail Automation Engine',subtitleBn:'রিটেইল অটোমেশন',category:'AI Automation',categoryBn:'এআই অটোমেশন',tags:['F-Commerce','Banglish AI','WhatsApp API'],year:2024,status:'live',featured:false,emoji:'🛍️',description:'Retail automation engine with Banglish AI sales bot and WhatsApp inventory. Revenue tripled in 2 months.',descriptionBn:'বাংলিশ এআই সেলস বট সহ রিটেইল অটোমেশন।',link:'#',githubLink:'',image:'unnamed-18.png',impact:'Revenue 3x',duration:'8 weeks'},
    {id:'fashion-model',title:'Fashion Model Agency',titleBn:'ফ্যাশন মডেল এজেন্সি',subtitle:'WordPress Editorial Website',subtitleBn:'ওয়ার্ডপ্রেস ওয়েবসাইট',category:'WordPress',categoryBn:'ওয়ার্ডপ্রেস',tags:['WordPress','Elementor','UI Design'],year:2022,status:'live',featured:false,emoji:'👗',description:'Editorial-style website for a Dhaka fashion model agency with custom WordPress architecture.',descriptionBn:'ফ্যাশন মডেল এজেন্সির ওয়েবসাইট।',link:'#',githubLink:'',image:'',impact:'50+ profiles',duration:'4 weeks'},
  ];

  let projects = [];
  let filterQuery = '';
  let filterCategory = 'all';
  let confirmCallback = null;

  function load(){
    try{const s=localStorage.getItem('nexus_projects');projects=s?JSON.parse(s):[...DEFAULT_PROJECTS]}
    catch{projects=[...DEFAULT_PROJECTS]}
    saveToStorage();
  }
  function saveToStorage(){
    localStorage.setItem('nexus_projects',JSON.stringify(projects));
    localStorage.setItem('nexus_updated',new Date().toISOString());
  }
  function saveAll(){saveToStorage();renderAll()}
  function getFiltered(){
    return projects.filter(p=>{
      const q=filterQuery.toLowerCase();
      const matchQ=!q||(p.title+p.subtitle+p.category+(p.tags||[]).join('')).toLowerCase().includes(q);
      const matchCat=filterCategory==='all'||p.category===filterCategory;
      return matchQ&&matchCat;
    });
  }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  function renderAll(){
    renderStats();
    renderSidebarStats();
    renderFilterPills();
    renderTable();
    renderAnalytics();
    updateLastUpdated();
  }

  function renderStats(){
    const cats=[...new Set(projects.map(p=>p.category))];
    const allTags=[...new Set(projects.flatMap(p=>p.tags||[]))];
    document.getElementById('statsRow').innerHTML=`
      <div class="stat-card"><div class="stat-card-n">${projects.length}</div><div class="stat-card-l">Total Projects</div><div class="stat-card-sub">${projects.filter(p=>p.status==='live').length} live</div></div>
      <div class="stat-card"><div class="stat-card-n">${projects.filter(p=>p.featured).length}</div><div class="stat-card-l">Featured</div><div class="stat-card-sub">shown as hero</div></div>
      <div class="stat-card"><div class="stat-card-n">${cats.length}</div><div class="stat-card-l">Categories</div><div class="stat-card-sub">${cats.slice(0,2).join(', ')}</div></div>
      <div class="stat-card"><div class="stat-card-n">${allTags.length}</div><div class="stat-card-l">Unique Tags</div><div class="stat-card-sub">tech stack items</div></div>
    `;
  }

  function renderSidebarStats(){
    const cats=[...new Set(projects.map(p=>p.category))];
    const allTags=[...new Set(projects.flatMap(p=>p.tags||[]))];
    document.getElementById('sidebarTotal').textContent=projects.length;
    document.getElementById('sidebarFeatured').textContent=projects.filter(p=>p.featured).length;
    document.getElementById('sidebarCats').textContent=cats.length;
    document.getElementById('sidebarTags').textContent=allTags.length;
  }

  function renderFilterPills(){
    const cats=['all',...new Set(projects.map(p=>p.category))];
    document.getElementById('filterPills').innerHTML=cats.map(c=>`
      <button class="filter-pill ${c===filterCategory?'active':''}" onclick="setFilter('${c}',this)">${c==='all'?'All':c}</button>
    `).join('');
  }

  function renderTable(){
    const filtered=getFiltered();
    const body=document.getElementById('projectsTableBody');
    const label=document.getElementById('projectCountLabel');
    label.textContent=`${filtered.length} project${filtered.length!==1?'s':''}${filterCategory!=='all'?' — '+filterCategory:''}`;

    if(filtered.length===0){
      body.innerHTML=`<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">No projects found</div><div class="empty-sub">Try a different search or filter, or add a new project.</div></div>`;
      return;
    }

    body.innerHTML=filtered.map((p,i)=>{
      const realIdx=projects.findIndex(x=>x.id===p.id);
      const statusLabel=p.status==='draft'?'Draft':'Live';
      const statusClass=p.status==='draft'?'draft':'';
      return `<div class="table-row" draggable="true" data-id="${p.id}">
        <div class="row-emoji">${p.emoji||'🚀'}</div>
        <div>
          <div class="row-title">${p.title}${p.featured?'<span class="featured-badge">★ Featured</span>':''}</div>
          <div class="row-sub">${p.subtitle||''}</div>
        </div>
        <div><span class="row-cat">${p.category}</span></div>
        <div class="row-year">${p.year}</div>
        <div><span class="status-pill ${statusClass}">${statusLabel}</span></div>
        <div style="font-size:9px;color:var(--muted2)">${p.impact||'—'}</div>
        <div class="row-actions">
          <button class="action-btn" onclick="openEditModal(${realIdx})" title="Edit">✏️</button>
          <button class="action-btn" onclick="toggleFeatured(${realIdx})" title="${p.featured?'Unfeature':'Set as Featured'}">⭐</button>
          <button class="action-btn" onclick="duplicateProject(${realIdx})" title="Duplicate">📋</button>
          <button class="action-btn del" onclick="confirmDelete(${realIdx})" title="Delete">🗑️</button>
        </div>
      </div>`;
    }).join('');

    // Drag reorder
    setupDrag();
  }

  function renderAnalytics(){
    const cats=[...new Set(projects.map(p=>p.category))];
    const allTags=[...new Set(projects.flatMap(p=>p.tags||[]))];
    const yearGroups={};
    projects.forEach(p=>{yearGroups[p.year]=(yearGroups[p.year]||0)+1});
    const tagCounts={};
    projects.flatMap(p=>p.tags||[]).forEach(t=>{tagCounts[t]=(tagCounts[t]||0)+1});
    const topTags=Object.entries(tagCounts).sort((a,b)=>b[1]-a[1]).slice(0,8);

    document.getElementById('analyticsContent').innerHTML=`
      <div class="stats-row" style="grid-template-columns:repeat(3,1fr)">
        <div class="stat-card"><div class="stat-card-n">${projects.length}</div><div class="stat-card-l">Total Projects</div></div>
        <div class="stat-card"><div class="stat-card-n">${cats.length}</div><div class="stat-card-l">Categories</div></div>
        <div class="stat-card"><div class="stat-card-n">${allTags.length}</div><div class="stat-card-l">Unique Tags</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="sync-card">
          <div class="sync-header"><span class="sync-icon">📂</span><div><div class="sync-title">By Category</div></div></div>
          ${cats.map(c=>{const n=projects.filter(p=>p.category===c).length;const pct=Math.round(n/projects.length*100);return`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--text2)">${c}</span><span style="color:var(--accent)">${n}</span></div><div style="height:3px;background:var(--border2);border-radius:2px"><div style="height:100%;width:${pct}%;background:var(--accent);border-radius:2px;transition:width 1s var(--ease)"></div></div></div>`}).join('')}
        </div>
        <div class="sync-card">
          <div class="sync-header"><span class="sync-icon">🏷️</span><div><div class="sync-title">Top Tags</div></div></div>
          <div style="display:flex;flex-wrap:wrap;gap:7px">
            ${topTags.map(([tag,count])=>`<span style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;background:var(--accent-dim);border:1px solid rgba(168,255,120,0.2);color:var(--accent);padding:4px 10px;border-radius:100px">${tag} <span style="opacity:0.6">(${count})</span></span>`).join('')}
          </div>
          <div style="margin-top:16px">
            <div class="sync-header" style="margin-bottom:10px"><span class="sync-icon">📅</span><div><div class="sync-title">By Year</div></div></div>
            ${Object.entries(yearGroups).sort((a,b)=>b[0]-a[0]).map(([y,n])=>`<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted2);padding:5px 0;border-bottom:1px solid var(--border)"><span>${y}</span><span style="color:var(--accent)">${n} project${n!==1?'s':''}</span></div>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function updateLastUpdated(){
    const s=localStorage.getItem('nexus_updated');
    if(s){const d=new Date(s);document.getElementById('lastUpdate').textContent=d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}
  }

  // ─────────────────────────────────────────────────────────
  // DRAG REORDER
  // ─────────────────────────────────────────────────────────
  let dragSrc=null;
  function setupDrag(){
    document.querySelectorAll('.table-row[draggable]').forEach(row=>{
      row.addEventListener('dragstart',e=>{dragSrc=row;row.classList.add('dragging');e.dataTransfer.effectAllowed='move'});
      row.addEventListener('dragend',()=>{dragSrc=null;document.querySelectorAll('.table-row').forEach(r=>r.classList.remove('dragging'))});
      row.addEventListener('dragover',e=>{e.preventDefault();if(dragSrc&&dragSrc!==row){const srcId=dragSrc.dataset.id,dstId=row.dataset.id;const si=projects.findIndex(p=>p.id===srcId),di=projects.findIndex(p=>p.id===dstId);if(si>-1&&di>-1){const[item]=projects.splice(si,1);projects.splice(di,0,item);saveAll()}}});
    });
  }

  // ─────────────────────────────────────────────────────────
  // TABS
  // ─────────────────────────────────────────────────────────
  function switchTab(tab){
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    document.getElementById('tab-'+tab).classList.add('active');
    const navEl=document.getElementById('nav-'+tab);
    if(navEl)navEl.classList.add('active');
    if(tab==='analytics')renderAnalytics();
  }

  // ─────────────────────────────────────────────────────────
  // SEARCH & FILTER
  // ─────────────────────────────────────────────────────────
  function filterProjects(){
    filterQuery=document.getElementById('searchInput').value;
    renderTable();
  }
  function setFilter(cat,btn){
    filterCategory=cat;
    document.querySelectorAll('.filter-pill').forEach(p=>p.classList.remove('active'));
    if(btn)btn.classList.add('active');
    renderTable();
  }

  // ─────────────────────────────────────────────────────────
  // MODAL (ADD / EDIT)
  // ─────────────────────────────────────────────────────────
  let editIndex=-1;
  function openAddModal(){
    editIndex=-1;
    document.getElementById('modalTitle').textContent='Add New Project';
    const fields=['fTitle','fTitleBn','fSubtitle','fSubtitleBn','fEmoji','fDesc','fDescBn','fTags','fLink','fGithub','fCategoryBn','fImage','fImpact','fDuration'];
    fields.forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
    document.getElementById('fYear').value=new Date().getFullYear();
    document.getElementById('fFeatured').value='false';
    document.getElementById('fStatus').value='live';
    document.getElementById('fCategory').value='AI Automation';
    document.getElementById('editId').value='';
    document.getElementById('projectModal').classList.add('show');
    document.getElementById('fTitle').focus();
  }

  function openEditModal(i){
    if(i<0||i>=projects.length)return;
    editIndex=i;
    const p=projects[i];
    document.getElementById('modalTitle').textContent='Edit Project';
    document.getElementById('fTitle').value=p.title||'';
    document.getElementById('fTitleBn').value=p.titleBn||'';
    document.getElementById('fSubtitle').value=p.subtitle||'';
    document.getElementById('fSubtitleBn').value=p.subtitleBn||'';
    document.getElementById('fEmoji').value=p.emoji||'';
    document.getElementById('fYear').value=p.year||new Date().getFullYear();
    document.getElementById('fFeatured').value=p.featured?'true':'false';
    document.getElementById('fStatus').value=p.status||'live';
    document.getElementById('fDesc').value=p.description||'';
    document.getElementById('fDescBn').value=p.descriptionBn||'';
    document.getElementById('fTags').value=(p.tags||[]).join(', ');
    document.getElementById('fLink').value=p.link||'';
    document.getElementById('fGithub').value=p.githubLink||'';
    document.getElementById('fImage').value=p.image||'';
    document.getElementById('fImpact').value=p.impact||'';
    document.getElementById('fDuration').value=p.duration||'';
    document.getElementById('fCategory').value=p.category||'AI Automation';
    document.getElementById('fCategoryBn').value=p.categoryBn||'';
    document.getElementById('editId').value=p.id||'';
    document.getElementById('projectModal').classList.add('show');
    document.getElementById('fTitle').focus();
  }

  function closeModal(){
    document.getElementById('projectModal').classList.remove('show');
    editIndex=-1;
  }

  function saveProject(){
    const title=document.getElementById('fTitle').value.trim();
    if(!title){showToast('⚠️ Title is required','error');document.getElementById('fTitle').focus();return}
    const year=parseInt(document.getElementById('fYear').value)||new Date().getFullYear();
    if(year<2010||year>2030){showToast('⚠️ Year must be between 2010–2030','error');return}

    const project={
      id:document.getElementById('editId').value||'proj-'+Date.now(),
      title,
      titleBn:document.getElementById('fTitleBn').value,
      subtitle:document.getElementById('fSubtitle').value,
      subtitleBn:document.getElementById('fSubtitleBn').value,
      category:document.getElementById('fCategory').value,
      categoryBn:document.getElementById('fCategoryBn').value,
      tags:document.getElementById('fTags').value.split(',').map(t=>t.trim()).filter(Boolean),
      year,
      status:document.getElementById('fStatus').value||'live',
      featured:document.getElementById('fFeatured').value==='true',
      emoji:document.getElementById('fEmoji').value||'🚀',
      description:document.getElementById('fDesc').value,
      descriptionBn:document.getElementById('fDescBn').value,
      link:document.getElementById('fLink').value||'#',
      githubLink:document.getElementById('fGithub').value||'',
      image:document.getElementById('fImage').value||'',
      impact:document.getElementById('fImpact').value||'',
      duration:document.getElementById('fDuration').value||'',
    };

    // Only one featured at a time
    if(project.featured)projects.forEach(p=>{p.featured=false});

    if(editIndex>=0){projects[editIndex]=project;showToast('✅ Project updated!')}
    else{projects.unshift(project);showToast('✅ Project added!')}

    saveAll();
    closeModal();
  }

  function updateEmojiPreview(){/* live preview placeholder */}

  function toggleFeatured(i){
    if(i<0||i>=projects.length)return;
    const wasFeatured=projects[i].featured;
    projects.forEach(p=>{p.featured=false});
    projects[i].featured=!wasFeatured;
    saveAll();
    showToast(projects[i].featured?'⭐ Set as featured!':'✓ Removed from featured');
  }

  function duplicateProject(i){
    if(i<0||i>=projects.length)return;
    const copy=JSON.parse(JSON.stringify(projects[i]));
    copy.id='proj-'+Date.now();
    copy.title=copy.title+' (Copy)';
    copy.featured=false;
    projects.splice(i+1,0,copy);
    saveAll();
    showToast('📋 Project duplicated!');
  }

  // ─────────────────────────────────────────────────────────
  // CONFIRM DELETE
  // ─────────────────────────────────────────────────────────
  function confirmDelete(i){
    if(i<0||i>=projects.length)return;
    document.getElementById('confirmTitle').textContent='Delete "'+projects[i].title+'"?';
    document.getElementById('confirmSub').textContent='This project will be permanently removed from the portfolio. This action cannot be undone.';
    document.getElementById('confirmBtn').textContent='Delete Project';
    confirmCallback=()=>deleteProject(i);
    document.getElementById('confirmOverlay').classList.add('show');
  }

  function confirmReset(){
    document.getElementById('confirmTitle').textContent='Reset All Projects?';
    document.getElementById('confirmSub').textContent='All projects will be replaced with the default 5 demo projects. Export your data first if needed.';
    document.getElementById('confirmBtn').textContent='Reset Everything';
    confirmCallback=resetToDefaults;
    document.getElementById('confirmOverlay').classList.add('show');
  }

  function closeConfirm(){document.getElementById('confirmOverlay').classList.remove('show');confirmCallback=null}
  function executeConfirm(){if(confirmCallback){confirmCallback();closeConfirm()}}

  function deleteProject(i){
    if(i<0||i>=projects.length)return;
    const name=projects[i].title;
    projects.splice(i,1);
    saveAll();
    showToast('🗑️ "'+name+'" deleted');
  }

  function resetToDefaults(){
    projects=[...DEFAULT_PROJECTS].map(p=>({...p}));
    saveAll();
    showToast('↺ Reset to defaults!');
  }

  // ─────────────────────────────────────────────────────────
  // IMPORT / EXPORT
  // ─────────────────────────────────────────────────────────
  function exportJSON(){
    const blob=new Blob([JSON.stringify(projects,null,2)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='nexus-projects-'+new Date().toISOString().slice(0,10)+'.json';
    a.click();URL.revokeObjectURL(a.href);
    showToast('⬇ Exported '+projects.length+' projects');
  }

  function importJSON(input){
    const file=input.files[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const data=JSON.parse(e.target.result);
        if(!Array.isArray(data)){showToast('⚠️ JSON must be an array of projects','error');return}
        if(data.length===0){showToast('⚠️ JSON file is empty','error');return}
        // Validate each project has at least a title
        const valid=data.every(p=>p.title);
        if(!valid){showToast('⚠️ Some projects missing required "title" field','error');return}
        projects=data;
        saveAll();
        showToast('⬆ Imported '+data.length+' projects!');
      }catch{showToast('⚠️ Invalid JSON file','error')}
    };
    reader.readAsText(file);
    input.value=''; // reset input
  }

  function copyJSON(){
    navigator.clipboard.writeText(JSON.stringify(projects,null,2))
      .then(()=>showToast('📋 Copied to clipboard!'))
      .catch(()=>showToast('⚠️ Copy failed — try Export instead','error'));
  }

  function previewJSON(){
    const preview=document.getElementById('jsonPreview');
    const code=document.getElementById('jsonPreviewCode');
    if(preview.style.display==='none'){
      code.textContent=JSON.stringify(projects,null,2);
      preview.style.display='block';
    }else{preview.style.display='none'}
  }

  // ─────────────────────────────────────────────────────────
  // SETTINGS
  // ─────────────────────────────────────────────────────────
  function saveSetting(key,value){
    localStorage.setItem('nexus_setting_'+key,value);
    if(key==='theme'){
      document.documentElement.setAttribute('data-theme',value==='auto'?(window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'):value);
      document.getElementById('themeBtn').textContent=(document.documentElement.getAttribute('data-theme')==='dark'?'🌙':'☀️')+' Theme';
    }
    showToast('✅ Setting saved');
  }

  function loadSettings(){
    const t=localStorage.getItem('nexus_setting_theme');if(t&&document.getElementById('settingTheme'))document.getElementById('settingTheme').value=t;
    const l=localStorage.getItem('nexus_setting_lang');if(l&&document.getElementById('settingLang'))document.getElementById('settingLang').value=l;
    const n=localStorage.getItem('nexus_setting_name');if(n&&document.getElementById('settingName'))document.getElementById('settingName').value=n;
    const s=localStorage.getItem('nexus_setting_status');if(s&&document.getElementById('settingStatus'))document.getElementById('settingStatus').value=s;
    const e=localStorage.getItem('nexus_setting_email');if(e&&document.getElementById('settingEmail'))document.getElementById('settingEmail').value=e;
    const loc=localStorage.getItem('nexus_setting_location');if(loc&&document.getElementById('settingLocation'))document.getElementById('settingLocation').value=loc;
  }

  // ─────────────────────────────────────────────────────────
  // THEME
  // ─────────────────────────────────────────────────────────
  function initTheme(){
    const s=localStorage.getItem('nexus_admin_theme')||'dark';
    document.documentElement.setAttribute('data-theme',s);
    document.getElementById('themeBtn').textContent=(s==='dark'?'🌙':'☀️')+' Theme';
  }
  function toggleTheme(){
    const c=document.documentElement.getAttribute('data-theme');
    const n=c==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',n);
    localStorage.setItem('nexus_admin_theme',n);
    document.getElementById('themeBtn').textContent=(n==='dark'?'🌙':'☀️')+' Theme';
  }

  // ─────────────────────────────────────────────────────────
  // TOAST
  // ─────────────────────────────────────────────────────────
  let toastTimer=null;
  function showToast(msg,type='success'){
    const el=document.getElementById('toast');
    el.textContent=msg;
    el.className='toast show'+(type==='error'?' error':'');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>el.classList.remove('show'),3200);
  }

  // ─────────────────────────────────────────────────────────
  // KEYBOARD SHORTCUTS
  // ─────────────────────────────────────────────────────────
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(document.getElementById('confirmOverlay').classList.contains('show'))closeConfirm();
      else if(document.getElementById('projectModal').classList.contains('show'))closeModal();
    }
    if((e.ctrlKey||e.metaKey)&&e.key==='n'){e.preventDefault();openAddModal()}
    if((e.ctrlKey||e.metaKey)&&e.key==='s'&&document.getElementById('projectModal').classList.contains('show')){e.preventDefault();saveProject()}
  });

  // Close modal on overlay click
  document.getElementById('projectModal').addEventListener('click',e=>{if(e.target===document.getElementById('projectModal'))closeModal()});
  document.getElementById('confirmOverlay').addEventListener('click',e=>{if(e.target===document.getElementById('confirmOverlay'))closeConfirm()});

  // ─────────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────────
  initTheme();
  load();
  renderAll();
  loadSettings();

  // Cross-tab sync
  window.addEventListener('storage',e=>{
    if(e.key==='nexus_projects'){load();renderAll()}
  });
  
