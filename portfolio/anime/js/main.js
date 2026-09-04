// ============================================================
//  ÉPISODES — MISE EN MARCHE
// ============================================================
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let ecran = "ecran-episodes";
  let vus = new Set();

  /* ---------- liste des épisodes ---------- */
  const monterEpisodes = () => {
    $("#episodes").innerHTML = EPISODES.map((e, i) => `
      <button class="ep" data-i="${i}">
        <span class="ep-vign">${VIGNETTES.composer(e)}</span>
        <span class="ep-corps">
          <span class="ep-haut">
            <span class="ep-num">第${e.n}話</span>
            <span class="ep-genre">${esc(e.genre)}</span>
            <span class="ep-annee">${esc(e.annee)}</span>
          </span>
          <span class="ep-titre">${esc(e.titre)}</span>
          <span class="ep-sous">${esc(e.sous)}</span>
          <span class="ep-syn">${esc(e.synopsis)}</span>
          <span class="ep-voir">次回予告 &nbsp;VOIR L'ÉPISODE →</span>
        </span>
      </button>`).join("");
  };

  /* ---------- eyecatch ---------- */
  const eyecatch = (texte, apres) => {
    const el = $("#eyecatch");
    el.querySelector(".eyecatch-texte").textContent = texte;
    el.hidden = false;
    el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
    setTimeout(apres, 420);
    setTimeout(() => { el.hidden = true; }, 1100);
  };

  /* ---------- détail ---------- */
  const ouvrirDetail = (i) => {
    const e = EPISODES[i];
    vus.add(e.id);
    eyecatch(`第${e.n}話`, () => {
      $("#detail-corps").innerHTML = `
        <button class="detail-fermer" id="detail-fermer" aria-label="Fermer">✕</button>
        <div class="detail-vign">${VIGNETTES.composer(e, true)}</div>
        <div class="detail-texte">
          <p class="detail-num">第${e.n}話 &nbsp;·&nbsp; ${esc(e.genre)} &nbsp;·&nbsp; ${esc(e.annee)}</p>
          <h3 class="detail-titre">${esc(e.titre)}</h3>
          <p class="detail-sous">${esc(e.sous)}</p>
          <p class="detail-syn">${esc(e.synopsis)}</p>
          <h4 class="detail-lab">スタッフ &nbsp;PRODUCTION</h4>
          <div class="staff">
            ${e.staff.map(([k, v]) => `<div class="staff-l"><span class="staff-k">${k}</span><span class="staff-v">${esc(v)}</span></div>`).join("")}
          </div>
          <div class="detail-liens">
            ${e.liens.map((l) => `<a class="bouton bouton-rouge" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
          </div>
          ${vus.size === EPISODES.length ? `<p class="detail-fin">終 &nbsp;— Les dix épisodes ont été vus.</p>` : ""}
        </div>`;
      const v = $("#detail");
      v.hidden = false;
      v.classList.remove("in"); void v.offsetWidth; v.classList.add("in");
      $("#detail-fermer").addEventListener("click", fermerDetail);
    });
  };
  const fermerDetail = () => { $("#detail").hidden = true; };

  /* ---------- personnage ---------- */
  const monterPersonnage = () => {
    $("#perso").innerHTML = `
      <div class="perso-carte">
        <div class="perso-vign">${VIGNETTES.composer({ n: "00", vignette: 2, duo: 4 }, true)}</div>
        <div class="perso-ident">
          <p class="perso-kana">${esc(PERSONNAGE.kana)}</p>
          <h3 class="perso-nom">${esc(PERSONNAGE.nom)}</h3>
          <p class="perso-classe">${esc(PERSONNAGE.classe)}</p>
          <p class="perso-citation">« ${esc(PERSONNAGE.citation)} »</p>
          <div class="perso-champs">
            ${[["BASE", PERSONNAGE.base], ["FORMATION", PERSONNAGE.ecole], ["LANGUES", "Français · Néerlandais · Anglais"]]
              .map(([k, v]) => `<div class="perso-champ"><span>${k}</span><b>${esc(v)}</b></div>`).join("")}
          </div>
        </div>
      </div>`;

    $("#capacites").innerHTML = PERSONNAGE.capacites.map(([nom, val]) => `
      <div class="cap">
        <span class="cap-nom">${esc(nom)}</span>
        <span class="cap-barre"><i style="width:${val}%"></i></span>
        <span class="cap-val">${val}</span>
      </div>`).join("");
  };

  /* ---------- chronologie ---------- */
  const monterAnnees = () => {
    $("#annees").innerHTML = ANNEES.map(([an, titre, texte]) => `
      <div class="annee">
        <span class="annee-n">${esc(an)}</span>
        <span class="annee-corps">
          <span class="annee-titre">${esc(titre)}</span>
          <span class="annee-texte">${esc(texte)}</span>
        </span>
      </div>`).join("");
  };

  /* ---------- contact ---------- */
  const monterContact = () => {
    $("#contacts").innerHTML = [
      ["メール", "COURRIEL", PERSONNAGE.email, "mailto:" + PERSONNAGE.email],
      ["GITHUB", "GITHUB", "github.com/AyoubO22", PERSONNAGE.github],
      ["LINKEDIN", "LINKEDIN", "linkedin.com/in/ayoub-ouaadoud", PERSONNAGE.linkedin],
    ].map(([kana, k, v, url]) => `
      <a class="contact" href="${esc(url)}" target="_blank" rel="noopener">
        <span class="contact-kana">${kana}</span>
        <span class="contact-corps"><b>${k}</b><span>${esc(v)}</span></span>
        <span class="contact-fleche">→</span>
      </a>`).join("");
  };

  /* ---------- navigation ---------- */
  const aller = (id) => {
    if (id === ecran) return;
    $("#" + ecran).classList.remove("active");
    $("#" + id).classList.add("active");
    ecran = id;
    $$(".onglet").forEach((o) => o.classList.toggle("actif", o.dataset.ecran === id));
    window.scrollTo({ top: 0 });
  };

  /* ---------- branchements ---------- */
  $("#entrer").addEventListener("click", () => {
    eyecatch("作品集", () => {
      $("#ecran-ouverture").hidden = true;
      $("#app").hidden = false;
    });
  });
  $("#episodes").addEventListener("click", (e) => {
    const b = e.target.closest(".ep");
    if (b) ouvrirDetail(+b.dataset.i);
  });
  $("#detail").addEventListener("click", (e) => { if (e.target.id === "detail") fermerDetail(); });
  $("#onglets").addEventListener("click", (e) => {
    const o = e.target.closest(".onglet");
    if (o) aller(o.dataset.ecran);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fermerDetail();
    if (e.key === "Enter" && !$("#ecran-ouverture").hidden) $("#entrer").click();
  });

  monterEpisodes();
  monterPersonnage();
  monterAnnees();
  monterContact();
})();
