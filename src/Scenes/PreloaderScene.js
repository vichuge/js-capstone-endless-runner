import Phaser from 'phaser';
import { openNameModal } from '../nameModal';
import { textStyle } from '../Objects/ui';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bgPreloader');

    const barWidth = 320;
    const barX = (width - barWidth) / 2;
    const barY = height / 2 - 25;

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x2b1d3a, 0.8);
    progressBox.fillRoundedRect(barX, barY, barWidth, 50, 10);

    const progressBar = this.add.graphics();

    const loadingText = this.add.text(width / 2, barY - 30, 'Loading...', textStyle(20)).setOrigin(0.5);
    const percentText = this.add.text(width / 2, barY + 25, '0%', textStyle(16)).setOrigin(0.5);
    const assetText = this.add.text(width / 2, barY + 80, '', textStyle(12)).setOrigin(0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${Math.round(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffc93c, 1);
      progressBar.fillRoundedRect(barX + 10, barY + 10, (barWidth - 20) * value, 30, 6);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // Only move on once every asset is really loaded. (A previous 3s timer could
    // start the Title scene with missing textures, the "stuck at 91%" bug.)
    this.load.once('complete', () => {
      [progressBar, progressBox, loadingText, percentText, assetText].forEach((o) => o.destroy());
    });

    this.load.image('blueButton1', 'assets/ui/blue_button01.png');
    this.load.image('blueButton2', 'assets/ui/blue_button02.png');
    this.load.image('greenButton1', 'assets/ui/green_button01.png');
    this.load.image('greenButton2', 'assets/ui/green_button02.png');
    this.load.image('redButton1', 'assets/ui/red_button01.png');
    this.load.image('redButton2', 'assets/ui/red_button02.png');
    this.load.image('yellowButton1', 'assets/ui/yellow_button01.png');
    this.load.image('yellowButton2', 'assets/ui/yellow_button02.png');
    this.load.image('recordsTable', 'assets/ui/grey_panel.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('bgTitle', 'assets/bg/bgTitle.png');
    this.load.image('bgOptions', 'assets/bg/bgOptions.png');
    this.load.image('bgCredits', 'assets/bg/bgCredits.png');
    this.load.image('bgHallOfFame', 'assets/bg/bg2.png');
    this.load.image('bgGameOver', 'assets/bg/bg3.png');

    // Gameplay assets (previously loaded on every "Play" in PreGameScene).
    this.load.image('platform', 'assets/objects/platform2.png');
    this.load.spritesheet('player', 'assets/objects/player-all50.png', { frameWidth: 50, frameHeight: 48 });
    this.load.spritesheet('coin', 'assets/objects/gem20.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('fire', 'assets/objects/frog60.png', { frameWidth: 60, frameHeight: 70 });
    this.load.spritesheet('mountain', 'assets/objects/mountain5.png', { frameWidth: 512, frameHeight: 512 });

    this.load.audio('bgMusic', ['assets/audio/music_loop.mp3']);
    this.load.audio('click', ['assets/audio/click1.mp3']);
    this.load.audio('coin', ['assets/audio/coin01.mp3']);
    this.load.audio('jump', ['assets/audio/jump01.mp3']);
  }

  create() {
    // create() runs only after the loader has finished.
    openNameModal();
    this.scene.start('Title');
  }
}
