# ✦ Site de Grâce — portfolio interactif

Un portfolio en forme de halte : une lueur qui brûle dans le noir, un menu gravé,
et un **inventaire de dix objets** — chaque projet est une pièce que l'on examine,
avec son sceau, sa description et ses effets.

**▶ Ouvrir :** https://ayoubo22.github.io/undercover/portfolio/

Hommage à l'esthétique des jeux d'action-RPG en monde sombre — jamais une copie
de leurs marques ni de leurs ressources : tout est dessiné ici.

---

## Ce qu'il y a dedans

| | |
|---|---|
| **Site de grâce** | la halte : lueur animée, menu, et la possibilité de simplement se reposer |
| **Inventaire** | dix objets à examiner — sceau, rareté, description, effets, liens |
| **Attributs** | ce que je sais faire, en jauges |
| **Chronique** | ce qui a précédé, année par année |
| **Missives** | messages laissés au sol : courriel, GitHub, LinkedIn |
| **Souvenirs** | huit secrets cachés dans le lieu, avec leur registre |

Aucune librairie, aucune image, aucun fichier son : les sceaux sont du dessin
vectoriel généré au code, les braises et la lueur sont peintes sur canvas, et les
bruitages sont synthétisés en WebAudio.

Navigation complète au clavier : flèches, Entrée, Échap.

---

## Modifier le contenu

**Tout tient dans [`js/data.js`](js/data.js).** Le reste n'a pas besoin d'être touché.

### Ajouter un projet

Un objet de plus dans le tableau `INVENTAIRE` — il apparaît dans les casiers avec
son propre sceau, tiré de sa graine :

```js
{
  id: "mon-projet",
  nom: "NOM DE L'OBJET",
  type: "Application web · React",
  graine: 4242,            // n'importe quel nombre → un sceau différent
  rarete: 2,               // 1 à 3 — 3 pour une pièce maîtresse
  poids: "12 écrans",      // ce que vous voulez : taille, durée, portée
  annee: "2026",
  description: "Une phrase qui dit ce que la chose est, sans énumérer.",
  effets: [
    "Un fait technique",
    "Un autre",
  ],
  liens: [{ label: "CODE SOURCE", url: "https://…" }],
}
```

La `description` est le cœur du format : elle doit être évocatrice **et** vraie.
Les `effets` portent les faits — c'est là que vont les chiffres et les noms de
technologies.

### Ajouter un souvenir (easter egg)

1. Une entrée dans `SOUVENIRS` ([`js/eggs.js`](js/eggs.js)) : `id`, `nom`, `indice`, `secret`.
2. Un appel à `EGGS.trouver("son-id")` là où il doit se déclencher.

Le compteur, le registre et la sauvegarde suivent tout seuls.

### Changer les attributs, la chronique, les missives

Les tableaux `ATTRIBUTS`, `MEMOIRE`, `CHRONIQUE` et `MISSIVES`, toujours dans
`js/data.js`.

---

## Fichiers

```
index.html          les écrans
css/portfolio.css   tout le style
js/data.js          ← LE CONTENU : objets, attributs, chronique, missives
js/sigils.js        sceaux héraldiques générés depuis une graine
js/ambiance.js      braises et lueur du site de grâce (canvas)
js/audio.js         cloches et souffles synthétisés (WebAudio)
js/eggs.js          registre des souvenirs
js/ui.js            écrans, inventaire, fiches, clavier
js/main.js          mise en marche et branchements
```
