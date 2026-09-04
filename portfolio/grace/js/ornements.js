// ============================================================
//  SITE DE GRÂCE — ORNEMENTS
//  Filigranes d'or dessinés en SVG : diviseurs, coins, anneau.
//  Aucune image n'est chargée.
// ============================================================

const ORNEMENTS = (() => {
  "use strict";

  /** Filet orné : une ligne, deux crosses, un losange au centre. */
  const diviseur = (classe = "") => `
    <svg viewBox="0 0 240 26" class="orn-div ${classe}" aria-hidden="true" preserveAspectRatio="none">
      <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
        <path d="M28 13 L108 13"/>
        <path d="M132 13 L212 13"/>
        <path d="M28 13 Q18 13 15 9 Q12 4 17 3 Q22 2 22 8"/>
        <path d="M212 13 Q222 13 225 9 Q228 4 223 3 Q218 2 218 8"/>
        <path d="M40 13 Q46 8 54 13 Q46 18 40 13"/>
        <path d="M200 13 Q194 8 186 13 Q194 18 200 13"/>
      </g>
      <path d="M120 4 L127 13 L120 22 L113 13 Z" fill="currentColor" opacity=".9"/>
      <circle cx="120" cy="13" r="2" fill="#0a0806"/>
    </svg>`;

  /** Équerre de coin, à poser aux quatre angles d'un panneau. */
  const coin = () => `
    <svg viewBox="0 0 44 44" class="orn-coin" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
        <path d="M2 42 L2 16 Q2 4 14 3 L40 3"/>
        <path d="M7 40 L7 18 Q7 9 16 8 L34 8"/>
        <path d="M2 16 Q9 12 12 5"/>
        <path d="M12 5 Q16 10 22 11"/>
      </g>
      <circle cx="6" cy="7" r="2" fill="currentColor"/>
    </svg>`;

  /** L'anneau : deux cercles, une fracture, des marques runiques. */
  const anneau = () => {
    // marques disposées à des angles irréguliers, pour ne pas faire cadran
    const angles = [12, 47, 79, 118, 156, 231, 268, 302, 338];
    const marques = angles.map((deg) => {
      const a = deg * Math.PI / 180;
      const x = 50 + 43 * Math.cos(a), y = 50 + 43 * Math.sin(a);
      return `<path d="M${x.toFixed(2)} ${(y - 2.6).toFixed(2)}
                       L${(x + 1.9).toFixed(2)} ${y.toFixed(2)}
                       L${x.toFixed(2)} ${(y + 2.6).toFixed(2)}
                       L${(x - 1.9).toFixed(2)} ${y.toFixed(2)} Z"
                fill="currentColor" opacity=".7"/>`;
    }).join("");

    return `
    <svg viewBox="0 0 100 100" class="orn-anneau" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-linecap="round">
        <circle cx="50" cy="50" r="47" stroke-width=".6" opacity=".35"/>
        <!-- l'anneau, rompu en bas à gauche -->
        <path d="M 20.5 71.5 A 36 36 0 1 1 33.4 79.6" stroke-width="3.2" opacity=".95"/>
        <!-- les deux lèvres de la fracture -->
        <path d="M20.5 71.5 L16 76 M20.5 71.5 L23 78" stroke-width="1.1" opacity=".8"/>
        <path d="M33.4 79.6 L31 85 M33.4 79.6 L38 84" stroke-width="1.1" opacity=".8"/>
        <circle cx="50" cy="50" r="29" stroke-width=".8" opacity=".45" stroke-dasharray="3 5"/>
        <circle cx="50" cy="50" r="20" stroke-width=".7" opacity=".3"/>
        <path d="M50 30 Q57 40 50 50 Q43 60 50 70" stroke-width=".9" opacity=".55"/>
        <path d="M30 50 Q40 43 50 50 Q60 57 70 50" stroke-width=".9" opacity=".55"/>
      </g>
      ${marques}
      <circle cx="50" cy="50" r="3.4" fill="currentColor"/>
      <circle cx="50" cy="50" r="7" fill="none" stroke="currentColor" stroke-width=".6" opacity=".5"/>
    </svg>`;
  };

  /** Petite marque de grâce, pour la puce des menus. */
  const marque = () => `
    <svg viewBox="0 0 16 16" class="orn-marque" aria-hidden="true">
      <path d="M8 1 L9.6 6.4 L15 8 L9.6 9.6 L8 15 L6.4 9.6 L1 8 L6.4 6.4 Z" fill="currentColor"/>
    </svg>`;

  return { diviseur, coin, anneau, marque };
})();
