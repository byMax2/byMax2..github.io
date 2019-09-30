CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function () {

  this.setTransform(1, 0, 0, 1, 0, 0);
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);         
};

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let overlay = document.getElementById("overlayCanvas");
let otx = overlay.getContext("2d");

canvas.width = 1024;
canvas.height = 512;

overlay.width = 1024;
overlay.height = 512;

let game = {
  running: true,
  over: false,
  ticker: 0,
  speed: 0,
  score: 0,
}

let bird = {
  falling: 0,
  pos: {
    x: 256,
    y: 256,
  },
  size: {
    a: 24,
    b: 24,
  }
};

let pipe = {
  n: [],
  size: {
    a: 256,
    b: 256,
  }
};

function jump() {
  if (bird.falling > 0) {
    bird.falling = 0;
  }
  bird.falling -= (3.8 + (bird.falling / 2));
}

function newPipe() {
  let holeSize = Math.floor(196 - ((game.score * 1.5) + Math.random() * game.score * 3));
  if (holeSize < 64) {holeSize = 64 + Math.floor(Math.random() * 8);}

  let bounds = Math.floor(256 - (Math.random() * game.score));
  if (bounds < 32) {bounds = 32;}

  let holeAt = 256;
  let side = Math.floor(Math.random() * 2);
  if (side == 0) {holeAt = Math.floor((canvas.height / 2) - Math.random() * game.score * 3);} else if (side == 1) {holeAt = Math.floor((canvas.height / 2) + Math.random() * game.score * 3);}
  if (holeAt < 64) {holeAt = 64 + Math.floor(Math.random() * 32);} else if (holeAt > (512 - 64)) {holeAt = (512 - 64) - Math.floor(Math.random() * 32);}
  
  let holeWidth = 32 + Math.floor(Math.random() * 96) + Math.floor(Math.random() * game.score * 4);
  if (holeWidth > 256) {holeWidth = 256;}
  pipe.n.push({x: 1024 + (holeWidth / 2), y: holeAt - (holeSize / 2), h: Math.floor(0 - (canvas.height)), q: holeAt, s: holeSize, w: holeWidth});
  pipe.n.push({x: 1024 + (holeWidth / 2), y: holeAt + (holeSize / 2), h: Math.floor(0 + (canvas.height)), q: holeAt, s: holeSize, w: holeWidth});
}

function gameOver() {
  game.running = false;
  game.over = true;
  otx.font = "30px Arial";
  otx.fillStyle="#0000FF";
  otx.textAlign="center";
  otx.fillText("Game Over :)",canvas.width / 2,canvas.height / 2 - 8);

  otx.font = "18px Arial";
  otx.fillText("Neustarten mit Leertaste",canvas.width / 2,canvas.height / 2 + 16);
}

function gameStart() {
  pipe = {
    n: []};

  bird = {
    falling: 0,
    pos: {
      x: 256,
      y: 256,},
    size: {
      a: 24,
      b: 24,}};

  game = {
    running: false,
    over: false,
    ticker: 0,
    speed: 0,
    score: 0,}

  otx.clear();
  otx.font = "30px Arial";
  otx.fillStyle="#FFFFFF";
  otx.textAlign="center";
  otx.fillText("FlappyBird",canvas.width / 2,canvas.height / 2 - 8);

  otx.font = "18px Arial";
  otx.fillText("Leertaste, Pfeil Hoch oder W um zu springen",canvas.width / 2,canvas.height / 2 + 16);

  gameLoop();
}

function gameLoop() {
  if (game.running == true) {
    game.ticker ++;
    ctx.clear();

    if (game.ticker >= game.speed) {
      game.ticker = 0;
      newPipe();
    }

    bird.falling += 0.24;
    if (bird.falling < -0) {bird.falling = bird.falling * 1.02;} else if (bird.falling > 0) {bird.falling = bird.falling * 0.98;}
    bird.falling = bird.falling * 0.99;
    bird.pos.y += bird.falling;
    if (bird.pos.y > canvas.height + 64 || bird.pos.y < -(64)) {
      gameOver();
    }

    for (var i = 0; i < pipe.n.length; i++) {
      if (pipe.n[i].x > -64) {
        pipe.n[i].x -= 4.5 + game.score / 66.6;
      } else {
        pipe.n.splice(pipe.n.indexOf(pipe.n[i]),1);
        game.score += 0.5;

        otx.clear();
        otx.font = "24px Arial";
        otx.fillStyle="#FFFFFF";
        otx.textAlign="left";
        otx.fillText("Punktzahl: " + Math.floor(game.score),4,canvas.height - 24); 
      }

      if (bird.pos.x >= (pipe.n[i].x - (pipe.n[i].w / 2)) && bird.pos.x <= (pipe.n[i].x + (pipe.n[i].w / 2))) {
        if (bird.pos.y <= (pipe.n[i].q - (pipe.n[i].s / 2)) || bird.pos.y >= (pipe.n[i].q + (pipe.n[i].s / 2))) {
          gameOver();
        }
      }
    }

    //Ground
    drawLine({x: 0,y: 8},{x: canvas.width,y: 8},"#00FF00", 16);
    drawLine({x: 0,y: canvas.height - 8},{x: canvas.width,y: 504},"#00FF00", 16);

    //Bird
    drawBird(bird.pos,"#FF0000");

    //Pipes
    for (var i = 0; i < pipe.n.length; i++) {
      drawPipe(pipe.n[i], "#00FF00");
    }

    game.speed = 110 - game.score / 5;
  } else {
    //
  }
}

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {return;}
  switch (event.key) {
    
    case "p":
      game.running = !game.running;
    break;

    case "ArrowUp":
    case " ":
  	case "w":
    case "W":
    if (game.running == true && game.over == false) {
      jump();
    } else if (game.running == false && game.over == false) {
      game.running = true;
      otx.clear();
      otx.font = "24px Arial";
    otx.fillStyle="#FFFFFF";
    otx.textAlign="left";
    otx.fillText("Punktzahl: " + game.score,4,canvas.height - 24); 
      jump();
    } else if (game.over == true && game.running == false) {
      game.over = false;
      gameStart();
    }
    break;

    default:
      return;
  }
  event.preventDefault();
}, true);

setInterval(gameLoop, 10);

function drawLine(a,b,color,thickness) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.closePath();
  ctx.strokeStyle = color || "#FFFFFF";
  ctx.lineWidth = thickness || 1;
  ctx.stroke();
}

function drawBird(a,color) {
  ctx.beginPath();
  ctx.moveTo(a.x - (bird.size.a / 2), a.y - (bird.size.b / 2));
  ctx.lineTo(a.x + (bird.size.a / 2), a.y - (bird.size.b / 2));
  ctx.lineTo(a.x + (bird.size.a / 2), a.y + (bird.size.b / 2));
  ctx.lineTo(a.x - (bird.size.a / 2), a.y + (bird.size.b / 2));
  ctx.lineTo(a.x - (bird.size.a / 2), a.y - (bird.size.b / 2));
  ctx.closePath();
  ctx.fillStyle = color || "#FFFF00";
  ctx.fill();
}

function drawPipe(a,color) {
  ctx.beginPath();
  ctx.moveTo(a.x - (a.w / 2),a.y);
  ctx.lineTo(a.x + (a.w / 2),a.y);
  ctx.lineTo(a.x + (a.w / 2),a.y + a.h);
  ctx.lineTo(a.x - (a.w / 2),a.y + a.h);
  ctx.lineTo(a.x - (a.w / 2),a.y);
  ctx.closePath();

  ctx.strokeStyle = color || "#00FFFF";
  ctx.stroke();
}

gameStart();