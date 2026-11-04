# CLAUDE.md

@AGENTS.md

## Notes for Claude Code

- Visual changes are verified by looking at the screenshots, not just by tests passing:
  start `npm start` in the background, run `npm run smoke` (optionally with a phone
  viewport: `npm run smoke -- http://localhost:8080/ tools/screenshots 390 844`), then
  read the PNGs in `tools/screenshots/`.
- WSL: the dev server listens on `localhost:8080`, reachable from the Windows browser.
- Work on a feature branch; `development` is the default branch PRs target.
