import 'phaser';
import Button from '../Objects/Button';
import Button2 from '../Objects/Button2';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
    this.add.image(400, 300, 'bgOptions');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40, fill: '#000' });
    this.musicButton = this.add.image(250, 200, 'checkedBox');
    this.musicText = this.add.text(300, 190, 'Music Enabled', { fontSize: 24, fill: '#000' });

    this.soundButton = this.add.image(250, 250, 'checkedBox');
    this.soundText = this.add.text(300, 240, 'Sound Enabled', { fontSize: 24, fill: '#000' });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    });

    this.updateAudio();

    this.changeButton = new Button2(this, 400, 300, 'redButton1', 'redButton2', 'Edit Name');

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
      this.model.soundOn = false;
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}