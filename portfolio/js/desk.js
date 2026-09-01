// ============================================================
//  BUREAU — LE POSTE DE CONTRÔLE
//  File d'attente, candidats au guichet, papiers sur le bureau,
//  déplacement, agrandissement et coups de tampon.
// ============================================================

const DESK = (() => {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const compact = () => window.matchMedia("(max-width: 700px)").matches;

  const etat = {
    file: [],            // ids restant à recevoir
    courant: null,       // dossier au guichet
    verdicts: {},        // { id: "ok" | "no" }
    refusSuite: 0,
    tampon: null,        // "ok" | "no" quand un tampon est en main
    tamponne: false,     // le dossier courant a-t-il déjà été frappé
    finalDebloque: false,
    jeton: 0,            // change à chaque candidat : coupe les répliques en retard
    z: 10,
  };

  let els = {};
  const hooks = {};

  /* ---------------- outils ---------------- */

  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const tousLesDossiers = () => [...DOSSIERS, DOSSIER_FINAL];
  const parId = (id) => tousLesDossiers().find((d) => d.id === id);

  const toast = (titre, texte) => {
    els.toast.innerHTML = `<b>${esc(titre)}</b>${esc(texte)}`;
    els.toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { els.toast.hidden = true; }, 4200);
  };

  /* ---------------- guichet ---------------- */

  let typing = null;
  const dire = (qui, texte) => {
    if (!qui || !texte) return;
    els.dialogue.hidden = false;
    els.who.textContent = qui;
    clearInterval(typing);
    let i = 0;
    els.dtext.textContent = "";
    typing = setInterval(() => {
      els.dtext.textContent = texte.slice(0, ++i);
      if (i % 3 === 0) SFX.key();
      if (i >= texte.length) clearInterval(typing);
    }, 18);
  };

  const repliquesEnChaine = (lignes) => {
    const jeton = etat.jeton;                 // le candidat du moment
    const qui = etat.courant.nom;
    let n = 0;
    const suite = () => {
      // le candidat est parti (ou un autre est arrivé) : on se tait
      if (jeton !== etat.jeton || n >= lignes.length) return;
      dire(qui, lignes[n]);
      n++;
      setTimeout(suite, 1400 + lignes[n - 1].length * 22);
    };
    suite();
  };

  const dessinerFile = () => {
    const n = Math.min(etat.file.length, 4);
    els.queue.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const s = document.createElement("i");
      s.style.left = 6 + i * 17 + "px";
      s.style.opacity = 0.55 - i * 0.1;
      s.style.transform = `scaleX(${0.9 + i * 0.05})`;
      els.queue.appendChild(s);
    }
    els.queueNum.textContent = etat.file.length;
  };

  /* ---------------- documents ---------------- */

  const barcode = (graine) => {
    let a = graine;
    let out = "";
    for (let i = 0; i < 26; i++) {
      a = (a * 1103515245 + 12345) & 0x7fffffff;
      out += `<i style="width:${1 + (a % 3)}px;opacity:${a % 2 ? 1 : 0.25}"></i>`;
    }
    return `<div class="doc-code">${out}</div>`;
  };

  const corpsDoc = (doc, dossier, n) => {
    const num = String(dossier.graine).padStart(5, "0").slice(0, 5);
    const tete = `<div class="doc-head">
        <span class="doc-kind">${esc((doc.kind || "").toUpperCase())}</span>
        <span class="doc-no">N°${num}-${n + 1}</span>
      </div>`;

    let inner = "";
    if (doc.kind === "passeport") {
      inner += doc.photo
        ? `<div class="doc-photo"><img src="${PORTRAITS.photoURL(dossier.graine)}" alt=""></div>`
        : "";
      inner += `<div class="doc-title">${esc(doc.titre)}</div>`;
      if (doc.sous) inner += `<div class="doc-sub">${esc(doc.sous)}</div>`;
      (doc.champs || []).forEach(([k, v]) => {
        inner += `<div class="doc-row"><span>${esc(k)}</span><span>${esc(v)}</span></div>`;
      });
      inner += barcode(dossier.graine);
    } else if (doc.kind === "note") {
      inner += `<div class="doc-title">${esc(doc.titre)}</div>`;
      if (doc.texte) inner += `<div class="doc-body">${esc(doc.texte)}</div>`;
      if (doc.points) inner += `<ul class="doc-list">${doc.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
    } else {
      inner += `<div class="doc-title">${esc(doc.titre)}</div>`;
      if (doc.texte) inner += `<div class="doc-body">${esc(doc.texte)}</div>`;
      if (doc.liens) {
        inner += `<div class="doc-links">${doc.liens
          .map((l) => `<a class="doc-link" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
          .join("")}</div>`;
      }
      inner += `<div class="doc-seal">VISA ${esc(BUREAU.etat)} · ${num}</div>`;
    }

    return tete + inner + `<div class="doc-hint">clic : agrandir</div>`;
  };

  const poserDoc = (doc, dossier, n, total) => {
    const el = document.createElement("article");
    el.className = "doc doc-" + doc.kind;
    el.dataset.kind = doc.kind;
    el.innerHTML = corpsDoc(doc, dossier, n);
    el.style.zIndex = ++etat.z;
    el.style.animationDelay = n * 0.12 + "s";

    if (!compact()) {
      const w = els.surface.clientWidth;
      const h = els.surface.clientHeight;
      const large = 212;
      // on étale les papiers sur la largeur disponible, sans les coller
      const pas = total > 1 ? Math.min(large + 22, (w - large - 24) / (total - 1)) : 0;
      const x = Math.max(8, Math.min(w - large - 8, 14 + n * pas + (dossier.graine % 13)));
      const y = Math.max(8, Math.min(Math.max(10, h - 150), 12 + (n % 2) * 34 + ((dossier.graine >> 3) % 17)));
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = `rotate(${(((dossier.graine >> n) % 9) - 4) * 0.9}deg)`;
    }

    els.surface.appendChild(el);
    rendreDeplacable(el);
    setTimeout(() => SFX.paper(), n * 120);
    return el;
  };

  const viderBureau = (glisser) => {
    [...els.surface.querySelectorAll(".doc")].forEach((el, i) => {
      if (!glisser) return el.remove();
      el.style.transition = "transform .35s ease-in, opacity .35s ease-in";
      el.style.transformOrigin = "50% 50%";
      setTimeout(() => {
        el.style.transform += " translate(-140%, 30%) rotate(-16deg)";
        el.style.opacity = "0";
      }, i * 70);
      setTimeout(() => el.remove(), 500 + i * 70);
    });
  };

  /* ---------------- déplacement / agrandissement ---------------- */

  const rendreDeplacable = (el) => {
    let sx = 0, sy = 0, ox = 0, oy = 0, bouge = false, actif = false;

    el.addEventListener("pointerdown", (e) => {
      if (el.classList.contains("zoom")) return;
      if (e.target.closest("a")) return;
      if (etat.tampon) return;              // tampon en main : on frappe, on ne glisse pas
      if (compact()) return;                // en mode empilé, les papiers ne bougent pas
      actif = true; bouge = false;
      sx = e.clientX; sy = e.clientY;
      ox = parseFloat(el.style.left) || 0;
      oy = parseFloat(el.style.top) || 0;
      el.style.zIndex = ++etat.z;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", (e) => {
      if (!actif) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (!bouge && Math.hypot(dx, dy) > 4) { bouge = true; el.classList.add("dragging"); }
      if (!bouge) return;
      const w = els.surface.clientWidth, h = els.surface.clientHeight;
      el.style.left = Math.max(-60, Math.min(w - 40, ox + dx)) + "px";
      el.style.top = Math.max(-20, Math.min(h - 40, oy + dy)) + "px";
    });

    const fin = () => { actif = false; el.classList.remove("dragging"); };
    el.addEventListener("pointerup", fin);
    el.addEventListener("pointercancel", fin);

    el.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      if (bouge) { bouge = false; return; }

      // tampon en main : on frappe le passeport là où on a cliqué
      if (etat.tampon) { frapper(el, e); return; }

      const ouvert = el.classList.contains("zoom");
      els.surface.querySelectorAll(".doc.zoom").forEach((d) => d.classList.remove("zoom"));
      if (!ouvert) {
        el.classList.add("zoom");
        el.style.zIndex = ++etat.z;
      }
      SFX.click();
    });
  };

  /* ---------------- tampons ---------------- */

  const prendreTampon = (v) => {
    if (!etat.courant || etat.tamponne) return;
    etat.tampon = etat.tampon === v ? null : v;
    document.body.classList.toggle("armed", !!etat.tampon);
    els.stampOk.classList.toggle("armed", etat.tampon === "ok");
    els.stampNo.classList.toggle("armed", etat.tampon === "no");
    els.cursor.hidden = !etat.tampon;
    if (etat.tampon) {
      els.cursor.className = "stamp-cursor " + etat.tampon;
      els.cursor.textContent = etat.tampon === "ok" ? "APPROUVÉ" : "REFUSÉ";
      els.surface.querySelectorAll(".doc.zoom").forEach((d) => d.classList.remove("zoom"));
      toast("TAMPON EN MAIN", "Frappez le passeport du candidat.");
    }
    SFX.click();
  };

  const frapper = (el, e) => {
    if (el.dataset.kind !== "passeport") {
      toast("MAUVAIS DOCUMENT", "Le tampon va sur le passeport.");
      return;
    }
    const v = etat.tampon;
    const d = etat.courant;

    const ink = document.createElement("div");
    ink.className = "ink " + v;
    ink.textContent = v === "ok" ? "APPROUVÉ" : "REFUSÉ";
    ink.style.setProperty("--rot", `${-14 + (d.graine % 9)}deg`);
    el.appendChild(ink);

    // l'encre tombe là où le tampon a frappé, sans déborder du papier
    const r = el.getBoundingClientRect();
    const iw = ink.offsetWidth, ih = ink.offsetHeight;
    const cx = e ? e.clientX - r.left : el.clientWidth / 2;
    const cy = e ? e.clientY - r.top : el.clientHeight / 2;
    ink.style.left = Math.max(4, Math.min(el.clientWidth - iw - 4, cx - iw / 2)) + "px";
    ink.style.top = Math.max(4, Math.min(el.clientHeight - ih - 4, cy - ih / 2)) + "px";
    el.classList.add("shake");
    SFX.stamp(v === "ok");

    etat.tamponne = true;
    etat.tampon = null;
    document.body.classList.remove("armed");
    els.cursor.hidden = true;
    els.stampOk.classList.remove("armed");
    els.stampNo.classList.remove("armed");
    els.stampOk.disabled = els.stampNo.disabled = true;

    etat.verdicts[d.id] = v;
    etat.refusSuite = v === "no" ? etat.refusSuite + 1 : 0;
    majCompteurs();

    // anomalies liées aux verdicts
    if (etat.refusSuite >= 3) EGGS.trouver("impitoyable");
    if (d.id === "inspecteur") EGGS.trouver("auto-tampon");
    const tousApprouves = DOSSIERS.every((x) => etat.verdicts[x.id] === "ok");
    if (tousApprouves) EGGS.trouver("zele");

    const jeton = etat.jeton;
    setTimeout(() => { if (jeton === etat.jeton) dire(d.nom, v === "ok" ? d.oui : d.non); }, 700);
    setTimeout(() => { if (jeton === etat.jeton) partir(); }, 2600);
  };

  const partir = () => {
    etat.jeton++;
    viderBureau(true);
    PORTRAITS.demonter();
    els.applicant.hidden = true;
    els.windowEmpty.hidden = false;
    etat.courant = null;
    etat.tamponne = false;
    els.stampOk.disabled = els.stampNo.disabled = true;
    els.buzzer.disabled = false;
    setTimeout(() => { els.dialogue.hidden = true; }, 1200);
    if (!etat.file.length && !etat.finalDebloque) debloquerFinal();
  };

  /* ---------------- déroulé ---------------- */

  const accueillir = (dossier) => {
    etat.jeton++;
    etat.courant = dossier;
    etat.tamponne = false;
    els.hint && els.hint.remove();
    els.windowEmpty.hidden = true;
    els.applicant.hidden = false;
    PORTRAITS.monter(els.portrait, dossier.graine);
    els.applicant.style.animation = "none";
    void els.applicant.offsetWidth;
    els.applicant.style.animation = "";

    viderBureau(false);
    dossier.docs.forEach((doc, n) =>
      setTimeout(() => poserDoc(doc, dossier, n, dossier.docs.length), 260 + n * 150));

    repliquesEnChaine(dossier.repliques);
    els.buzzer.disabled = true;
    setTimeout(() => {
      els.stampOk.disabled = els.stampNo.disabled = false;
    }, 500);
    dessinerFile();
  };

  const suivant = () => {
    if (etat.courant) return;
    if (!etat.file.length) {
      if (!etat.finalDebloque) return debloquerFinal();
      toast("FILE VIDE", "Plus personne au guichet. Le service est terminé.");
      return;
    }
    SFX.buzz();
    const id = etat.file.shift();
    setTimeout(() => accueillir(parId(id)), 420);
  };

  const debloquerFinal = () => {
    etat.finalDebloque = true;
    etat.file.push(DOSSIER_FINAL.id);
    dessinerFile();
    toast("DERNIER DOSSIER", "Un dernier candidat s'est présenté au guichet.");
    els.buzzer.disabled = false;
  };

  /** Convoque un dossier hors file (utilisé par le terminal). */
  const convoquer = (id) => {
    const d = parId(id);
    if (!d) return;
    etat.file = etat.file.filter((x) => x !== id);
    if (etat.courant) { viderBureau(true); }
    setTimeout(() => accueillir(d), etat.courant ? 400 : 0);
  };

  const majCompteurs = () => {
    const n = Object.keys(etat.verdicts).length;
    els.count.textContent = n;
    els.total.textContent = DOSSIERS.length + (etat.finalDebloque ? 1 : 0);
    if (hooks.majDossier) hooks.majDossier(etat.verdicts);
  };

  /* ---------------- init ---------------- */

  return {
    get verdicts() { return etat.verdicts; },
    suivant, convoquer,

    init(h) {
      Object.assign(hooks, h);
      els = {
        surface: $("#desk-surface"),
        hint: $("#desk-hint"),
        queue: $("#queue-shadows"),
        queueNum: $("#queue-num"),
        applicant: $("#applicant"),
        portrait: $("#applicant-portrait"),
        windowEmpty: $("#window-empty"),
        dialogue: $("#dialogue"),
        who: $("#dialogue-who"),
        dtext: $("#dialogue-text"),
        buzzer: $("#buzzer"),
        stampOk: $("#stamp-ok"),
        stampNo: $("#stamp-no"),
        cursor: $("#stamp-cursor"),
        toast: $("#toast"),
        count: $("#hud-count"),
        total: $("#hud-total"),
      };

      etat.file = DOSSIERS.map((d) => d.id);
      dessinerFile();
      majCompteurs();
      els.stampOk.disabled = els.stampNo.disabled = true;

      els.buzzer.addEventListener("click", suivant);
      els.stampOk.addEventListener("click", () => prendreTampon("ok"));
      els.stampNo.addEventListener("click", () => prendreTampon("no"));

      // le tampon suit la souris
      document.addEventListener("pointermove", (e) => {
        if (!etat.tampon) return;
        els.cursor.style.left = e.clientX + "px";
        els.cursor.style.top = e.clientY + "px";
      });

      // reposer le tampon en cliquant à côté
      els.surface.addEventListener("click", (e) => {
        if (etat.tampon && e.target === els.surface) prendreTampon(etat.tampon);
      });

      // échap : referme un document agrandi
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") els.surface.querySelectorAll(".doc.zoom").forEach((d) => d.classList.remove("zoom"));
      });
    },

    toast,
  };
})();
