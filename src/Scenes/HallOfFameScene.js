import 'phaser';
import Button from '../Objects/Button';
import gameOptions from '../Objects/gameOptions';

export default class HallOfFameScene extends Phaser.Scene {
  constructor() {
    super('HallOfFame');
  }

  preload() {
    // add logo image
    this.add.image(400, 300, 'bgHallOfFame');
    this.add.image(400, 300, 'recordsTable');
  }

  create() {
    const arr = gameOptions.scoreList.result;
    for (let i = 50; i <= 150; i += 50) {
      let max = { "user": "none", "score": 0}
      let id = '';
      arr.forEach( (element, index) => {
        if (element.score > max.score) {
          max = element;
          id = index;
        }
      });
      this.add.text(300, i, `${max.user}: ${max.score}`, { fontSize: 24, fill: '#000' });
      arr.splice(id, 1);
    }

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
};