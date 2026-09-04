// ============================================================
//  LA FAILLE — SONS (synthétisés, aucun fichier)
// ============================================================
const SFX = (() => {
  "use strict";
  let ctx = null, master = null, on = false;
  const init = () => {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.24; master.connect(ctx.destination);
  };
  const pret = () => { if (!on) return false; init(); if (!ctx) return false; if (ctx.state === "suspended") ctx.resume(); return true; };
  const ton = (f, dur, vol, type = "sine", glide = null, retard = 0) => {
    const o = ctx.createOscillator(), g = ctx.createGain(), t0 = ctx.currentTime + retard;
    o.type = type; o.frequency.setValueAtTime(f, t0);
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(master); o.start(t0); o.stop(t0 + dur + 0.03);
  };
  return {
    get actif() { return on; },
    basculer() { on = !on; if (on) { init(); if (ctx && ctx.state === "suspended") ctx.resume(); } return on; },
    survol() { if (pret()) ton(880, 0.05, 0.05, "sine"); },
    choisir() { if (pret()) { ton(587, 0.14, 0.12, "triangle"); ton(880, 0.2, 0.06, "sine", null, 0.03); } },
    verrouiller() { if (pret()) { ton(196, 0.5, 0.18, "sawtooth", 98); ton(784, 0.35, 0.09, "triangle", null, 0.05); ton(1175, 0.3, 0.05, "sine", null, 0.11); } },
    onglet() { if (pret()) ton(440, 0.09, 0.08, "square"); },
  };
})();
