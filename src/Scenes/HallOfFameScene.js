import Phaser from 'phaser';
import Button from '../Objects/Button';
import { fetchScores } from '../scores';
import {
  addPanel, addTitle, fadeIn, textStyle,
} from '../Objects/ui';

const MEDALS = ['#ffd34e', '#d9e2ec', '#e8a065'];

export default class HallOfFameScene extends Phaser.Scene {
  constructor() {
    super('HallOfFame');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bgHallOfFame');

    addPanel(this, width / 2, 215, 440, 330);
    addTitle(this, 85, 'Records');
    this.status = this.add.text(width / 2, 230, 'Loading...', textStyle(18)).setOrigin(0.5);

    new Button(this, width / 2, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    fadeIn(this);
    this.showScores();
  }

  async showScores() {
    const scores = await fetchScores(5);
    if (!this.sys.isActive()) return; // The player left before the scores arrived.

    if (scores.length === 0) {
      this.status.setText('No scores yet.\nBe the first!');
      return;
    }

    this.status.destroy();
    const left = this.scale.width / 2 - 190;
    const right = this.scale.width / 2 + 190;
    scores.forEach(({ user, score }, index) => {
      const y = 140 + index * 45;
      const color = MEDALS[index] ?? '#ffffff';
      this.add.text(left, y, `${index + 1}. ${user}`, textStyle(20, color)).setOrigin(0, 0.5);
      this.add.text(right, y, `${score}`, textStyle(20, color)).setOrigin(1, 0.5);
    });
  }
}
