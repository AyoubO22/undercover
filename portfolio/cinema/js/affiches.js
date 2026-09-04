// ============================================================
//  LA SÉANCE — AFFICHES
//  Chaque film porte une affiche composée au code : un aplat,
//  une forme, un titre. Aucune image n'est chargée.
// ============================================================

const AFFICHES = (() => {
  "use strict";

  // fond, encre, accent
  const PALETTES = [
    ["#101012", "#e8e2d6", "#c1272d"],   // noir, ivoire, rouge
    ["#0d2137", "#f0ead9", "#e08a1e"],   // bleu nuit, crème, orange
    ["#16261e", "#e6e6d8", "#7fa86b"],   // vert forêt, crème, vert clair
    ["#2a1220", "#f2e4e8", "#d4557e"],   // pourpre, rose pâle, rose
    ["#231a12", "#efe4d0", "#c9922e"],   // brun, ocre clair, ocre
    ["#1a1a24", "#e4e2ee", "#7b73c9"],   // ardoise, lilas, violet
  ];

  /** Compose l'affiche d'un film. */
  const composer = (film) => {
    const [fond, encre, accent] = PALETTES[film.palette % PALETTES.length];
    const t = film.titre;

    // quatre compositions
    const formes = [
      // 0 — grand cercle, titre en bas
      `<div class="af-forme" style="
        position:absolute; left:50%; top:38%; width:62%; aspect-ratio:1; transform:translate(-50%,-50%);
        border-radius:50%; background:${accent};"></div>`,
      // 1 — bandes horizontales
      `<div class="af-forme" style="
        position:absolute; left:0; right:0; top:26%; height:34%;
        background:repeating-linear-gradient(180deg, ${accent} 0 9px, transparent 9px 18px);"></div>`,
      // 2 — diagonale (démarre sous le libellé du genre)
      `<div class="af-forme" style="
        position:absolute; inset:0; background:${accent};
        clip-path:polygon(0 32%, 100% 14%, 100% 54%, 0 72%);"></div>`,
      // 3 — grille de points
      `<div class="af-forme" style="
        position:absolute; left:12%; right:12%; top:22%; height:40%;
        background:radial-gradient(${accent} 30%, transparent 31%); background-size:15px 15px;"></div>`,
    ];

    const bas = film.affiche === 0 || film.affiche === 3;

    return `
      <div class="affiche" style="background:${fond}; color:${encre};">
        ${formes[film.affiche % formes.length]}
        <div class="af-haut">
          <span class="af-genre" style="color:${accent}">${film.genre}</span>
        </div>
        <div class="af-titre" style="${bas ? "bottom:16%;" : "top:64%;"}">
          <span class="af-nom">${film.titre}</span>
          <span class="af-sous">${film.sousTitre}</span>
        </div>
        <div class="af-pied">
          <span>${film.annee}</span><span class="af-point">·</span><span>${film.duree}</span>
        </div>
        <div class="af-bord"></div>
      </div>`;
  };

  const palette = (film) => PALETTES[film.palette % PALETTES.length];

  return { composer, palette };
})();
