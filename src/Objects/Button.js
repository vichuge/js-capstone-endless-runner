import Phaser from 'phaser';
import { playSound, textStyle } from './ui';

// A sprite button with hover/press textures.
// `action` is either a scene key to start, or a function to call on click.
export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, action) {
    super(scene, x, y);

    this.button = scene.add.sprite(0, 0, key1).setInteractive({ useHandCursor: true });
    this.text = scene.add.text(0, -2, text, textStyle(18)).setOrigin(0.5);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      playSound(scene, 'click');
      if (typeof action === 'function') {
        action();
      } else {
        scene.scene.start(action);
      }
    });

    // The hover texture is 4px shorter, so nudge the label down for a "pressed" feel.
    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
      this.text.setY(0);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
      this.text.setY(-2);
    });

    scene.add.existing(this);
  }
}
