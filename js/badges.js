var badges = function (x, y,scale,level) {

    this.srcX = 0;
    this.srcY = 0;
    this.width = 750;
    this.height = 750;
    this.dirX =x;
    this.dirY = y;
    this.scale=scale;
    this.image;
    this.level=level;

}

badges.prototype.setInstinct=function(){
this.image=instinctImage;

}

badges.prototype.setMystic=function(){
    this.image=mysticImage;
}

badges.prototype.setValor=function(){
    this.image=valorImage;
}

badges.prototype.update=function(){

    if(this.level==1){
        this.setInstinct();
    }
    else if(this.level==2)
        this.setValor();
        else if(this.level>=3)
            this.setMystic();
}

badges.prototype.draw = function () {
    
    this.update();
    console.log("draw called");
    console.log("set done = "+this.image);
    console.log("x= "+this.dirY+" y= "+this.dirY+" height="+this.height)
    
    context.drawImage(this.image, this.srcX, this.srcY, this.width, this.height, this.dirX, this.dirY, (40*this.scale), (40*this.scale));


}