import fs from 'fs';
import { doc, BUSTS, PALETTE as P, ombre } from './lib.mjs';
const W = 1440, H = 900;
const page = (c) => `<div style="position: relative; width: ${W}px; height: ${H}px; overflow: hidden;">${c}</div>`;
const fondAttenue = `
  <div style="position: absolute; inset: 0;" class="mur"></div>
  <div style="position: absolute; left: 0; right: 0; top: 430px; bottom: 0; border-top: 3px solid ${P.noir};" class="bois"></div>
  <div style="position: absolute; left: 50%; top: 92px; width: 330px; height: 240px; transform: translateX(-50%); border: 5px solid ${P.metal}; background: #131a20;"></div>
  <div style="position: absolute; left: 66px; top: 480px; width: 236px; height: 250px; transform: rotate(-2deg); background: ${P.papier}; border: 2px solid rgba(23,21,15,.5);"></div>
  <div style="position: absolute; right: 0; top: 430px; bottom: 0; width: 116px; border-left: 3px solid ${P.noir};" class="metal"></div>
  <div style="position: absolute; inset: 0; background: rgba(6,8,10,.82);"></div>`;

/* ============================================================ 4. RÈGLEMENT */
const onglets = ['PROFIL', 'COMPÉTENCES', 'PARCOURS', 'CONTACT', 'ADDENDA'];
const barres = [['JS / TYPESCRIPT', 85], ['REACT / TAILWIND', 80], ['SWIFT / SWIFTUI', 75], ['GIT / CI-CD', 75],
                ['NODE.JS / API', 70], ['PYTHON', 65], ['SQL / DONNÉES', 60], ['C# / .NET', 60], ['JAVA / SPRING', 55], ['PHP / LARAVEL', 55]];
// barre de niveau pixelisée : 20 casiers, remplis par pas de 5 %
const barre = (nom, n) => {
  const plein = Math.round(n / 5);
  return `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 7px;">
    <span style="flex: 0 0 128px; font-size: 9px; letter-spacing: .04em;">${nom}</span>
    <span style="flex: 1 1 auto; display: flex; gap: 2px; border: 2px solid ${P.encre}; padding: 2px; background: rgba(0,0,0,.06);">
      ${Array.from({ length: 20 }, (_, i) => `<i style="display: block; flex: 1 1 0; height: 11px; background: ${i < plein ? P.encre : 'transparent'};"></i>`).join('')}
    </span>
    <span style="flex: 0 0 28px; font-family: var(--term); font-size: 14px; color: rgba(23,21,15,.6); text-align: right;">${n}</span>
  </div>`;
};
fs.writeFileSync('Reglement.dc.html', doc('Reglement', page(`
  ${fondAttenue}
  <div style="position: absolute; left: 50%; top: 50%; width: 720px; transform: translate(-50%,-50%); border: 3px solid ${P.encre}; box-shadow: 10px 10px 0 rgba(0,0,0,.6);" class="papier">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: ${P.encre}; color: ${P.papier};">
      <span style="font-size: 11px; letter-spacing: .18em;">RÈGLEMENT DU BUREAU</span>
      <span style="font-size: 13px; color: ${P.papierOmbre};">✕</span>
    </div>
    <div style="display: flex; border-bottom: 2px solid ${P.encre}; background: ${P.papierOmbre};">
      ${onglets.map((o, i) => `<span style="padding: 9px 15px; font-size: 9px; letter-spacing: .06em; border-right: 1px solid rgba(23,21,15,.25);
        ${i === 1 ? `background: ${P.papier}; color: ${P.encre}; font-weight: 700; box-shadow: inset 0 -3px 0 ${P.rouge};` : 'color: rgba(23,21,15,.6);'}">${o}</span>`).join('')}
    </div>
    <div style="padding: 20px 26px 26px;">
      <div style="font-size: 15px; font-weight: 700;">AUTORISATIONS TECHNIQUES</div>
      <div style="font-size: 9px; letter-spacing: .1em; color: rgba(23,21,15,.6); margin: 5px 0 18px;">SECTION 2 — HABILITATIONS (AUTO-ÉVALUATION)</div>
      ${barres.map(([n, v]) => barre(n, v)).join('')}
      <div style="font-size: 9px; letter-spacing: .1em; color: rgba(23,21,15,.6); margin: 20px 0 8px;">AUTRES MENTIONS</div>
      <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px;">
        ${[['Intégration', 'RabbitMQ, XML/XSD, Salesforce, Docker.'],
           ['Interfaces', 'SwiftUI, Radix/shadcn, Tailwind, CSS à la main.'],
           ['APIs tierces', 'RAWG, PokéAPI, Riot Games, Discord, Apps Script.'],
           ['Langues', 'français, néerlandais, anglais.']].map(([k, v]) =>
          `<li style="position: relative; padding-left: 15px; font-size: 10px; line-height: 1.6;"><span style="position: absolute; left: 0; color: ${P.rouge};">▪</span><b>${k}</b> — ${v}</li>`).join('')}
      </ul>
      <div style="margin-top: 22px; border-top: 2px solid ${P.encre}; padding-top: 10px; display: flex; justify-content: space-between; font-size: 8px; color: rgba(23,21,15,.6);">
        <span>BUREAU DES ENTRÉES</span><span>EHB-0142 · BRUXELLES, BE</span>
      </div>
    </div>
  </div>
`)));

/* ============================================================ 5. TERMINAL */
const ligne = (t, c) => `<div style="color: ${c};">${t}</div>`;
const cmd = (t) => `<div><span style="color: #4a7d4d;">inspecteur@bureau:~$</span> <span style="color: #fff;">${t}</span></div>`;
fs.writeFileSync('Terminal.dc.html', doc('Terminal', page(`
  ${fondAttenue}
  <div style="position: absolute; left: 50%; top: 50%; width: 760px; height: 560px; transform: translate(-50%,-50%); display: flex; flex-direction: column; background: #050a06; border: 3px solid ${P.metal}; box-shadow: 10px 10px 0 rgba(0,0,0,.6);">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 7px 11px; background: ${P.metal};">
      <span style="font-size: 9px; letter-spacing: .14em; color: #7fae82;">TERMINAL DE SERVICE — v0.9</span>
      <span style="font-size: 12px; color: ${P.papierOmbre};">✕</span>
    </div>
    <div style="position: relative; flex: 1 1 auto; padding: 14px 16px; font-family: var(--term); font-size: 18px; line-height: 1.35; color: ${P.phosphore}; text-shadow: 0 0 6px rgba(134,214,138,.35);">
      ${ligne('TERMINAL DE SERVICE — BUREAU DES ENTRÉES', P.ambre)}
      ${ligne('poste EHB-0142 · 12 dossiers au registre', '#4a7d4d')}
      <div style="height: 14px;"></div>
      ${cmd('qui')}
      ${ligne('IDENTITÉ VÉRIFIÉE', P.ambre)}
      ${[['nom', 'Ayoub Ouaadoud'], ['poste', 'Développeur — iOS · Web · Back-end'], ['ville', 'Bruxelles, Belgique'],
         ['github', '<span style="color:' + P.ambre + '">github.com/AyoubO22</span>'],
         ['linkedin', '<span style="color:' + P.ambre + '">linkedin.com/in/ayoub-ouaadoud</span>']]
        .map(([k, v]) => `<div>  <span style="color: #4a7d4d;">${k.padEnd(10, ' ').replace(/ /g, '&nbsp;')}</span>${v}</div>`).join('')}
      <div style="height: 14px;"></div>
      ${cmd('dossiers')}
      ${[['01', 'gameboxd', 'GAMEBOXD — APPLICATION iOS'], ['02', 'pokemon', 'ENCYCLOPÉDIE POKÉMON — PLATEFORME WEB'],
         ['03', 'crm', 'SERVICE D\'INTÉGRATION CRM — BACK-END'], ['04', 'corplol', 'CORPLOL — APPLICATION BUREAU'],
         ['05', 'eylen', 'EYLEN KLINIEK — SITE CLIENT']]
        .map(([n, id, t]) => `<div>&nbsp;&nbsp;${n} &nbsp;<span style="color: #fff;">${id.padEnd(12, ' ').replace(/ /g, '&nbsp;')}</span><span style="color: #4a7d4d;">${t}</span></div>`).join('')}
      ${ligne('&nbsp;&nbsp;…', '#4a7d4d')}
      <div style="height: 14px;"></div>
      ${cmd('sudo')}
      ${ligne('inspecteur n\'est pas dans le fichier des sudoers.', '#d0554a')}
      ${ligne('Cet incident sera signalé au Ministère.', '#d0554a')}
      <div style="position: absolute; inset: 0; opacity: .5; pointer-events: none;" class="scan"></div>
    </div>
    <div style="display: flex; gap: 9px; align-items: center; padding: 9px 16px; border-top: 1px solid #2c5c30; background: #071009; font-family: var(--term); font-size: 18px;">
      <span style="color: #4a7d4d;">inspecteur@bureau:~$</span>
      <span style="color: ${P.phosphore};">ouvrir pokemon<span style="background: ${P.phosphore}; color: #050a06;">&nbsp;</span></span>
    </div>
  </div>
`)));

/* ============================================================ 6. ANOMALIES */
const anomalies = [
  [1, 'CODE DE SERVICE', '↑↑↓↓←→←→BA. Trente ans que ça ouvre des portes.'],
  [1, 'ABUS D\'AUTORITÉ', 'L\'inspecteur n\'est pas administrateur. Il ne l\'a jamais été.'],
  [0, null, 'Le bureau garde des choses pour l\'obscurité.'],
  [0, null, 'Personne ne l\'arrose. Elle est là depuis plus longtemps que vous.'],
  [0, null, 'Le slogan officiel n\'est pas gravé dans le marbre.'],
  [1, 'CONFLIT D\'INTÉRÊT', 'Se tamponner soi-même : la seule décision vraiment libre du poste.'],
  [0, null, 'Trois refus d\'affilée. Sans trembler.'],
  [0, null, 'Tout approuver, sans exception, jusqu\'au dernier dossier.'],
];
fs.writeFileSync('Anomalies.dc.html', doc('Anomalies', page(`
  ${fondAttenue}
  <div style="position: absolute; left: 50%; top: 50%; width: 640px; transform: translate(-50%,-50%); border: 3px solid ${P.metal}; background: ${P.betonOmbre}; box-shadow: 10px 10px 0 rgba(0,0,0,.6);">
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 11px 14px; border-bottom: 2px solid ${P.noir}; background: #14181a;">
      <span style="font-size: 11px; letter-spacing: .18em; color: ${P.ambre};">REGISTRE DES ANOMALIES</span>
      <span style="font-size: 12px; color: ${P.papierOmbre};">✕</span>
    </div>
    <div style="padding: 16px 18px 20px; display: flex; flex-direction: column; gap: 8px;">
      ${anomalies.map(([vu, nom, txt]) => `
      <div style="display: flex; gap: 12px; align-items: flex-start; padding: 10px 11px; border: 1px solid ${vu ? P.metalClair : '#2b312f'}; background: ${vu ? '#171d1c' : '#121616'};">
        <span style="font-size: 15px; line-height: 1; color: ${vu ? P.vert : '#39403d'};">${vu ? '◈' : '◇'}</span>
        <span style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 10px; letter-spacing: .04em; color: ${vu ? P.papier : '#454d4a'};">${vu ? nom : '??? ??? ???'}</span>
          <span style="font-family: var(--type); font-size: 11px; line-height: 1.5; color: ${vu ? P.papierOmbre : '#3d4441'};">${txt}</span>
        </span>
      </div>`).join('')}
      <div style="text-align: center; font-family: var(--type); font-size: 12px; color: ${P.papierOmbre}; padding-top: 8px;">3 / 8 anomalies enregistrées.</div>
    </div>
  </div>
`)));
console.log('3 artboards écrits');
