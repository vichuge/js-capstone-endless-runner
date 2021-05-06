import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import gameOptions from '../Objects/gameOptions';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.add.image(400, 300, 'bgTitle');
  }

  create() {
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 50, 'greenButton1', 'greenButton2', 'Play', 'PreGame');

    this.optionsButton = new Button(this, config.width / 2, config.height / 2 + 50, 'redButton1', 'redButton2', 'Options', 'Options');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 150, 'yellowButton1', 'yellowButton2', 'Credits', 'Credits');

    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 250, 'blueButton1', 'blueButton2', 'Records', 'HallOfFame');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.getScores();
  }

  getScores = async () => {
    try {
      const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/FCThSszjJRKvlp5DfYXN/scores');
      gameOptions.scoreList = await response.json();

      const arr = gameOptions.scoreList.result;
      for (let i = 50; i <= 150; i += 50) {
        let max = { user: 'none', score: 0 };
        let id = '';
        arr.forEach((element, index) => {
          if (element.score > max.score) {
            max = element;
            id = index;
          }
        });
        switch (i) {
          case 50:
            gameOptions.firstPlace = max;
            break;
          case 100:
            gameOptions.secondPlace = max;
            break;
          case 150:
            gameOptions.thirdPlace = max;
            break;
          default:
            gameOptions.firstPlace = 'Error!';
            break;
        }
        arr.splice(id, 1);
      }
    } catch (error) {
      gameOptions.scoreList = 'Error!';
    }
  }
}