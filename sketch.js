var bg,bgImg;
var ship, shooterImg;
var rock, rockImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var rockGroup;
var score = 0;
var life = 3;
var lazer = 70;
var heart1, heart2, heart3
var gameState = "fight"


function preload(){
  heart1Img = loadImage("assets/heart1.png")
  heart2Img = loadImage("assets/heart2.png")
  heart3Img = loadImage("assets/heart3.png")

  shooterImg = loadImage("assets/spaceship.png")

  rockImg = loadImage("assets/meteor.png")

  bgImg = loadImage("assets/space.jpeg")

  lazerImg = loadImage("assets/lazer.png")

}

function setup() {
  createCanvas(windowWidth,windowHeight);



ship = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 ship.addImage(shooterImg)
   ship.scale = .7
   ship.debug = true
   ship.setCollider("rectangle",0,0,280,150)


   heart1 = createSprite(displayWidth-50,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.3

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.3

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.3
   

    lazerGroup = new Group()
    rockGroup = new Group()

}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = true
    heart2.visible = true
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = true
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  if(life===0){
    gameState = "lost"
    
  }

  if(score==50){
    gameState = "won"
  }

if(keyDown("up")){
  ship.y = ship.y-30
}
if(keyDown("down")){
 ship.y = ship.y+30
}

if(score==50){
  gameState = "won"
}

if(keyWentDown("space")){
  lazer = createSprite(displayWidth-1150,ship.y-30,30,10)
  fill(red);
  lazer.velocityX = 20
  
  lazerGroup.add(lazer)
  ship.depth = lazer.depth
  ship.depth = ship.depth+2
  lazer = lazer-1
}

else if(keyWentUp("space")){
  ship.addImage(shooterImg)
}

if(lazer==0){
  gameState = "bullet"    
}

if(rockGroup.isTouching(lazerGroup)){
  for(var i=0;i<rockGroup.length;i++){     
      
   if(rockGroup[i].isTouching(lazerGroup)){
        rockGroup[i].destroy()
        lazerGroup.destroyEach()
 
        score = score+2
        } 
  
  }
}



 for(var i=0;i<rockGroup.length;i++){     
      
  if(rockGroup[i].isTouching(ship)){
       rockGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}

meteor();
state()

drawSprites();

}




/*
textSize(20)
  fill("white")
text("Lazers = " + lazers,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)
*/



function meteor(){
  if(frameCount%50===0){

    rock = createSprite(random(500,1100),random(100,500),40,80)

    rock.addImage(rockImg)
    //rock.scale = 0.15
    rock.velocityX = -3
    rock.debug= true
    rock.setCollider("rectangle",0,0,200,100)
   
    rock.lifetime = 400
   rockGroup.add(rock)
  }

}


function state(){
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  rockGroup.destroyEach();
  ship.destroy();
  heart1.visible = false

}

else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won! ",400,400)
  rockGroup.destroyEach();
  ship.destroy();

}

else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of lazers",470,410)
  rockGroup.destroyEach();
  ship.destroy();
  lazer.destroyEach();

}

}