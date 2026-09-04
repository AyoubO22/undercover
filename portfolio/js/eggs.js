// ============================================================
//  SITE DE GRÂCE — SOUVENIRS (easter eggs)
// ------------------------------------------------------------
//  👉 POUR EN AJOUTER UN :
//     1. une entrée dans SOUVENIRS ci-dessous
//     2. un appel à EGGS.trouver("son-id") là où il se déclenche
//     Le compteur, le panneau et la sauvegarde suivent seuls.
// ============================================================

const SOUVENIRS = [
  {
    id: "sequence",
    nom: "SÉQUENCE OUBLIÉE",
    indice: "Une suite de touches que tout le monde connaît, et que personne n'a apprise.",
    secret: "↑↑↓↓←→←→BA. Trente ans qu'elle ouvre des portes.",
  },
  {
    id: "repos",
    nom: "REPOS PROLONGÉ",
    indice: "Le site de grâce ne demande rien. On peut y rester.",
    secret: "S'asseoir trois fois sans rien faire d'autre. C'est aussi une manière de visiter.",
  },
  {
    id: "archiviste",
    nom: "ARCHIVISTE",
    indice: "Un inventaire ne se parcourt pas : il s'examine, objet par objet.",
    secret: "Les dix objets ont été examinés. Peu de visiteurs vont jusqu'au bout.",
  },
  {
    id: "eloge",
    nom: "ÉLOGE",
    indice: "Un message laissé au sol attend d'être approuvé.",
    secret: "Merci. Les éloges ne servent à rien, et pourtant.",
  },
  {
    id: "attiser",
    nom: "ATTISER",
    indice: "La lueur réagit si l'on insiste.",
    secret: "Sept fois. La flamme monte, puis retombe. Elle fait cela depuis toujours.",
  },
  {
    id: "chute",
    nom: "LA CHUTE",
    indice: "Il y a un mot à taper que ce lieu n'attend pas.",
    secret: "Écrire « mourir » n'importe où. Tout le monde tombe une première fois.",
  },
  {
    id: "ascension",
    nom: "PAS DE PLUS",
    indice: "Un niveau se gagne. Ou se réclame.",
    secret: "Vingt-sept. Le suivant demandera un dépôt de plus.",
  },
  {
    id: "contemplation",
    nom: "CONTEMPLATION",
    indice: "Ne rien faire, assez longtemps pour que le lieu s'en aperçoive.",
    secret: "Deux minutes immobile au site de grâce. Le silence était voulu.",
  },
];

const EGGS = (() => {
  "use strict";

  const CLE = "grace.souvenirs";
  const abonnes = [];

  const charger = () => {
    try { return new Set(JSON.parse(localStorage.getItem(CLE)) || []); }
    catch { return new Set(); }
  };
  const trouves = charger();
  const sauver = () => {
    try { localStorage.setItem(CLE, JSON.stringify([...trouves])); } catch { /* navigation privée */ }
  };

  return {
    get total() { return SOUVENIRS.length; },
    get nombre() { return trouves.size; },
    connu(id) { return trouves.has(id); },
    liste() { return SOUVENIRS; },

    trouver(id) {
      const s = SOUVENIRS.find((x) => x.id === id);
      if (!s || trouves.has(id)) return false;
      trouves.add(id);
      sauver();
      abonnes.forEach((f) => f(s));
      return true;
    },

    surDecouverte(fn) { abonnes.push(fn); },
    effacer() { trouves.clear(); sauver(); },

    /** Konami + le mot « mourir », écoutés partout. */
    ecouter(surMort) {
      const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
                      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
      let i = 0, tampon = "";
      document.addEventListener("keydown", (e) => {
        const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        i = (k === konami[i]) ? i + 1 : (k === konami[0] ? 1 : 0);
        if (i === konami.length) { i = 0; EGGS.trouver("sequence"); }

        if (e.key.length === 1) {
          tampon = (tampon + e.key.toLowerCase()).slice(-8);
          if (tampon.includes("mourir")) {
            tampon = "";
            EGGS.trouver("chute");
            surMort && surMort();
          }
        }
      });
    },
  };
})();
