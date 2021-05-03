import 'phaser';
import gameOptions from '../Objects/gameOptions';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    this.add.image(400, 300, 'bgPreloader');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0xffffff, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#000000'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#000000'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#000000'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();

    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/ui/blue_button01.png');
    this.load.image('blueButton2', 'assets/ui/blue_button02.png');
    this.load.image('greenButton1', 'assets/ui/green_button01.png');
    this.load.image('greenButton2', 'assets/ui/green_button02.png');
    this.load.image('redButton1', 'assets/ui/red_button01.png');
    this.load.image('redButton2', 'assets/ui/red_button02.png');
    this.load.image('yellowButton1', 'assets/ui/yellow_button01.png');
    this.load.image('yellowButton2', 'assets/ui/yellow_button02.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('bgTitle', 'assets/bg/bgTitle.png');
    this.load.image('bgOptions', 'assets/bg/bgOptions.png');
    this.load.image('bgCredits', 'assets/bg/bgCredits.png');
    this.load.image('bgEmpty', 'assets/bg/empty2.png');
    this.load.image('bgHallOfFame', 'assets/bg/bg2.png');

    this.load.audio('bgMusic', ['assets/audio/music_loop.mp3']);
    this.load.audio('click', ['assets/audio/click1.mp3']);
    this.load.audio('switch', ['assets/audio/switch2.mp3']);

    //this.load.html('nameForm', 'assets/web/nameForm.html');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    let txt = prompt ("Please enter your name", '');
    if (txt === '') {
      this.ready();
    } else {
      gameOptions.playerName = txt;
      this.scene.start('Title');
    }
  }

  create() {
  }
};