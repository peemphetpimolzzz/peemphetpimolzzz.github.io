/* Peem Phetpimol — portfolio
   Two independent preferences, both persisted in localStorage:
   - theme: "light" | "dark"  (defaults to the OS preference)
   - lang:  "en" | "th"       (defaults to "en")
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
  var THEME_COLORS = { light: "#ffffff", dark: "#0e1117" };

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (metaTheme) metaTheme.setAttribute("content", THEME_COLORS[theme] || "#ffffff");
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
    // Button shows the language you can switch TO
    if (langLabel) langLabel.textContent = lang === "th" ? "EN" : "TH";
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

  /* ---- Footer year ------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
