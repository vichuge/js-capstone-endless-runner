import 'phaser';
import gameOptions from '../Objects/gameOptions';

export default class Button2 extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key1, key2, text) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
        this.text = this.scene.add.text(0, 0, text, { fontSize: '32px', fill: '#fff' });
        Phaser.Display.Align.In.Center(this.text, this.button);

        this.add(this.button);
        this.add(this.text);

        this.button.on('pointerdown', function () {
            let txt = prompt("Please enter your name", gameOptions.playerName);
            if (txt === '' || txt === null) {
                this.scene.scene.start('Options');
            } else {
                gameOptions.playerName = txt;
                this.scene.scene.start('Title');
            }
        }.bind(this));

        this.button.on('pointerover', function () {
            this.button.setTexture(key2);
        }.bind(this));

        this.button.on('pointerout', function () {
            this.button.setTexture(key1);
        }.bind(this));

        this.scene.add.existing(this);
    }
}