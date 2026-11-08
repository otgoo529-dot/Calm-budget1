'use strict';
/* =========================================================
   app.js — UI, screens, sheets, handlers
   ========================================================= */

/* ---------- icons (own thin line icons) ---------- */
function gearPath() {
  let p = 'M12 9.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2z';
  p += 'M12 6.2a5.8 5.8 0 1 0 0 11.6 5.8 5.8 0 0 0 0-11.6z';
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; const x1 = 12 + 6.6 * Math.cos(a), y1 = 12 + 6.6 * Math.sin(a), x2 = 12 + 9 * Math.cos(a), y2 = 12 + 9 * Math.sin(a); p += `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`; }
  return p;
}
const ICON = {
  home: 'M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z',
  budget: 'M4 7.5A2.5 2.5 0 0 1 6.5 5H17v3M4 7.5V17a2 2 0 0 0 2 2h12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 1 4 7.5zM15.5 13.5h.5',
  plus: 'M12 5v14M5 12h14',
  bars: 'M5 19V11M12 19V5M19 19v-6',
  finance: 'M20.5 14A8.5 8.5 0 1 1 10 3.5M14 3.5A8.5 8.5 0 0 1 20.5 10H14z',
  gear: gearPath(),
  user: 'M12 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM5 20c0-3.6 3.1-6 7-6s7 2.4 7 6',
  grid: 'M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM4 10h16M4 15h16M10 4v16',
  search: 'M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM16 16l4 4',
  filter: 'M4 5h16l-6 7.5V19l-4-2v-4.5z',
  list: 'M9 7h10M9 12h10M9 17h10M5 7h.01M5 12h.01M5 17h.01',
  calendar: 'M7 5.5h10a3 3 0 0 1 3 3V17a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8.5a3 3 0 0 1 3-3zM8 3.5v4M16 3.5v4M4 10.5h16',
  chr: 'M9 6l6 6-6 6', chd: 'M6 9l6 6 6-6', chl: 'M15 6l-6 6 6 6',
  x: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  bolt: 'M13 3 5 13.5h6L10 21l8-10.5h-6z',
  goal: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01',
  cash: 'M4 8h16v8H4zM12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7 12h.01M17 12h.01',
  card: 'M5.5 6h13A2.5 2.5 0 0 1 21 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15.5v-7A2.5 2.5 0 0 1 5.5 6zM3 10.5h18M6.5 15h3',
  invoice: 'M7 4h10a1 1 0 0 1 1 1v15l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1zM9 9h6M9 13h6',
  repeat: 'M17 4l3 3-3 3M20 7H9a4 4 0 0 0-4 4M7 20l-3-3 3-3M4 17h11a4 4 0 0 0 4-4',
  down: 'M12 4v11M7.5 11 12 15.5 16.5 11M5 19h14',
  up: 'M12 15V4M7.5 8 12 3.5 16.5 8M5 19h14',
  people: 'M9 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 6.5a2.6 2.6 0 0 1 0 5M17.5 14.2c2 .5 3.2 2.2 3.2 4.3',
  plan: 'M4 6.5h16v11H4zM4 8l8 5.5L20 8'
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICON[n] || ''}"/></svg>`;

const dotp = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
Object.assign(ICON, {
  cart: 'M3 4h2.5l2 10h9.5l2-7.5H6.2M9.5 19.5h.01M16.5 19.5h.01',
  bag: 'M5 8h14l-1 12H6zM9 8V6.5a3 3 0 0 1 6 0V8',
  food: 'M7 3v7a2 2 0 0 0 2 2v9M11 3v7a2 2 0 0 1-2 2M17 21V3c-2.2 1.2-3 3.5-3 6.5V13h3',
  coffee: 'M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v2M12 3v2',
  car: 'M4 14l1.6-4.6A2 2 0 0 1 7.5 8h9a2 2 0 0 1 1.9 1.4L20 14v4h-2.5v-1.5h-11V18H4zM7.5 14.5h.01M16.5 14.5h.01',
  bus: 'M6 4h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM5 11h14M8 20v-3M16 20v-3M8 14h.01M16 14h.01',
  bike: 'M6 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM18 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM6 14.5 9.5 7H14l4 7.5M9.5 7H8M10.5 11.5h6',
  fuel: 'M5 20V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15M4 20h10M13 9h2.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 0 3 0V8l-2.5-2.5M7 8h4',
  drop: 'M12 3.5C9 8 6 11 6 14.5a6 6 0 0 0 12 0C18 11 15 8 12 3.5z',
  flame: 'M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
  wifi: 'M3.5 9.5a12 12 0 0 1 17 0M6.5 12.5a8 8 0 0 1 11 0M9.5 15.5a4 4 0 0 1 5 0M12 19h.01',
  phone: 'M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2',
  tv: 'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM8 21h8M9 3.5l3 2.5 3-2.5',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  pill: 'M10.5 20.5a4.2 4.2 0 0 1-6-6l9-9a4.2 4.2 0 0 1 6 6zM8.5 10.5l6 6',
  dumbbell: 'M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11',
  shield: 'M12 3l7 3v5.5c0 4.5-3 7.5-7 9.5-4-2-7-5-7-9.5V6z',
  shirt: 'M8 4 3 7l2 4 2-1v10h10V10l2 1 2-4-5-3a4 4 0 0 1-8 0z',
  scissors: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.5 7.5 20 19M8.5 16.5 20 5',
  gift: 'M4 9h16v4H4zM5 13v7h14v-7M12 9v11M12 9C10 9 7.500 8 8 6.500S11 5.500 12 9zM12 9c2 0 4.500-1 4-2.500S13 5.500 12 9z',
  plane: 'M21 4 3 11l7 2.5L12.5 21zM10 13.5l5-4',
  film: 'M5 5h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 5v14M16 5v14M4 9.5h4M16 9.5h4M4 14.5h4M16 14.5h4',
  music: 'M9 17V6l10-2v11M9 17a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM19 15a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  game: 'M7 8h10a4.5 4.5 0 0 1 4.4 5.4l-.7 3.2a2.4 2.4 0 0 1-4 1.2L14.5 16h-5l-2.2 1.8a2.4 2.4 0 0 1-4-1.2l-.7-3.2A4.5 4.5 0 0 1 7 8zM8 11v3M6.5 12.5h3M16 11.5h.01M17.5 13.5h.01',
  book: 'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h10',
  cap: 'M2.5 9 12 4.5 21.5 9 12 13.5zM6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21.5 9v5',
  paw: dotp(6.5, 10, 1.3) + dotp(9.8, 6.3, 1.3) + dotp(14.2, 6.3, 1.3) + dotp(17.5, 10, 1.3) + 'M12 12.5c-2.800 0-4.800 2.300-4.800 4.200 0 1.600 1.400 2.300 2.800 2.300.800 0 1.200-.3 2-.3s1.200.3 2 .3c1.400 0 2.800-.7 2.800-2.300 0-1.900-2-4.200-4.800-4.200z',
  tool: 'M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.500-5.500a4 4 0 0 0 5-5l-2.500 2.500-2.500-.5-.5-2.500z',
  leaf: 'M5 19c0-8 5-13 15-14 0 10-5 15-13 15M5 19c2-4 5-7 9-9',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2.500v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M18.700 5.300l-1.400 1.400M6.700 17.300l-1.400 1.400',
  star: 'M12 3.500l2.600 5.400 5.900.8-4.300 4.100 1 5.800L12 16.800 6.800 19.600l1-5.800L3.500 9.700l5.900-.8z',
  sparkle: 'M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM19 17v4M17 19h4',
  tag: 'M3.500 12.500V4.500a1 1 0 0 1 1-1h8l8 8a1 1 0 0 1 0 1.400l-7.600 7.600a1 1 0 0 1-1.400 0zM8 8h.01',
  briefcase: 'M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18',
  coins: 'M12 5.500c4 0 7 1.200 7 2.500s-3 2.500-7 2.500-7-1.200-7-2.500 3-2.500 7-2.500zM5 8v4c0 1.300 3 2.500 7 2.500s7-1.200 7-2.500V8M5 12v4c0 1.300 3 2.500 7 2.500s7-1.200 7-2.500v-4',
  bank: 'M3 9.500 12 4l9 5.500zM5 10.500V17M9.500 10.500V17M14.500 10.500V17M19 10.500V17M3.500 20h17',
  piggy: 'M5 11a7 6 0 0 1 12.500-3.500L20 7v4l-1.500 1.500V16h-3l-.5-1.500H9.500L9 16H6v-3zM15 10.500h.01'
});
const COLOR_CHOICES = [...PALETTE, '#E0574B', '#2F9E6E', '#6C5CE7', '#00A8A8', '#F59E0B', '#64748B'];
const ICON_CHOICES = ['cart', 'bag', 'food', 'coffee', 'car', 'bus', 'bike', 'fuel', 'home', 'bolt', 'drop', 'flame', 'wifi', 'phone', 'tv', 'heart', 'pill', 'dumbbell', 'shield', 'shirt', 'scissors', 'gift', 'plane', 'film', 'music', 'game', 'book', 'cap', 'paw', 'tool', 'leaf', 'sun', 'star', 'sparkle', 'tag', 'briefcase', 'cash', 'coins', 'card', 'bank', 'piggy', 'invoice', 'repeat', 'people'];
const DEFAULT_ICONS = { salary: 'cash', 'other-income': 'coins', rent: 'home', utilities: 'bolt', phone: 'phone', insurance: 'shield', loan: 'bank', emergency: 'piggy', groceries: 'cart', dining: 'food', transport: 'bus', leisure: 'film', health: 'heart', other: 'tag', fees: 'invoice', cafe: 'coffee', delivery: 'bag', fuel: 'fuel', taxi: 'car', movies: 'film' };
const catIcon = id => { const c = cat(id); if (!c) return 'tag'; if (c.icon && ICON[c.icon]) return c.icon; if (DEFAULT_ICONS[c.id]) return DEFAULT_ICONS[c.id]; return c.parent ? catIcon(c.parent) : 'tag'; };
const ci = (id, extra = '') => `<span class="ci ${extra}" style="background:${catColor(id)}">${ic(catIcon(id))}</span>`;
function emptyArt() {
  return `<svg width="120" height="96" viewBox="0 0 120 96" aria-hidden="true"><ellipse cx="60" cy="86" rx="40" ry="6" fill="var(--track)"/><rect x="34" y="58" width="52" height="22" rx="11" fill="var(--lav)"/><rect x="40" y="42" width="40" height="22" rx="11" fill="var(--butter)"/><rect x="46" y="28" width="28" height="18" rx="9" fill="var(--lav-d)"/><path d="M60 28V14" stroke="var(--lav-d)" stroke-width="3" stroke-linecap="round"/><path d="M60 18c-9 0-12-6-12-10 8 0 12 3 12 10zM60 18c9 0 12-6 12-10-8 0-12 3-12 10z" fill="var(--butter)" stroke="var(--lav-d)" stroke-width="2" stroke-linejoin="round"/></svg>`;
}

/* ---------- UI state ---------- */
const ui = { tab: 'home', pStart: null, range: 'period', q: '', sq: '', typeF: 'all', groupF: '', catF: '', view: 'list', day: '', fin: 'all', bannerOff: false, lastCat: {}, lastAcct: '', acctOpen: false, acctF: '' };
const ord = n => n + (n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
const pSel = () => { if (!ui.pStart) ui.pStart = periodFor(todayISO()).start; return periodFor(ui.pStart); };
const isCurrentP = p => p.start === periodFor(todayISO()).start;
const cm = n => curInfo()[0] + compact(n);
const filtersOn = () => ui.typeF !== 'all' || ui.groupF || ui.catF || ui.acctF;

/* ---------- toast / theme ---------- */
let _tt; function toast(m) { const el = $('#toast'); el.textContent = m; el.classList.add('show'); clearTimeout(_tt); _tt = setTimeout(() => el.classList.remove('show'), 2200); }
function applyTheme() {
  let t = S.theme; if (t === 'auto') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = t;
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === 'dark' ? '#171A3A' : '#FBF8F3';
}

/* ---------- layer stack (sheets & pages) ---------- */
const stack = [];
function openLayer(o) {
  const it = { state: {}, ...o };
  const ov = document.createElement('div'); ov.className = 'ov' + (it.kind === 'page' ? ' pg' : '');
  ov.innerHTML = it.kind === 'page' ? '<div class="page"></div>' : '<div class="backdrop" data-act="close"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div><div class="body"></div></div>';
  it.el = ov; it.scroller = it.kind === 'page' ? $('.page', ov) : $('.sheet', ov); it.body = it.kind === 'page' ? it.scroller : $('.body', ov);
  $('#layer').appendChild(ov); stack.push(it); draw(it); return it;
}
function draw(it) { const t = it.scroller.scrollTop; it.body.innerHTML = it.render(it); it.scroller.scrollTop = t; }
function closeItem(it) { const i = stack.indexOf(it); if (i < 0) return; stack.splice(i, 1); it.el.remove(); }
const itemOf = el => { const ov = el.closest('.ov'); return stack.find(x => x.el === ov); };
function refresh() { render(); stack.forEach(it => { if (it.auto) draw(it); }); }
function commit() { saveData(); refresh(); }
function askConfirm(title, text, okLabel, fn) {
  openLayer({ kind: 'sheet', ok: fn, render: () => `<div class="sheet-head"><h2>${esc(title)}</h2></div><p class="muted" style="margin:0 4px 6px">${esc(text)}</p><div class="btn-row"><button class="btn" data-act="close">Cancel</button><button class="btn primary" data-act="confirm-ok">${esc(okLabel)}</button></div>` });
}

/* =========================================================
   Shared fragments
   ========================================================= */
function header(title, sub) {
  return `<header class="top"><div class="titles"><h1>${title}</h1>${sub ? `<p>${esc(sub)}</p>` : ''}</div>
  <div class="top-actions"><button class="circle" data-act="sheet-open" aria-label="Open spreadsheet">${ic('grid')}</button>
  <div class="pill-btn"><button data-act="profile" aria-label="Profile">${ic('user')}</button><button data-act="settings" aria-label="Settings">${ic('gear')}</button></div></div></header>`;
}
function periodSwitch() {
  const p = pSel(), cur = isCurrentP(p);
  const small = cur ? 'Current period' : (p.start > todayISO() ? 'Upcoming period' : 'Past period');
  return `<div class="pswitch"><button class="nav" data-act="pprev" aria-label="Previous period">${ic('chl')}</button><div class="lbl">${periodLabel(p)}<small>${small}</small></div><button class="nav" data-act="pnext" aria-label="Next period">${ic('chr')}</button></div>`;
}
function ringSvg(pct, size, stroke, color, track) {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r, f = Math.min(1, Math.max(0, pct / 100)) * C;
  return `<svg viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${f.toFixed(1)} ${C.toFixed(1)}"/></svg>`;
}
const barHtml = (pct, cls = '') => `<div class="bar ${cls}"><i style="width:${Math.min(100, Math.max(pct > 0 ? 2 : 0, pct)).toFixed(1)}%"></i></div>`;

/* =========================================================
   HOME
   ========================================================= */
function greeting() { const h = new Date().getHours(); return (h < 5 ? 'Good night' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening') + (S.name ? ', ' + S.name.split(' ')[0] : ''); }
function backupBanner() {
  if (ui.bannerOff || S.demo || !D.tx.length) return '';
  const days = S.lastBackup ? diffDays(todayISO(), S.lastBackup) : null;
  if (days !== null && days < 14) return '';
  return `<div class="banner"><p><b>Back up your data.</b> ${days === null ? 'No backup yet.' : `Last backup ${days} days ago.`}</p><button class="mini" data-act="export-json">Back up</button><button class="circle sm" data-act="banner-off" aria-label="Dismiss">${ic('x', 'sm')}</button></div>`;
}
function acctList() {
  const list = D.accounts.filter(x => !x.hidden);
  return `<div class="accts">${list.map((x, i) => `<div class="acct-r"><span><i class="sw" style="background:${PALETTE[i % PALETTE.length]}"></i>${esc(x.name)}</span><b>${money(acctBalance(x, todayISO()))}</b></div>`).join('')}</div>`;
}
function viewHome() {
  const p = pSel(), st = stats(p), today = todayISO();
  const pct = st.outBud > 0 ? st.out / st.outBud * 100 : (st.out > 0 ? 100 : 0);
  const left = st.outBud - st.out, over = left < 0;
  let meta = '';
  if (p.start <= today && today <= p.end) { const d = diffDays(p.end, today) + 1; meta = `${d} day${d === 1 ? '' : 's'} left`; } else meta = p.end < today ? 'Period ended' : 'Starts ' + fmtDate(p.start);
  const fixedAct = st.g.fixed + st.g.loans, fixedBud = st.bud.fixed + st.bud.loans;
  const tile = (k, color, v, sub, cls = '') => `<div class="tile ${cls}"><div class="k"><span class="sw" style="background:${color}"></span>${k}</div><div class="v">${money(v)}</div><div class="s">${sub}</div></div>`;
  return header(greeting(), DOW_L[new Date().getDay()] + ', ' + fmtDate(today, true)) + backupBanner() + periodSwitch() + `
  <div class="card herocard"><div class="hero">
    <div class="ring">${ringSvg(pct, 128, 14, over ? '#FFB4A8' : '#FBE48A', 'rgba(255,255,255,.26)')}<div class="c"><b>${Math.round(pct)}%</b><span>budget used</span></div></div>
    <button class="info" data-act="acct-toggle" aria-expanded="${ui.acctOpen}"><div class="k">Total balance <span class="chv ${ui.acctOpen ? 'rot' : ''}">${ic('chd', 'sm')}</span></div><div class="big">${money(totalBalance())}</div>
    <div class="meta">${over ? 'Over budget by' : 'Left to spend'} ${money(Math.abs(left))}</div><span class="badge">${ic('calendar', 'sm')} ${meta}</span></button></div>${ui.acctOpen ? acctList() : ''}</div>
  <div class="tiles">
    ${tile('Income', 'var(--g-income)', st.g.income, st.bud.income ? 'of ' + money(st.bud.income) + ' planned' : 'received')}
    ${tile('Fixed', 'var(--g-fixed)', fixedAct, fixedBud ? 'of ' + money(fixedBud) + ' · incl. loans' : 'incl. loans')}
    ${tile('Savings', 'var(--g-savings)', st.g.savings, st.bud.savings ? 'of ' + money(st.bud.savings) + ' goal' : 'set aside', 'hl')}
    ${tile('Spending', 'var(--g-spending)', st.g.spending, st.bud.spending ? 'of ' + money(st.bud.spending) + ' budget' : 'spent')}
  </div>` + recentSection();
}
const RANGES = [['period', 'This period'], ['prev', 'Last period'], ['month', 'This month'], ['lastmonth', 'Last month'], ['all', 'All time']];
function rangeLabel() { if (ui.range === 'period') { const p = pSel(); return isCurrentP(p) ? 'This period' : periodLabel(p); } return RANGES.find(r => r[0] === ui.range)[1]; }
function rangeSelect() {
  return `<label class="rangesel"><span>Recent activity <span class="muted">·</span> <b>${esc(rangeLabel())}</b></span>${ic('chd', 'sm')}<select data-change="range" aria-label="Range">${RANGES.map(r => `<option value="${r[0]}"${ui.range === r[0] ? ' selected' : ''}>${r[1]}</option>`).join('')}</select></label>`;
}
function recentSection() {
  return `<div class="sec-head" style="margin-top:24px">${rangeSelect()}</div>
  <div class="tools"><label class="search">${ic('search', 'sm')}<input type="search" id="q" data-input="q" placeholder="Search" value="${esc(ui.q)}" autocomplete="off" enterkeyhint="search"></label>
  <div class="seg"><button class="${ui.view === 'list' ? 'on' : ''}" data-act="view" data-v="list" aria-label="List view">${ic('list', 'sm')}</button><button class="${ui.view === 'cal' ? 'on' : ''}" data-act="view" data-v="cal" aria-label="Calendar view">${ic('calendar', 'sm')}</button></div>
  <button class="sq" data-act="filter" aria-label="Filter">${ic('filter')}${filtersOn() ? '<i class="dotf"></i>' : ''}</button></div>
  <div id="recent">${recentInner()}</div>`;
}
function filteredTx(q) {
  const r = rangeOf(ui.range, pSel()); q = (q || '').trim().toLowerCase();
  return D.tx.filter(t => {
    if (t.date < r.start || t.date > r.end) return false;
    if (ui.day && t.date !== ui.day) return false;
    if (ui.acctF && t.acct !== ui.acctF && t.to !== ui.acctF) return false;
    const inc = isInc(t);
    if (ui.typeF === 'income' && !inc) return false; if (ui.typeF === 'expense' && inc) return false;
    if (ui.groupF && catGroup(t.cat) !== ui.groupF) return false;
    if (ui.catF) { const c = cat(t.cat); if (!c || (c.id !== ui.catF && c.parent !== ui.catF)) return false; }
    if (q && !(catPath(t.cat) + ' ' + acctName(t.acct) + ' ' + (t.note || '') + ' ' + t.amount + ' ' + t.date).toLowerCase().includes(q)) return false;
    return true;
  }).sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : (b.ts || 0) - (a.ts || 0));
}
const dayName = d => { const t = todayISO(); if (d === t) return 'Today'; if (d === addDays(t, -1)) return 'Yesterday'; return DOW_L[parse(d).getDay()].slice(0, 3) + ', ' + fmtDate(d); };
function txRow(t) {
  if (isTr(t)) {
    return `<button class="tx" data-act="tx-edit" data-id="${t.id}"><span class="dot" style="background:var(--lav-d)">⇄</span><span class="tx-main"><b>${esc(t.note || 'Transfer')}</b><small>${esc(acctName(t.acct))} → ${esc(acctName(t.to))}${t.fee ? ' · fee ' + money(t.fee) : ''}</small></span><span class="amt tf">${money(t.amount)}</span></button>`;
  }
  const inc = isInc(t), c = cat(t.cat), title = t.note || (c ? c.name : 'Uncategorized');
  return `<button class="tx" data-act="tx-edit" data-id="${t.id}"><span class="dot" style="background:${catColor(t.cat)}">${ic(catIcon(t.cat))}</span><span class="tx-main"><b>${esc(title)}</b><small>${esc(catPath(t.cat))} · ${esc(acctName(t.acct))}${t.fee ? ' · fee ' + money(t.fee) : ''}</small></span><span class="amt ${inc ? 'pos' : 'neg'}">${money(inc ? t.amount : -t.amount, true)}</span></button>`;
}
function groupedRows(list) {
  const groups = [];
  list.forEach(t => { let g = groups[groups.length - 1]; if (!g || g.d !== t.date) { g = { d: t.date, items: [], net: 0 }; groups.push(g); } g.items.push(t); g.net += isInc(t) ? effAmt(t) : -effAmt(t); });
  return groups.map(g => `<div class="dh"><span>${dayName(g.d)}</span><span>${money(g.net, true)}</span></div>${g.items.map(txRow).join('')}`).join('');
}
function recentInner() {
  let h = '';
  if (ui.view === 'cal') h += calendarHtml();
  if (ui.day) h += `<span class="fchip">${fmtDate(ui.day)} <button data-act="day-clear" aria-label="Clear day">${ic('x', 'sm')}</button></span>`;
  const list = filteredTx(ui.q);
  if (!list.length) return h + `<div class="card empty">${emptyArt()}<p>${D.tx.length ? 'No transactions match here.' : 'No transactions yet. Tap the + button to add your first one.'}</p></div>`;
  const lim = 20;
  return h + `<div class="txlist">${groupedRows(list.slice(0, lim))}${list.length > lim ? `<button class="more" data-act="sheet-open">See all ${list.length} in Spreadsheet</button>` : ''}</div>`;
}
function calendarHtml() {
  const r = rangeOf(ui.range, pSel()); const base = r.start < '1000' ? todayISO() : r.start; const d = parse(base), y = d.getFullYear(), m = d.getMonth();
  const first = (new Date(y, m, 1).getDay() + 6) % 7, n = dim(y, m), tot = {}, has = {};
  D.tx.forEach(t => { if (t.date.slice(0, 7) !== `${y}-${pad(m + 1)}`) return; has[t.date] = 1; if (!isInc(t)) tot[t.date] = (tot[t.date] || 0) + effAmt(t); });
  let cells = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<div class="dow">${x}</div>`).join('');
  for (let i = 0; i < first; i++) cells += '<div class="day off"></div>';
  for (let k = 1; k <= n; k++) {
    const ds = `${y}-${pad(m + 1)}-${pad(k)}`;
    cells += `<button class="day ${has[ds] ? 'has' : ''} ${ui.day === ds ? 'sel' : ''} ${ds === todayISO() ? 'today' : ''}" data-act="day" data-d="${ds}">${k}${tot[ds] ? `<small>${compact(tot[ds])}</small>` : ''}</button>`;
  }
  return `<div class="cal"><h3>${MONTHS_L[m]} ${y}</h3><div class="grid">${cells}</div></div>`;
}

/* =========================================================
   BUDGET
   ========================================================= */
function viewBudget() {
  const p = pSel(), st = stats(p);
  const row = (label, v, sw, sign) => `<div class="r"><span>${sw ? `<i class="sw" style="background:${sw}"></i>` : ''}${label}</span><span>${sign ? sign + ' ' : ''}${money(v)}</span></div>`;
  let h = header('Budget', 'Budget vs actual') + periodSwitch();
  h += `<div class="card flow">${row('Opening balance', st.opening)}${row('Income', st.g.income, 'var(--g-income)', '+')}${row('Fixed expenses', st.g.fixed, 'var(--g-fixed)', '−')}${row('Loans', st.g.loans, 'var(--g-loans)', '−')}${row('Savings', st.g.savings, 'var(--g-savings)', '−')}${row('Spending', st.g.spending, 'var(--g-spending)', '−')}<div class="r total"><span>Closing balance</span><span>${money(st.closing)}</span></div></div>`;
  GROUPS.forEach(g => {
    const cats = D.cats.filter(c => !c.parent && c.group === g.id && !c.hidden);
    h += `<div class="card gcard"><div class="gh"><h3>${g.name}</h3><small>${money(st.g[g.id])} / ${money(st.bud[g.id])}</small></div>`;
    h += cats.map(c => catRow(c, p, st, g.id)).join('');
    h += `<button class="addrow" data-act="cat-add" data-g="${g.id}">${ic('plus', 'sm')} Add category</button></div>`;
  });
  return h;
}
function catRow(c, p, st, gid) {
  const act = catTotal(c.id, st), b = budgetFor(c, p), pct = b > 0 ? act / b * 100 : 0, good = gid === 'income' || gid === 'savings';
  const overB = b > 0 && act > b, cls = overB ? (good ? 'gold' : 'over') : '';
  let left;
  if (b <= 0) left = act > 0 ? 'No budget set' : 'Tap to set a budget';
  else if (!overB) left = `${money(b - act)} ${good ? 'to go' : 'left'}`;
  else left = good ? `${money(act - b)} extra` : `Over by ${money(act - b)}`;
  let h = `<button class="crow" data-act="cat-edit" data-id="${c.id}"><div class="l1"><span class="cn">${ci(c.id)}${esc(c.name)}</span><span class="pc ${overB && !good ? 'over' : ''}">${b > 0 ? Math.round(pct) + '%' : '—'}</span></div>${barHtml(pct, cls)}<div class="l2"><span>${left}</span><span>${money(act)} / ${money(b)}</span></div></button>`;
  subsOf(c.id).filter(s => !s.hidden).forEach(s => { h += `<button class="crow sub" data-act="cat-edit" data-id="${s.id}"><div class="l1"><span class="cn">${ci(s.id, "xs")}${esc(s.name)}</span><span>${money(st.own[s.id] || 0)}</span></div></button>`; });
  return h;
}

/* =========================================================
   INSIGHTS
   ========================================================= */
function weeklyChart() {
  const mon = mondayOf(todayISO()), weeks = [];
  for (let i = 5; i >= 0; i--) { const s = addDays(mon, -7 * i), e = addDays(s, 6); weeks.push({ s, v: D.tx.filter(t => t.date >= s && t.date <= e && catGroup(t.cat) === 'spending').reduce((a, t) => a + effAmt(t), 0) }); }
  const max = Math.max(...weeks.map(w => w.v)); if (!max) return `<div class="empty">${emptyArt()}<p>Weekly spending will show up here once you add transactions.</p></div>`;
  const W = 320, slot = W / weeks.length, bw = 34, base = 130, mh = 100; let key = weeks.findIndex(w => w.v === max), svg = '';
  weeks.forEach((w, i) => {
    const h = Math.max(6, w.v / max * mh), x = i * slot + (slot - bw) / 2, y = base - h, isKey = i === key;
    svg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="12" style="fill:${isKey ? 'var(--butter)' : 'var(--lav)'}"/>`;
    if (isKey) svg += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 8).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" style="fill:var(--text)">${compact(w.v)}</text>`;
    svg += `<text x="${(x + bw / 2).toFixed(1)}" y="152" text-anchor="middle" font-size="10.5" font-weight="${i === weeks.length - 1 ? 800 : 600}" style="fill:var(--muted)">${fmtDate(w.s)}</text>`;
  });
  return `<div class="chartbox"><svg viewBox="0 0 ${W} 160" role="img" aria-label="Weekly spending">${svg}</svg></div>`;
}
function viewInsights() {
  const p = pSel(), st = stats(p), pv = stats(prevPeriod(p));
  const gs = ['fixed', 'loans', 'savings', 'spending'], total = gs.reduce((a, g) => a + st.g[g], 0);
  let h = header('Insights', periodLabel(p)) + periodSwitch();
  h += `<div class="card"><h3 style="font-size:17px;margin-bottom:2px">Weekly spending</h3><p class="muted" style="font-size:13px;margin-bottom:10px">Last 6 weeks · highlighted = highest week</p>${weeklyChart()}</div>`;
  h += `<div class="card"><h3 style="font-size:17px;margin-bottom:12px">Where it goes</h3>`;
  if (!total) h += `<div class="empty"><p>No expenses in this period yet.</p></div>`;
  else {
    h += `<div class="stack">${gs.filter(g => st.g[g] > 0).map(g => `<i style="width:${st.g[g] / total * 100}%;background:var(${GROUPS.find(x => x.id === g).cssv})"></i>`).join('')}</div><div class="lg">`;
    h += gs.map(g => `<div class="r"><i class="sw" style="background:var(${GROUPS.find(x => x.id === g).cssv})"></i><span class="n">${GNAME[g]}</span><b>${money(st.g[g])}</b><span class="p">${Math.round(st.g[g] / total * 100)}%</span></div>`).join('') + '</div>';
  }
  h += '</div>';
  const delta = (a, b, goodUp) => { if (!b && !a) return '<span class="delta">–</span>'; if (!b) return '<span class="delta">new</span>'; const pc = Math.round((a - b) / b * 100); if (pc === 0) return '<span class="delta">same</span>'; const up = pc > 0; const bad = goodUp ? !up : up; return `<span class="delta ${bad ? 'bad' : ''}">${up ? '▲' : '▼'} ${Math.abs(pc)}%</span>`; };
  const cmp = [['Income', st.g.income, pv.g.income, true], ['Fixed & loans', st.g.fixed + st.g.loans, pv.g.fixed + pv.g.loans, false], ['Savings', st.g.savings, pv.g.savings, true], ['Spending', st.g.spending, pv.g.spending, false]];
  h += `<div class="card cmp"><h3 style="font-size:17px">Compared with last period</h3><p class="muted" style="font-size:13px;margin-bottom:6px">${periodLabel(prevPeriod(p))}</p>${cmp.map(c => `<div class="r"><div><b>${c[0]}</b><small>was ${money(c[2])}</small></div><div class="v">${money(c[1])}</div>${delta(c[1], c[2], c[3])}</div>`).join('')}</div>`;
  return h;
}

/* =========================================================
   FINANCE
   ========================================================= */
const FIN = {
  bills: {
    title: 'Bill', icon: 'calendar', req: ['name', 'amount', 'due'],
    fields: () => [{ key: 'name', label: 'Bill name', type: 'text', ph: 'e.g. Internet' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'due', label: 'Next due date', type: 'date' }, { key: 'repeat', label: 'Repeats', type: 'select', options: [['monthly', 'Every month'], ['weekly', 'Every week'], ['once', 'One time']] }, { key: 'cat', label: 'Log to category when paid (optional)', type: 'select', options: [['', 'Don’t log a transaction'], ...catOptions()] }],
    blank: () => ({ name: '', amount: '', due: todayISO(), repeat: 'monthly', cat: '' }),
    toForm: b => ({ ...b, amount: b.amount }), fromForm: s => ({ name: s.name.trim(), amount: num(s.amount), due: s.due, repeat: s.repeat, cat: s.cat || '' }),
    extra: b => (b.paid ? [] : [{ label: 'Mark paid', act: it => payBill(b) }])
  },
  goals: {
    title: 'Savings goal', icon: 'goal', req: ['name', 'target'],
    fields: () => [{ key: 'name', label: 'Goal name', type: 'text', ph: 'e.g. Vacation' }, { key: 'target', label: 'Target amount', type: 'number' }, { key: 'saved', label: 'Saved so far', type: 'number' }, { key: 'add', label: 'Add money now (optional)', type: 'number' }],
    blank: () => ({ name: '', target: '', saved: '', add: '' }), toForm: g => ({ ...g, add: '' }),
    fromForm: s => ({ name: s.name.trim(), target: num(s.target), saved: num(s.saved) + num(s.add) })
  },
  debts: {
    title: 'Debt', icon: 'cash', req: ['name', 'total'],
    fields: () => [{ key: 'name', label: 'Debt name', type: 'text', ph: 'e.g. Car loan' }, { key: 'total', label: 'Original amount', type: 'number' }, { key: 'paid', label: 'Paid so far', type: 'number' }, { key: 'payment', label: 'Regular payment', type: 'number' }, { key: 'next', label: 'Next payment date', type: 'date' }, { key: 'add', label: 'Record a payment now (optional)', type: 'number' }],
    blank: () => ({ name: '', total: '', paid: '', payment: '', next: '', add: '' }), toForm: d => ({ ...d, add: '' }),
    fromForm: s => ({ name: s.name.trim(), total: num(s.total), paid: num(s.paid) + num(s.add), payment: num(s.payment), next: s.next || '' })
  },
  cards: {
    title: 'Credit card', icon: 'card', req: ['name', 'limit'],
    fields: () => [{ key: 'name', label: 'Card name', type: 'text', ph: 'e.g. Everyday Card' }, { key: 'limit', label: 'Credit limit', type: 'number' }, { key: 'used', label: 'Balance used', type: 'number' }, { key: 'due', label: 'Amount due now', type: 'number' }, { key: 'dueDate', label: 'Due date', type: 'date' }],
    blank: () => ({ name: '', limit: '', used: '', due: '', dueDate: '' }), toForm: c => ({ ...c }),
    fromForm: s => ({ name: s.name.trim(), limit: num(s.limit), used: num(s.used), due: num(s.due), dueDate: s.dueDate || '' })
  },
  owed: {
    title: 'Money owed to you', icon: 'people', req: ['person', 'amount'],
    fields: () => [{ key: 'person', label: 'Who owes you', type: 'text', ph: 'Name' }, { key: 'note', label: 'What for', type: 'text', ph: 'e.g. Lunch' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'due', label: 'Expected back by (optional)', type: 'date' }, { key: 'settled', label: 'Status', type: 'select', options: [['no', 'Outstanding'], ['yes', 'Settled']] }],
    blank: () => ({ person: '', note: '', amount: '', due: '', settled: 'no' }), toForm: o => ({ ...o, settled: o.settled ? 'yes' : 'no' }),
    fromForm: s => ({ person: s.person.trim(), note: (s.note || '').trim(), amount: num(s.amount), due: s.due || '', settled: s.settled === 'yes' })
  },
  invoices: {
    title: 'Invoice', icon: 'invoice', req: ['client', 'amount'],
    fields: () => [{ key: 'client', label: 'Client', type: 'text', ph: 'Client name' }, { key: 'number', label: 'Invoice number', type: 'text', ph: 'INV-001' }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'date', label: 'Issued on', type: 'date' }, { key: 'paid', label: 'Status', type: 'select', options: [['no', 'Open'], ['yes', 'Paid']] }],
    blank: () => ({ client: '', number: '', amount: '', date: todayISO(), paid: 'no' }), toForm: v => ({ ...v, paid: v.paid ? 'yes' : 'no' }),
    fromForm: s => ({ client: s.client.trim(), number: (s.number || '').trim(), amount: num(s.amount), date: s.date || todayISO(), paid: s.paid === 'yes' })
  },
  recurring: {
    title: 'Recurring item', icon: 'repeat', req: ['name', 'amount', 'next'],
    fields: () => [{ key: 'name', label: 'Name', type: 'text', ph: 'e.g. Gym' }, { key: 'kind', label: 'Type', type: 'select', options: [['expense', 'Expense'], ['income', 'Income']] }, { key: 'amount', label: 'Amount', type: 'number' }, { key: 'freq', label: 'Repeats', type: 'select', options: [['monthly', 'Monthly'], ['semi-monthly', 'Every pay period'], ['weekly', 'Weekly']] }, { key: 'next', label: 'Next date', type: 'date' }, { key: 'cat', label: 'Category (optional)', type: 'select', options: [['', 'None'], ...catOptions(true)] }],
    blank: () => ({ name: '', kind: 'expense', amount: '', freq: 'monthly', next: todayISO(), cat: '' }), toForm: r => ({ ...r }),
    fromForm: s => ({ name: s.name.trim(), kind: s.kind, amount: num(s.amount), freq: s.freq, next: s.next, cat: s.cat || '' }),
    extra: r => (r.cat ? [{ label: 'Log it now', act: () => logRecurring(r) }] : [])
  }
};
function catOptions(all) {
  const out = [];
  D.cats.filter(c => !c.parent && !c.hidden && (all || c.group !== 'income')).forEach(c => { out.push([c.id, c.name]); subsOf(c.id).filter(s => !s.hidden).forEach(s => out.push([s.id, '   ' + c.name + ' › ' + s.name])); });
  return out;
}
function payBill(b) {
  if (b.cat) addTx({ date: todayISO(), amount: b.amount, cat: b.cat, note: b.name, acct: defAcct() });
  if (b.repeat === 'monthly') b.due = addMonths(b.due, 1); else if (b.repeat === 'weekly') b.due = addDays(b.due, 7); else b.paid = true;
  toast(b.cat ? 'Marked paid & logged' : 'Marked paid');
}
function logRecurring(r) {
  addTx({ date: todayISO(), amount: r.amount, cat: r.cat, note: r.name, acct: defAcct() });
  r.next = r.freq === 'monthly' ? addMonths(r.next, 1) : r.freq === 'weekly' ? addDays(r.next, 7) : nextPeriod(periodFor(r.next)).start;
  toast('Logged');
}
const dueChip = (d, doneLabel) => {
  if (!d) return ''; const n = diffDays(d, todayISO());
  if (n < 0) return `<span class="tag warn">${-n}d overdue</span>`; if (n === 0) return '<span class="tag warn">Today</span>'; return `<span class="tag ${n <= 7 ? 'ok' : ''}">${n}d left</span>`;
};
function openFin(k, id) {
  const cfg = FIN[k]; const list = D[k]; const item = id ? list.find(x => x.id === id) : null;
  const vals = item ? cfg.toForm(item) : cfg.blank();
  const it = openLayer({
    kind: 'sheet', state: { ...vals }, render: o => {
      const ex = item && cfg.extra ? cfg.extra(item) : [];
      return `<div class="sheet-head"><h2>${item ? 'Edit' : 'New'} ${cfg.title.toLowerCase()}</h2><button class="circle sm" data-act="close" aria-label="Close">${ic('x')}</button></div>
      <div class="fields">${cfg.fields().map(f => fieldHtml(f, o.state[f.key])).join('')}</div>
      <div class="btn-row">${item ? `<button class="btn danger" data-act="fin-del">Delete</button>` : ''}${ex.map((e, i) => `<button class="btn" data-act="fin-extra" data-i="${i}">${e.label}</button>`).join('')}<button class="btn primary" data-act="fin-save">Save</button></div>`;
    }
  });
  it.fin = { k, item, cfg };
}
function fieldHtml(f, val) {
  let input;
  if (f.type === 'select') input = `<select name="${f.key}">${f.options.map(([v, l]) => `<option value="${esc(v)}"${String(v) === String(val ?? '') ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>`;
  else if (f.type === 'date') input = `<input type="date" name="${f.key}" value="${esc(val || '')}">`;
  else if (f.type === 'number') input = `<input type="text" inputmode="decimal" name="${f.key}" value="${esc(val ?? '')}" placeholder="${esc(f.ph || '0')}" autocomplete="off">`;
  else input = `<input type="text" name="${f.key}" value="${esc(val ?? '')}" placeholder="${esc(f.ph || '')}" autocomplete="off">`;
  return `<label class="field"><span>${esc(f.label)}</span>${input}</label>`;
}
function finRows(k) {
  if (k === 'bills') {
    const l = D.bills.slice().sort((a, b) => (a.paid - b.paid) || (a.due < b.due ? -1 : 1));
    return l.map(b => `<button class="item" data-act="fin-edit" data-k="bills" data-id="${b.id}"><span class="ico">${ic('calendar')}</span><span class="mid"><b>${esc(b.name)}</b><small>${b.paid ? 'Paid' : 'Due ' + fmtDate(b.due, true)}${b.repeat !== 'once' ? ' · ' + b.repeat : ''}</small></span><span class="end"><b>${money(b.amount)}</b>${b.paid ? '<span class="tag ok">Paid</span>' : dueChip(b.due)}</span></button>`).join('');
  }
  if (k === 'goals') return D.goals.map(g => { const pc = g.target ? g.saved / g.target * 100 : 0; return `<button class="item" data-act="fin-edit" data-k="goals" data-id="${g.id}"><span class="ico">${ic('goal')}</span><span class="mid"><b>${esc(g.name)}</b>${barHtml(pc, 'gold')}<div class="kv"><span>${money(Math.max(0, g.target - g.saved))} to go</span><span>${money(g.saved)} / ${money(g.target)}</span></div></span><span class="end"><span class="tag ok">${Math.round(pc)}%</span></span></button>`; }).join('');
  if (k === 'debts') return D.debts.map(d => { const pc = d.total ? d.paid / d.total * 100 : 0; return `<button class="item" data-act="fin-edit" data-k="debts" data-id="${d.id}"><span class="ico">${ic('cash')}</span><span class="mid"><b>${esc(d.name)}</b>${barHtml(pc)}<div class="kv"><span>${Math.round(pc)}% paid</span><span>${d.next ? 'Next ' + fmtDate(d.next, true) : ''}</span></div></span><span class="end"><b>${money(Math.max(0, d.total - d.paid))}</b><small class="muted">left</small></span></button>`; }).join('');
  if (k === 'cards') {
    const lim = D.cards.reduce((a, c) => a + c.limit, 0), used = D.cards.reduce((a, c) => a + c.used, 0), due = D.cards.reduce((a, c) => a + c.due, 0), u = lim ? used / lim * 100 : 0;
    const lbl = u < 30 ? 'Low' : u < 70 ? 'Moderate' : 'High';
    let h = `<div class="util"><div class="row2"><div><div class="k">Due now</div><div class="v">${money(due)}</div></div><div style="text-align:right"><div class="k">Total limit</div><div class="v">${money(lim)}</div></div></div><div class="kv" style="margin-top:12px"><b style="color:var(--text)">Utilization</b><b style="color:var(--text)">${Math.round(u)}% · ${lbl}</b></div>${barHtml(u, u >= 70 ? 'over' : '')}<div class="kv"><span>${money(used)} of ${money(lim)} used</span><span>${money(lim - used)} available</span></div></div>`;
    return h + D.cards.map(c => { const pc = c.limit ? c.used / c.limit * 100 : 0; return `<button class="item" data-act="fin-edit" data-k="cards" data-id="${c.id}"><span class="ico">${ic('card')}</span><span class="mid"><b>${esc(c.name)}</b>${barHtml(pc, pc >= 70 ? 'over' : '')}<div class="kv"><span>${money(c.used)} used</span><span>${c.dueDate ? 'Due ' + fmtDate(c.dueDate) : ''}</span></div></span><span class="end"><b>${money(c.due)}</b><small class="muted">due</small></span></button>`; }).join('');
  }
  if (k === 'owed') return D.owed.map(o => `<button class="item" data-act="fin-edit" data-k="owed" data-id="${o.id}"><span class="ico">${ic('user')}</span><span class="mid"><b>${esc(o.person)}</b><small>${esc(o.note || '')}${o.due && !o.settled ? ' · due ' + fmtDate(o.due) : ''}</small></span><span class="end"><b>${money(o.amount)}</b>${o.settled ? '<span class="tag ok">Settled</span>' : dueChip(o.due)}</span></button>`).join('');
  if (k === 'invoices') return D.invoices.slice().sort((a, b) => a.date < b.date ? 1 : -1).map(v => `<button class="item" data-act="fin-edit" data-k="invoices" data-id="${v.id}"><span class="ico">${ic('invoice')}</span><span class="mid"><b>${esc(v.client)}</b><small>${esc(v.number)}${v.number ? ' · ' : ''}${fmtDate(v.date, true)}</small></span><span class="end"><b>${money(v.amount)}</b><span class="tag ${v.paid ? 'ok' : ''}">${v.paid ? 'Paid' : 'Open'}</span></span></button>`).join('');
  if (k === 'recurring') {
    const one = kind => D.recurring.filter(r => r.kind === kind).map(r => `<button class="item" data-act="fin-edit" data-k="recurring" data-id="${r.id}"><span class="ico">${ic('repeat')}</span><span class="mid"><b>${esc(r.name)}</b><small>${r.freq === 'semi-monthly' ? 'Every pay period' : r.freq[0].toUpperCase() + r.freq.slice(1)} · next ${fmtDate(r.next)}</small></span><span class="end"><b>${money(r.amount)}</b>${dueChip(r.next)}</span></button>`).join('');
    const a = one('income'), b = one('expense');
    return (a ? '<div class="sublist" style="margin-top:2px">Income</div>' + a : '') + (b ? '<div class="sublist">Expenses</div>' + b : '');
  }
  return '';
}
function finSection(k, title, sub) {
  const rows = finRows(k);
  return `<div class="sec-head"><h2>${title}${sub ? `<span class="sub">· ${sub}</span>` : ''}</h2><button class="link" data-act="fin-add" data-k="${k}">${ic('plus', 'sm')} Add</button></div>
  <div class="card" style="padding:6px 16px 8px">${rows || `<div class="empty">${emptyArt()}<p>Nothing here yet. Tap Add to create your first ${FIN[k].title.toLowerCase()}.</p></div>`}</div>`;
}
function upcomingInfo() {
  const t = todayISO(), lim = addDays(t, 7);
  const open = D.bills.filter(b => !b.paid).sort((a, b) => a.due < b.due ? -1 : 1);
  const soon = open.filter(b => b.due <= lim);
  return { sum: soon.reduce((a, b) => a + b.amount, 0), next: open[0], count: soon.length };
}
function viewFinance() {
  const p = pSel(), st = stats(p), up = upcomingInfo();
  const pct = st.outBud > 0 ? st.out / st.outBud * 100 : 0, left = st.outBud - st.out;
  const owedSum = D.owed.filter(o => !o.settled).reduce((a, o) => a + o.amount, 0), debtLeft = D.debts.reduce((a, d) => a + Math.max(0, d.total - d.paid), 0), cardUsed = D.cards.reduce((a, c) => a + c.used, 0);
  const openInv = D.invoices.filter(v => !v.paid).length;
  const tabs = [['all', 'All', ''], ['plan', 'Plan', ''], ['bills', 'Bills', D.bills.filter(b => !b.paid).length], ['goals', 'Goals', D.goals.length], ['debts', 'Debts', D.debts.length], ['cards', 'Cards', D.cards.length], ['owed', 'Owed', D.owed.filter(o => !o.settled).length], ['invoices', 'Invoices', D.invoices.length], ['recurring', 'Recurring', D.recurring.length]];
  const planCard = `<button class="plan" data-act="goto" data-v="budget"><div class="t"><div style="min-width:0"><b>${ic('plan', 'sm')} Money Plan</b><div class="lbl">${left < 0 ? 'Over budget by' : 'Left to spend'} · ${periodLabel(p)}</div><div class="big ${left < 0 ? 'over' : ''}">${money(Math.abs(left))}</div></div><div class="pr">${ringSvg(pct, 64, 8, '#fff', 'rgba(255,255,255,.28)')}<span>${Math.round(pct)}%</span></div></div><div class="mini3"><div><small>Balance</small><b>${cm(st.closing)}</b></div><div><small>Planned</small><b>${cm(st.outBud)}</b></div><div><small>Income</small><b>${cm(st.g.income)}</b></div></div></button>`;
  const upCard = `<button class="upc" data-act="fin-tab" data-v="bills"><div class="t">${ic('calendar', 'sm')} Upcoming Bills</div><div class="big">${money(up.sum)} <small>due in the next 7 days</small></div><div class="nx">${ic('bolt', 'sm')} ${up.next ? `Next: ${esc(up.next.name)} on ${fmtDate(up.next.due, true)}` : 'No bills scheduled — tap to add'}</div></button>`;
  let h = header('Finance', `${D.bills.filter(b => !b.paid).length} bills · ${D.goals.length} goals`);
  h += `<div class="chips">${tabs.map(t => `<button class="chip ${ui.fin === t[0] ? 'on' : ''}" data-act="fin-tab" data-v="${t[0]}">${t[1]}${t[2] !== '' ? `<em>${t[2]}</em>` : ''}</button>`).join('')}</div>`;
  const f = ui.fin, all = f === 'all';
  if (all || f === 'plan') h += planCard;
  if (all) h += upCard;
  if (all || f === 'bills') h += finSection('bills', 'Bills', all ? '' : money(D.bills.filter(b => !b.paid).reduce((a, b) => a + b.amount, 0)) + ' unpaid');
  if (all || f === 'goals') h += finSection('goals', 'Savings Goals', '');
  if (all || f === 'debts') h += finSection('debts', 'Debts', money(debtLeft));
  if (all || f === 'cards') h += finSection('cards', 'Credit Cards', money(cardUsed));
  if (all || f === 'owed') h += finSection('owed', 'Money Owed to You', money(owedSum));
  if (all || f === 'invoices') h += finSection('invoices', 'Invoices', openInv + ' open');
  if (all || f === 'recurring') h += finSection('recurring', 'Recurring', '');
  return h;
}

/* =========================================================
   Tab bar & render
   ========================================================= */
function tabbar() {
  const t = (id, label, icon) => `<button class="tab ${ui.tab === id ? 'on' : ''}" data-act="tab" data-v="${id}" aria-label="${label}"><span class="ti">${ic(icon)}</span>${label}</button>`;
  return `<nav class="tabbar" aria-label="Main">${t('home', 'Home', 'home')}${t('budget', 'Budget', 'budget')}<button class="fab" data-act="add" aria-label="Add transaction">${ic('plus')}</button>${t('insights', 'Insights', 'bars')}${t('finance', 'Finance', 'finance')}</nav>`;
}
function render() {
  const v = { home: viewHome, budget: viewBudget, insights: viewInsights, finance: viewFinance }[ui.tab]();
  $('#app').innerHTML = v + tabbar();
}

/* =========================================================
   QUICK ADD / EDIT TRANSACTION
   ========================================================= */
const fmtRaw = s => { if (!s) return ''; const [i, d] = s.split('.'); return Number(i).toLocaleString('en-US') + (d !== undefined ? '.' + d : ''); };
const defAcct = () => { const v = D.accounts.filter(x => !x.hidden); return (ui.lastAcct && v.some(x => x.id === ui.lastAcct) ? ui.lastAcct : (v[0] || D.accounts[0]).id); };
function evalExpr(str) {
  const toks = String(str || '').match(/\d*\.?\d+|\d+\.|[+\-*/]/g); if (!toks) return null;
  while (toks.length && /^[+\-*/]$/.test(toks[toks.length - 1])) toks.pop();
  if (!toks.length) return null;
  const nums = [], ops = []; toks.forEach((t, i) => (i % 2 === 0 ? nums.push(parseFloat(t)) : ops.push(t)));
  if (nums.some(isNaN) || ops.length !== nums.length - 1) return null;
  const n2 = [nums[0]], o2 = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] === '*') n2[n2.length - 1] *= nums[i + 1];
    else if (ops[i] === '/') { if (nums[i + 1] === 0) return null; n2[n2.length - 1] /= nums[i + 1]; }
    else { o2.push(ops[i]); n2.push(nums[i + 1]); }
  }
  let r = n2[0]; o2.forEach((o, i) => { r = o === '+' ? r + n2[i + 1] : r - n2[i + 1]; });
  return isFinite(r) ? r : null;
}
const roundD = n => Math.round(n * 10 ** decs()) / 10 ** decs();
function openQuick(id) {
  const tx = id ? D.tx.find(t => t.id === id) : null; let st;
  if (tx) st = { id, type: isTr(tx) ? 'transfer' : (isInc(tx) ? 'income' : 'expense'), amt: String(tx.amount), cat: isTr(tx) ? '' : tx.cat, date: tx.date, note: tx.note || '', acct: tx.acct, to: tx.to || '', fee: tx.fee ? String(tx.fee) : '' };
  else { const a = defAcct(), o = D.accounts.find(x => !x.hidden && x.id !== a); st = { id: null, type: 'expense', amt: '', cat: ui.lastCat.expense || '', date: todayISO(), note: '', acct: a, to: o ? o.id : '', fee: '' }; }
  if (st.cat && !cat(st.cat)) st.cat = '';
  openLayer({ kind: 'sheet', state: st, render: quickRender });
}
function quickRender(it) {
  const s = it.state, d = decs(), tr = s.type === 'transfer';
  const roots = D.cats.filter(c => !c.parent && !c.hidden && (s.type === 'income' ? c.group === 'income' : c.group !== 'income'));
  const sel = cat(s.cat), selRoot = sel ? root(sel) : null;
  function chip(c) { const on = selRoot && selRoot.id === c.id; return `<button class="cc ${on ? 'on' : ''}" data-act="qa-cat" data-id="${c.id}">${ci(c.id)}${esc(c.name)}</button>`; }
  let chips = '';
  if (s.type === 'income') chips = `<div class="cgrid">${roots.map(chip).join('')}</div>`;
  else if (!tr) ['spending', 'fixed', 'loans', 'savings'].map(id => GROUPS.find(g => g.id === id)).forEach(g => { const r = roots.filter(c => c.group === g.id); if (r.length) chips += `<div class="lblsm">${g.name}</div><div class="cgrid">${r.map(chip).join('')}</div>`; });
  const subs = selRoot && !tr ? subsOf(selRoot.id).filter(x => !x.hidden) : [];
  const subRow = subs.length ? `<div class="lblsm">Sub category (optional)</div><div class="cgrid">${subs.map(c => `<button class="cc ${s.cat === c.id ? 'on' : ''}" data-act="qa-cat" data-id="${c.id}">${ci(c.id)}${esc(c.name)}</button>`).join('')}</div>` : '';
  const rows = [['1', '2', '3', '/'], ['4', '5', '6', '*'], ['7', '8', '9', '-'], [d ? '.' : '', '0', 'back', '+']];
  const sym = { '/': '÷', '*': '×', '-': '−', '+': '+', back: '⌫' };
  const keys = rows.flat().map(k => k === '' ? '<span></span>' : `<button class="${/^[+\-*/]$/.test(k) ? 'op' : ''}" data-act="qa-key" data-k="${k}" aria-label="${k === 'back' ? 'Delete' : k}">${sym[k] || k}</button>`).join('');
  const hasOp = /[+\-*/]/.test(s.amt), res = evalExpr(s.amt);
  const disp = s.amt ? s.amt.replace(/\d+(\.\d*)?/g, m => fmtRaw(m)).replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−') : '0';
  const y = addDays(todayISO(), -1);
  const accSel = (key, label, val) => fieldHtml({ key, label, type: 'select', options: D.accounts.filter(x => !x.hidden || x.id === val).map(x => [x.id, x.name]) }, val);
  const fields = (tr ? accSel('acct', 'From account', s.acct) + accSel('to', 'To account', s.to) : accSel('acct', 'Account', s.acct))
    + fieldHtml({ key: 'fee', label: tr ? 'Transfer fee (optional)' : 'Fee (optional)', type: 'number' }, s.fee)
    + `<label class="field"><span>Date</span><input type="date" name="date" value="${esc(s.date)}"></label><label class="field"><span>Note (optional)</span><input type="text" name="note" value="${esc(s.note)}" placeholder="What was it for?" autocomplete="off"></label>`;
  return `<div class="sheet-head"><h2>${s.id ? 'Edit' : 'New'} ${tr ? 'transfer' : 'transaction'}</h2><button class="circle sm" data-act="close" aria-label="Close">${ic('x')}</button></div>
  <div class="typeseg">${[['expense', 'Expense'], ['income', 'Income'], ['transfer', 'Transfer']].map(t => `<button class="${s.type === t[0] ? 'on' : ''}" data-act="qa-type" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
  <div class="amtbox"><div class="cur">${esc(S.cur)}</div><div class="val ${s.amt ? '' : 'zero'}" style="${disp.length > 13 ? 'font-size:28px' : ''}">${curInfo()[0]}${disp}</div><div class="res">${hasOp && res != null ? '= ' + money(roundD(res)) : '&nbsp;'}</div></div>
  <div class="keypad">${keys}<button class="eq" data-act="qa-key" data-k="=">=</button></div>
  ${chips}${subRow}
  <div class="lblsm">Date</div><div class="dchips" style="margin-bottom:10px"><button class="cc ${s.date === todayISO() ? 'on' : ''}" data-act="qa-date" data-v="${todayISO()}">Today</button><button class="cc ${s.date === y ? 'on' : ''}" data-act="qa-date" data-v="${y}">Yesterday</button></div>
  <div class="fields">${fields}</div>
  <div class="btn-row sticky">${s.id ? `<button class="btn danger" data-act="qa-del">Delete</button>` : ''}<button class="btn primary" data-act="qa-save">Save</button></div>`;
}

/* =========================================================
   CATEGORY SHEET
   ========================================================= */
function openCat(id, group, parent) {
  const c = id ? cat(id) : null, p = pSel();
  const isSub = c ? !!c.parent : !!parent;
  const ov = c && D.periodBudgets[p.start] && D.periodBudgets[p.start][c.id];
  const st = { color: c ? catColor(c.id) : COLOR_CHOICES[D.cats.length % COLOR_CHOICES.length], icon: c ? catIcon(c.id) : (parent ? catIcon(parent) : 'tag'), name: c ? c.name : '', budget: c ? (c.budget || '') : '', over: ov != null ? ov : '', when: c ? String(c.when) : 'all', hidden: c && c.hidden ? 'yes' : 'no' };
  openLayer({
    kind: 'sheet', state: st, cid: id, group: c ? c.group : group, parent: c ? c.parent : parent, isSub,
    render: it => {
      const s = it.state, inc = it.group === 'income', subs = c && !isSub ? subsOf(c.id) : [];
      let h = `<div class="sheet-head"><h2>${c ? 'Edit' : 'New'} ${isSub ? 'sub category' : 'category'}</h2><button class="circle sm" data-act="close" aria-label="Close">${ic('x')}</button></div><div class="fields">`;
      h += fieldHtml({ key: 'name', label: 'Name', type: 'text', ph: 'Category name' }, s.name);
      h += `<div><div class="lblsm" style="margin:0 4px 6px">Icon</div><div class="igrid">${ICON_CHOICES.map(n => `<button class="ib ${s.icon === n ? 'on' : ''}" data-act="cat-icon" data-v="${n}" aria-label="${n}">${ic(n)}</button>`).join('')}</div></div>`;
      h += `<div><div class="lblsm" style="margin:0 4px 6px">Color</div><div class="sgrid">${COLOR_CHOICES.map(k => `<button class="sb ${s.color === k ? 'on' : ''}" style="background:${k}" data-act="cat-color" data-v="${k}" aria-label="Color ${k}">${s.color === k ? ic('check', 'sm') : ''}</button>`).join('')}</div></div>`;
      if (!isSub) {
        h += fieldHtml({ key: 'budget', label: inc ? 'Expected income per period' : 'Budget per period', type: 'number' }, s.budget);
        h += fieldHtml({ key: 'when', label: 'Applies to', type: 'select', options: [['all', 'Every period'], ...payDays().map((d, i) => [String(i), `Only periods starting on the ${ord(d)}`])] }, s.when);
        if (c) h += fieldHtml({ key: 'over', label: `${inc ? 'Income' : 'Budget'} for ${periodLabel(p)} only (optional)`, type: 'number', ph: 'Leave empty to use the default' }, s.over);
      }
      h += fieldHtml({ key: 'hidden', label: 'Visibility', type: 'select', options: [['no', 'Visible'], ['yes', 'Hidden']] }, s.hidden) + '</div>';
      if (c && !isSub) {
        h += `<div class="lblsm" style="margin-top:14px">Sub categories</div><div class="card flat" style="padding:4px 14px;margin:0">${subs.map(x => `<button class="srow" data-act="cat-edit" data-id="${x.id}"><span class="l"><b>${esc(x.name)}</b>${x.hidden ? '<small>Hidden</small>' : ''}</span>${ic('chr', 'sm')}</button>`).join('')}<button class="addrow" data-act="sub-add" data-id="${c.id}">${ic('plus', 'sm')} Add sub category</button></div>`;
      }
      h += `<div class="btn-row">${c ? `<button class="btn danger" data-act="cat-del">Delete</button>` : ''}<button class="btn primary" data-act="cat-save">Save</button></div>`;
      return h;
    }
  });
}

/* =========================================================
   FILTER SHEET
   ========================================================= */
function openFilter() {
  openLayer({
    kind: 'sheet', state: { typeF: ui.typeF, groupF: ui.groupF, catF: ui.catF, acctF: ui.acctF }, render: it => {
      const s = it.state;
      return `<div class="sheet-head"><h2>Filter</h2><button class="circle sm" data-act="close" aria-label="Close">${ic('x')}</button></div>
      <div class="lblsm" style="margin-top:0">Type</div><div class="seg3" style="margin-bottom:12px">${[['all', 'All'], ['income', 'Income'], ['expense', 'Expense']].map(t => `<button class="${s.typeF === t[0] ? 'on' : ''}" data-act="ff-type" data-v="${t[0]}">${t[1]}</button>`).join('')}</div>
      <div class="fields">${fieldHtml({ key: 'groupF', label: 'Group', type: 'select', options: [['', 'All groups'], ...GROUPS.map(g => [g.id, g.name])] }, s.groupF)}${fieldHtml({ key: 'catF', label: 'Category', type: 'select', options: [['', 'All categories'], ...D.cats.filter(c => !c.parent).map(c => [c.id, c.name])] }, s.catF)}${fieldHtml({ key: 'acctF', label: 'Account', type: 'select', options: [['', 'All accounts'], ...D.accounts.map(x => [x.id, x.name])] }, s.acctF)}</div>
      <div class="btn-row"><button class="btn" data-act="ff-clear">Clear</button><button class="btn primary" data-act="ff-apply">Apply</button></div>`;
    }
  });
}

/* =========================================================
   SPREADSHEET PAGE
   ========================================================= */
function sheetRows() {
  const list = filteredTx(ui.sq);
  const body = list.map(t => {
    const tr = isTr(t), c = cat(t.cat), r = root(c), inc = isInc(t);
    const cls = tr ? 'tf' : inc ? 'pos' : 'neg', amt = tr ? money(t.amount) : money(inc ? t.amount : -t.amount, true);
    return `<tr data-act="tx-edit" data-id="${t.id}"><td>${fmtDate(t.date)}</td><td title="${esc(t.note || '')}">${esc(t.note || (tr ? 'Transfer' : c ? c.name : ''))}</td><td class="num ${cls}">${amt}</td><td class="num">${t.fee ? money(t.fee) : ''}</td><td>${tr ? 'Transfer' : `<i class="cdot" style="background:${catColor(t.cat)}"></i>${esc(r ? r.name : '')}`}</td><td>${!tr && c && c.parent ? esc(c.name) : ''}</td><td>${tr ? esc(acctName(t.acct)) + ' → ' + esc(acctName(t.to)) : esc(acctName(t.acct))}</td><td><span class="ty ${tr ? 'tr' : inc ? '' : 'exp'}">${tr ? 'Transfer' : inc ? 'Income' : 'Expense'}</span></td><td>${tr ? '' : GNAME[catGroup(t.cat)]}</td></tr>`;
  }).join('');
  const inc = list.filter(t => isInc(t)).reduce((a, t) => a + effAmt(t), 0), exp = list.filter(t => !isInc(t)).reduce((a, t) => a + effAmt(t), 0);
  return { list, body, inc, exp };
}
function sheetInner() {
  const r = sheetRows();
  return `<div class="tblwrap"><table class="tbl"><thead><tr><th>Date</th><th>Description</th><th style="text-align:right">Amount</th><th style="text-align:right">Fee</th><th>Category</th><th>Subcategory</th><th>Account</th><th>Type</th><th>Group</th></tr></thead><tbody>${r.body || `<tr><td colspan="9" style="text-align:center;color:var(--muted);height:70px">No rows</td></tr>`}</tbody></table></div>
  <div class="sumbar"><div><small>Rows</small><b>${r.list.length}</b></div><div><small>Income</small><b>+${cm(r.inc)}</b></div><div><small>Expense</small><b>-${cm(r.exp)}</b></div><div><small>Net</small><b>${r.inc - r.exp < 0 ? '-' : '+'}${cm(Math.abs(r.inc - r.exp))}</b></div></div>`;
}
function openSheetPage() {
  openLayer({
    kind: 'page', auto: true, render: () => `<div class="page-head"><button class="circle" data-act="close" aria-label="Close">${ic('x')}</button><div class="t" style="text-align:center"><h2>Spreadsheet</h2><small>${filteredTx(ui.sq).length} rows</small></div><button class="circle" data-act="export-csv" aria-label="Export CSV">${ic('down')}</button></div>
    <div class="sheetbar"><label class="search">${ic('search', 'sm')}<input type="search" data-input="sq" placeholder="Search" value="${esc(ui.sq)}" autocomplete="off"></label><label class="rangesel" style="background:var(--surface);border-radius:var(--r-sm);box-shadow:var(--shadow-sm);height:48px;padding:0 12px;font-size:14px">${ic('calendar', 'sm')}<span style="margin-left:6px"><b style="color:var(--text)">${esc(rangeShort())}</b></span><select data-change="range">${RANGES.map(r => `<option value="${r[0]}"${ui.range === r[0] ? ' selected' : ''}>${r[1]}</option>`).join('')}</select></label><button class="sq" data-act="filter" aria-label="Filter">${ic('filter')}${filtersOn() ? '<i class="dotf"></i>' : ''}</button></div>
    <div id="sbody">${sheetInner()}</div>`
  });
}
const rangeShort = () => ({ period: 'Period', prev: 'Last', month: 'Month', lastmonth: 'Prev month', all: 'All' }[ui.range]);

/* =========================================================
   SETTINGS PAGE
   ========================================================= */
function backupText() { if (!S.lastBackup) return 'Never'; const d = diffDays(todayISO(), S.lastBackup); return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : d + ' days ago'; }
function openSettings() {
  openLayer({
    kind: 'page', auto: true, render: () => {
      const pd = payDays();
      let h = `<div class="page-head"><button class="circle" data-act="close" aria-label="Close">${ic('x')}</button><div class="t" style="text-align:center"><h2>Settings</h2></div><span style="width:46px"></span></div>`;
      h += `<div class="card setcard"><h3>Pay days</h3><p class="muted" style="font-size:13px">Each pay period starts on one of these days of the month.</p><div class="pd">${pd.map((d, i) => `<button class="cc" data-act="pd-edit" data-i="${i}">${ord(d)}</button>`).join('')}<button class="cc" data-act="pd-add">${ic('plus', 'sm')} Add</button></div></div>`;
      h += `<div class="card setcard"><h3>General</h3>
        <label class="srow"><span class="l"><b>Currency</b></span><select class="inl" data-change="cur">${Object.keys(CURS).map(c => `<option value="${c}"${S.cur === c ? ' selected' : ''}>${c} ${CURS[c][0]}</option>`).join('')}</select></label></div>`;
      h += `<div class="card setcard"><h3>Accounts</h3>${D.accounts.map(x => `<button class="srow" data-act="acct-edit" data-id="${x.id}"><span class="l"><b>${esc(x.name)}</b>${x.hidden ? '<small>Hidden</small>' : ''}</span><span class="r">${money(acctBalance(x, todayISO()))} ${ic('chr', 'sm')}</span></button>`).join('')}<button class="addrow" data-act="acct-add">${ic('plus', 'sm')} Add account</button></div>`;
      h += `<div class="card setcard"><h3>Categories</h3>`;
      GROUPS.forEach(g => {
        h += `<div class="sublist">${g.name}</div>`;
        D.cats.filter(c => !c.parent && c.group === g.id).forEach(c => { const n = subsOf(c.id).length; h += `<button class="srow" data-act="cat-edit" data-id="${c.id}"><span class="cn">${ci(c.id)}<span class="l"><b>${esc(c.name)}</b><small>${c.hidden ? 'Hidden' : ''}${c.hidden && n ? ' · ' : ''}${n ? n + ' sub categor' + (n > 1 ? 'ies' : 'y') : ''}</small></span></span>${ic('chr', 'sm')}</button>`; });
        h += `<button class="addrow" data-act="cat-add" data-g="${g.id}">${ic('plus', 'sm')} Add category</button>`;
      });
      h += `</div>`;
      h += `<div class="card setcard"><h3>Appearance</h3><div class="seg3">${[['light', 'Light'], ['dark', 'Dark'], ['auto', 'Auto']].map(t => `<button class="${S.theme === t[0] ? 'on' : ''}" data-act="theme" data-v="${t[0]}">${t[1]}</button>`).join('')}</div></div>`;
      h += `<div class="card setcard"><h3>Backup</h3><div class="srow"><span class="l"><b>Last backup</b><small>Your data lives only on this device</small></span><span class="r">${backupText()}</span></div>
        <div class="btn-row" style="margin-top:12px"><button class="btn" data-act="export-json">${ic('down', 'sm')} JSON</button><button class="btn" data-act="export-csv">${ic('down', 'sm')} CSV</button><button class="btn" data-act="import">${ic('up', 'sm')} Import</button></div></div>`;
      h += `<div class="card setcard"><h3>Demo mode</h3><button class="srow" data-act="demo-toggle"><span class="l"><b>Use demo data</b><small>Sample data for screenshots. Your own data stays untouched.</small></span><span class="switch ${S.demo ? 'on' : ''}"></span></button></div>`;
      h += `<div class="card setcard"><button class="srow" data-act="reset"><span class="l"><b style="color:var(--coral)">Erase all my data</b><small>${S.demo ? 'Resets the demo data' : 'Removes everything stored on this device'}</small></span></button></div>`;
      h += `<p class="sheetnote" style="text-align:center">Pay Period Budget · v1.0 · works offline</p>`;
      return h;
    }
  });
}

/* =========================================================
   PROFILE & WELCOME
   ========================================================= */
function openProfile() {
  openLayer({
    kind: 'sheet', state: { name: S.name }, render: it => `<div class="sheet-head"><h2>Profile</h2><button class="circle sm" data-act="close" aria-label="Close">${ic('x')}</button></div>
    <div class="fields">${fieldHtml({ key: 'name', label: 'Your name', type: 'text', ph: 'How should we greet you?' }, it.state.name)}</div>
    <p class="sheetnote">There is no account or login. Everything is stored privately on this device. Last backup: ${backupText()}.</p>
    <div class="btn-row"><button class="btn primary" data-act="profile-save">Save</button></div>`
  });
}
function openWelcome() {
  const pd = payDays();
  openLayer({
    kind: 'sheet', state: { name: S.name, cur: S.cur, p1: pd[0] || 11, p2: pd[1] || 25 }, render: it => `<div class="sheet-head"><h2>Welcome</h2></div>
    <p class="muted" style="margin:0 4px 12px">Plan your money by pay period. Set up the basics — you can change everything later in Settings.</p>
    <div class="fields">${fieldHtml({ key: 'name', label: 'Your name (optional)', type: 'text' }, it.state.name)}${fieldHtml({ key: 'cur', label: 'Currency', type: 'select', options: Object.keys(CURS).map(c => [c, `${c} ${CURS[c][0]}`]) }, it.state.cur)}${fieldHtml({ key: 'p1', label: 'First pay day (day of month)', type: 'number' }, it.state.p1)}${fieldHtml({ key: 'p2', label: 'Second pay day (optional)', type: 'number' }, it.state.p2)}</div>
    <div class="btn-row"><button class="btn" data-act="welcome-go" data-demo="1">Try demo data</button><button class="btn primary" data-act="welcome-go">Start fresh</button></div>`
  });
}

/* =========================================================
   Backup helpers
   ========================================================= */
function download(name, text, type) { const b = new Blob([text], { type }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800); }
function markBackup() { if (!S.demo) { S.lastBackup = todayISO(); saveSettings(); } }
function exportJSON() {
  download(`budget-backup-${todayISO()}.json`, JSON.stringify({ app: 'pay-period-budget', version: 1, exportedAt: new Date().toISOString(), settings: { cur: S.cur, payDays: S.payDays, name: S.name }, data: D }, null, 1), 'application/json');
  markBackup(); toast('Backup saved'); refresh();
}
function exportCSV() { download(`transactions-${todayISO()}.csv`, txToCSV(D.tx.slice().sort((a, b) => a.date < b.date ? 1 : -1)), 'text/csv'); markBackup(); toast('CSV exported'); refresh(); }
function pickImport() {
  if (S.demo) return toast('Turn off demo mode before importing');
  let f = $('#impfile'); if (!f) { f = document.createElement('input'); f.type = 'file'; f.id = 'impfile'; f.accept = '.json,.csv,application/json,text/csv'; f.className = 'hidden'; document.body.appendChild(f); f.addEventListener('change', onImportFile); }
  f.value = ''; f.click();
}
function onImportFile(e) {
  const file = e.target.files[0]; if (!file) return; const rd = new FileReader();
  rd.onload = () => {
    try {
      if (/\.csv$/i.test(file.name)) { const n = importCSV(String(rd.result)); commit(); toast(`Imported ${n} transactions`); }
      else {
        const o = JSON.parse(String(rd.result)); if (!o.data || !Array.isArray(o.data.tx)) throw new Error('Not a valid backup');
        askConfirm('Replace your data?', `This backup has ${o.data.tx.length} transactions. It will replace everything currently in the app.`, 'Replace', () => {
          D = { ...defaultData(), ...migrate(o.data) }; if (o.settings) { if (CURS[o.settings.cur]) S.cur = o.settings.cur; if (Array.isArray(o.settings.payDays)) S.payDays = o.settings.payDays; if (o.settings.name != null) S.name = o.settings.name; saveSettings(); }
          commit(); toast('Backup restored');
        });
      }
    } catch (err) { toast('Import failed: ' + err.message); }
  };
  rd.readAsText(file);
}

/* =========================================================
   ACTIONS
   ========================================================= */
const ACT = {
  close: el => { const it = itemOf(el); if (it) closeItem(it); },
  'confirm-ok': el => { const it = itemOf(el); closeItem(it); it.ok(); },
  tab: el => { ui.tab = el.dataset.v; render(); scrollTo(0, 0); },
  goto: el => { ui.tab = el.dataset.v; render(); scrollTo(0, 0); },
  add: () => openQuick(null),
  'tx-edit': el => openQuick(el.dataset.id),
  'sheet-open': () => openSheetPage(),
  settings: () => openSettings(),
  profile: () => openProfile(),
  'profile-save': el => { const it = itemOf(el); S.name = (it.state.name || '').trim(); saveSettings(); closeItem(it); refresh(); toast('Saved'); },
  pprev: () => { ui.pStart = prevPeriod(pSel()).start; ui.day = ''; refresh(); },
  pnext: () => { ui.pStart = nextPeriod(pSel()).start; ui.day = ''; refresh(); },
  view: el => { ui.view = el.dataset.v; render(); },
  day: el => { ui.day = ui.day === el.dataset.d ? '' : el.dataset.d; render(); },
  'day-clear': () => { ui.day = ''; render(); },
  filter: () => openFilter(),
  'ff-type': el => { const it = itemOf(el); it.state.typeF = el.dataset.v; draw(it); },
  'ff-clear': el => { ui.typeF = 'all'; ui.groupF = ''; ui.catF = ''; ui.acctF = ''; closeItem(itemOf(el)); refresh(); },
  'ff-apply': el => { const it = itemOf(el); ui.typeF = it.state.typeF; ui.groupF = it.state.groupF || ''; ui.catF = it.state.catF || ''; ui.acctF = it.state.acctF || ''; closeItem(it); refresh(); },
  'acct-toggle': () => { ui.acctOpen = !ui.acctOpen; render(); },
  'acct-add': () => openAcct(), 'acct-edit': el => openAcct(el.dataset.id),
  'banner-off': () => { ui.bannerOff = true; render(); },
  'fin-tab': el => { ui.fin = el.dataset.v; ui.tab = 'finance'; render(); scrollTo(0, 0); },
  'fin-add': el => openFin(el.dataset.k),
  'fin-edit': el => openFin(el.dataset.k, el.dataset.id),
  'fin-save': el => {
    const it = itemOf(el), { k, item, cfg } = it.fin, s = it.state;
    for (const key of cfg.req) { const v = s[key]; const isNum = cfg.fields().find(f => f.key === key).type === 'number'; if (isNum ? !num(v) : !String(v || '').trim()) return toast('Please fill in all required fields'); }
    const vals = cfg.fromForm(s);
    if (item) Object.assign(item, vals); else D[k].push({ id: uid(), ...vals });
    closeItem(it); commit(); toast('Saved');
  },
  'fin-del': el => { const it = itemOf(el), { k, item } = it.fin; askConfirm('Delete this item?', 'This cannot be undone.', 'Delete', () => { D[k] = D[k].filter(x => x.id !== item.id); closeItem(it); commit(); }); },
  'fin-extra': el => { const it = itemOf(el), { item, cfg } = it.fin; cfg.extra(item)[+el.dataset.i].act(); closeItem(it); commit(); },
  /* quick add */
  'qa-type': el => { const it = itemOf(el), s = it.state, v = el.dataset.v; if (s.type !== v) { s.type = v; if (v === 'transfer') { if (!s.to || s.to === s.acct) { const o = D.accounts.find(x => !x.hidden && x.id !== s.acct); s.to = o ? o.id : ''; } } else s.cat = ui.lastCat[v] && cat(ui.lastCat[v]) ? ui.lastCat[v] : ''; } draw(it); },
  'qa-key': el => {
    const it = itemOf(el), s = it.state, k = el.dataset.k; let a = s.amt; const cur = (a.match(/(\d*\.?\d*)$/) || ['', ''])[1];
    if (k === 'back') a = a.slice(0, -1);
    else if (k === '=') { const r = evalExpr(a); if (r == null) return; if (r < 0) return toast('Result must be positive'); a = String(roundD(r)); if (a === '0') a = ''; }
    else if (/^[+\-*/]$/.test(k)) { if (!a) return; a = /[+\-*/]$/.test(a) ? a.slice(0, -1) + k : a + k; }
    else if (k === '.') { if (!decs() || cur.includes('.')) return; a += cur ? '.' : '0.'; }
    else { if (cur === '0') a = a.slice(0, -1); const dot = cur.indexOf('.'); if (dot >= 0 && cur.length - dot - 1 >= decs()) return; if (cur.replace('.', '').length >= 12) return; a += k; }
    if (a.length > 40) return; s.amt = a; draw(it);
  },
  'qa-cat': el => { const it = itemOf(el), s = it.state, c = cat(el.dataset.id); if (c.parent && s.cat === c.id) s.cat = c.parent; else s.cat = c.id; draw(it); },
  'qa-date': el => { const it = itemOf(el); it.state.date = el.dataset.v; draw(it); },
  'qa-save': el => {
    const it = itemOf(el), s = it.state; let amount = evalExpr(s.amt);
    if (amount == null || amount <= 0) return toast('Enter an amount'); amount = roundD(amount);
    if (!s.date) return toast('Pick a date');
    const fee = Math.abs(num(s.fee)), note = (s.note || '').trim(); let data;
    if (s.type === 'transfer') { if (!s.acct || !s.to || s.acct === s.to) return toast('Choose two different accounts'); data = { type: 'transfer', acct: s.acct, to: s.to, amount, fee, cat: 'fees', date: s.date, note }; }
    else { if (!s.cat) return toast('Pick a category'); data = { acct: s.acct, amount, fee, cat: s.cat, date: s.date, note }; }
    if (s.id) { const t = D.tx.find(x => x.id === s.id); delete t.type; delete t.to; Object.assign(t, data); } else addTx(data);
    ui.lastAcct = s.acct; if (s.type !== 'transfer') ui.lastCat[s.type] = s.cat;
    closeItem(it); commit(); toast('Saved');
  },
  'qa-del': el => { const it = itemOf(el); askConfirm('Delete transaction?', 'This cannot be undone.', 'Delete', () => { D.tx = D.tx.filter(t => t.id !== it.state.id); closeItem(it); commit(); }); },
  /* categories */
  'cat-add': el => openCat(null, el.dataset.g, null),
  'sub-add': el => { const it = itemOf(el); openCat(null, null, el.dataset.id); },
  'cat-edit': el => openCat(el.dataset.id),
  'cat-color': el => { const it = itemOf(el); it.state.color = el.dataset.v; draw(it); },
  'cat-icon': el => { const it = itemOf(el); it.state.icon = el.dataset.v; draw(it); },
  'cat-save': el => {
    const it = itemOf(el), s = it.state, name = (s.name || '').trim(); if (!name) return toast('Enter a name');
    let c = it.cid ? cat(it.cid) : null;
    if (!c) { c = { id: uid(), name, group: it.parent ? cat(it.parent).group : it.group, parent: it.parent || null, budget: 0, when: 'all', hidden: false }; D.cats.push(c); }
    c.name = name; c.hidden = s.hidden === 'yes'; c.icon = s.icon || 'tag'; c.color = s.color;
    if (!it.isSub) {
      c.budget = num(s.budget); c.when = s.when === 'all' ? 'all' : Number(s.when);
      const p = pSel(); D.periodBudgets[p.start] = D.periodBudgets[p.start] || {};
      if (String(s.over ?? '').trim() !== '') D.periodBudgets[p.start][c.id] = num(s.over); else delete D.periodBudgets[p.start][c.id];
    }
    closeItem(it); commit(); toast('Saved');
  },
  'cat-del': el => {
    const it = itemOf(el), c = cat(it.cid);
    if (D.tx.some(t => t.cat === c.id) || subsOf(c.id).length) return toast('It has transactions or sub categories — hide it instead');
    askConfirm('Delete category?', `“${c.name}” will be removed.`, 'Delete', () => { D.cats = D.cats.filter(x => x.id !== c.id); closeItem(it); commit(); });
  },
  /* settings */
  theme: el => { S.theme = el.dataset.v; saveSettings(); applyTheme(); refresh(); },
  'pd-add': () => openPayDay(-1),
  'pd-edit': el => openPayDay(+el.dataset.i),
  'bal-edit': () => openForm('Opening balance', [{ key: 'v', label: 'Balance before your first period', type: 'number' }], { v: D.startBalance || '' }, s => { D.startBalance = num(s.v); commit(); }),
  'export-json': () => exportJSON(), 'export-csv': () => exportCSV(), import: () => pickImport(),
  'demo-toggle': () => { S.demo = !S.demo; saveSettings(); loadData(); ui.pStart = null; refresh(); toast(S.demo ? 'Demo data on' : 'Back to your data'); },
  reset: () => askConfirm('Erase all data?', S.demo ? 'The demo data will be regenerated.' : 'All transactions, budgets and finance items on this device will be removed. Export a backup first if you need it.', 'Erase', () => { try { localStorage.removeItem(S.demo ? K_DEMO : K_DATA); } catch (e) { } loadData(); ui.pStart = null; refresh(); toast('Done'); }),
  'welcome-go': el => {
    const it = itemOf(el), s = it.state; S.name = (s.name || '').trim(); if (CURS[s.cur]) S.cur = s.cur;
    const days = [num(s.p1), num(s.p2)].filter(n => n >= 1 && n <= 28).map(Math.round); S.payDays = days.length ? days : [1];
    S.onboarded = true; S.demo = !!el.dataset.demo; saveSettings(); loadData(); ui.pStart = null; closeItem(it); refresh();
  }
};
function openForm(title, fields, vals, onSave, onDelete) {
  openLayer({
    kind: 'sheet', state: { ...vals }, onSave, render: it => `<div class="sheet-head"><h2>${esc(title)}</h2><button class="circle sm" data-act="close" aria-label="Close">${ic('x')}</button></div><div class="fields">${fields.map(f => fieldHtml(f, it.state[f.key])).join('')}</div><div class="btn-row">${onDelete ? '<button class="btn danger" data-act="form-del">Delete</button>' : ''}<button class="btn primary" data-act="form-save">Save</button></div>`, onDelete
  });
}
ACT['form-save'] = el => { const it = itemOf(el); const r = it.onSave(it.state); if (r !== false) closeItem(it); };
ACT['form-del'] = el => { const it = itemOf(el); if (it.onDelete() !== false) closeItem(it); };
function openAcct(id) {
  const a = id ? D.accounts.find(x => x.id === id) : null;
  openForm(a ? 'Edit account' : 'New account', [{ key: 'name', label: 'Account name', type: 'text', ph: 'e.g. Savings' }, { key: 'open', label: 'Opening balance', type: 'number' }, { key: 'hidden', label: 'Visibility', type: 'select', options: [['no', 'Visible'], ['yes', 'Hidden']] }], { name: a ? a.name : '', open: a ? (a.open || '') : '', hidden: a && a.hidden ? 'yes' : 'no' }, s => {
    const name = (s.name || '').trim(); if (!name) { toast('Enter a name'); return false; }
    if (a) { a.name = name; a.open = num(s.open); a.hidden = s.hidden === 'yes'; } else D.accounts.push({ id: uid(), name, open: num(s.open), hidden: s.hidden === 'yes' });
    commit();
  }, a && D.accounts.length > 1 ? () => { if (D.tx.some(t => t.acct === a.id || t.to === a.id)) { toast('It has transactions — hide it instead'); return false; } D.accounts = D.accounts.filter(x => x.id !== a.id); commit(); } : null);
}
function openPayDay(i) {
  const pd = payDays(), edit = i >= 0;
  openForm(edit ? 'Edit pay day' : 'Add pay day', [{ key: 'd', label: 'Day of the month (1–28)', type: 'number' }], { d: edit ? pd[i] : '' }, s => {
    const n = Math.round(num(s.d)); if (n < 1 || n > 28) { toast('Enter a day between 1 and 28'); return false; }
    const a = pd.slice(); if (edit) a[i] = n; else a.push(n); S.payDays = [...new Set(a)].sort((x, y) => x - y); saveSettings(); ui.pStart = null; refresh();
  }, edit && pd.length > 1 ? () => { S.payDays = pd.filter((_, j) => j !== i); saveSettings(); ui.pStart = null; refresh(); } : null);
}

/* ---------- event wiring ---------- */
document.addEventListener('click', e => { const t = e.target.closest('[data-act]'); if (!t) return; const h = ACT[t.dataset.act]; if (h) h(t, e); });
function onField(e) { const t = e.target; if (!t.name) return; const it = itemOf(t); if (it) it.state[t.name] = t.value; }
const INP = {
  q: el => { ui.q = el.value; const r = $('#recent'); if (r) r.innerHTML = recentInner(); },
  sq: el => { ui.sq = el.value; const b = $('#sbody'); if (b) b.innerHTML = sheetInner(); }
};
const CHG = {
  range: el => { ui.range = el.value; ui.day = ''; refresh(); },
  cur: el => { S.cur = el.value; saveSettings(); if (S.demo) { localStorage.removeItem(K_DEMO); loadData(); } refresh(); }
};
document.addEventListener('input', e => { onField(e); const f = e.target.dataset && e.target.dataset.input; if (f && INP[f]) INP[f](e.target); });
document.addEventListener('change', e => { onField(e); const f = e.target.dataset && e.target.dataset.change; if (f && CHG[f]) CHG[f](e.target); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && stack.length) closeItem(stack[stack.length - 1]); });
matchMedia('(prefers-color-scheme: dark)').addEventListener && matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (S.theme === 'auto') applyTheme(); });

/* ---------- boot ---------- */
loadData(); applyTheme(); render();
if (!S.onboarded) openWelcome();
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => { });
