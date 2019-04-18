var lives = function (x, y) {

        this.srcX = 0;
        this.srcY = 0;
        this.width = 255;
        this.height = 255;
        this.dirX = x;
        this.dirY = y;

}
lives.prototype.draw = function () {

        context.drawImage(pokemonEgg, this.srcX, this.srcY, this.width, this.height, this.dirX, this.dirY, 40, 40);


}