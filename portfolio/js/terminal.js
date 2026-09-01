// ============================================================
//  BUREAU — TERMINAL DE SERVICE
// ------------------------------------------------------------
//  👉 POUR AJOUTER UNE COMMANDE : une entrée dans COMMANDES.
//     { aide: "texte affiché dans l'aide" | null si cachée,
//       run: (args) => ... }
// ============================================================

const TERMINAL = (() => {
  "use strict";

  const hooks = {};                 // branchés par main.js
  let body, input, form, overlay;
  const histo = [];
  let hi = -1;

  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /** Écrit une ligne. cls : dim / warn / err / cmd */
  const dire = (txt = "", cls = "") => {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    div.innerHTML = txt;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  };

  const lien = (url, label) =>
    `<a href="${url}" target="_blank" rel="noopener">${esc(label || url)}</a>`;

  const tableau = (paires) =>
    paires.forEach(([k, v]) => dire(`  <span class="dim">${esc(k.padEnd(12, " "))}</span>${v}`));

  /* ---------------- les commandes ---------------- */
  const COMMANDES = {

    aide: {
      aide: "la liste que vous lisez",
      run() {
        dire("COMMANDES DISPONIBLES", "warn");
        Object.entries(COMMANDES)
          .filter(([, c]) => c.aide)
          .forEach(([nom, c]) => dire(`  <span class="cmd">${nom.padEnd(12, " ")}</span><span class="dim">${c.aide}</span>`));
        dire("");
        dire("Toutes les commandes ne sont pas dans cette liste.", "dim");
      },
    },

    qui: {
      aide: "identité de l'inspecteur",
      run() {
        const i = BUREAU.inspecteur;
        dire("IDENTITÉ VÉRIFIÉE", "warn");
        tableau([
          ["nom", i.nom],
          ["matricule", i.matricule],
          ["poste", i.poste],
          ["ville", i.ville],
          ["github", lien(i.github, "@AyoubO22")],
          ["linkedin", lien(i.linkedin, "ayoub-ouaadoud")],
          ["courriel", lien("mailto:" + i.email, i.email)],
        ]);
      },
    },

    dossiers: {
      aide: "liste les dossiers du bureau",
      run() {
        dire("REGISTRE DES DOSSIERS", "warn");
        DOSSIERS.forEach((d, n) =>
          dire(`  ${String(n + 1).padStart(2, "0")}  <span class="cmd">${d.id.padEnd(12, " ")}</span><span class="dim">${esc(d.nom)} — ${esc(d.type)}</span>`)
        );
        dire("");
        dire('Utilisez <span class="cmd">ouvrir &lt;id&gt;</span> pour convoquer un dossier au guichet.', "dim");
      },
    },

    ouvrir: {
      aide: "convoque un dossier : ouvrir undercover",
      run(args) {
        const id = (args[0] || "").toLowerCase();
        if (!id) return dire("Usage : ouvrir &lt;id&gt;  (voir : dossiers)", "err");
        const d = DOSSIERS.find((x) => x.id === id);
        if (!d) return dire(`Aucun dossier « ${esc(id)} » au registre.`, "err");
        dire(`Convocation de ${esc(d.nom)} au guichet…`, "warn");
        setTimeout(() => { fermer(); hooks.convoquer && hooks.convoquer(id); }, 450);
      },
    },

    competences: {
      aide: "habilitations techniques",
      run() {
        const sec = REGLEMENT.find((s) => s.barres);
        dire("HABILITATIONS", "warn");
        sec.barres.forEach(([nom, n]) => {
          const plein = Math.round(n / 5);
          dire(`  ${esc(nom.padEnd(14, " "))}<span class="dim">[</span>${"█".repeat(plein)}<span class="dim">${"·".repeat(20 - plein)}]</span>`);
        });
      },
    },

    parcours: {
      aide: "registre chronologique",
      run() {
        const sec = REGLEMENT.find((s) => s.tab === "PARCOURS");
        dire("REGISTRE CHRONOLOGIQUE", "warn");
        sec.liste.forEach((l) => dire("  " + l.replace(/<\/?b>/g, "")));
      },
    },

    contact: {
      aide: "voies officielles",
      run() {
        const i = BUREAU.inspecteur;
        dire("CORRESPONDANCE", "warn");
        tableau([
          ["courriel", lien("mailto:" + i.email, i.email)],
          ["linkedin", lien(i.linkedin, i.linkedin)],
          ["github", lien(i.github, i.github)],
          ["poste", i.ville],
        ]);
      },
    },

    anomalies: {
      aide: "état du registre des anomalies",
      run() {
        dire(`ANOMALIES DÉTECTÉES : ${EGGS.nombre} / ${EGGS.total}`, "warn");
        EGGS.liste().forEach((a) => {
          if (EGGS.connue(a.id)) dire(`  <span class="cmd">✔ ${esc(a.nom)}</span> <span class="dim">— ${esc(a.secret)}</span>`);
          else dire(`  <span class="dim">✖ ??? — ${esc(a.indice)}</span>`);
        });
      },
    },

    effacer: {
      aide: "vide l'écran",
      run() { body.innerHTML = ""; },
    },

    quitter: {
      aide: "referme le terminal",
      run() { fermer(); },
    },

    /* -------- non documentées -------- */

    sudo: {
      aide: null,
      run(args) {
        dire("[sudo] mot de passe pour inspecteur : <span class=\"dim\">********</span>");
        setTimeout(() => {
          dire("inspecteur n'est pas dans le fichier des sudoers.", "err");
          dire("Cet incident sera signalé au Ministère.", "err");
          EGGS.trouver("sudo");
        }, 550);
      },
    },

    nuit: {
      aide: null,
      run() {
        dire("Coupure de l'éclairage du poste…", "warn");
        hooks.lampe && hooks.lampe(true);
      },
    },

    gloire: {
      aide: null,
      run() {
        dire("▲", "warn");
        dire(BUREAU.devise, "warn");
        dire(BUREAU.etat, "dim");
      },
    },

    xyzzy: {
      aide: null,
      run() { dire("Rien ne se produit.", "dim"); },
    },

    date: {
      aide: null,
      run() {
        const d = new Date();
        dire(d.toLocaleString("fr-BE", { dateStyle: "full", timeStyle: "short" }));
      },
    },
  };

  /* ---------------- moteur ---------------- */

  const executer = (ligne) => {
    const brut = ligne.trim();
    dire(`<span class="dim">inspecteur@bureau:~$</span> <span class="cmd">${esc(brut)}</span>`);
    if (!brut) return;
    histo.unshift(brut);
    hi = -1;

    const [nom, ...args] = brut.split(/\s+/);
    const cle = nom
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const alias = {
      help: "aide", "?": "aide", whoami: "qui", moi: "qui",
      ls: "dossiers", projets: "dossiers", projects: "dossiers",
      open: "ouvrir", skills: "competences", comp: "competences",
      cv: "parcours", clear: "effacer", cls: "effacer",
      exit: "quitter", eggs: "anomalies",
    };
    const cmd = COMMANDES[alias[cle] || cle];

    if (!cmd) {
      dire(`Commande inconnue : ${esc(nom)}`, "err");
      dire('Tapez <span class="cmd">aide</span>.', "dim");
      return;
    }
    cmd.run(args);
  };

  const accueil = () => {
    body.innerHTML = "";
    dire("TERMINAL DE SERVICE — BUREAU DES ENTRÉES", "warn");
    dire(BUREAU.etat + " · poste " + BUREAU.inspecteur.matricule, "dim");
    dire("");
    dire('Tapez <span class="cmd">aide</span> pour la liste des commandes.', "dim");
    dire("");
  };

  const ouvrir = () => {
    overlay.hidden = false;
    if (!body.childElementCount) accueil();
    setTimeout(() => input.focus(), 30);
  };
  const fermer = () => { overlay.hidden = true; };

  return {
    init(h) {
      Object.assign(hooks, h);
      overlay = document.getElementById("ov-term");
      body = document.getElementById("term-body");
      input = document.getElementById("term-input");
      form = document.getElementById("term-form");

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = input.value;
        input.value = "";
        executer(v);
      });

      input.addEventListener("keydown", (e) => {
        SFX.key();
        // historique
        if (e.key === "ArrowUp") {
          e.preventDefault();
          if (hi < histo.length - 1) input.value = histo[++hi];
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (hi > 0) input.value = histo[--hi];
          else { hi = -1; input.value = ""; }
        } else if (e.key === "Tab") {
          // complétion
          e.preventDefault();
          const p = input.value.toLowerCase();
          const m = Object.keys(COMMANDES).filter((c) => c.startsWith(p) && COMMANDES[c].aide);
          if (m.length === 1) input.value = m[0] + " ";
          else if (m.length > 1) dire(m.join("   "), "dim");
        }
      });
    },
    ouvrir, fermer, dire,
  };
})();
