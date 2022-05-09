import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime;
function update(time) {
  if (lastTime != undefined) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])//in ball.js
    computerPaddle.update(delta, ball.y);//in paddle.js

    if (isLose()) 
        handleLose();
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }
  if(parseInt(computerScoreElem.textContent) + parseInt(playerScoreElem.textContent) === 3){
    if(parseInt(playerScoreElem.textContent) > parseInt(computerScoreElem.textContent)){
        var gameover = document.getElementById("gameover")
        gameover.innerHTML = "You Won";
        gameover.style.backgroundColor = "green";
    }   
    else{
        document.getElementById("gameover").innerHTML = "Machine Won";
    }
    document.getElementById("gameover").style.visibility = "visible";
    document.getElementById("playagain").style.display = "block";
    //document.getElementById("playagain").onclick = window.location.reload();
    cancelAnimationFrame();
    playerScoreElem.textContent = 0;
    computerScoreElem.textContent = 0;
  }
  ball.reset()
  computerPaddle.reset()
  
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update);