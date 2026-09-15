# Engineering Handoff — DesignTweaker

## Purpose

This handoff records the maintenance and publication model for DesignTweaker so future visual/settings changes remain reversible, compatible and reproducibly released.

## Project role

DesignTweaker is an Obsidian plugin for controlled visual/layout customization. Its large runtime surface is concentrated in `main.js` and `styles.css`, with settings behavior covered by automated tests. Because the plugin changes presentation rather than note data semantics, the primary safety requirement is that disabling/removing the plugin leaves user Markdown intact.

## Engineering principles

Settings must have stable defaults and survive upgrades. CSS changes should be scoped to the intended Obsidian surfaces and avoid broad selectors that unintentionally alter unrelated plugins. A visual tweak should degrade cleanly when the relevant Obsidian DOM class is absent. The plugin must not depend on a private vault path or machine-specific state.

## Testing and validation

`tests/settings.test.js` protects settings behavior and `tests/publication.test.js` protects the release file set/metadata. CI is in `.github/workflows/ci.yml`. Visual changes still require manual Obsidian inspection because headless tests cannot prove every theme/DOM interaction.

`docs/validation.md` is the release-validation record. Future acceptance should identify the Obsidian version/theme used for visual checks and distinguish automated settings/publication tests from manual rendering acceptance.

## Publication

The repository has automated CI and release workflows plus `publication.json` and `publication-files.json` defining the public artifact. `docs/releases.md` and `docs/release-notes.md` preserve publication history. The accepted public line reached **1.1.11**.

The publication script under `scripts/publication.cjs` is part of the release trust boundary. Do not bypass it by manually uploading an arbitrary local plugin directory.

## Repository map

- `README.md` — user-facing feature/setup documentation.
- `main.js` — plugin runtime.
- `styles.css` — presentation rules.
- `manifest.json` / `versions.json` — Obsidian metadata/version compatibility.
- `tests/` — settings and publication regressions.
- `docs/validation.md` — validation evidence.
- `docs/releases.md` / `docs/release-notes.md` — release history.
- `publication*.json` — distributed-file definition.
- `.github/workflows/` — CI/release automation.

## Maintenance procedure

Before a release: checkpoint the current accepted plugin; make the smallest scoped settings/CSS/runtime change; run tests; inspect settings migration/defaults; test enable/disable and reload in Obsidian; inspect affected views in representative themes/modes; verify no note content is modified; run publication checks; update release notes/validation/handoff; tag/publish through the release workflow and verify assets.

## Historical integrity rule

A passing publication test proves artifact consistency, not visual correctness. A manual screenshot proves one rendered state, not all themes/Obsidian versions. Keep these evidence layers separate in future documentation.

## Current handoff status

As of 2026-09-15, DesignTweaker has README, license, CI/release automation, publication manifests/scripts, settings/publication tests, validation/release documentation and this engineering handoff.