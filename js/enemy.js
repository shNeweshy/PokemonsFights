var enemy=function(x,y){
    this.srcX;
    this.srcY;
    this.width;
    this.height;
    this.frameCount;
    this.currentFrame;
    this.dirX=x;
    this.dirY=y;
    //this.charSprite=new Image();
    this.name="";
    this.active = true;
    //this.speed=1;
    this.setAggron();

}

enemy.prototype.setAggron=function(){
    this.width=610 / 4;
    this.height=70;
    this.frameCount=4;
    this.currentFrame=0;
    this.name="Aggron";
    this.upp=false;
    this.down=true;
    }



    enemy.prototype.update=function(){
        
          this.currentFrame = ++this.currentFrame % this.frameCount;
          this.srcX=(this.currentFrame * this.width) + 159;  //to be changed /////////////////////////
          this.srcY = 230; //to be changed ////////////////////////////////////////////////////
          this.dirX=this.dirX-(20+speed);
          if(level==3){
              if(this.down){
              this.dirY+=15;
              if(this.dirY>= canvasH-190){
                  this.upp=true;
                  this.down=false;
                }}
              else 
              {
                  this.dirY-=20;
                  if(this.dirY <90){
                      this.down=true;
                      this.upp=false;
                  }
              }

          }
        
    

    }

    enemy.prototype.draw=function(){
    
        this.update();
        
        context.drawImage(aggronSprite,this.srcX,this.srcY,this.width,this.height,this.dirX,this.dirY,this.width,this.height);
        
    }



    enemy.prototype.removeEnemy=function(){
    this.active=false;
    
    }