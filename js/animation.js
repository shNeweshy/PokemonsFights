var animation = function () {

  this.startGame
}


var x = 0;
var y = 0;
var press = false;
var bonusCounter = 0;
var bonusCondition=10;


var gravity = 7;
var delay = 0;
var speed = 0;
var hp = 100;

var char;
var level;

var canvas = document.getElementById("canvas"); ///
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete


var context = canvas.getContext("2d");

canvasW = canvas.width;
canvasH = canvas.height;

var background = document.getElementById("bg");
var playerSpriteSheet = document.getElementById("sprites");
var swoobatSpriteSheet = document.getElementById("swoobat");
var skarmorySpriteSheet = document.getElementById("Skarmory");
var fireSprite = document.getElementById("fire");
var aggronSprite = document.getElementById("aggron");
var pokemonEgg = document.getElementById("pokemonEgg");
var swoobatFireSprite = document.getElementById("swoobatFire");
var skarmoryFireSprite = document.getElementById("skarmoryFire");
var instinctImage=document.getElementById("instinct");
var mysticImage=document.getElementById("mystic");
var valorImage=document.getElementById("valor");


var spaceKey = false;
var enterKey = false;
var allShoot = [];
var eggs = [];
var enemies = [];
var badgesArray=[];


var backgroundScroll = new backgroundAnimate(0, 0, canvasW, canvasH);
var backgroundScroll2 = new backgroundAnimate(canvasW, 0, canvasW, canvasH);
var playerCharacter = new character();


var eggX = 50;
var eggY = 30;

var badgeX=canvasW-300;
var badgeY=50;


animation.prototype.startGame = function (character, level) {
  startGame(character, level);
}


function startGame(char, level) {
  document.body.style.backgroundImage = "";
  this.char = char;
  this.level = level;
  eggs = [];
  allShoot=[];
  eggX = 50;
  hp = 100;
  enterKey = false;
  setSpeed();
  playerCharacter.selectCharacter(char);
  bonusCondition=bonusCondition * level;

  mainInterval = setInterval(drawImage, 100 - speed);
}

function setSpeed() {
  switch (level) {

    case 1:
      speed = 0;
      break;
    case 2:
      speed = 20;
      break;
    case 3:
      speed = 25;
      break;
    default:
      break;
  }
}



function isCollidingWithPlayer(player, enemy) {
  var x_axis = Math.abs(player.dirX - enemy.dirX) <= Math.max(player.width, enemy.width);
  var y_axis = Math.abs(player.dirY - enemy.dirY) <= Math.max(player.height, enemy.height);



  return x_axis && y_axis;
}

function isCollidingWithFire(fire, enemy) {
  var x_axis = Math.abs(fire.fireMove - enemy.dirX) <= Math.max(fire.fireWidth, enemy.width - 50);
  var y_axis = Math.abs(fire.fireYpos - enemy.dirY) <= Math.max(fire.fireHeigth, enemy.height - 50);

  return x_axis && y_axis;
}

function drawHP() {
  context.fillStyle = "#FF0000";
  context.fillRect(canvasW - 240, 10, hp * 2, 20);
  context.font = "12pt Calibri";
  context.fillStyle = "white";
  context.fillText("HP " + hp, canvasW - 293, 25);
}

function drawImage(key) {


  context.clearRect(0, 0, canvasW, canvasH);
  backgroundScroll.draw();
  backgroundScroll2.draw();
  playerCharacter.draw();
  drawHP();



  if (spaceKey == true) {
    playerCharacter.shoot();
    spaceKey = false;
  }


  if (bonusCounter > bonusCondition) {    
    bonusCounter = 0;
    eggs.push(new lives(eggX, eggY))
    eggX += 50;
  }
  if (hp < 0 && eggs.length == 0) {
    playerCharacter.characterDie();
  } else if (hp < 0) {
    eggs.splice(eggs.length - 1, 1);
    eggX -= 50;
    hp = 100;
  }
  eggs.forEach(function (lives) {
    lives.draw();
  })

  allShoot.forEach(function (fired) {
    fired.updateFireFrame();
  })

  allShoot.forEach(function (fired) {

    if (enemies.length > 0)
      enemies.forEach(function (enemy) {
        if (isCollidingWithFire(fired, enemy)) {
          fired.active = false;
          enemy.active = false;
          bonusCounter += 1;

        } else {

          fired.draw()
        }

      });
    else {
      fired.draw()

    }

  })
  

  
  setRandomEnemy();
  drawingEnemies();
  badgesArray.forEach(function(badge)      ////////////////////////////////
  {
    badge.draw();
  })

  console.log(badgesArray);
  


  allShoot = allShoot.filter(function (fired) {
    return fired.active;
  })



  if (delay > 0) {
    delay--;
  }
  if (eggs.length == 3) {
    playerWin();
  }


  if (!playerCharacter.active) {
    gameOver();
  }

}

function drawingEnemies(){
  enemies.forEach(function (enemy) {
    enemy.update();
  })
  enemies = enemies.filter(function (enemy) {
    return enemy.active;
  })
  enemies.forEach(function (enemy) {

    if (isCollidingWithPlayer(playerCharacter, enemy)) {
      enemy.active = false;
      hp = hp - Math.floor(Math.random() * 25 + 1)

    } else {
      enemy.draw()
    }


  })
}

function setRandomEnemy() {
  var no = Math.random();
  if (no < 0.1) {

    var x = canvas.width;
    
   var y = Math.floor(Math.random() * canvas.height - 100);
    if (y <= 90) {
      y = 90;
    }
    var speed = Math.random() * 10 + 2;
    var negative = Math.random();
    if (negative < 0.5) {
      speed = -speed;
    }
    var e = new enemy(x, y);
    e.setAggron();
    enemies.push(e);

  }

}


window.addEventListener("keypress", checkKey);





function gameOver() {
  clearInterval(mainInterval);
  context.clearRect(0, 0, canvasW, canvasH);
  backgroundScroll.draw();
  backgroundScroll2.draw();
  context.font = "50pt Calibri";
  context.fillStyle = "white";
  context.fillText("Game Over", (canvasW / 2) - 140, canvasH / 2);
  context.fillText("Press Enter to Try Again", (canvasW / 2) - 320, (canvasH / 2) + 60);

}

function playerWin() {
  clearInterval(mainInterval);
  playerCharacter.status = true;
  context.clearRect(0, 0, canvasW, canvasH);
  backgroundScroll.draw();
  backgroundScroll2.draw();
  drawLargeBadges();
  drawSmallBadges();
  if(badgesArray.length>3){
    drawCongrats();
  }
  else{
  context.font = "50pt Calibri";
  context.fillStyle = "white";
  context.fillText("Winner", (canvasW / 2) - 80, 60);
  context.fillText("Press Enter to next level", (canvasW / 2) - 310, (canvasH-90) );
  if (enterKey) {
    playAgain();
  }
}
}

function drawCongrats(){
  context.font = "50pt Calibri";
  context.fillStyle = "white";
  context.fillText("congratulation! you won the three badges", (canvasW / 2) - 575, 70);
  context.fillText("Press Enter to play again", (canvasW / 2) - 325, (canvasH-90) );
}

function drawSmallBadges() {
  console.log("dirx   = "+badgeX+" diry = "+badgeY);
  
  badgesArray.push(new badges(badgeX,badgeY,1,level))
  badgeX+=50;
  
}

function drawLargeBadges(){
  newbadges=new badges(((canvasW/2)-180),((canvasH/2)-220),10,level);
  newbadges.draw();
}

function playAgain() {
  if (enterKey == true && (playerCharacter.active == false) || playerCharacter.status) {
    
    
    
      char ++;
      if(char==4)
        char=1;

    level++;
    if(level>3){
      level=3;
    }
    startGame(char, level);
  }
}
var mainInterval;



window.addEventListener("keypress", checkKey);

function checkKey(key) {
  if (key.which == '119' || key.keyCode == "119") {
    press = true;

  }
  if (key.which == '32') {
    spaceKey = true;

  }
  if (key.which == '13') {


    enterKey = true;

    if (!playerCharacter.active||badgesArray.length>3)
      window.location.reload();
    else if (playerCharacter.status) {
      playAgain();
    }

  }

}

//}