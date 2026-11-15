type ThemeMode = "light" | "dark";
type CaseFilter = "all" | "systems" | "security" | "cloud";

const THEME_STORAGE_KEY = "pp_portfolio_theme";

function isExternalHttpUrl(rawUrl: string): boolean {
  if (!/^https?:\/\//i.test(rawUrl)) {
    return false;
  }
  try {
    const parsed = new URL(rawUrl, window.location.href);
    return parsed.origin !== window.location.origin;
  } catch {
    return true;
  }
}

function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");

  root.setAttribute("data-theme", theme);
  if (toggle) {
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  if (label) {
    label.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

function initTheme(): void {
  let initial: ThemeMode = "light";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      initial = stored;
    }
  } catch {
    initial = "light";
  }

  applyTheme(initial);

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next: ThemeMode = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Storage unavailable under strict browser policy */
    }
  });
}

function initMobileNav(): void {
  const navToggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  if (!navToggle || !drawer) {
    return;
  }

  const setOpen = (isOpen: boolean): void => {
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) {
      drawer.removeAttribute("hidden");
    } else {
      drawer.setAttribute("hidden", "");
    }
  };

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    setOpen(!expanded);
  });

  const links = drawer.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function parseFilterValue(raw: string | null): CaseFilter {
  if (raw === "systems" || raw === "security" || raw === "cloud") {
    return raw;
  }
  return "all";
}

function initCaseFilters(): void {
  const toolbar = document.getElementById("case-filters");
  const status = document.getElementById("filter-status");
  const cards = document.querySelectorAll<HTMLElement>("#cases-list .case-card");
  if (!toolbar || cards.length === 0) {
    return;
  }

  const buttons = toolbar.querySelectorAll<HTMLButtonElement>(".filter-btn");

  toolbar.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const btn = target.closest<HTMLButtonElement>(".filter-btn");
    if (!btn) {
      return;
    }

    const filter = parseFilterValue(btn.getAttribute("data-filter"));
    buttons.forEach((button) => {
      const isActive = button === btn;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    let visibleCount = 0;
    cards.forEach((card) => {
      const categories = (card.getAttribute("data-categories") ?? "").split(/\s+/);
      const matches = filter === "all" || categories.includes(filter);
      if (matches) {
        card.removeAttribute("hidden");
        visibleCount += 1;
      } else {
        card.setAttribute("hidden", "");
      }
    });

    if (status) {
      status.textContent = `Showing ${visibleCount} of ${cards.length} case studies`;
    }
  });

  const detailButtons = document.querySelectorAll<HTMLButtonElement>(".detail-toggle");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const controlId = button.getAttribute("aria-controls");
      if (!controlId) {
        return;
      }
      const panel = document.getElementById(controlId);
      if (!panel) {
        return;
      }
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      button.textContent = isExpanded ? "Architecture Notes" : "Hide Notes";
      if (isExpanded) {
        panel.setAttribute("hidden", "");
      } else {
        panel.removeAttribute("hidden");
      }
    });
  });
}

function createAuditRow(controlName: string, measuredValue: string, isPass: boolean): HTMLTableRowElement {
  const row = document.createElement("tr");

  const controlCell = document.createElement("td");
  controlCell.textContent = controlName;

  const measuredCell = document.createElement("td");
  measuredCell.textContent = measuredValue;

  const statusCell = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = `status-pill ${isPass ? "is-pass" : "is-warn"}`;
  badge.textContent = isPass ? "PASS" : "CHECK";
  statusCell.appendChild(badge);

  row.appendChild(controlCell);
  row.appendChild(measuredCell);
  row.appendChild(statusCell);
  return row;
}

function runSecurityAudit(): void {
  const tbody = document.getElementById("security-audit-rows");
  const timestamp = document.getElementById("audit-status");
  if (!tbody) {
    return;
  }

  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  const cspContent = cspMeta?.getAttribute("content") ?? "";
  const cspOk =
    cspContent.includes("default-src 'none'") &&
    cspContent.includes("script-src 'self'") &&
    cspContent.includes("style-src 'self'") &&
    !cspContent.includes("unsafe-inline") &&
    !cspContent.includes("unsafe-eval");

  const inlineStylesCount = document.querySelectorAll("style").length;
  const inlineStyleAttrCount = document.querySelectorAll("[style]").length;

  let inlineScriptCount = 0;
  let externalOriginCount = 0;
  let sriVerifiedCount = 0;
  let bundledAssetCount = 0;

  document.querySelectorAll("script").forEach((scriptEl) => {
    const src = scriptEl.getAttribute("src");
    if (!src) {
      inlineScriptCount += 1;
      return;
    }
    bundledAssetCount += 1;
    if (isExternalHttpUrl(src)) {
      externalOriginCount += 1;
    }
    if ((scriptEl.getAttribute("integrity") ?? "").startsWith("sha384-")) {
      sriVerifiedCount += 1;
    }
  });

  document.querySelectorAll('link[rel="stylesheet"]').forEach((linkEl) => {
    const href = linkEl.getAttribute("href") ?? "";
    bundledAssetCount += 1;
    if (isExternalHttpUrl(href)) {
      externalOriginCount += 1;
    }
    if ((linkEl.getAttribute("integrity") ?? "").startsWith("sha384-")) {
      sriVerifiedCount += 1;
    }
  });

  const externalAnchors = document.querySelectorAll('a[target="_blank"]');
  let missingRelCount = 0;
  externalAnchors.forEach((anchor) => {
    const relTokens = (anchor.getAttribute("rel") ?? "").toLowerCase().split(/\s+/);
    if (!relTokens.includes("noopener") || !relTokens.includes("noreferrer")) {
      missingRelCount += 1;
    }
  });

  const rows = [
    createAuditRow(
      "Content Security Policy",
      cspOk ? "Strict default-src 'none', zero unsafe-inline" : "Missing or relaxed CSP meta",
      cspOk
    ),
    createAuditRow(
      "Inline Code & Style Isolation",
      `${inlineScriptCount} inline scripts, ${inlineStylesCount + inlineStyleAttrCount} inline styles`,
      inlineScriptCount === 0 && inlineStylesCount === 0 && inlineStyleAttrCount === 0
    ),
    createAuditRow(
      "Third-Party Network Origins",
      `${externalOriginCount} external CSS/JS origins (100% self-hosted)`,
      externalOriginCount === 0
    ),
    createAuditRow(
      "External Link Tabnabbing Guard",
      `${externalAnchors.length} external links verified (${missingRelCount} missing rel)`,
      missingRelCount === 0
    ),
    createAuditRow(
      "Subresource Integrity (SHA-384)",
      bundledAssetCount > 0 && sriVerifiedCount === bundledAssetCount
        ? `${sriVerifiedCount}/${bundledAssetCount} static bundles cryptographically pinned`
        : `${sriVerifiedCount}/${bundledAssetCount} bundles pinned`,
      bundledAssetCount > 0 && sriVerifiedCount === bundledAssetCount
    )
  ];

  tbody.replaceChildren(...rows);

  if (timestamp) {
    timestamp.textContent = `DOM inspection verified at ${new Date().toLocaleTimeString()}`;
  }
}

function initSecurityInspector(): void {
  runSecurityAudit();
  const auditButton = document.getElementById("run-audit-btn");
  if (auditButton) {
    auditButton.addEventListener("click", runSecurityAudit);
  }
}

initTheme();
initMobileNav();
initCaseFilters();
initSecurityInspector();
