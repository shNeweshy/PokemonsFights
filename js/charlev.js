
var char=1;
var level=1;
var charblock = document.getElementById("char-blocks-div");
var levelblock = document.getElementById("level-blocks-div");
var canvas = document.getElementById("canvas");



function onClickCharacter(tempo){
    if (tempo  ==  1){
        char=1;
    }else if (tempo  ==  2){
        char=2;
    }else if(tempo  ==  3){
        char=3;
    }

    charblock.style.display="none";
    levelblock.style.display="block";
    canvas.style.display="none";
    
}

var animation = new animation();

function onClickLevel(tempo){
    if (tempo  ==  1){
        level=1;
    }else if (tempo  ==  2){
        level=2;
    }else if(tempo  ==  3){
        level=3;
    }

    charblock.style.display="none";
    levelblock.style.display="none";
    canvas.style.display="block";
    document.body.style.backgroundImage="url()";
    // startGame(char,level);
    animation.startGame(char,tempo);
}