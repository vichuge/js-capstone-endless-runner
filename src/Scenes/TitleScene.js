import 'phaser';
import config from '../Config/config.js';
import Button from '../Objects/Button';
import gameOptions from '../Objects/gameOptions';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    // add logo image
    this.add.image(400, 300, 'bgTitle');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 50, 'greenButton1', 'greenButton2', 'Play', 'PreGame');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 + 50, 'redButton1', 'redButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width / 2, config.height / 2 + 150, 'yellowButton1', 'yellowButton2', 'Credits', 'Credits');

    // Hall of fame
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
      const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/rwBZGLRfKWrVM5dKf5QZ/scores');
      gameOptions.scoreList = await response.json();
    } catch (error) {
      gameOptions.scoreList = 'Error!';
    }
  }

};