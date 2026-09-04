// ============================================================
//  SITE DE GRÂCE — EMBLÈMES
// ------------------------------------------------------------
//  Chaque objet de l'inventaire porte un sceau héraldique
//  construit au code à partir de sa graine : anneaux, branches
//  rayonnantes et motif central. Une graine = un sceau, pour
//  toujours. Aucune image n'est chargée.
// ============================================================

const SIGILS = (() => {
  "use strict";

  const OR = "#c9a227";
  const OR_VIF = "#f0dfa8";
  const OR_SOURD = "#7d6524";

  const rng = (graine) => {
    let a = (graine >>> 0) || 1;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const C = 50;                                   // centre
  const pol = (r, deg) => [                       // coordonnées polaires
    C + r * Math.cos((deg - 90) * Math.PI / 180),
    C + r * Math.sin((deg - 90) * Math.PI / 180),
  ];
  const n = (v) => Math.round(v * 100) / 100;

  /* ---------- motifs centraux ---------- */
  const MOTIFS = [
    // losange
    (r) => `<path d="M50 ${n(50 - r)} L${n(50 + r * .62)} 50 L50 ${n(50 + r)} L${n(50 - r * .62)} 50 Z"/>`,
    // triangle pointe haute
    (r) => `<path d="M50 ${n(50 - r)} L${n(50 + r * .87)} ${n(50 + r * .5)} L${n(50 - r * .87)} ${n(50 + r * .5)} Z"/>`,
    // triangle pointe basse
    (r) => `<path d="M50 ${n(50 + r)} L${n(50 + r * .87)} ${n(50 - r * .5)} L${n(50 - r * .87)} ${n(50 - r * .5)} Z"/>`,
    // croissant
    (r) => `<path d="M50 ${n(50 - r)} A ${n(r)} ${n(r)} 0 1 0 50 ${n(50 + r)} A ${n(r * .74)} ${n(r * .74)} 0 1 1 50 ${n(50 - r)} Z"/>`,
    // anneaux concentriques
    (r) => `<circle cx="50" cy="50" r="${n(r)}"/><circle cx="50" cy="50" r="${n(r * .55)}"/>`,
    // lame
    (r) => `<path d="M50 ${n(50 - r)} L${n(50 + r * .26)} ${n(50 - r * .3)} L${n(50 + r * .16)} ${n(50 + r * .8)} L${n(50 - r * .16)} ${n(50 + r * .8)} L${n(50 - r * .26)} ${n(50 - r * .3)} Z"/>
            <path d="M${n(50 - r * .62)} ${n(50 + r * .18)} L${n(50 + r * .62)} ${n(50 + r * .18)}"/>`,
    // étoile à quatre branches
    (r) => `<path d="M50 ${n(50 - r)} Q50 50 ${n(50 + r)} 50 Q50 50 50 ${n(50 + r)} Q50 50 ${n(50 - r)} 50 Q50 50 50 ${n(50 - r)} Z"/>`,
    // double chevron
    (r) => `<path d="M${n(50 - r * .8)} ${n(50 + r * .1)} L50 ${n(50 - r * .7)} L${n(50 + r * .8)} ${n(50 + r * .1)}"/>
            <path d="M${n(50 - r * .8)} ${n(50 + r * .78)} L50 ${n(50 - r * .02)} L${n(50 + r * .78)} ${n(50 + r * .78)}"/>`,
  ];

  /**
   * Renvoie le SVG d'un emblème.
   * @param {number} graine
   * @param {number} rarete 1 à 3 — plus c'est haut, plus l'ornement est riche
   */
  const dessiner = (graine, rarete = 2) => {
    const r = rng(graine);
    const branches = [6, 8, 12][Math.floor(r() * 3)];
    const motifA = MOTIFS[Math.floor(r() * MOTIFS.length)];
    const motifB = MOTIFS[Math.floor(r() * MOTIFS.length)];
    const rupture = r() < 0.45;
    const decale = r() * 30;
    const rInt = 27 + Math.floor(r() * 6);        // rayon de l'anneau intérieur
    const rMotif = 23 + Math.floor(r() * 5);      // taille du motif principal

    let p = "";

    // anneau extérieur, parfois rompu
    if (rupture) {
      const [x1, y1] = pol(45, 24), [x2, y2] = pol(45, 336);
      p += `<path d="M${n(x1)} ${n(y1)} A 45 45 0 1 1 ${n(x2)} ${n(y2)}" stroke="${OR}" stroke-width="1" fill="none" opacity=".85"/>`;
      p += `<circle cx="${n(x1)}" cy="${n(y1)}" r="1.6" fill="${OR}"/><circle cx="${n(x2)}" cy="${n(y2)}" r="1.6" fill="${OR}"/>`;
    } else {
      p += `<circle cx="50" cy="50" r="45" stroke="${OR}" stroke-width="1" fill="none" opacity=".85"/>`;
    }

    // second anneau pour les pièces maîtresses
    if (rarete >= 3) {
      p += `<circle cx="50" cy="50" r="47.5" stroke="${OR_SOURD}" stroke-width=".6" fill="none" stroke-dasharray="1.5 3"/>`;
    }

    // branches rayonnantes
    for (let i = 0; i < branches; i++) {
      const a = decale + (360 / branches) * i;
      const [x1, y1] = pol(rInt + 1, a), [x2, y2] = pol(43, a);
      p += `<path d="M${n(x1)} ${n(y1)} L${n(x2)} ${n(y2)}" stroke="${OR_SOURD}" stroke-width=".9" opacity=".75"/>`;
      if (rarete >= 2 && i % 2 === 0) {
        const [xm, ym] = pol((rInt + 44) / 2, a);
        p += `<circle cx="${n(xm)}" cy="${n(ym)}" r="1.5" fill="${OR}" opacity=".6"/>`;
      }
    }

    // anneau intérieur
    p += `<circle cx="50" cy="50" r="${rInt}" stroke="${OR}" stroke-width=".8" fill="none" opacity=".7"/>`;

    // motifs
    p += `<g stroke="${OR}" stroke-width="1.5" fill="none" stroke-linejoin="round" opacity=".95">${motifA(rMotif)}</g>`;
    p += `<g stroke="${OR_VIF}" stroke-width="1.1" fill="none" stroke-linejoin="round" opacity=".9">${motifB(rMotif * 0.44)}</g>`;

    // points cardinaux
    if (rarete >= 2) {
      for (const a of [0, 90, 180, 270]) {
        const [x, y] = pol(45, a);
        p += `<rect x="${n(x - 1.3)}" y="${n(y - 1.3)}" width="2.6" height="2.6" fill="${OR}" opacity=".8" transform="rotate(45 ${n(x)} ${n(y)})"/>`;
      }
    }

    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="sigil-svg">${p}</svg>`;
  };

  return { dessiner };
})();
