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
            gravity: { y: 30 },
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
let fundo;

function preload() {
    this.load.image("fundo", "jogo/img/campus-2-pixilart.png");
    this.load.image("titulo", "imgs/campinf.png");
    this.load.image("jogar", "jogo/img/pixil-frame-0 (5).png");
}

function create() {
    fundo = this.add.image(400, 700, "fundo").setScale(4).setOrigin(0.5, 1);
    fundo.smoothed = false;
    this.add.image(400, 80, "titulo").setScale(0.15);
    this.add.image(0, 0, "jogar").setScale(0.15).setOrigin(0);
}

function update() { }