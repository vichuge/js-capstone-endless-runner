import 'phaser';

export default class PreGameScene extends Phaser.Scene {
    constructor() {
        super('PreGame');
    }

    preload() {
        this.load.image("platform", "assets/endless/platform.png");

        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("player", "assets/endless/player.png", {
            frameWidth: 24,
            frameHeight: 48
        });

        // the coin is a sprite sheet made by 20x20 pixels
        this.load.spritesheet("coin", "assets/endless/coin.png", {
            frameWidth: 20,
            frameHeight: 20
        });

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "assets/endless/fire.png", {
            frameWidth: 40,
            frameHeight: 70
        });

        // mountains are a sprite sheet made by 512x512 pixels
        this.load.spritesheet("mountain", "assets/endless/mountain.png", {
            frameWidth: 512,
            frameHeight: 512
        });
    }

    create() {

        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        // setting coin animation
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 5
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });

        // setting fire animation
        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.start("Game");
    }
};