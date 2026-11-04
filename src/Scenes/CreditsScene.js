import Phaser from 'phaser';
import Button from '../Objects/Button';
import { fadeIn, textStyle } from '../Objects/ui';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bgCredits');

    const creditsText = this.add.text(width / 2, height / 2, 'Credits', textStyle(56)).setOrigin(0.5);
    const madeByText = this.add.text(width / 2, height + 100, 'Created By:\nVictor Pacheco', textStyle(40, '#ffffff', { lineSpacing: 12 }))
      .setOrigin(0.5);

    this.tweens.add({
      targets: creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
    });

    this.tweens.add({
      targets: madeByText,
      y: -150,
      ease: 'Power1',
      duration: 8000,
      delay: 700,
      onComplete: () => this.scene.start('Title'),
    });

    new Button(this, 110, 50, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    fadeIn(this);
  }
}
