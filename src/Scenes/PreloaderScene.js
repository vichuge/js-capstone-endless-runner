import 'phaser';
import gameOptions from '../Objects/gameOptions';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {

    this.add.image(400, 300, 'bgPreloader');


    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xffffff, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#000000',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#000000',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#000000',
      },
    });
    assetText.setOrigin(0.5, 0.5);


    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });


    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });


    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);


    this.load.image('blueButton1', 'assets/ui/blue_button01.png');
    this.load.image('blueButton2', 'assets/ui/blue_button02.png');
    this.load.image('greenButton1', 'assets/ui/green_button01.png');
    this.load.image('greenButton2', 'assets/ui/green_button02.png');
    this.load.image('redButton1', 'assets/ui/red_button01.png');
    this.load.image('redButton2', 'assets/ui/red_button02.png');
    this.load.image('yellowButton1', 'assets/ui/yellow_button01.png');
    this.load.image('yellowButton2', 'assets/ui/yellow_button02.png');
    this.load.image('backButton', 'assets/ui/blue_sliderLeft.png');
    this.load.image('recordsTable', 'assets/ui/grey_panel.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('bgTitle', 'assets/bg/bgTitle.png');
    this.load.image('bgOptions', 'assets/bg/bgOptions.png');
    this.load.image('bgCredits', 'assets/bg/bgCredits.png');
    this.load.image('bgEmpty', 'assets/bg/empty2.png');
    this.load.image('bgHallOfFame', 'assets/bg/bg2.png');
    this.load.image('bgPregame', 'assets/bg/bg4.png');

    this.load.audio('bgMusic', ['assets/audio/music_loop.mp3']);
    this.load.audio('click', ['assets/audio/click1.mp3']);
    this.load.audio('switch', ['assets/audio/switch2.mp3']);
    this.load.audio('coin', ['assets/audio/coin01.mp3']);
    this.load.audio('jump', ['assets/audio/jump01.mp3']);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    document.getElementById('modalButton').click();
    const contModal = document.getElementById('modalContinue');
    contModal.addEventListener('click', () => {
      const name = document.getElementById('name').value;

      const errors = document.getElementById('error');
      errors.innerHTML = '';
      if (name === '' || name === null) {
        errors.innerHTML += 'Name can\'t be blank';
      } else {
        gameOptions.playerName = name;
        document.getElementById('modalButton').click();
      }
    });
    this.scene.start('Title');
  }
}