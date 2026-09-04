# Portfolio — quatre mondes

Le même travail, présenté dans quatre directions artistiques.
**Dix projets réels**, les mêmes faits et les mêmes liens dans chaque version :
seuls la métaphore et l'habillage changent.

**▶ Comparer les quatre :** https://ayoubo22.github.io/undercover/portfolio/

| Monde | Dossier | Le principe |
|---|---|---|
| **Site de Grâce** | [`grace/`](grace/) | Dark fantasy. Une lueur qui brûle dans le noir, un inventaire de dix objets, une description d'objet pour chacun. |
| **La Faille** | [`faille/`](faille/) | Hextech. Chaque projet est un champion : un titre, des rôles, cinq sorts, des statistiques, et un bouton VERROUILLER. |
| **La Séance** | [`cinema/`](cinema/) | Filmographie. Dix affiches composées au code, une fiche technique par film, un générique de fin qui défile. |
| **Épisodes** | [`anime/`](anime/) | Papier clair, aplats francs, trames de points. Chaque projet est un épisode avec son image-clé et sa transition. |

## Choisir

Chaque dossier est **autonome** : il contient son `index.html`, son style et ses scripts,
et ne dépend d'aucun fichier partagé.

Pour n'en garder qu'un :

1. supprimez les trois autres dossiers ;
2. remontez le contenu du dossier retenu d'un niveau (ou laissez-le où il est
   et pointez le lien vers `portfolio/<monde>/`) ;
3. adaptez cette page d'accueil, ou remplacez-la par le monde choisi.

## Modifier le contenu

Dans chaque monde, **tout le contenu tient dans `js/data.js`** — c'est le seul
fichier à toucher pour ajouter un projet, changer un texte ou une compétence.
Les noms des tableaux suivent la métaphore du monde :

| Monde | Le tableau des projets | Le reste |
|---|---|---|
| `grace/` | `INVENTAIRE` | `ATTRIBUTS`, `CHRONIQUE`, `MISSIVES` |
| `faille/` | `CHAMPIONS` | `MAITRISES`, `HISTORIQUE` |
| `cinema/` | `FILMS` | `COMPETENCES`, `PARCOURS` |
| `anime/` | `EPISODES` | `PERSONNAGE.capacites`, `ANNEES` |

## Points communs aux quatre

- **Aucune image n'est chargée.** Emblèmes, sceaux, affiches et vignettes sont
  composés au code à partir d'une graine ; les lueurs, grains et trames sont du CSS
  ou du canvas.
- **Aucune librairie.** HTML, CSS et JavaScript purs.
- Adapté au mobile, et `prefers-reduced-motion` respecté.
- `grace/` ajoute des bruitages synthétisés en WebAudio et un registre de huit
  secrets ; les trois autres n'ont pas encore le leur — il sera développé pour
  le monde retenu.
