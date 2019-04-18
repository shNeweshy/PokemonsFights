var fire = function () {
  this.active = true;
  this.fireWidth;
  this.fireHeigth;
  this.fireX;
  this.fireY;
  this.fireFrame;
  this.fireCounter;
  this.fireMove = playerCharacter.width; ///////////
  this.fireYpos = playerCharacter.dirY;
  this.fireSprite;
  this.SetFires();


}

fire.prototype.updateFireFrame = function () {


  this.fireCounter = ++this.fireCounter % this.fireFrame;
  this.fireX = this.fireCounter * this.fireWidth;
  this.fireY = 0;
  this.fireMove = this.fireMove + 20; //position of fire in the canvas

  if (this.fireMove >= 600) {
    this.removeFire();
  }

}

fire.prototype.SetFires = function () {
  if (playerCharacter.name == "Charizard") {
    this.fireWidth = 629 / 6;
    this.fireHeigth = 105;
    this.fireX = 0;
    this.fireY = 0;
    this.fireFrame = 6;
    this.fireCounter = 0;
    this.fireSprite = fireSprite;

  } else if (playerCharacter.name == "swoobat") {
    this.fireWidth = 282 / 3;
    this.fireHeigth = 65;
    this.fireX = 0;
    this.fireY = 0;
    this.fireFrame = 3;
    this.fireCounter = 0;
    this.fireSprite = swoobatFireSprite;

  } else {
    this.fireWidth = 405 / 4;
    this.fireHeigth = 62;
    this.fireX = 0;
    this.fireY = 0;
    this.fireFrame = 4;
    this.fireCounter = 0;
    this.fireSprite = skarmoryFireSprite;
  }

}

fire.prototype.draw = function () {

  context.drawImage(this.fireSprite, this.fireX, this.fireY, this.fireWidth, this.fireHeigth, this.fireMove, this.fireYpos, this.fireWidth, this.fireHeigth);
}

fire.prototype.removeFire = function () {
  this.active = false;

}