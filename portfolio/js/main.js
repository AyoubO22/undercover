// ============================================================
//  BUREAU — MISE EN MARCHE
//  Amorçage, briefing, HUD, règlement, panneaux, anomalies.
// ============================================================

(() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  const couche = (id) => {
    document.querySelectorAll(".layer").forEach((l) => l.classList.remove("active"));
    $("#" + id).classList.add("active");
  };

  /* ============================================================
     1. AMORÇAGE
     ============================================================ */
  const LIGNES_BOOT = [
    "MINISTÈRE DE L'ADMINISTRATION — TERMINAL DE POSTE",
    "",
    "amorçage du poste frontalier .............. <span class='ok'>OK</span>",
    "vérification du tampon officiel ........... <span class='ok'>OK</span>",
    "chargement du registre des dossiers ....... <span class='ok'>OK</span>",
    "synchronisation avec la capitale .......... <span class='err'>ÉCHEC</span>",
    "  &gt; le poste fonctionnera hors ligne.",
    "",
    "affectation : <b>" + BUREAU.inspecteur.nom + "</b>",
    "matricule   : " + BUREAU.inspecteur.matricule,
    "poste       : " + BUREAU.inspecteur.poste,
    "",
    "<span class='ok'>" + BUREAU.devise + "</span>",
    "",
  ];

  const amorcer = () => {
    const log = $("#boot-log");
    let i = 0;
    const suite = () => {
      if (i >= LIGNES_BOOT.length) {
        $("#boot-enter").hidden = false;
        $("#boot-hint").hidden = false;
        return;
      }
      log.innerHTML += LIGNES_BOOT[i] + "\n";
      SFX.key();
      i++;
      setTimeout(suite, LIGNES_BOOT[i - 1] === "" ? 90 : 190);
    };
    suite();
  };

  /* ============================================================
     2. BRIEFING
     ============================================================ */
  const remplirBriefing = () => {
    $("#brief-day").textContent = BRIEFING.jour;
    $("#brief-title").textContent = BRIEFING.titre;
    $("#brief-line").textContent = BRIEFING.intro;
    $("#brief-list").innerHTML = BRIEFING.consignes.map((c) => `<li>${esc(c)}</li>`).join("");
    $("#hud-state").textContent = BUREAU.etat;
    $("#hud-day").textContent = BRIEFING.jour;
    $("#poster-text").textContent = BUREAU.devise;
  };

  /* ============================================================
     3. RÈGLEMENT
     ============================================================ */
  const pageReglement = (sec) => {
    let h = `<div class="book-h">${esc(sec.titre)}</div>
             <div class="book-sub">${esc(sec.sous)}</div>`;
    (sec.paras || []).forEach((p) => { h += `<p class="book-p">${esc(p)}</p>`; });

    if (sec.barres) {
      h += `<div class="bars">`;
      sec.barres.forEach(([nom, n]) => {
        h += `<div class="bar-row">
                <span class="bar-name">${esc(nom)}</span>
                <span class="bar-track"><span class="bar-fill" style="width:${n}%"></span></span>
                <span class="bar-val">${n}</span>
              </div>`;
      });
      h += `</div>`;
    }
    if (sec.liste) {
      if (sec.listeTitre) h += `<div class="book-sub">${esc(sec.listeTitre)}</div>`;
      h += `<ul class="book-ul">${sec.liste.map((l) => `<li>${l}</li>`).join("")}</ul>`;
    }
    h += `<div class="book-sig">
            <span>${esc(BUREAU.etat)}</span>
            <span>${esc(BUREAU.inspecteur.matricule)} · ${esc(BUREAU.inspecteur.ville)}</span>
          </div>`;
    return h;
  };

  const monterReglement = () => {
    const tabs = $("#book-tabs");
    tabs.innerHTML = REGLEMENT.map(
      (s, i) => `<button class="book-tab${i === 0 ? " on" : ""}" data-i="${i}">${esc(s.tab)}</button>`
    ).join("");
    $("#book-page").innerHTML = pageReglement(REGLEMENT[0]);

    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".book-tab");
      if (!b) return;
      tabs.querySelectorAll(".book-tab").forEach((t) => t.classList.remove("on"));
      b.classList.add("on");
      $("#book-page").innerHTML = pageReglement(REGLEMENT[+b.dataset.i]);
      $("#book-page").scrollTop = 0;
      SFX.click();
    });
  };

  /* ============================================================
     4. PANNEAUX
     ============================================================ */
  const ouvrir = (id) => { $("#" + id).hidden = false; SFX.click(); };
  const fermer = (id) => { $("#" + id).hidden = true; };

  const majPanneauDossiers = (verdicts) => {
    const body = $("#dossier-body");
    const tous = [...DOSSIERS];
    if (verdicts.inspecteur) tous.push(DOSSIER_FINAL);
    const lignes = tous.map((d) => {
      const v = verdicts[d.id];
      const ico = v === "ok" ? "ok" : v === "no" ? "no" : "lock";
      const sym = v === "ok" ? "✔" : v === "no" ? "✖" : "·";
      const mot = v === "ok" ? "APPROUVÉ" : v === "no" ? "REFUSÉ" : "NON TRAITÉ";
      return `<div class="rec rec-click${v ? "" : " locked"}" data-id="${d.id}" title="Convoquer au guichet">
                <span class="rec-ico ${ico}">${sym}</span>
                <span class="rec-main">
                  <span class="rec-name">${esc(d.nom)} — <span class="dim">${esc(mot)}</span></span>
                  <span class="rec-desc">${esc(d.type)} · ${d.docs.length} document(s)</span>
                </span>
              </div>`;
    });
    body.innerHTML = lignes.join("") +
      `<p class="empty-note">${Object.keys(verdicts).length} dossier(s) traité(s) sur ${DOSSIERS.length}.</p>`;
  };

  const majPanneauAnomalies = () => {
    $("#egg-count").textContent = EGGS.nombre;
    $("#egg-total").textContent = EGGS.total;
    $("#eggs-body").innerHTML = EGGS.liste().map((a) => {
      const vu = EGGS.connue(a.id);
      return `<div class="rec${vu ? "" : " locked"}">
                <span class="rec-ico ${vu ? "ok" : "lock"}">${vu ? "◈" : "◇"}</span>
                <span class="rec-main">
                  <span class="rec-name">${vu ? esc(a.nom) : "??? ??? ???"}</span>
                  <span class="rec-desc">${esc(vu ? a.secret : a.indice)}</span>
                </span>
              </div>`;
    }).join("") + `<p class="empty-note">${EGGS.nombre} / ${EGGS.total} anomalies enregistrées.</p>`;
  };

  /* ============================================================
     5. DÉCOR VIVANT
     ============================================================ */
  const SLOGANS = [
    "L'ORDRE PAR LE FORMULAIRE",
    "UN TAMPON VAUT MILLE MOTS",
    "LE DOUTE EST UN DOCUMENT MANQUANT",
    "SOURIEZ : VOUS ÊTES ENREGISTRÉ",
    "LA FILE AVANCE. VOUS AUSSI.",
  ];

  const lampe = (forcerNuit) => {
    const nuit = forcerNuit !== undefined ? forcerNuit : !document.body.classList.contains("night");
    document.body.classList.toggle("night", nuit);
    SFX.click();
    if (nuit) {
      EGGS.trouver("nuit");
      if (!$(".glow-note")) {
        const n = document.createElement("div");
        n.className = "glow-note";
        n.textContent = "« Si vous lisez ceci, c'est que vous avez éteint la lampe. Bien joué. Il y en a d'autres. » — l'inspecteur précédent";
        n.style.left = "14px";
        n.style.bottom = "16px";
        $("#desk-surface").appendChild(n);
      }
    } else {
      const n = $(".glow-note");
      if (n) n.remove();
    }
  };

  const horloge = () => {
    const el = $("#hud-clock");
    const base = 9 * 60;                        // le service commence à 09:00
    let t = 0;
    setInterval(() => {
      t += 3;                                   // 3 minutes de bureau par tick
      const m = (base + t) % (24 * 60);
      el.textContent = String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
    }, 5000);
  };

  /* ============================================================
     6. BRANCHEMENTS
     ============================================================ */
  const brancher = () => {
    // amorçage → briefing
    $("#boot-enter").addEventListener("click", () => {
      SFX.boot();
      couche("layer-brief");
    });
    $("#brief-go").addEventListener("click", () => {
      couche("layer-desk");
      document.body.classList.remove("booting");
      SFX.click();
    });

    // barre du haut
    $("#btn-dossier").addEventListener("click", () => {
      majPanneauDossiers(DESK.verdicts);
      ouvrir("ov-dossier");
    });
    // une ligne du registre convoque directement le dossier au guichet
    $("#dossier-body").addEventListener("click", (e) => {
      const row = e.target.closest(".rec-click");
      if (!row) return;
      fermer("ov-dossier");
      DESK.convoquer(row.dataset.id);
    });
    $("#btn-eggs").addEventListener("click", () => { majPanneauAnomalies(); ouvrir("ov-eggs"); });
    $("#btn-help").addEventListener("click", () => ouvrir("ov-help"));
    $("#btn-sound").addEventListener("click", (e) => {
      const on = SFX.toggle();
      e.currentTarget.textContent = on ? "♪ ON" : "♪ OFF";
      e.currentTarget.classList.toggle("on", on);
      e.currentTarget.setAttribute("aria-pressed", String(on));
      SFX.click();
    });

    // outils du bureau
    $("#tool-book").addEventListener("click", () => ouvrir("ov-book"));
    $("#tool-term").addEventListener("click", () => { TERMINAL.ouvrir(); SFX.click(); });
    $("#tool-lamp").addEventListener("click", () => lampe());

    // fermetures
    document.querySelectorAll("[data-close]").forEach((b) =>
      b.addEventListener("click", () => fermer(b.dataset.close))
    );
    document.querySelectorAll(".overlay").forEach((o) =>
      o.addEventListener("click", (e) => { if (e.target === o) o.hidden = true; })
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") document.querySelectorAll(".overlay").forEach((o) => (o.hidden = true));
    });

    // décor
    let clicsPlante = 0;
    $("#wall-plant").addEventListener("click", (e) => {
      clicsPlante++;
      e.currentTarget.style.transform = `scale(${1 + clicsPlante * 0.06}) rotate(${clicsPlante * 7}deg)`;
      SFX.click();
      if (clicsPlante >= 5) {
        EGGS.trouver("plante");
        e.currentTarget.style.transform = "";
        clicsPlante = 0;
      }
    });

    let clicsAffiche = 0;
    $("#wall-poster").addEventListener("click", () => {
      clicsAffiche++;
      $("#poster-text").textContent = SLOGANS[clicsAffiche % SLOGANS.length];
      SFX.click();
      if (clicsAffiche >= 3) EGGS.trouver("affiche");
    });

    // notification d'anomalie
    EGGS.surDecouverte((a) => {
      SFX.secret();
      DESK.toast("ANOMALIE ENREGISTRÉE", a.nom + " — " + a.secret);
      majPanneauAnomalies();
    });
    EGGS.ecouterKonami();
  };

  /* ============================================================
     DÉMARRAGE
     ============================================================ */
  remplirBriefing();
  monterReglement();
  brancher();
  majPanneauAnomalies();
  horloge();

  DESK.init({ majDossier: majPanneauDossiers });
  TERMINAL.init({
    convoquer: (id) => DESK.convoquer(id),
    lampe: (v) => lampe(v),
  });

  amorcer();
})();
