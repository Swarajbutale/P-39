var path,mainCyclist,gameOver;
var pathImg,mainRacerImg1,mainRacerImg2;
var player1Fall,player2Fall,player3Fall;
var pinkCG,yellowCG,redCG,obstaclesG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  opponent1 = loadAnimation("opponent1.png","opponent2.png");
  opponent2 = loadAnimation("opponent4.png","opponent5.png");
  opponent3 = loadAnimation("opponent7.png","opponent8.png");
  opponent4 = loadAnimation("opponent3.png");
  opponent5 = loadAnimation("opponent6.png");
  opponent6 = loadAnimation("opponent9.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
  gameOverImg = loadImage("gameOver.png");
  
  cycleBell = loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(windowWidth-10,windowHeight-10);
  
// Moving background
path=createSprite(windowWidth/2,windowHeight/2);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("SahilFalling",mainRacerImg2);
mainCyclist.scale=0.07;
  
gameOver = createSprite(windowWidth/4-50,windowHeight/2-10);
  gameOver.addImage(gameOverImg);
  //gameOver.visible=false;
  
  pinkCG = createGroup();
  yellowCG = createGroup();
  redCG = createGroup();
  obstaclesG= createGroup();
  
  mainCyclist.setCollider("circle",0,0,40);
  //mainCyclist.debug=true;
}

function draw() {
  background(0);
  //text("Press UP to reset",250,180);
  camera.position.x = mainCyclist.x;
  camera.position.y = displayHeight/2;
  if(gameState===PLAY){

    
  gameOver.visible=false;
   mainCyclist.y = World.mouseY;
    spawnObstacles();
  
   //edges= createEdgeSprites();
   //mainCyclist.collide(edges);
   //pinkCG.bounceOff(edges);
   //yellowCG.bounceOff(edges);
   //redCG.bounceOff(edges);
    
    distance = distance+Math.round(getFrameRate()/50);
    path.velocityX= -(6+distance/150);
    pinkCG.setVelocityX= -(6+distance/150);
    yellowCG.setVelocityX= -(6+distance/150);
    redCG.setVelocityX= -(6+distance/150);
    obstaclesG.setVelocityX= -(6+distance/150);
    
    var select_oppPlayer = Math.round(random(1,3));
    if(frameCount%150===0) {
      if(select_oppPlayer===1) {
        pinkCyclist();
      } else if(select_oppPlayer===2) {
        yellowCyclist();
      } else {
        redCyclist();
      }
    }
    
    if(keyDown("space")) {
      cycleBell.play();
    }
    
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
    
      for(i=0;i<pinkCG.length;i++) {
        if(pinkCG.get(i).isTouching(mainCyclist) ) {
          pinkCG.get(i).velocityX=0;
          mainCyclist.changeAnimation("SahilFalling",mainRacerImg2);
          pinkCG.get(i).changeAnimation("falling",opponent4);
      gameState=END;
      }
      
    }
    for(i=0;i<yellowCG.length;i++) {
    if(yellowCG.isTouching(mainCyclist) ) {
      yellowCG.get(i).velocityX=0;
      mainCyclist.changeAnimation("SahilFalling",mainRacerImg2);
      yellowCG.get(i).changeAnimation("falling2",opponent5);
      gameState=END;
    }
    }
    
    for(i=0;i<redCG.length;i++) {
    if(redCG.isTouching(mainCyclist) ) {
      redCG.get(i).velocityX=0;
      mainCyclist.changeAnimation("SahilFalling",mainRacerImg2);
      gameState=END;
      redCG.get(i).changeAnimation("falling3",opponent6);
    }
    }
    
    //for(i=0;i<obstaclesG.length;i++) {
    if(obstaclesG.isTouching(mainCyclist)) {
     // obstaclesG.get(i).velocityX=0;
      mainCyclist.changeAnimation("SahilFalling",mainRacerImg2);
      mainCyclist.velocityX=0;
      gameState=END;
      obstaclesG.setLifetimeEach=-1;
   obstaclesG.setVelocityXEach=0;
   obstaclesG.destroyEach();
      pinkCG.destroyEach();
      yellowCG.destroyEach();
      redCG.destroyEach();
    }
    
  
 } else if(gameState===END) {
   path.velocityX=0;
   pinkCG.setLifetimeEach=-1;
   yellowCG.setLifetimeEach=-1;
   redCG.setLifetimeEach=-1;
   pinkCG.setVelocityXEach=0;
   yellowCG.setVelocityXEach=0;
   redCG.setVelocityXEach=0;
   mainCyclist.velocityX=0;
   gameOver.visible=true;
   obstaclesG.setLifetimeEach=-1;
   obstaclesG.setVelocityXEach=0;
   obstaclesG.destroyEach();
   if(keyDown("up")) {
     //text("Press 'UP' key to reset",250,200);
     reset();
     
   }
 }
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,displayWidth/2-200,100);
}


function reset() {
  gameState=PLAY;
  gameOver.visible=false;
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
  distance=0;
  
}

function pinkCyclist() {
  player1 = createSprite(windowWidth-10,Math.round(random(windowHeight-10)),10,10);
  player1.velocityX=-3;
  player1.scale=0.07;
  player1.addAnimation("player1",opponent1);
  player1.addAnimation("falling",opponent4);
  player1.setLifetime=70;
  pinkCG.add(player1);
}

function yellowCyclist() {
  player2 = createSprite(windowWidth-10,Math.round(random(windowHeight-10)),10,10);
  player2.velocityX=-3;
  player2.scale=0.07;
  player2.addAnimation("player2",opponent2);
  player2.addAnimation("falling2",opponent5);
  player2.setLifetime=70;
  yellowCG.add(player2);
}

function redCyclist() {
  player3 = createSprite(windowWidth-10,Math.round(random(windowHeight-10)),10,10);
  player3.velocityX=-3;
  player3.scale=0.07;
  player3.addAnimation("player3",opponent3);
  player3.addAnimation("falling3",opponent6);
  player3.setLifetime=70;
  redCG.add(player3);
}

function spawnObstacles() {
  if(frameCount%150===0) {
  obstacles = createSprite(windowWidth-10,Math.round(random(windowHeight-10)),10,10);
  obstacles.velocityX= -3;
  obstacles.setLifetime=70;
  obstacles.scale=0.1;
  mainCyclist.depth=obstacles.depth-1;
  obstaclesG.add(obstacles);
  var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(obstacle1);
              break;
      case 2: obstacles.addImage(obstacle2);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
      default: break;
    }
}
}