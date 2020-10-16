var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var fruitGoup,obstaclesGroup ;
var score = 0 ;
var play = 0 ;
var end = 0 ;
var gameState = 0 ;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  bananaGImage = loadImage("bananaG.png");
  appleImage = loadImage("apple.png");
  mangoImage = loadImage("mango.png");
  strawberryImage = loadImage("strawberry.png");
  bombi = loadImage("bomb.png");
  obstacleImage = loadImage("obstacle.png");
  back_image = loadImage("back.png");
  backSound = loadSound("backm.mp3");
  restartI = loadImage("but.png");
  gameoverI = loadImage("over.png");
}

function setup() {
  
  createCanvas(1000,580);
  backSound.play();
  background = createSprite(300,300,10,10);
  background.addImage(back_image);
  ground = createSprite(500,540,1000,20);
  ground.visible = false ;
  monkey = createSprite(100,470,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2 ;
  over = createSprite(500,300,10,10);
  over.addImage(gameoverI);
  over.scale = 1.7 ;
  over.visible = false ;
  rect = createSprite(520,520,100,100);
  rect.shapeColor = "black"
  rect.visible = false ;
  rect1 = createSprite(500,80,420,100);
  rect1.shapeColor = "white"
  rect1.visible = false ;
  restart = createSprite(520,520,10,10);
  restart.addImage(restartI);
  restart.scale = 0.3 ;
  restart.visible = false ;
  obstacleGroup =new Group();
  bananaGroup=new Group();
  appleGroup=new Group();
  strawberryGroup=new Group();
  mangoGroup=new Group();
  bombGroup=new Group();
  
}

function draw() {
  
  gameState = play ; 
  
  if(gameState === play){
  
   background.velocityX = -10 ;
  
   if(background.x < 400){
      background.x = background.width/2;
   }
  
   if(keyDown("space")&& monkey.y >=350) {
     monkey.velocityY = -13;
  }
   monkey.velocityY = monkey.velocityY + 0.8 ;
   monkey.collide(ground);
   spawnFood();
   spawnObstacles();
    
   drawSprites(); 
  
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach(0);
     score = score + 1 ;
  } 
  
   if(appleGroup.isTouching(monkey)){
     appleGroup.destroyEach(0);
     score = score + 1 ;
    } 
  
   if(strawberryGroup.isTouching(monkey)){
    strawberryGroup.destroyEach(0);
    score = score + 1 ;
  } 
  
   if(mangoGroup.isTouching(monkey)){
     mangoGroup.destroyEach(0);
     score = score + 1 ;
   } 
    
   if(obstacleGroup.isTouching(monkey)){
     ending();
   }   
    
   if(bombGroup.isTouching(monkey)){
    ending();
   } 
    
   if(mousePressedOver(restart)){
       reset();
   } }
  
  if(gameState===end){
    
  }

   stroke("red");
   textSize(70)
   fill("black");
   text("SCORE : "+score,300,100);
 
 }  

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(300,400);    
    banana.velocityX = -10;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale=0.2;
    bananaGroup.add(banana);
  }
  if (frameCount % 315 === 0){
   apple = createSprite(900,350,10,40);
   apple.velocityX = -10;
   apple.y = random(300,400);
   apple.addImage(appleImage);
   apple.scale = 0.2 ;
   monkey.depth = apple.depth + 1;
   appleGroup.add(apple);
 }
  if (frameCount % 193 === 0){
   var strawberry = createSprite(900,350,10,40);
   strawberry.velocityX = -10;
   strawberry.y = random(300,400);
   strawberry.addImage(strawberryImage);
   strawberry.scale = 0.3 ;
   monkey.depth = strawberry.depth + 1;
   strawberryGroup.add(strawberry);
 }
  if (frameCount % 151 === 0){
   var mango = createSprite(900,350,10,40);
   mango.velocityX = -10;
   mango.y = random(300,400);
   mango.addImage(mangoImage);
   mango.scale = 0.3 ;
   monkey.depth = mango.depth + 1;
   mangoGroup.add(mango);
 }
  if (frameCount % 196 === 0){
   var bomb = createSprite(900,350,10,40);
   bomb.velocityX = -10;
   bomb.y = 300;
   bomb.addImage(bombi);
   bomb.scale = 0.2 ;
   monkey.depth = bomb.depth + 1;
   bombGroup.add(bomb);
 } 
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,490,10,40);
    obstacle.velocityX = -10;
    obstacle.addImage(obstacleImage);
    obstacle.scale= 0.3 ;   
    obstacle.lifetime = 300;
    obstacle.setCollider("rectangle",0,0,300,200);
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = play ;
  backSound.play();
  over.visible = false ;
  rect.visible = false ;
  rect1.visible = false ;
  restart.visible = false ;
  monkey.visible = true ;
  bananaGroup.destroyEach(0);
  appleGroup.destroyEach(0);
  mangoGroup.destroyEach(0);
  bombGroup.destroyEach(0);
  obstacleGroup.destroyEach(0);
  strawberryGroup.destroyEach(0);
  score = 0 ; 
}

function ending(){
  backSound.stop();
     background.velocityX = 0;
     monkey.velocityY = 0;
     monkey.visible = false ;
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.visible = false ;
     bananaGroup.setVelocityXEach(0);
     bananaGroup.visible = false ;
     appleGroup.setVelocityXEach(0);
     appleGroup.visible = false ;
     mangoGroup.setVelocityXEach(0);
     mangoGroup.visible = false ;
     strawberryGroup.setVelocityXEach(0);
     strawberryGroup.visible = false ;
     bombGroup.setVelocityXEach(0);
     bombGroup.visible = false ;
     obstacleGroup.setLifetimeEach(800);
     appleGroup.setLifetimeEach(-800);
     mangoGroup.setLifetimeEach(800);
     bananaGroup.setLifetimeEach(800);
     bombGroup.setLifetimeEach(800);
     strawberryGroup.setLifetimeEach(800);
     over.visible = true ;
     rect.visible = true ;
     rect1.visible = true ;
     restart.visible = true ;
}