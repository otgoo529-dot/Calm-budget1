'use strict';
/* =========================================================
   data.js — utilities, state, periods, stats, demo data, CSV
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
const num = v => { const n = parseFloat(String(v ?? '').replace(/[,\s]/g, '')); return isFinite(n) ? n : 0; };

/* ---------- dates (local, ISO yyyy-mm-dd) ---------- */
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d, 12); };
const todayISO = () => iso(new Date());
const dim = (y, m) => new Date(y, m + 1, 0).getDate();
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_L = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW_L = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
const addMonths = (s, n) => { const d = parse(s); const day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth() + n); d.setDate(Math.min(day, dim(d.getFullYear(), d.getMonth()))); return iso(d); };
const diffDays = (a, b) => Math.round((parse(a) - parse(b)) / 864e5);
const fmtDate = (s, y) => { if (!s) return ''; const d = parse(s); return `${MONTHS[d.getMonth()]} ${d.getDate()}` + (y ? `, ${d.getFullYear()}` : ''); };
const mondayOf = s => { const d = parse(s); const k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return iso(d); };

/* ---------- currency ---------- */
const CURS = { MNT: ['₮', 0, 1], USD: ['$', 2, 1 / 3400], EUR: ['€', 2, .92 / 3400], GBP: ['£', 2, .78 / 3400], JPY: ['¥', 0, 150 / 3400], KRW: ['₩', 0, 1400 / 3400], CNY: ['CN¥', 2, 7.2 / 3400], RUB: ['₽', 2, 90 / 3400], INR: ['₹', 2, 83 / 3400], PHP: ['₱', 2, 56 / 3400], AUD: ['A$', 2, 1.5 / 3400], CAD: ['C$', 2, 1.37 / 3400], TRY: ['₺', 2, 32 / 3400] };
const curInfo = () => CURS[S.cur] || CURS.MNT;
const decs = () => curInfo()[1];
function money(n, sign) {
  const d = decs(); const a = Math.abs(n); const r = Math.round(a * 10 ** d) / 10 ** d;
  const s = r.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  return (n < 0 && r > 0 ? '-' : sign && n > 0 ? '+' : '') + curInfo()[0] + s;
}
function compact(n) {
  const a = Math.abs(n);
  if (a >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (a >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (a >= 1e3) return (n / 1e3).toFixed(a >= 1e4 ? 0 : 1).replace(/\.0$/, '') + 'k';
  return String(Math.round(n));
}

/* ---------- constants ---------- */
const GROUPS = [
  { id: 'income', name: 'Income', cssv: '--g-income' },
  { id: 'fixed', name: 'Fixed expenses', cssv: '--g-fixed' },
  { id: 'loans', name: 'Loans', cssv: '--g-loans' },
  { id: 'savings', name: 'Savings', cssv: '--g-savings' },
  { id: 'spending', name: 'Spending', cssv: '--g-spending' }
];
const GNAME = Object.fromEntries(GROUPS.map(g => [g.id, g.name]));
const PALETTE = ['#8E94D9', '#F2C94C', '#F08A7E', '#7CC6A4', '#6FB1E0', '#F4A97B', '#D98BB4', '#A7A0E8', '#9BB86E', '#C9A27E'];

/* ---------- storage ---------- */
const K_SET = 'ppb.settings.v1', K_DATA = 'ppb.data.v1', K_DEMO = 'ppb.demo.v1';
let S = loadSettings();
let D = null;

function defaultSettings() { return { name: '', cur: 'MNT', payDays: [11, 25], theme: 'auto', lastBackup: null, demo: false, onboarded: false }; }
function loadSettings() { try { return { ...defaultSettings(), ...(JSON.parse(localStorage.getItem(K_SET)) || {}) }; } catch (e) { return defaultSettings(); } }
function saveSettings() { try { localStorage.setItem(K_SET, JSON.stringify(S)); } catch (e) { } }
function defaultCats() {
  const c = (id, name, group) => ({ id, name, group, parent: null, budget: 0, when: 'all', hidden: false });
  return [
    c('salary', 'Salary', 'income'), c('other-income', 'Other income', 'income'),
    c('rent', 'Rent', 'fixed'), c('utilities', 'Utilities', 'fixed'), c('phone', 'Phone', 'fixed'), c('insurance', 'Insurance', 'fixed'),
    c('loan', 'Loan payment', 'loans'),
    c('emergency', 'Emergency fund', 'savings'),
    c('groceries', 'Groceries', 'spending'), c('dining', 'Dining out', 'spending'), c('transport', 'Transport', 'spending'),
    c('leisure', 'Leisure', 'spending'), c('health', 'Health', 'spending'), c('other', 'Other', 'spending'), c('fees', 'Fees', 'spending')
  ];
}
function defaultData() {
  return { startBalance: 0, accounts: [{ id: 'bank', name: 'Bank account', open: 0, hidden: false }, { id: 'cash', name: 'Cash', open: 0, hidden: false }], cats: defaultCats(), tx: [], periodBudgets: {}, bills: [], goals: [], debts: [], cards: [], owed: [], invoices: [], recurring: [] };
}
function loadData() {
  const key = S.demo ? K_DEMO : K_DATA;
  let d = null;
  try { d = JSON.parse(localStorage.getItem(key)); } catch (e) { }
  if (!d || !Array.isArray(d.tx)) d = S.demo ? buildDemo() : defaultData();
  D = { ...defaultData(), ...migrate(d) };
  if (S.demo && !localStorage.getItem(key)) saveData();
}
function migrate(d) {
  d.tx = d.tx || []; d.cats = d.cats || defaultCats();
  if (!Array.isArray(d.accounts) || !d.accounts.length) { d.accounts = [{ id: 'bank', name: 'Bank account', open: d.startBalance || 0, hidden: false }, { id: 'cash', name: 'Cash', open: 0, hidden: false }]; d.startBalance = 0; }
  if (!d.cats.some(c => c.id === 'fees')) d.cats.push({ id: 'fees', name: 'Fees', group: 'spending', parent: null, budget: 0, when: 'all', hidden: false });
  const a0 = d.accounts[0].id; d.tx.forEach(t => { if (!t.acct) t.acct = a0; });
  return d;
}
function saveData() { try { localStorage.setItem(S.demo ? K_DEMO : K_DATA, JSON.stringify(D)); } catch (e) { } }

/* ---------- categories ---------- */
const cat = id => D.cats.find(c => c.id === id);
const root = c => (c && c.parent ? cat(c.parent) || c : c);
const subsOf = id => D.cats.filter(c => c.parent === id);
const catGroup = id => { const c = cat(id); return c ? root(c).group : 'spending'; };
const isInc = t => catGroup(t.cat) === 'income';
const isTr = t => t.type === 'transfer';
const effAmt = t => isTr(t) ? (t.fee || 0) : isInc(t) ? t.amount - (t.fee || 0) : t.amount + (t.fee || 0);
const acctName = id => { const a = D.accounts.find(x => x.id === id); return a ? a.name : ''; };
function acctBalance(a, upto) {
  let b = a.open || 0;
  D.tx.forEach(t => {
    if (upto && t.date > upto) return; const fee = t.fee || 0;
    if (isTr(t)) { if (t.acct === a.id) b -= t.amount + fee; if (t.to === a.id) b += t.amount; }
    else if (t.acct === a.id) b += isInc(t) ? t.amount - fee : -(t.amount + fee);
  });
  return b;
}
const totalBalance = () => D.accounts.filter(a => !a.hidden).reduce((s, a) => s + acctBalance(a, todayISO()), 0);
const catColor = id => { const c0 = cat(id); if (c0 && c0.color) return c0.color; const r = root(c0); if (r && r.color) return r.color; if (!r) return '#B8BCEB'; let h = 0; for (const ch of r.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return PALETTE[h % PALETTE.length]; };
const catPath = id => { const c = cat(id); if (!c) return 'Uncategorized'; return c.parent ? `${root(c).name} › ${c.name}` : c.name; };

/* ---------- pay periods ---------- */
function payDays() {
  const a = [...new Set((S.payDays || []).map(n => Math.min(28, Math.max(1, Math.round(+n) || 1))))].sort((x, y) => x - y);
  return a.length ? a : [1];
}
function periodFor(dateISO) {
  const d = parse(dateISO), pd = payDays(), cands = [];
  for (let k = -1; k <= 2; k++) {
    const dt = new Date(d.getFullYear(), d.getMonth() + k, 1, 12); const y = dt.getFullYear(), m = dt.getMonth();
    pd.forEach((day, idx) => cands.push({ start: iso(new Date(y, m, Math.min(day, dim(y, m)), 12)), idx }));
  }
  cands.sort((a, b) => (a.start < b.start ? -1 : 1));
  let i = 0; cands.forEach((c, j) => { if (c.start <= dateISO) i = j; });
  return { start: cands[i].start, idx: cands[i].idx, end: addDays(cands[i + 1].start, -1) };
}
const prevPeriod = p => periodFor(addDays(p.start, -1));
const nextPeriod = p => periodFor(addDays(p.end, 1));
const periodLabel = p => `${fmtDate(p.start)} – ${fmtDate(p.end)}`;

function budgetFor(c, p) {
  const o = D.periodBudgets[p.start] && D.periodBudgets[p.start][c.id];
  if (o != null) return o;
  if (c.when !== 'all' && c.when !== p.idx) return 0;
  return c.budget || 0;
}
function stats(p) {
  const tx = D.tx.filter(t => t.date >= p.start && t.date <= p.end);
  const own = {}, g = { income: 0, fixed: 0, loans: 0, savings: 0, spending: 0 }, bud = { income: 0, fixed: 0, loans: 0, savings: 0, spending: 0 };
  tx.forEach(t => { const e = effAmt(t); own[t.cat] = (own[t.cat] || 0) + e; g[catGroup(t.cat)] += e; });
  D.cats.filter(c => !c.parent && !c.hidden).forEach(c => { bud[c.group] += budgetFor(c, p); });
  let opening = D.accounts.reduce((s, a) => s + (a.open || 0), 0);
  D.tx.forEach(t => { if (t.date < p.start) opening += isInc(t) ? effAmt(t) : -effAmt(t); });
  const out = g.fixed + g.loans + g.savings + g.spending;
  const outBud = bud.fixed + bud.loans + bud.savings + bud.spending;
  return { tx, own, g, bud, opening, out, outBud, closing: opening + g.income - out };
}
const catTotal = (id, st) => (st.own[id] || 0) + subsOf(id).reduce((s, c) => s + (st.own[c.id] || 0), 0);

/* ---------- ranges ---------- */
function rangeOf(key, pSel) {
  const t = todayISO();
  if (key === 'period') return pSel;
  if (key === 'prev') return prevPeriod(pSel);
  const d = parse(t);
  if (key === 'month') return { start: iso(new Date(d.getFullYear(), d.getMonth(), 1, 12)), end: iso(new Date(d.getFullYear(), d.getMonth() + 1, 0, 12)) };
  if (key === 'lastmonth') return { start: iso(new Date(d.getFullYear(), d.getMonth() - 1, 1, 12)), end: iso(new Date(d.getFullYear(), d.getMonth(), 0, 12)) };
  return { start: '0000-01-01', end: '9999-12-31' };
}

/* ---------- mutations ---------- */
function addTx(t) { D.tx.push({ id: uid(), ts: Date.now(), ...t }); }

/* ---------- demo data ---------- */
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function buildDemo() {
  const sc = (CURS[S.cur] || CURS.MNT)[2], dec = (CURS[S.cur] || CURS.MNT)[1];
  const R = n => {
    let v = n * sc;
    if (v >= 100) { const m = 10 ** (Math.floor(Math.log10(v)) - 2); return Math.round(v / m) * m; }
    if (v >= 10) return Math.round(v);
    return dec ? Math.round(v * 4) / 4 : Math.max(1, Math.round(v));
  };
  const d = defaultData();
  const set = (id, budget, when = 'all') => { const c = d.cats.find(x => x.id === id); c.budget = R(budget); c.when = when; };
  set('salary', 1850000); set('rent', 480000, 0); set('insurance', 70000, 0); set('utilities', 160000, 1); set('phone', 45000, 1);
  set('loan', 180000); set('emergency', 150000); set('groceries', 380000); set('dining', 180000); set('transport', 140000);
  set('leisure', 120000); set('health', 90000); set('other', 60000);
  const sub = (id, name, parent) => d.cats.push({ id, name, group: d.cats.find(c => c.id === parent).group, parent, budget: 0, when: 'all', hidden: false });
  sub('cafe', 'Cafe', 'dining'); sub('delivery', 'Delivery', 'dining'); sub('fuel', 'Fuel', 'transport'); sub('taxi', 'Taxi', 'transport'); sub('movies', 'Movies', 'leisure');
  d.startBalance = 0; d.accounts[0].open = R(1200000); d.accounts[1].open = R(150000);
  const today = todayISO();
  let p = periodFor(today); for (let i = 0; i < 4; i++) p = prevPeriod(p);
  const salaries = [1850000, 1920000, 1780000, 1850000, 1900000];
  const picks = [['groceries', 'Weekly groceries', 25000, 70000], ['cafe', 'Coffee', 6000, 14000], ['delivery', 'Dinner delivery', 15000, 35000], ['fuel', 'Fuel', 40000, 80000], ['taxi', 'Taxi ride', 5000, 15000], ['movies', 'Movie night', 25000, 45000], ['health', 'Pharmacy', 20000, 50000], ['other', 'Small gift', 5000, 25000], ['groceries', 'Groceries', 20000, 55000], ['cafe', 'Lunch', 9000, 22000]];
  for (let k = 0; k < 5; k++) {
    const rnd = mulberry(parseInt(p.start.replace(/-/g, ''), 10));
    const put = (off, c, amt, note, acct = 'bank', fee = 0) => { const dt = addDays(p.start, off); if (dt <= today && dt <= p.end) { const t = { id: uid(), ts: Date.parse(dt) + off, date: dt, amount: R(amt), cat: c, note, acct }; if (fee) t.fee = R(fee); d.tx.push(t); } };
    const putT = (off, amt, fee, note) => { const dt = addDays(p.start, off); if (dt <= today && dt <= p.end) d.tx.push({ id: uid(), ts: Date.parse(dt) + off + 1, date: dt, type: 'transfer', acct: 'bank', to: 'cash', amount: R(amt), fee: R(fee), cat: 'fees', note }); };
    put(0, 'salary', salaries[k], 'Salary');
    if (p.idx === 0) { put(1, 'rent', 480000, 'Rent'); put(3, 'insurance', 70000, 'Insurance'); }
    else { put(2, 'utilities', 150000 + Math.round(rnd() * 20000), 'Utilities'); put(4, 'phone', 45000, 'Phone plan'); }
    put(2, 'loan', 180000, 'Loan payment', 'bank', 500); putT(3, 250000, 1500, 'ATM withdrawal'); put(1, 'emergency', 150000, 'Emergency fund');
    const span = Math.max(1, diffDays(p.end, p.start));
    for (let i = 0; i < 14; i++) { const pk = picks[Math.floor(rnd() * picks.length)]; put(Math.floor(rnd() * (span + 1)), pk[0], pk[2] + rnd() * (pk[3] - pk[2]), pk[1], rnd() < .25 ? 'cash' : 'bank'); }
    p = nextPeriod(p);
  }
  const cur = periodFor(today), nx = nextPeriod(cur).start;
  d.periodBudgets[cur.start] = {}; // demo: show a period where income differs from default
  d.periodBudgets[cur.start].salary = R(1920000);
  d.bills = [
    { id: uid(), name: 'Internet', amount: R(55000), due: addDays(today, 2), repeat: 'monthly', cat: 'utilities', paid: false },
    { id: uid(), name: 'Phone plan', amount: R(45000), due: addDays(today, 3), repeat: 'monthly', cat: 'phone', paid: false },
    { id: uid(), name: 'Streaming', amount: R(18000), due: addDays(today, 5), repeat: 'monthly', cat: 'leisure', paid: false },
    { id: uid(), name: 'Rent', amount: R(480000), due: addDays(today, 12), repeat: 'monthly', cat: 'rent', paid: false },
    { id: uid(), name: 'Insurance', amount: R(70000), due: addDays(today, 20), repeat: 'monthly', cat: 'insurance', paid: false }
  ];
  d.goals = [
    { id: uid(), name: 'Emergency fund', target: R(6000000), saved: R(3720000) },
    { id: uid(), name: 'Vacation', target: R(3000000), saved: R(1140000) },
    { id: uid(), name: 'New laptop', target: R(2500000), saved: R(1000000) }
  ];
  d.debts = [{ id: uid(), name: 'Car loan', total: R(24000000), paid: R(8640000), payment: R(450000), next: addDays(today, 12) }];
  d.cards = [
    { id: uid(), name: 'Everyday Card', limit: R(4000000), used: R(1650000), due: R(320000), dueDate: addDays(today, 10) },
    { id: uid(), name: 'Travel Card', limit: R(2000000), used: R(540000), due: R(90000), dueDate: addDays(today, 16) }
  ];
  d.owed = [
    { id: uid(), person: 'Alex', note: 'Lunch', amount: R(25000), due: '', settled: false },
    { id: uid(), person: 'Sam', note: 'Trip split', amount: R(150000), due: addDays(today, 6), settled: false }
  ];
  d.invoices = [
    { id: uid(), client: 'Studio North', number: 'INV-014', amount: R(900000), date: addDays(today, -10), paid: false },
    { id: uid(), client: 'Bright Co', number: 'INV-013', amount: R(600000), date: addDays(today, -40), paid: true }
  ];
  d.recurring = [
    { id: uid(), name: 'Salary', kind: 'income', amount: R(1850000), freq: 'semi-monthly', next: nx, cat: 'salary' },
    { id: uid(), name: 'Gym', kind: 'expense', amount: R(60000), freq: 'monthly', next: addDays(today, 9), cat: 'health' },
    { id: uid(), name: 'Streaming', kind: 'expense', amount: R(18000), freq: 'monthly', next: addDays(today, 5), cat: 'leisure' }
  ];
  return d;
}

/* ---------- CSV ---------- */
const csvCell = v => { v = String(v ?? ''); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
function txToCSV(list) {
  const rows = [['Date', 'Type', 'Group', 'Category', 'Subcategory', 'Amount', 'Fee', 'Account', 'To account', 'Note']];
  list.forEach(t => {
    if (isTr(t)) { rows.push([t.date, 'Transfer', '', 'Transfer', '', t.amount, t.fee || 0, acctName(t.acct), acctName(t.to), t.note || '']); return; }
    const c = cat(t.cat); const r = root(c);
    rows.push([t.date, isInc(t) ? 'Income' : 'Expense', GNAME[catGroup(t.cat)], r ? r.name : '', c && c.parent ? c.name : '', t.amount, t.fee || 0, acctName(t.acct), '', t.note || '']);
  });
  return rows.map(r => r.map(csvCell).join(',')).join('\r\n');
}
function parseCSV(text) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += ch; }
    else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cur); cur = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && text[i + 1] === '\n') i++; row.push(cur); cur = ''; if (row.some(x => x !== '')) rows.push(row); row = []; }
    else cur += ch;
  }
  row.push(cur); if (row.some(x => x !== '')) rows.push(row);
  return rows;
}
function importCSV(text) {
  const rows = parseCSV(text.replace(/^\uFEFF/, '')); if (rows.length < 2) throw new Error('Empty file');
  const h = rows[0].map(x => x.trim().toLowerCase()); const ix = n => h.indexOf(n);
  const iD = ix('date'), iA = ix('amount'); if (iD < 0 || iA < 0) throw new Error('Missing Date / Amount columns');
  const iT = ix('type'), iG = ix('group'), iC = ix('category'), iS = ix('subcategory'), iN = ix('note'), iF = ix('fee'), iAc = ix('account'), iTo = ix('to account');
  const findAcct = name => { name = (name || '').trim(); if (!name) return D.accounts[0].id; let a = D.accounts.find(x => x.name.toLowerCase() === name.toLowerCase()); if (!a) { a = { id: uid(), name, open: 0, hidden: false }; D.accounts.push(a); } return a.id; };
  let n = 0;
  rows.slice(1).forEach(r => {
    const date = (r[iD] || '').trim(); const amt = Math.abs(num(r[iA])); if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !amt) return;
    const fee = iF >= 0 ? Math.abs(num(r[iF])) : 0, acct = findAcct(iAc >= 0 ? r[iAc] : ''), note = iN >= 0 ? r[iN] : '';
    if (iT >= 0 && /transfer/i.test(r[iT])) { D.tx.push({ id: uid(), ts: Date.now() + n, date, type: 'transfer', acct, to: findAcct(iTo >= 0 ? r[iTo] : ''), amount: amt, fee, cat: 'fees', note }); n++; return; }
    const inc = iT >= 0 && /income/i.test(r[iT]);
    const gName = iG >= 0 ? r[iG].trim().toLowerCase() : '';
    const gid = (GROUPS.find(g => g.name.toLowerCase() === gName) || {}).id || (inc ? 'income' : 'spending');
    const cn = (iC >= 0 ? r[iC] : '').trim() || (inc ? 'Other income' : 'Other');
    let c = D.cats.find(x => !x.parent && x.name.toLowerCase() === cn.toLowerCase());
    if (!c) { c = { id: uid(), name: cn, group: gid, parent: null, budget: 0, when: 'all', hidden: false }; D.cats.push(c); }
    const sn = (iS >= 0 ? r[iS] : '').trim(); let target = c;
    if (sn) { let s = D.cats.find(x => x.parent === c.id && x.name.toLowerCase() === sn.toLowerCase()); if (!s) { s = { id: uid(), name: sn, group: c.group, parent: c.id, budget: 0, when: 'all', hidden: false }; D.cats.push(s); } target = s; }
    D.tx.push({ id: uid(), ts: Date.now() + n, date, amount: amt, cat: target.id, note, acct, fee }); n++;
  });
  return n;
}
