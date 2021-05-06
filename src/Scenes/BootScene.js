import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('bgPreloader', 'assets/bg/backPreloader.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}