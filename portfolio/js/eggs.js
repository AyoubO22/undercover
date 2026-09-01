// ============================================================
//  BUREAU — REGISTRE DES ANOMALIES (easter eggs)
// ------------------------------------------------------------
//  👉 POUR AJOUTER UN EASTER EGG :
//     1. ajoute une entrée dans ANOMALIES ci-dessous
//     2. appelle EGGS.trouver("son-id") où tu veux dans le code
//        (un clic, une commande du terminal, une combinaison…)
//     Le reste — compteur, panneau, sauvegarde — est automatique.
// ============================================================

const ANOMALIES = [
  {
    id: "konami",
    nom: "CODE DE SERVICE",
    indice: "Une vieille séquence de manette. Elle marche partout, même ici.",
    secret: "↑↑↓↓←→←→BA. Trente ans que ça ouvre des portes.",
  },
  {
    id: "sudo",
    nom: "ABUS D'AUTORITÉ",
    indice: "Le terminal n'aime pas qu'on lui parle de haut.",
    secret: "L'inspecteur n'est pas administrateur. L'inspecteur n'a jamais été administrateur.",
  },
  {
    id: "nuit",
    nom: "COUPURE DE COURANT",
    indice: "Le bureau garde des choses pour l'obscurité.",
    secret: "Quelqu'un a écrit sous la lampe, en encre invisible. Il fallait éteindre.",
  },
  {
    id: "plante",
    nom: "LA PLANTE DU BUREAU",
    indice: "Personne ne l'arrose. Elle est là depuis plus longtemps que vous.",
    secret: "Elle est en plastique. Elle vous a vu tamponner toute la journée.",
  },
  {
    id: "affiche",
    nom: "PROPAGANDE MURALE",
    indice: "Le slogan officiel n'est pas gravé dans le marbre.",
    secret: "Les slogans changent. Le mur, lui, reste.",
  },
  {
    id: "auto-tampon",
    nom: "CONFLIT D'INTÉRÊT",
    indice: "Contrôler tout le monde, y compris soi-même.",
    secret: "Se tamponner soi-même : la seule décision vraiment libre du poste.",
  },
  {
    id: "impitoyable",
    nom: "L'INSPECTEUR DE FER",
    indice: "Trois refus d'affilée. Sans trembler.",
    secret: "Le bureau vous félicite. Personne d'autre ne le fera.",
  },
  {
    id: "zele",
    nom: "EXCÈS DE ZÈLE",
    indice: "Tout approuver, sans exception, jusqu'au dernier dossier.",
    secret: "Un inspecteur qui approuve tout n'inspecte rien. Mais quelle journée agréable.",
  },
];

const EGGS = (() => {
  "use strict";

  const CLE = "bureau.anomalies";
  const abonnes = [];

  const charger = () => {
    try { return new Set(JSON.parse(localStorage.getItem(CLE)) || []); }
    catch { return new Set(); }
  };
  const trouvees = charger();

  const sauver = () => {
    try { localStorage.setItem(CLE, JSON.stringify([...trouvees])); } catch { /* mode privé */ }
  };

  return {
    get total() { return ANOMALIES.length; },
    get nombre() { return trouvees.size; },
    connue(id) { return trouvees.has(id); },
    liste() { return ANOMALIES; },

    /** Déclenche une anomalie. Sans effet si déjà trouvée. */
    trouver(id) {
      const a = ANOMALIES.find((x) => x.id === id);
      if (!a || trouvees.has(id)) return false;
      trouvees.add(id);
      sauver();
      abonnes.forEach((f) => f(a));
      return true;
    },

    /** Prévenu à chaque nouvelle anomalie : EGGS.surDecouverte(a => ...) */
    surDecouverte(fn) { abonnes.push(fn); },

    effacer() { trouvees.clear(); sauver(); },

    /** Surveille la séquence Konami sur tout le document. */
    ecouterKonami() {
      const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
                   "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
      let i = 0;
      document.addEventListener("keydown", (e) => {
        const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        i = (k === seq[i]) ? i + 1 : (k === seq[0] ? 1 : 0);
        if (i === seq.length) { i = 0; EGGS.trouver("konami"); }
      });
    },
  };
})();
