# Monitoring GC events in Python — Marp decks

This folder contains the talk **"Мониторинг событий сборщика мусора в Python: вчера,
сегодня, завтра?" / "Monitoring Garbage Collector Events in Python: yesterday, today,
tomorrow?"** (PyCon Russia 2026), authored in [Marp](https://marp.app/) — Markdown-based
slides. It was converted from `../2026.pdf`.

The talk ships in **two languages** that share **one** stylesheet.

## Contents

| Path | What it is |
|------|-----------|
| `pycon-ru-2026-ru.md` | **Russian** deck source — 51 slides in Marp Markdown. **Edit this for RU.** |
| `pycon-ru-2026-en.md` | **English** deck source — the same 51 slides, translated. **Edit this for EN.** |
| `themes/gc-talk.css` | **Shared theme** — the gruvbox-light look, layout classes (`.columns`, `.dense`, `.overlay`, `.diag8`, …) and the syntax-highlight colors. Both decks reference it via `theme: gc-talk`. **Edit here once → both decks update.** Required to build. |
| `themes/fonts/` | Bundled **Fira Sans** / **Fira Sans Black** (titles) / **Ioskeley Mono** (code), embedded via the theme's `@font-face`. |
| `images/` | Charts/screenshots + editable `.svg` diagrams, one file per visual. Shared by both decks. |
| `marp.config.mjs` | Marp CLI config: registers the `gc-talk` theme **and** the functional engine for ```` ```c {n} ```` code line-highlighting (`markdown-it-highlight-lines`). Auto-loaded from this folder. **Required to build.** |
| `package.json`, `package-lock.json`, `node_modules/` | The local npm dependency the engine uses. Run `npm install` here once (see Prerequisites). **Required to build.** |
| `*.pdf` | Build outputs (regenerate with the commands below). |

Slides are separated by `---`. Each deck's front matter sets `marp: true`, `theme: gc-talk`,
and `lang:`. **There is no `<style>` block in the markdown** — all styling lives in
`themes/gc-talk.css`. Titles/bullets/code are plain editable Markdown; chart/screenshot
slides reference files in `images/`.

## Managing styles for both decks

The two decks are **content only**; they both say `theme: gc-talk` and pull every rule from
`themes/gc-talk.css`. So:

- **To restyle** (colors, fonts, spacing, a layout class) — edit `themes/gc-talk.css`. Rebuild
  either deck to see it; both stay in sync automatically.
- **To change wording** — edit the relevant `pycon-ru-2026-*.md`. Language changes never touch styles.
- The theme extends Marp's built-in `default` (`@import 'default';` at the top); our rules follow
  and win by source order. Font `url()`s are **deck-relative** (`themes/fonts/…`), which is how
  marp-cli resolves them — that's why they live under `themes/`.

## Prerequisites

- **[Node.js](https://nodejs.org/)** (v18+). Check with `node --version`.
- **Recommended: install marp-cli globally once** — `npm install -g @marp-team/marp-cli`, then use the
  `marp` binary (builds in ~4-7s). `npx --yes @marp-team/marp-cli …` also works but re-resolves the
  package every run and is much slower.
- **Install the local build dependency (once)** — from inside `marp/`, run:
  ```bash
  npm install
  ```
  This pulls `markdown-it-highlight-lines` into `node_modules/`. The engine in `marp.config.mjs`
  (auto-loaded by marp-cli) needs it for code line-highlighting; **without it the build fails** on the
  missing module.

> **Important:** run every command **from inside this `marp/` folder**, and always pass
> `--allow-local-files`. The slides embed local images/fonts, and Marp blocks local-file access by
> default. Running from this folder also lets marp-cli find `marp.config.mjs` and the theme.

## Rebuild

```bash
cd marp
```

### PDF (both decks)
```bash
marp pycon-ru-2026-ru.md -o pycon-ru-2026-ru.pdf --allow-local-files
marp pycon-ru-2026-en.md -o pycon-ru-2026-en.pdf --allow-local-files
```

### HTML / PowerPoint
Swap the output extension (`-o …​.html` or `-o …​.pptx`):
```bash
marp pycon-ru-2026-en.md -o pycon-ru-2026-en.html --allow-local-files
marp pycon-ru-2026-en.md -o pycon-ru-2026-en.pptx --allow-local-files
```

> The standard `.pptx` export embeds each slide as an image (not editable shapes). For an
> editable PowerPoint, add `--pptx-editable` (experimental; requires **LibreOffice** /
> `soffice` on your PATH).

## Live editing

Watch mode rebuilds on every save (point it at whichever deck you're editing):
```bash
marp -w pycon-ru-2026-ru.md --allow-local-files
```
Or a local preview server (open the printed URL in a browser):
```bash
marp -s . --allow-local-files
```
In **VS Code**, the [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
extension gives a live side-by-side preview and an export button — enable
"Marp: Enable HTML" / local-file access in settings if images don't show.

> **Preview caveat:** the VS Code extension does **not** run `marp.config.mjs`, so code
> **line-highlight bands won't appear in its preview** (the code shows syntax-colored but
> without the bands). The bands render only in the `marp-cli` build (PDF/HTML/PPTX).
> Always confirm highlighting against a CLI build, not the VS Code preview.

## Code line highlighting

Highlight specific lines of a fenced code block by listing line numbers in braces after the
language — 1-based, ranges allowed:

````markdown
```c {2,9,15-16}
typedef struct _Py_DebugOffsets {
    char cookie[8] _Py_NONSTRING;   // <- line 2, highlighted
    ...
```
````

The `marp.config.mjs` engine (via `markdown-it-highlight-lines`) wraps those lines in
`.highlighted-line`, which the theme paints as full-width gruvbox-yellow bands
(`.highlighted-line { display: block; background: #fabd2f; }` in `themes/gc-talk.css`). To
change which lines are highlighted, edit the numbers in `{…}` — no pixel math, survives code
edits. Used on slides 20, 21, 22, 45.

## Notes on the conversion

- **Converted from a fixed-layout PDF**, so exact positioning/animations from the original
  PowerPoint were not preserved. Review text against `../2026.pdf` before use.
- **Chart/screenshot slides use full-page renders** in `images/`. On hybrid slides
  (bullets/code **and** a chart), the text is transcribed as editable Markdown *and* the image
  repeats it. Once you recreate a chart natively — or swap in project originals such as
  `../plots314.png` — delete the `![...](images/…)` line for that slide.
- **To change the look**, edit `themes/gc-talk.css` (see *Managing styles* above), not the markdown.
