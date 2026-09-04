import fs from 'fs';
import { doc, BUSTS, PALETTE as P, ombre, rang, enTete, codeBarres } from './lib.mjs';

/* ============================================================ MOBILE 390×844 */
const barreMobile = `
<header style="display: flex; align-items: center; justify-content: space-between; height: 30px; padding: 0 8px; border-bottom: 2px solid ${P.noir}; background: ${P.betonOmbre}; flex: 0 0 auto;">
  <div style="display: flex; align-items: center; gap: 7px; font-size: 8px; color: rgba(214,207,182,.6);">
    <span style="color: ${P.rouge};">◼</span><span>JOUR 1</span>
    <span style="opacity: .35;">·</span><span style="font-family: var(--term); font-size: 12px;">09:14</span>
  </div>
  <div style="display: flex; gap: 4px;">
    ${['▤ 1/12', '◈ 3/8', '♪', '?'].map((t, i) => `<span style="border: 1px solid ${P.metal}; background: ${i === 2 ? P.vert : P.beton}; padding: 4px 6px; font-size: 8px; color: ${i === 2 ? '#fff' : 'rgba(214,207,182,.75)'};">${t}</span>`).join('')}
  </div>
</header>`;

const outilsMobile = `
<nav style="position: absolute; left: 0; right: 0; bottom: 0; height: 62px; display: flex; gap: 6px; padding: 7px 8px; border-top: 3px solid ${P.noir};" class="metal">
  ${[['▤', 'RÈGL.'], ['▮', 'TERM.']].map(([i, n]) => `<span style="flex: 0 0 62px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; border: 2px solid ${P.metalClair}; background: ${P.betonOmbre};">
    <span style="font-size: 15px; color: ${n === 'TERM.' ? P.phosphore : P.papierOmbre};">${i}</span><span style="font-size: 7px; color: rgba(214,207,182,.6);">${n}</span></span>`).join('')}
  <span style="flex: 1 1 auto; display: flex; align-items: center; justify-content: center; border: 2px solid ${P.noir}; background: ${P.vert}; font-size: 10px; font-weight: 700; color: #fff; box-shadow: ${ombre(3)};" class="trame">APPROUVÉ</span>
  <span style="flex: 1 1 auto; display: flex; align-items: center; justify-content: center; border: 2px solid ${P.noir}; background: ${P.rouge}; font-size: 10px; font-weight: 700; color: #fff; box-shadow: ${ombre(3)};" class="trame">REFUSÉ</span>
  <span style="flex: 0 0 44px; display: flex; align-items: center; justify-content: center; border: 2px solid ${P.metalClair}; background: ${P.betonOmbre}; font-size: 15px; color: ${P.ambre};">☼</span>
</nav>`;

fs.writeFileSync('Mobile.dc.html', doc('Mobile', `
<div style="position: relative; width: 390px; height: 844px; overflow: hidden; display: flex; flex-direction: column;">
  ${barreMobile}
  <section style="position: relative; flex: 0 0 336px; overflow: hidden; border-bottom: 3px solid ${P.noir};" class="mur">
    <div style="position: absolute; left: 50%; top: 0; width: 300px; height: 200px; transform: translateX(-50%); pointer-events: none;
      clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%); background-image: repeating-linear-gradient(0deg, rgba(217,164,65,.06) 0 2px, transparent 2px 4px);"></div>
    <div style="position: absolute; left: 14px; top: 22px; width: 92px; padding: 8px 6px; transform: rotate(-1.6deg); border: 2px solid ${P.encre}; box-shadow: ${ombre(3)};" class="papier">
      <svg viewBox="0 0 24 20" width="22" height="18" style="display: block; margin: 0 auto 6px;"><path d="M12 2 L22 18 L2 18 Z" fill="none" stroke="${P.rouge}" stroke-width="2.5" shape-rendering="crispEdges"/></svg>
      <div style="font-size: 6.5px; text-align: center; letter-spacing: .06em; line-height: 1.6;">L'ORDRE PAR<br>LE FORMULAIRE</div>
    </div>
    <div style="position: absolute; left: 50%; top: 34px; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 9px;">
      <div style="border: 4px solid ${P.metal}; box-shadow: ${ombre(3)};">
        <div style="position: relative; width: 196px; height: 148px; overflow: hidden; background: linear-gradient(180deg, #0e1319 0%, #1c242b 68%, #0e1319 100%);">
          <div style="position: absolute; inset: 0; background: linear-gradient(114deg, rgba(255,255,255,.07) 0 20%, transparent 20% 40%); z-index: 3;"></div>
          <div style="position: absolute; left: 50%; bottom: -12px; width: 118px; height: 142px; transform: translateX(-50%);">${BUSTS.gameboxd}</div>
        </div>
        <div style="height: 10px; border-top: 2px solid ${P.noir};" class="metal"></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 7px; width: 66px;">
        <div style="border: 2px solid ${P.metal}; background: ${P.betonOmbre}; padding: 5px 4px; text-align: center;">
          <div style="font-size: 6px; color: rgba(214,207,182,.55);">EN ATTENTE</div>
          <div style="font-family: var(--term); font-size: 22px; line-height: 1; color: ${P.ambre};">11</div>
        </div>
        <div style="border: 2px solid ${P.metal}; background: ${P.betonOmbre}; padding: 7px 4px 5px; text-align: center;">
          <div style="width: 30px; height: 17px; margin: 0 auto 5px; border: 2px solid ${P.noir}; border-radius: 15px 15px 0 0; background: linear-gradient(180deg, #c33a2c, #6d1c14);"></div>
          <div style="font-size: 7px;">SUIVANT</div>
        </div>
      </div>
    </div>
    <div style="position: absolute; left: 12px; right: 12px; bottom: 12px; border: 2px solid ${P.encre}; box-shadow: ${ombre(3)}; padding: 7px 10px 9px;" class="papier">
      <div style="font-size: 7px; letter-spacing: .14em; color: ${P.rouge};">GAMEBOXD</div>
      <div style="font-family: var(--type); font-size: 13.5px; line-height: 1.4; margin-top: 3px;">Un journal de jeux vidéo : noter, critiquer, suivre ce qu'on a joué.</div>
    </div>
  </section>
  <section style="position: relative; flex: 1 1 auto; overflow: hidden;" class="bois">
    <div style="position: absolute; left: 10px; right: 10px; top: 12px; padding: 10px 12px 12px; border: 2px solid rgba(23,21,15,.55); box-shadow: ${ombre(3)};" class="papier">
      ${enTete('PASSEPORT', '51027-1')}
      <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 9px;">
        <div style="flex: 1 1 auto;">
          <div style="font-size: 12px; font-weight: 700;">GAMEBOXD</div>
          <div style="font-size: 8px; color: rgba(23,21,15,.62); margin-top: 4px;">APPLICATION iOS · SWIFTUI</div>
        </div>
        <div style="flex: 0 0 auto; width: 48px; height: 56px; border: 2px solid ${P.encre}; background: #8e8f7d; overflow: hidden;">
          <div style="width: 100%; height: 132%; margin-top: -8%;">${BUSTS.gameboxd}</div>
        </div>
      </div>
      ${rang('TYPE', 'App iOS native')}
      ${rang('LANGAGE', 'Swift 5 · SwiftUI')}
      ${rang('ARCHI.', 'MVVM')}
    </div>
    ${outilsMobile}
  </section>
</div>`));

/* --- mobile, papiers empilés --- */
const papierMobile = (genre, num, titre, sous, corps) => `
  <div style="padding: 10px 12px 12px; border: 2px solid rgba(23,21,15,.55); box-shadow: ${ombre(3)}; margin-bottom: 10px;" class="papier">
    ${enTete(genre, num)}
    <div style="font-size: 12px; font-weight: 700;">${titre}</div>
    ${sous ? `<div style="font-size: 8px; color: rgba(23,21,15,.62); margin: 3px 0 7px;">${sous}</div>` : ''}
    ${corps}
  </div>`;

fs.writeFileSync('MobilePapiers.dc.html', doc('MobilePapiers', `
<div style="position: relative; width: 390px; height: 844px; overflow: hidden; display: flex; flex-direction: column;">
  ${barreMobile}
  <section style="position: relative; flex: 0 0 96px; overflow: hidden; border-bottom: 3px solid ${P.noir};" class="mur">
    <div style="position: absolute; left: 50%; top: -128px; transform: translateX(-50%); border: 4px solid ${P.metal};">
      <div style="position: relative; width: 196px; height: 148px; overflow: hidden; background: linear-gradient(180deg, #0e1319, #1c242b 68%, #0e1319);">
        <div style="position: absolute; left: 50%; bottom: -12px; width: 118px; height: 142px; transform: translateX(-50%);">${BUSTS.gameboxd}</div>
      </div>
    </div>
    <div style="position: absolute; left: 12px; right: 12px; bottom: 8px; border: 2px solid ${P.encre}; padding: 5px 9px 7px;" class="papier">
      <div style="font-size: 7px; letter-spacing: .14em; color: ${P.rouge};">GAMEBOXD</div>
      <div style="font-family: var(--type); font-size: 12.5px; margin-top: 2px;">Écrite en SwiftUI. Cinquante-deux fichiers Swift.</div>
    </div>
  </section>
  <section style="position: relative; flex: 1 1 auto; overflow: hidden;" class="bois">
    <div style="position: absolute; inset: 0; padding: 10px 10px 70px; overflow: hidden;">
      ${papierMobile('NOTE DE SERVICE', '51027-2', 'RAPPORT D\'INSPECTION', '', `
        <div style="font-family: var(--type); font-size: 12.5px; line-height: 1.55;">Le projet est découpé proprement : Models, Services, ViewModels, Views. Les clés d'API restent hors du dépôt.</div>
        <ul style="list-style: none; margin: 8px 0 0; padding: 0;">
          ${['Fiches de jeux via l\'API RAWG', 'Notes, critiques, bibliothèque', 'Extension widget (WidgetKit)'].map(t =>
            `<li style="position: relative; padding: 3px 0 3px 13px; font-size: 9px;"><span style="position: absolute; left: 0; color: ${P.rouge};">▸</span>${t}</li>`).join('')}
        </ul>`)}
      ${papierMobile('PERMIS', '51027-3', 'AUTORISATION D\'ACCÈS', '', `
        <div style="font-family: var(--type); font-size: 12.5px; line-height: 1.55;">Le porteur est autorisé à consulter le code source et la documentation technique.</div>
        <div style="display: flex; gap: 6px; margin-top: 10px;">
          <span style="font-size: 8px; border: 1px solid ${P.encre}; padding: 4px 7px; background: rgba(0,0,0,.06);">CODE SOURCE</span>
          <span style="font-size: 8px; border: 1px solid ${P.encre}; padding: 4px 7px; background: rgba(0,0,0,.06);">README</span>
        </div>`)}
    </div>
    ${outilsMobile}
  </section>
</div>`));
console.log('2 artboards mobiles écrits');
