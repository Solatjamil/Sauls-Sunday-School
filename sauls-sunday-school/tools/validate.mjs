/* Curriculum validator: loads every data file the app ships and checks
   it against the same rules the runtime uses. Run: node tools/validate.mjs */
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');

const L = require(path.join(root, 'js/core/logic.js'));
const M = require(path.join(root, 'js/data/meta.js'));
const files = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6'];
let units = [];
for (const f of files) {
  try { units = units.concat(require(path.join(root, 'js/data', f + '.js'))); }
  catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; console.log('  (skip, not written yet: ' + f + ')'); }
}
// One source of truth: whatever js/core/art.js can actually draw. A hand-kept
// copy of that list is how a valid motif looks broken.
const A = require(path.join(root, 'js/core/art.js'));
const artList = Object.keys(A.MOTIF).concat(Object.keys(L.COMPANIONS));
const errs = [];
const ids = new Set(), paths = { L: [], M: [], H: [] };
for (const u of units) {
  errs.push(...L.validateUnit(u, { artList }));
  if (ids.has(u.id)) errs.push('duplicate id ' + u.id);
  ids.add(u.id);
  (paths[u.tier] || (paths[u.tier] = [])).push(u.path);
  if (!M.TRACKS[u.track]) errs.push(u.id + ': unknown track ' + u.track);
  if (!M.ERAS.find((e) => e.id === u.era)) errs.push(u.id + ': unknown era ' + u.era);
  if (!['ot', 'nt'].includes(u.testament)) errs.push(u.id + ': bad testament');
  if (typeof u.when !== 'number') errs.push(u.id + ': missing chronological when');
  if (!L.quizTypesForTier(u.tier).includes('order')) {} // no-op guard
  for (const q of u.quiz || []) {
    if ((q.t === 'mc' || q.t === 'tap') && q.hint === undefined && u.tier !== 'H') { /* hints optional in H */ }
    if (q.t === 'match' && q.pairs) {
      const right = new Set(q.pairs.map((p) => p[1]));
      if (right.size !== q.pairs.length) errs.push(u.id + ': match has duplicate right sides');
    }
  }
  if (u.mature && u.tier === 'L') errs.push(u.id + ': mature in L tier is forbidden');
  if (u.tier === 'L' && !u.gentle && /(died|death|killed|blood)/i.test((u.story || []).join(' '))) {
    errs.push(u.id + ': L tier story contains death/violence vocabulary');
  }
}
for (const [t, arr] of Object.entries(paths)) {
  if (!arr || !arr.length) continue;
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) if (arr[i] !== i + 1) { errs.push(`tier ${t}: path not contiguous at ${arr[i]} (expected ${i + 1})`); break; }
}
const matureBlocked = units.filter((u) => u.mature);
console.log('units loaded :', units.length);
console.log('by tier      :', ['L', 'M', 'H'].map((t) => t + '=' + units.filter((u) => u.tier === t).length).join('  '));
console.log('mature-gated :', matureBlocked.length, '(must be invisible to tier L)');
console.log('quiz items   :', units.reduce((a, u) => a + (u.quiz || []).length, 0));
console.log('story words  :', units.reduce((a, u) => a + (u.story || []).join(' ').split(/\s+/).filter(Boolean).length, 0));
console.log('validation   :', errs.length ? errs.length + ' problem(s)' : 'all units pass');
if (errs.length) { for (const e of errs.slice(0, 40)) console.log(' - ' + e); process.exit(1); }
