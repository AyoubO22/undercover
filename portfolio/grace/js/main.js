// ============================================================
//  SITE DE GRÂCE — MISE EN MARCHE
// ============================================================

(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  let repos = 0;         // fois où l'on s'est reposé
  let attises = 0;       // fois où la lueur a été attisée
  let immobile = null;   // minuteur de contemplation

  /* ---------- entrée dans le lieu ---------- */
  const entrer = () => {
    const ouverture = $("#ecran-ouverture");
    ouverture.classList.add("sortant");
    document.body.classList.remove("ouverture");
    document.body.classList.add("halte");
    setTimeout(() => {
      ouverture.classList.remove("active", "sortant");
      ouverture.hidden = true;
      $("#jeu").hidden = false;
      requestAnimationFrame(() => AMBIANCE.grace($("#lueur")));
      veiller();
    }, 900);
  };

  /* ---------- contemplation ---------- */
  const veiller = () => {
    clearTimeout(immobile);
    immobile = setTimeout(() => {
      if (UI.etat.ecran === "ecran-grace") EGGS.trouver("contemplation");
    }, 120000);
  };

  /* ---------- se reposer ---------- */
  const seReposer = () => {
    repos++;
    SFX.grace();
    document.body.classList.add("repos");
    setTimeout(() => document.body.classList.remove("repos"), 2600);
    const mots = [
      "Le feu tient. Rien ne presse.",
      "Vous reprenez souffle. Les braises montent toujours.",
      "Le lieu ne demande rien. Restez autant qu'il faut.",
    ];
    UI.annoncer("REPOS", mots[Math.min(repos, mots.length) - 1] || mots[2]);
    if (repos >= 3) EGGS.trouver("repos");
  };

  /* ---------- branchements ---------- */
  const brancher = () => {
    $("#entrer").addEventListener("click", entrer);
    document.addEventListener("keydown", (e) => {
      if (!$("#ecran-ouverture").hidden && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        entrer();
      }
    }, { once: false });

    // menu du site de grâce
    $("#menu").addEventListener("click", (e) => {
      const b = e.target.closest(".menu-item");
      if (!b) return;
      if (b.dataset.action === "repos") return seReposer();
      UI.aller(b.dataset.ecran);
    });

    $("#btn-retour").addEventListener("click", () => UI.retour());

    // inventaire
    $("#inv-casiers").addEventListener("click", (e) => {
      const c = e.target.closest(".casier");
      if (c) UI.choisirObjet(+c.dataset.i);
    });

    // missives : apprécier
    $("#missives").addEventListener("click", (e) => {
      const b = e.target.closest(".missive-eloge");
      if (!b) return;
      const nb = b.querySelector(".eloge-nb");
      if (b.classList.contains("donne")) return;
      b.classList.add("donne");
      nb.textContent = +nb.textContent + 1;
      SFX.deplacer();
      EGGS.trouver("eloge");
    });

    // attiser la lueur
    $("#lueur").addEventListener("click", () => {
      attises++;
      document.body.classList.add("attise");
      setTimeout(() => document.body.classList.remove("attise"), 900);
      SFX.deplacer();
      if (attises >= 7) EGGS.trouver("attiser");
    });

    // réclamer un niveau
    $("#attr-niveau").addEventListener("click", (e) => {
      e.currentTarget.querySelector("#niv-val").textContent = PORTEUR.niveau + 1;
      e.currentTarget.classList.add("monte");
      SFX.obtenir();
      EGGS.trouver("ascension");
    });

    // son
    $("#btn-son").addEventListener("click", (e) => {
      const on = SFX.basculer();
      e.currentTarget.textContent = "SON : " + (on ? "ALLUMÉ" : "ÉTEINT");
      e.currentTarget.setAttribute("aria-pressed", String(on));
      e.currentTarget.classList.toggle("actif", on);
    });

    // souvenirs
    $("#btn-souvenirs").addEventListener("click", () => {
      UI.monterSouvenirs();
      $("#voile-souvenirs").hidden = false;
      SFX.choisir();
    });
    document.querySelectorAll("[data-fermer]").forEach((b) =>
      b.addEventListener("click", () => { $("#" + b.dataset.fermer).hidden = true; }));
    document.querySelectorAll(".voile").forEach((v) =>
      v.addEventListener("click", (e) => { if (e.target === v) v.hidden = true; }));

    // découvertes
    EGGS.surDecouverte((s) => {
      SFX.decouverte();
      UI.annoncer("SOUVENIR RETROUVÉ", s.nom + " — " + s.secret);
      UI.monterSouvenirs();
    });
    EGGS.ecouter(() => UI.peri());

    // toute action repousse la contemplation
    ["click", "keydown", "pointermove"].forEach((ev) =>
      document.addEventListener(ev, veiller, { passive: true }));
  };

  /* ---------- démarrage ---------- */
  UI.init();
  brancher();
  AMBIANCE.arbre($("#arbre"));
  AMBIANCE.braises($("#braises"));
})();
