# peemphetpimolzzz.github.io

Personal portfolio site for **Peem Phetpimol** — live at <https://peemphetpimolzzz.github.io>.

Static HTML/CSS/JS with zero build steps and zero third-party network requests.
Bilingual (`EN` / `TH`) with a `light` / `dark` theme, both persisted in `localStorage`.

## Preview locally (Docker)

> Needs only Docker — nothing installed on the host.

```bash
docker compose up
```

Then open <http://localhost:8080>. Edit any file and refresh — the folder is mounted into nginx, so changes show up immediately. Stop with `Ctrl+C`.

## Files

```
index.html          # markup + EN/TH content (data-en / data-th attributes)
404.html            # custom not-found page with theme & language support
assets/styles.css   # theming (light/dark) + responsive (tablet 900px, mobile 640px)
assets/app.js       # theme toggle, language toggle, footer year
assets/img/         # project card screenshots
.nojekyll           # tell GitHub Pages to serve files as-is
docker-compose.yml  # local nginx preview
```

## Editing content

- **Text**: every translatable element carries `data-en` and `data-th`. Edit both.
- **Projects**: each card links to `https://github.com/peemphetpimolzzz/<repo>`.
- **Colors**: the `:root` / `[data-theme="dark"]` blocks at the top of `assets/styles.css`.

## Fonts

Uses the system font stack (zero external requests). To self-host instead, drop
`inter.woff2` + `ibm-plex-sans-thai.woff2` into `assets/fonts/`, add `@font-face`
rules with `font-display: swap`, and point `--font-sans` at them.
