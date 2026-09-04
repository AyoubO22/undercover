// ============================================================
//  SITE DE GRÂCE — INTERFACE
//  Écrans, inventaire, attributs, chronique, missives.
// ============================================================

const UI = (() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const etat = {
    ecran: "ecran-grace",
    objet: 0,             // index sélectionné dans l'inventaire
    examines: new Set(),  // objets dont la fiche a été ouverte
    vus: new Set(),       // objets ayant déjà eu leur carton de titre
    menu: 0,
  };

  /* ---------------- écrans ---------------- */

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
    $("#btn-retour").hidden = id === "ecran-grace";
    if (!silencieux) (id === "ecran-grace" ? SFX.revenir() : SFX.choisir());

    if (id === "ecran-inventaire") setTimeout(() => choisirObjet(etat.objet, true), 60);
  };

  const retour = () => aller("ecran-grace");

  /* ---------------- annonces ---------------- */

  let minuteurAnnonce = null;
  const annoncer = (sur, texte) => {
    const el = $("#annonce");
    el.innerHTML = `<span class="annonce-sur">${esc(sur)}</span><span class="annonce-texte">${esc(texte)}</span>`;
    el.hidden = false;
    el.classList.remove("annonce-in");
    void el.offsetWidth;
    el.classList.add("annonce-in");
    clearTimeout(minuteurAnnonce);
    minuteurAnnonce = setTimeout(() => { el.hidden = true; }, 5200);
  };

  /* ---------------- carton de titre ---------------- */

  let minuteurCarton = null;
  const carton = (nom) => {
    const el = $("#carton");
    el.querySelector(".carton-nom").textContent = nom;
    el.hidden = false;
    el.classList.remove("carton-in");
    void el.offsetWidth;
    el.classList.add("carton-in");
    clearTimeout(minuteurCarton);
    minuteurCarton = setTimeout(() => { el.hidden = true; }, 2400);
  };

  const peri = () => {
    const el = $("#peri");
    el.hidden = false;
    el.classList.remove("peri-in");
    void el.offsetWidth;
    el.classList.add("peri-in");
    SFX.revenir();
    setTimeout(() => { el.hidden = true; }, 3600);
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

    $("#fiche").innerHTML = `
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
        <span><i>ÉTAT</i>${o.liens.some((l) => l.label === "JOUER" || l.label === "VOIR LE SITE") ? "En ligne" : "Consultable"}</span>
      </div>
      <div class="fiche-filet"></div>
      <p class="fiche-desc">${esc(o.description)}</p>
      <p class="fiche-lab">EFFETS</p>
      <ul class="fiche-effets">${o.effets.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
      <div class="fiche-liens">
        ${o.liens.map((l) => `<a class="lien-or" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
      </div>`;

    if (!silencieux) SFX.deplacer();

    if (!etat.vus.has(o.id)) { etat.vus.add(o.id); carton(o.nom); }
    etat.examines.add(o.id);
    if (etat.examines.size >= INVENTAIRE.length) EGGS.trouver("archiviste");
  };

  /* ---------------- attributs ---------------- */

  const monterAttributs = () => {
    $("#attr-liste").innerHTML = ATTRIBUTS.map(([nom, val, note]) => {
      const plein = Math.round(val / 5);
      return `<div class="attr">
        <span class="attr-nom">${esc(nom)}</span>
        <span class="attr-jauge">${Array.from({ length: 20 }, (_, i) =>
          `<i class="${i < plein ? "on" : ""}"></i>`).join("")}</span>
        <span class="attr-val">${val}</span>
        <span class="attr-note">${esc(note)}</span>
      </div>`;
    }).join("");

    $("#attr-memoire").innerHTML = `<p class="fiche-lab">MÉMOIRE</p>` + MEMOIRE.map(([k, v]) =>
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
        <p class="missive-texte">${esc(m.texte)}</p>
        <a class="missive-detail lien-or" href="${esc(m.url)}" target="_blank" rel="noopener">${esc(m.detail)}</a>
        <button class="missive-eloge" data-i="${i}">
          <span class="eloge-signe">▲</span>
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

  return {
    etat, aller, retour, annoncer, carton, peri,
    choisirObjet, monterSouvenirs,

    init() {
      monterCasiers();
      monterAttributs();
      monterChronique();
      monterMissives();
      monterSouvenirs();
      $("#bandeau-porteur").textContent = PORTEUR.nom;
      $("#bandeau-niveau").textContent = PORTEUR.niveau;
      $(".attr-niveau-val").textContent = PORTEUR.niveau;
      document.addEventListener("keydown", clavier);
    },
  };
})();
