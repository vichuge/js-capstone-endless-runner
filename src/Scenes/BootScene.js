import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bgPreloader', 'assets/bg/backPreloader.png');
    // Loaded here so the Preloader texts can already use it.
    this.load.font('kenvector', 'assets/fonts/kenvector_future.ttf', 'truetype');
  }

  create() {
    this.scene.start('Preloader');
  }
}
