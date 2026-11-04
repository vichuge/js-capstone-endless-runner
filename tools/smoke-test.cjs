// Browser smoke test: drives the game through every scene, fails on page errors,
// and saves a screenshot of each scene so changes can be reviewed visually.
//
//   npm start                      # in another terminal (or serve dist/ on :8080)
//   npm run smoke                  # -> screenshots in tools/screenshots/
//   npm run smoke -- http://localhost:8080/ tools/screenshots 390 844   # phone size
//
// First run only: npx playwright install chromium
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [
  url = 'http://localhost:8080/',
  outDir = path.join(__dirname, 'screenshots'),
  width = '1280',
  height = '800',
] = process.argv.slice(2);

// Ignore noise from the headless software GPU.
const IGNORED = [/GL Driver Message/, /willReadFrequently/];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });

  const problems = [];
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type()) && !IGNORED.some((re) => re.test(message.text()))) {
      problems.push(`${message.type()}: ${message.text()}`);
    }
  });

  const wait = (ms) => page.waitForTimeout(ms);
  const shot = (name) => page.screenshot({ path: path.join(outDir, `${name}.png`) });
  const activeScenes = () => page.evaluate(() => window.game.scene.getScenes(true).map((s) => s.scene.key).join(','));
  const expectScene = async (key) => {
    const scenes = await activeScenes();
    if (!scenes.includes(key)) throw new Error(`expected scene ${key}, got "${scenes}"`);
    console.log(`ok  ${key}`);
  };
  // Click using game coordinates (800x600), whatever the canvas is scaled to.
  const clickGame = async (x, y) => {
    const box = await page.locator('canvas').boundingBox();
    const size = await page.evaluate(() => ({ w: window.game.scale.width, h: window.game.scale.height }));
    await page.mouse.click(box.x + (x * box.width) / size.w, box.y + (y * box.height) / size.h);
    await wait(700);
  };
  const waitForScene = async (key, timeoutMs = 20000) => {
    for (let t = 0; t < timeoutMs && !(await activeScenes()).includes(key); t += 500) await wait(500);
  };

  await page.goto(url);
  await page.waitForSelector('#name', { state: 'visible', timeout: 30000 });
  await wait(500);
  await shot('01-name-modal');
  // Typing a name with a space must not trigger the SPACE = Play shortcut behind the modal.
  await page.locator('#name').pressSequentially('Smoke Test', { delay: 30 });
  await wait(300);
  if ((await activeScenes()).includes('Game')) throw new Error('typing a space in the name modal started the game');
  await page.keyboard.press('Enter');
  await wait(800);
  await expectScene('Title');
  await shot('02-title');

  await clickGame(400, 330);
  await expectScene('Options');
  await shot('03-options');
  await clickGame(400, 500);

  await clickGame(400, 410);
  await expectScene('Credits');
  await shot('04-credits');
  await clickGame(110, 50);

  await page.keyboard.press('Space'); // SPACE = Play on the title screen
  await wait(900);
  await expectScene('Game');
  await shot('05a-game-hint');
  // Regression check: recycled platforms must keep a body as wide as the sprite
  // (a scaled TileSprite once left bodies a few px wide and the fox fell through).
  // Keep the fox flying so enough platforms get recycled, then compare.
  await page.evaluate(() => {
    const g = window.game.scene.getScene('Game');
    g.player.body.setAllowGravity(false);
    g.player.setVelocityY(0);
    g.player.y = 60;
  });
  await wait(15000);
  const platforms = await page.evaluate(() => {
    const g = window.game.scene.getScene('Game');
    return {
      recycled: g.addedPlatforms - g.platformGroup.getLength() - g.platformPool.getLength(),
      mismatched: g.platformGroup.getChildren()
        .filter((p) => Math.abs(p.body.width - p.displayWidth) > 1)
        .map((p) => `sprite ${Math.round(p.displayWidth)}px vs body ${Math.round(p.body.width)}px`),
    };
  });
  if (platforms.recycled <= 0) throw new Error('no platform was recycled; run longer');
  if (platforms.mismatched.length) throw new Error(`platform bodies out of sync: ${platforms.mismatched.join(', ')}`);
  console.log(`ok  platform colliders (${platforms.recycled} recycled platforms checked)`);
  await shot('05b-game-recycled');
  await page.evaluate(() => window.game.scene.getScene('Game').player.body.setAllowGravity(true));
  for (let i = 0; i < 4; i += 1) {
    await page.keyboard.press('Space');
    await wait(400);
  }
  await shot('05-game');

  await waitForScene('GameOver');
  await expectScene('GameOver');
  await wait(800);
  await shot('06-game-over');

  await page.keyboard.press('Space'); // SPACE = Play again
  await wait(900);
  await expectScene('Game');
  await waitForScene('GameOver');
  await expectScene('GameOver');
  await wait(800);

  await clickGame(400, 500);
  await clickGame(400, 490);
  await expectScene('HallOfFame');
  await wait(500);
  await shot('07-records');

  await browser.close();
  if (problems.length) {
    console.error(`\n${problems.length} console problem(s):\n${[...new Set(problems)].join('\n')}`);
    process.exit(1);
  }
  console.log(`\nAll scenes OK. Screenshots in ${outDir}`);
})().catch((error) => {
  console.error('SMOKE TEST FAILED:', error.message);
  process.exit(1);
});
