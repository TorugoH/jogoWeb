export default class p20 extends Phaser.Scene {
    constructor(config) {
        super(config);

        this.textoVoltar = 0;
        this.cont = 3;
        this.a = 0;
        this.j = 0;
        this.jogador = 0;
        this.cora = 0;
        this.movimentos = 0;
        this.mesa = 0;
        this.caderno = 0;
        this.ponto = 0;
        this.maca = 0;
        this.inimigo = 0;
        this.quadroDepontuacao = 0;
        this.lapis = 0;
        this.pontuacao = 0;
        this.coracao1 = 0;
        this.coracao2 = 0;
        this.coracao3 = 0;
        this.coracoes = 0;
    }

    init() {
        this.physics.world.gravity.y = 0;
    }

    preload() {
        this.load.image('player', './jogo/img/hasanand.png');
        this.load.image('fundop20', './jogo/img/fundop20.png');
        this.load.image('mesa', './jogo/img/mesaa.png');
        this.load.image('maca', './jogo/img/caderno2.png');
        this.load.image('inimigo', './jogo/img/freira.png');
        this.load.image('cuidado', './jogo/img/caution.png')
        this.load.image('cora', './jogo/img/vida2.png');
        this.load.image('caderno', './jogo/img/caderno.png');
        this.load.image('lapis', './jogo/img/lapis.png');
    }

    create() {
        this.add.image(400, 300, 'fundop20');
        this.mesa = this.physics.add.staticGroup();
        this.placa = this.physics.add.staticGroup();
        this.maca = this.physics.add.staticGroup();
        this.caderno = this.physics.add.staticGroup();
        this.lapis = this.physics.add.staticGroup();
        this.coracoes = this.physics.add.staticGroup();
        this.coracao1 = this.coracoes.create(50, 575, 'cora');
        this.coracao2 = this.coracoes.create(100, 575, 'cora');
        this.coracao3 = this.coracoes.create(150, 575, 'cora');
        this.mesa.create(100, 100, 'mesa');
        this.mesa.create(100, 210, 'mesa');
        this.mesa.create(100, 310, 'mesa');
        this.mesa.create(100, 410, 'mesa');
        this.mesa.create(100, 510, 'mesa');
        this.placa.create(175, 450, 'cuidado');
        this.placa.create(330, 200, 'cuidado');
        //segunda fileira de bloquinhos
        this.mesa.create(255, 115, 'mesa');
        this.mesa.create(255, 215, 'mesa');
        this.mesa.create(255, 315, 'mesa');
        this.mesa.create(255, 415, 'mesa');
        this.mesa.create(255, 515, 'mesa');
        this.placa.create(395, 250, 'cuidado');
        this.placa.create(260, 250, 'cuidado');
        this.placa.create(400, 350, 'cuidado');
        //terceira fileira
        this.mesa.create(405, 110, 'mesa');
        this.mesa.create(405, 210, 'mesa');
        this.mesa.create(405, 310, 'mesa');
        this.mesa.create(405, 410, 'mesa');
        this.mesa.create(405, 510, 'mesa');
        //quarta fileira
        this.mesa.create(555, 100, 'mesa');
        this.mesa.create(555, 210, 'mesa');
        this.mesa.create(555, 310, 'mesa');
        this.mesa.create(555, 410, 'mesa');
        this.mesa.create(555, 510, 'mesa');
        //quinta fileira
        this.mesa.create(705, 100, 'mesa');
        this.mesa.create(705, 210, 'mesa');
        this.mesa.create(705, 310, 'mesa');
        this.mesa.create(705, 410, 'mesa');
        this.mesa.create(705, 510, 'mesa');
        this.placa.create(705, 460, 'cuidado');
        this.placa.create(700, 150, 'cuidado');
        this.placa.create(760, 250, 'cuidado');
        this.maca.create((Math.random() * 600) / 2, Math.random() * 600, 'maca');
        this.caderno.create(320, 250, 'caderno');
        this.lapis.create(760, 200, 'lapis');
        //maca.create(750,560,'maca');
        this.jogador = this.physics.add.sprite(500, 500, 'player');
        this.jogador.setCollideWorldBounds(true);
        this.inimigo = this.physics.add.sprite(100, 455, 'inimigo');
        this.inimigo.enableBody = true;
        this.inimigo.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        //inimigo
        this.anims.create({
            key: 'left',
            frames: [{ key: 'inimigo', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: [{ key: 'inimigo', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: [{ key: 'inimigo', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: [{ key: 'inimigo', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
        //quadroDepontuacao=this.add.text(16,650,'Pontuação: 0',{
        //  fontSize:'32px',
        //fill:'#000'     
        //});
        this.movimentos = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.jogador, this.mesa);
        this.physics.add.collider(this.placa, this.inimigo);
        this.physics.add.collider(this.placa, this.jogador);
        this.physics.add.collider(this.mesa, this.inimigo);
        this.physics.add.collider(this.maca, this.jogador, this.contadorDeponto);
        this.physics.add.collider(this.caderno, this.jogador, this.coletor);
        this.physics.add.overlap(this.inimigo, this.jogador, this.perde, null, this);
        this.physics.add.overlap(this.lapis, this.jogador, this.lapizeira, null, this);
    }

    update() {
        if (this.movimentos.left.isDown) {
            this.jogador.setVelocityX(-160);
            this.jogador.anims.play('left', true);
        } else if (this.movimentos.right.isDown) {
            this.jogador.setVelocityX(160);
            this.jogador.anims.play('right', true);
        } else {
            this.jogador.setVelocityX(0);
        }

        if (this.movimentos.up.isDown) {
            this.jogador.setVelocityY(-260);
        } else if (this.movimentos.down.isDown) {
            this.jogador.setVelocityY(260);
        } else {
            this.jogador.setVelocityY(0);
        }

        if (this.inimigo.x > this.jogador.x) {
            this.inimigo.x--;
        } else if (this.inimigo.x < this.jogador.x) {
            this.inimigo.x += 1
        } else if (this.inimigo.x == this.jogador.x) {
            this.inimigo.setVelocityX(0);
        }

        if (this.inimigo.y < this.jogador.y) {
            this.inimigo.y++;
        } else if (this.inimigo.y > this.jogador.y) {
            this.inimigo.y--;
        }
    }

    contadorDeponto(maca, jogador) {
        this.pontuacao++;
        jogador.disableBody(true, true);

        if (this.pontuacao == 3) {
            this.inimigo.destroy();
            this.add.text(400, 250, 'VOCÊ VENCEU!', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar = this.add.text(400, 450, 'Clique aqui para voltar para o mapa', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar.setInteractive();
            this.textoVoltar.on('pointerup', () => {
                this.scene.start('mapa');
            });
        }
    }

    coletor(caderno, jogador) {
        this.pontuacao++;
        jogador.disableBody(true, true);

        if (this.pontuacao == 3) {
            this.inimigo.destroy();
            this.add.text(400, 250, 'VOCÊ VENCEU!', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar = this.add.text(400, 450, 'Clique aqui para voltar para o mapa', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar.setInteractive();
            this.textoVoltar.on('pointerup', () => {
                this.scene.start('mapa');
            });
        }
    }

    lapizeira(lapis, jogador) {
        this.pontuacao++;
        jogador.disableBody(true, true);

        if (this.pontuacao == 3) {
            this.inimigo.destroy();
            this.add.text(400, 250, 'VOCÊ VENCEU!', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar = this.add.text(400, 450, 'Clique aqui para voltar para o mapa', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar.setInteractive();
            this.textoVoltar.on('pointerup', () => {
                this.scene.start('mapa');
            });
        }
    }

    perde(coracao) {
        this.cont--;
        if (this.cont == 2) {
            //quadroDepontuacao.setText("TEMPO ESGOTADO");
            this.coracao3.destroy();

        }
        else if (this.cont == 1) {
            //quadroDepontuacao.setText("TEMPO ESGOTADO");
            this.coracao2.destroy();
        }
        if (this.cont == 0) {
            //quadroDepontuacao.setText("TEMPO ESGOTADO");
            this.add.text(400, 250, 'VOCÊ PERDEU!', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar = this.add.text(400, 450, 'Clique aqui para voltar para o mapa', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar.setInteractive();
            this.textoVoltar.on('pointerup', () => {
                this.scene.start('mapa', 'aaaa');
            })

            this.coracao1.destroy();
            this.inimigo.destroy();
            this.physics.pause();
        }
        this.inimigo.y = Math.random() * 700;
        this.jogador.x = Math.random() * 800;
    }

    /* ganha() {
        if (this.pontuacao == 3) {
            this.inimigo.destroy();
            this.add.text(400, 250, 'VOCÊ VENCEU!', { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar = this.add.text(400, 450, 'Clique aqui para voltar para o mapa', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5);
            this.textoVoltar.setInteractive();
            this.textoVoltar.on('pointerup', () => {
                this.scene.start('mapa');
            });
        }
    } */
}