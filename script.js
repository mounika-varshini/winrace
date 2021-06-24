const score=document.querySelector(".score");
const startGame=document.querySelector(".startGame");
const gameArea=document.querySelector(".gameArea");
let player={speed:5,score:0};
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}
//console.log(gameArea);
startGame.addEventListener('click',start);
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    //console.log(e.key);
    //console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
   // console.log(e.key);
    //console.log(keys);
}
function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||
                (bRect.left>aRect.right) ||(aRect.left>bRect.right));
}
function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=550){
            item.y-=600;
        }
        item.y+=7;
        item.style.top=item.y +"px";
    } )
}

function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            console.log("boom");
            player.start=false;
            startGame.classList.remove('hide');
        }
        if(item.y>=550){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350)+"px";
        }
        item.y+=7;
        item.style.top=item.y +"px";
        console.log(player.score);
    } )
}
function play(){
    //console.log("clicked");
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    if(player.start){
        moveLines();
        moveEnemy(car);
        
        if(keys.ArrowUp&& player.y>(road.top+100)){
            player.y-=player.speed;
        }
        if(keys.ArrowDown&& player.y<(road.bottom-85)){
            player.y+=player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed;
        }
        if(keys.ArrowRight && player.x<(road.width-55)){
            player.x+=player.speed;
        }
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(play);
       // console.log(player.score++);
        player.score++
        score.innerText=player.score;
    }

    
}
function start(){
    //gameArea.classList.remove('hide');
    startGame.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(play);

    for(x=0;x<5;x++){
        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y=(x*150);
        roadLine.style.top=roadLine.y+"px";
        gameArea.appendChild(roadLine);
    }
    

    let car=document.createElement('div');
    car.setAttribute('class','car');
    //car.innerText="hey iam added";
    gameArea.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;
    for(x=0;x<3;x++){
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=((x+1)*350)*-1;
        enemyCar.style.top=enemyCar.y+"px";
        //enemyCar.style.background="blue";
        enemyCar.style.left=Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
    }
}
