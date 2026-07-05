# 🕵️ Undercover — Dossier Secret

Le jeu **Undercover** à jouer entre potes sur **un seul téléphone**, avec vos propres mots et private jokes.

**▶ Jouer :** https://ayoubo22.github.io/undercover/

## Comment jouer

1. **Recrutement** — ajoutez les joueurs et choisissez le nombre d'Undercover et de Mr. White.
2. **Distribution** — chacun regarde sa carte en secret puis passe le téléphone.
3. **Débat** — dans l'ordre affiché, chacun décrit son mot sans le prononcer.
4. **Vote** — éliminez un suspect. Si c'est Mr. White, il peut tenter de deviner le mot des civils.
5. **Victoire** — les civils gagnent en éliminant tous les infiltrés ; les infiltrés gagnent en survivant.

## Ajouter des mots (private jokes)

Deux façons :

- **Dans l'app** : écran « Mots persos » → les paires sont sauvegardées sur le téléphone (localStorage).
- **Dans le code** : ajoutez une ligne `["mot civil", "mot undercover"]` dans [`js/words.js`](js/words.js).

## Stack

Zéro dépendance : HTML / CSS / JavaScript vanilla, hébergé sur GitHub Pages.

```
index.html      — les écrans du jeu
css/style.css   — thème « dossier top secret »
js/words.js     — les paires de mots (à enrichir !)
js/game.js      — toute la logique de jeu
```
