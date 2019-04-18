var backgroundAnimate = function (x, y, w, h) {

    this.width = w;
    this.height = h;
    this.dirX = x;
    this.dirY = y;


}

backgroundAnimate.prototype.update = function () {
    this.dirX -= 20;

    // If it gets out from the screen, make it jump to the starting position so it seamlessly keeps scrolling endlessly
    if (this.dirX <= -(canvasW - 2)) {
        this.dirX = canvasW - 2;
    }

}

backgroundAnimate.prototype.draw = function () {

    this.update();

    context.drawImage(background, 0, 0, background.width, background.height, this.dirX, this.dirY, background.width, this.height);


}