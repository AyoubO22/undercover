// ============================================================
//  LA SÉANCE — MISE EN MARCHE
// ============================================================
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let ecran = "ecran-filmo";

  /* ---------- filmographie ---------- */
  const monterAffiches = () => {
    $("#affiches").innerHTML = FILMS.map((f, i) =>
      `<button class="affiche-case" data-i="${i}" aria-label="${esc(f.titre)}">${AFFICHES.composer(f)}</button>`
    ).join("");
  };

  /* ---------- fiche technique ---------- */
  const ouvrirFiche = (i) => {
    const f = FILMS[i];
    const [fond, encre, accent] = AFFICHES.palette(f);
    $("#fiche-corps").innerHTML = `
      <button class="fiche-fermer" id="fiche-fermer" aria-label="Fermer">✕</button>
      <div class="fiche-grille">
        <div class="fiche-affiche">${AFFICHES.composer(f)}</div>
        <div class="fiche-texte">
          <p class="fiche-genre" style="color:${accent}">${esc(f.genre)}</p>
          <h3 class="fiche-titre">${esc(f.titre)}</h3>
          <p class="fiche-sous">${esc(f.sousTitre)}</p>
          <div class="fiche-meta">
            <span><i>ANNÉE</i>${esc(f.annee)}</span>
            <span><i>MÉTRAGE</i>${esc(f.duree)}</span>
          </div>
          <p class="fiche-synopsis">${esc(f.synopsis)}</p>

          <h4 class="fiche-lab">DISTRIBUTION</h4>
          <div class="fiche-liste">
            ${f.distribution.map(([q, r]) =>
              `<div class="fiche-ligne"><span class="fl-g">${esc(q)}</span><span class="fl-p"></span><span class="fl-d">${esc(r)}</span></div>`).join("")}
          </div>

          <h4 class="fiche-lab">GÉNÉRIQUE</h4>
          <div class="fiche-liste">
            ${f.generique.map(([q, r]) =>
              `<div class="fiche-ligne"><span class="fl-g">${esc(q)}</span><span class="fl-p"></span><span class="fl-d">${esc(r)}</span></div>`).join("")}
          </div>

          <div class="fiche-liens">
            ${f.liens.map((l) => `<a class="bouton" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
          </div>
        </div>
      </div>`;
    const v = $("#fiche");
    v.hidden = false;
    v.classList.remove("in"); void v.offsetWidth; v.classList.add("in");
    $("#fiche-fermer").addEventListener("click", fermerFiche);
  };
  const fermerFiche = () => { $("#fiche").hidden = true; };

  /* ---------- réalisateur ---------- */
  const monterRealisateur = () => {
    $("#real-note").textContent = REALISATEUR.note;
    $("#real-ident").innerHTML = [
      ["NOM", REALISATEUR.nom],
      ["MÉTIER", REALISATEUR.metier],
      ["BASE", REALISATEUR.lieu],
      ["FORMATION", REALISATEUR.ecole],
      ["LANGUES", "Français · Néerlandais · Anglais"],
    ].map(([k, v]) => `<div class="fiche-ligne"><span class="fl-g">${k}</span><span class="fl-p"></span><span class="fl-d">${esc(v)}</span></div>`).join("");

    $("#competences").innerHTML = COMPETENCES.map(([nom, val]) => `
      <div class="comp">
        <span class="comp-nom">${esc(nom)}</span>
        <span class="comp-barre"><i style="width:${val}%"></i></span>
        <span class="comp-val">${val}</span>
      </div>`).join("");
  };

  /* ---------- parcours ---------- */
  const monterParcours = () => {
    $("#parcours").innerHTML = PARCOURS.map(([an, titre, texte]) => `
      <div class="etape">
        <span class="etape-an">${esc(an)}</span>
        <span class="etape-corps">
          <span class="etape-titre">${esc(titre)}</span>
          <span class="etape-texte">${esc(texte)}</span>
        </span>
      </div>`).join("");
  };

  /* ---------- générique de fin ---------- */
  const monterGenerique = () => {
    const bloc = (r, n) => `<div class="gen-bloc"><p class="gen-role">${r}</p><p class="gen-nom">${n}</p></div>`;
    $("#generique-roule").innerHTML = `
      <p class="gen-fin">FIN</p>
      ${bloc("ÉCRITURE, RÉALISATION ET MONTAGE", REALISATEUR.nom)}
      ${bloc("TOURNÉ À", REALISATEUR.lieu)}
      ${bloc("FORMATION", REALISATEUR.ecole)}
      <div class="gen-filet"></div>
      ${bloc("COURRIEL", `<a href="mailto:${REALISATEUR.email}">${REALISATEUR.email}</a>`)}
      ${bloc("GITHUB", `<a href="${REALISATEUR.github}" target="_blank" rel="noopener">github.com/AyoubO22</a>`)}
      ${bloc("LINKEDIN", `<a href="${REALISATEUR.linkedin}" target="_blank" rel="noopener">linkedin.com/in/ayoub-ouaadoud</a>`)}
      <div class="gen-filet"></div>
      ${bloc("AUCUNE IMAGE N'A ÉTÉ CHARGÉE", "Affiches et grain composés au code")}
      ${bloc("DISPONIBLE POUR", "Stage · premier poste · collaboration")}
      <p class="gen-copy">© 2026 — Toute ressemblance avec un portfolio existant serait fortuite.</p>`;
  };

  /* ---------- navigation ---------- */
  const aller = (id) => {
    if (id === ecran) return;
    $("#" + ecran).classList.remove("active");
    $("#" + id).classList.add("active");
    ecran = id;
    $$(".onglet").forEach((o) => o.classList.toggle("actif", o.dataset.ecran === id));
    if (id === "ecran-generique") {
      const r = $("#generique-roule");
      r.style.animation = "none"; void r.offsetWidth; r.style.animation = "";
    }
  };

  /* ---------- branchements ---------- */
  $("#entrer").addEventListener("click", () => {
    $("#ecran-ouverture").classList.add("sort");
    setTimeout(() => { $("#ecran-ouverture").hidden = true; $("#app").hidden = false; }, 900);
  });
  $("#affiches").addEventListener("click", (e) => {
    const c = e.target.closest(".affiche-case");
    if (c) ouvrirFiche(+c.dataset.i);
  });
  $("#fiche").addEventListener("click", (e) => { if (e.target.id === "fiche") fermerFiche(); });
  $("#onglets").addEventListener("click", (e) => {
    const o = e.target.closest(".onglet");
    if (o) aller(o.dataset.ecran);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermerFiche();
    if (e.key === "Enter" && !$("#ecran-ouverture").hidden) $("#entrer").click();
  });

  monterAffiches();
  monterRealisateur();
  monterParcours();
  monterGenerique();
})();
