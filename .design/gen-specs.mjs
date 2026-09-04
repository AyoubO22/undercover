import fs from 'fs';
import { doc, BUSTS, PALETTE as P, ombre, encre } from './lib.mjs';

// on lit les vraies palettes du moteur de portraits, pour que le nuancier ne mente pas
const src = fs.readFileSync('/home/user/undercover/portfolio/js/portraits.js', 'utf8');
const lire = (nom) => eval(src.match(new RegExp("const " + nom + " = (\\[[\\s\\S]*?\\]);"))[1]);
const PEAU = lire('PEAU'), CHEVEU = lire('CHEVEU'), TISSU = lire('TISSU'), ACCENT = lire('ACCENT');

/* ============================================================ PERSONNAGES */
const cadre = (svg, nom, sous) => `
  <div style="width: 208px;">
    <div style="border: 4px solid ${P.metal}; box-shadow: ${ombre(3)};">
      <div style="position: relative; width: 200px; height: 152px; overflow: hidden; background: linear-gradient(180deg, #0e1319 0%, #1c242b 68%, #0e1319 100%);">
        <div style="position: absolute; inset: 0; background: linear-gradient(114deg, rgba(255,255,255,.07) 0 20%, transparent 20% 40%); z-index: 3;"></div>
        <div style="position: absolute; left: 50%; bottom: -12px; width: 122px; height: 146px; transform: translateX(-50%);">${svg}</div>
      </div>
      <div style="height: 10px; border-top: 2px solid ${P.noir};" class="metal"></div>
    </div>
    <div style="margin-top: 9px; font-size: 9px; letter-spacing: .06em;">${nom}</div>
    <div style="margin-top: 3px; font-family: var(--term); font-size: 13px; color: rgba(214,207,182,.5);">${sous}</div>
  </div>`;

const nuance = (titre, palettes) => `
  <div style="margin-bottom: 18px;">
    <div style="font-size: 8px; letter-spacing: .16em; color: rgba(214,207,182,.5); margin-bottom: 7px;">${titre}</div>
    <div style="display: flex; gap: 10px;">
      ${palettes.map(t => `<div style="display: flex; border: 2px solid ${P.noir};">
        ${t.map(c => `<div style="width: 22px; height: 22px; background: ${c};"></div>`).join('')}
      </div>`).join('')}
    </div>
  </div>`;

fs.writeFileSync('Personnages.dc.html', doc('Personnages', `
<div style="position: relative; width: 1440px; height: 1000px; overflow: hidden; padding: 42px 48px;" class="mur">
  <div style="font-size: 20px; letter-spacing: .1em; font-weight: 700;">PLANCHE DES CANDIDATS</div>
  <div style="margin-top: 8px; font-family: var(--type); font-size: 14px; color: ${P.papierOmbre}; max-width: 860px;">
    Bustes de 40 × 48 pixels, construits au code puis ombrés : un pixel dont le voisin du haut ou de droite est vide s'éclaire, celui dont le voisin de gauche est vide s'assombrit. Une graine donne toujours le même visage. Aucune image n'est chargée.</div>
  <div style="width: 88px; height: 3px; background: ${P.rouge}; margin: 20px 0 26px;"></div>

  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    ${cadre(BUSTS.gameboxd, 'GAMEBOXD', 'graine 51027')}
    ${cadre(BUSTS.pokemon, 'ENCYCLOPÉDIE POKÉMON', 'graine 25025')}
    ${cadre(BUSTS.crm, 'SERVICE D\'INTÉGRATION CRM', 'graine 8801')}
    ${cadre(BUSTS.corplol, 'CORPLOL', 'graine 4400')}
    ${cadre(BUSTS.eylen, 'EYLEN KLINIEK', 'graine 6031')}
    ${cadre(BUSTS.sanzo, 'SANZO OUTFIT MATCHER', 'graine 15948')}
    ${cadre(BUSTS.recrutement, 'PLATEFORME RECRUTEMENT', 'graine 7212')}
    ${cadre(BUSTS.undercover, 'UNDERCOVER', 'graine 1337')}
  </div>

  <div style="display: flex; gap: 40px; margin-top: 38px;">
    <div>
      ${nuance('TEINTS — OMBRE · BASE · LUMIÈRE', PEAU)}
      ${nuance('CHEVEUX', CHEVEU)}
    </div>
    <div>
      ${nuance('VÊTEMENTS', TISSU)}
      ${nuance('ACCENTS — CRAVATE, ÉCHARPE, COIFFE', ACCENT)}
    </div>
    <div style="flex: 0 0 300px; border-left: 2px solid ${P.metal}; padding-left: 22px;">
      <div style="font-size: 8px; letter-spacing: .16em; color: rgba(214,207,182,.5); margin-bottom: 9px;">VARIABLES DU GÉNÉRATEUR</div>
      ${[['coiffe', '6 valeurs — court, rasé, long, casquette, bonnet, foulard'],
         ['lunettes', 'aucune, monture fine, monture épaisse'],
         ['pilosité', 'aucune, moustache, barbe, bouc'],
         ['col', 'cravate, écharpe, ou rien'],
         ['humeur', 'neutre, fermé, las'],
         ['animation', 'clignement aléatoire, respiration d\'un pixel']].map(([k, v]) =>
        `<div style="display: flex; gap: 10px; padding: 5px 0; border-bottom: 1px dotted rgba(214,207,182,.16);">
          <span style="flex: 0 0 74px; font-size: 8px; color: rgba(214,207,182,.5);">${k}</span>
          <span style="flex: 1 1 auto; font-family: var(--type); font-size: 12px; color: ${P.papierOmbre};">${v}</span></div>`).join('')}
    </div>
  </div>
</div>`));

/* ============================================================ SPÉCIFICATIONS */
const NOMS = [
  ['noir', P.noir, 'fond d\'écran, bordures fortes'],
  ['béton-ombre', P.betonOmbre, 'bas du mur, panneaux'],
  ['béton', P.beton, 'mur du guichet'],
  ['métal', P.metal, 'encadrements, colonne d\'outils'],
  ['métal-clair', P.metalClair, 'arêtes éclairées'],
  ['bois', P.bois, 'plateau du bureau'],
  ['bois-ombre', P.boisOmbre, 'bas du bureau'],
  ['buvard', P.buvard, 'sous-main'],
  ['papier', P.papier, 'documents'],
  ['papier-ombre', P.papierOmbre, 'texte secondaire, usure'],
  ['encre', P.encre, 'texte imprimé, bordures des papiers'],
  ['ambre', P.ambre, 'chiffres, accents d\'interface'],
];
const swatch = ([nom, hex, usage]) => `
  <div style="width: 176px;">
    <div style="height: 62px; background: ${hex}; border: 2px solid ${P.noir}; box-shadow: ${ombre(3)};"></div>
    <div style="margin-top: 8px; font-size: 9px; letter-spacing: .04em;">${nom.toUpperCase()}</div>
    <div style="font-family: var(--term); font-size: 14px; color: ${P.ambre};">${hex}</div>
    <div style="font-family: var(--type); font-size: 11px; color: rgba(214,207,182,.5); line-height: 1.4; margin-top: 2px;">${usage}</div>
  </div>`;

const titreSection = (t) => `<div style="font-size: 11px; letter-spacing: .2em; color: ${P.ambre}; margin: 0 0 4px;">${t}</div>
  <div style="height: 2px; background: ${P.metal}; margin-bottom: 20px;"></div>`;

const echelle = (police, varName, lignes) => `
  <div style="flex: 1 1 0;">
    <div style="font-size: 9px; letter-spacing: .1em; color: rgba(214,207,182,.55); margin-bottom: 4px;">${police}</div>
    <div style="font-family: var(--term); font-size: 12px; color: ${P.ambre}; margin-bottom: 12px;">${varName}</div>
    ${lignes.map(([px, role, exemple, style]) => `
      <div style="display: flex; align-items: baseline; gap: 12px; padding: 7px 0; border-bottom: 1px dotted rgba(214,207,182,.14);">
        <span style="flex: 0 0 30px; font-family: var(--term); font-size: 13px; color: rgba(214,207,182,.45);">${px}</span>
        <span style="flex: 0 0 96px; font-size: 8px; color: rgba(214,207,182,.45);">${role}</span>
        <span style="flex: 1 1 auto; ${style}">${exemple}</span>
      </div>`).join('')}
  </div>`;

const etatTampon = (titre, desc, contenu) => `
  <div style="flex: 1 1 0;">
    <div style="height: 168px; border: 2px solid ${P.metal}; background: ${P.betonOmbre}; position: relative; overflow: hidden;">${contenu}</div>
    <div style="margin-top: 10px; font-size: 9px; letter-spacing: .06em;">${titre}</div>
    <div style="font-family: var(--type); font-size: 12px; color: rgba(214,207,182,.55); line-height: 1.5; margin-top: 3px;">${desc}</div>
  </div>`;

fs.writeFileSync('Specs.dc.html', doc('Specs', `
<div style="position: relative; width: 1440px; height: 1320px; overflow: hidden; padding: 42px 48px 48px; background: ${P.betonOmbre};">
  <div style="font-size: 20px; letter-spacing: .1em; font-weight: 700;">SPÉCIFICATIONS</div>
  <div style="margin-top: 8px; font-family: var(--type); font-size: 14px; color: ${P.papierOmbre};">Valeurs à reprendre telles quelles dans la feuille de style. Tout est reproductible sans une seule image.</div>
  <div style="width: 88px; height: 3px; background: ${P.rouge}; margin: 20px 0 30px;"></div>

  ${titreSection('PALETTE — 12 TONS')}
  <div style="display: flex; flex-wrap: wrap; gap: 26px 32px; margin-bottom: 42px;">
    ${NOMS.map(swatch).join('')}
  </div>

  ${titreSection('ENCRES DE TAMPON ET PHOSPHORE')}
  <div style="display: flex; gap: 32px; margin-bottom: 42px;">
    ${[['tampon-vert', P.vert, 'APPROUVÉ'], ['tampon-rouge', P.rouge, 'REFUSÉ'], ['phosphore', P.phosphore, 'TERMINAL CRT']].map(([n, h, u]) => `
      <div style="width: 176px;">
        <div style="height: 62px; background: ${h}; border: 2px solid ${P.noir}; box-shadow: ${ombre(3)};" class="trame"></div>
        <div style="margin-top: 8px; font-size: 9px;">${n.toUpperCase()}</div>
        <div style="font-family: var(--term); font-size: 14px; color: ${P.ambre};">${h}</div>
        <div style="font-family: var(--type); font-size: 11px; color: rgba(214,207,182,.5); margin-top: 2px;">${u}</div>
      </div>`).join('')}
    <div style="flex: 1 1 auto; max-width: 460px; border-left: 2px solid ${P.metal}; padding-left: 24px; font-family: var(--type); font-size: 13px; line-height: 1.6; color: ${P.papierOmbre};">
      L'encre appliquée passe en <span style="color: ${P.papier};">mix-blend-mode: multiply</span> à 0,86 d'opacité : elle prend la fibre du papier au lieu de flotter dessus. Le vert et le rouge ne servent jamais de fond d'interface — uniquement de tampon.</div>
  </div>

  ${titreSection('ÉCHELLE TYPOGRAPHIQUE')}
  <div style="display: flex; gap: 40px; margin-bottom: 42px;">
    ${echelle('SILKSCREEN — INTERFACE, TOUT EN MAJUSCULES', '--pix', [
      ['7', 'micro-légende', 'AFF. 07-B', 'font-size: 7px; letter-spacing: .12em;'],
      ['9', 'barre d\'état, outils', 'BUREAU DES ENTRÉES', 'font-size: 9px; letter-spacing: .1em;'],
      ['12', 'titre de document', 'RAPPORT D\'INSPECTION', 'font-size: 12px; font-weight: 700;'],
      ['20', 'titre de section', 'SPÉCIFICATIONS', 'font-size: 20px; font-weight: 700;'],
      ['34', 'titre de briefing', 'JOUR 1', 'font-size: 34px; font-weight: 700;'],
    ])}
    ${echelle('VT323 — VALEURS, CHIFFRES, TERMINAL', '--term', [
      ['13', 'valeur de champ', 'Swift 5 · SwiftUI', 'font-family: var(--term); font-size: 13px;'],
      ['15', 'passeport agrandi', 'API RAWG + local', 'font-family: var(--term); font-size: 15px;'],
      ['18', 'terminal', 'inspecteur@bureau:~$', 'font-family: var(--term); font-size: 18px; color: ' + P.phosphore + ';'],
      ['34', 'compteur de file', '11', 'font-family: var(--term); font-size: 34px; color: ' + P.ambre + ';'],
    ])}
    ${echelle('SPECIAL ELITE — RÉPLIQUES ET CORPS DE NOTE', '--type', [
      ['12', 'corps de note', 'Le projet est découpé proprement.', 'font-family: var(--type); font-size: 12px;'],
      ['14', 'paragraphe', 'Poste de contrôle. Douze dossiers.', 'font-family: var(--type); font-size: 14px;'],
      ['16', 'réplique au guichet', 'Je viens pour l\'entrée.', 'font-family: var(--type); font-size: 16px;'],
    ])}
  </div>

  <div style="font-family: var(--type); font-size: 13px; color: rgba(214,207,182,.55); margin: -24px 0 42px;">Une seule taille dépasse cette échelle : le titre plein écran du briefing, à 62 px.</div>

  ${titreSection('ESPACEMENTS, BORDURES, OMBRES')}
  <div style="display: flex; gap: 48px; margin-bottom: 42px;">
    <div>
      <div style="font-size: 9px; color: rgba(214,207,182,.55); margin-bottom: 12px;">PAS D'ESPACEMENT (PIXELS PAIRS)</div>
      <div style="display: flex; align-items: flex-end; gap: 10px;">
        ${[2, 4, 6, 8, 12, 16, 22, 32].map(n => `<div style="text-align: center;">
          <div style="width: ${n < 6 ? 12 : n}px; height: ${n}px; background: ${P.ambre};"></div>
          <div style="font-family: var(--term); font-size: 12px; color: rgba(214,207,182,.5); margin-top: 6px;">${n}</div></div>`).join('')}
      </div>
    </div>
    <div style="border-left: 2px solid ${P.metal}; padding-left: 32px;">
      <div style="font-size: 9px; color: rgba(214,207,182,.55); margin-bottom: 12px;">BORDURES ET OMBRES</div>
      <div style="display: flex; gap: 20px;">
        ${[['2px', '2px solid', 'papiers, panneaux', `border: 2px solid ${P.encre};`],
           ['3px', '3px solid', 'cadres majeurs', `border: 3px solid ${P.encre};`],
           ['4px double', '4px double', 'encre de tampon', `border: 4px double ${P.vert};`]].map(([t, , u, st]) => `
          <div style="text-align: center;">
            <div style="width: 92px; height: 58px; ${st} background: ${P.papier};"></div>
            <div style="font-family: var(--term); font-size: 13px; color: ${P.ambre}; margin-top: 7px;">${t}</div>
            <div style="font-size: 7px; color: rgba(214,207,182,.45); margin-top: 3px;">${u}</div></div>`).join('')}
        ${[['3px 3px 0', 'au repos'], ['6px 6px 0', 'saisi'], ['10px 10px 0', 'panneau ouvert']].map(([o, u]) => `
          <div style="text-align: center;">
            <div style="width: 92px; height: 58px; background: ${P.papier}; border: 2px solid ${P.encre}; box-shadow: ${o} rgba(0,0,0,.55);"></div>
            <div style="font-family: var(--term); font-size: 13px; color: ${P.ambre}; margin-top: 7px;">${o}</div>
            <div style="font-size: 7px; color: rgba(214,207,182,.45); margin-top: 3px;">${u}</div></div>`).join('')}
      </div>
      <div style="font-family: var(--type); font-size: 12px; color: rgba(214,207,182,.5); margin-top: 14px;">Aucun flou, aucun rayon d'arrondi. Les ombres sont décalées en diagonale, à 45°.</div>
    </div>
  </div>

  ${titreSection('LES TROIS ÉTATS DU TAMPON')}
  <div style="display: flex; gap: 32px;">
    ${etatTampon('AU REPOS', 'Posé sur son socle, dans la colonne d\'outils. Manche en bois tramé, ombre de 3 px.', `
      <div style="position: absolute; left: 50%; top: 28px; transform: translateX(-50%);">
        <div style="width: 30px; height: 15px; margin: 0 auto; background: #7d6444; border: 2px solid ${P.noir};"></div>
        <div style="width: 62px; height: 16px; margin: 0 auto; background: #6b5539; border: 2px solid ${P.noir}; clip-path: polygon(14% 0, 86% 0, 100% 100%, 0 100%);"></div>
        <div style="width: 92px; height: 46px; margin: 0 auto; border: 2px solid ${P.noir}; background: ${P.vert}; box-shadow: ${ombre(3)}; display: flex; align-items: center; justify-content: center;" class="trame">
          <span style="font-size: 10px; font-weight: 700; color: #fff;">APPROUVÉ</span></div>
      </div>`)}
    ${etatTampon('EN MAIN', 'Le tampon suit le curseur : contour tireté ambre, ombre portée à 6 px, le reste du bureau se fige.', `
      <div style="position: absolute; left: 50%; top: 52px; transform: translate(-50%,0) rotate(-4deg); border: 3px solid ${P.vert}; background: rgba(47,125,63,.25);
          color: ${P.vert}; padding: 10px 18px; font-size: 14px; font-weight: 700; letter-spacing: .06em; outline: 2px dashed ${P.ambre}; outline-offset: 4px; box-shadow: 6px 6px 0 rgba(0,0,0,.5);">APPROUVÉ</div>
      <svg viewBox="0 0 16 20" width="18" height="23" style="position: absolute; left: 62%; top: 104px;"><path d="M1 1 L1 15 L5 11 L8 18 L11 17 L8 10 L13 10 Z" fill="${P.papier}" stroke="${P.noir}" stroke-width="1.5" shape-rendering="crispEdges"/></svg>`)}
    ${etatTampon('ENCRE APPLIQUÉE', 'Frappe là où l\'on clique : rotation aléatoire, double bordure de 4 px, fondu multiply à 0,86 sur la fibre du papier.', `
      <div style="position: absolute; inset: 16px; border: 2px solid rgba(23,21,15,.5);" class="papier"></div>
      <div style="position: absolute; left: 34px; top: 34px; right: 34px; font-size: 8px; color: rgba(23,21,15,.5);">PASSEPORT</div>
      ${encre('APPROUVÉ', '#1f7a37', -12, 'left: 44px; top: 62px;')}`)}
  </div>
</div>`));
console.log('Personnages + Specs écrits');
