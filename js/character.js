var character = function () {

  this.srcX;
  this.srcY;
  this.width;
  this.height;
  this.frameCount;
  this.currentFrame;
  this.dirX = 50;
  this.dirY = y;
  this.name = "";
  this.spriteSheet;
  this.cropX;
  this.cropY;
  this.selectCharacter;
  this.active = true;
  this.status = false;

}

character.prototype.selectCharacter = function selectCharacter(player) {

  switch (player) {

    case 1:
      playerCharacter.setCharizard();
      break;
    case 2:
      playerCharacter.setSwoobat();
      break;
    case 3:
      playerCharacter.setSkarmory();
      break;
    default:
      break;
  }

}
character.prototype.characterDie = function () {

  this.active = false;

}

character.prototype.setCharizard = function () {
  this.spriteSheet = playerSpriteSheet;
  this.cropX = 464;
  this.cropY = 168;
  this.width = 512 / 4;
  this.height = 65;
  this.frameCount = 4;
  this.currentFrame = 0;
  this.name = "Charizard";
}

character.prototype.setSwoobat = function () {
  this.spriteSheet = swoobatSpriteSheet;
  this.cropX = 318;
  this.cropY = 0;
  this.width = 293 / 3;
  this.height = 80;
  this.frameCount = 3;
  this.currentFrame = 0;
  this.name = "swoobat";

}

character.prototype.setSkarmory = function () {
  this.spriteSheet = skarmorySpriteSheet;
  this.cropX = 147; //147
  this.cropY = 138;
  this.width = 617 / 8; //618
  this.height = 71;
  this.frameCount = 8;
  this.currentFrame = 0;
  this.name = "skarmory";


}

character.prototype.update = function () {

  if (press == true && this.dirY >= 12) {

    this.dirY = this.dirY - 30;
    press = false;
  }
  this.currentFrame = ++this.currentFrame % this.frameCount;
  this.srcX = (this.currentFrame * this.width) + this.cropX;
  this.srcY = this.cropY;
  if (this.dirY >= canvasH - 90) {
    if (eggs.length == 0) {
      this.active = false;
    }
    eggs.splice(eggs.length - 1, 1);
  } else if (this.dirY < 90)
    this.dirY = 90
  else
    this.dirY += gravity;


}
character.prototype.getWidth = function () {
  return this.width;

}
character.prototype.shoot = function () {
  if (delay <= 0) {
    
    allShoot.push(new fire());
    delay = 2;
  }


}

character.prototype.draw = function () {

  this.update();

  context.drawImage(this.spriteSheet, this.srcX, this.srcY, this.width, this.height, this.dirX, this.dirY, this.width, this.height);


}