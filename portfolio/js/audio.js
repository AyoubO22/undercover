// ============================================================
//  BUREAU — BRUITAGES
//  Tout est synthétisé au moment où ça sonne : aucun fichier son.
// ============================================================

const SFX = (() => {
  "use strict";

  let ctx = null;
  let master = null;
  let on = false;

  const init = () => {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.25;
    master.connect(ctx.destination);
  };

  const ready = () => {
    if (!on) return false;
    init();
    if (!ctx) return false;
    if (ctx.state === "suspended") ctx.resume();
    return true;
  };

  // --- bruit blanc réutilisable (pour le papier et le tampon) ---
  let noiseBuf = null;
  const noise = () => {
    if (!noiseBuf) {
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    return src;
  };

  const tone = ({ type = "square", freq = 220, dur = 0.12, vol = 0.3, glide = null }) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    if (glide) o.frequency.exponentialRampToValueAtTime(glide, ctx.currentTime + dur);
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g).connect(master);
    o.start();
    o.stop(ctx.currentTime + dur + 0.02);
  };

  const burst = ({ dur = 0.09, vol = 0.3, freq = 1600, q = 1 }) => {
    const src = noise();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    f.type = "bandpass";
    f.frequency.value = freq;
    f.Q.value = q;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    src.connect(f).connect(g).connect(master);
    src.start();
    src.stop(ctx.currentTime + dur + 0.02);
  };

  return {
    get enabled() { return on; },

    toggle() {
      on = !on;
      if (on) { init(); if (ctx && ctx.state === "suspended") ctx.resume(); }
      return on;
    },

    // sonnette du guichet
    buzz() {
      if (!ready()) return;
      tone({ type: "square", freq: 196, dur: 0.16, vol: 0.22 });
      setTimeout(() => ready() && tone({ type: "square", freq: 147, dur: 0.22, vol: 0.18 }), 110);
    },

    // papier qui glisse sur le bureau
    paper() {
      if (!ready()) return;
      burst({ dur: 0.16, vol: 0.16, freq: 2600, q: 0.6 });
    },

    // coup de tampon : claquement + résonance basse
    stamp(ok) {
      if (!ready()) return;
      burst({ dur: 0.06, vol: 0.5, freq: 900, q: 0.4 });
      tone({ type: "sine", freq: 90, dur: 0.18, vol: 0.4, glide: 45 });
      setTimeout(() => {
        if (!ready()) return;
        if (ok) { tone({ type: "square", freq: 660, dur: 0.07, vol: 0.12 }); }
        else { tone({ type: "sawtooth", freq: 150, dur: 0.16, vol: 0.12, glide: 90 }); }
      }, 90);
    },

    // frappe clavier / défilement de texte
    key() {
      if (!ready()) return;
      burst({ dur: 0.02, vol: 0.09, freq: 2200 + Math.random() * 900, q: 2 });
    },

    // interface
    click() {
      if (!ready()) return;
      tone({ type: "square", freq: 520, dur: 0.04, vol: 0.1 });
    },

    // anomalie découverte
    secret() {
      if (!ready()) return;
      [523, 659, 784, 1047].forEach((f, i) =>
        setTimeout(() => ready() && tone({ type: "triangle", freq: f, dur: 0.14, vol: 0.16 }), i * 80)
      );
    },

    // amorçage machine
    boot() {
      if (!ready()) return;
      tone({ type: "sine", freq: 110, dur: 0.5, vol: 0.2, glide: 440 });
    },
  };
})();
