var PLAY = 1;
var END = 0;
var gameState = PLAY;

var yoshi,yoshi1,yoshi2,yoshi3,yoshi_running,yoshi_collided,running;
var marioBros,mario,marioBrosImage;

var invisibleGround,ground;
var cloud,cloudGroup,cloudImage,clouds;

var obstacle,obstaclesGroup,obstacle1,obstacle2,obsta3le3,obstacle4;
var start,startImg,gameOver,gameOverImg;
var checkPointSound,jumpSound, dieSound;

var score; 
var estrella_move, estrella, estrella1, estrella2;

var moneda,moneda1,moneda2;

var CoinCollection = 0;
var StarCollection = 0;

function preload(){
    yoshi_running = loadAnimation("yoshi1.png","yoshi2.png");
    yoshi_collided = loadImage("yoshi3.png");
      
    marioBrosImage = loadImage ("marioBros.png");
    cloudImage = loadImage("cloud.png");

    obstacle1 = loadImage ("obstacle1.png")
    obstacle2 = loadImage ("obstacle2.png")
    obstacle3= loadImage ("obstacle3.png")
    obstacle4 = loadImage ("obstacle4.png")

    estrella_move = loadAnimation ("estrella1.png");
    
    moneda = loadAnimation("moneda1.png","moneda2.png")
    
    gameOverImg = loadImage ("gameOver.png");
    startImg = loadImage ("start.png");

    checkPointSound = loadSound("checkPoint.mp3")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")

}

function setup() {
 createCanvas (windowWidth, windowHeight);

  // background(marioBrosImage);
   marioBros = createSprite();
   marioBros.addImage("marioBros",marioBrosImage); 
   //marioBros.x = marioBros.width /2;
   
   marioBros.velocityX = -8;
   

 
  yoshi = createSprite(100,300,30,80);
  
  yoshi.addAnimation("running", yoshi_running);
  yoshi.scale = 0.2;
  //yoshi.X = 50;
 

  gameOver = createSprite(700,180,20,80);
  gameOver.addImage(gameOverImg);

  start = createSprite(700,290,20,80);
  start.addImage(startImg);

  gameOver.scale = 0.2;
  start.scale = 0.1;

  gameOver.visible = false;
  start.visible = false;

  invisibleGround = createSprite(200,450,700,100);
  invisibleGround.visible = false;


 //obstacle1 = createSprite(200,350,20,90);
 cloudsGroup = new Group();
 obstaclesGroup = new Group();


 score = 0;
}

function draw() {
  
  textSize(18);
  text("Score: "+ score, 1300,60);
 
  yoshi.collide(invisibleGround);
 

if (gameState===PLAY){
   gameOver.visible = false;
   start.visible = false;

    score = score + Math.round(getFrameRate()/60);
    marioBros.velocityX = -(6 + 3*score/100);

    //marioBros.velocityX = -8;

    if (score > 0 && score%100 ===0){
      checkPointSound.play();
    }
    

    if(keyDown("space")&& yoshi.y >=100){
      yoshi.velocityY = -13;
      jumpSound.play();
      }

    yoshi.velocityY = yoshi.velocityY + 0.4;
    

    if(marioBros.x < 0){
     marioBros.x = marioBros.width/2;
   }

   //else if (diamondsG.isTouching(boy)) {
    //diamondsG.destroyEach();
    //treasureCollection=treasureCollection + 100;

    spawnClouds();
    spawnObstacles();
   
   if(obstaclesGroup.isTouching(yoshi)){
    dieSound.play();
     gameState = END;
 } 
}

else if (gameState === END) {
  gameOver.visible = true;
  start.visible = true;

  yoshi.velocityY = 0;
  marioBros.velocityX = 0;

  //yoshi.changeAnimation("collided",trex_collided);

  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
 
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
    
  
    if(mousePressedOver(start)) {
      reset();
    }


}

 drawSprites();
}

function spawnObstacles() {

    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,350,10,80);
      
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generar obstáculos aleatorios
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
               break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;
        case 4: obstacle.addImage(obstacle4);
                break;
                default: break;
      }

        obstacle.scale = 0.09;
        obstacle.lifetime = 300;
        //agregar cada obstáculo al grupo
        obstaclesGroup.add(obstacle);
      }
    }
           
   function spawnClouds() {
    //escribir código aquí para aparecer nubes.
     if (frameCount % 60 === 0) {
          var cloud = createSprite(600,120,40,10);
          cloud.y = Math.round(random(10,60));
          cloud.addImage(cloudImage);
          cloud.scale = 0.3;
          cloud.velocityX = -6;
              
          //asignar tiempo de vida a la variable
          cloud.lifetime = 1340;
              
          //ajustar la profundidad.
          cloud.depth = yoshi.depth;
          yoshi.depth = yoshi.depth + 1;
              
          //agregar cada nube a un grupo.
          cloudsGroup.add(cloud);
      }
            
    }

   function reset(){
   gameState = PLAY;
   gameOver.visible = false;
   start.visible = false;
  
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();

   yoshi.changeAnimation("running",yoshi_running);

   score = 0;
  
}



