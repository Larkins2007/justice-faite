(function () {
  "use strict";

  // Theme
  const root = document.documentElement;
  const stored = localStorage.getItem("jf-theme");
  if (stored) root.setAttribute("data-theme", stored);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      let next;
      if (current === "light") next = "dark";
      else if (current === "dark") next = "system";
      else next = "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("jf-theme", next);
    });
  }

  // TOC generation for pages with .toc
  const tocNav = document.querySelector(".toc");
  if (tocNav) {
    const list = tocNav.querySelector(".toc-list");
    const headings = document.querySelectorAll(".prose h2[id], .prose h3[id]");
    if (list && headings.length) {
      headings.forEach((h) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent.replace(/#$/, "").trim();
        if (h.tagName === "H3") a.style.paddingLeft = "0.75rem";
        li.appendChild(a);
        list.appendChild(li);
      });
    }
    const btn = tocNav.querySelector(".toc-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        tocNav.setAttribute("aria-expanded", String(!open));
      });
    }
  }

  // Highlight target on load / hashchange
  function highlightTarget() {
    const id = location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  window.addEventListener("hashchange", highlightTarget);
  if (location.hash) setTimeout(highlightTarget, 100);

  // Simple search (client-side, page titles + short)
  const form = document.getElementById("site-search");
  const results = document.getElementById("search-results");
  if (form && results) {
    const pages = [
      { title: "Как вступить", url: "/join/", keywords: "вступить вступление возраст документ заявка бот 16" },
      { title: "Правила", url: "/rules/", keywords: "правила спам стикеры оскорбления предупреждения возраст" },
      { title: "Рест", url: "/rest/", keywords: "рест отдых пауза отсутствие чистка" },
      { title: "Норма и чистка", url: "/norm/", keywords: "норма чистка 90 80 70 сообщения активность воскресенье" },
      { title: "Игры", url: "/games/", keywords: "игры шпион мафия бункер жених правда ложь" },
      { title: "Правила игр", url: "/game-rules/", keywords: "правила игр мафия шпион" },
      { title: "Жетоны", url: "/tokens/", keywords: "жетоны ферма магазин баланс валюта" },
      { title: "Бот", url: "/guide/", keywords: "бот гайд команды рест жетоны" },
      { title: "Обращение к администрации", url: "/anonymous/", keywords: "обращение жалоба администрация анонимные" },
    ];

    function normalize(s) {
      return s
        .toLowerCase()
        .replace(/ё/g, "е")
        .replace(/[^\w\u0400-\u04FF\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = normalize(form.q.value);
      if (!q) {
        results.hidden = true;
        return;
      }
      const hits = pages.filter((p) => {
        const hay = normalize(p.title + " " + p.keywords);
        return q.split(" ").every((w) => hay.includes(w));
      });
      if (hits.length === 0) {
        results.innerHTML = "<p>Ничего не найдено. Попробуй другие слова или открой <a href=\"/\">навигацию</a>.</p>";
      } else {
        results.innerHTML =
          "<ul>" +
          hits
            .map((h) => `<li><a href="${h.url}">${h.title}</a></li>`)
            .join("") +
          "</ul>";
      }
      results.hidden = false;
    });
  }

  // UTM passthrough is automatic (no action needed)
})();
