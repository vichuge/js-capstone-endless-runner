import 'phaser';
import Button from '../Objects/Button';
import gameOptions from '../Objects/gameOptions';

export default class HallOfFameScene extends Phaser.Scene {
  constructor() {
    super('HallOfFame');
  }

  preload() {
    this.add.image(400, 300, 'bgHallOfFame');
  }

  create() {
    this.add.text(300, 50, `${gameOptions.firstPlace.user}: ${gameOptions.firstPlace.score}`, { fontSize: 24, fill: '#000' });
    this.add.text(300, 100, `${gameOptions.secondPlace.user}: ${gameOptions.secondPlace.score}`, { fontSize: 24, fill: '#000' });
    this.add.text(300, 150, `${gameOptions.thirdPlace.user}: ${gameOptions.thirdPlace.score}`, { fontSize: 24, fill: '#000' });
    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}