let configMapa = {
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

export default class mapa extends Phaser.Scene {
    constructor(configMapa) {
        super(configMapa);
    }

    preload(){

    }

    create(){

    }
}