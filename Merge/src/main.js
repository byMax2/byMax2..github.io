let gc, ctx;
let _WIDTH_ = 700, _HEIGHT_ = 700;
let _x_ = 5, _y_ = 5;
let tileWidth, tileHeight;

let game;
let FPS = 30;

let drag = false;
let dragging;

let money = 0;

function getPayout(n) {
	if (n == 1) {return 1;}
	else {return getPayout(n-1)*2 + n;}
}

function clamp(n, min, max) {
	return Math.min(Math.max(n, min), max);
}

function setup() {
	game = new MergeGame();
	game.init();

	gc = createCanvas(_WIDTH_ + 50, _HEIGHT_ + 50);
	gc.parent("canvasCol");

	noSmooth();
	background(0);
	fill(200, 0, 0);
	stroke(255);
	frameRate(FPS);

	tileWidth = _WIDTH_ / _x_;
	tileHeight = _HEIGHT_ / _y_;
}

function draw() {
	game.tick();
	game.draw();
	if (dragging != undefined) {dragging.dragdraw();}
}

function mousePressed() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		let x = Math.floor(clamp(mouseX, 0, _WIDTH_-1) / tileWidth);
		let y = Math.floor(clamp(mouseY, 0, _HEIGHT_-1) / tileHeight);

		if (game.tiles[x][y].level == 0) {return;}

		else {
			drag = true;
			dragging = game.tiles[x][y];
			game.tiles[x][y].click();
		}
	}
}

function mouseReleased() {
	let xx = Math.floor(mouseX / tileHeight);
	let yy = Math.floor(mouseY / tileHeight);
	if (yy == 5) {
		switch (xx) {
			case 0:
				dragging.delete();
				dragging = undefined;
			break;
		}
	} else {
		if (drag) {
			drag = false;
			let x = Math.floor(clamp(mouseX, 0, _WIDTH_-1) / tileWidth);
			let y = Math.floor(clamp(mouseY, 0, _HEIGHT_-1) / tileHeight);
			dragging.mergeWith(x, y);
			dragging = undefined;
		}
	}
}

function purchaseUpgrade(n) {
	if (n == 4) game.autoOpenUnlocked = true;
	if (n == 5) game.autoMergeUnlocked = true;

	game.upgrades[n].purchase();
	
	game.fissureTimerMax = 10 * (game.upgrades[0].amount == 0 ? 1 : Math.pow(0.95, game.upgrades[0].amount));
	game.tierNew = 1 + game.upgrades[1].amount;
	game.chanceForLuckyFissure = game.upgrades[2].amount * 2.5;
	game.chanceForLuckyMerge = game.upgrades[3].amount * 1;
	game.autoOpenTimerMax = 60 * (game.upgrades[4].amount == 0 ? 1 : Math.pow(0.95, game.upgrades[4].amount));
	game.autoMergeTimerMax = 60 * (game.upgrades[5].amount == 0 ? 1 : Math.pow(0.95, game.upgrades[5].amount));
}

class MergeGame {
	constructor() {
		this.tiles = [];
		this.upgrades = [];

		this.fissureTimer = 0;
		this.fissureTimerMax = 10;
		this.autoMergeTimer = 0;
		this.autoMergeTimerMax = 60;
		this.autoOpenTimer = 0;
		this.autoOpenTimerMax = 60;

		this.tierNew = 1;

		this.chanceForLuckyFissure = 0.00;

		this.chanceForLuckyMerge = 0.00;

		this.autoMergeUnlocked = false;
		this.autoOpenUnlocked = false;

	}

	init() {
		for (let x = 0; x < _x_; x++) {
			this.tiles.push([]);
			for (let y = 0; y < _y_; y++) {
				this.tiles[x][y] = new Mergeable(x, y);
			}
		}
		this.tiles[2][2].level = -1;

		this.upgrades[0] = new Upgrade("#upgrade_01", "Faster Spawns", "Reduces the Time you have to wait (-5% per Upgrade)", 100, 5);
		this.upgrades[1] = new Upgrade("#upgrade_02", "Denser Fissures", "+1 Tier to new Matter (+1 per Upgrade)", 1000, 20);
		this.upgrades[2] = new Upgrade("#upgrade_03", "Lucky Fissures", "Chance for +1 Tier to new Matter (+2.5% Chance per Upgrade)", 5000, 10);
		this.upgrades[3] = new Upgrade("#upgrade_04", "Lucky Merges", "Chance for +1 Tier when merging (+1.0% Chance per Upgrade)", 10000, 10);
		this.upgrades[4] = new Upgrade("#upgrade_05", "AutoOpen", "Automatically Opens Crates every 60s (-5% per Upgrade)", 10000, 10);
		this.upgrades[5] = new Upgrade("#upgrade_06", "AutoMerge", "Automatically Merges Matter every 60s (-5% per Upgrade)", 10000, 10);
	}

	canMerge() {
		for (let i = this.lowestLevel(); i <= this.highestLevel(); i++) {
			if (this.count(i) > 1) {
				return i;
			}
		}
	}

	count(n) {
		let _count_ = 0;
		for (let x = 0; x < this.tiles.length; x++) {
			for (let y = 0; y < this.tiles[x].length; y++) {
				if (this.tiles[x][y].level == n) {
					_count_++;
				}
			}
		}
		return _count_;
	}

	lowestLevel() {
		let lowest = 1000000;
		for (let x = 0; x < this.tiles.length; x++) {
			for (let y = 0; y < this.tiles[x].length; y++) {
				if (this.tiles[x][y].level >= 1)
					lowest = Math.min(lowest, this.tiles[x][y].level);
			}
		}
		return lowest;
	}

	highestLevel() {
		let highest = -1;
		for (let x = 0; x < this.tiles.length; x++) {
			for (let y = 0; y < this.tiles[x].length; y++) {
				if (this.tiles[x][y].level >= 1)
					highest = Math.max(highest, this.tiles[x][y].level);
			}
		}
		return highest;
	}

	spawnCrate() {
		let success = false;
		if (this.count(0) > 0) {
			while (!success) {
				let randomX = Math.floor(Math.random() * 5);
				let randomY = Math.floor(Math.random() * 5);

				if (this.tiles[randomX][randomY].level == 0) {
					this.tiles[randomX][randomY].level = -1;
					success = true;
				}
			}
		}
	}

	autoOpen() {
		let success = false;
		while (!success) {
			let randomX = Math.floor(Math.random() * 5);
			let randomY = Math.floor(Math.random() * 5);

			if (this.tiles[randomX][randomY].level == -1) {
				this.tiles[randomX][randomY].open();
				success = true;
			}
		}
	}

	autoMerge() {
		let target = this.canMerge();
		if (target > 0) {
			let foundFirst = false;
			let first;
			let foundSecond = false;
			let second;

			let tries = 0;
			while (!foundSecond) {
				while (!foundFirst) {
					let randomX = Math.floor(Math.random() * 5);
					let randomY = Math.floor(Math.random() * 5);

					if (this.tiles[randomX][randomY].level == target) {
						first = this.tiles[randomX][randomY];
						foundFirst = true;
					}
				}

				let randomX = Math.floor(Math.random() * 5);
				let randomY = Math.floor(Math.random() * 5);

				if (first.x == randomX && first.y == randomY) {first = undefined; foundFirst = false; }
				else {
					if (this.tiles[randomX][randomY].level == first.level) {
						second = this.tiles[randomX][randomY];
						foundSecond = true;
						break;
					}
				}
			}
			first.mergeWith(second.x, second.y);
		}
	}

	checkFor(_n_, higher = false) {
		let check = false;
		for (let x = 0; x < this.tiles.length; x++) {
			for (let y = 0; y < this.tiles[x].length; y++) {
				if (higher) {
					if (this.tiles[x][y].level >= _n_) {
						check = true;
					}
				} else {
					if (this.tiles[x][y].level == _n_) {
						check = true;
					}
				}
			}
		}
		return check;
	}

	tick() {
		if (this.fissureTimer < this.fissureTimerMax) {
			this.fissureTimer += (1000 / FPS) / 1000;
		} else if (this.fissureTimer > this.fissureTimerMax && this.checkFor(0)) {
			this.fissureTimer = 0;
			this.spawnCrate();
		}

		if (this.autoOpenUnlocked) {
			if (this.autoOpenTimer < this.autoOpenTimerMax) {
				this.autoOpenTimer += (1000 / FPS) / 1000;
			} else if (this.autoOpenTimer > this.autoOpenTimerMax && this.checkFor(-1)) {
				this.autoOpenTimer = 0;
				this.autoOpen();
			}
		}

		if (this.autoMergeUnlocked) {
			if (this.autoMergeTimer < this.autoMergeTimerMax) {
				this.autoMergeTimer += (1000 / FPS) / 1000;
			} else if (this.autoMergeTimer > this.autoMergeTimerMax && this.checkFor(1, true)) {
				this.autoMergeTimer = 0;
				this.autoMerge();
			}
		}

		let sum = 0;
		for (let x = 0; x < this.tiles.length; x++) {
			for (let y = 0; y < this.tiles[x].length; y++) {
				if (this.tiles[x][y].level > 0) {
					sum += this.tiles[x][y].payout;
				}
			}
		}
		money += (sum / FPS);
		$("#moneyOut").text(format(money));
	}

	draw() {
		background(0);
		
		for (let x = 0; x < this.tiles.length; x++) {
			for (let y = 0; y < this.tiles[x].length; y++) {
				this.tiles[x][y].draw();
			}
		}

		fill(255 - ((this.fissureTimer / this.fissureTimerMax) * 255), 0 + ((this.fissureTimer / this.fissureTimerMax) * 255), 0);
		stroke(255);
		strokeWeight(1);
		rect(_WIDTH_ + 2, height - ((this.fissureTimer / this.fissureTimerMax) * height), width, height);

		fill(27, 0, 0);
		stroke(255);
		strokeWeight(1);
		rect(0, _HEIGHT_ + 1, tileWidth, height);
		fill(255)
		stroke(0);
		textSize(18);
		text("DELETE", tileWidth / 2, _HEIGHT_ + 30)
		fill(255);
		circle(mouseX, mouseY, 20);
	}
}

class Mergeable {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.level = 0;
		this.payout = 0;
	}

	lvlup() {
		this.level += 1;
		this.payout = getPayout(this.level);
	}

	mergeWith(x, y) {
		if (this.x == x && this.y == y) {return;}

		if (this.level == game.tiles[x][y].level) {
			game.tiles[x][y].lvlup();
			let r = Math.random() * 100;
			if (game.chanceForLuckyMerge > r) {
				game.tiles[x][y].lvlup();
			}
			this.level = 0;
			this.payout = 0;
		} else {
			this.swapWith(x, y);
		}
	}

	swapWith(x, y) {
		if (game.tiles[x][y].level >= 0) {
			let templevel = game.tiles[x][y].level;
			let temppayout = game.tiles[x][y].payout;

			game.tiles[x][y].level = this.level;
			game.tiles[x][y].payout = this.payout;

			this.level = templevel;
			this.payout = temppayout;
		}
	}

	delete() {
		this.level = 0;
		this.payout = 0;
	}

	click() {
		if (this.level == -1) {this.open();}
	}

	open() {
		this.level = game.tierNew;
		let r = Math.random() * 100;
		if (game.chanceForLuckyFissure > r) {
			this.level ++;
		}
		this.payout = getPayout(this.level);
	}

	draw() {
		textAlign(CENTER);
		strokeWeight(3);
		stroke(255);
		switch (this.level) {
			case -1: // Crate
				fill(117, 70, 12);
				rect(this.x * tileWidth, this.y * tileHeight, tileWidth, tileHeight);
				textSize(18);
				fill(200);
				stroke(0);
				text("Open Me !", (this.x * tileWidth) + tileWidth * 0.5, (this.y * tileHeight) + tileHeight * 0.5);
			break;
			case 0: // Empty
				fill(0);
				rect(this.x * tileWidth, this.y * tileHeight, tileWidth, tileHeight);
			break;
			default: // Mergeable
				colorMode(HSL, 360, 100, 100);
				fill((180 + this.level * 15) % 360, 100, 50);
				rect(this.x * tileWidth, this.y * tileHeight, tileWidth, tileHeight);
				colorMode(RGB);
				fill(127 - this.level*3);
				rect(this.x * tileWidth + tileWidth*0.25, this.y * tileHeight + tileHeight*0.25, tileWidth*0.5, tileHeight*0.5);

				fill(200);
				stroke(0);
				text("Level: " + this.level, (this.x * tileWidth) + tileWidth * 0.5, (this.y * tileHeight) + tileHeight * 0.16);
				text("Payout: " + format(this.payout) + " /s", (this.x * tileWidth) + tileWidth * 0.5, (this.y * tileHeight) + tileHeight * 0.915);
			break;
		}
	}

	dragdraw() {
		strokeWeight(3);
		colorMode(HSL, 360, 100, 100);
		stroke((180 + this.level * 15) % 360, 100, 50);
		line(this.x * tileWidth + tileWidth*0.1, this.y * tileHeight + tileHeight*0.1, mouseX, mouseY)
		line((this.x + 1) * tileWidth - tileWidth*0.1, (this.y + 1) * tileHeight - tileHeight*0.1, mouseX, mouseY)
		line(this.x * tileWidth + tileWidth*0.1, (this.y + 1) * tileHeight - tileHeight*0.1, mouseX, mouseY)
		line((this.x + 1) * tileWidth - tileWidth*0.1, this.y * tileHeight + tileHeight*0.1, mouseX, mouseY)
		colorMode(RGB);
	}
}

function format(input, seperator = ", ", digitsBelowAThousand = 0){
	suffix = ["", "K", "M", "B", "T", 
	"Aa", "Ab", "Ac", "Ad", "Ae", "Af", "Ag", "Ah", "Ai", "Aj", "Ak", "Al", "Am", "An", "Ao", "Ap", "Aq", "Ar", "As", "At", "Au", "Av", "Aw", "Ax", "Ay", "Az", 
	"Ba", "Bb", "Bc", "Bd", "Be", "Bf", "Bg", "Bh", "Bi", "Bj", "Bk", "Bl", "Bm", "Bn", "Bo", "Bp", "Bq", "Br", "Bs", "Bt", "Bu", "Bv", "Bw", "Bx", "By", "Bz", 
	"Ca", "Cb", "Cc", "Cd", "Ce", "Cf", "Cg", "Ch", "Ci", "Cj", "Ck", "Cl", "Cm", "Cn", "Co", "Cp", "Cq", "Cr", "Cs", "Ct", "Cu", "Cv", "Cw", "Cx", "Cy", "Cz", 
	"Da", "Db", "Dc", "Dd", "De", "Df", "Dg", "Dh", "Di", "Dj", "Dk", "Dl", "Dm", "Dn", "Do", "Dp", "Dq", "Dr", "Ds"];
	let logResult = Math.floor(Math.log10(input) / 3);
	if (input <= 0) {return 0;}
	if (input < 1000 && input > 0) 
	{
		return input.toFixed(digitsBelowAThousand);
	}
	let offset = Math.floor(Math.log10(input)) % 3;
	
	let preComma = Math.floor(input / Math.pow(1000, logResult));
	let postComma = Math.floor(input / Math.pow(1000, logResult-1)) - 1000 * (preComma - 1);
	
	return preComma.toString() + seperator + postComma.toString().substr(1) + " " + suffix[logResult];
}

class Upgrade {
	constructor(element, name, description, cost, costMult) {
		this.element = element;
		this.name = name;
		this.description = description;
		this.cost = cost;
		this.costMult = costMult;

		this.amount = 0;

		this.update();
	}

	update() {
		$(this.element).children(".upgrade-name").text(this.name);
		$(this.element).children(".upgrade-desc").text(this.description);
		$(this.element).children(".upgrade-cost").text(format(this.cost));
	}

	purchase() {
		if (money >= this.cost) {
			money -= this.cost;
			this.amount ++;
			this.cost *= this.costMult;
			this.update();
		}
	}
}
