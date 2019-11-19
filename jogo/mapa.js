export default class mapa extends Phaser.Scene {
    constructor(config) {
        super(config);

        this.predio20 = 0;
        this.rango = 0;
    }

    preload() {
        this.load.image('mapa', 'jogo/img/mapaAtualizado2.png');
        this.load.image('faseAtiva', 'jogo/img/faseAtiva.png');
    }

    create() {
        this.add.image(400, 300, 'mapa').setScale(0.2);

        this.predio20 = this.add.image(500, 480, 'faseAtiva').setScale(0.02);
        this.predio20.setInteractive();
        this.predio20.on('pointerup', () => {
            this.scene.start('p20');
        });

        this.rango = this.add.image(500, 250, 'faseAtiva').setScale(0.02);
        this.rango.setInteractive();
        this.rango.on('pointerup', () => {
            this.scene.start('rango');
        });

    }
}