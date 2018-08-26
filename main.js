/* Resources */

var holzmenge = 10;
var steinmenge = 0;
var metalmenge = 0;
var nahrungmenge = 0;
var goldmenge = 0;
var smaragdmenge = 0;

/* Bevoelkerung */

var bevoelkerung = 0;
var freiebevoelkerung = 5;

/* Buildings */

var lumberhod = 0;
var mine = 0;
var farmerhod = 0;
var residence = 0;

var lumberhodcst = Math.floor(10*lumberhod/4+10);
var minecst = Math.floor(10*lumberhod/4+10);
var farmerhodcst = Math.floor(10*lumberhod/4+10);
var residencecst = Math.floor(10*lumberhod/4+10);
var residencestonecst = Math.floor(10*lumberhod/4+10);

/* Levels */

var lumberhodlvl = 1;
var minelvl = 1;
var farmerhodlvl = 1;
var residencelvl = 1;

/* Function Add Resources */

function addWood(i) {
	holzmenge += i;
	document.getElementById("holzmenge").innerHTML = holzmenge;
}
function addStone(i) {
	steinmenge += i;
	document.getElementById("steinmenge").innerHTML = steinmenge;
}
function addOneMetal() {
	metalmenge += 1;
	document.getElementById("metalmenge").innerHTML = metalmenge;
}
function addFood(i) {
	nahrungmenge += i;
	document.getElementById("nahrungmenge").innerHTML = nahrungmenge;
}
function addOneGold() {
	goldmenge += 1;
	document.getElementById(goldmenge).innerHTML = goldmenge;
}
function addOneSmaragd() {
	smaragdmenge += 1;
	document.getElementById("smaragdmenge").innerHTML = smaragdmenge;
}

/* Function Build Buildings */

function addOneLumberHod() {
	
	if (holzmenge >= lumberhodcst) {
		holzmenge -= lumberhodcst;
		document.getElementById("holzmenge").innerHTML = holzmenge;
		lumberhod += 1;
		document.getElementById("lumberhod").innerHTML = lumberhod;
		lumberhodcst = Math.floor(10*lumberhod/4+10);
		document.getElementById("lumberhodcst").innerHTML = lumberhodcst;
	}
}

function addOneMine() {
	
	if (holzmenge >= Math.floor(10*mine/4+20)) {
		holzmenge -= Math.floor(10*mine/4+20);
		document.getElementById("holzmenge").innerHTML = holzmenge;
		mine += 1;
		document.getElementById("mine").innerHTML = mine;
		minecst = Math.floor(10*mine/4+20);
		document.getElementById("minecst").innerHTML = minecst;
	}
}

function addOneFarmerHod() {
	
	if (holzmenge >= Math.floor(10*farmerhod/4+40)) {
		holzmenge -= Math.floor(10*farmerhod/4+40);
		document.getElementById("holzmenge").innerHTML = holzmenge;
		farmerhod += 1;
		document.getElementById("farmerhod").innerHTML = farmerhod;
		farmerhodcst = Math.floor(10*farmerhod/4+40);
		document.getElementById("farmerhodcst").innerHTML = farmerhodcst;
	}
}

function addOneResidence() {
	
	if (holzmenge >= Math.floor(10*residence/4+50) && steinmenge >= Math.floor(10*residence/4+10) ) {
		holzmenge -= Math.floor(10*residence/4+50);
		document.getElementById("holzmenge").innerHTML = holzmenge;
		steinmenge -= Math.floor(10*residence/4+10);
		document.getElementById("steinmenge").innerHTML = steinmenge;
		residence += 1;
		document.getElementById("residence").innerHTML = residence;
		freiebevoelkerung += 5;
		document.getElementById("freiebevoelkerung").innerHTML = freiebevoelkerung;
		
		residencecst = Math.floor(10*residence/4+50);
		document.getElementById("residencecst").innerHTML = residencecst;
		residencestonecst = Math.floor(10*residence/4+10);
		document.getElementById("residencestonecst").innerHTML = residencestonecst;
	}
}


window.setInterval(function() {
	
	addWood(lumberhod);
	addStone(mine);
	addFood(farmerhod);
	
}, 100);