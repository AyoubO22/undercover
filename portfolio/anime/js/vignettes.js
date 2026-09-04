// ============================================================
//  ÉPISODES — VIGNETTES
//  Chaque épisode porte une image-clé composée au code :
//  aplats, traits de vitesse et trame de points. Aucune image.
// ============================================================

const VIGNETTES = (() => {
  "use strict";

  // fond, forme, encre
  const DUOS = [
    ["#f4d13d", "#e2382c", "#16161d"],
    ["#25b7d3", "#16161d", "#f4f1ea"],
    ["#1b2a4a", "#f4d13d", "#f4f1ea"],
    ["#e2382c", "#f4f1ea", "#16161d"],
    ["#16161d", "#25b7d3", "#f4f1ea"],
    ["#f0a3b8", "#16161d", "#f4f1ea"],
  ];

  const composer = (ep, grande) => {
    const [fond, forme, encre] = DUOS[ep.duo % DUOS.length];

    const compositions = [
      // 0 — grand disque décentré
      `<div style="position:absolute; left:-8%; top:-14%; width:78%; aspect-ratio:1; border-radius:50%; background:${forme};"></div>
       <div style="position:absolute; inset:0; background:radial-gradient(${encre} 26%, transparent 27%); background-size:9px 9px; opacity:.14;"></div>`,
      // 1 — bandes obliques
      `<div style="position:absolute; inset:-20%; background:repeating-linear-gradient(58deg, ${forme} 0 16px, transparent 16px 40px);"></div>`,
      // 2 — traits de vitesse en éventail
      `<div style="position:absolute; inset:-40%; background:repeating-conic-gradient(from 0deg at 76% 34%, ${forme} 0deg 1.6deg, transparent 1.6deg 7deg);"></div>
       <div style="position:absolute; left:58%; top:16%; width:26%; aspect-ratio:1; border-radius:50%; background:${fond};"></div>`,
      // 3 — triangle et trame
      `<div style="position:absolute; inset:0; background:${forme}; clip-path:polygon(0 100%, 62% 8%, 100% 100%);"></div>
       <div style="position:absolute; inset:0; background:radial-gradient(${encre} 24%, transparent 25%); background-size:11px 11px; opacity:.18;"></div>`,
    ];

    return `
      <div class="vign" style="background:${fond}; color:${encre};">
        ${compositions[ep.vignette % compositions.length]}
        <span class="vign-num" style="color:${encre}">${ep.n}</span>
        ${grande ? "" : `<span class="vign-kana" style="color:${encre}">第${ep.n}話</span>`}
      </div>`;
  };

  return { composer };
})();
