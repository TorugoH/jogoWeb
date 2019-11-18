

export default class mapa extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload(){
        this.load.image('mapa', 'jogo/img/MAPA_CAMPUS_2-1024x769.png');
    }

    create(){
        this.add.image(400, 300, 'mapa').setScale(0.2);
        
    }
}