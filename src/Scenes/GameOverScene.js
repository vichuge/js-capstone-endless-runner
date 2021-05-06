import 'phaser';
import Button from '../Objects/Button';
import gameOptions from '../Objects/gameOptions';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.add.image(400, 300, 'bgGameOver');
  }

  create() {
    this.text = this.add.text(250, 200, 'Game Over', { fontSize: 40, fill: '#fff' });
    this.text = this.add.text(250, 250, `Your score:${gameOptions.actualScore}`, { fontSize: 40, fill: '#fff' });
    this.againButton = new Button(this, 400, 400, 'redButton1', 'redButton2', 'Play again', 'PreGame');
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}