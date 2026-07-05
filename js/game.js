/* ============================================================
   UNDERCOVER — logique du jeu (pass-the-phone, 1 téléphone)
   ============================================================ */

(() => {
  "use strict";

  // ---------- Persistance ----------
  const LS_PLAYERS = "undercover.players";
  const LS_CUSTOM = "undercover.customPairs";
  const LS_USED = "undercover.usedPairs";

  const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  // ---------- État ----------
  const state = {
    players: load(LS_PLAYERS, []),      // ["Ayoub", "Sami", ...]
    ucCount: 1,
    mwCount: 0,
    game: null,                          // partie en cours
    pendingVote: null,                   // index du joueur sélectionné au vote
  };

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const normalize = (s) =>
    s.trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");

  const ROLE_LABEL = { civil: "Civil", undercover: "Undercover", white: "Mr. White" };
  const ROLE_CLASS = { civil: "role-civil", undercover: "role-undercover", white: "role-white" };

  // ---------- Navigation ----------
  const showScreen = (id) => {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    const el = document.getElementById(id);
    el.classList.remove("active");
    void el.offsetWidth; // relance l'animation d'entrée
    el.classList.add("active");
    window.scrollTo(0, 0);
  };

  // ============================================================
  //  CONFIGURATION
  // ============================================================
  function renderSetup() {
    const list = $("#player-list");
    list.innerHTML = "";
    state.players.forEach((name, i) => {
      const chip = document.createElement("div");
      chip.className = "player-chip";
      chip.innerHTML = `
        <span class="num type">${String(i + 1).padStart(2, "0")}</span>
        <span class="name"></span>
        <button class="remove" aria-label="Retirer">✕</button>`;
      chip.querySelector(".name").textContent = name;
      chip.querySelector(".remove").addEventListener("click", () => {
        state.players.splice(i, 1);
        save(LS_PLAYERS, state.players);
        clampRoles();
        renderSetup();
      });
      list.appendChild(chip);
    });

    $("#uc-count").textContent = state.ucCount;
    $("#mw-count").textContent = state.mwCount;

    const civils = state.players.length - state.ucCount - state.mwCount;
    $("#role-summary").textContent =
      state.players.length >= 3
        ? `→ ${Math.max(civils, 0)} civils · ${state.ucCount} undercover · ${state.mwCount} mr. white`
        : "ajoute au moins 3 agents";
    $("#setup-error").hidden = true;
  }

  function maxInfiltres() {
    return Math.max(1, Math.floor(state.players.length / 2));
  }

  function clampRoles() {
    const max = maxInfiltres();
    if (state.ucCount + state.mwCount > max) {
      state.mwCount = Math.max(0, max - state.ucCount);
      if (state.ucCount > max) state.ucCount = max;
    }
    if (state.ucCount < 0) state.ucCount = 0;
    if (state.ucCount + state.mwCount === 0) state.ucCount = 1;
  }

  function setupError(msg) {
    const el = $("#setup-error");
    el.textContent = msg;
    el.hidden = false;
  }

  function addPlayer() {
    const input = $("#player-name-input");
    const name = input.value.trim();
    if (!name) return;
    if (state.players.some((p) => normalize(p) === normalize(name))) {
      setupError("Cet agent est déjà recruté !");
      return;
    }
    if (state.players.length >= 20) {
      setupError("20 agents max, c'est déjà le chaos.");
      return;
    }
    state.players.push(name);
    save(LS_PLAYERS, state.players);
    input.value = "";
    input.focus();
    renderSetup();
  }

  // ============================================================
  //  MOTS
  // ============================================================
  function getCustomPairs() {
    return load(LS_CUSTOM, []);
  }

  function allPairs() {
    return [...WORD_PAIRS, ...getCustomPairs()];
  }

  function pairKey(pair) {
    return normalize(pair[0]) + "|" + normalize(pair[1]);
  }

  function pickPair() {
    const pairs = allPairs();
    let used = load(LS_USED, []);
    let available = pairs.filter((p) => !used.includes(pairKey(p)));
    if (available.length === 0) {
      used = [];
      available = pairs;
    }
    const pair = available[Math.floor(Math.random() * available.length)];
    used.push(pairKey(pair));
    save(LS_USED, used);
    // pile ou face : quel mot va aux civils
    return Math.random() < 0.5 ? [pair[0], pair[1]] : [pair[1], pair[0]];
  }

  // ============================================================
  //  LANCEMENT DE PARTIE
  // ============================================================
  function startGame() {
    if (state.players.length < 3) {
      setupError("Il faut au moins 3 agents pour une mission.");
      return;
    }
    clampRoles();
    if (state.ucCount + state.mwCount > maxInfiltres()) {
      setupError("Trop d'infiltrés : les civils doivent rester majoritaires.");
      return;
    }

    const [civilWord, underWord] = pickPair();

    // attribution secrète des rôles
    const roles = shuffle(
      state.players.map((_, i) => {
        if (i < state.ucCount) return "undercover";
        if (i < state.ucCount + state.mwCount) return "white";
        return "civil";
      })
    );

    state.game = {
      civilWord,
      underWord,
      players: state.players.map((name, i) => ({
        name,
        role: roles[i],
        alive: true,
      })),
      revealIndex: 0,
      round: 1,
    };

    revealLocked = false;
    renderReveal();
    showScreen("screen-reveal");
  }

  // ============================================================
  //  DISTRIBUTION DES CARTES
  // ============================================================
  function renderReveal() {
    const g = state.game;
    const player = g.players[g.revealIndex];

    $("#reveal-player-name").textContent = player.name;
    $("#reveal-progress").textContent = `carte ${g.revealIndex + 1} / ${g.players.length}`;

    const wordEl = $("#card-word");
    const noteEl = $("#card-note");
    wordEl.classList.remove("is-white");

    if (player.role === "white") {
      wordEl.textContent = "· · ·";
      wordEl.classList.add("is-white");
      noteEl.textContent = "Aucun mot pour toi… tu es MR. WHITE ! Écoute les autres et improvise.";
    } else {
      wordEl.textContent = player.role === "civil" ? g.civilWord : g.underWord;
      noteEl.textContent = "Ne le dis à personne. Décris-le sans jamais le prononcer.";
    }

    $("#card").classList.remove("flipped");
    $("#memorized-btn").disabled = true;
  }

  let revealLocked = false;

  function flipCard() {
    const card = $("#card");
    if (revealLocked || card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    $("#memorized-btn").disabled = false;
  }

  function nextReveal() {
    if (revealLocked) return;
    revealLocked = true;
    const g = state.game;
    $("#card").classList.remove("flipped");
    $("#memorized-btn").disabled = true;

    setTimeout(() => {
      revealLocked = false;
      g.revealIndex++;
      if (g.revealIndex >= g.players.length) {
        renderOrder();
        showScreen("screen-order");
      } else {
        renderReveal();
      }
    }, 380);
  }

  // ============================================================
  //  ORDRE DE PAROLE
  // ============================================================
  function speakingOrder() {
    const alive = state.game.players.filter((p) => p.alive);
    let order = shuffle(alive);
    // Mr. White ne parle jamais en premier
    if (order[0].role === "white") {
      const swapWith = order.findIndex((p) => p.role !== "white");
      if (swapWith > 0) [order[0], order[swapWith]] = [order[swapWith], order[0]];
    }
    return order;
  }

  function renderOrder() {
    const list = $("#order-list");
    list.innerHTML = "";
    speakingOrder().forEach((p, i) => {
      const li = document.createElement("li");
      li.textContent = p.name;
      li.style.animationDelay = `${i * 0.07}s`;
      list.appendChild(li);
    });
  }

  // ============================================================
  //  VOTE
  // ============================================================
  function renderVote() {
    state.pendingVote = null;
    $("#vote-confirm").hidden = true;
    const grid = $("#vote-grid");
    grid.innerHTML = "";

    state.game.players.forEach((p, i) => {
      const btn = document.createElement("button");
      btn.className = "vote-card" + (p.alive ? "" : " dead");
      btn.textContent = p.name;
      btn.addEventListener("click", () => selectVote(i, btn));
      grid.appendChild(btn);
    });
  }

  function selectVote(index, btn) {
    document.querySelectorAll(".vote-card").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.pendingVote = index;
    $("#vote-confirm-text").textContent = `Éliminer ${state.game.players[index].name} ?`;
    $("#vote-confirm").hidden = false;
  }

  function confirmVote() {
    const g = state.game;
    const player = g.players[state.pendingVote];
    if (!player || !player.alive) return;
    player.alive = false;

    $("#elim-name").textContent = player.name;
    const roleCard = $("#elim-role-card");
    roleCard.className = "elim-role " + ROLE_CLASS[player.role];
    $("#elim-role-text").textContent = ROLE_LABEL[player.role];

    const comment = $("#elim-comment");
    const whiteBox = $("#white-guess");
    const continueBtn = $("#continue-btn");

    if (player.role === "white") {
      comment.textContent = "";
      whiteBox.hidden = false;
      continueBtn.hidden = true;
      $("#white-guess-input").value = "";
    } else {
      whiteBox.hidden = true;
      continueBtn.hidden = false;
      comment.textContent =
        player.role === "civil"
          ? "Oups… c'était un innocent."
          : "Bien joué, un infiltré de moins !";
    }

    showScreen("screen-elim");
  }

  function submitWhiteGuess() {
    const guess = $("#white-guess-input").value;
    if (!guess.trim()) return;

    if (normalize(guess) === normalize(state.game.civilWord)) {
      endGame("white");
    } else {
      $("#white-guess").hidden = true;
      $("#continue-btn").hidden = false;
      $("#elim-comment").textContent = `Raté ! Ce n'était pas « ${guess.trim()} ». Mr. White quitte la partie.`;
    }
  }

  // ============================================================
  //  CONDITIONS DE VICTOIRE
  // ============================================================
  function checkWinner() {
    const alive = state.game.players.filter((p) => p.alive);
    const civils = alive.filter((p) => p.role === "civil").length;
    const under = alive.filter((p) => p.role === "undercover").length;
    const whites = alive.filter((p) => p.role === "white").length;

    if (under + whites === 0) return "civil";
    if (civils <= under + whites) return under > 0 ? "undercover" : "white";
    return null;
  }

  function continueGame() {
    const winner = checkWinner();
    if (winner) {
      endGame(winner);
    } else {
      state.game.round++;
      renderOrder();
      showScreen("screen-order");
    }
  }

  // ============================================================
  //  FIN DE PARTIE
  // ============================================================
  function endGame(winner) {
    const g = state.game;
    const title = $("#end-title");

    const config = {
      civil: ["Les Civils gagnent !", "win-civil", "🏆 MISSION RÉUSSIE"],
      undercover: ["Les Undercover gagnent !", "win-undercover", "☠ INFILTRATION RÉUSSIE"],
      white: ["Mr. White gagne !", "win-white", "🎭 COUP DE MAÎTRE"],
    }[winner];

    title.textContent = config[0];
    title.className = "end-title " + config[1];
    $("#end-stamp").textContent = config[2];

    $("#end-words").textContent =
      `Mot des civils : « ${g.civilWord} » — mot des undercover : « ${g.underWord} »`;

    const rolesBox = $("#end-roles");
    rolesBox.innerHTML = "";
    g.players.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = "end-role-row";
      row.style.animationDelay = `${i * 0.06}s`;
      const name = document.createElement("span");
      name.className = "name" + (p.alive ? "" : " dead");
      name.textContent = p.name;
      const role = document.createElement("span");
      role.className = "role " + (ROLE_CLASS[p.role] || "");
      role.textContent = ROLE_LABEL[p.role];
      role.style.color = `var(--${p.role === "civil" ? "civil" : p.role === "white" ? "white-role" : "red"})`;
      row.append(name, role);
      rolesBox.appendChild(row);
    });

    showScreen("screen-end");
  }

  // ============================================================
  //  MOTS PERSOS
  // ============================================================
  function renderCustomWords() {
    const pairs = getCustomPairs();
    const box = $("#custom-pairs");
    box.innerHTML = "";
    const s = pairs.length > 1 ? "s" : "";
    $("#pair-count").textContent =
      `${WORD_PAIRS.length} paires de base + ${pairs.length} paire${s} perso${s}`;

    pairs.forEach((pair, i) => {
      const row = document.createElement("div");
      row.className = "pair-row";
      const words = document.createElement("span");
      words.className = "words";
      words.innerHTML = `<em>${escapeHtml(pair[0])}</em> / ${escapeHtml(pair[1])}`;
      const remove = document.createElement("button");
      remove.className = "remove";
      remove.textContent = "✕";
      remove.addEventListener("click", () => {
        const updated = getCustomPairs();
        updated.splice(i, 1);
        save(LS_CUSTOM, updated);
        renderCustomWords();
      });
      row.append(words, remove);
      box.appendChild(row);
    });
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function addCustomPair() {
    const w1 = $("#pair-word-1").value.trim();
    const w2 = $("#pair-word-2").value.trim();
    if (!w1 || !w2) return;
    const pairs = getCustomPairs();
    pairs.push([w1, w2]);
    save(LS_CUSTOM, pairs);
    $("#pair-word-1").value = "";
    $("#pair-word-2").value = "";
    $("#pair-word-1").focus();
    renderCustomWords();
  }

  // ============================================================
  //  ÉVÉNEMENTS
  // ============================================================
  const actions = {
    "goto-home": () => showScreen("screen-home"),
    "goto-setup": () => { renderSetup(); showScreen("screen-setup"); },
    "goto-words": () => { renderCustomWords(); showScreen("screen-words"); },
    "show-rules": () => { $("#rules-modal").hidden = false; },
    "close-rules": () => { $("#rules-modal").hidden = true; },
    "uc-plus": () => { state.ucCount++; clampRoles(); renderSetup(); },
    "uc-minus": () => { state.ucCount--; clampRoles(); renderSetup(); },
    "mw-plus": () => { state.mwCount++; clampRoles(); renderSetup(); },
    "mw-minus": () => { state.mwCount = Math.max(0, state.mwCount - 1); clampRoles(); renderSetup(); },
    "start-game": startGame,
    "next-reveal": nextReveal,
    "goto-vote": () => { renderVote(); showScreen("screen-vote"); },
    "cancel-vote": renderVote,
    "confirm-vote": confirmVote,
    "submit-white-guess": submitWhiteGuess,
    "continue-game": continueGame,
    "replay": startGame,
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (btn && actions[btn.dataset.action]) actions[btn.dataset.action]();
  });

  $("#card").addEventListener("click", flipCard);

  $("#add-player-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addPlayer();
  });

  $("#add-pair-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addCustomPair();
  });

  $("#white-guess-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitWhiteGuess();
  });
})();
