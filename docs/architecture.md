# Data Acorns application map

This is the existing React 19 / Vite static site, deployed to GitHub Pages. No backend, visitor authentication, or hosted database is required.

## Running website

- `src/main.tsx` mounts the app.
- `src/app/App.tsx` handles global navigation and lazy-loads each Ecoverse.
- `src/app/ecoverses.ts` is the single map/directory/navigation registry.
- `src/app/index.css`, `tailwind.config.cjs`, and `postcss.config.cjs` produce the stylesheet at build time. The site no longer depends on the Tailwind runtime CDN or AI Studio environment variables.
- `src/ecoverses/` contains one directory for each presentation. TransitAware and Food Vulnerability have separate components, datasets, repositories, and research sources.
- `src/content/abstracts.ts` contains conference metadata; `src/content/researchNotes.ts` loads human-authored notes.
- `content/notes/` is the publishing location. Its README and `_template.md` are instructions, not published articles.

Each Ecoverse has a hash URL (`#/shellgame`, `#/research-hub`, etc.). Iris retains `#/iris` and `#/iris/the-record`. Internal navigation never changes artifact identity or order within the source documents.

## Evidence and sources

- `public/acorns=iris/` is protected: the DOCX exhibits, data, and receipts stay byte-identical at their established filenames and URLs. The reader renders the original documents; it must not summarize or reconstruct them. Visitor study-session arrangements are presentation state only.
- The older primary Iris paper, analyses, and plots are archived in `research/iris/`. The parent page is not being rewritten while the revised paper is in progress.
- `content/sources/` retains the landing-page intro essay source. Its displayed essay remains in the Overworld component.
- The original Contextual Training paper is housed under `public/papers/` and linked by title in Research Hub, with no blurb or separate Ecoverse. Its project GUI and wider artifact organization remain on hold. A repository project does not automatically get an Ecoverse.
- `research/shell-game/` retains R analysis/vignette sources and the retired alternative presentation. Existing public vignette/document URLs remain available.
- `research/transit-aware/` holds the standalone map and Google API analysis sources. The map's relative route-data file remains beside it.
- `public/food-vulnerability/` hosts the original scoring-methodology PDF. The project links to its research repository and Shiny app separately from TransitAware.
- `research/conferences/` retains conference-source copies. Official conference imagery remains in `public/`. SACNAS is 2026; the ABRCMS entry is 2025. Archived filenames are historical records, not current display metadata.
- `tools/canvas-api/` and `tools/school-closure/` contain independently maintained Python sources and READMEs. The website displays those READMEs and offers source downloads. Canvas also links to PyPI (`canvastogo`). The historical MMSD configuration remains in the School Closure source; the public tool name is School Closure.
- `research/tools/site-history/` preserves the previous tool material. It is not the current download source.
- `research/model-schmodel/` contains work-in-progress field-collection source. No new public Ecoverse or model run is introduced by this cleanup. Private pilot notes, receipts, and environments remain local and ignored.
- `research/site-history/` retains the previous conceptual architecture and upload instructions.

The NHGIS download links to the exact file in `phinnphace/shellgame`, pinned to commit `d5efa3fe0ea635aa80e60518d6dca9eb32f82332`. It is not a substituted dataset or a second 17 MB copy.

## Maintenance

```sh
npm ci
npm run dev
npm run lint
npm run check:artifacts
npm run build
```

`docs/relocations.json` records moved paths. `docs/source-artifacts.json` records the baseline hashes of existing source artifacts, with their new locations where applicable. `npm run check:artifacts` checks those bytes and the full Iris evidence file list. Updating an artifact requires the owner's explicit approval; an intentional new version should be accompanied by an intentional manifest update, not silently accepted.

GitHub Pages builds `dist/` through `.github/workflows/deploy.yml`. Preserve `public/CNAME`, robots/sitemap files, and social-share metadata. Do not commit `.env`, tokens, virtual environments, generated databases, downloaded model receipts, or `dist/`.
