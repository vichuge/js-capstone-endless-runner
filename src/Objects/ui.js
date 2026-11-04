// Loaded in BootScene from assets/fonts/kenvector_future.ttf.
export const FONT = 'kenvector, monospace';

export const textStyle = (size, color = '#ffffff', extra = {}) => ({
  fontFamily: FONT,
  fontSize: `${size}px`,
  color,
  stroke: '#2b1d3a',
  strokeThickness: Math.max(2, Math.round(size / 6)),
  align: 'center',
  ...extra,
});

export const fadeIn = (scene) => scene.cameras.main.fadeIn(250, 0, 0, 0);

export const playSound = (scene, key) => {
  if (scene.sys.game.globals.model.soundOn) {
    scene.sound.play(key, { volume: 0.5 });
  }
};

export const centerX = (scene) => scene.scale.width / 2;

export const addTitle = (scene, y, text, size = 40) => scene.add
  .text(centerX(scene), y, text, textStyle(size))
  .setOrigin(0.5);

export const addPanel = (scene, x, y, width, height) => scene.add
  .nineslice(x, y, 'recordsTable', undefined, width, height, 10, 10, 10, 10)
  .setTint(0x2b1d3a)
  .setAlpha(0.75);

// --- Keyboard shortcuts & on-screen control hints -------------------------

// True while the "Pick your name" modal is open or the player is typing in it,
// so a space typed in a name never triggers a game shortcut.
export const isTypingInPage = () => document.body.classList.contains('modal-open')
  || ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);

// Touch devices have no space bar: hints say "Tap" there.
export const hasKeyboard = (scene) => scene.sys.game.device.os.desktop;

// Runs `callback` when SPACE is pressed in this scene. Ignores key repeat (a held
// key), typing in the name modal, and presses during the first `delay` ms.
export const onSpace = (scene, callback, { delay = 0 } = {}) => {
  const enabledAt = scene.time.now + delay;
  scene.input.keyboard.on('keydown-SPACE', (event) => {
    if (event.repeat || isTypingInPage() || scene.time.now < enabledAt) return;
    callback();
  });
};

// A small instruction line, optionally pulsing and on a dark backdrop
// (for busy backgrounds). Returns the text object.
export const addHint = (scene, y, text, {
  size = 14, color = '#ffffff', pulse = true, backdrop = false,
} = {}) => {
  const hint = scene.add.text(centerX(scene), y, text, textStyle(size, color)).setOrigin(0.5);
  if (backdrop) {
    const padX = 14;
    const padY = 6;
    const box = scene.add.graphics();
    box.fillStyle(0x2b1d3a, 0.7);
    box.fillRoundedRect(hint.x - hint.width / 2 - padX, y - hint.height / 2 - padY,
      hint.width + padX * 2, hint.height + padY * 2, 8);
    hint.setDepth(box.depth + 1);
  }
  if (pulse) {
    scene.tweens.add({
      targets: hint, alpha: 0.55, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
    });
  }
  return hint;
};
