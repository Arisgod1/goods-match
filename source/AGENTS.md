# Repository Guidelines

## Project Structure & Module Organization

This is a portrait puzzle game built with Cocos Creator **3.8.3** and TypeScript.

- `assets/scenes/main.scene` is the entry scene; `assets/scripts/Main.ts` starts resource loading.
- `assets/scripts/game/` contains gameplay components; `manager/` handles shared systems such as resources, UI, audio, and game state.
- `ui/`, `uiItem/`, and `uiExtend/` contain interface components. Shared bases, types, and helpers live in `scriptBase/`, `dto/`, `enum/`, and `util/`.
- `assets/bundles/` groups UI, gameplay, audio, and icon assets; `assets/resources/` holds startup and directly loaded resources.
- `sheet/` contains configuration workbooks; `excel2ts/` exports them into `assets/scripts/config/`.
- `settings/` contains editor/project settings. No dedicated test directory currently exists.

## Build, Test, and Development Commands

- Open this directory in Cocos Creator 3.8.3, open `main.scene`, and use **Preview** to run locally.
- Use Creator's **Project → Build** panel to select a target and build. Generated output belongs in the ignored `build/` directory.
- Run `cd excel2ts && node scripts/exportToTs.js` to regenerate spreadsheet configuration. Paths in `excel2ts/config.json` are relative to that file. Run `npm ci --allow-remote=all --ignore-scripts` before export; the lockfile pins `node-xlsx` and its official SheetJS archive.

The root `package.json` provides check, scan, test, typecheck, build:web, release, and config:export scripts; see README.md. `tsconfig.json` extends Creator-generated `temp/tsconfig.cocos.json`, so open the project in Creator before relying on TypeScript tooling.

## Coding Style & Naming Conventions

Persist game state through `GameSave` transactions using `hgxcds_game_v1`. Older browser storage keys are deliberately unused; do not add legacy reads or migration paths.

Use four-space indentation in handwritten TypeScript, PascalCase component classes/files (`Goods.ts`, `UIMgr.ts`), and camelCase methods and variables. Match the surrounding file's quotes and semicolon usage; no formatter or linter is configured. Preserve Cocos decorators and serialized property names when changing components.

Move or rename assets through Creator and retain their `.meta` files to preserve UUID references. Update workbook-backed configuration through `sheet/` and regenerate the corresponding `cfg_*.ts` files.

## Testing Guidelines

Run `node tools/test-rewards.cjs` for reward, inventory, and round-state regression checks using mocked Cocos interfaces. It uses Creator's bundled TypeScript compiler; set `COCOS_TYPESCRIPT` if installed elsewhere. No coverage threshold is configured. For gameplay changes, preview startup, level loading, matching, skills, pause/resume, and win/timeout flows. Check the console for errors and verify affected UI at the configured 720 × 1600 portrait resolution. Build and smoke-test the intended platform when changing SDK integrations or bundle loading.

## Commit & Pull Request Guidelines

This checkout has Git metadata. Preserve all existing working tree changes and untracked files; never reset or clean it. Use concise imperative subjects, for example `fix: restore timer after resume`. Keep changes focused and include associated asset metadata and regenerated configuration. PRs should describe the behavior change, link relevant issues, list validation steps/platforms, and include screenshots or recordings for visible changes. Exclude generated caches, build output, and local dependencies as specified in `.gitignore`.
