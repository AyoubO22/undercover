// ============================================================
//  BUREAU — PORTRAITS
// ------------------------------------------------------------
//  Chaque candidat est un buste en pixel art dessiné au code :
//  aucune image n'est chargée. Une graine = un visage, toujours
//  le même. Le rendu est ombré (lumière venant du haut-droite),
//  et le portrait du guichet respire et cligne des yeux.
// ============================================================

const PORTRAITS = (() => {
  "use strict";

  const L = 40, H = 48;          // taille de la grille, en pixels

  /* ---------- aléatoire déterministe ---------- */
  const rng = (seed) => {
    let a = (seed >>> 0) || 1;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  /* ---------- matières : [ombre, base, lumière] ---------- */
  const PEAU = [
    ["#6d4326", "#8d5a33", "#a97045"],
    ["#7e4f2e", "#a06a3f", "#bd8354"],
    ["#8e6238", "#b3824f", "#cfa070"],
    ["#a06f47", "#c69166", "#e0b189"],
    ["#4e2f1c", "#6b4226", "#875637"],
    ["#b08356", "#d6a97b", "#eec79b"],
  ];
  const CHEVEU = [
    ["#100e0d", "#1c1917", "#2a2523"],
    ["#2a1d12", "#3d2b1a", "#523a24"],
    ["#33333a", "#4c4c55", "#65656f"],
    ["#5a3a1e", "#7a5228", "#9a6b39"],
    ["#141416", "#222227", "#323238"],
    ["#6b5a45", "#8a765c", "#a89477"],
  ];
  const TISSU = [
    ["#232b30", "#33403f", "#455350"],
    ["#2a2320", "#3d3430", "#4f4540"],
    ["#1e2a2e", "#2c3d42", "#3b5158"],
    ["#2b2620", "#3e372e", "#514840"],
    ["#241f28", "#352d3a", "#463c4c"],
    ["#202824", "#2f3a34", "#3f4d45"],
  ];
  const ACCENT = [
    ["#5b1f1a", "#7d2b23", "#9c3a30"],   // cravate, foulard
    ["#1d3a45", "#2a5462", "#37707f"],
    ["#4a3f18", "#6b5a22", "#8a752e"],
    ["#3a2038", "#54304f", "#6c4266"],
  ];
  const VERRE = "#1b1f24";
  const OEIL = "#15161a";
  const BLANC = "#cdc9bd";

  const choix = (r, arr) => arr[Math.floor(r() * arr.length)];

  /* ============================================================
     CONSTRUCTION DU BUSTE
     grille[y][x] = { m: matière } ou { c: couleur fixe }
     ============================================================ */
  const construire = (seed) => {
    const r = rng(seed);
    const peau = choix(r, PEAU);
    const cheveu = choix(r, CHEVEU);
    const tissu = choix(r, TISSU);
    const accent = choix(r, ACCENT);

    const coiffe = Math.floor(r() * 6);        // 0 court 1 rasé 2 long 3 casquette 4 bonnet 5 foulard
    const lunettes = r() < 0.3 ? (r() < 0.5 ? 1 : 2) : 0;
    const pilosite = Math.floor(r() * 4);      // 0 rien 1 moustache 2 barbe 3 bouc
    const cravate = r() < 0.45;
    const echarpe = !cravate && r() < 0.35;
    const humeur = Math.floor(r() * 3);        // 0 neutre 1 fermé 2 las

    const g = Array.from({ length: H }, () => Array(L).fill(null));
    const set = (x, y, v) => {
      if (x < 0 || x >= L || y < 0 || y >= H) return;
      g[y][x] = v;
    };
    // dessine à gauche ET à droite : le visage reste symétrique
    const m2 = (x, y, v) => { set(x, y, v); set(L - 1 - x, y, v); };
    const ligne = (x1, x2, y, v) => { for (let x = x1; x <= x2; x++) m2(x, y, v); };
    const bloc = (x1, x2, y1, y2, v) => { for (let y = y1; y <= y2; y++) ligne(x1, x2, y, v); };

    const MP = { m: peau }, MC = { m: cheveu }, MT = { m: tissu }, MA = { m: accent };

    /* ---- épaules et manteau (coupés par le guichet) ---- */
    ligne(12, 19, 32, MT);
    ligne(10, 19, 33, MT);
    ligne(8, 19, 34, MT);
    ligne(7, 19, 35, MT);
    bloc(6, 19, 36, H - 1, MT);

    /* ---- cou ---- */
    bloc(17, 19, 27, 32, MP);
    ligne(17, 19, 27, { c: "#00000055" });      // ombre sous le menton

    /* ---- col ---- */
    m2(16, 33, MT); m2(15, 34, MT);
    for (let i = 0; i < 5; i++) m2(17 + 0, 33 + i, MT);
    ligne(17, 19, 33, MT);
    m2(16, 34, { c: "#00000044" });
    m2(17, 35, { c: "#00000044" });

    if (cravate) { bloc(18, 19, 35, 41, MA); m2(18, 34, MA); }
    if (echarpe) { bloc(13, 19, 32, 35, MA); ligne(12, 19, 34, MA); }

    /* ---- tête (crâne arrondi, menton étroit) ---- */
    ligne(16, 19, 7, MP);
    ligne(14, 19, 8, MP);
    bloc(13, 19, 9, 25, MP);
    ligne(14, 19, 26, MP);
    ligne(16, 19, 27, MP);

    /* ---- oreilles ---- */
    bloc(12, 12, 16, 19, MP);

    /* ---- cheveux : ils épousent le crâne, ils ne flottent pas dessus ---- */
    if (coiffe === 0 || coiffe === 2) {
      ligne(16, 19, 7, MC);
      ligne(14, 19, 8, MC);
      ligne(13, 19, 9, MC);
      ligne(13, 19, 10, MC);
      m2(13, 11, MC);
      if (r() < 0.5) ligne(13, 15, 11, MC);          // frange sur le front
      if (coiffe === 2) { bloc(12, 13, 11, 23, MC); m2(12, 10, MC); }   // longs sur les côtés
    }
    if (coiffe === 1) {                              // crâne rasé : ombre de cheveux
      ligne(16, 19, 7, MC);
      ligne(14, 19, 8, MC);
      m2(13, 9, MC);
    }
    if (coiffe === 3) {                              // casquette de service
      ligne(15, 19, 5, MC);
      bloc(14, 19, 6, 7, MC);
      bloc(13, 19, 8, 9, MC);
      ligne(11, 19, 10, { c: "#15171a" });           // visière
      m2(16, 6, { c: "#00000055" });
    }
    if (coiffe === 4) {                              // bonnet
      ligne(16, 19, 4, MA);
      bloc(14, 19, 5, 6, MA);
      bloc(13, 19, 7, 9, MA);
      ligne(13, 19, 10, { c: "#00000044" });
    }
    if (coiffe === 5) {                              // foulard, retombant sur les épaules
      ligne(16, 19, 6, MA);
      bloc(14, 19, 7, 8, MA);
      bloc(12, 19, 9, 10, MA);
      bloc(11, 12, 11, 28, MA);
      bloc(10, 12, 29, 33, MA);
    }

    /* ---- sourcils ---- */
    ligne(14, 17, 14, MC);

    /* ---- yeux : blanc de 2px, pupille côté intérieur ---- */
    const yeux = [];
    m2(15, 16, { c: BLANC });
    m2(16, 16, { c: OEIL });
    yeux.push([15, 16], [16, 16], [L - 1 - 15, 16], [L - 1 - 16, 16]);
    m2(15, 17, { c: "#00000030" });                  // cerne

    /* ---- lunettes : une monture, pas un bandeau ---- */
    if (lunettes) {
      const cadre = { c: lunettes === 1 ? "#14171b" : "#2b3138" };
      ligne(14, 17, 15, cadre);                      // barre du haut
      ligne(14, 17, 17, cadre);                      // barre du bas
      m2(14, 16, cadre);                             // bord extérieur
      m2(18, 16, cadre);                             // pont
      m2(13, 15, cadre);                             // branche
      m2(15, 16, { c: BLANC });                      // le verre laisse voir l'œil
      m2(16, 16, { c: OEIL });
    }

    /* ---- nez ---- */
    m2(19, 18, { c: "#00000030" });
    m2(19, 19, { c: "#00000038" });

    /* ---- bouche ---- */
    const yb = 22;
    if (humeur === 0) ligne(17, 19, yb, { c: "#4e2b22" });
    if (humeur === 1) { ligne(17, 19, yb, { c: "#4e2b22" }); m2(17, yb - 1, { c: "#00000030" }); }
    if (humeur === 2) { ligne(18, 19, yb, { c: "#4e2b22" }); m2(17, yb + 1, { c: "#00000030" }); }

    /* ---- pilosité ---- */
    if (pilosite === 1) ligne(17, 19, 21, MC);       // moustache
    if (pilosite === 2) {                            // barbe
      bloc(14, 19, 24, 26, MC);
      bloc(13, 13, 19, 25, MC);
      ligne(13, 19, 23, MC);
      ligne(17, 19, 21, MC);
      m2(17, 22, { c: "#4e2b22" });
    }
    if (pilosite === 3) { bloc(17, 19, 24, 26, MC); ligne(17, 19, 21, MC); }

    /* ---- ombre des joues ---- */
    m2(13, 20, { c: "#00000022" });
    m2(13, 21, { c: "#00000022" });

    return {
      grille: g, yeux, peau, seed,
      // hauteur réellement occupée, pour caler le buste
      base: H,
    };
  };

  /* ============================================================
     RENDU
     Lumière venant du haut-droite : un pixel dont le voisin du
     haut est vide s'éclaire, celui dont le voisin de gauche est
     vide s'assombrit.
     ============================================================ */
  const teinte = (g, x, y, mat) => {
    const vide = (xx, yy) => xx < 0 || yy < 0 || xx >= L || yy >= H || !g[yy][xx];
    if (vide(x, y - 1)) return mat[2];               // haut découvert : lumière
    if (vide(x + 1, y)) return mat[2];               // bord droit : lumière
    if (vide(x - 1, y)) return mat[0];               // bord gauche : ombre
    if (vide(x, y + 1)) return mat[0];
    return mat[1];
  };

  const peindre = (ctx, modele, opts = {}) => {
    const { grille, yeux } = modele;
    const dy = opts.dy || 0;
    ctx.clearRect(0, 0, L, H + 2);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < L; x++) {
        const cell = grille[y][x];
        if (!cell) continue;
        ctx.fillStyle = cell.c || teinte(grille, x, y, cell.m);
        ctx.fillRect(x, y + dy, 1, 1);
      }
    }
    // paupières fermées
    if (opts.clin) {
      ctx.fillStyle = modele.peau[0];
      yeux.forEach(([x, y]) => ctx.fillRect(x, y + dy, 1, 1));
    }
  };

  const canvas = (w, h) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    return { c, ctx };
  };

  /* ---------- portrait animé du guichet ---------- */
  let boucle = null;

  const monter = (hote, seed) => {
    clearInterval(boucle);
    const modele = construire(seed);
    const { c, ctx } = canvas(L, H + 2);
    c.className = "buste";
    hote.innerHTML = "";
    hote.appendChild(c);

    let t = 0, clin = 0, prochainClin = 40 + Math.floor(Math.random() * 90);
    const tick = () => {
      t++;
      if (t >= prochainClin && !clin) { clin = 3; prochainClin = t + 40 + Math.floor(Math.random() * 110); }
      if (clin) clin--;
      // respiration : le buste descend d'un pixel une fois sur deux temps
      const dy = Math.sin(t / 11) > 0.72 ? 1 : 0;
      peindre(ctx, modele, { clin: clin > 0, dy });
    };
    tick();
    boucle = setInterval(tick, 90);
    return modele;
  };

  const demonter = () => clearInterval(boucle);

  /* ---------- photo d'identité pour les documents ---------- */
  const photoURL = (seed) => {
    const modele = construire(seed);
    const { c, ctx } = canvas(L, H);
    peindre(ctx, modele);
    // recadrage sur la tête, avec un fond de studio
    const t = canvas(26, 30);
    t.ctx.fillStyle = "#8e8f7d";
    t.ctx.fillRect(0, 0, 26, 30);
    t.ctx.drawImage(c, 7, 3, 26, 30, 0, 0, 26, 30);
    return t.c.toDataURL();
  };

  return { monter, demonter, photoURL, construire };
})();
