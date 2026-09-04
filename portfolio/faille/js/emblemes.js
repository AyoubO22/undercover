// ============================================================
//  LA FAILLE — EMBLÈMES
//  Sceau hexagonal généré depuis une graine : anneaux angulaires,
//  entailles et glyphe central. Aucune image.
// ============================================================

const EMBLEMES = (() => {
  "use strict";

  const OR = "#c8aa6e", OR_CLAIR = "#f0e6d2", OR_SOMBRE = "#785a28";
  const TEAL = "#0397ab", TEAL_CLAIR = "#0ac8b9";

  const rng = (g) => {
    let a = (g >>> 0) || 1;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const n = (v) => Math.round(v * 100) / 100;
  const hexa = (r, rot = 0) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = (rot + i * 60) * Math.PI / 180;
      pts.push(`${n(50 + r * Math.cos(a))},${n(50 + r * Math.sin(a))}`);
    }
    return pts.join(" ");
  };

  const GLYPHES = [
    (r) => `<polygon points="${hexa(r, 30)}"/>`,
    (r) => `<path d="M50 ${n(50 - r)} L${n(50 + r * .87)} ${n(50 + r * .5)} L${n(50 - r * .87)} ${n(50 + r * .5)} Z"/>`,
    (r) => `<path d="M50 ${n(50 - r)} L${n(50 + r * .7)} 50 L50 ${n(50 + r)} L${n(50 - r * .7)} 50 Z"/>`,
    (r) => `<path d="M${n(50 - r)} ${n(50 - r * .5)} L50 ${n(50 - r)} L${n(50 + r)} ${n(50 - r * .5)} M${n(50 - r)} ${n(50 + r * .2)} L50 ${n(50 - r * .3)} L${n(50 + r)} ${n(50 + r * .2)}"/>`,
    (r) => `<path d="M50 ${n(50 - r)} L50 ${n(50 + r)} M${n(50 - r * .8)} ${n(50 - r * .3)} L${n(50 + r * .8)} ${n(50 - r * .3)}"/>`,
    (r) => `<circle cx="50" cy="50" r="${n(r * .7)}"/><path d="M50 ${n(50 - r)} L50 ${n(50 - r * .7)} M50 ${n(50 + r * .7)} L50 ${n(50 + r)} M${n(50 - r)} 50 L${n(50 - r * .7)} 50 M${n(50 + r * .7)} 50 L${n(50 + r)} 50"/>`,
  ];

  /** SVG de l'emblème. @param {number} graine @param {boolean} grand */
  const dessiner = (graine, grand) => {
    const r = rng(graine);
    const rot = Math.floor(r() * 2) * 30;
    const glyphe = GLYPHES[Math.floor(r() * GLYPHES.length)];
    const entailles = 3 + Math.floor(r() * 4);
    const teal = r() < 0.5;

    let p = "";
    // anneaux hexagonaux
    p += `<polygon points="${hexa(46, rot)}" fill="none" stroke="${OR_SOMBRE}" stroke-width="1.4"/>`;
    p += `<polygon points="${hexa(41, rot)}" fill="none" stroke="${OR}" stroke-width="1"/>`;
    if (grand) p += `<polygon points="${hexa(48.5, rot)}" fill="none" stroke="${OR_SOMBRE}" stroke-width=".6" stroke-dasharray="2 4"/>`;

    // entailles sur l'anneau
    for (let i = 0; i < entailles; i++) {
      const a = (rot + (360 / entailles) * i + 30) * Math.PI / 180;
      const x1 = 50 + 41 * Math.cos(a), y1 = 50 + 41 * Math.sin(a);
      const x2 = 50 + 47 * Math.cos(a), y2 = 50 + 47 * Math.sin(a);
      p += `<path d="M${n(x1)} ${n(y1)} L${n(x2)} ${n(y2)}" stroke="${teal ? TEAL : OR}" stroke-width="2.2" opacity=".9"/>`;
    }

    // noyau
    p += `<polygon points="${hexa(28, rot + 30)}" fill="rgba(3,151,171,.10)" stroke="${OR_SOMBRE}" stroke-width=".8"/>`;
    p += `<g fill="none" stroke="${teal ? TEAL_CLAIR : OR_CLAIR}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${glyphe(15)}</g>`;

    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="emb-svg">${p}</svg>`;
  };

  return { dessiner };
})();
