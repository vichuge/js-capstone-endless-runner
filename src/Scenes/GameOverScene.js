import Phaser from 'phaser';
import Button from '../Objects/Button';
import gameOptions from '../Objects/gameOptions';
import {
  addHint, addTitle, fadeIn, hasKeyboard, onSpace, playSound, textStyle,
} from '../Objects/ui';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bgGameOver');

    addTitle(this, 200, 'Game Over', 48);
    this.add.text(width / 2, 260, `Your score: ${gameOptions.actualScore}`, textStyle(28)).setOrigin(0.5);

    if (gameOptions.isNewRecord) {
      const record = this.add.text(width / 2, 305, 'New record!', textStyle(22, '#ffd34e')).setOrigin(0.5);
      this.tweens.add({
        targets: record, scale: 1.15, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
      });
    }

    new Button(this, width / 2, 400, 'redButton1', 'redButton2', 'Play again', 'PreGame');
    new Button(this, width / 2, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    // SPACE = Play again. The short delay keeps the jump presses made while
    // falling from restarting the game by accident.
    onSpace(this, () => {
      playSound(this, 'click');
      this.scene.start('PreGame');
    }, { delay: 700 });
    addHint(this, 452, hasKeyboard(this) ? 'or press SPACE' : 'Tap it for one more run', {
      size: 14, color: '#ffd34e', backdrop: true,
    });

    fadeIn(this);
  }
}
