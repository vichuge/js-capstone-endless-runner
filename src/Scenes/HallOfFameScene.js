import 'phaser';
import Button from '../Objects/Button';

export default class HallOfFameScene extends Phaser.Scene {
  constructor() {
    super('HallOfFame');
  }

  preload() {
    // add logo image
    this.add.image(400, 300, 'bgHallOfFame');
  }

  create() {

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
};