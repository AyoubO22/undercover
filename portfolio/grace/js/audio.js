// ============================================================
//  SITE DE GRÂCE — SONS
//  Cloches basses et souffles, synthétisés à la volée.
//  Aucun fichier audio n'est chargé.
// ============================================================

const SFX = (() => {
  "use strict";

  let ctx = null, master = null, on = false, souffle = null;

  const init = () => {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.3;
    master.connect(ctx.destination);
  };

  const pret = () => {
    if (!on) return false;
    init();
    if (!ctx) return false;
    if (ctx.state === "suspended") ctx.resume();
    return true;
  };

  let bruitBuf = null;
  const bruit = () => {
    if (!bruitBuf) {
      bruitBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = bruitBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = ctx.createBufferSource();
    s.buffer = bruitBuf;
    return s;
  };

  // une partielle de cloche
  const partielle = (f, dur, vol, type = "sine", retard = 0) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    const t0 = ctx.currentTime + retard;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  };

  return {
    get actif() { return on; },

    basculer() {
      on = !on;
      if (on) { init(); if (ctx && ctx.state === "suspended") ctx.resume(); this.souffle(true); }
      else if (souffle) { try { souffle.stop(); } catch {} souffle = null; }
      return on;
    },

    // déplacement dans un menu : un souffle très court
    deplacer() {
      if (!pret()) return;
      const s = bruit(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      f.type = "bandpass"; f.frequency.value = 2400; f.Q.value = 1.6;
      g.gain.setValueAtTime(0.10, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
      s.connect(f).connect(g).connect(master);
      s.start(); s.stop(ctx.currentTime + 0.1);
    },

    // sélection : une cloche grave à longue traîne
    choisir() {
      if (!pret()) return;
      partielle(196, 1.6, 0.16);
      partielle(294, 1.2, 0.07, "sine", 0.01);
      partielle(392, 0.9, 0.04, "triangle", 0.02);
    },

    // retour en arrière : plus sourd, plus court
    revenir() {
      if (!pret()) return;
      partielle(147, 0.7, 0.12);
      partielle(110, 0.9, 0.07);
    },

    // découverte : accord ascendant
    decouverte() {
      if (!pret()) return;
      [262, 330, 392, 523].forEach((f, i) => partielle(f, 1.4 - i * 0.15, 0.10, "sine", i * 0.13));
    },

    // se reposer au site de grâce
    grace() {
      if (!pret()) return;
      partielle(131, 3.2, 0.14);
      partielle(196, 2.8, 0.09, "sine", 0.05);
      partielle(262, 2.4, 0.06, "sine", 0.1);
      partielle(330, 2.0, 0.03, "triangle", 0.15);
    },

    // nappe de fond très basse
    souffle(demarrer) {
      if (!pret() || !demarrer || souffle) return;
      const s = bruit(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.loop = true;
      f.type = "lowpass"; f.frequency.value = 190; f.Q.value = 0.6;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 3);
      s.connect(f).connect(g).connect(master);
      s.start();
      souffle = s;
    },
  };
})();
