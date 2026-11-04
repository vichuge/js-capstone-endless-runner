import Phaser from 'phaser';

// Registers the gameplay animations (once) and hands over to the Game scene.
// The textures themselves are loaded by PreloaderScene.
export default class PreGameScene extends Phaser.Scene {
  constructor() {
    super('PreGame');
  }

  create() {
    const animations = [
      {
        key: 'run', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }), frameRate: 8, repeat: -1,
      },
      {
        key: 'poison', frames: [{ key: 'player', frame: 7 }], frameRate: 8, repeat: -1,
      },
      {
        key: 'rotate', frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 4 }), frameRate: 15, yoyo: true, repeat: -1,
      },
      {
        key: 'burn', frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 3 }), frameRate: 8, repeat: -1,
      },
    ];

    animations.forEach((animation) => {
      if (!this.anims.exists(animation.key)) this.anims.create(animation);
    });

    this.scene.start('Game');
  }
}
