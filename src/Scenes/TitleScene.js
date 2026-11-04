import Phaser from 'phaser';
import Button from '../Objects/Button';
import {
  addHint, centerX, fadeIn, hasKeyboard, onSpace, playSound,
} from '../Objects/ui';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bgTitle');

    const x = centerX(this);
    const y = height / 2;
    new Button(this, x, y - 50, 'greenButton1', 'greenButton2', 'Play', 'PreGame');
    new Button(this, x, y + 30, 'redButton1', 'redButton2', 'Options', 'Options');
    new Button(this, x, y + 110, 'yellowButton1', 'yellowButton2', 'Credits', 'Credits');
    new Button(this, x, y + 190, 'blueButton1', 'blueButton2', 'Records', 'HallOfFame');

    // SPACE = Play, plus a short "how to play" under the buttons.
    onSpace(this, () => {
      playSound(this, 'click');
      this.scene.start('PreGame');
    });
    if (hasKeyboard(this)) {
      addHint(this, 548, 'Press SPACE to play', { size: 18, color: '#ffd34e' });
      addHint(this, 578, 'Jump: SPACE or click  -  press again in the air to double jump', { size: 12, pulse: false });
    } else {
      addHint(this, 548, 'Tap Play to start', { size: 18, color: '#ffd34e' });
      addHint(this, 578, 'Tap to jump  -  tap again in the air to double jump', { size: 12, pulse: false });
    }

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn && !this.model.bgMusicPlaying) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }

    fadeIn(this);
  }
}
