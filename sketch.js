var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var score;
var survivalTime;

var ground;

function preload(){
  
  
  monkey_running =              loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  
  //creating the monkey
  monkey = createSprite(70,367,10,50)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200,395,995,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
background(255);
  stroke("blue");
  noFill(); 
  text("Score: "+ score, 300,30);
  
  stroke("red");
  noFill();
  survivalTime = survivalTime + Math.round(getFrameRate()/67.5)
  text("Survival Time: "+ survivalTime, 300,47);
  
  
 console.log(mouseX);
  //console.log(mouseY);
  
  if(gameState === PLAY)
    {
          if (ground.x < 0)
        {
          ground.x = ground.width/2;
        }

      if(keyDown("space") && monkey.y >= 140 )
        {
          monkey.velocityY = -18;
        }

      monkey.velocityY = monkey.velocityY + 0.8
      
          if(monkey.isTouching(foodGroup))
        {
          foodGroup.destroyEach();
          score = score + 1;
        }
      
      
      if(monkey.isTouching(obstacleGroup))
        {
         gameState = END;
          background(255);
       }
      
      
      
      spawnBanana();
      spawnObstacle();
  
    }else if (gameState === END)
      {            
          monkey.destroy();
          foodGroup.destroyEach();
          obstacleGroup.destroyEach();
          ground.velocityX = 0;
          monkey.velocityX = 0;
          monkey.velocityY = 0;
          textSize(30);
          fill("red");
          text("GAME OVER",100,200);
          
     }
      
  
  
  
  
  monkey.collide(ground);
  
  
  
  drawSprites();
}

function spawnBanana()
{
  if(frameCount%100 === 0)
  {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(263,203))
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 150;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    foodGroup.add(banana);
  }
  
  
}

function spawnObstacle()
{
  if(frameCount%100 === 0)
    {
      var obstacle = createSprite(400,367,40,10)
      obstacle.x = Math.round(random(267,355))
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -(4 + score/100);
      obstacle.scale = 0.2;
      obstacle.lifetime = 300;
      obstacleGroup.add(obstacle);
    }
  
}


