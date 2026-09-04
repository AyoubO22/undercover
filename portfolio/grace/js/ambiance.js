// ============================================================
//  SITE DE GRÂCE — AMBIANCE
//  L'arbre d'or à l'horizon, les braises qui montent, la brume,
//  et la lueur du site de grâce. Tout est dessiné sur canvas :
//  aucune image n'est chargée.
// ============================================================

const AMBIANCE = (() => {
  "use strict";

  const sobre = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const boucles = [];

  const ajuster = (cv) => {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    const r = cv.getBoundingClientRect();
    cv.width = Math.max(1, Math.floor(r.width * d));
    cv.height = Math.max(1, Math.floor(r.height * d));
    const ctx = cv.getContext("2d");
    ctx.setTransform(d, 0, 0, d, 0, 0);
    return { ctx, l: r.width, h: r.height };
  };

  const rng = (graine) => {
    let a = (graine >>> 0) || 1;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  /* ============================================================
     L'ARBRE
     Ramification récursive, tracée une seule fois puis laissée
     en place : seule sa lueur respire, par filtre CSS.
     ============================================================ */
  const arbre = (cv, graine = 7) => {
    const peindre = () => {
      const { ctx, l, h } = ajuster(cv);
      const r = rng(graine);
      ctx.clearRect(0, 0, l, h);

      const cx = l / 2;
      const sol = h * 1.02;
      const base = Math.min(h * 0.27, l * 0.12);

      // teinte du tronc vers la cime
      const teinte = (p) => {
        const c0 = [38, 26, 12], c1 = [244, 216, 150];
        return `rgb(${c0.map((v, i) => Math.round(v + (c1[i] - v) * p)).join(",")})`;
      };

      const branches = [];
      const pousser = (x, y, angle, longueur, largeur, prof) => {
        const x2 = x + Math.cos(angle) * longueur;
        const y2 = y + Math.sin(angle) * longueur;
        branches.push([x, y, x2, y2, largeur, 1 - prof / 11]);
        if (prof <= 0 || longueur < 2) return;

        const ouverture = 0.17 + r() * 0.17;
        const facteur = 0.77 + r() * 0.07;
        pousser(x2, y2, angle - ouverture * (0.7 + r() * 0.6), longueur * facteur, largeur * 0.72, prof - 1);
        pousser(x2, y2, angle + ouverture * (0.7 + r() * 0.6), longueur * facteur, largeur * 0.72, prof - 1);
        if (prof > 6 && r() < 0.32) {
          pousser(x2, y2, angle + (r() - 0.5) * 0.5, longueur * facteur * 0.8, largeur * 0.55, prof - 2);
        }
      };
      pousser(cx, sol, -Math.PI / 2, base, Math.max(9, l * 0.012), 10);

      // halo de la couronne
      const halo = ctx.createRadialGradient(cx, h * 0.36, 0, cx, h * 0.36, h * 0.52);
      halo.addColorStop(0, "rgba(226, 182, 82, 0.20)");
      halo.addColorStop(0.45, "rgba(190, 145, 55, 0.08)");
      halo.addColorStop(1, "rgba(150, 110, 30, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, l, h);

      // passe diffuse, puis passe nette
      for (const [flou, alpha, largeurPlus] of [[15, 0.40, 1.5], [0, 1, 0]]) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = "rgba(240, 200, 110, 0.85)";
        ctx.shadowBlur = flou;
        ctx.lineCap = "round";
        for (const [x1, y1, x2, y2, w, p] of branches) {
          ctx.strokeStyle = teinte(p);
          ctx.lineWidth = Math.max(0.5, w + largeurPlus * p);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // bourgeons de lumière au bout des plus fines branches
      ctx.globalCompositeOperation = "lighter";
      for (const [, , x2, y2, w, p] of branches) {
        if (w > 1.2 || p < 0.7) continue;
        const g = ctx.createRadialGradient(x2, y2, 0, x2, y2, 5);
        g.addColorStop(0, "rgba(255, 244, 206, 0.34)");
        g.addColorStop(1, "rgba(230, 190, 90, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x2, y2, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    peindre();
    let attente = null;
    window.addEventListener("resize", () => {
      clearTimeout(attente);
      attente = setTimeout(peindre, 240);
    });
  };

  /* ============================================================
     BRAISES ET BRUME
     ============================================================ */
  const braises = (cv) => {
    let { ctx, l, h } = ajuster(cv);
    const N = sobre ? 26 : 76;
    const p = Array.from({ length: N }, () => nouvelle(l, h, true));
    let t = 0;

    function nouvelle(l, h, partout) {
      return {
        x: Math.random() * l,
        y: partout ? Math.random() * h : h + 10,
        r: 0.4 + Math.random() * 1.7,
        v: 0.10 + Math.random() * 0.40,
        d: Math.random() * Math.PI * 2,
        a: 0.14 + Math.random() * 0.5,
        p: 0.004 + Math.random() * 0.012,
        t: Math.random() * 100,
      };
    }

    const trace = () => {
      t++;
      ctx.clearRect(0, 0, l, h);

      // brume basse, très lente
      const brume = ctx.createLinearGradient(0, h * 0.55, 0, h);
      const d = Math.sin(t * 0.004) * 0.03;
      brume.addColorStop(0, "rgba(120, 96, 56, 0)");
      brume.addColorStop(1, `rgba(126, 100, 58, ${0.085 + d})`);
      ctx.fillStyle = brume;
      ctx.fillRect(0, 0, l, h);

      ctx.globalCompositeOperation = "lighter";
      for (const b of p) {
        b.t += 1;
        b.y -= b.v;
        b.x += Math.sin(b.t * 0.011 + b.d) * 0.3;
        if (b.y < -12) Object.assign(b, nouvelle(l, h, false));
        const scint = b.a * (0.5 + 0.5 * Math.sin(b.t * b.p * 12));
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 4.5);
        g.addColorStop(0, `rgba(248, 226, 168, ${scint})`);
        g.addColorStop(0.4, `rgba(206, 164, 62, ${scint * 0.45})`);
        g.addColorStop(1, "rgba(200, 160, 50, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const id = setInterval(trace, sobre ? 200 : 33);
    boucles.push(id);
    window.addEventListener("resize", () => { ({ ctx, l, h } = ajuster(cv)); });
    trace();
  };

  /* ============================================================
     LA LUEUR DU SITE DE GRÂCE
     ============================================================ */
  const grace = (cv) => {
    let { ctx, l, h } = ajuster(cv);
    let t = 0;
    const brins = sobre ? 4 : 9;

    const trace = () => {
      t += sobre ? 0.4 : 0.9;
      ctx.clearRect(0, 0, l, h);
      const cx = l / 2, cy = h * 0.72;
      ctx.globalCompositeOperation = "lighter";

      const pulse = 0.55 + 0.18 * Math.sin(t * 0.02);
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.62);
      halo.addColorStop(0, `rgba(255, 236, 178, ${0.5 * pulse})`);
      halo.addColorStop(0.18, `rgba(216, 172, 62, ${0.28 * pulse})`);
      halo.addColorStop(0.55, `rgba(150, 110, 30, ${0.08 * pulse})`);
      halo.addColorStop(1, "rgba(120, 88, 20, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, l, h);

      for (let i = 0; i < brins; i++) {
        const ph = (i / brins) * Math.PI * 2;
        const haut = h * (0.42 + 0.22 * Math.sin(t * 0.011 + i));
        const larg = 16 + 12 * Math.sin(t * 0.017 + ph);
        const ecart = (i - (brins - 1) / 2) * 11;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(
          cx + ecart * 0.35 + Math.sin(t * 0.014 + ph) * larg, cy - haut * 0.35,
          cx + ecart + Math.sin(t * 0.009 + ph * 1.7) * larg * 1.4, cy - haut * 0.7,
          cx + ecart * 1.4 + Math.sin(t * 0.007 + ph) * larg * 0.8, cy - haut
        );
        const grad = ctx.createLinearGradient(cx, cy, cx, cy - haut);
        grad.addColorStop(0, "rgba(255, 240, 195, .55)");
        grad.addColorStop(0.5, "rgba(216, 172, 62, .22)");
        grad.addColorStop(1, "rgba(180, 140, 40, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      const noyau = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26);
      noyau.addColorStop(0, `rgba(255, 250, 226, ${0.9 * pulse})`);
      noyau.addColorStop(0.35, `rgba(240, 208, 120, ${0.4 * pulse})`);
      noyau.addColorStop(1, "rgba(200, 160, 50, 0)");
      ctx.fillStyle = noyau;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
    };

    const id = setInterval(trace, sobre ? 200 : 33);
    boucles.push(id);
    window.addEventListener("resize", () => { ({ ctx, l, h } = ajuster(cv)); });
    trace();
  };

  return { arbre, braises, grace, arreter: () => boucles.forEach(clearInterval) };
})();
