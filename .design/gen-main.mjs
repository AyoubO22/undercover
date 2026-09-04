import fs from 'fs';
import { doc, BUSTS, PALETTE as P, ombre, rang, codeBarres, enTete, trombone } from './lib.mjs';

/* ---------- le guichet ---------- */
const affiche = `
  <div style="position: absolute; left: 74px; top: 58px; width: 162px; padding: 14px 10px 12px; transform: rotate(-1.4deg); box-shadow: ${ombre(3)}; border: 2px solid ${P.encre};" class="papier">
    <svg viewBox="0 0 24 20" width="34" height="28" style="display: block; margin: 0 auto 10px;">
      <path d="M12 2 L22 18 L2 18 Z" fill="none" stroke="${P.rouge}" stroke-width="2.5" shape-rendering="crispEdges"/>
      <rect x="11" y="8" width="2" height="5" fill="${P.rouge}"/><rect x="11" y="14" width="2" height="2" fill="${P.rouge}"/>
    </svg>
    <div style="font-size: 10px; text-align: center; letter-spacing: .1em; line-height: 1.5;">BUREAU DES<br>ENTRÉES</div>
    <div style="height: 2px; background: ${P.encre}; margin: 9px 14px;"></div>
    <div style="font-size: 7px; text-align: center; letter-spacing: .08em; line-height: 1.7; color: rgba(23,21,15,.72);">L'ORDRE PAR<br>LE FORMULAIRE</div>
    <div style="margin-top: 11px; font-family: var(--term); font-size: 11px; text-align: center; color: rgba(23,21,15,.5);">AFF. 07-B</div>
  </div>`;

const horloge = `
  <div style="position: absolute; right: 92px; top: 54px; width: 58px; height: 58px; border: 3px solid ${P.metalClair}; background: ${P.betonOmbre}; box-shadow: ${ombre(3)};">
    <div style="position: absolute; left: 50%; top: 4px; width: 2px; height: 5px; background: rgba(214,207,182,.45); transform: translateX(-50%);"></div>
    <div style="position: absolute; left: 50%; bottom: 4px; width: 2px; height: 5px; background: rgba(214,207,182,.45); transform: translateX(-50%);"></div>
    <div style="position: absolute; top: 50%; left: 4px; width: 5px; height: 2px; background: rgba(214,207,182,.45); transform: translateY(-50%);"></div>
    <div style="position: absolute; top: 50%; right: 4px; width: 5px; height: 2px; background: rgba(214,207,182,.45); transform: translateY(-50%);"></div>
    <div style="position: absolute; left: 50%; top: 50%; width: 3px; height: 13px; background: ${P.papierOmbre}; transform-origin: 50% 0; transform: translateX(-50%) rotate(58deg);"></div>
    <div style="position: absolute; left: 50%; top: 50%; width: 2px; height: 19px; background: ${P.papier}; transform-origin: 50% 0; transform: translateX(-50%) rotate(188deg);"></div>
    <div style="position: absolute; left: 50%; top: 50%; width: 5px; height: 5px; background: ${P.ambre}; transform: translate(-50%,-50%);"></div>
  </div>
  <div style="position: absolute; right: 84px; top: 120px; font-size: 7px; letter-spacing: .12em; color: rgba(214,207,182,.4);">HEURE OFFICIELLE</div>`;

const plante = `
  <svg viewBox="0 0 30 34" width="52" height="59" style="position: absolute; left: 62px; bottom: 22px;">
    <path d="M15 20 L15 10 M15 14 L9 8 M15 14 L21 8 M15 18 L8 15 M15 18 L22 15" stroke="#4d7a4f" stroke-width="2" fill="none" shape-rendering="crispEdges"/>
    <circle cx="9" cy="7" r="3" fill="#5f9a63"/><circle cx="21" cy="7" r="3" fill="#4d7a4f"/><circle cx="15" cy="9" r="3.4" fill="#69a86d"/>
    <path d="M8 20 L22 20 L20 31 L10 31 Z" fill="#7a4a34"/>
    <path d="M8 20 L22 20 L21.6 22 L8.4 22 Z" fill="#95603f"/>
  </svg>`;

// cône de lumière au-dessus du guichet, tramé plutôt que dégradé lisse
const lampe = `
  <div style="position: absolute; left: 50%; top: 0; width: 560px; height: 300px; transform: translateX(-50%); pointer-events: none;
      clip-path: polygon(44% 0, 56% 0, 100% 100%, 0 100%);
      background-image: repeating-linear-gradient(0deg, rgba(217,164,65,.06) 0 2px, transparent 2px 4px);"></div>
  <div style="position: absolute; left: 50%; top: -14px; width: 46px; height: 20px; transform: translateX(-50%); background: ${P.metal}; border: 2px solid ${P.noir}; clip-path: polygon(24% 0, 76% 0, 100% 100%, 0 100%);"></div>`;

const bust = (svg) => `<div style="position: absolute; left: 50%; bottom: -18px; width: 180px; height: 216px; transform: translateX(-50%);">${svg}</div>`;

const guichet = `
<section style="position: relative; height: 430px; overflow: hidden; border-bottom: 3px solid ${P.noir};" class="mur">
  ${lampe}
  ${affiche}
  ${horloge}
  ${plante}

  <!-- ensemble du guichet -->
  <div style="position: absolute; left: 50%; top: 46px; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 16px;">

    <div>
      <div style="width: 330px; margin-bottom: 6px; padding: 3px 0; text-align: center; font-size: 8px; letter-spacing: .2em; color: rgba(214,207,182,.5); border: 1px solid ${P.metal};" class="metal">GUICHET N° 4 — CONTRÔLE DES DOSSIERS</div>
      <div style="border: 5px solid ${P.metal}; box-shadow: ${ombre(4)}; background: ${P.noir};">
        <div style="position: relative; width: 320px; height: 226px; overflow: hidden; background: linear-gradient(180deg, #0e1319 0%, #1c242b 68%, #0e1319 100%);">
          <div style="position: absolute; inset: 0; background: linear-gradient(114deg, rgba(255,255,255,.075) 0 20%, transparent 20% 37%, rgba(255,255,255,.04) 37% 44%, transparent 44%); pointer-events: none; z-index: 3;"></div>
          ${bust(BUSTS.gameboxd)}
        </div>
        <div style="height: 14px; display: flex; align-items: center; justify-content: center; gap: 5px; border-top: 2px solid ${P.noir};" class="metal">
          ${Array.from({ length: 13 }, () => `<i style="display: block; width: 3px; height: 3px; background: rgba(0,0,0,.55);"></i>`).join('')}
        </div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 10px; width: 106px;">
      <div style="border: 2px solid ${P.metal}; background: ${P.betonOmbre}; padding: 7px 6px 5px; text-align: center;">
        <div style="font-size: 7px; letter-spacing: .12em; color: rgba(214,207,182,.55);">EN ATTENTE</div>
        <div style="font-family: var(--term); font-size: 34px; line-height: 1; color: ${P.ambre};">11</div>
      </div>
      <div style="border: 2px solid ${P.metal}; background: ${P.betonOmbre}; padding: 10px 6px 7px; text-align: center; box-shadow: ${ombre(3)};">
        <div style="width: 46px; height: 26px; margin: 0 auto 7px; border: 2px solid ${P.noir}; border-radius: 23px 23px 0 0; background: linear-gradient(180deg, #c33a2c 0%, ${P.rouge} 60%, #6d1c14 100%);"></div>
        <div style="font-size: 8px; letter-spacing: .14em;">SUIVANT</div>
      </div>
      <div style="border: 2px solid ${P.metal}; padding: 5px 6px; font-size: 7px; line-height: 1.7; color: rgba(214,207,182,.45);">
        DOSSIER<br><span style="font-family: var(--term); font-size: 13px; color: ${P.papier};">01 / 12</span>
      </div>
    </div>
  </div>

  <!-- réplique -->
  <div style="position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); width: 620px; border: 2px solid ${P.encre}; box-shadow: ${ombre(3)}; padding: 9px 13px 11px;" class="papier">
    <div style="font-size: 8px; letter-spacing: .16em; color: ${P.rouge};">GAMEBOXD — APPLICATION iOS</div>
    <div style="font-family: var(--type); font-size: 16px; margin-top: 4px;">Un journal de jeux vidéo : noter, critiquer, suivre ce qu'on a joué.<span style="color: rgba(23,21,15,.35);">▌</span></div>
  </div>
</section>`;

/* ---------- les papiers ---------- */
const passeport = `
<article style="position: absolute; left: 46px; top: 34px; width: 236px; padding: 10px 12px 12px; border: 2px solid rgba(23,21,15,.55); box-shadow: ${ombre(4)}; transform: rotate(-2.2deg);" class="papier">
  ${enTete('PASSEPORT', '51027-1')}
  <div style="display: flex; gap: 10px; align-items: flex-start; margin-bottom: 9px;">
    <div style="flex: 1 1 auto; min-width: 0;">
      <div style="font-size: 12px; font-weight: 700; line-height: 1.3;">GAMEBOXD</div>
      <div style="font-size: 8px; color: rgba(23,21,15,.62); margin-top: 4px; line-height: 1.5;">APPLICATION iOS<br>SWIFTUI</div>
    </div>
    <div style="flex: 0 0 auto; width: 56px; height: 66px; border: 2px solid ${P.encre}; background: #8e8f7d; overflow: hidden;">
      <div style="width: 100%; height: 132%; margin-top: -8%;">${BUSTS.gameboxd}</div>
    </div>
  </div>
  ${rang('TYPE', 'App iOS native')}
  ${rang('LANGAGE', 'Swift 5 · SwiftUI')}
  ${rang('ARCHI.', 'MVVM')}
  ${rang('DONNÉES', 'API RAWG')}
  ${rang('EXTRAS', 'Widget · tests · CI')}
  ${codeBarres(51027)}
  <div style="position: absolute; right: 9px; bottom: 5px; font-size: 7px; color: rgba(23,21,15,.5);">CLIC : AGRANDIR</div>
</article>`;

const note = `
<article style="position: absolute; left: 322px; top: 62px; width: 246px; padding: 10px 12px 14px; border: 2px solid rgba(23,21,15,.55); box-shadow: ${ombre(4)}; transform: rotate(1.6deg);" class="papier">
  ${trombone(196, -16, 12)}
  ${enTete('NOTE DE SERVICE', '51027-2')}
  <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px;">RAPPORT D'INSPECTION</div>
  <div style="font-family: var(--type); font-size: 12.5px; line-height: 1.55;">Le projet est découpé proprement : Models, Services, ViewModels, Views. Les clés d'API restent hors du dépôt.</div>
  <ul style="list-style: none; margin: 9px 0 0; padding: 0;">
    ${['Fiches de jeux via l\'API RAWG', 'Notes, critiques, bibliothèque', 'Extension widget (WidgetKit)', 'Tests unitaires + CI'].map(t =>
      `<li style="position: relative; padding: 3px 0 3px 13px; font-size: 9px; line-height: 1.45;"><span style="position: absolute; left: 0; color: ${P.rouge};">▸</span>${t}</li>`).join('')}
  </ul>
</article>`;

const permis = `
<article style="position: absolute; left: 606px; top: 40px; width: 236px; padding: 10px 12px 12px; border: 2px solid rgba(23,21,15,.55); box-shadow: ${ombre(4)}; transform: rotate(-1deg);" class="papier">
  ${enTete('PERMIS', '51027-3')}
  <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px;">AUTORISATION D'ACCÈS</div>
  <div style="font-family: var(--type); font-size: 12.5px; line-height: 1.55;">Le porteur est autorisé à consulter le code source et la documentation technique.</div>
  <div style="display: flex; gap: 6px; margin-top: 11px;">
    <span style="font-size: 8px; border: 1px solid ${P.encre}; padding: 4px 7px; background: rgba(0,0,0,.06);">CODE SOURCE</span>
    <span style="font-size: 8px; border: 1px solid ${P.encre}; padding: 4px 7px; background: rgba(0,0,0,.06);">README</span>
  </div>
  <div style="margin-top: 12px; border-top: 1px dashed rgba(23,21,15,.35); padding-top: 6px; display: flex; justify-content: space-between; font-family: var(--term); font-size: 11px; color: rgba(23,21,15,.55);">
    <span>VISA — BUREAU DES ENTRÉES</span><span>51027</span>
  </div>
</article>`;

/* ---------- outils ---------- */
const tampon = (texte, couleur, haut) => `
  <div style="position: relative; height: 74px; margin-bottom: ${haut}px;">
    <div style="position: absolute; left: 50%; top: 2px; width: 30px; height: 15px; transform: translateX(-50%); background: #7d6444; border: 2px solid ${P.noir};"></div>
    <div style="position: absolute; left: 50%; top: 15px; width: 62px; height: 16px; transform: translateX(-50%); background: #6b5539; border: 2px solid ${P.noir}; clip-path: polygon(14% 0, 86% 0, 100% 100%, 0 100%);"></div>
    <div style="position: absolute; left: 50%; top: 30px; width: 78px; height: 40px; transform: translateX(-50%); border: 2px solid ${P.noir}; box-shadow: ${ombre(3)}; background: ${couleur}; display: flex; align-items: center; justify-content: center;" class="trame">
      <span style="font-size: 9px; font-weight: 700; color: #fff; letter-spacing: .04em;">${texte}</span>
    </div>
  </div>`;

const outil = (ico, nom) => `
  <div style="border: 2px solid ${P.metalClair}; background: ${P.betonOmbre}; padding: 8px 4px 6px; text-align: center; margin-bottom: 8px;">
    <div style="height: 22px; display: flex; align-items: center; justify-content: center;">${ico}</div>
    <div style="font-size: 7px; letter-spacing: .1em; color: rgba(214,207,182,.65); margin-top: 4px;">${nom}</div>
  </div>`;

const icoLivre = `<svg viewBox="0 0 20 16" width="24" height="19"><rect x="1" y="1" width="18" height="14" fill="none" stroke="${P.papierOmbre}" stroke-width="2" shape-rendering="crispEdges"/><rect x="9" y="1" width="2" height="14" fill="${P.papierOmbre}"/><rect x="3" y="4" width="4" height="2" fill="${P.papierOmbre}"/><rect x="13" y="4" width="4" height="2" fill="${P.papierOmbre}"/></svg>`;
const icoEcran = `<svg viewBox="0 0 20 16" width="24" height="19"><rect x="1" y="1" width="18" height="12" fill="none" stroke="${P.phosphore}" stroke-width="2" shape-rendering="crispEdges"/><rect x="4" y="5" width="6" height="2" fill="${P.phosphore}"/><rect x="7" y="13" width="6" height="2" fill="${P.phosphore}"/></svg>`;
const icoLampe = `<svg viewBox="0 0 20 16" width="24" height="19"><path d="M5 10 L10 3 L15 10 Z" fill="none" stroke="${P.ambre}" stroke-width="2" shape-rendering="crispEdges"/><rect x="8" y="11" width="4" height="4" fill="${P.ambre}"/></svg>`;

const bureau = `
<section style="position: relative; height: 437px;" class="bois">
  <div style="position: absolute; inset: 0; height: 9px; background: linear-gradient(180deg, rgba(255,255,255,.10), transparent);"></div>

  <!-- sous-main -->
  <div style="position: absolute; left: 26px; top: 20px; width: 1178px; height: 396px; background: ${P.buvard}; border: 2px solid rgba(0,0,0,.5);
      clip-path: polygon(0 0, 99.2% 0, 100% 4%, 100% 96%, 99% 100%, 1% 100%, 0 95%);
      background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.09) 0 1px, transparent 1px 4px);"></div>
  <div style="position: absolute; left: 38px; top: 30px; width: 1154px; height: 376px; border: 1px solid rgba(214,207,182,.10);"></div>

  <!-- trace de tasse -->
  <div style="position: absolute; right: 208px; bottom: 46px; width: 56px; height: 56px; border: 3px solid rgba(23,21,15,.22); border-radius: 50%;"></div>

  <!-- stylo -->
  <svg viewBox="0 0 90 8" width="112" height="10" style="position: absolute; right: 156px; top: 44px; transform: rotate(-7deg);">
    <rect x="0" y="2" width="10" height="4" fill="#26292c"/><rect x="10" y="1" width="62" height="6" fill="#1d2a35"/>
    <rect x="72" y="2" width="12" height="4" fill="#b9bec2"/><rect x="84" y="3" width="6" height="2" fill="#e0e4e6"/>
  </svg>

  ${passeport}
  ${note}
  ${permis}

  <!-- colonne d'outils -->
  <aside style="position: absolute; right: 0; top: 0; bottom: 0; width: 116px; padding: 12px 10px; border-left: 3px solid ${P.noir}; background: ${P.metal};" class="metal">
    ${outil(icoLivre, 'RÈGLEMENT')}
    ${outil(icoEcran, 'TERMINAL')}
    <div style="height: 2px; background: rgba(0,0,0,.4); margin: 12px 0 14px;"></div>
    ${tampon('APPROUVÉ', P.vert, 12)}
    ${tampon('REFUSÉ', P.rouge, 10)}
    <div style="position: absolute; left: 10px; right: 10px; bottom: 12px;">${outil(icoLampe, 'LAMPE')}</div>
  </aside>
</section>`;

/* ---------- barre d'état ---------- */
const barre = `
<header style="display: flex; align-items: center; justify-content: space-between; height: 34px; padding: 0 12px; border-bottom: 2px solid ${P.noir}; background: ${P.betonOmbre};">
  <div style="display: flex; align-items: center; gap: 10px; font-size: 9px; letter-spacing: .1em; color: rgba(214,207,182,.6);">
    <span style="color: ${P.rouge};">◼</span>
    <span style="color: ${P.papier}; letter-spacing: .16em;">BUREAU DES ENTRÉES</span>
    <span style="opacity: .35;">·</span><span>JOUR 1</span>
    <span style="opacity: .35;">·</span><span style="font-family: var(--term); font-size: 13px;">09:14</span>
    <span style="opacity: .35;">·</span><span>POSTE EHB-0142</span>
  </div>
  <div style="display: flex; gap: 6px;">
    ${['▤ 1/12', '◈ 3/8', '♪ ON', '?'].map((t, i) => `<span style="border: 1px solid ${P.metal}; background: ${i === 2 ? P.vert : P.beton}; padding: 5px 8px; font-size: 9px; color: ${i === 2 ? '#fff' : 'rgba(214,207,182,.75)'};">${t}</span>`).join('')}
  </div>
</header>`;

fs.writeFileSync('Main.dc.html', doc('Main', `<div style="width: 1440px; height: 900px; display: flex; flex-direction: column; overflow: hidden;">
${barre}
${guichet}
${bureau}
</div>`));
console.log('Main.dc.html', fs.statSync('Main.dc.html').size, 'octets');
