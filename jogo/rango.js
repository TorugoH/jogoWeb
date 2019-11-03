let config={
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:30},
            debug:false
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}
let jogar,comidaBoa,comidaRuim,jogador,movimentos,chao,receberuim,recebebom;
var pontuacao=0,y=0,time=0;
let tempo=0;
var Game=new Phaser.Game(config);
//carregar os objetos
function preload(){
    this.load.image('comidaboa','maca.png');
    this.load.image('player','dino.png');
    this.load.image('comidaruim','ruim.png');
    this.load.image('fundo','fundo.jpg');
    this.load.image('plataforma','platform.png');
}

function create(){
            /*fundo*/
            this.add.image(400,300,'fundo');

            /*Chão*/
           chao=this.physics.add.staticGroup();
           chao.create(400,600,'plataforma').setScale(2).refreshBody();

            /*Jogador*/
            jogador=this.physics.add.sprite(100,500,'player');//criando jogador
            jogador.setBounce(0.2);jogador=this.physics.add.sprite(100,500,'player');
            jogador.setCollideWorldBounds(true);

            /*Criando animação do personagem*/
            this.anims.create({
                key:'left',
                frames:[{key:'player',frame:0}],
                frameRate: 10,
                repeat: -1               
            });
            this.anims.create({
                key:'right',
                frames:[{key:'player',frame:0}],
                frameRate: 10,
                repeat: -1
            });
                        /*Inicialisando o teclado*/
            movimentos=this.input.keyboard.createCursorKeys();
            /*criando quadro de pontuação*/
            quadroDepontuacao=this.add.text(16,16,'Pontuação: 0',{
                     fontSize:'32px',
                     fill:'#000'     
                });

         /*Criando o relogio de tempo e o contador de tempo*/
            time=100;
            tempo=this.add.text(600,30,'TEMPO '+time,{
            font:'15px',fill:'#000',
        });
        //ativiando tempo
        temporizador=this.time.addEvent({delay:1000,callback:contadortempo,callbackScope:this,loop:true,paused:false});
        let chama=this.time.addEvent({delay:1000,callback:comidaEstragada,callbackScope:this,repeat:100})
        let chamada=this.time.addEvent({delay:1000,callback:comidaTragavel,callbackScope:this,repeat:100})
      
        /*verifica a colição  do jogador com o chão*/
         this.physics.add.collider(jogador,chao); 
}
function update(){    
        parar(time);
        if(time==0){
            this.scene.pause();
        }
        if(movimentos.left.isDown){
            jogador.setVelocityX(-460);
            jogador.anims.play('left',true);//adcionando a animação 
        }
        else if(movimentos.right.isDown){
            jogador.setVelocityX(460);
            jogador.anims.play('right',true);//adcionando a animação
          }
       else{
         jogador.setVelocityX(0);
        }  
}
//funções que ainda estão meio feias
function coletarcomidaboa(jogador,comidaBoa){
        pontuacao+=1;
        quadroDepontuacao.setText('Pontuação '+pontuacao);
        comidaBoa.destroy();
} 
/* Coletar comida ruim*/
function coletarcomidaruim(jogador,comidaRuim){
        pontuacao-=1;
        quadroDepontuacao.setText('Pontuação '+pontuacao);
        comidaRuim.destroy();    
}
function contadortempo(){
        time--;
        tempo.setText('TEMPO '+time);
        return time;   
}

function comidaEstragada(){
        let posicao= (jogador.y <400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            comidaRuim=this.physics.add.group({
                key :'comidaruim',
                repeat:0,
                setXY:{x:(3*posicao), y:-5, stepX:70}
        });
        comidaRuim.children.iterate(function(child){
            child.setBounceX(Phaser.Math.FloatBetween(0.4,0.8));
        });
        this.physics.add.overlap(jogador,comidaRuim,coletarcomidaruim,null,this);             
}

function comidaTragavel(){
        let bc = (jogador.y <400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        comidaBoa=this.physics.add.group({
             key :'comidaboa',
             repeat:1,
             setXY:{x:(bc*2), y:3, stepX:70}
        });
    comidaBoa.children.iterate(function(child){
        child.setBounceX(Phaser.Math.FloatBetween(1,2));
    });
    this.physics.add.overlap(jogador,comidaBoa,coletarcomidaboa,null,this);
    return comidaBoa;
}

//Para para de contar
function parar(time){
        if(time==0){
        quadroDepontuacao.setText('FIM DE JOGO');
        localStorage.setItem('ponto',pontuacao);
        console.log("gado");
        time=0;
        tempo.setText("TEMPO ESGOTADO");
        temporizador.paused=true;
    }
    
}
