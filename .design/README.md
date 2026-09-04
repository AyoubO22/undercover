# Maquettes du Bureau des Entrées

Sources des maquettes visuelles du portfolio (`../portfolio/`). Le canevas publié
sert de référence pour la refonte : palette, échelle typographique, espacements,
états du tampon.

## Régénérer

```bash
node busts.mjs        # bustes SVG, tirés du moteur de ../portfolio/js/portraits.js
node gen-main.mjs     # l'écran principal
node gen-rest.mjs     # amorçage, briefing, document agrandi
node gen-rest2.mjs    # règlement, terminal, anomalies
node gen-rest3.mjs    # les deux écrans mobiles
node gen-specs.mjs    # planche des candidats + spécifications
```

Chaque script écrit un `*.dc.html` (un artboard). `canvas.json` place les
artboards sur le canevas et les répartit en trois pages.

## Fichiers

```
lib.mjs        palette, briques communes (papier, code-barres, encre, trombone)
gen-*.mjs      un script par groupe d'artboards
canvas.json    mise en page du canevas : positions, pages, vue d'ouverture
busts.mjs      génère busts.json depuis le vrai moteur de portraits
```

Les `*.dc.html`, `busts.json` et le fichier de canevas assemblé ne sont pas
versionnés : ce sont des sorties.

## Palette de référence

| ton | hex | usage |
|---|---|---|
| noir | `#06080a` | fond d'écran, bordures fortes |
| béton-ombre | `#1a1e1d` | bas du mur, panneaux |
| béton | `#2c3230` | mur du guichet |
| métal | `#3c4340` | encadrements, colonne d'outils |
| métal-clair | `#565e59` | arêtes éclairées |
| bois | `#4a3f33` | plateau du bureau |
| bois-ombre | `#2c251d` | bas du bureau |
| buvard | `#2f4034` | sous-main |
| papier | `#d6cfb6` | documents |
| papier-ombre | `#b3ab8b` | texte secondaire, usure |
| encre | `#17150f` | texte imprimé, bordures des papiers |
| ambre | `#d9a441` | chiffres, accents d'interface |
| tampon-vert | `#2f7d3f` | APPROUVÉ |
| tampon-rouge | `#a8271b` | REFUSÉ |
| phosphore | `#86d68a` | terminal CRT |

Règles : aucun rayon d'arrondi, aucune ombre floue, bordures de 2 px, ombres
décalées à 45° (3 px au repos, 6 px saisi, 10 px panneau ouvert).
