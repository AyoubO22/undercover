import fs from 'fs';
import { doc, BUSTS, PALETTE as P, ombre, rang, codeBarres, enTete, encre } from './lib.mjs';

const W = 1440, H = 900;
const page = (contenu, style = '') => `<div style="position: relative; width: ${W}px; height: ${H}px; overflow: hidden; ${style}">${contenu}</div>`;

// fond de scène atténué, pour les écrans en surimpression
const fondAttenue = `
  <div style="position: absolute; inset: 0;" class="mur"></div>
  <div style="position: absolute; left: 0; right: 0; top: 430px; bottom: 0; border-top: 3px solid ${P.noir};" class="bois"></div>
  <div style="position: absolute; left: 50%; top: 92px; width: 330px; height: 240px; transform: translateX(-50%); border: 5px solid ${P.metal}; background: #131a20;"></div>
  <div style="position: absolute; left: 66px; top: 480px; width: 236px; height: 250px; transform: rotate(-2deg); background: ${P.papier}; border: 2px solid rgba(23,21,15,.5);"></div>
  <div style="position: absolute; left: 342px; top: 506px; width: 246px; height: 240px; transform: rotate(1.6deg); background: ${P.papier}; border: 2px solid rgba(23,21,15,.5);"></div>
  <div style="position: absolute; right: 0; top: 430px; bottom: 0; width: 116px; border-left: 3px solid ${P.noir};" class="metal"></div>
  <div style="position: absolute; inset: 0; background: rgba(6,8,10,.82);"></div>`;

/* ============================================================ 1. AMORÇAGE */
const lignesBoot = [
  ['MINISTÈRE DE L\'ADMINISTRATION — TERMINAL DE POSTE', 'phos'],
  ['', ''],
  ['amorçage du poste frontalier .............. <b>OK</b>', 'phos'],
  ['vérification du tampon officiel ........... <b>OK</b>', 'phos'],
  ['chargement du registre des dossiers ....... <b>OK</b>', 'phos'],
  ['synchronisation avec la capitale .......... <s>ÉCHEC</s>', 'phos'],
  ['  &gt; le poste fonctionnera hors ligne.', 'dim'],
  ['', ''],
  ['affectation : <w>AYOUB OUAADOUD</w>', 'phos'],
  ['matricule   : EHB-0142', 'phos'],
  ['poste       : DÉVELOPPEUR — iOS · WEB · BACK-END', 'phos'],
  ['', ''],
  ['<b>L\'ORDRE PAR LE FORMULAIRE</b>', 'phos'],
];
const boot = lignesBoot.map(([t, k]) => `<div style="min-height: 26px; color: ${k === 'dim' ? '#4a7d4d' : P.phosphore};">${t
  .replace(/<b>/g, `<span style="color: ${P.ambre};">`).replace(/<\/b>/g, '</span>')
  .replace(/<s>/g, `<span style="color: #d0554a;">`).replace(/<\/s>/g, '</span>')
  .replace(/<w>/g, '<span style="color: #fff;">').replace(/<\/w>/g, '</span>')}</div>`).join('');

fs.writeFileSync('Amorcage.dc.html', doc('Amorcage', page(`
  <div style="position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 45%, #0b1410 0%, ${P.noir} 78%);"></div>
  <div style="position: absolute; left: 190px; top: 150px; width: 900px; font-family: var(--term); font-size: 21px; line-height: 1.28; text-shadow: 0 0 7px rgba(134,214,138,.4);">
    ${boot}
    <div style="margin-top: 34px; display: inline-block; background: ${P.phosphore}; color: ${P.noir}; padding: 7px 18px; font-family: var(--term); font-size: 23px;">&gt; APPUYEZ POUR PRENDRE VOTRE POSTE</div>
    <div style="margin-top: 16px; font-family: var(--pix); font-size: 9px; color: #3f6b42;">LE SON EST DÉSACTIVÉ — VOUS POURREZ L'ALLUMER EN HAUT À DROITE</div>
  </div>
  <div style="position: absolute; inset: 0; opacity: .55; pointer-events: none;" class="scan"></div>
`)));

/* ============================================================ 2. BRIEFING */
const consignes = [
  'Appelez un dossier avec le buzzer SUIVANT.',
  'Lisez les papiers : cliquez pour agrandir, glissez pour déplacer.',
  'Tamponnez APPROUVÉ ou REFUSÉ. Aucun verdict n\'est faux.',
  'RÈGLEMENT : profil, compétences, parcours, contact.',
  'TERMINAL : tapez « dossiers » pour tout voir d\'un coup.',
  'Des anomalies sont dissimulées dans ce bureau.',
];
fs.writeFileSync('Briefing.dc.html', doc('Briefing', page(`
  <div style="position: absolute; inset: 0; background: ${P.noir};"></div>
  <div style="position: absolute; left: 200px; top: 176px; width: 780px;">
    <div style="font-size: 12px; letter-spacing: .34em; color: ${P.ambre};">JOUR 1</div>
    <h1 style="margin: 14px 0 0; font-size: 62px; line-height: 1.02; letter-spacing: .01em; font-weight: 700;">BUREAU<br>DES ENTRÉES</h1>
    <div style="width: 108px; height: 4px; background: ${P.papier}; margin: 24px 0 26px;"></div>
    <p style="margin: 0 0 26px; font-family: var(--type); font-size: 17px; line-height: 1.65; color: ${P.papierOmbre}; max-width: 650px;">
      Poste de contrôle. Douze dossiers demandent leur entrée : applications iOS et macOS, plateformes web, services d'intégration, outils. Chacun présente ses papiers. À vous de les inspecter.</p>
    <ul style="list-style: none; margin: 0 0 38px; padding: 0; display: flex; flex-direction: column; gap: 4px;">
      ${consignes.map((c, i) => `<li style="display: flex; gap: 12px; align-items: baseline; font-size: 12px; line-height: 1.7; color: ${P.papierOmbre};">
        <span style="font-family: var(--term); font-size: 15px; color: ${P.rouge};">${String(i + 1).padStart(2, '0')}</span><span>${c}</span></li>`).join('')}
    </ul>
    <div style="display: inline-block; border: 2px solid ${P.papier}; background: ${P.papier}; color: ${P.noir}; padding: 12px 26px; font-size: 13px; font-weight: 700; letter-spacing: .06em; box-shadow: ${ombre(3)};">COMMENCER LE SERVICE</div>
  </div>
  <!-- cachet du ministère -->
  <div style="position: absolute; right: 168px; top: 300px; width: 250px; height: 250px; border: 5px double ${P.rouge}; border-radius: 50%; transform: rotate(-13deg); opacity: .5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: ${P.rouge};">
    <div style="font-size: 11px; letter-spacing: .2em;">MINISTÈRE DE</div>
    <div style="font-size: 20px; font-weight: 700; letter-spacing: .06em;">L'ADMIN.</div>
    <div style="width: 130px; height: 2px; background: ${P.rouge};"></div>
    <div style="font-family: var(--term); font-size: 17px;">DOSSIER 2026</div>
  </div>
  <div style="position: absolute; inset: 0; opacity: .4; pointer-events: none;" class="scan"></div>
`)));

/* ============================================================ 3. DOCUMENT AGRANDI */
fs.writeFileSync('DocumentAgrandi.dc.html', doc('DocumentAgrandi', page(`
  ${fondAttenue}
  <article style="position: absolute; left: 50%; top: 50%; width: 400px; transform: translate(-50%,-50%); padding: 16px 20px 20px; border: 3px solid rgba(23,21,15,.6); box-shadow: 10px 10px 0 rgba(0,0,0,.6);" class="papier">
    ${enTete('PASSEPORT', '51027-1')}
    <div style="display: flex; gap: 14px; align-items: flex-start; margin-bottom: 14px;">
      <div style="flex: 1 1 auto; min-width: 0;">
        <div style="font-size: 17px; font-weight: 700; line-height: 1.25;">GAMEBOXD</div>
        <div style="font-size: 9px; color: rgba(23,21,15,.62); margin-top: 6px; letter-spacing: .08em; line-height: 1.6;">APPLICATION iOS · SWIFTUI</div>
      </div>
      <div style="flex: 0 0 auto; width: 82px; height: 96px; border: 2px solid ${P.encre}; background: #8e8f7d; overflow: hidden;">
        <div style="width: 100%; height: 132%; margin-top: -8%;">${BUSTS.gameboxd}</div>
      </div>
    </div>
    ${rang('TYPE', 'App iOS native')}
    ${rang('LANGAGE', 'Swift 5 · SwiftUI')}
    ${rang('ARCHI.', 'MVVM')}
    ${rang('DONNÉES', 'API RAWG + local')}
    ${rang('EXTRAS', 'Widget · tests · CI')}
    ${rang('LANGUES', 'FR / EN')}
    ${rang('ANNÉE', '2026')}
    ${codeBarres(51027, 20)}
    ${encre('APPROUVÉ', '#1f7a37', -12, 'left: 42px; top: 210px;')}
  </article>
  <div style="position: absolute; left: 50%; bottom: 92px; transform: translateX(-50%); font-size: 10px; letter-spacing: .16em; color: rgba(214,207,182,.45);">ÉCHAP OU CLIC : REPOSER LE DOCUMENT</div>
`)));
console.log('3 artboards écrits');
