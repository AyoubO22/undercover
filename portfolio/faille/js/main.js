// ============================================================
//  LA FAILLE — MISE EN MARCHE
// ============================================================
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const etat = { champion: 0, sort: 0, verrouilles: new Set(), ecran: "ecran-selection" };
  const STATS = ["TECHNIQUE", "PORTÉE", "FINITION", "DIFFICULTÉ"];

  /* ---------- grille de champions ---------- */
  const monterGrille = () => {
    $("#grille").innerHTML = CHAMPIONS.map((c, i) => `
      <button class="tuile" role="option" aria-selected="${i === 0}" data-i="${i}" title="${esc(c.nom)}">
        <span class="tuile-hex">${EMBLEMES.dessiner(c.graine)}</span>
        <span class="tuile-nom">${esc(c.nom)}</span>
      </button>`).join("");
  };

  /* ---------- fiche du champion ---------- */
  const montrerSort = (n) => {
    etat.sort = n;
    const c = CHAMPIONS[etat.champion];
    const [touche, nom, texte] = c.sorts[n];
    $$("#kit-sorts .sort").forEach((s, i) => s.classList.toggle("actif", i === n));
    $("#kit-detail").innerHTML = `
      <p class="detail-nom"><span class="detail-touche">${esc(touche)}</span>${esc(nom)}</p>
      <p class="detail-texte">${esc(texte)}</p>`;
  };

  const choisirChampion = (i, muet) => {
    if (i < 0 || i >= CHAMPIONS.length) return;
    etat.champion = i;
    const c = CHAMPIONS[i];

    $$("#grille .tuile").forEach((t, n) => {
      t.classList.toggle("choisi", n === i);
      t.setAttribute("aria-selected", String(n === i));
    });

    const scene = $(".scene");
    scene.classList.remove("entre");
    void scene.offsetWidth;
    scene.classList.add("entre");

    $("#scene-embleme").innerHTML = EMBLEMES.dessiner(c.graine, true);
    $("#scene-titre").textContent = c.titre;
    $("#scene-nom").textContent = c.nom;
    $("#scene-roles").innerHTML = c.roles.map((r) => `<span class="role">${esc(r)}</span>`).join("") +
      `<span class="role role-annee">${esc(c.annee)}</span>`;

    $("#kit-resume").textContent = c.resume;
    $("#kit-stats").innerHTML = c.stats.map((v, n) => `
      <div class="stat">
        <span class="stat-nom">${STATS[n]}</span>
        <span class="stat-jauge">${Array.from({ length: 10 }, (_, k) => `<i class="${k < v ? "on" : ""}"></i>`).join("")}</span>
      </div>`).join("");

    $("#kit-sorts").innerHTML = c.sorts.map(([t, nom], n) => `
      <button class="sort ${n === 0 ? "actif" : ""}" data-n="${n}" title="${esc(nom)}">
        <span class="sort-hex">${EMBLEMES.dessiner(c.graine + n * 77)}</span>
        <span class="sort-touche">${esc(t)}</span>
      </button>`).join("");

    $("#kit-liens").innerHTML = c.liens.map((l) =>
      `<a class="lien" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");

    const verrou = $("#verrou");
    verrou.disabled = etat.verrouilles.has(c.id);
    verrou.textContent = etat.verrouilles.has(c.id) ? "VERROUILLÉ" : "VERROUILLER";

    montrerSort(0);
    if (!muet) SFX.choisir();
  };

  /* ---------- verrouillage ---------- */
  const verrouiller = () => {
    const c = CHAMPIONS[etat.champion];
    if (etat.verrouilles.has(c.id)) return;
    etat.verrouilles.add(c.id);
    SFX.verrouiller();
    const el = $("#verrouille");
    el.querySelector(".verrouille-nom").textContent = c.nom;
    el.hidden = false;
    el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
    setTimeout(() => { el.hidden = true; }, 2200);
    $$("#grille .tuile")[etat.champion].classList.add("verrouille");
    $("#verrou").disabled = true;
    $("#verrou").textContent = "VERROUILLÉ";
    if (etat.verrouilles.size === CHAMPIONS.length) {
      annoncer("SÉLECTION COMPLÈTE", "Les dix champions ont été verrouillés. Il n'en reste aucun à découvrir.");
    }
  };

  let minuteur = null;
  const annoncer = (sur, texte) => {
    const el = $("#annonce");
    el.innerHTML = `<span class="annonce-sur">${esc(sur)}</span><span class="annonce-texte">${esc(texte)}</span>`;
    el.hidden = false;
    el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
    clearTimeout(minuteur);
    minuteur = setTimeout(() => { el.hidden = true; }, 5000);
  };

  /* ---------- autres écrans ---------- */
  const monterProfil = () => {
    $("#tete-nom").textContent = INVOCATEUR.nom;
    $("#tete-niveau").textContent = INVOCATEUR.niveau;
    $("#tete-rang").textContent = INVOCATEUR.rang;
    $("#profil-nom").textContent = INVOCATEUR.nom;
    $("#profil-lieu").textContent = INVOCATEUR.lieu + " · " + INVOCATEUR.ecole;
    $("#profil-niveau").textContent = INVOCATEUR.niveau;
    $("#maitrises").innerHTML = MAITRISES.map(([nom, v]) => `
      <div class="maitrise">
        <span class="maitrise-nom">${esc(nom)}</span>
        <span class="maitrise-barre"><i style="width:${v}%"></i></span>
        <span class="maitrise-val">${v}</span>
      </div>`).join("");
  };

  const monterHistorique = () => {
    $("#parties").innerHTML = HISTORIQUE.map(([issue, an, titre, texte]) => `
      <div class="partie ${issue === "V" ? "victoire" : "neutre"}">
        <span class="partie-issue">${issue === "V" ? "VICTOIRE" : "—"}</span>
        <span class="partie-an">${esc(an)}</span>
        <span class="partie-corps">
          <span class="partie-titre">${esc(titre)}</span>
          <span class="partie-texte">${esc(texte)}</span>
        </span>
      </div>`).join("");
  };

  const monterContact = () => {
    $("#contacts").innerHTML = [
      ["COURRIEL", INVOCATEUR.email, "mailto:" + INVOCATEUR.email],
      ["GITHUB", "github.com/AyoubO22", INVOCATEUR.github],
      ["LINKEDIN", "linkedin.com/in/ayoub-ouaadoud", INVOCATEUR.linkedin],
    ].map(([k, v, url]) => `
      <a class="contact" href="${esc(url)}" target="_blank" rel="noopener">
        <span class="contact-k">${k}</span>
        <span class="contact-v">${esc(v)}</span>
      </a>`).join("");
  };

  /* ---------- navigation ---------- */
  const aller = (id) => {
    if (id === etat.ecran) return;
    $("#" + etat.ecran).classList.remove("active");
    $("#" + id).classList.add("active");
    etat.ecran = id;
    $$(".onglet").forEach((o) => o.classList.toggle("actif", o.dataset.ecran === id));
    SFX.onglet();
  };

  /* ---------- branchements ---------- */
  const brancher = () => {
    $("#entrer").addEventListener("click", () => {
      $("#ecran-ouverture").classList.add("sort");
      setTimeout(() => {
        $("#ecran-ouverture").hidden = true;
        $("#app").hidden = false;
        choisirChampion(0, true);
      }, 620);
    });

    $("#grille").addEventListener("click", (e) => {
      const t = e.target.closest(".tuile");
      if (t) choisirChampion(+t.dataset.i);
    });
    $("#grille").addEventListener("pointerover", (e) => {
      if (e.target.closest(".tuile")) SFX.survol();
    });

    $("#kit-sorts").addEventListener("click", (e) => {
      const s = e.target.closest(".sort");
      if (s) { montrerSort(+s.dataset.n); SFX.survol(); }
    });
    $("#kit-sorts").addEventListener("pointerover", (e) => {
      const s = e.target.closest(".sort");
      if (s) montrerSort(+s.dataset.n);
    });

    $("#verrou").addEventListener("click", verrouiller);
    $("#onglets").addEventListener("click", (e) => {
      const o = e.target.closest(".onglet");
      if (o) aller(o.dataset.ecran);
    });

    $("#btn-son").addEventListener("click", (e) => {
      const on = SFX.basculer();
      e.currentTarget.classList.toggle("actif", on);
      e.currentTarget.textContent = on ? "SON ▮▮▮" : "SON";
    });

    document.addEventListener("keydown", (e) => {
      if ($("#app").hidden) {
        if (e.key === "Enter") $("#entrer").click();
        return;
      }
      if (etat.ecran !== "ecran-selection") return;
      const col = window.matchMedia("(max-width: 900px)").matches ? 5 : 2;
      if (e.key === "ArrowDown") { e.preventDefault(); choisirChampion(Math.min(etat.champion + col, CHAMPIONS.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); choisirChampion(Math.max(etat.champion - col, 0)); }
      if (e.key === "ArrowRight") { e.preventDefault(); choisirChampion(etat.champion + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); choisirChampion(etat.champion - 1); }
      if (["q", "w", "e", "r", "p"].includes(e.key.toLowerCase())) {
        const n = ["p", "q", "w", "e", "r"].indexOf(e.key.toLowerCase());
        if (n >= 0) montrerSort(n);
      }
      if (e.key === "Enter") verrouiller();
    });
  };

  monterGrille();
  monterProfil();
  monterHistorique();
  monterContact();
  brancher();
})();
