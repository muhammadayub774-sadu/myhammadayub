/* ==========================================================
   GAME WORLD — TO'LIQ PLATFORMASI VA 28 TA O'YIN DVIGATELI
   ========================================================== */
(() => {
  const STORAGE_KEY = "game_world_state_v1";

  const AGE_GROUPS = {
    "3-5": {
      id: "3-5",
      label: "3–5 yosh",
      title: "Kichkintoylar Dunyosi",
      theme: "Kichkintoy"
    },
    "6-10": {
      id: "6-10",
      label: "6–10 yosh",
      title: "Qiziqarli O‘yinlar",
      theme: "Arkada"
    },
    "11-15": {
      id: "11-15",
      label: "11–15 yosh",
      title: "Sarguzasht Dunyosi",
      theme: "Sarguzasht"
    },
    "16-20": {
      id: "16-20",
      label: "16–20 yosh",
      title: "Professional Gaming",
      theme: "Pro 3D"
    }
  };

  const GAMES_CATALOG = [
    // 3–5 YOSH (6 ta o'yin)
    { id: "g-colors", age: "3-5", cat: "Kichkintoy", icon: "🎨", diff: "Oson", popular: true, title: "Ranglarni top", desc: "Aytilgan rangdagi kartani topib bosing.", mech: "choice", mode: "colors" },
    { id: "g-shapes", age: "3-5", cat: "Kichkintoy", icon: "🔺", diff: "Oson", popular: true, title: "Shakllarni joylashtir", desc: "Doira, kvadrat va uchburchakni to‘g‘ri tanlang.", mech: "choice", mode: "shapes" },
    { id: "g-animals", age: "3-5", cat: "Kichkintoy", icon: "🐾", diff: "Oson", popular: true, title: "Hayvonlarni top", desc: "Hayvon nomiga mos rasmni aniqlang.", mech: "choice", mode: "animals" },
    { id: "g-pair", age: "3-5", cat: "Kichkintoy", icon: "🃏", diff: "Oson", popular: false, title: "Juftini top", desc: "Bir xil rasmli kartalarni juftlang.", mech: "memory", mode: "kids" },
    { id: "g-count", age: "3-5", cat: "Kichkintoy", icon: "🔢", diff: "Oson", popular: false, title: "Sanashni o‘rgan", desc: "1 dan 10 gacha obyektlarni sanab, sonni toping.", mech: "choice", mode: "count" },
    { id: "g-puzzle35", age: "3-5", cat: "Kichkintoy", icon: "🧩", diff: "Oson", popular: false, title: "Puzzle", desc: "Ketma-ket qismlarni to‘g‘ri tartibda joylashtiring.", mech: "sequence", mode: "toddler" },

    // 6–10 YOSH (8 ta o'yin)
    { id: "g-car610", age: "6-10", cat: "Arkada", icon: "🏎️", diff: "O‘rtacha", popular: true, title: "Car Racing", desc: "Avtomobilni boshqarib, to‘siqlardan o‘ting.", mech: "lane", mode: "car" },
    { id: "g-fruit", age: "6-10", cat: "Arkada", icon: "🍎", diff: "O‘rtacha", popular: true, title: "Fruit Catcher", desc: "Savatni harakatlantirib, mevalarni tutib oling.", mech: "lane", mode: "fruit" },
    { id: "g-mem610", age: "6-10", cat: "Arkada", icon: "🧠", diff: "O‘rtacha", popular: false, title: "Memory Game", desc: "Xotira kartalaridagi barcha juftliklarni oching.", mech: "memory", mode: "pro" },
    { id: "g-jump", age: "6-10", cat: "Arkada", icon: "🏀", diff: "O‘rtacha", popular: true, title: "Ball Jump", desc: "To‘pni sakratib, nishon halqalardan o‘tkazing.", mech: "clicker", mode: "jump" },
    { id: "g-math", age: "6-10", cat: "Mantiq", icon: "➕", diff: "O‘rtacha", popular: false, title: "Math Challenge", desc: "Matematik misollarni tez va aniq yeching.", mech: "choice", mode: "math" },
    { id: "g-maze", age: "6-10", cat: "Mantiq", icon: "🌀", diff: "O‘rtacha", popular: false, title: "Maze Runner", desc: "Labirint yo‘laklaridan marraga yetib boring.", mech: "maze", mode: "normal" },
    { id: "g-space610", age: "6-10", cat: "Kosmos", icon: "🚀", diff: "O‘rtacha", popular: false, title: "Space Shooter", desc: "Kosmik kemani boshqarib, yulduz va nishonlarni uring.", mech: "lane", mode: "space" },
    { id: "g-block", age: "6-10", cat: "Mantiq", icon: "🧱", diff: "O‘rtacha", popular: false, title: "Block Puzzle", desc: "Sonli va rangli bloklarni to‘g‘ri ketma-ketlikda bosing.", mech: "sequence", mode: "kids" },

    // 11–15 YOSH (7 ta o'yin)
    { id: "g-treasure", age: "11-15", cat: "Sarguzasht", icon: "💎", diff: "Qiziqarli", popular: true, title: "Treasure Hunter", desc: "Xaritada yashiringan xazinalarni topib yig‘ing.", mech: "map", mode: "treasure" },
    { id: "g-jungle", age: "11-15", cat: "Sarguzasht", icon: "🌴", diff: "Qiziqarli", popular: true, title: "Jungle Adventure", desc: "O‘rmon yo‘lida meva va kalitlarni to‘plang.", mech: "map", mode: "jungle" },
    { id: "g-minecraft", age: "11-15", cat: "Qurilish", icon: "⛏️", diff: "Qiziqarli", popular: true, title: "Minecraft Style", desc: "Bloklardan uy va inshootlar qurib, ball oling.", mech: "builder", mode: "craft" },
    { id: "g-island", age: "11-15", cat: "Sarguzasht", icon: "🏝️", diff: "Qiziqarli", popular: false, title: "Island Explorer", desc: "Orolni tadqiq etib, qimmatbaho buyumlar toping.", mech: "map", mode: "island" },
    { id: "g-parkour11", age: "11-15", cat: "Aksiya", icon: "🏃", diff: "Qiziqarli", popular: false, title: "Parkour Challenge", desc: "To‘siqlardan sakrab, masofani bosib o‘ting.", mech: "lane", mode: "parkour" },
    { id: "g-mystery", age: "11-15", cat: "Mantiq", icon: "🔐", diff: "Murakkab", popular: false, title: "Mystery Quest", desc: "Sirli jumboq va kodlarning javobini toping.", mech: "choice", mode: "mystery" },
    { id: "g-survival11", age: "11-15", cat: "Strategiya", icon: "🏕️", diff: "Murakkab", popular: false, title: "Survival Explorer", desc: "Resurs yig‘ib, boshpana va zaxirani boshqaring.", mech: "strategy", mode: "survival" },

    // 16–20 YOSH (7 ta o'yin)
    { id: "g-car3d", age: "16-20", cat: "3D & Pro", icon: "🏁", diff: "Yuqori", popular: true, title: "3D Car Racing", desc: "3D sahnada tezlik va chiziqlarni boshqarib poygalashing.", mech: "three3d", mode: "race3d" },
    { id: "g-city3d", age: "16-20", cat: "3D & Pro", icon: "🏙️", diff: "Yuqori", popular: true, title: "3D City Explorer", desc: "3D shahar ob’ektlarini aylanib, missiyalarni bajaring.", mech: "three3d", mode: "city3d" },
    { id: "g-football", age: "16-20", cat: "Sport", icon: "⚽", diff: "Yuqori", popular: true, title: "Football Challenge", desc: "Zarba nuqtasini aniq tanlab, darvozaga gol uring.", mech: "choice", mode: "football" },
    { id: "g-strategy", age: "16-20", cat: "Strategiya", icon: "♟️", diff: "Yuqori", popular: false, title: "Strategy Master", desc: "Byudjet, armiya va resursni strategik boshqaring.", mech: "strategy", mode: "war" },
    { id: "g-parkour3d", age: "16-20", cat: "3D & Pro", icon: "🤸", diff: "Yuqori", popular: false, title: "3D Parkour", desc: "3D platformada to‘siqlardan sakrab, rekord o‘rnating.", mech: "three3d", mode: "parkour3d" },
    { id: "g-space16", age: "16-20", cat: "Kosmos", icon: "🛸", diff: "Yuqori", popular: false, title: "Space Adventure", desc: "Orbital missiyada yoqilg‘i va nishonlarni boshqaring.", mech: "lane", mode: "eliteSpace" },
    { id: "g-tycoon", age: "16-20", cat: "Strategiya", icon: "📈", diff: "Yuqori", popular: false, title: "Business Tycoon", desc: "Kompaniya kapitalini oshirib, biznes imperiya quring.", mech: "strategy", mode: "business" }
  ];

  const BADGES = [
    { id: "b1", label: "🌟 Ilk Qadam (1+ o‘yin)" },
    { id: "b2", label: "🔥 Faol O‘yinchi (5+ o‘yin)" },
    { id: "b3", label: "⚡ 250+ Ball Ustasi" },
    { id: "b4", label: "👑 700+ Chempion" }
  ];

  const DAILY_QUESTS = [
    { id: "q1", text: "1 ta o‘yin o‘ynang", targetGames: 1, reward: 50 },
    { id: "q2", text: "Jami 100 ball to‘plang", targetScore: 100, reward: 75 },
    { id: "q3", text: "3 ta o‘yin yakunlang", targetGames: 3, reward: 120 }
  ];

  function defaultState() {
    return {
      user: null, // { nickname, ageGroup }
      theme: "dark",
      sound: true,
      stats: {
        gamesPlayed: 0,
        totalScore: 0,
        highScores: {},
        recentGames: [],
        badges: []
      },
      filterCat: "Barchasi",
      search: ""
    };
  }

  let state = loadState();
  let activeGame = null;
  let gameCleanup = null;
  let currentGameScore = 0;
  let currentGameEnded = false;
  let tempAgeGroup = null;
  let audioCtx = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return {
        ...defaultState(),
        ...parsed,
        stats: { ...defaultState().stats, ...(parsed.stats || {}) }
      };
    } catch {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // OVOZ EFFEKTLARI (Web Audio API)
  function playSound(type = "click") {
    if (!state.sound) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const freqMap = { click: 520, win: 820, lose: 200, coin: 980 };
      osc.type = type === "lose" ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freqMap[type] || 520, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch {}
  }

  function applyTheme() {
    document.body.classList.toggle("light-mode", state.theme === "light");
    const tBtn = document.getElementById("theme-toggle-btn");
    const sBtn = document.getElementById("sound-toggle-btn");
    if (tBtn) tBtn.textContent = state.theme === "light" ? "🌙 Tungi" : "☀️ Kunduzgi";
    if (sBtn) sBtn.textContent = state.sound ? "🔊 Ovoz" : "🔇 Ovozsiz";
  }

  // 3D KIRISH SAHNASI (Three.js + Fallback)
  function initSplash3D() {
    const canvas = document.getElementById("splash-3d-canvas");
    if (!canvas || !window.THREE) return;
    try {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 7;

      const light1 = new THREE.PointLight(0x06b6d4, 2, 25);
      light1.position.set(4, 4, 5);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xec4899, 2, 25);
      light2.position.set(-4, -3, 4);
      scene.add(light2);

      scene.add(new THREE.AmbientLight(0x6366f1, 0.9));

      const shapes = [];
      const geos = [
        new THREE.TorusKnotGeometry(1.1, 0.35, 90, 16),
        new THREE.OctahedronGeometry(0.85, 0),
        new THREE.BoxGeometry(1.1, 1.1, 1.1)
      ];
      const mats = [
        new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.25, metalness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.25, metalness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3, metalness: 0.5 })
      ];

      const positions = [[0, 0, 0], [-3.5, 1.6, -1.5], [3.5, -1.5, -1]];
      geos.forEach((g, idx) => {
        const mesh = new THREE.Mesh(g, mats[idx]);
        mesh.position.set(...positions[idx]);
        scene.add(mesh);
        shapes.push(mesh);
      });

      let rafId;
      function animate() {
        rafId = requestAnimationFrame(animate);
        shapes.forEach((m, i) => {
          m.rotation.x += 0.008 + i * 0.003;
          m.rotation.y += 0.012 + i * 0.002;
          m.position.y += Math.sin(Date.now() * 0.002 + i) * 0.003;
        });
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
    } catch {}
  }

  // EKRANLARNI BOSHQARISH
  function showSplash() {
    document.getElementById("splash-screen").classList.remove("hidden");
    document.getElementById("main-app").classList.add("hidden");
  }

  function showMainApp() {
    document.getElementById("splash-screen").classList.add("hidden");
    document.getElementById("onboarding-modal").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    renderDashboard();
  }

  function openOnboardingModal() {
    tempAgeGroup = state.user?.ageGroup || null;
    document.getElementById("onboarding-modal").classList.remove("hidden");
    document.getElementById("step-age-box").classList.remove("hidden");
    document.getElementById("step-nick-box").classList.add("hidden");
    document.getElementById("age-select-error").classList.add("hidden");
    document.getElementById("nick-error").classList.add("hidden");
    document.querySelectorAll(".age-choice-btn").forEach((b) => {
      b.classList.toggle("selected", b.dataset.ageGroup === tempAgeGroup);
    });
  }

  // ASOSIY SAHIFANI RENDERLASH
  function renderDashboard() {
    if (!state.user) return;
    const grp = AGE_GROUPS[state.user.ageGroup] || AGE_GROUPS["6-10"];
    document.getElementById("header-nickname").textContent = state.user.nickname;
    document.getElementById("header-age").textContent = `${grp.label} • ${grp.theme}`;
    document.getElementById("age-category-badge").textContent = `${grp.label} — ${grp.title}`;
    document.getElementById("all-age-games-title").textContent = `🕹️ ${grp.title} (${grp.label})`;

    renderDailyQuests();
    renderRecentAndTopScores();
    renderCategoryTabs(grp);
    renderGameGrids(grp);
  }

  function renderDailyQuests() {
    const listEl = document.getElementById("daily-quests-list");
    let completed = 0;
    listEl.innerHTML = DAILY_QUESTS.map((q) => {
      const done = q.targetGames
        ? state.stats.gamesPlayed >= q.targetGames
        : state.stats.totalScore >= q.targetScore;
      if (done) completed++;
      return `
        <li class="quest-item ${done ? "done" : ""}">
          <span>${done ? "✅" : "⬜"} ${q.text}</span>
          <strong>+${q.reward}</strong>
        </li>
      `;
    }).join("");
    document.getElementById("daily-progress-text").textContent = `${completed} / ${DAILY_QUESTS.length}`;
  }

  function renderRecentAndTopScores() {
    const recEl = document.getElementById("recent-games-list");
    const topEl = document.getElementById("top-scores-list");

    if (!state.stats.recentGames.length) {
      recEl.innerHTML = `<span class="muted-text">Hali o‘yin o‘ynalmagan</span>`;
    } else {
      recEl.innerHTML = state.stats.recentGames
        .slice(0, 5)
        .map((g) => `<span class="mini-tag">${g.title} (${g.score})</span>`)
        .join("");
    }

    const entries = Object.entries(state.stats.highScores)
      .map(([id, score]) => {
        const found = GAMES_CATALOG.find((x) => x.id === id);
        return { title: found ? found.title : id, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (!entries.length) {
      topEl.innerHTML = `<span class="muted-text">Rekordlar hali yo‘q</span>`;
    } else {
      topEl.innerHTML = entries
        .map((e, idx) => `<span class="mini-tag">#${idx + 1} ${e.title}: ${e.score}</span>`)
        .join("");
    }
  }

  function renderCategoryTabs(grp) {
    const ageGames = GAMES_CATALOG.filter((g) => g.age === grp.id);
    const cats = ["Barchasi", ...Array.from(new Set(ageGames.map((g) => g.cat)))];
    const tabsEl = document.getElementById("category-tabs");

    if (!cats.includes(state.filterCat)) state.filterCat = "Barchasi";

    tabsEl.innerHTML = cats
      .map(
        (c) => `<button type="button" class="cat-btn ${state.filterCat === c ? "active" : ""}" data-cat="${c}">${c}</button>`
      )
      .join("");

    tabsEl.querySelectorAll(".cat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        playSound("click");
        state.filterCat = btn.dataset.cat;
        saveState();
        renderDashboard();
      });
    });
  }

  function gameCardTemplate(g) {
    const best = state.stats.highScores[g.id] || 0;
    return `
      <article class="game-card">
        <div>
          <div class="game-banner">
            <span>${g.icon}</span>
            <span class="game-diff-badge">${g.diff}</span>
          </div>
          <div class="game-card-body">
            <h3 class="game-card-title">${g.title}</h3>
            <p class="game-card-desc">${g.desc}</p>
            <div class="game-card-footer">
              <span class="best-score-label">🏆 Rekord: ${best}</span>
              <button type="button" class="btn btn-neon btn-sm play-btn" data-game-id="${g.id}">▶ O‘YNASH</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderGameGrids(grp) {
    const q = state.search.trim().toLowerCase();
    const ageGames = GAMES_CATALOG.filter((g) => {
      const ageMatch = g.age === grp.id;
      const catMatch = state.filterCat === "Barchasi" || g.cat === state.filterCat;
      const qMatch = !q || g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q);
      return ageMatch && catMatch && qMatch;
    });

    const popular = ageGames.filter((g) => g.popular);
    const popList = popular.length ? popular : ageGames.slice(0, 3);

    document.getElementById("popular-count").textContent = `${popList.length} ta`;
    document.getElementById("total-age-games-count").textContent = `${ageGames.length} ta o‘yin`;

    document.getElementById("popular-games-grid").innerHTML =
      popList.length ? popList.map(gameCardTemplate).join("") : `<p class="muted-text">Mos o‘yin topilmadi.</p>`;

    document.getElementById("all-games-grid").innerHTML =
      ageGames.length ? ageGames.map(gameCardTemplate).join("") : `<p class="muted-text">Qidiruv bo‘yicha o‘yin topilmadi.</p>`;

    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        playSound("click");
        launchGame(btn.dataset.gameId);
      });
    });
  }

  // PROFIL VA NATIJALAR MODALI
  function openProfileModal() {
    if (!state.user) return;
    document.getElementById("profile-modal").classList.remove("hidden");
    document.getElementById("prof-save-msg").classList.add("hidden");
    document.getElementById("prof-nick-input").value = state.user.nickname;
    document.getElementById("prof-age-select").value = state.user.ageGroup;
    document.getElementById("prof-games-count").textContent = state.stats.gamesPlayed;
    document.getElementById("prof-total-score").textContent = state.stats.totalScore;
    document.getElementById("prof-medals-count").textContent = state.stats.badges.length;

    document.getElementById("prof-badges-list").innerHTML = BADGES.map((b) => {
      const unlocked = state.stats.badges.includes(b.id);
      return `<div class="badge-item ${unlocked ? "" : "locked"}">${unlocked ? "🏅" : "🔒"} ${b.label}</div>`;
    }).join("");

    const recs = Object.entries(state.stats.highScores);
    document.getElementById("prof-records-list").innerHTML = recs.length
      ? recs
          .map(([id, sc]) => {
            const g = GAMES_CATALOG.find((x) => x.id === id);
            return `<div class="record-row"><span>${g ? g.title : id}</span><strong>${sc} ball</strong></div>`;
          })
          .join("")
      : `<p class="muted-text">Hali rekordlar mavjud emas.</p>`;
  }

  // O'YINNI ISHGA TUSHIRISH VA YAKUNLASH
  function updateHud(statusText) {
    document.getElementById("hud-score").textContent = `Ball: ${currentGameScore}`;
    if (statusText) document.getElementById("hud-status").textContent = statusText;
  }

  function addGameScore(pts) {
    if (currentGameEnded) return;
    currentGameScore += pts;
    playSound("coin");
    updateHud();
  }

  function endGameSession(won = true, summaryText = "") {
    if (currentGameEnded || !activeGame) return;
    currentGameEnded = true;
    if (gameCleanup) {
      gameCleanup();
      gameCleanup = null;
    }

    playSound(won ? "win" : "lose");
    updateHud(won ? "G‘alaba!" : "Tugadi");

    state.stats.gamesPlayed += 1;
    state.stats.totalScore += Math.max(0, currentGameScore);
    const prevBest = state.stats.highScores[activeGame.id] || 0;
    if (currentGameScore > prevBest) {
      state.stats.highScores[activeGame.id] = currentGameScore;
    }
    state.stats.recentGames.unshift({
      id: activeGame.id,
      title: activeGame.title,
      score: currentGameScore
    });
    state.stats.recentGames = state.stats.recentGames.slice(0, 8);

    const bSet = new Set(state.stats.badges);
    if (state.stats.gamesPlayed >= 1) bSet.add("b1");
    if (state.stats.gamesPlayed >= 5) bSet.add("b2");
    if (state.stats.totalScore >= 250) bSet.add("b3");
    if (state.stats.totalScore >= 700) bSet.add("b4");
    state.stats.badges = Array.from(bSet);

    saveState();
    renderDashboard();

    const vp = document.getElementById("game-viewport");
    const box = document.createElement("div");
    box.style.cssText = "margin-top:16px; padding:16px; border-radius:14px; background:rgba(99,102,241,0.2); text-align:center;";
    box.innerHTML = `
      <h3>${won ? "🎉 Ajoyib natija!" : "🛑 O‘yin yakunlandi"}</h3>
      <p style="margin:8px 0;">${summaryText || `To‘plangan ball: <strong>${currentGameScore}</strong>`}</p>
      <button type="button" id="modal-replay-btn" class="btn btn-neon btn-sm">🔄 Yana o‘ynash</button>
    `;
    vp.appendChild(box);
    box.querySelector("#modal-replay-btn").addEventListener("click", () => launchGame(activeGame.id));
  }

  function launchGame(gameId) {
    if (gameCleanup) {
      gameCleanup();
      gameCleanup = null;
    }
    activeGame = GAMES_CATALOG.find((g) => g.id === gameId) || GAMES_CATALOG[0];
    currentGameScore = 0;
    currentGameEnded = false;

    document.getElementById("game-stage-modal").classList.remove("hidden");
    document.getElementById("active-game-title").textContent = `${activeGame.icon} ${activeGame.title}`;
    document.getElementById("active-game-desc").textContent = activeGame.desc;
    document.getElementById("game-touch-controls").innerHTML = "";
    updateHud("Faol");

    const vp = document.getElementById("game-viewport");
    vp.innerHTML = "";

    if (activeGame.mech === "choice") runChoiceGame(vp, activeGame.mode);
    else if (activeGame.mech === "memory") runMemoryGame(vp, activeGame.mode);
    else if (activeGame.mech === "sequence") runSequenceGame(vp, activeGame.mode);
    else if (activeGame.mech === "lane") runLaneCanvasGame(vp, activeGame.mode);
    else if (activeGame.mech === "maze") runMazeGame(vp);
    else if (activeGame.mech === "map") runMapAdventureGame(vp, activeGame.mode);
    else if (activeGame.mech === "builder") runBuilderGame(vp);
    else if (activeGame.mech === "strategy") runStrategyGame(vp, activeGame.mode);
    else if (activeGame.mech === "clicker") runJumpGame(vp);
    else if (activeGame.mech === "three3d") runThree3DGame(vp, activeGame.mode);
  }

  // 1. SAVOL / TANLOV O'YINLARI (Rang, Shakl, Hayvon, Sanash, Math, Mystery, Football)
  function runChoiceGame(vp, mode) {
    let round = 1;
    const maxRounds = 5;
    const promptEl = document.createElement("h3");
    const gridEl = document.createElement("div");
    gridEl.style.cssText = "display:grid; grid-template-columns:repeat(2, minmax(120px, 1fr)); gap:12px; width:100%; max-width:460px; margin-top:16px;";
    vp.append(promptEl, gridEl);

    const sets = {
      colors: [
        { q: "QIZIL rangni toping!", opts: ["🟥", "🟦", "🟩", "🟨"], ans: "🟥" },
        { q: "KO‘K rangni toping!", opts: ["🟨", "🟦", "🟧", "🟪"], ans: "🟦" },
        { q: "YASHIL rangni toping!", opts: ["🟩", "🟥", "🟫", "⬜"], ans: "🟩" }
      ],
      shapes: [
        { q: "UCHBURCHAKNI tanlang!", opts: ["🔺", "🟥", "⚪", "⭐"], ans: "🔺" },
        { q: "DOIRANI tanlang!", opts: ["🟩", "⚪", "🔺", "💠"], ans: "⚪" },
        { q: "KVADRATNI tanlang!", opts: ["⭐", "🔺", "🟦", "⚪"], ans: "🟦" }
      ],
      animals: [
        { q: "KUCHUKCHANI toping!", opts: ["🐶", "🐱", "🐸", "🦁"], ans: "🐶" },
        { q: "MUSHUKCHANI toping!", opts: ["🦁", "🐱", "🐵", "🐼"], ans: "🐱" },
        { q: "SHERNI toping!", opts: ["🐸", "🐼", "🦁", "🐰"], ans: "🦁" }
      ],
      count: [
        { q: "3 ta yulduz nechta?", opts: ["2", "3", "5", "1"], ans: "3" },
        { q: "7 ta olma nechta?", opts: ["6", "8", "7", "4"], ans: "7" },
        { q: "10 ta barmoq nechta?", opts: ["10", "8", "9", "5"], ans: "10" }
      ],
      mystery: [
        { q: "Kod: 3, 6, 9, ? Keyingi son?", opts: ["10", "12", "15", "11"], ans: "12" },
        { q: "Kalit so‘z: K-O-D. Harflar soni?", opts: ["2", "3", "4", "5"], ans: "3" },
        { q: "5 × 5 = ?", opts: ["20", "25", "30", "15"], ans: "25" }
      ],
      football: [
        { q: "Chap yuqori burchakka zarba bering!", opts: ["↖️ Chap-Yuqori", "↗️ O‘ng-Yuqori", "↙️ Chap-Past", "↘️ O‘ng-Past"], ans: "↖️ Chap-Yuqori" },
        { q: "Darvozabon chapga sakradi — qayerga uring?", opts: ["↖️ Chapga", "↗️ O‘ng burchakka", "⬅️ O‘rtacha-Chap", "↙️ Past-Chap"], ans: "↗️ O‘ng burchakka" },
        { q: "Penalti: Pastki o‘ng burchak!", opts: ["↘️ Past-O‘ng", "↖️ Chap-Yuqori", "⬆️ Tepaga", "⬅️ Chapga"], ans: "↘️ Past-O‘ng" }
      ]
    };

    function nextRound() {
      if (round > maxRounds || currentGameEnded) {
        endGameSession(true);
        return;
      }
      gridEl.innerHTML = "";
      let item;
      if (mode === "math") {
        const a = Math.floor(Math.random() * 10) + 2;
        const b = Math.floor(Math.random() * 10) + 2;
        const ans = String(a + b);
        const distractors = new Set([ans, String(a + b + 2), String(Math.max(1, a + b - 2)), String(a + b + 4)]);
        item = { q: `${a} + ${b} = ?`, opts: Array.from(distractors).sort(() => Math.random() - 0.5), ans };
      } else {
        const pool = sets[mode] || sets.math;
        item = pool[(round - 1) % pool.length];
      }

      promptEl.textContent = `Bosqich ${round}/${maxRounds}: ${item.q}`;
      item.opts.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-ghost";
        btn.style.fontSize = "1.25rem";
        btn.textContent = opt;
        btn.addEventListener("click", () => {
          if (currentGameEnded) return;
          if (opt === item.ans) {
            addGameScore(30);
          } else {
            playSound("lose");
          }
          round++;
          nextRound();
        });
        gridEl.appendChild(btn);
      });
    }
    nextRound();
  }

  // 2. XOTIRA KARTALARI O'YINI
  function runMemoryGame(vp, mode) {
    const icons = mode === "pro" ? ["🚀", "⚡", "🎯", "💎", "🔥", "🎮"] : ["🐶", "🐱", "🍎", "⭐"];
    const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
    let open = [];
    let matched = 0;

    const grid = document.createElement("div");
    grid.style.cssText = `display:grid; grid-template-columns:repeat(${mode === "pro" ? 4 : 4}, 72px); gap:10px; justify-content:center;`;
    vp.appendChild(grid);

    deck.forEach((sym) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "btn btn-ghost";
      card.style.cssText = "height:72px; font-size:1.8rem;";
      card.textContent = "❓";
      card.addEventListener("click", () => {
        if (currentGameEnded || card.dataset.done || open.length === 2 || open.includes(card)) return;
        card.textContent = sym;
        open.push(card);
        if (open.length === 2) {
          const [c1, c2] = open;
          if (c1.dataset.sym === c2.dataset.sym) {
            c1.dataset.done = "1";
            c2.dataset.done = "1";
            matched += 2;
            addGameScore(25);
            open = [];
            if (matched === deck.length) endGameSession(true);
          } else {
            playSound("lose");
            setTimeout(() => {
              c1.textContent = "❓";
              c2.textContent = "❓";
              open = [];
            }, 550);
          }
        }
      });
      card.dataset.sym = sym;
      grid.appendChild(card);
    });
  }

  // 3. KETMA-KETLIK / PUZZLE / BLOCK O'YINI
  function runSequenceGame(vp) {
    const seq = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
    let stepIdx = 0;
    const info = document.createElement("p");
    info.textContent = "1 dan 4 gacha tartibda bosing!";
    info.style.marginBottom = "14px";
    const row = document.createElement("div");
    row.style.cssText = "display:flex; gap:12px; flex-wrap:wrap; justify-content:center;";
    vp.append(info, row);

    [...seq].sort(() => Math.random() - 0.5).forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-ghost";
      btn.style.fontSize = "1.6rem";
      btn.textContent = item;
      btn.addEventListener("click", () => {
        if (currentGameEnded) return;
        if (item === seq[stepIdx]) {
          btn.disabled = true;
          btn.style.opacity = "0.4";
          stepIdx++;
          addGameScore(25);
          if (stepIdx === seq.length) endGameSession(true);
        } else {
          playSound("lose");
        }
      });
      row.appendChild(btn);
    });
  }

  // 4. CANVAS HARAQAT O'YINI (Car Racing, Fruit Catcher, Space Shooter, Parkour)
  function runLaneCanvasGame(vp, mode) {
    const canvas = document.createElement("canvas");
    canvas.width = 420;
    canvas.height = 320;
    canvas.style.cssText = "width:100%; max-width:420px; border-radius:14px; background:#0b1224;";
    vp.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const lanes = [70, 210, 350];
    let lane = 1;
    let items = [];
    let tick = 0;
    let lives = 3;

    const heroIcon = mode === "fruit" ? "🧺" : mode === "space" ? "🚀" : mode === "parkour" ? "🏃" : "🏎️";
    const goodIcon = mode === "fruit" ? "🍎" : "⭐";
    const badIcon = mode === "fruit" ? "💣" : "🚧";

    function shiftLane(dir) {
      if (currentGameEnded) return;
      lane = Math.max(0, Math.min(2, lane + dir));
    }

    const touchEl = document.getElementById("game-touch-controls");
    touchEl.innerHTML = `
      <button type="button" id="t-left" class="btn btn-neon btn-sm">◀ Chap</button>
      <button type="button" id="t-right" class="btn btn-neon btn-sm">O‘ng ▶</button>
    `;
    document.getElementById("t-left").addEventListener("click", () => shiftLane(-1));
    document.getElementById("t-right").addEventListener("click", () => shiftLane(1));

    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") shiftLane(-1);
      if (e.key === "ArrowRight" || e.key === "d") shiftLane(1);
    };
    window.addEventListener("keydown", onKey);

    let raf;
    function step() {
      if (currentGameEnded) return;
      raf = requestAnimationFrame(step);
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(148,163,184,0.22)";
      ctx.beginPath();
      ctx.moveTo(140, 0); ctx.lineTo(140, 320);
      ctx.moveTo(280, 0); ctx.lineTo(280, 320);
      ctx.stroke();

      if (tick % 36 === 0) {
        items.push({ lane: Math.floor(Math.random() * 3), y: -20, good: Math.random() < 0.55 });
      }

      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        it.y += 4.2;
        if (it.lane === lane && it.y > 240 && it.y < 295) {
          if (it.good) {
            addGameScore(20);
          } else {
            lives--;
            playSound("lose");
            if (lives <= 0) {
              endGameSession(false, `Jon tugadi! Ball: ${currentGameScore}`);
              return;
            }
          }
          items.splice(i, 1);
          continue;
        }
        if (it.y > 340) items.splice(i, 1);
      }

      items.forEach((it) => {
        ctx.font = "28px sans-serif";
        ctx.fillText(it.good ? goodIcon : badIcon, lanes[it.lane] - 14, it.y);
      });

      ctx.font = "34px sans-serif";
      ctx.fillText(heroIcon, lanes[lane] - 17, 282);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "13px sans-serif";
      ctx.fillText(`Jon: ${"❤️".repeat(lives)}`, 12, 22);
    }

    gameCleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
    step();
  }

  // 5. LABIRINT O'YINI
  function runMazeGame(vp) {
    const map = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 1, 2]
    ];
    let pos = { r: 0, c: 0 };
    const grid = document.createElement("div");
    grid.style.cssText = "display:grid; grid-template-columns:repeat(5, 56px); gap:6px; justify-content:center;";
    vp.appendChild(grid);

    function render() {
      grid.innerHTML = "";
      map.forEach((row, r) => {
        row.forEach((val, c) => {
          const cell = document.createElement("div");
          cell.style.cssText = `height:56px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; background:${val === 1 ? "#1e293b" : val === 2 ? "#059669" : "rgba(99,102,241,0.22)"};`;
          if (pos.r === r && pos.c === c) cell.textContent = "🧭";
          else if (val === 2) cell.textContent = "🏁";
          grid.appendChild(cell);
        });
      });
    }

    function move(dr, dc) {
      if (currentGameEnded) return;
      const nr = pos.r + dr;
      const nc = pos.c + dc;
      if (map[nr] && map[nr][nc] !== undefined && map[nr][nc] !== 1) {
        pos = { r: nr, c: nc };
        addGameScore(10);
        render();
        if (map[nr][nc] === 2) endGameSession(true);
      } else {
        playSound("lose");
      }
    }

    document.getElementById("game-touch-controls").innerHTML = `
      <button type="button" class="btn btn-ghost btn-sm" id="m-u">▲</button>
      <button type="button" class="btn btn-ghost btn-sm" id="m-l">◀</button>
      <button type="button" class="btn btn-ghost btn-sm" id="m-d">▼</button>
      <button type="button" class="btn btn-ghost btn-sm" id="m-r">▶</button>
    `;
    document.getElementById("m-u").onclick = () => move(-1, 0);
    document.getElementById("m-d").onclick = () => move(1, 0);
    document.getElementById("m-l").onclick = () => move(0, -1);
    document.getElementById("m-r").onclick = () => move(0, 1);
    render();
  }

  // 6. SARGUZASHT XARITA O'YINI
  function runMapAdventureGame(vp, mode) {
    const targets = ["💎", "🗝️", "🏆", "🧭"];
    let found = 0;
    const label = document.createElement("p");
    label.textContent = `Yashirin topilmalarni bosing (${mode.toUpperCase()})`;
    label.style.marginBottom = "12px";

    const area = document.createElement("div");
    area.style.cssText = "position:relative; width:100%; max-width:460px; height:240px; border-radius:16px; background:linear-gradient(135deg, rgba(16,185,129,0.22), rgba(99,102,241,0.22)); overflow:hidden;";
    vp.append(label, area);

    targets.forEach((icon, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = icon;
      btn.style.cssText = `position:absolute; left:${18 + i * 21}%; top:${22 + (i % 2) * 42}%; font-size:1.8rem; background:rgba(15,23,42,0.7); border:1px solid #818cf8; border-radius:12px; padding:8px; cursor:pointer;`;
      btn.addEventListener("click", () => {
        if (currentGameEnded || btn.disabled) return;
        btn.disabled = true;
        btn.textContent = "✅";
        found++;
        addGameScore(35);
        if (found === targets.length) endGameSession(true);
      });
      area.appendChild(btn);
    });
  }

  // 7. QURILISH / MINECRAFT O'YINI
  function runBuilderGame(vp) {
    const blocks = ["🧱", "🪵", "🪟", "🏠"];
    let built = 0;
    const grid = document.createElement("div");
    grid.style.cssText = "display:grid; grid-template-columns:repeat(4, 64px); gap:8px; justify-content:center;";
    vp.appendChild(grid);

    for (let i = 0; i < 8; i++) {
      const slot = document.createElement("button");
      slot.type = "button";
      slot.className = "btn btn-ghost";
      slot.style.cssText = "height:64px; font-size:1.5rem;";
      slot.textContent = "➕";
      slot.addEventListener("click", () => {
        if (currentGameEnded || slot.dataset.placed) return;
        slot.dataset.placed = "1";
        slot.textContent = blocks[built % blocks.length];
        built++;
        addGameScore(20);
        if (built === 8) endGameSession(true, `Inshoot qurildi! Ball: ${currentGameScore}`);
      });
      grid.appendChild(slot);
    }
  }

  // 8. STRATEGIYA / BIZNES / SURVIVAL O'YINI
  function runStrategyGame(vp) {
    let res = 100;
    let turns = 0;
    const status = document.createElement("p");
    status.style.marginBottom = "14px";
    status.textContent = `Resurs: ${res} | Yurish: ${turns}/4`;

    const row = document.createElement("div");
    row.style.cssText = "display:flex; gap:10px; flex-wrap:wrap; justify-content:center;";
    vp.append(status, row);

    function act(deltaRes, pts) {
      if (currentGameEnded) return;
      res += deltaRes;
      turns++;
      addGameScore(pts);
      status.textContent = `Resurs: ${res} | Yurish: ${turns}/4`;
      if (turns >= 4) endGameSession(true, `Strategiya yakunlandi! Resurs: ${res}, Ball: ${currentGameScore}`);
    }

    const b1 = document.createElement("button");
    b1.type = "button"; b1.className = "btn btn-neon btn-sm"; b1.textContent = "📈 Rivojlantirish (+35 ball)";
    b1.onclick = () => act(20, 35);

    const b2 = document.createElement("button");
    b2.type = "button"; b2.className = "btn btn-ghost btn-sm"; b2.textContent = "🛡️ Himoya / Zaxira (+25 ball)";
    b2.onclick = () => act(10, 25);

    row.append(b1, b2);
  }

  // 9. BALL JUMP O'YINI
  function runJumpGame(vp) {
    let hits = 0;
    const goal = 6;
    const info = document.createElement("p");
    info.textContent = `Sakragan to‘pni ${goal} marta bosing! (${hits}/${goal})`;
    info.style.marginBottom = "12px";

    const arena = document.createElement("div");
    arena.style.cssText = "position:relative; width:100%; max-width:420px; height:220px; border-radius:16px; background:rgba(99,102,241,0.16); overflow:hidden;";
    const ball = document.createElement("button");
    ball.type = "button";
    ball.textContent = "🏀";
    ball.style.cssText = "position:absolute; left:42%; top:35%; font-size:2.2rem; background:none; border:none; cursor:pointer;";
    arena.appendChild(ball);
    vp.append(info, arena);

    const timer = setInterval(() => {
      if (currentGameEnded) return;
      ball.style.left = `${15 + Math.random() * 68}%`;
      ball.style.top = `${15 + Math.random() * 65}%`;
    }, 850);

    ball.addEventListener("click", () => {
      if (currentGameEnded) return;
      hits++;
      addGameScore(25);
      info.textContent = `Sakragan to‘pni ${goal} marta bosing! (${hits}/${goal})`;
      if (hits >= goal) endGameSession(true);
    });

    gameCleanup = () => clearInterval(timer);
  }

  // 10. THREE.JS 3D O'YINLAR (16–20 YOSH: 3D Car Racing, 3D City Explorer, 3D Parkour)
  function runThree3DGame(vp, mode) {
    const container = document.createElement("div");
    container.style.cssText = "width:100%; max-width:520px; height:280px; border-radius:14px; overflow:hidden;";
    vp.appendChild(container);

    if (!window.THREE) {
      runLaneCanvasGame(vp, "car");
      return;
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth || 460, 280);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d1e);
    const camera = new THREE.PerspectiveCamera(60, (container.clientWidth || 460) / 280, 0.1, 100);
    camera.position.set(0, 3.2, 6.5);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0x06b6d4, 1.4);
    dirLight.position.set(3, 6, 4);
    scene.add(dirLight);

    const playerMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.9, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4 })
    );
    scene.add(playerMesh);

    const targetMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.65, 0),
      new THREE.MeshStandardMaterial({ color: 0xfacc15 })
    );
    targetMesh.position.set(0, 0.4, -3);
    scene.add(targetMesh);

    let lane = 0; // -2, 0, 2
    function setLane(d) {
      lane = Math.max(-1, Math.min(1, lane + d));
      playerMesh.position.x = lane * 2;
    }

    document.getElementById("game-touch-controls").innerHTML = `
      <button type="button" class="btn btn-neon btn-sm" id="th-l">◀ Chap</button>
      <button type="button" class="btn btn-neon btn-sm" id="th-r">O‘ng ▶</button>
    `;
    document.getElementById("th-l").onclick = () => setLane(-1);
    document.getElementById("th-r").onclick = () => setLane(1);

    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") setLane(-1);
      if (e.key === "ArrowRight" || e.key === "d") setLane(1);
    };
    window.addEventListener("keydown", onKey);

    let raf;
    function tick3D() {
      if (currentGameEnded) return;
      raf = requestAnimationFrame(tick3D);
      targetMesh.rotation.y += 0.04;
      targetMesh.position.z += 0.09;

      if (targetMesh.position.z > 4.2) {
        if (Math.abs(targetMesh.position.x - playerMesh.position.x) < 1.1) {
          addGameScore(30);
        } else {
          playSound("lose");
        }
        targetMesh.position.z = -5;
        targetMesh.position.x = [-2, 0, 2][Math.floor(Math.random() * 3)];
      }
      renderer.render(scene, camera);
    }

    gameCleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      renderer.dispose();
    };
    tick3D();
  }

  // HODISALARNI ULASH
  function bindEvents() {
    document.getElementById("start-platform-btn").addEventListener("click", () => {
      playSound("click");
      if (state.user) {
        showMainApp();
      } else {
        openOnboardingModal();
      }
    });

    document.querySelectorAll(".age-choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        playSound("click");
        tempAgeGroup = btn.dataset.ageGroup;
        document.querySelectorAll(".age-choice-btn").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        document.getElementById("age-select-error").classList.add("hidden");

        const grp = AGE_GROUPS[tempAgeGroup];
        document.getElementById("selected-group-pill").textContent = `${grp.label} — ${grp.title}`;
        document.getElementById("step-age-box").classList.add("hidden");
        document.getElementById("step-nick-box").classList.remove("hidden");
        document.getElementById("nickname-input").focus();
      });
    });

    document.getElementById("back-to-age-btn").addEventListener("click", () => {
      playSound("click");
      document.getElementById("step-nick-box").classList.add("hidden");
      document.getElementById("step-age-box").classList.remove("hidden");
    });

    document.getElementById("continue-to-home-btn").addEventListener("click", () => {
      const nick = document.getElementById("nickname-input").value.trim();
      if (!nick) {
        document.getElementById("nick-error").classList.remove("hidden");
        return;
      }
      if (!tempAgeGroup) return;
      playSound("win");
      state.user = { nickname: nick, ageGroup: tempAgeGroup };
      saveState();
      showMainApp();
    });

    document.getElementById("theme-toggle-btn").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      playSound("click");
      saveState();
      applyTheme();
    });

    document.getElementById("sound-toggle-btn").addEventListener("click", () => {
      state.sound = !state.sound;
      saveState();
      applyTheme();
      playSound("click");
    });

    document.getElementById("search-games-input").addEventListener("input", (e) => {
      state.search = e.target.value;
      if (state.user) renderGameGrids(AGE_GROUPS[state.user.ageGroup] || AGE_GROUPS["6-10"]);
    });

    document.getElementById("open-profile-btn").addEventListener("click", () => {
      playSound("click");
      openProfileModal();
    });

    document.getElementById("close-profile-btn").addEventListener("click", () => {
      document.getElementById("profile-modal").classList.add("hidden");
    });

    document.getElementById("save-profile-btn").addEventListener("click", () => {
      const newNick = document.getElementById("prof-nick-input").value.trim();
      const newAge = document.getElementById("prof-age-select").value;
      if (!newNick || !AGE_GROUPS[newAge]) return;
      playSound("win");
      state.user = { nickname: newNick, ageGroup: newAge };
      state.filterCat = "Barchasi";
      saveState();
      document.getElementById("prof-save-msg").classList.remove("hidden");
      renderDashboard();
    });

    document.getElementById("restart-game-btn").addEventListener("click", () => {
      if (activeGame) {
        playSound("click");
        launchGame(activeGame.id);
      }
    });

    document.getElementById("exit-game-btn").addEventListener("click", () => {
      if (gameCleanup) {
        gameCleanup();
        gameCleanup = null;
      }
      currentGameEnded = true;
      document.getElementById("game-stage-modal").classList.add("hidden");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    initSplash3D();
    bindEvents();

    const loader = document.getElementById("loader-screen");
    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => loader.classList.add("hidden"), 400);
    }, 350);

    if (state.user) {
      showMainApp();
    } else {
      showSplash();
    }
  });
})();