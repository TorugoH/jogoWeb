let config={
    type:Phaser.AUTO,
    width:800,
    height:700,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:false
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update,
    }
}
let jogador,movimentos,mesa,ponto,maca,inimigo,quadroDepontuacao,pontuacao=0;
var Game=new Phaser.Game(config);
function preload(){
    this.load.image('player','/img/hasanand.png');
    this.load.image('fundo','/img/fundop20.png');
    this.load.image('mesa','/img/mesaa.png');
    this.load.image('maca','/img/caderno2.png');
    this.load.image('inimigo','/img/freira.png');
    this.load.image('cuidado','/img/caution.png')
}
function create(){
    this.add.image(400,300,'fundo');
    mesa=this.physics.add.staticGroup();
    placa=this.physics.add.staticGroup();
    maca=this.physics.add.staticGroup();
    mesa.create(100,100,'mesa');
    placa.create(175,450,'cuidado');
    mesa.create(100,200,'mesa');
    placa.create(330,200,'cuidado');
    mesa.create(100,300,'mesa');
    mesa.create(100,400,'mesa');
    mesa.create(100,500,'mesa');
    //segunda fileira de bloquinhos
    mesa.create(250,100,'mesa');
    mesa.create(250,200,'mesa');
    mesa.create(250,300,'mesa');
    mesa.create(250,400,'mesa');
    mesa.create(250,500,'mesa');
    placa.create(395,250,'cuidado');
    //terceira fileira
    mesa.create(400,100,'mesa');
    mesa.create(400,200,'mesa');
    mesa.create(400,300,'mesa');
    mesa.create(400,400,'mesa');
    mesa.create(400,500,'mesa');
    //quarta fileira
    mesa.create(550,100,'mesa');
    mesa.create(550,200,'mesa');
    mesa.create(550,300,'mesa');
    mesa.create(550,400,'mesa');
    mesa.create(550,500,'mesa');
    //quinta fileira
    mesa.create(700,100,'mesa');
    mesa.create(700,200,'mesa');
    mesa.create(700,300,'mesa');
    mesa.create(700,400,'mesa');
    placa.create(700,150,'cuidado');
    mesa.create(700,500,'mesa');
    maca.create(765,565,'maca');
    //maca.create(750,560,'maca');
    jogador=this.physics.add.sprite(500,500,'player');
    jogador.setCollideWorldBounds(true);
    inimigo=this.physics.add.sprite(100,455,'inimigo');
    inimigo.enableBody = true;
    inimigo.setCollideWorldBounds(true);
    
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
    this.anims.create({
        key:'up',
        frames:[{key:'player',frame:0}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key:'down',
        frames:[{key:'player',frame:0}],
        frameRate: 10,
        repeat: -1
    });
    //inimigo
    this.anims.create({
        key:'left',
        frames:[{key:'inimigo',frame:0}],
        frameRate: 10,
        repeat: -1               
    });
    this.anims.create({
        key:'right',
        frames:[{key:'inimigo',frame:0}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key:'up',
        frames:[{key:'inimigo',frame:0}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key:'down',
        frames:[{key:'inimigo',frame:0}],
        frameRate: 10,
        repeat: -1
    });
    quadroDepontuacao=this.add.text(16,650,'Pontuação: 0',{
        fontSize:'32px',
        fill:'#000'     
   });
    movimentos=this.input.keyboard.createCursorKeys();
    this.physics.add.collider(jogador,mesa);
    this.physics.add.collider(placa,inimigo);
    this.physics.add.collider(placa,jogador);
    this.physics.add.overlap(maca,jogador,contadorDeponto,null,this);
    this.physics.add.overlap(inimigo,jogador,perde,null,this);
    this.physics.add.collider(mesa,inimigo);
    }
    function update(){
        if(movimentos.left.isDown){
            jogador.setVelocityX(-260);
            jogador.anims.play('left',true); 
         }
      else if(movimentos.right.isDown){
        jogador.setVelocityX(260);
        jogador.anims.play('right',true);
        }
         else{
           jogador.setVelocityX(0);
          }  
     if(movimentos.up.isDown){
            jogador.setVelocityY(-260);
      }
      else if(movimentos.down.isDown){
        jogador.setVelocityY(260);
      }
      else{
        jogador.setVelocityY(0);
      }
      
      if(inimigo.x>jogador.x){
          inimigo.x--;
      }
      else if(inimigo.x<jogador.x){
          inimigo.x+=1
      }
      else if(inimigo.x==jogador.x){
        inimigo.setVelocityX(0);
      }
    if(inimigo.y<jogador.y){
          inimigo.y++;
      }
      else if(inimigo.y>jogador.y){
          inimigo.y--;
      }
}
function contadorDeponto(maca,jogador){
    pontuacao+=1;
        quadroDepontuacao.setText('Pontuação '+pontuacao); 
}
function perde(){
    console.log('te achei');
    inimigo.y=Math.random()*700;
    jogador.x=Math.random()*800;
    let cont=0;
    cont++;
    if(cont==3){
        quadroDepontuacao.setText("TEMPO ESGOTADO");

    }
}