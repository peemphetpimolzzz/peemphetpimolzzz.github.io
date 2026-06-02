# Portfolio

Personal portfolio site — static HTML/CSS/JS, no build step, no third-party requests.
Bilingual (EN/TH) with a light/dark theme. Both preferences are remembered per browser.

## Preview locally (Docker)

> Needs only Docker — nothing installed on the host.

```bash
docker compose up
```

Then open <http://localhost:8080>. Edit any file and refresh — the folder is mounted into nginx, so changes show up immediately. Stop with `Ctrl+C`.

## Files

```
index.html          # markup + EN/TH content (data-en / data-th attributes)
assets/styles.css   # theming (light/dark) + responsive (tablet 900px, mobile 640px)
assets/app.js       # theme toggle, language toggle, footer year
.nojekyll           # tell GitHub Pages to serve files as-is
docker-compose.yml  # local nginx preview
```

## Deploy to GitHub Pages

1. Create a public repo. For a site at `https://peemphetpimolzzz.github.io`, name it
   **`peemphetpimolzzz.github.io`**. For a project site
   (`https://peemphetpimolzzz.github.io/portfolio`), name it anything (e.g. `portfolio`).
2. Push the contents of this folder to the default branch:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/peemphetpimolzzz/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `/ (root)`, save. The site is live in ~1 minute.

Paths are relative, so it works at both a root site and a `/subpath` project site.

## Editing content

- **Text**: every translatable element carries `data-en` and `data-th`. Edit both.
- **Projects**: each card links to `https://github.com/peemphetpimolzzz/<repo>`.
- **Colors**: the `:root` / `[data-theme="dark"]` blocks at the top of `styles.css`.

## Fonts

Uses the system font stack (zero external requests). To self-host instead, drop
`inter.woff2` + `ibm-plex-sans-thai.woff2` into `assets/fonts/`, add `@font-face`
rules with `font-display: swap`, and point `--font-sans` at them.
