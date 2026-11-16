import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const distDir = path.join(rootDir, "dist");

function sha384(content) {
  return `sha384-${createHash("sha384").update(content).digest("base64")}`;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`SECURITY CHECK FAILED: ${message}`);
  }
}

async function main() {
  const html = await readFile(path.join(distDir, "index.html"), "utf8");
  const css = await readFile(path.join(distDir, "styles.css"), "utf8");
  const js = await readFile(path.join(distDir, "app.js"), "utf8");
  const ts = await readFile(path.join(srcDir, "app.ts"), "utf8");

  /* 1. Strict Content Security Policy */
  const cspMatch = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i);
  assert(cspMatch !== null, "Missing Content-Security-Policy meta tag in dist/index.html");
  const csp = cspMatch[1];
  for (const directive of ["default-src 'none'", "script-src 'self'", "style-src 'self'", "img-src 'self'", "font-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'none'"]) {
    assert(csp.includes(directive), `CSP missing directive: ${directive}`);
  }
  assert(!/unsafe-inline|unsafe-eval|\*/i.test(csp), "CSP must not permit unsafe-inline, unsafe-eval, or wildcard origins");

  /* 2. Zero inline styles, inline scripts, or inline event handlers */
  assert(!/<style\b/i.test(html), "Inline <style> block detected in HTML");
  assert(!/\sstyle\s*=/i.test(html), "Inline style attribute detected in HTML");
  assert(!/\son[a-z]+\s*=/i.test(html), "Inline on* event handler attribute detected in HTML");
  const scriptTags = [...html.matchAll(/<script\b([^>]*)>/gi)];
  assert(scriptTags.length === 1, `Expected exactly 1 <script> tag, found ${scriptTags.length}`);
  assert(/\ssrc="\.\/app\.js"/i.test(scriptTags[0][1]), "<script> must reference ./app.js");

  /* 3. Cryptographic SHA-384 Subresource Integrity match */
  const expectedCssSri = sha384(css);
  const expectedJsSri = sha384(js);
  assert(
    html.includes(`<link rel="stylesheet" href="./styles.css" integrity="${expectedCssSri}" crossorigin="anonymous">`),
    "Stylesheet SRI hash mismatch in dist/index.html"
  );
  assert(
    html.includes(`<script src="./app.js" defer integrity="${expectedJsSri}" crossorigin="anonymous"></script>`),
    "Script SRI hash mismatch in dist/index.html"
  );

  /* 4. Zero third-party resource origins in HTML/CSS/JS */
  assert(!/url\(\s*['"]?https?:/i.test(css), "External URL found inside styles.css");
  const resourceUrls = [...html.matchAll(/<(?:script|img|link)\b[^>]+(?:src|href)="([^"]+)"/gi)];
  for (const [fullTag, ref] of resourceUrls) {
    if (/rel="canonical"/i.test(fullTag) && ref === "https://peemphetpimolzzz.github.io/") {
      continue;
    }
    assert(!/^https?:\/\//i.test(ref) && !ref.startsWith("//"), `External resource reference disallowed: ${ref}`);
  }

  /* 5. External target=_blank links hardened against tabnabbing */
  const blankAnchors = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)].map((m) => m[0]);
  assert(blankAnchors.length > 0, "Expected at least one hardened external link to verify");
  for (const anchor of blankAnchors) {
    assert(/rel="[^"]*noopener[^"]*"/i.test(anchor) && /rel="[^"]*noreferrer[^"]*"/i.test(anchor), `Unsafe external anchor rel: ${anchor}`);
  }

  /* 6. Ban unsafe DOM injection / code evaluation APIs */
  const unsafeJsPatterns = [
    /\binnerHTML\b/,
    /\bouterHTML\b/,
    /\binsertAdjacentHTML\b/,
    /document\.write\b/,
    /\beval\s*\(/,
    /new\s+Function\s*\(/
  ];
  for (const pat of unsafeJsPatterns) {
    assert(!pat.test(js) && !pat.test(ts), `Disallowed unsafe DOM/eval API pattern matched: ${pat}`);
  }

  /* 7. Privacy & corporate confidentiality leakage guard */
  const combinedPublic = `${html}\n${css}\n${js}`;
  for (const secret of ["091-845", "Bang Bo", "DO260", "LARO", "PSEApp", "PeemKraft", "peemkraft"]) {
    assert(!combinedPublic.toLowerCase().includes(secret.toLowerCase()), `Restricted string leaked in public bundle: ${secret}`);
  }

  /* 8. Verify required static assets and zero Jekyll breakage */
  const requiredAssets = [
    ".nojekyll",
    "assets/avatar.png",
    "assets/og-card.png",
    "assets/favicon.svg",
    "assets/CV_Peem_Phetpimol.pdf",
    "assets/fonts/Inter-Regular.ttf",
    "assets/fonts/Inter-Medium.ttf",
    "assets/fonts/Inter-SemiBold.ttf",
    "assets/fonts/Inter-Bold.ttf",
    "assets/fonts/InterDisplay-SemiBold.ttf",
    "assets/fonts/InterDisplay-Bold.ttf",
    "assets/fonts/OFL.txt",
    "assets/fonts/IBMPlexSansThai-Regular.woff2",
    "assets/fonts/IBMPlexSansThai-Medium.woff2",
    "assets/fonts/IBMPlexSansThai-SemiBold.woff2",
    "assets/fonts/IBMPlexSansThai-Bold.woff2",
    "assets/fonts/OFL-IBM-Plex.txt"
  ];
  for (const relPath of requiredAssets) {
    await access(path.join(distDir, relPath));
  }

  console.log("ALL SECURITY VERIFICATION GATES PASSED:");
  console.log(`  - CSP strict directives verified`);
  console.log(`  - SHA-384 SRI verified for styles.css and app.js`);
  console.log(`  - Zero inline scripts/styles, zero external CDNs, zero unsafe DOM sinks`);
  console.log(`  - ${blankAnchors.length} target="_blank" link(s) hardened with noopener noreferrer`);
  console.log(`  - Privacy/confidentiality & asset checks (${requiredAssets.length} files) passed`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
