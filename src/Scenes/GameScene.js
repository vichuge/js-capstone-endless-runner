import 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        const logo = this.add.image(400, 300, 'phaserLogo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
};