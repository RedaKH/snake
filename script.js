//création du niveau
const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

const box = 32;

const ground  = new Image ();
ground.src="ground.png";

const food = new Image();
food.src="food.png";
 
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src="";
eat.src="";
up.src="";
left.src="";
right.src="";
down.src="";




ctx.drawImage(imageName,X,Y,Width,Height);
ctx.drawImage("",40,50,25,25);
ctx.fillStyle="red";
ctx.fillRect(100,300,30,30);

let box =32 
ctx.fillStyle="black";
ctx.fillRect=(5*box,6*box,2*box,3*box);

//Création du serpent
let snake = [];
snake[0] = { x : 9*box,y : 10*box};
//snake[1] = { x : 8*box,y : 10*box};
////création de la nourriture

let food ={
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box


};
//Score du game
let score=0;

function draw () {
    ctx.drawImage(ground,0,0);
     for (let i = 0; i < snake.length; i++) {
        const element = array[index];
        ctx.fillStyle = (i==0 )?"green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        
    }
    ctx.drawImage(foodImg,food.x,food.y);
    ctx.fillStyle="White";
    ctx.font="45px Changa One";
    ctx.fillText(score,2*box,1.6*box);
}
let game = setInterval(draw,100);

//Controle du serpent
let d;
document.addEventListener("keydown",direction);

function direction(event) {
    if (event.keyCode == 37 && d!="RIGHT" ) {
        left.play();
        d="LEFT";
        
    } else if(event.keyCode==38 && d!="DOWN") { 
        up.play();

        d="UP";
        
    }else if(event.keyCode==40&& d!="UP") { 
        down.play();

        d="DOWN";
        
    }else if(event.keyCode==39 && d!="LEFT") { 
        right.play();

        d="RIGHT";
        
    }
    
}

snake.pop();
snakeX=snake[0].x;
snakeY=snake[0].y;


if (d="LEFT") {
    snakeX-=box;

}
if (d="UP") {
    snakeY-=box;

    
}if (d="RIGHT") {
    snakeX+=box;

}
if (d="DOWN") {
    snakeY+=box;

}



let newHead= {
    x:snakeX,
    y:snakeY

}
snake.unshift(newHead);

if (snakeX==food.x && snakeY==food.y) {
    score++;
    eat.play();
    food={
        x:unit*Math.floor(Math.random()*17+1),
        y:unit*Math.floor(Math.random()*15+3)
    }
    //On ajoute newhead sans le snake.pop
    
} else {
    snake.pop();
}

function collision(head,array) {
    
    for ( let i=0;i<snake.length;i++) {
       if (newHead.x==snake[i].x && newHead.y == snake[i].y) {
           return true;
           
       }
        
    }
    return false;
}
//game over 
if (snakeX<box || snakeX>17*box ||snakeY<3*box ||snakeY>17*box || collision(newHead,snake) ) {
    clearInterval(game);
    dead.play();
}

