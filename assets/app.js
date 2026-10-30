/* Peem Phetpimol — portfolio & commercial software storefront
   Two independent preferences, both persisted in localStorage:
   - theme: "light" | "dark"  (defaults to the OS preference)
   - lang:  "en" | "th"       (defaults to "en")
   Plus interactive category filtering on the projects grid.
   No build step, no dependencies. */

(function () {
  "use strict";

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---- Theme ------------------------------------------------------------ */
  var metaTheme = document.getElementById("meta-theme-color");
  var THEME_COLORS = { light: "#fafafa", dark: "#09090b" };

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (metaTheme) metaTheme.setAttribute("content", THEME_COLORS[theme] || "#fafafa");
  }

  var savedTheme = store.get("theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      store.set("theme", next);
    });
  }

  /* Follow OS changes only while the user hasn't chosen explicitly */
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (!store.get("theme")) applyTheme(e.matches ? "dark" : "light");
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---- Language --------------------------------------------------------- */
  var translatable = document.querySelectorAll("[data-en]");
  var langLabel = document.getElementById("lang-label");

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    for (var i = 0; i < translatable.length; i++) {
      var el = translatable[i];
      var val = el.getAttribute(lang === "th" ? "data-th" : "data-en");
      if (val != null) el.textContent = val;
    }
    if (langLabel) langLabel.textContent = lang === "th" ? "TH" : "EN";
  }

  var savedLang = store.get("lang") || "en";
  applyLang(savedLang);

  var langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = root.getAttribute("lang") === "th" ? "en" : "th";
      applyLang(next);
      store.set("lang", next);
    });
  }

  /* ---- Project Category Filter ------------------------------------------ */
  var filterButtons = document.querySelectorAll("[data-filter]");
  var projectCards = document.querySelectorAll("[data-category]");
  if (filterButtons.length && projectCards.length) {
    for (var f = 0; f < filterButtons.length; f++) {
      filterButtons[f].addEventListener("click", function () {
        var target = this.getAttribute("data-filter") || "all";
        for (var b = 0; b < filterButtons.length; b++) {
          var isCurrent = filterButtons[b] === this;
          filterButtons[b].classList.toggle("is-active", isCurrent);
          filterButtons[b].setAttribute("aria-pressed", isCurrent ? "true" : "false");
        }
        for (var c = 0; c < projectCards.length; c++) {
          var cats = (projectCards[c].getAttribute("data-category") || "").split(" ");
          var show = target === "all" || cats.indexOf(target) !== -1;
          if (show) projectCards[c].removeAttribute("hidden");
          else projectCards[c].setAttribute("hidden", "hidden");
        }
      });
    }
  }

  /* ---- Copy email button ------------------------------------------------ */
  var copyBtn = document.getElementById("copy-email-btn");
  var copyLabel = document.getElementById("copy-email-label");
  var copyTimer = null;
  if (copyBtn && copyLabel) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "peem.phetpimol@gmail.com";
      var done = function () {
        var isTh = root.getAttribute("lang") === "th";
        copyLabel.textContent = isTh ? "คัดลอกอีเมลแล้ว!" : "Copied to clipboard!";
        if (copyTimer) clearTimeout(copyTimer);
        copyTimer = setTimeout(function () {
          var currentTh = root.getAttribute("lang") === "th";
          var fallback = copyLabel.getAttribute(currentTh ? "data-th" : "data-en");
          if (fallback) copyLabel.textContent = fallback;
        }, 2200);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(done);
      } else {
        done();
      }
    });
  }

  /* ---- Footer year ------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
