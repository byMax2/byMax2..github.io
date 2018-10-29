/* Resources */

var a_wood = 10;
var a_stone = 0;
var a_metal = 0;
var a_food = 20;
var a_coins = 0;
var a_emeralds = 0;

/* Nation */

var a_population = 0;
var a_max_population = 5;

var a_max_lumejack = 0;
var a_max_miner = 0;
var a_max_farmer = 0;

var a_lumejack = 0;
var a_miner = 0;
var a_farmer = 0;
var a_citizens = 0;

var a_lumejackcst = 0;
var a_minercst = 0;
var a_farmercst = 0;
var a_citizenscst = 0;


/* Buildings */

var a_lumberhod = 0;
var a_mine = 0;
var a_farm = 0;
var a_residence = 1;

var a_lumberhodcst = Math.floor(10*a_lumberhod/4+10);
var a_minecst = Math.floor(10*a_mine/4+20);
var a_farmcst = Math.floor(10*a_farm/4+40);
var a_residencecst = Math.floor(10*a_residence/4+50);
var a_residencestonecst = Math.floor(10*a_residence/4+10);

/* Level */

var a_lumberhodlvl = 1;
var a_minelvl = 1;
var a_farmlvl = 1;
var a_residencelvl = 1;

var a_woodupgrade = 1;
var a_metalupgrade = 1;

var speed = 100;

/* Function Add Resources */

function addWood(i) {
	a_wood += i / speed;
	document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
}
function addStone(i) {
	a_stone += i / speed;
	document.getElementById("a_stone").innerHTML = Math.floor(a_stone);
}
function addMetal(i) {
	a_metal += (i / speed)/2;
	document.getElementById("a_metal").innerHTML = Math.floor(a_metal);
}
function addFood(i) {
	a_food += i / speed;
	document.getElementById("a_food").innerHTML = Math.floor(a_food);
}
function addGold(i) {
	a_coins += i / speed;
	document.getElementById("a_coins").innerHTML = Math.floor(a_coins);
}
function addemeralds(i) {
	a_emeralds += i / speed;
	document.getElementById("a_emeralds").innerHTML = Math.floor(a_emeralds);
}

/* Function Buildings */

function addLumberhod() {
	
	if (a_wood >= a_lumberhodcst) {
		a_wood -= a_lumberhodcst;
		document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
		a_lumberhod += 1;
		document.getElementById("a_lumberhod").innerHTML = Math.floor(a_lumberhod);
		a_lumberhodcst = Math.floor(10*a_lumberhod/4+10);
		document.getElementById("a_lumberhodcst").innerHTML = Math.floor(a_lumberhodcst);
		a_max_lumejack += 2;
		document.getElementById("a_max_lumejack").innerHTML = Math.floor(a_max_lumejack);
	}
}

function addMine() {
	
	if (a_wood >= a_minecst) {
		a_wood -= a_minecst;
		document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
		a_mine += 1;
		document.getElementById("a_mine").innerHTML = Math.floor(a_mine);
		a_minecst = Math.floor(10*a_mine/4+20);
		document.getElementById("a_minecst").innerHTML = Math.floor(a_minecst);
		a_max_miner += 2;
		document.getElementById("a_max_miner").innerHTML = Math.floor(a_max_miner);
	}
}

function addFarm() {
	
	if (a_wood >= a_farmcst) {
		a_wood -= a_farmcst;
		document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
		a_farm += 1;
		document.getElementById("a_farm").innerHTML = Math.floor(a_farm);
		a_farmcst = Math.floor(10*a_farm/4+40);
		document.getElementById("a_farmcst").innerHTML = Math.floor(a_farmcst);
		a_max_farmer += 2;
		document.getElementById("a_max_farmer").innerHTML = Math.floor(a_max_farmer);
	}
}

function addResidence() {
	
	if (a_wood >= a_residencecst && a_stone >= a_residencestonecst) {
		a_wood -= a_residencecst;
		document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
		a_stone -= a_residencestonecst;
		document.getElementById("a_stone").innerHTML = Math.floor(a_stone);
		a_residence += 1;
		document.getElementById("a_residence").innerHTML = Math.floor(a_residence);
		a_max_population += 5;
		document.getElementById("a_max_population").innerHTML = Math.floor(a_max_population);
		
		a_residencecst = Math.floor(10*a_residence/4+50);
		document.getElementById("a_residencecst").innerHTML = Math.floor(a_residencecst);
		a_residencestonecst = Math.floor(10*a_residence/4+10);
		document.getElementById("a_residencestonecst").innerHTML = Math.floor(a_residencestonecst);
	}
}

/* Function Workers */

function adjustLumberjack() {
	
	if (a_food >= 5) {
		if (a_max_population > a_population) {
			if (a_max_lumejack > a_lumejack) {
				a_food -= 5;
				document.getElementById("a_food").innerHTML = Math.floor(a_food);
				a_population += 1;
				document.getElementById("a_population").innerHTML = Math.floor(a_population);
				a_lumejack += 1;
				document.getElementById("a_lumejack").innerHTML = Math.floor(a_lumejack);
			}
		}
	}
}

function adjustMiner() {
	
	if (a_food >= 5) {
		if (a_max_population > a_population) {
			if (a_max_miner > a_miner) {
				a_food -= 5;
				document.getElementById("a_food").innerHTML = Math.floor(a_food);
				a_population += 1;
				document.getElementById("a_population").innerHTML = Math.floor(a_population);
				a_miner += 1;
				document.getElementById("a_miner").innerHTML = Math.floor(a_miner);
			}
		}
	}
}

function adjustFarmer() {
	
	if (a_food >= 5) {
		if (a_max_population > a_population) {
			if (a_max_farmer> a_farmer) {
				a_food -= 5;
				document.getElementById("a_food").innerHTML = Math.floor(a_food);
				a_population += 1;
				document.getElementById("a_population").innerHTML = Math.floor(a_population);
				a_farmer += 1;
				document.getElementById("a_farmer").innerHTML = Math.floor(a_farmer);
			}
		}
	}
}

function getCitizen() {
	
	if (a_food >= 10) {
		if (a_max_population > a_population) {
			a_food -= 10;
			document.getElementById("a_food").innerHTML = Math.floor(a_food);
			a_population += 1;
			document.getElementById("a_population").innerHTML = Math.floor(a_population);
			a_citizens += 1;
			document.getElementById("a_citizens").innerHTML = Math.floor(a_citizens);
			
		}
	}
}

/* Trades */

function tradeEmeralds() {
	if (a_coins >= 200) {
		a_coins -= 200;
		document.getElementById("a_coins").innerHTML = Math.floor(a_coins);
		a_emeralds += 1;
		document.getElementById("a_emeralds").innerHTML = Math.floor(a_emeralds);
	}
}

function tradeAchivementMap() {
	if (a_emeralds >= 15) {
		a_emeralds -= 15;
		document.getElementById("a_emeralds").innerHTML = Math.floor(a_emeralds);
		document.getElementById('achivements').style.display = 'block'
		document.getElementById('tradeachivementmap').style.display = 'none'
		
	}
}

/* Upgreades */

function buyWoodUpgrade() {
	if (a_wood >= 50 && a_stone >= 100 && a_woodupgrade == 1) {
		a_wood -= 50;
		document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
		a_stone -= 100;
		document.getElementById("a_stone").innerHTML = Math.floor(a_stone);
		a_woodupgrade = 2;
		document.getElementById('holz1').style.display= 'none';
	}
	if (document.getElementById('metal0').style.display == 'none') {
		document.getElementById('achivements').style.display = 'none'
	}
}

function buyMetalUpgrade() {
	if (a_wood >= 100 && a_stone >= 500 && a_metalupgrade == 1) {
		a_wood -= 100;
		document.getElementById("a_wood").innerHTML = Math.floor(a_wood);
		a_stone -= 500;
		document.getElementById("a_stone").innerHTML = Math.floor(a_stone);
		a_metalupgrade = 2;
		document.getElementById('metal0').style.display= 'none';
	}
	if (document.getElementById('holz1').style.display == 'none') {
		document.getElementById('achivements').style.display = 'none'
	}
}


window.setInterval(function() {
	
	addWood(a_lumejack*a_woodupgrade);
	addStone(a_miner);
	addMetal(a_miner*(a_metalupgrade-1));
	addFood(a_farmer);
	addGold(a_citizens);
	
	if (document.getElementById('marketsquare').style.display == 'none' && a_coins >= 20) {
		document.getElementById('marketsquare').style.display = 'block';
	}
	if (document.getElementById('populace').style.display == 'none' && (a_lumberhod >= 1 || a_mine >= 1 || a_farm >= 1)) {
		document.getElementById('populace').style.display = 'block';
	}
	if (document.getElementById('lumberjack').style.display == 'none' && a_lumberhod >= 1) {
		document.getElementById('lumberjack').style.display = 'block';
	}
	if (document.getElementById('miner').style.display == 'none' && a_mine >= 1) {
		document.getElementById('miner').style.display = 'block';
	}
	if (document.getElementById('farmer').style.display == 'none' && a_farm >= 1) {
		document.getElementById('farmer').style.display = 'block';
	}
	if (document.getElementById('citizen').style.display == 'none' && a_farm >= 1 && a_food >= 10) {
		document.getElementById('citizen').style.display = 'block';
	}
	
	
			Push.create("Willkommen auf Role-Play-Game", {
				body: "Dieses Spiel ist ein Taktisches Spiel!",
				icon: "https://fotos.verwaltungsportal.de/seitengenerator/gross/logo_platzhalter.png",
				timeout: 4000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
	
	
	
	
	
}, 50 / speed);