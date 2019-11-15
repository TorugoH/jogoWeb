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
let jogar,comidaBoa,comidaRuim,jogador,movimentos,chao,receberuim,recebebom,sorvete,sorveteRuim,refri;
var pontuacao=0,y=0,time=0;
let tempo=0;
var Game=new Phaser.Game(config);
//carregar os objetos
function preload(){
        this.load.image('comidaboa','img/coxinha.png');
        this.load.image('player','img/h.png');
        this.load.image('comidaruim','img/coxinha-estragada.png');
        this.load.image('fundo','img/cenario-rango.png');
        this.load.image('plataforma','img/platform.png');
        this.load.image('sorvete','img/sorvete.png');
        this.load.image('sorveteR','img/sorvete-estragado.png');
        this.load.image('refri','img/refrigerante.png');
}
function create(){
            /*fundo*/
            this.add.image(400,300,'fundo');
            /*criando jogador*/
            jogador=this.physics.add.sprite(100,800,'player');
            jogador.setBounce(0.2);
            jogador.setCollideWorldBounds(true);
     
            /*Criando animação do personagem*/
     
            this.anims.create({
                key:'left',
                //frames:this.anims.generateFrameNumbers('palyer',{start:0,end:0}),
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
        let chama=this.time.addEvent({delay:1000,callback:comidaEstragada,callbackScope:this,loop:true})
        let chamada=this.time.addEvent({delay:1000,callback:comidaComivel,callbackScope:this,loop:true})
        let bonustime=this.time.addEvent({delay:5000,callback:bonus,callbackScope:this,repeat:100})
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
    /*funções*/
    /*coleta pontuação das comida boa*/
function coletarcomidaboa(jogador,comidaBoa){
        pontuacao+=1;
        quadroDepontuacao.setText('Pontuação '+pontuacao);
        comidaBoa.destroy();
} 
    /* Coletar pontuação comida ruim*/
function coletarcomidaruim(jogador,comidaRuim){
        pontuacao-=1;
        quadroDepontuacao.setText('Pontuação '+pontuacao);
        comidaRuim.destroy();    
}
    /*faz a contagem do tempo*/
function contadortempo(){
        time--;
        tempo.setText('TEMPO '+time);
        return time;   
}

function bonusExtra(refri){
        time+=1;
        tempo.setText('TEMPO '+time);
//        apaga(refri);
        
}
    /*Cria as comida e verifica o contato entre elas e o jogador*/
function comidaEstragada(){
            comidaRuim=this.physics.add.group({
                key :'comidaruim',
                repeat:0,
                setXY:{x:Math.random()*700, y:-5, stepX:70}
            });
            sorveteRuim=this.physics.add.group({
                key :'sorveteR',
                repeat:0,
                setXY:{x:Math.random()*700, y:-5, stepX:70}
            });
        this.physics.add.overlap(jogador,comidaRuim,coletarcomidaruim,null,this);
        this.physics.add.overlap(jogador,sorveteRuim,coletarcomidaruim,null,this);            
}
function comidaComivel(){
        comidaBoa=this.physics.add.group({
             key :'comidaboa',
             repeat:0,
             setXY:{x:Math.random()*800, y:3, stepX:70}
        });
 
        sorvete=this.physics.add.group({
             key :'sorvete',
             repeat:0,
             setXY:{x:Math.random()*800, y:4, stepX:50}
        });
    this.physics.add.overlap(jogador,comidaBoa,coletarcomidaboa,null,this);
    this.physics.add.overlap(jogador,sorvete,coletarcomidaboa,null,this);
}
function bonus(){
    refri=this.physics.add.group({
        key :'refri',
        repeat:0,
        setXY:{x:Math.random()*700, y:4, stepX:50}
   });
this.physics.add.overlap(jogador,refri,bonusExtra,null,this);
}
    /*Para o jogo*/
function parar(time){
        if(time==0){
        quadroDepontuacao.setText('FIM DE JOGO');
        localStorage.setItem('ponto',pontuacao);
        console.log("gado");
        time=0;
        tempo.setText("TEMPO ESGOTADO");
        temporizador.paused=true;
        comidaRuim.destroy();
        comidaBoa.destroy();
    }
}
