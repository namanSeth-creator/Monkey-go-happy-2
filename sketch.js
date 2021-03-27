var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var monkeyAnimation,monkey;
var bananaImage,banana;
var obstacleImage, obstacleGroup;
var score;
var backImage,backGround;
var invisibleGround;
var ObstaclesGroup;
var FoodGroup;


function preload(){
  backImage = loadImage("jungle.jpg");
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  ObstacleImage = loadImage("stone.png");

}

function setup() {
  createCanvas(400, 400);
  backGround = createSprite(200,180,400,20);
  backGround.addImage("jungle.png",backImage);
  monkey = createSprite(37,50,20,50);
  monkey.addAnimation("monkeyanimation",monkeyAnimation);
  monkey.scale = 0.17;
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  score = 0;
  
 ObstaclesGroup = new Group();
 FoodGroup = new Group();
}
  

function draw() {
  background(220);
  stroke("white");
  textSize(20);
  fill("white");
  
  foodGroup();
  obstaclesGroup();
  
  if (gameState === PLAY){
    backGround.x = backGround.width /2;
    if (FoodGroup.isTouching(monkey)){
      monkey.scale = 0.2;
    score = score + 2;
    FoodGroup.destroyEach();
  }
    switch(score){
        case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
     case 40: monkey.scale = 0.18;
              break;
      default: break;
    }
    
    if (ObstaclesGroup.isTouching(monkey)) {
      monkey.scale = monkey.scale - 0.1;
    FoodGroup.destroyEach();
      gameState = END;
        }
    
  if(keyDown("space")) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8
    if (backGround.x < 0){
      backGround.x = backGround.width/2;
    }
    monkey.collide(invisibleGround);
  }
  else if (gameState === END){
    backGround.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    
  }
  drawSprites();
}
function obstaclesGroup(){
  if(frameCount % 40 === 0) {
    var obstacle = createSprite(600,350,10,40);
    obstacle.velocityX = -3;
    obstacle.addImage(ObstacleImage);
    obstacle.scale = 0.1;
    ObstaclesGroup.add(obstacle);
  }
  
  
}

function foodGroup(){
  if(frameCount % 60 === 0) {
    var food = createSprite(600,350,10,40);
    food.velocityX = -4;
    food.addImage (bananaImage);
    food.scale = 0.1;
    FoodGroup.add(food);
  }
}