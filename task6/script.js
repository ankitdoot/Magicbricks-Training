const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//unit
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const hitWall = new Image();
hitWall.src = "./img/hit.png";

//audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

//snake initialize
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};
//food location
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let score = 0;

//control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

// check collision
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//draw everything to canvas
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  ctx.drawImage(foodImg, food.x, food.y);

  //old head position
  let temp1 = snake[0].x;
  let temp2 = snake[0].y;
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //snake movement direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  //if snake eats food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    let flag = 0;
    while (1) {
      food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
      };
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == food.x && snake[i].y == food.y) {
          flag = 1;
          break;
        }
      }
      if (flag == 1) continue;
      else break;
    }
  } else {
    snake.pop();
  }
  //new head
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    ctx.drawImage(hitWall, temp1, temp2, 32, 32);
    clearInterval(game);
    dead.play();
    document.getElementById("message").style.display = "block";
  }
  snake.unshift(newHead);

  ctx.fillstyle = "white";
  ctx.font = "45px Arial";
  ctx.fillText(score, 3 * box, 1.6 * box);
}

let game = setInterval(draw, 150);
