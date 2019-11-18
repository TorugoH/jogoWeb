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
let cont=0,j=0;
let jogador,cora,movimentos,mesa,caderno,ponto,maca,inimigo,quadroDepontuacao,lapis,pontuacao=0;
var Game=new Phaser.Game(config);
let coracao=0,coracao2=0,coracao3=0;
function preload(){
    this.load.image('player','/img/hasanand.png');
    this.load.image('fundo','/img/fundop20.png');
    this.load.image('mesa','/img/mesaa.png');
    this.load.image('maca','/img/caderno2.png');
    this.load.image('inimigo','/img/freira.png');
    this.load.image('cuidado','/img/caution.png')
    this.load.image('cora','/img/vida2.png');
    this.load.image('caderno','/img/caderno.png');
    this.load.image('lapis','/img/lapis.png');
}
function create(){
    this.add.image(400,300,'fundo');
    mesa=this.physics.add.staticGroup();
    placa=this.physics.add.staticGroup();
    maca=this.physics.add.staticGroup();
    caderno=this.physics.add.staticGroup();
    lapis=this.physics.add.staticGroup();
    coracao=this.physics.add.staticGroup();
    coracao2=this.physics.add.staticGroup();
    coracao3=this.physics.add.staticGroup();
    mesa.create(100,100,'mesa');
    mesa.create(100,210,'mesa');
    mesa.create(100,310,'mesa');
    mesa.create(100,410,'mesa');
    mesa.create(100,510,'mesa');
    placa.create(175,450,'cuidado');
    placa.create(330,200,'cuidado');
    //segunda fileira de bloquinhos
    mesa.create(255,115,'mesa');
    mesa.create(255,215,'mesa');
    mesa.create(255,315,'mesa');
    mesa.create(255,415,'mesa');
    mesa.create(255,515,'mesa');
    placa.create(395,250,'cuidado');
    placa.create(260,250,'cuidado');
    placa.create(400,350,'cuidado');
    //terceira fileira
    mesa.create(405,110,'mesa');
    mesa.create(405,210,'mesa');
    mesa.create(405,310,'mesa');
    mesa.create(405,410,'mesa');
    mesa.create(405,510,'mesa');
    //quarta fileira
    mesa.create(555,100,'mesa');
    mesa.create(555,210,'mesa');
    mesa.create(555,310,'mesa');
    mesa.create(555,410,'mesa');
    mesa.create(555,510,'mesa');
    //quinta fileira
    mesa.create(705,100,'mesa');
    mesa.create(705,210,'mesa');
    mesa.create(705,310,'mesa');
    mesa.create(705,410,'mesa');
    mesa.create(705,510,'mesa');
    placa.create(705,460,'cuidado');
    placa.create(700,150,'cuidado');
    placa.create(760,250,'cuidado');
    maca.create((Math.random()*600)/2,Math.random()*600,'maca');
    caderno.create(320,250,'caderno');
    lapis.create(760,200,'lapis');
    //maca.create(750,560,'maca');
    jogador=this.physics.add.sprite(500,500,'player');
    jogador.setCollideWorldBounds(true);
    inimigo=this.physics.add.sprite(100,455,'inimigo');
    inimigo.enableBody = true;
    inimigo.setCollideWorldBounds(true);
    //coracao=[cora,cora,cora];

    coracao.create(50,650,'cora');
    coracao2.create(100,650,'cora');
    coracao3.create(150,650,'cora');
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
    //quadroDepontuacao=this.add.text(16,650,'Pontuação: 0',{
      //  fontSize:'32px',
        //fill:'#000'     
   //});
    movimentos=this.input.keyboard.createCursorKeys();
    this.physics.add.collider(jogador,mesa);
    this.physics.add.collider(placa,inimigo);
    this.physics.add.collider(placa,jogador);
    this.physics.add.collider(mesa,inimigo);
    this.physics.add.collider(maca,jogador,contadorDeponto);
    this.physics.add.collider(caderno,jogador,coletor);
    this.physics.add.overlap(inimigo,jogador,perde,null,this);
    this.physics.add.overlap(lapis,jogador,lapizeira,null,this);
    if(cont==1){
        //quadroDepontuacao.setText("TEMPO ESGOTADO");
        coracao.destroy();

    }
   else if(cont==2){
        //quadroDepontuacao.setText("TEMPO ESGOTADO");
        coracao2.destroy();
    }
    if(cont==3){
        //quadroDepontuacao.setText("TEMPO ESGOTADO");
        coracao3.destroy();

    }
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
    jogador.disableBody(true, true);
}
function coletor(caderno,jogador){
    pontuacao+=1;
    jogador.disableBody(true, true);
}

function lapizeira(lapis,jogador){
    pontuacao+=1;
    jogador.disableBody(true, true);
}
function perde(coracao){
    console.log('te achei');
    inimigo.y=Math.random()*700;
    jogador.x=Math.random()*800;
    cont++;
    //coracao.disableBody(true, true);
}