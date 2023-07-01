const score = document.querySelector(".score");
let maxScore = document.querySelector(".maxScore");
const mainPage = document.querySelector(".mainPage");
const startGame = document.querySelector(".startGame");
const gameArea = document.querySelector(".gameArea");
var maxScoreArray = [];
let player = { speed: 5, score: 0, maxScore: 0 };
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}
startGame.addEventListener('click', start);
//mainPage.addEventListener('click',start);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
        (bRect.left > aRect.right) || (aRect.left > bRect.right));
}

//lines in game area
function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 750) {
            item.y -= 870;
        }
        item.y += 7;
        item.style.top = item.y + "px";
    })
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        if (isCollide(car, item)) {
            player.start = false;
            startGame.classList.remove('hide');
            mainPage.classList.remove('hide');
            maxScoreArray.push(player.score + 1);
            maxScore.innerText = "HIGH SCORE: " + Math.max.apply(null, maxScoreArray);
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += 10;
        item.style.top = item.y + "px";
    })
}
function play() {
    ;
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 100)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 55)) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(play);
        player.score++
        score.innerText = "SCORE: " + player.score;
        //maxScore=Math.max(player.score,player.maxScore);

    }


}
function start() {
    //gameArea.classList.remove('hide');
    startGame.classList.add('hide');
    mainPage.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;

    window.requestAnimationFrame(play);

    for (x = 0; x < 10; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 125);
        roadLine.style.top = roadLine.y + "vh";
        gameArea.appendChild(roadLine);
    }


    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //car.innerText="hey iam added";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        //enemyCar.style.background="blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}
