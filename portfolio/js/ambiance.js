// ============================================================
//  SITE DE GRÂCE — AMBIANCE
//  Braises qui montent, brume lente, et la lueur du site de
//  grâce. Tout est dessiné sur canvas : aucune image.
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

  /* ---------- braises ambiantes ---------- */
  const braises = (cv) => {
    let { ctx, l, h } = ajuster(cv);
    const N = sobre ? 24 : 64;
    const p = Array.from({ length: N }, () => nouvelle(l, h, true));

    function nouvelle(l, h, partout) {
      return {
        x: Math.random() * l,
        y: partout ? Math.random() * h : h + 10,
        r: 0.5 + Math.random() * 1.6,
        v: 0.12 + Math.random() * 0.42,          // vitesse de montée
        d: Math.random() * Math.PI * 2,           // phase de dérive
        a: 0.15 + Math.random() * 0.5,            // opacité
        p: 0.004 + Math.random() * 0.012,         // pulsation
        t: Math.random() * 100,
      };
    }

    const trace = () => {
      ctx.clearRect(0, 0, l, h);
      ctx.globalCompositeOperation = "lighter";
      for (const b of p) {
        b.t += 1;
        b.y -= b.v;
        b.x += Math.sin(b.t * 0.012 + b.d) * 0.28;
        if (b.y < -12) Object.assign(b, nouvelle(l, h, false));
        const scint = b.a * (0.55 + 0.45 * Math.sin(b.t * b.p * 12));
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 4);
        g.addColorStop(0, `rgba(240, 216, 150, ${scint})`);
        g.addColorStop(0.4, `rgba(201, 162, 39, ${scint * 0.5})`);
        g.addColorStop(1, "rgba(201, 162, 39, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const id = setInterval(trace, sobre ? 200 : 33);
    boucles.push(id);
    window.addEventListener("resize", () => { ({ ctx, l, h } = ajuster(cv)); });
    trace();
  };

  /* ---------- la lueur du site de grâce ---------- */
  const grace = (cv) => {
    let { ctx, l, h } = ajuster(cv);
    let t = 0;
    const brins = sobre ? 4 : 9;

    const trace = () => {
      t += sobre ? 0.4 : 0.9;
      ctx.clearRect(0, 0, l, h);
      const cx = l / 2, cy = h * 0.72;

      ctx.globalCompositeOperation = "lighter";

      // halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.62);
      const pulse = 0.55 + 0.18 * Math.sin(t * 0.02);
      halo.addColorStop(0, `rgba(255, 236, 178, ${0.5 * pulse})`);
      halo.addColorStop(0.18, `rgba(216, 172, 62, ${0.28 * pulse})`);
      halo.addColorStop(0.55, `rgba(150, 110, 30, ${0.08 * pulse})`);
      halo.addColorStop(1, "rgba(120, 88, 20, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, l, h);

      // brins de lumière qui s'élèvent
      for (let i = 0; i < brins; i++) {
        const ph = (i / brins) * Math.PI * 2;
        const haut = h * (0.42 + 0.22 * Math.sin(t * 0.011 + i));
        const larg = 16 + 12 * Math.sin(t * 0.017 + ph);
        // les brins s'écartent en éventail au lieu de se superposer
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

      // cœur
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

  return { braises, grace, arreter: () => boucles.forEach(clearInterval) };
})();
