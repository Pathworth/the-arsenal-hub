(function () {
  const app = document.getElementById("app");
  const modeEl = document.getElementById("mode");
  const searchEl = document.getElementById("search");
  const filtersEl = document.getElementById("filters");
  const countsEl = document.getElementById("counts");

  let DATA = null;
  let LOCAL = false;
  let activeSection = "all";
  let query = "";

  // --- boot ---
  Promise.all([
    fetch("registry.json").then((r) => r.json()),
    fetch("/api/health").then((r) => (r.ok ? r.json() : null)).catch(() => null),
  ]).then(([data, health]) => {
    DATA = data;
    LOCAL = !!health;
    setMode();
    buildFilters();
    render();
  });

  function setMode() {
    if (LOCAL) {
      modeEl.textContent = "Local Mode";
      modeEl.className = "mode mode-local";
      modeEl.title = "Running on your PC — launch buttons are live.";
    } else {
      modeEl.textContent = "Web Mode";
      modeEl.className = "mode mode-web";
      modeEl.title = "Opened on the web — links work everywhere; local tools launch only on your PC.";
    }
  }

  function buildFilters() {
    const all = { id: "all", title: "All" };
    [all, ...DATA.sections].forEach((s) => {
      const c = document.createElement("button");
      c.className = "chip" + (s.id === "all" ? " active" : "");
      c.textContent = s.title;
      c.onclick = () => {
        activeSection = s.id;
        [...filtersEl.children].forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        render();
      };
      filtersEl.appendChild(c);
    });
  }

  searchEl.addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  function matches(card) {
    if (!query) return true;
    return (
      (card.name + " " + card.desc + " " + (card.tag || "")).toLowerCase().indexOf(query) !== -1
    );
  }

  function render() {
    app.innerHTML = "";
    let shown = 0;
    DATA.sections.forEach((section) => {
      if (activeSection !== "all" && activeSection !== section.id) return;
      const cards = section.cards.filter(matches);
      if (!cards.length) return;
      shown += cards.length;

      const sec = document.createElement("section");
      sec.className = "section";
      sec.innerHTML =
        `<h2>${section.title}</h2><p class="blurb">${section.blurb}</p>`;
      const grid = document.createElement("div");
      grid.className = "grid";
      cards.forEach((card) => grid.appendChild(makeCard(card)));
      sec.appendChild(grid);
      app.appendChild(sec);
    });

    if (!shown) {
      app.innerHTML = `<p class="empty">Nothing matches “${query}”.</p>`;
    }
    countsEl.textContent =
      DATA.sections.reduce((n, s) => n + s.cards.length, 0) + " things";
  }

  function makeCard(card) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML =
      (card.tag ? `<span class="tag">${card.tag}</span>` : "") +
      `<h3>${card.name}</h3><p>${card.desc}</p>`;

    const actions = document.createElement("div");
    actions.className = "actions";

    // Open Live (website / hosted tool) — works everywhere
    if (card.liveUrl) {
      actions.appendChild(
        linkBtn("Open Live", card.liveUrl, "btn btn-primary")
      );
    }

    // Launch (local tool)
    if (card.launch) {
      const label = card.launch.type === "folder" ? "Open Folder" : "Launch";
      const b = document.createElement("button");
      b.className = "btn" + (card.liveUrl ? "" : " btn-primary");
      b.innerHTML = `<span class="dot"></span>${label}`;
      if (LOCAL) {
        b.onclick = () => launch(card, b, label);
      } else {
        b.disabled = true;
        b.title = "Runs on your PC. Open the Command Deck on your machine to launch.";
      }
      actions.appendChild(b);
    }

    // Preview (mock screen) — great on the phone for grayed-out local tools
    if (card.preview && window.MOCKUPS && window.MOCKUPS[card.id]) {
      const p = document.createElement("button");
      const primary = !card.liveUrl && !(LOCAL && card.launch);
      p.className = "btn" + (primary ? " btn-primary" : "");
      p.textContent = "Preview";
      p.onclick = () => openModal(card);
      actions.appendChild(p);
    }

    // GitHub / code
    if (card.github) {
      actions.appendChild(linkBtn("Code", card.github, "btn btn-ghost"));
    }

    el.appendChild(actions);
    return el;
  }

  function linkBtn(text, href, cls) {
    const a = document.createElement("a");
    a.className = cls;
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = text;
    return a;
  }

  function launch(card, btn, label) {
    btn.disabled = true;
    const original = btn.innerHTML;
    btn.innerHTML = `<span class="dot"></span>Starting…`;
    fetch("/api/launch/" + encodeURIComponent(card.id), { method: "POST" })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) {
          toast(res.message || (card.name + " launched."));
          if (res.openUrl) {
            toast(card.name + " is booting… opening it in a moment.");
            setTimeout(() => window.open(res.openUrl, "_blank", "noopener"), 3500);
          }
        } else {
          toast("Could not launch: " + (res.error || "unknown"));
        }
      })
      .catch(() => toast("Could not reach the launcher."))
      .finally(() => {
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = original;
        }, 1500);
      });
  }

  // --- preview modal ---
  const modal = document.getElementById("modal");
  function openModal(card) {
    document.getElementById("modal-title").textContent = card.name;
    document.getElementById("modal-sub").textContent = card.desc;
    document.getElementById("modal-mock").innerHTML = window.MOCKUPS[card.id] || "";
    modal.classList.add("show");
  }
  function closeModal() {
    modal.classList.remove("show");
    document.getElementById("modal-mock").innerHTML = "";
  }
  document.getElementById("modal-close").onclick = closeModal;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  let toastTimer;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }
})();
