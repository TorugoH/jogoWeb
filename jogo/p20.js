let config={
    type:Phaser.AUTO,
    width:800,
    height:600,
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
let jogador,movimentos,tijo,ponto,maca,inimigo;
var Game=new Phaser.Game(config);
function preload(){
    this.load.image('player','dino.png');
    this.load.image('fundo','fundo.jpg');
    this.load.image('bloco','bloco.png');
    this.load.image('maca','maca.png');
    this.load.image('inimigo','ruim.png')
}
function create(){
    this.add.image(400,300,'fundo');
    tijo=this.physics.add.staticGroup();
    maca=this.physics.add.staticGroup();
    //inimigo=this.physics.add.staticGroup();
    //primeira fileira de bloquinhos
    maca.create(50,50,'maca');
    tijo.create(100,100,'bloco');
    tijo.create(100,200,'bloco');
    tijo.create(100,300,'bloco');
    tijo.create(100,400,'bloco');
    tijo.create(100,500,'bloco');
    //segunda fileira de bloquinhos
    tijo.create(250,100,'bloco');
    tijo.create(250,200,'bloco');
    tijo.create(250,300,'bloco');
    tijo.create(250,400,'bloco');
    tijo.create(250,500,'bloco');
    //terceira fileira
    tijo.create(400,100,'bloco');
    tijo.create(400,200,'bloco');
    tijo.create(400,300,'bloco');
    tijo.create(400,400,'bloco');
    tijo.create(400,500,'bloco');
    //quarta fileira
    tijo.create(550,100,'bloco');
    tijo.create(550,200,'bloco');
    tijo.create(550,300,'bloco');
    tijo.create(550,400,'bloco');
    tijo.create(550,500,'bloco');
    //quinta fileira
    tijo.create(700,100,'bloco');
    tijo.create(700,200,'bloco');
    tijo.create(700,300,'bloco');
    tijo.create(700,400,'bloco');
    tijo.create(700,500,'bloco');
    //maca.create(750,560,'maca');
    jogador=this.physics.add.sprite(500,500,'player');
    jogador.setCollideWorldBounds(true);
    inimigo=this.physics.add.sprite(600,455,'inimigo');
    inimigo.enableBody = true;
    inimigo.setCollideWorldBounds(true);
    //inimigo.create(600,700,'inimigo');
    //inimigo.setCollideWorldBounds(true);
    
    this.physics.add.collider(jogador,tijo);
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
    movimentos=this.input.keyboard.createCursorKeys();
    

    this.physics.add.collider(maca,jogador,contadorDeponto);
    //this.physics.add.collider(jogador,inimigo,aproximaInimigo);
    this.physics.add.collider(tijo,inimigo,aproximaInimigo);
      //  inimigo.setVelocityX(0);
      //inimigo.body.velocity.x=0;
      //console.log('encotrei');
      
      //aproximaInimigo(inimigo,jogador);
    }
    
    
    function update(){
        if(movimentos.left.isDown){
            jogador.setVelocityX(-260);
            jogador.anims.play('left',true);
            inimigo.setVelocityX(-260);
         //   inimigo.anims.play('left',true);//adcionando a animação 
         }
      else if(movimentos.right.isDown){
        jogador.setVelocityX(260);
        jogador.anims.play('right',true);
        inimigo.setVelocityX(260);
        //inimigo.anims.play('right',true);//adcionando a animação
        }
         else{
           jogador.setVelocityX(0);
           inimigo.setVelocityX(0);
          }  
     if(movimentos.up.isDown){
            jogador.setVelocityY(-260);
            inimigo.setVelocityY(-260);
      }
      else if(movimentos.down.isDown){
        jogador.setVelocityY(260);
        inimigo.setVelocityY(260);
      }
      else{
          jogador.setVelocityY(0);
          inimigo.setVelocityY(0);
      }
      if(inimigo.body.position.x<jogador.body.position.y){
          inimigo.setVelocityX(20);
      }
    
}
function contadorDeponto(maca,jogador){
    let i=0; 
    i++;
    console.log('i');
    maca.destroy()
    //destroi();

}
function aproximaInimigo(inimigo,tijo){
    if (inimigo.body.blocked.left){
        inimigo.body.velocity.x += 10;
    }
    // Se o inimigo encostou em algo na direita, manda-o para esquerda
    if (inimigo.body.blocked.right){
        inimigo.body.velocity.x -= 10;
    
        }
}
