import p20 from "./p20.js";

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '0x000000',
    pixelArt: true,
    parent: 'containerJogo',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);
game.scene.add('p20', p20);

let fundo, botaoJogar;

function preload() {
    this.load.image("fundo", "jogo/img/campus-2-pixilart.png");
    this.load.image("titulo", "imgs/campinf.png");
    this.load.image("jogar", "jogo/img/pixil-frame-0 (5).png");
}

function create() {
    fundo = this.add.image(400, 700, "fundo").setScale(4).setOrigin(0.5, 1);
    fundo.smoothed = false;
    this.add.image(400, 80, "titulo").setScale(0.15);
    botaoJogar = this.add.image(400, 650, "jogar").setScale(0.15).setOrigin(0.5);

    botaoJogar.setInteractive();
    botaoJogar.on('pointerup', () => {
        this.scene.start('p20');
    });

}

function update() { }