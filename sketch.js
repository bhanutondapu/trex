
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var score = 5;
var ground,invisibleGround;
END = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(80,230,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
   
  
  ground = createSprite(80,260,1200,20);
  ground.velocity.X = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(300,260,600,10);
  invisibleGround.visible = false;
  
  // create obstacle and bananaGroup
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
background(600);
  
  stroke("white");
  textSize(20);
  fill("white");
  text ("score: " + score,500,50);
        
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/60);
  text("survival Time: " + survivalTime,100,50);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //jump the space pressed
  if (keyDown("space") && monkey.y >=100) {
    monkey.velocityY = -14;
    
  }
    
  
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  // adding collide soo monkey don't fall down
  monkey.collide(ground);
  
  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach(-1);
  }
  
  if (obstacleGroup.isTouching(monkey)) {
    gameState = END;
    
    ground.velocityX = 0;
    monkey.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
  }
  
  //obstacleGroup call in the draw function
  spawnobstacle();
  banana();
  
drawSprites();
  
}

 function spawnobstacle() {
   if (frameCount % 300 == 0) {
     var obstacle = createSprite(600,220,10,10);
     obstacle.addImage("moving",obstacleImage);
     obstacle.velocityX = -5;
     
     obstacle.scale = 0.2;
     obstacle.lifetime = 300;
     
     monkey.depth = obstacle.depth
     monkey.depth = monkey.depth + 1;
     
     obstacleGroup.add(obstacle);
   }
 }

function banana() { 
  if (frameCount % 160 == 0) {
    var banana = createSprite(220,550,10,10);
    banana.y = Math.round(random(100,150));
    banana.addImage("appears", bananaImage);
    banana.velocityX = -2;
    
    banana.lifetime = 550;
    banana.scale = 0.1;
    
    monkey.depth = banana.depth
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
}
