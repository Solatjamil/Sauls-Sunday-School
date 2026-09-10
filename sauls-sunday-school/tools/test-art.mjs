/* Every piece of art the app can be asked to draw, validated as XML.
   Cheap to run, and it catches a broken motif before a child does. */
import { createRequire } from 'node:module';
import path from 'node:path';
import { JSDOM } from 'jsdom';
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const A = require(path.join(root, 'js/core/art.js'));
const M = require(path.join(root, 'js/data/meta.js'));
const L = require(path.join(root, 'js/core/logic.js'));
const units = ['units-1', 'units-2', 'units-3', 'units-4', 'units-5', 'units-6'].flatMap((f) => require(path.join(root, 'js/data', f + '.js')));
const dp = new (new JSDOM('').window.DOMParser)();

let checked = 0, bad = [];
function valid(name, svg) {
  checked++;
  if (typeof svg !== 'string' || !svg.startsWith('<svg')) { bad.push(name + ': not svg'); return; }
  if (/NaN|undefined|null/.test(svg)) { bad.push(name + ': contains ' + (svg.match(/NaN|undefined|null/) || [])[0]); return; }
  const doc = dp.parseFromString(svg, 'image/svg+xml');
  const err = doc.querySelector('parsererror');
  if (err) bad.push(name + ': ' + err.textContent.replace(/\s+/g, ' ').slice(0, 90));
}

const skins = ['young', 'mid', 'old'];
for (const s of skins) valid('logo ' + s, A.logo(s));
const compKeys = Object.keys(A.COMPANIONS || {});
const compTypes = compKeys.length ? compKeys : Object.keys(require(path.join(root, 'js/core/logic.js')).COMPANIONS);
for (const t of compTypes) for (const st of [0, 1, 2, 3, 4]) for (const s of skins) valid(`companion ${t}${st}/${s}`, A.companion(t, st, { skin: s }));

const motifKeys = new Set(Object.keys(A.MOTIF));   // every drawing the library can make
units.forEach((u) => {
  motifKeys.add(u.badge && u.badge.art);
  motifKeys.add(u.printable && u.printable.motif);
});
Object.keys(M.TRACKS).forEach((k) => motifKeys.add(M.TRACKS[k].art));
Object.keys(M.BADGE_ART || {}).forEach((k) => motifKeys.add(k));
motifKeys.add('scroll');
for (const k of motifKeys) {
  if (!k) continue;
  for (const s of skins) valid(`motif ${k}/${s}`, A.motif(k, { skin: s }));
  valid(`motif ${k} disk`, A.motif(k, { skin: 'mid', disk: false, scale: 1.4 }));
  valid(`colouring ${k}`, A.colouringPage(k, { title: 'Colour the story', prompts: ['one', 'two', 'three'] }));
}
// an unknown key must still draw something (an old cached profile could name anything)
valid('motif ??? unknown', A.motif('no-such-thing', { skin: 'mid' }));
valid('companion ??? unknown', A.companion('nope', 9, { skin: 'mid' }));
for (const rid of L.REACTIONS) valid('reaction ' + rid, A.reaction(rid, {}));
valid('bars', A.bars([{ label: 'a', v: 2 }, { label: 'b', v: 7 }], { w: 320, h: 120 }));
valid('bars empty', A.bars([], {}));
valid('donut', A.donut(37, { color: '#f00' }));
valid('donut 0', A.donut(0, {}));
valid('donut 100', A.donut(100, {}));
valid('spark', A.spark([1, 4, 2, 9], {}));
valid('ring', A.ring(55, {}));
const slots = {}; for (let i = 0; i < 12; i++) slots['s' + i] = i < 3 ? units[i].id : null;
valid('garden', A.garden(slots, { skin: 'young' }));

if (bad.length) { console.log('art failures:\n  ' + bad.join('\n  ')); }
console.log('art tests: ' + (checked - bad.length) + '/' + checked + ' drawings valid');
process.exit(bad.length ? 1 : 0);
