var player,playerImage
var background1,backgroundImg;
var stalker , stalkerImage
var sandShark , sandSharkImage
var PumaFish , PumaFishImage;
var glitter , glitterImage

var gameState
var PLAY = 1
var END = 0
var gameState = PLAY

var monsterGroup

var restart , restartImage;
var GameOver , GameOverImage
var ReaperSound
var BackgroundSound

var score = 0


function preload(){

playerImage = loadImage("images/diver.png")
stalkerImage = loadImage("images/1.png")
sandSharkImage = loadImage("images/2.png")
PumaFishImage = loadImage("images/3.png")
glitterImage = loadImage("images/4.png")
restartImage = loadImage("images/restart.png")
GameOverImage = loadImage("images/GameOver.jpg")
ReaperSound = loadSound("images/Reeper sound.mp3")
backgroundImg = loadImage("images/bg.png")
BackgroundSound = loadSound("images/BackgroundSound.mp3")



}
  

function setup() {
  createCanvas(1500,800);
  player = createSprite(400, 200, 50, 50);  
  player.addImage("diver",playerImage)
  player.scale = 0.7
//   player.debug = true
//  player.setCollider("rectangle",0,0,player.width-100,player.height-100)


  background1 = createSprite(2500,400)
  background1.addImage("background",backgroundImg)  
  background1.scale = 2
  background1.depth = player.depth 
  player.depth = player.depth +1
  background1.velocityX = -5 

  restart = createSprite(1250 ,300 )
  restart.addImage("restartImg",restartImage)
  restart.scale = 0.6;
  restart.visible = false;

  GameOver = createSprite(750,400)
  GameOver.addImage("end",GameOverImage)
  GameOver.scale = 1;
  GameOver.visible = false
  // ReaperSound.play()
  BackgroundSound.loop()
  


 monsterGroup = new Group()
  
}

function draw() {
  background("black");  

  if(gameState ===PLAY){
    // player.velocityX = 4;
    if(background1.x<0) {
      background1.x = 1200  ; 
      }
     
     
      if (keyDown(UP_ARROW)) {
       player.y-= 4
      }
     
      if (keyDown(DOWN_ARROW)) {
       player.y+= 4
      }


      spawnCreatures()

      if (player.isTouching(monsterGroup)) {
        gameState = END
      }


      
       

  }else if(gameState === END){
    player.velocityX = 0;
    restart.visible = true;
    GameOver.visible = true;
    monsterGroup.setVelocityXEach(0)
    monsterGroup.setLifetimeEach(-1)
    
    if(mousePressedOver(restart)) {
      restartGame()
    }
   
    
  }
 
  


  drawSprites();
 score+= Math.round(getFrameRate()/30)
      textSize(30)
      fill("black")
      text("score:"+score,50,50)
}

function spawnCreatures() {
  if(frameCount%200 === 0){
    stalker = createSprite(1500,random(0,450))
    stalker.velocityX = -5
    var rand=Math.round(random(1,4))
    switch(rand){
      case 1: stalker.addImage("monster1",stalkerImage)
        break;
      
      case 2: stalker.addImage("monster2",sandSharkImage)
        break;

      case 3: stalker.addImage("monster3",PumaFishImage)
        break;  

      case 4: stalker.addImage("monster4",glitterImage)
        break;

    }
    monsterGroup.add(stalker)
    monsterGroup.debug = true
  }
}

function restartGame() {
  restart.visible = false;
  GameOver.visible = false;
  gameState = PLAY;
  monsterGroup.destroyEach()
  score = 0
}