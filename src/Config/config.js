import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  backgroundColor: '#1d1a2f',
  scale: {
    // Scale the 800x600 game up/down to fit the window, keeping the aspect ratio.
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  render: {
    // The art is pixel art: keep pixels blocky when scaled, but smooth their edges.
    smoothPixelArt: true,
  },
  physics: {
    default: 'arcade',
  },
};
