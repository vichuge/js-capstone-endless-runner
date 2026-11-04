import Phaser from 'phaser';
import Button from '../Objects/Button';
import { openNameModal } from '../nameModal';
import {
  addPanel, addTitle, fadeIn, textStyle,
} from '../Objects/ui';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bgOptions');
    this.model = this.sys.game.globals.model;

    addPanel(this, width / 2, 215, 380, 230);
    addTitle(this, 140, 'Options');

    this.musicButton = this.addToggle(200, 'Music', () => {
      this.model.musicOn = !this.model.musicOn;
    });
    this.soundButton = this.addToggle(260, 'Sound', () => {
      this.model.soundOn = !this.model.soundOn;
    });
    this.updateAudio();

    new Button(this, width / 2, 400, 'redButton1', 'redButton2', 'Edit Name', openNameModal);
    new Button(this, width / 2, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    fadeIn(this);
  }

  // A checkbox + label; both are clickable.
  addToggle(y, label, toggle) {
    const box = this.add.image(290, y, 'checkedBox').setInteractive({ useHandCursor: true });
    const text = this.add.text(330, y, `${label} Enabled`, textStyle(20)).setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true });
    [box, text].forEach((target) => target.on('pointerdown', () => {
      toggle();
      this.updateAudio();
    }));
    return box;
  }

  updateAudio() {
    const { bgMusic } = this.sys.game.globals;

    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      bgMusic?.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false && bgMusic) {
        bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    this.soundButton.setTexture(this.model.soundOn ? 'checkedBox' : 'box');
  }
}
