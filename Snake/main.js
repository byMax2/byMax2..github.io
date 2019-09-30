class Part {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class PowerUp{
	constructor(x, y, effect) {
		this.x = x;
		this.y = y;
		this.effect = effect;
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let fruits = [];
let powerups = [];
let parts = [];

let canvas = {
	width: 1262,
	height: 768,
	factor: 32,
}

let game = {
	fps: 60,
	isPaused: true,
	ticker: 0,
	speed: 5,
	minx: canvas.factor,
	miny: canvas.factor,
	maxx: Math.floor(Math.floor(canvas.width/canvas.factor) * canvas.factor) - canvas.factor,
	maxy: Math.floor(Math.floor(canvas.height/canvas.factor) * canvas.factor) - canvas.factor,
}

let snake = {
	length: 7,
	score: 0,
	highscore: 0,
	direction: "up",
	posx: getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,
	posy: getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor,
	powerupleft: 0,
	powerup: "none",
}

let powerupsstats = {
	sloweff: 1,
}

let events = {
	snake: "white",
	fruit: "white",
	slowpu: "#ffc300",
	sizepu: "#ff3333",
	ghostpu: "#9c33ff",
	foodpu: "#33ff33",
	border: "black",
}

let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
	game.isPaused = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.setInterval(function(){
	if (game.isPaused == false) {
		game.ticker ++ ;
		if (game.ticker >= (game.speed * powerupsstats.sloweff)) {
			game.ticker = 0;
			ctx.clear();
			run();
			if (powerups.length < 1) {
				let random = Math.floor((Math.random() * 4) + 1); // 1 - 4
				if (random == 1) {
					powerups.unshift(new PowerUp(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor, "slow"))
				} else if (random == 2) {
					powerups.unshift(new PowerUp(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor, "size"))
				} else if (random == 3) {
					powerups.unshift(new PowerUp(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor, "ghost"))
				} else if (random == 4) {
					powerups.unshift(new PowerUp(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor, "food"))
				}
			}
			if (fruits.length < 2) {
				fruits.unshift(new Part(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor))
			}
		}
	} else {
		
	}
}, 1000 / game.fps);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
		if (snake.direction != "down") {snake.direction = "up";}
    }
    else if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        if (snake.direction != "right") {snake.direction = "left";}
    }
	else if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        if (snake.direction != "up") {snake.direction = "down";}
    }
	else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
        if (snake.direction != "left") {snake.direction = "right";}
    }
	else if (event.key === " ") {
		game.isPaused = !game.isPaused;
	}
	else if (event.key === "r" || event.key === "R" || event.key === "Escape") {
        start();
    }
	else if (event.key === "+" || event.key === "Plus") {
		game.speed -= 0.2;
    }
	else if (event.key === "-" || event.key === "Minus") {
        game.speed += 0.2;
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																			//
//								FUNCTIONS   				v v v v v v v				FUNCTIONS											//
//																																			//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																			//
//									MAIN   					v v v v v v v   				MAIN											//
//																																			//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function run() {
	snake.powerupleft -= 0.1;
	
	let dir = snake.direction;
	switch (dir) 
	{
		case "up":
			snake.posy -= canvas.factor;
		break;
		
		case "left":
			snake.posx -= canvas.factor;
		break;
		
		case "down":
			snake.posy += canvas.factor;
		break;
		
		case "right":
			snake.posx += canvas.factor;
		break;
	}
	if (snake.powerup == "ghost") {
		if (snake.posx < game.minx) {snake.posx = game.maxx;}
		if (snake.posx > game.maxx) {snake.posx = game.minx;}
		if (snake.posy < game.miny) {snake.posy = game.maxy;}
		if (snake.posy > game.maxy) {snake.posy = game.miny;}
	} else {
		if (snake.posx < game.minx) {start();}
		if (snake.posx > game.maxx) {start();}
		if (snake.posy < game.miny) {start();}
		if (snake.posy > game.maxy) {start();}
	}
	
	parts.unshift(new Part(snake.posx, snake.posy));
	parts.splice(snake.length, 3);
	
	for (let i = 0; i < fruits.length; i++) {
		if (parts[0].x >= fruits[i].x && parts[0].x < fruits[i].x + canvas.factor && parts[0].y >= fruits[i].y && parts[0].y < fruits[i].y + canvas.factor) {
			snake.length += 2;
			snake.score ++ ;
			events.fruit = "#00ff00";
			events.snake = "#00ff00";
			events.border1 = "#00ff00";
			fruits.splice(fruits.indexOf(fruits[i]),1);
			if (fruits.length == 1) {
				fruits[i] = new Part(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor);
			}
		}
		
		drawSquare(fruits[i].x, fruits[i].y, (fruits[i].x + canvas.factor), (fruits[i].y + canvas.factor), events.fruit);
		drawSquare(fruits[i].x+1, fruits[i].y+1, (fruits[i].x + canvas.factor-1), (fruits[i].y + canvas.factor-1), "black");
	}
	
	for (let i = 0; i < parts.length; i++) {
		drawSquare(parts[i].x, parts[i].y, (parts[i].x + canvas.factor), (parts[i].y + canvas.factor), events.snake);
		drawSquare(parts[i].x+1, parts[i].y+1, (parts[i].x + canvas.factor-1), (parts[i].y + canvas.factor-1), "black");
		if (i % 3 == 0) {
			drawSquare(parts[i].x+canvas.factor/8, parts[i].y+canvas.factor/8, parts[i].x + canvas.factor-canvas.factor/8, parts[i].y + canvas.factor-canvas.factor/8, events.snake);
		}
		
		if (i > 0) {
			if (parts[0].x >= parts[i].x && parts[0].x < parts[i].x + canvas.factor && parts[0].y >= parts[i].y && parts[0].y < parts[i].y + canvas.factor) {
				if (snake.powerup == "ghost") {
					
				} else {
					start();
				}
			}
		}
	}
	
	for (let i = 0; i < powerups.length; i++) {
		if (parts[0].x >= powerups[i].x && parts[0].x < powerups[i].x + canvas.factor && parts[0].y >= powerups[i].y && parts[0].y < powerups[i].y + canvas.factor) {
			snake.score ++ ;
			if (powerups[i].effect == "slow") {
				snake.powerupleft = 5;
				snake.powerup = "slow";
				powerupsstats.sloweff = 1.5;
			}
			if (powerups[i].effect == "size") {
				snake.length -= 3;
				if (snake.length < 1) {
					snake.length = 1;
				}
			}
			if (powerups[i].effect == "ghost") {
				snake.powerupleft = 10;
				snake.powerup = "ghost";
			}
			if (powerups[i].effect == "food") {
				fruits.push(new Part(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor));
				fruits.push(new Part(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor));
				fruits.push(new Part(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor));
				fruits.push(new Part(getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor,getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor));
			}
			powerups = [];
		}
		
		if (powerups[i].effect == "slow") {
		drawSquare(powerups[i].x, powerups[i].y, (powerups[i].x + canvas.factor), (powerups[i].y + canvas.factor), events.slowpu);
		drawSquare(powerups[i].x+1, powerups[i].y+1, (powerups[i].x + canvas.factor-1), (powerups[i].y + canvas.factor-1), "black");
		}
		
		if (powerups[i].effect == "size") {
		drawSquare(powerups[i].x, powerups[i].y, (powerups[i].x + canvas.factor), (powerups[i].y + canvas.factor), events.sizepu);
		drawSquare(powerups[i].x+1, powerups[i].y+1, (powerups[i].x + canvas.factor-1), (powerups[i].y + canvas.factor-1), "black");
		}
		
		if (powerups[i].effect == "ghost") {
		drawSquare(powerups[i].x, powerups[i].y, (powerups[i].x + canvas.factor), (powerups[i].y + canvas.factor), events.ghostpu);
		drawSquare(powerups[i].x+1, powerups[i].y+1, (powerups[i].x + canvas.factor-1), (powerups[i].y + canvas.factor-1), "black");
		}
		
		if (powerups[i].effect == "food") {
		drawSquare(powerups[i].x, powerups[i].y, (powerups[i].x + canvas.factor), (powerups[i].y + canvas.factor), events.foodpu);
		drawSquare(powerups[i].x+1, powerups[i].y+1, (powerups[i].x + canvas.factor-1), (powerups[i].y + canvas.factor-1), "black");
		}
	}
	
	if (snake.powerupleft < 1) {
		events.snake = "#ffffff";
		snake.powerup = "none";
		powerupsstats.sloweff = 1;
	}
	
	if (snake.powerup == "slow") {
		events.snake = "#ffc300";
		powerupsstats.sloweff = 1.5;
	}
	
	if (snake.powerup == "ghost") {
		events.snake = "#9c33ff";
		powerupsstats.sloweff = 0.75;
	}
	
	if (snake.powerup == "food") {
		events.snake = "#33ff33";
	}
	
	events.fruit = "#ffffff";
	
	drawSquare(game.minx,game.miny,game.maxx+canvas.factor,game.maxy+canvas.factor,events.border);
	
	document.getElementById("score").innerHTML = "Score: " + snake.score;
	document.getElementById("highscore").innerHTML = "Highscore: " + snake.highscore;
}

function start() {
	if (snake.score > snake.highscore) {
		snake.highscore = snake.score;
	}
	snake.posx = getRandomInt(game.minx / canvas.factor, game.maxx / canvas.factor) * canvas.factor;
	snake.posy = getRandomInt(game.miny / canvas.factor, game.maxy / canvas.factor) * canvas.factor;
	snake.length = 4;
	snake.score = 0;
	snake.direction = "up";
	game.isPaused = false;
	parts = [];
	fruits = [];
	powerups = [];
	game.powerupleft = 0;
	document.getElementById("score").innerHTML = "Score: " + snake.score;
	document.getElementById("highscore").innerHTML = "Highscore: " + snake.highscore;
}

function drawLine(startx, starty, endx, endy, color) {
	ctx.beginPath();
	ctx.moveTo(startx, starty);
	ctx.lineTo(endx, endy);
	ctx.strokeStyle=color;
	ctx.lineWidth=1;
	ctx.stroke(); 
}

function drawSquare(startx, starty, endx, endy, color) {
	ctx.beginPath();
	ctx.moveTo(startx, starty)
	drawLine(startx, starty, endx, starty, color);
	drawLine(endx, starty, endx, endy, color);
	drawLine(endx, endy, startx, endy, color);
	drawLine(startx, endy, startx, starty, color);
	ctx.strokeStyle=color;
	ctx.lineWidth=1;
	ctx.stroke();
}