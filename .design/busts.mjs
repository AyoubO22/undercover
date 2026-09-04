import fs from 'fs';
global.document = { createElement: () => ({ getContext: () => ({}) }) };
const src = fs.readFileSync(new URL('../portfolio/js/portraits.js', import.meta.url), 'utf8');
const PORTRAITS = eval(src + ';PORTRAITS');
const L = 40, H = 48;

// même règle d'éclairage que le rendu du site
const teinte = (g, x, y, mat) => {
  const vide = (xx, yy) => xx < 0 || yy < 0 || xx >= L || yy >= H || !g[yy][xx];
  if (vide(x, y - 1)) return mat[2];
  if (vide(x + 1, y)) return mat[2];
  if (vide(x - 1, y)) return mat[0];
  if (vide(x, y + 1)) return mat[0];
  return mat[1];
};

// fusionne les pixels voisins de même couleur en un seul rect
const svg = (seed, { crop = 0 } = {}) => {
  const m = PORTRAITS.construire(seed);
  const g = m.grille;
  const parts = [];
  for (let y = crop; y < H; y++) {
    let x = 0;
    while (x < L) {
      const c = g[y][x];
      if (!c) { x++; continue; }
      const col = c.c || teinte(g, x, y, c.m);
      let w = 1;
      while (x + w < L) {
        const n = g[y][x + w];
        if (!n) break;
        const nc = n.c || teinte(g, x + w, y, n.m);
        if (nc !== col) break;
        w++;
      }
      parts.push(`<rect x="${x}" y="${y - crop}" width="${w}" height="1" fill="${col}"/>`);
      x += w;
    }
  }
  return `<svg viewBox="0 0 ${L} ${H - crop}" width="100%" height="100%" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`;
};

const graines = {
  gameboxd: 51027, pokemon: 25025, crm: 8801, corplol: 4400,
  eylen: 6031, sanzo: 15948, recrutement: 7212, undercover: 1337,
  inspecteur: 2026, contact: 777,
};
const out = {};
for (const [k, v] of Object.entries(graines)) out[k] = svg(v);
fs.writeFileSync(new URL('./busts.json', import.meta.url), JSON.stringify(out));
console.log(Object.entries(out).map(([k, v]) => `${k.padEnd(12)} ${v.length} car.`).join('\n'));
