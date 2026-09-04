// Vocabulaire partagé par tous les artboards du canevas
import fs from 'fs';
export const BUSTS = JSON.parse(fs.readFileSync(new URL('./busts.json', import.meta.url)));

export const PALETTE = {
  noir:        '#06080a',
  betonOmbre:  '#1a1e1d',
  beton:       '#2c3230',
  metal:       '#3c4340',
  metalClair:  '#565e59',
  bois:        '#4a3f33',
  boisOmbre:   '#2c251d',
  buvard:      '#2f4034',
  papier:      '#d6cfb6',
  papierOmbre: '#b3ab8b',
  encre:       '#17150f',
  vert:        '#2f7d3f',
  rouge:       '#a8271b',
  ambre:       '#d9a441',
  phosphore:   '#86d68a',
};
const P = PALETTE;

export const HELMET = `<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=VT323&family=Special+Elite&display=swap">
  <style>
    :root {
      --noir: ${P.noir}; --beton-ombre: ${P.betonOmbre}; --beton: ${P.beton};
      --metal: ${P.metal}; --metal-clair: ${P.metalClair};
      --bois: ${P.bois}; --bois-ombre: ${P.boisOmbre}; --buvard: ${P.buvard};
      --papier: ${P.papier}; --papier-ombre: ${P.papierOmbre}; --encre: ${P.encre};
      --vert: ${P.vert}; --rouge: ${P.rouge}; --ambre: ${P.ambre}; --phosphore: ${P.phosphore};
      --pix: "Silkscreen", "Courier New", monospace;
      --term: "VT323", "Courier New", monospace;
      --type: "Special Elite", "Courier New", monospace;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: ${P.noir}; font-family: var(--pix); color: ${P.papier}; }
    a { color: ${P.ambre}; text-decoration: none; }
    a:hover { color: ${P.papier}; }
    /* béton : joints verticaux + grain horizontal, aucune image */
    .mur {
      background-color: ${P.beton};
      background-image:
        repeating-linear-gradient(90deg, rgba(0,0,0,.20) 0 2px, transparent 2px 58px),
        repeating-linear-gradient(0deg, rgba(255,255,255,.022) 0 1px, transparent 1px 5px),
        linear-gradient(180deg, ${P.beton} 0%, ${P.betonOmbre} 100%);
    }
    /* bois : veinage tramé */
    .bois {
      background-color: ${P.bois};
      background-image:
        repeating-linear-gradient(93deg, rgba(0,0,0,.14) 0 3px, transparent 3px 27px),
        repeating-linear-gradient(87deg, rgba(255,255,255,.03) 0 1px, transparent 1px 13px),
        linear-gradient(180deg, ${P.bois} 0%, ${P.boisOmbre} 100%);
    }
    /* papier : fibres horizontales */
    .papier {
      background-color: ${P.papier};
      background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.028) 0 1px, transparent 1px 4px);
      color: ${P.encre};
    }
    /* métal brossé */
    .metal {
      background-color: ${P.metal};
      background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px);
    }
    /* balayage CRT */
    .scan { background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.34) 0 1px, transparent 1px 3px); }
    /* tramage 45° pour les remplissages */
    .trame { background-image: repeating-linear-gradient(45deg, rgba(255,255,255,.14) 0 2px, transparent 2px 4px); }
  </style>
</helmet>`;

export const doc = (title, body, css = '') => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
${HELMET.replace('</style>', css + '\n  </style>')}
${body}
</x-dc>
<script data-dc-script>
class Component extends DCLogic {}
</script>
</body>
</html>`;

/* ---------- briques réutilisables ---------- */

export const ombre = (n = 3) => `${n}px ${n}px 0 rgba(0,0,0,.55)`;

// ligne clé/valeur d'un document
export const rang = (k, v) => `<div style="display: flex; gap: 8px; padding: 3px 0; border-bottom: 1px dotted rgba(23,21,15,.3);">
        <span style="flex: 0 0 62px; font-size: 8px; color: rgba(23,21,15,.62); letter-spacing: .06em;">${k}</span>
        <span style="flex: 1 1 auto; font-family: var(--term); font-size: 15px; line-height: 1.05;">${v}</span>
      </div>`;

// code-barres déterministe
export const codeBarres = (graine, h = 16) => {
  let a = graine, out = '';
  for (let i = 0; i < 34; i++) {
    a = (a * 1103515245 + 12345) & 0x7fffffff;
    out += `<i style="display: block; width: ${1 + (a % 3)}px; background: ${P.encre}; opacity: ${a % 2 ? 1 : .22};"></i>`;
  }
  return `<div style="display: flex; gap: 1px; height: ${h}px; margin-top: 9px;">${out}</div>`;
};

// en-tête d'un document
export const enTete = (genre, num) => `<div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid ${P.encre}; padding-bottom: 5px; margin-bottom: 8px;">
      <span style="font-size: 8px; letter-spacing: .14em;">${genre}</span>
      <span style="font-family: var(--term); font-size: 12px; color: rgba(23,21,15,.6);">N°${num}</span>
    </div>`;

// trombone dessiné en SVG
export const trombone = (x, y, rot = 0) => `<svg viewBox="0 0 20 46" width="16" height="37" style="position: absolute; left: ${x}px; top: ${y}px; transform: rotate(${rot}deg); z-index: 4;">
      <path d="M6 4 L6 34 Q6 41 10 41 Q14 41 14 34 L14 10 Q14 5 10.5 5 Q7 5 7 10 L7 30"
        fill="none" stroke="#8d949a" stroke-width="2.5" shape-rendering="crispEdges"/>
      <path d="M6 4 L6 34 Q6 41 10 41" fill="none" stroke="#c3cad0" stroke-width="1" shape-rendering="crispEdges"/>
    </svg>`;

// tampon encré
export const encre = (texte, couleur, rot, style = '') => `<div style="position: absolute; ${style} transform: rotate(${rot}deg); border: 4px double ${couleur}; color: ${couleur};
      padding: 7px 14px; font-size: 17px; font-weight: 700; letter-spacing: .1em; opacity: .86; mix-blend-mode: multiply; white-space: nowrap;">${texte}</div>`;
