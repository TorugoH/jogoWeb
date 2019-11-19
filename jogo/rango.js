export default class rango extends Phaser.Scene {
    constructor(config) {
        super(config);

        this.jogar;
        this.comidaBoa;
        this.comidaRuim;
        this.jogador;
        this.movimentos;
        this.chao;
        this.receberuim;
        this.recebebom;
        this.sorvete;
        this.sorveteRuim;
        this.refri;
        this.pontuacao = 0;
        this.y = 0;
        this.timeL = 0;
        this.tempo = 0;
        this.chama;
        this.chamada;
        this.bonustime;
        this.textoVoltar;
    }

    init() {
        this.physics.world.gravity.y = 30;
    }

    preload() {
        this.load.image('comidaboa', 'jogo/img/coxinha.png');
        this.load.image('player', 'jogo/img/h.png');
        this.load.image('comidaruim', 'jogo/img/coxinha-estragada.png');
        this.load.image('fundoRango', 'jogo/img/cenario-rango.png');
        this.load.image('plataforma', 'jogo/img/platform.png');
        this.load.image('sorvete', 'jogo/img/sorvete.png');
        this.load.image('sorveteR', 'jogo/img/sorvete-estragado.png');
        this.load.image('refri', 'jogo/img/refrigerante.png');
    }

    create() {
        /*fundo*/
        this.add.image(400, 300, 'fundoRango');
        /*criando jogador*/
        this.jogador = this.physics.add.sprite(100, 800, 'player');
        this.jogador.setBounce(0.2);
        this.jogador.setCollideWorldBounds(true);

        /*Criando animação do personagem*/

        this.anims.create({
            key: 'left',
            //frames:this.anims.generateFrameNumbers('palyer',{start:0,end:0}),
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
        /*Inicialisando o teclado*/

        this.movimentos = this.input.keyboard.createCursorKeys();
        /*criando quadro de pontuação*/

        this.quadroDepontuacao = this.add.text(16, 16, 'Pontuação: 0', {
            fontSize: '32px',
            fill: '#000'
        });

        /*Criando o relogio de tempo e o contador de tempo*/
        this.timeL = 100;
        this.tempo = this.add.text(600, 30, 'TEMPO ' + this.timeL, {
            font: '15px', fill: '#000',
        });
        //ativiando tempo
        this.temporizador = this.time.addEvent({ delay: 1000, callback: this.contadortempo, callbackScope: this, loop: true, paused: false });
        this.chama = this.time.addEvent({ delay: 1000, callback: this.comidaEstragada, callbackScope: this, loop: true })
        this.chamada = this.time.addEvent({ delay: 1000, callback: this.comidaComivel, callbackScope: this, loop: true })
        this.bonustime = this.time.addEvent({ delay: 5000, callback: this.bonus, callbackScope: this, repeat: 100 })
    }

    update() {
        this.parar();
        if (this.timeL == 0) {
            this.scene.pause();
        }
        if (this.movimentos.left.isDown) {
            this.jogador.setVelocityX(-460);
            this.jogador.anims.play('left', true);//adcionando a animação 
        }
        else if (this.movimentos.right.isDown) {
            this.jogador.setVelocityX(460);
            this.jogador.anims.play('right', true);//adcionando a animação
        }
        else {
            this.jogador.setVelocityX(0);
        }
    }

    /*funções*/
    /*coleta pontuação das comida boa*/
    coletarcomidaboa(jogador, comidaBoa) {
        this.pontuacao += 1;
        this.quadroDepontuacao.setText('Pontuação ' + this.pontuacao);
        comidaBoa.destroy();
    }
    /* Coletar pontuação comida ruim*/
    coletarcomidaruim(jogador, comidaRuim) {
        this.pontuacao -= 1;
        this.quadroDepontuacao.setText('Pontuação ' + this.pontuacao);
        comidaRuim.destroy();
    }
    /*faz a contagem do tempo*/
    contadortempo() {
        this.timeL--;
        this.tempo.setText('TEMPO ' + this.timeL);
        return this.timeL;
    }

    bonusExtra(refri) {
        this.timeL += 1;
        this.tempo.setText('TEMPO ' + this.timeL);
        //apaga(refri);

    }
    /*Cria as comida e verifica o contato entre elas e o jogador*/
    comidaEstragada() {
        this.comidaRuim = this.physics.add.group({
            key: 'comidaruim',
            repeat: 0,
            setXY: { x: Math.random() * 700, y: -5, stepX: 70 }
        });
        this.sorveteRuim = this.physics.add.group({
            key: 'sorveteR',
            repeat: 0,
            setXY: { x: Math.random() * 700, y: -5, stepX: 70 }
        });
        this.physics.add.overlap(this.jogador, this.comidaRuim, this.coletarcomidaruim, null, this);
        this.physics.add.overlap(this.jogador, this.sorveteRuim, this.coletarcomidaruim, null, this);
    }
    comidaComivel() {
        this.comidaBoa = this.physics.add.group({
            key: 'comidaboa',
            repeat: 0,
            setXY: { x: Math.random() * 800, y: 3, stepX: 70 }
        });

        this.sorvete = this.physics.add.group({
            key: 'sorvete',
            repeat: 0,
            setXY: { x: Math.random() * 800, y: 4, stepX: 50 }
        });
        this.physics.add.overlap(this.jogador, this.comidaBoa, this.coletarcomidaboa, null, this);
        this.physics.add.overlap(this.jogador, this.sorvete, this.coletarcomidaboa, null, this);
    }
    bonus() {
        this.refri = this.physics.add.group({
            key: 'refri',
            repeat: 0,
            setXY: { x: Math.random() * 700, y: 4, stepX: 50 }
        });
        this.physics.add.overlap(this.jogador, this.refri, this.bonusExtra, null, this);
    }
    /*Para o jogo*/
    parar() {
        if (this.timeL == 0) {
            this.quadroDepontuacao.setText('FIM DE JOGO').setDepth(3);
            localStorage.setItem('ponto', this.pontuacao);
            console.log("gado");
            this.timeL = 0;
            this.tempo.setText("TEMPO ESGOTADO");
            this.temporizador.paused = true;
            this.comidaRuim.destroy();
            this.comidaBoa.destroy();
            this.textoVoltar = this.add.text(400, 250, 'Clique aqui para voltar para o mapa', { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5).setDepth(3);
            this.textoVoltar.setInteractive();
            this.textoVoltar.on('pointerup', () => {
                this.scene.start('mapa');
                this.scene.pause('rango');
            });
        }
    }
}

