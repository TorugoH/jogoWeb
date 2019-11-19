export default class mapa extends Phaser.Scene {
    constructor(config) {
        super(config);

        this.predio20 = 0;
        this.rango = 0;
        this.num1 = 0;
        this.num2 = 0;
    }

    preload() {
        this.load.image('mapa', 'jogo/img/mapaAtualizado2.png');
        this.load.image('faseAtiva', 'jogo/img/faseConcluida.png');
        this.load.image('num1', 'jogo/img/numero1ComSombra.png');
        this.load.image('num2', 'jogo/img/numero2ComSombra.png');
    }

    create() {
        this.add.image(400, 300, 'mapa').setScale(0.2);

        this.predio20 = this.add.image(500, 480, 'faseAtiva').setScale(0.02);
        this.predio20.setInteractive();
        this.predio20.on('pointerup', () => {
            this.scene.start('p20');
        });

        this.num1 = this.add.image(500, 482, 'num1').setScale(2.5);
        this.num1.setInteractive();
        this.num1.on('pointerup', () => {
            this.scene.start('p20');
        });

        this.rango = this.add.image(500, 250, 'faseAtiva').setScale(0.02);
        this.rango.setInteractive();
        this.rango.on('pointerup', () => {
            this.scene.start('rango');
        });

        this.num2 = this.add.image(500, 252, 'num2').setScale(2.5);
        this.num2.setInteractive();
        this.num2.on('pointerup', () => {
            this.scene.start('rango');
        });
    }
}