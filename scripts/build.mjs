import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const assetsDir = path.join(rootDir, "assets");
const distDir = path.join(rootDir, "dist");

function computeSha384Integrity(bufferOrString) {
  const digest = createHash("sha384").update(bufferOrString).digest("base64");
  return `sha384-${digest}`;
}

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const tsSource = await readFile(path.join(srcDir, "app.ts"), "utf8");
  const strippedJs = stripTypeScriptTypes(tsSource, { mode: "strip" });
  const jsOutPath = path.join(distDir, "app.js");
  await writeFile(jsOutPath, strippedJs, "utf8");

  /* Verify stripped JavaScript parses cleanly with current Node runtime */
  execFileSync(process.execPath, ["--check", jsOutPath], { stdio: "inherit" });

  const cssSource = await readFile(path.join(srcDir, "styles.css"), "utf8");
  const cssOutPath = path.join(distDir, "styles.css");
  await writeFile(cssOutPath, cssSource, "utf8");

  await cp(assetsDir, path.join(distDir, "assets"), { recursive: true });
  await writeFile(path.join(distDir, ".nojekyll"), "", "utf8");

  const cssIntegrity = computeSha384Integrity(cssSource);
  const jsIntegrity = computeSha384Integrity(strippedJs);

  let htmlSource = await readFile(path.join(srcDir, "index.html"), "utf8");
  const cssTag = '<link rel="stylesheet" href="./styles.css">';
  const jsTag = '<script src="./app.js" defer></script>';

  if (!htmlSource.includes(cssTag) || !htmlSource.includes(jsTag)) {
    throw new Error("Expected stylesheet and script tags missing in src/index.html");
  }

  htmlSource = htmlSource.replace(
    cssTag,
    `<link rel="stylesheet" href="./styles.css" integrity="${cssIntegrity}" crossorigin="anonymous">`
  );
  htmlSource = htmlSource.replace(
    jsTag,
    `<script src="./app.js" defer integrity="${jsIntegrity}" crossorigin="anonymous"></script>`
  );

  await writeFile(path.join(distDir, "index.html"), htmlSource, "utf8");

  console.log(`Built dist/ with SRI hashes:`);
  console.log(`  styles.css -> ${cssIntegrity}`);
  console.log(`  app.js     -> ${jsIntegrity}`);
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
