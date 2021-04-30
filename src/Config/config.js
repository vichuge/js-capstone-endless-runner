import 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    // physics settings
    physics: {
        default: "arcade"
    }
};
