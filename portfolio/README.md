# 🛂 Bureau des Entrées — portfolio interactif

Un portfolio jouable : vous êtes l'inspecteur d'un poste-frontière, et **chaque projet est un candidat qui présente ses papiers**. Vous lisez ses documents, vous les déplacez sur le bureau, vous tamponnez APPROUVÉ ou REFUSÉ.

**▶ Ouvrir :** https://ayoubo22.github.io/undercover/portfolio/

Esthétique inspirée des jeux de poste-frontière ; mise en scène inspirée des portfolios-scènes interactifs.

---

## Ce qu'il y a dedans

| | |
|---|---|
| **Amorçage** | séquence de démarrage CRT, puis briefing du jour |
| **Guichet** | les candidats arrivent, parlent, et posent leurs papiers |
| **Bureau** | documents déplaçables, agrandissables, tamponnables |
| **Règlement** | profil, compétences, parcours, contact |
| **Terminal** | commandes (`aide`, `dossiers`, `ouvrir <id>`, `competences`…) — toutes ne sont pas documentées |
| **Anomalies** | easter eggs cachés, avec registre de progression |

Aucune librairie, aucune image, aucun fichier son : les visages sont du pixel art
dessiné au code, les bruitages sont synthétisés en WebAudio.

---

## Modifier le contenu

**Tout le contenu tient dans [`js/data.js`](js/data.js).** Le reste n'a pas besoin d'être touché.

### Ajouter un projet

Ajoutez un objet dans le tableau `DOSSIERS` — il se présentera tout seul au guichet,
avec son propre visage généré à partir de sa graine :

```js
{
  id: "mon-projet",              // identifiant unique, sans espace
  nom: "MON PROJET",
  type: "APPLICATION WEB",
  graine: 4242,                  // n'importe quel nombre → un visage différent
  repliques: [
    "Ce que le candidat dit en arrivant.",
    "Une deuxième phrase.",
  ],
  docs: [
    { kind: "passeport", titre: "MON PROJET", sous: "SOUS-TITRE", photo: true,
      champs: [["TYPE", "Site web"], ["STACK", "React"]] },
    { kind: "note", titre: "RAPPORT", texte: "Un paragraphe.",
      points: ["un point", "un autre"] },
    { kind: "permis", titre: "AUTORISATION D'ACCÈS", texte: "…",
      liens: [{ label: "CODE SOURCE", url: "https://…" }] },
  ],
  oui: "réplique s'il est approuvé",
  non: "réplique s'il est refusé",
}
```

### Ajouter un easter egg

1. Une entrée dans `ANOMALIES` ([`js/eggs.js`](js/eggs.js)) : `id`, `nom`, `indice`, `secret`.
2. Un appel à `EGGS.trouver("son-id")` là où il doit se déclencher — un clic,
   une commande du terminal, une combinaison de touches.

Le compteur, le panneau et la sauvegarde suivent tout seuls.

### Ajouter une commande au terminal

Une entrée dans `COMMANDES` ([`js/terminal.js`](js/terminal.js)) :
`{ aide: "description" | null si cachée, run(args) { … } }`.

---

## Fichiers

```
index.html          les écrans (amorçage, briefing, poste)
css/portfolio.css   tout le style
js/data.js          ← LE CONTENU : projets, règlement, identité
js/portraits.js     bustes en pixel art (ombrage, clignement, respiration)
js/desk.js          file d'attente, papiers, glisser-déposer, tampons
js/terminal.js      terminal et ses commandes
js/eggs.js          registre des anomalies
js/audio.js         bruitages synthétisés (WebAudio)
js/main.js          amorçage, HUD, règlement, panneaux
```
