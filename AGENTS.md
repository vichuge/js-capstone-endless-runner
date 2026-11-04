# AGENTS.md

Guide for AI coding agents (and humans) working on **Sunny Land**, a Phaser 4
endless runner: a fox jumps between scrolling platforms, collects gems and avoids frogs.

## Commands

| Task | Command |
| --- | --- |
| Install | `npm install` (Node ≥ 20.19, see `.nvmrc`) |
| Dev server | `npm start` → <http://localhost:8080> (bundle served from memory) |
| Production build | `npm run build` → writes `dist/main.js` |
| Unit tests | `npm test` (Jest, `src/tests/`) |
| Lint | `npm run lint` (ESLint flat config + Stylelint); `npm run lint:fix` to autofix |
| Browser smoke test | `npm run smoke` with the dev server running (first time: `npx playwright install chromium`) |

Before finishing a change, run `npm run lint && npm test && npm run build`. If the
change touches anything visible or a scene, also run `npm run smoke` and look at the
screenshots in `tools/screenshots/` (git-ignored). CI (`.github/workflows/linters.yml`)
runs lint, test and build on every PR.

## Layout

```
dist/                 Static site served by GitHub Pages (gh-pages branch)
  index.html          Hand-written page: #game container + Bootstrap "Pick your name" modal
  assets/             All images, audio and fonts, referenced by relative URL from scenes
  main.js             Build output, committed: rebuild with `npm run build` when src/ changes
src/
  index.js            Creates the Phaser.Game, registers scenes, sets up the name modal
  Config/config.js    Phaser config: 800x600, Scale.FIT + CENTER_BOTH, smoothPixelArt, arcade physics
  Scenes/             Boot → Preloader → Title ⇄ Options / Credits / HallOfFame; PreGame → Game → GameOver
  Objects/
    gameOptions.js    Gameplay tuning (speeds, gravity, jump force, spawn %) + shared run state
    Button.js         Sprite button; `action` is a scene key or a callback
    ui.js             Shared text style (kenvector font + stroke), panels, fades, sound helper
  Model.js            Music/sound toggles (kept on game.globals.model)
  scores.js           Leaderboard: localStorage, optional remote API (SCORES_API_URL)
  nameModal.js        Bootstrap modal wiring (uses window.bootstrap from the CDN bundle)
  style.css           Page styling, @font-face (css-loader has url: false: paths relative to dist/)
tools/smoke-test.cjs  Playwright script that clicks through every scene
```

## Conventions and gotchas

- **Import Phaser explicitly**: `import Phaser from 'phaser'`. Phaser 4's ESM build does
  not create a global `Phaser`. Don't use the global `game` either; inside scenes use
  `this.scale.width/height`, `this.sys.game.globals`.
- **Coordinates assume an 800x600 game.** Scale.FIT handles every screen size, so never
  read `window.innerWidth` for layout.
- **All assets load in `PreloaderScene`** (the font loads in `BootScene` so the loading
  screen can use it). Scenes only `add` images in `create()`. Add a new asset to the
  preloader under a key, then use the key.
- **Texts** go through `textStyle(size, color)` from `Objects/ui.js` so they share the
  font and outline. The kenvector font is wide: keep button labels short, at 18px.
- **Keyboard shortcuts** use `onSpace(scene, cb, { delay })` from `Objects/ui.js`. It
  ignores key repeat and any key press while the name modal is open, so a space
  typed in a name doesn't start the game. Shortcuts: SPACE = Play (Title), SPACE/↑ = jump
  (Game), SPACE = Play again (GameOver, after a 700 ms delay so leftover jump presses
  don't restart the run). The control hints (`addHint`) live in those same three scenes;
  keep them in sync with the shortcuts. Use `hasKeyboard(scene)` to switch to "Tap" wording.
- **Sounds** go through `playSound(scene, key)`, which respects the Sound option.
- **Object pools in `GameScene`**: platforms, gems and frogs are recycled between a
  group and a pool. A collected gem gets `disableBody()`, so reuse must call
  `enableBody(...)` and set the velocity again (this was a past bug).
  Recycled platforms are resized with `setSize` + `body.setSize` + `body.reset`.
  **Never scale them** (`displayWidth`/`tileScaleX`): in Phaser 4 that left the
  arcade body a few px wide and the fox fell through. `npm run smoke` checks this.
- The game-over check sets `this.isGameOver` before switching scenes so `update()`
  can't save the score twice.
- **Leaderboard**: the original Microverse API is gone (404). Scores live in
  `localStorage` under `sunnyland.scores`, the player name under `sunnyland.playerName`.
  Always wrap storage access in try/catch, because private mode can throw.
- `Model` tests compare the object's exact shape, so update `src/tests/Model.test.js`
  if you add fields.
- `dist/main.js` is committed because GitHub Pages serves it. Rebuild in production mode
  (`npm run build`) before committing, never a dev build (dev builds use eval source maps).
- Lint style: 2 spaces, single quotes, semicolons, trailing commas on multiline (ESLint
  `@stylistic`). Use `npm run lint:fix` instead of reformatting by hand.

## Dependencies: version notes

- Phaser 4.x. The API is close to Phaser 3, but check `node_modules/phaser/CHANGELOG.md`
  before using renderer, FX, mask or pipeline features.
- `babel-jest` 30 needs Babel 7, not 8. Babel is used only by Jest; webpack ships modern
  ES directly.
- webpack-dev-server stays on 5.x: webpack-cli 7 declares a peer of `^5`.
- Stylelint stays on 17 / `stylelint-config-standard@40`: Stylelint 18 needs Node ≥ 22.22.
- The remaining `npm audit` warnings come from dev-server internals (sockjs/uuid) and
  are dev-only.

## Credits

Art: "Sunny Land" pixel art by ansimuz (Luis Zuno). UI: Kenney. See `GDD.md`.
