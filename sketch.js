var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score
var ground
var sprite0,sprite0Image;
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
 createCanvas(500,500);
  
  monkey = createSprite(50,420,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(250,470,600,10);
  ground.x = ground.width /2;
  
  
  
   obstaclesGroup = createGroup();
   foodGroup = createGroup();
  
  score = 0;
 
}


function draw() {
background(180);
  text("Score: "+ score, 400,50);
  
   if(gameState === PLAY){
    
       if(monkey.isTouching(foodGroup)){
    score = score + 1; 
     }
     
     if(monkey.isTouching(obstaclesGroup)){
     }
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
     ground.velocitX=-12;
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y>=418) {
        monkey.velocityY = -15;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
  console.log(monkey.y);
  
    //spawn obstacles on the ground
    spawnObstacles();
     
     spawnFood();
    
    if(obstaclesGroup.isTouching(monkey)){
    gameState=END
      
    }
   
  }
   else if (gameState === END){
      ground.velocityX = 0;
      monkey.velocityY = 0
  
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1); 
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }
  
 
    monkey.collide(ground);
  
  
 drawSprites(); 
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
    var obstacle=createSprite(420,440);
   obstacle.velocityX = -6;
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.scale=0.15;
    obstacle.lifetime = 500;
  }
}

function spawnFood() {
  if (frameCount % 100 === 0) {
    banana=createSprite(420,280);
    banana.y = Math.round(random(280,380));
    banana.addImage(bananaImage);
  banana.scale=0.10;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 500;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
    foodGroup.add(banana);
  }
}
