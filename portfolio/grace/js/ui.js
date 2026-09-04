// ============================================================
//  SITE DE GRÂCE — INTERFACE
//  Écrans, inventaire, montée de niveau, chronique, missives.
// ============================================================

const UI = (() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const etat = {
    ecran: "ecran-grace",
    objet: 0,
    examines: new Set(),
    vus: new Set(),
    menu: 0,
  };

  const NOMS = {
    "ecran-grace": "SITE DE GRÂCE",
    "ecran-inventaire": "SITE DE GRÂCE · INVENTAIRE",
    "ecran-attributs": "SITE DE GRÂCE · MONTER DE NIVEAU",
    "ecran-chronique": "SITE DE GRÂCE · CHRONIQUE",
    "ecran-missives": "SITE DE GRÂCE · MISSIVES",
  };

  const INVITES = {
    "ecran-grace": [["↑ ↓", "NAVIGUER"], ["ENTRÉE", "SÉLECTIONNER"]],
    "ecran-inventaire": [["↑ ↓ ← →", "CHOISIR"], ["ÉCHAP", "RETOUR"]],
    "ecran-attributs": [["ÉCHAP", "RETOUR"]],
    "ecran-chronique": [["ÉCHAP", "RETOUR"]],
    "ecran-missives": [["ÉCHAP", "RETOUR"]],
  };

  /* ---------------- écrans ---------------- */

  const majInvites = () => {
    $("#invites").innerHTML = (INVITES[etat.ecran] || []).map(([t, l]) =>
      `<span class="invite"><b>${t}</b>${l}</span>`).join("");
  };

  const aller = (id, silencieux) => {
    if (id === etat.ecran) return;
    const sortant = $("#" + etat.ecran);
    const entrant = $("#" + id);
    if (!entrant) return;

    sortant.classList.remove("active");
    sortant.classList.add("sortant");
    setTimeout(() => sortant.classList.remove("sortant"), 420);

    entrant.classList.add("active");
    etat.ecran = id;
    $("#fil").textContent = NOMS[id] || "";
    $("#btn-retour").hidden = id === "ecran-grace";
    majInvites();
    if (!silencieux) (id === "ecran-grace" ? SFX.revenir() : SFX.choisir());
    if (id === "ecran-inventaire") setTimeout(() => choisirObjet(etat.objet, true), 60);
  };

  const retour = () => aller("ecran-grace");

  /* ---------------- annonces et cartons ---------------- */

  let minuteurAnnonce = null;
  const annoncer = (sur, texte) => {
    const el = $("#annonce");
    el.innerHTML = `<span class="annonce-sur">${esc(sur)}</span><span class="annonce-texte">${esc(texte)}</span>`;
    el.hidden = false;
    el.classList.remove("annonce-in"); void el.offsetWidth; el.classList.add("annonce-in");
    clearTimeout(minuteurAnnonce);
    minuteurAnnonce = setTimeout(() => { el.hidden = true; }, 5200);
  };

  let minuteurCarton = null;
  const carton = (nom) => {
    const el = $("#carton");
    el.querySelector(".carton-nom").textContent = nom;
    el.hidden = false;
    el.classList.remove("carton-in"); void el.offsetWidth; el.classList.add("carton-in");
    clearTimeout(minuteurCarton);
    minuteurCarton = setTimeout(() => { el.hidden = true; }, 2600);
  };

  let minuteurObtenu = null;
  const obtenu = (o) => {
    const el = $("#obtenu");
    el.querySelector(".obtenu-sceau").innerHTML = SIGILS.dessiner(o.graine, o.rarete);
    el.querySelector(".obtenu-texte").textContent = o.nom;
    el.hidden = false;
    el.classList.remove("obtenu-in"); void el.offsetWidth; el.classList.add("obtenu-in");
    clearTimeout(minuteurObtenu);
    minuteurObtenu = setTimeout(() => { el.hidden = true; }, 4200);
  };

  const peri = () => {
    const el = $("#peri");
    el.hidden = false;
    el.classList.remove("peri-in"); void el.offsetWidth; el.classList.add("peri-in");
    SFX.revenir();
    setTimeout(() => { el.hidden = true; }, 4200);
  };

  /* ---------------- inventaire ---------------- */

  const rarete = (n) => "◆".repeat(n) + "◇".repeat(3 - n);

  const monterCasiers = () => {
    $("#inv-casiers").innerHTML = INVENTAIRE.map((o, i) => `
      <button class="casier" role="option" aria-selected="${i === 0}" data-i="${i}" title="${esc(o.nom)}">
        <span class="casier-sceau">${SIGILS.dessiner(o.graine, o.rarete)}</span>
        <span class="casier-nom">${esc(o.nom)}</span>
      </button>`).join("");
  };

  const choisirObjet = (i, silencieux) => {
    if (i < 0 || i >= INVENTAIRE.length) return;
    etat.objet = i;
    const o = INVENTAIRE[i];

    $$("#inv-casiers .casier").forEach((c, n) => {
      c.classList.toggle("choisi", n === i);
      c.setAttribute("aria-selected", String(n === i));
    });
    $$("#inv-casiers .casier")[i].scrollIntoView({ block: "nearest", behavior: "smooth" });
    $("#inv-compte").textContent = `${i + 1} / ${INVENTAIRE.length}`;

    const enLigne = o.liens.some((l) => l.label === "JOUER" || l.label === "VOIR LE SITE");
    $("#fiche").innerHTML = `
      ${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}
      <div class="fiche-tete">
        <div class="fiche-sceau">${SIGILS.dessiner(o.graine, o.rarete)}</div>
        <div class="fiche-ident">
          <h3 class="fiche-nom">${esc(o.nom)}</h3>
          <p class="fiche-type">${esc(o.type)}</p>
          <p class="fiche-rarete" title="rareté">${rarete(o.rarete)}</p>
        </div>
      </div>
      <div class="fiche-stats">
        <span><i>ANNÉE</i>${esc(o.annee)}</span>
        <span><i>POIDS</i>${esc(o.poids)}</span>
        <span><i>ÉTAT</i>${enLigne ? "En ligne" : "Consultable"}</span>
      </div>
      ${ORNEMENTS.diviseur("div-fiche")}
      <p class="fiche-desc">${esc(o.description)}</p>
      <p class="fiche-lab">EFFETS</p>
      <ul class="fiche-effets">${o.effets.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
      <div class="fiche-liens">
        ${o.liens.map((l) => `<a class="lien-or" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
      </div>`;

    if (!silencieux) SFX.deplacer();

    if (!etat.vus.has(o.id)) {
      etat.vus.add(o.id);
      carton(o.nom);
      setTimeout(() => obtenu(o), 900);
      SFX.obtenir();
    }
    etat.examines.add(o.id);
    if (etat.examines.size >= INVENTAIRE.length) EGGS.trouver("archiviste");
  };

  /* ---------------- montée de niveau ---------------- */

  const monterAttributs = () => {
    $("#attr-liste").innerHTML =
      `${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}
       <p class="fiche-lab">ATTRIBUTS</p>` +
      ATTRIBUTS.map(([nom, val, note]) => {
        const plein = Math.round(val / 5);
        return `<div class="attr">
          <span class="attr-marque">◆</span>
          <span class="attr-nom">${esc(nom)}</span>
          <span class="attr-jauge">${Array.from({ length: 20 }, (_, i) =>
            `<i class="${i < plein ? "on" : ""}"></i>`).join("")}</span>
          <span class="attr-val">${val}</span>
          <span class="attr-note">${esc(note)}</span>
        </div>`;
      }).join("");

    $("#attr-memoire").innerHTML =
      `${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}
       <p class="fiche-lab">MÉMOIRE</p>` +
      MEMOIRE.map(([k, v]) =>
        `<div class="mem"><span class="mem-k">${esc(k)}</span><span class="mem-v">${esc(v)}</span></div>`).join("");
  };

  /* ---------------- chronique ---------------- */

  const monterChronique = () => {
    $("#chronique").innerHTML = CHRONIQUE.map(([an, titre, texte]) => `
      <li class="chrono">
        <span class="chrono-an">${esc(an)}</span>
        <span class="chrono-corps">
          <span class="chrono-titre">${esc(titre)}</span>
          <span class="chrono-texte">${esc(texte)}</span>
        </span>
      </li>`).join("");
  };

  /* ---------------- missives ---------------- */

  const monterMissives = () => {
    $("#missives").innerHTML = MISSIVES.map((m, i) => `
      <div class="missive">
        ${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}${ORNEMENTS.coin()}
        <p class="missive-texte">${esc(m.texte)}</p>
        <a class="missive-detail lien-or" href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.detail)}</a>
        <button class="missive-eloge" data-i="${i}">
          <span class="eloge-signe">${ORNEMENTS.marque()}</span>
          <span class="eloge-nb">${m.appreciations}</span>
        </button>
      </div>`).join("");
  };

  /* ---------------- souvenirs ---------------- */

  const monterSouvenirs = () => {
    $("#cpt-souvenirs").textContent = EGGS.nombre;
    $("#cpt-total").textContent = EGGS.total;
    $("#liste-souvenirs").innerHTML = EGGS.liste().map((s) => {
      const vu = EGGS.connu(s.id);
      return `<div class="souvenir ${vu ? "" : "scelle"}">
        <span class="souvenir-marque">${vu ? "◆" : "◇"}</span>
        <span class="souvenir-corps">
          <span class="souvenir-nom">${vu ? esc(s.nom) : "— — —"}</span>
          <span class="souvenir-texte">${esc(vu ? s.secret : s.indice)}</span>
        </span>
      </div>`;
    }).join("") + `<p class="souvenir-pied">${EGGS.nombre} souvenir(s) sur ${EGGS.total}.</p>`;
  };

  /* ---------------- clavier ---------------- */

  const clavier = (e) => {
    if ($("#jeu").hidden) return;
    const ouvert = $$(".voile:not([hidden])").length > 0;

    if (e.key === "Escape") {
      if (ouvert) { $$(".voile").forEach((v) => (v.hidden = true)); return; }
      if (etat.ecran !== "ecran-grace") { e.preventDefault(); retour(); }
      return;
    }
    if (ouvert) return;

    if (etat.ecran === "ecran-inventaire") {
      const col = window.matchMedia("(max-width: 900px)").matches ? 4 : 3;
      if (e.key === "ArrowRight") { e.preventDefault(); choisirObjet(etat.objet + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); choisirObjet(etat.objet - 1); }
      if (e.key === "ArrowDown") { e.preventDefault(); choisirObjet(Math.min(etat.objet + col, INVENTAIRE.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); choisirObjet(Math.max(etat.objet - col, 0)); }
      return;
    }

    if (etat.ecran === "ecran-grace") {
      const items = $$(".menu-item");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        etat.menu = (etat.menu + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        items[etat.menu].focus();
        SFX.deplacer();
      }
    }
  };

  /* ---------------- ornements ---------------- */

  const poserOrnements = () => {
    $$(".orn-ligne").forEach((el) => { el.innerHTML = ORNEMENTS.diviseur(); });
    $("#anneau").innerHTML = ORNEMENTS.anneau();
    $$(".menu-marque").forEach((el) => { el.innerHTML = ORNEMENTS.marque(); });
  };

  return {
    etat, aller, retour, annoncer, carton, peri, obtenu,
    choisirObjet, monterSouvenirs,

    init() {
      poserOrnements();
      monterCasiers();
      monterAttributs();
      monterChronique();
      monterMissives();
      monterSouvenirs();
      majInvites();
      $("#bandeau-porteur").textContent = PORTEUR.nom;
      $("#bandeau-niveau").textContent = PORTEUR.niveau;
      $("#niv-val").textContent = PORTEUR.niveau;
      $("#niv-runes").textContent = PORTEUR.niveau;
      document.addEventListener("keydown", clavier);
    },
  };
})();
