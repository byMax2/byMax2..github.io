/* Resources */

var holzmenge = 10;
var steinmenge = 0;
var metalmenge = 0;
var nahrungmenge = 20;
var goldmenge = 0;
var smaragdmenge = 0;

/* Bevoelkerung */

var bevoelkerung = 0;
var maxbevoelkerung = 5;

var holzfaellermax = 0;
var mienenarbeitermax = 0;
var farmermax = 0;

var holzfaellermenge = 0;
var mienenarbeitermenge = 0;
var farmermenge = 0;
var buergermenge = 0;

var geschwindigkeit = 100;

/* Buildings */

var lumberhod = 0;
var mine = 0;
var farmerhod = 0;
var residence = 0;

var lumberhodcst = Math.floor(10*lumberhod/4+10);
var minecst = Math.floor(10*mine/4+20);
var farmerhodcst = Math.floor(10*farmerhod/4+40);
var residencecst = Math.floor(10*residence/4+50);
var residencestonecst = Math.floor(10*residence/4+10);

/* Levels */

var lumberhodlvl = 1;
var minelvl = 1;
var farmerhodlvl = 1;
var residencelvl = 1;

var holzupgrade = 1;
var metalupgrade = 1;

/* Function Add Resources */

function addWood(i) {
	holzmenge += i / geschwindigkeit;
	document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
}
function addStone(i) {
	steinmenge += i / geschwindigkeit;
	document.getElementById("steinmenge").innerHTML = Math.floor(steinmenge);
}
function addMetal(i) {
	metalmenge += (i / geschwindigkeit)/2;
	document.getElementById("metalmenge").innerHTML = Math.floor(metalmenge);
}
function addFood(i) {
	nahrungmenge += i / geschwindigkeit;
	document.getElementById("nahrungmenge").innerHTML = Math.floor(nahrungmenge);
}
function addGold(i) {
	goldmenge += i / geschwindigkeit;
	document.getElementById("goldmenge").innerHTML = Math.floor(goldmenge);
}
function addSmaragd(i) {
	smaragdmenge += i / geschwindigkeit;
	document.getElementById("smaragdmenge").innerHTML = Math.floor(smaragdmenge);
}

/* Function Build Buildings */

function addOneLumberHod() {
	
	if (holzmenge >= lumberhodcst) {
		holzmenge -= lumberhodcst;
		document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
		lumberhod += 1;
		document.getElementById("lumberhod").innerHTML = Math.floor(lumberhod);
		lumberhodcst = Math.floor(10*lumberhod/4+10);
		document.getElementById("lumberhodcst").innerHTML = Math.floor(lumberhodcst);
		holzfaellermax += 2;
		document.getElementById("holzfaellermax").innerHTML = Math.floor(holzfaellermax);
	}
}

function addOneMine() {
	
	if (holzmenge >= minecst) {
		holzmenge -= minecst;
		document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
		mine += 1;
		document.getElementById("mine").innerHTML = Math.floor(mine);
		minecst = Math.floor(10*mine/4+20);
		document.getElementById("minecst").innerHTML = Math.floor(minecst);
		mienenarbeitermax += 2;
		document.getElementById("mienenarbeitermax").innerHTML = Math.floor(mienenarbeitermax);
	}
}

function addOneFarmerHod() {
	
	if (holzmenge >= farmerhodcst) {
		holzmenge -= farmerhodcst;
		document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
		farmerhod += 1;
		document.getElementById("farmerhod").innerHTML = Math.floor(farmerhod);
		farmerhodcst = Math.floor(10*farmerhod/4+40);
		document.getElementById("farmerhodcst").innerHTML = Math.floor(farmerhodcst);
		farmermax += 2;
		document.getElementById("farmermax").innerHTML = Math.floor(farmermax);
	}
}

function addOneResidence() {
	
	if (holzmenge >= residencecst && steinmenge >= residencestonecst) {
		holzmenge -= residencecst;
		document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
		steinmenge -= residencestonecst;
		document.getElementById("steinmenge").innerHTML = Math.floor(steinmenge);
		residence += 1;
		document.getElementById("residence").innerHTML = Math.floor(residence);
		maxbevoelkerung += 5;
		document.getElementById("maxbevoelkerung").innerHTML = Math.floor(maxbevoelkerung);
		
		residencecst = Math.floor(10*residence/4+50);
		document.getElementById("residencecst").innerHTML = Math.floor(residencecst);
		residencestonecst = Math.floor(10*residence/4+10);
		document.getElementById("residencestonecst").innerHTML = Math.floor(residencestonecst);
	}
}

/* Function Buy Workers */

function Holzfaellereinstellen() {
	
	if (nahrungmenge >= 5) {
		if (maxbevoelkerung > bevoelkerung) {
			if (holzfaellermax > holzfaellermenge) {
				nahrungmenge -= 5;
				document.getElementById("nahrungmenge").innerHTML = Math.floor(nahrungmenge);
				bevoelkerung += 1;
				document.getElementById("bevoelkerung").innerHTML = Math.floor(bevoelkerung);
				holzfaellermenge += 1;
				document.getElementById("holzfaellermenge").innerHTML = Math.floor(holzfaellermenge);
			}
		}
	}
}

function Mienenarbeitereinstellen() {
	
	if (nahrungmenge >= 5) {
		if (maxbevoelkerung > bevoelkerung) {
			if (mienenarbeitermax > mienenarbeitermenge) {
				nahrungmenge -= 5;
				document.getElementById("nahrungmenge").innerHTML = Math.floor(nahrungmenge);
				bevoelkerung += 1;
				document.getElementById("bevoelkerung").innerHTML = Math.floor(bevoelkerung);
				mienenarbeitermenge += 1;
				document.getElementById("mienenarbeitermenge").innerHTML = Math.floor(mienenarbeitermenge);
			}
		}
	}
}

function Farmereinstellen() {
	
	if (nahrungmenge >= 5) {
		if (maxbevoelkerung > bevoelkerung) {
			if (farmermax> farmermenge) {
				nahrungmenge -= 5;
				document.getElementById("nahrungmenge").innerHTML = Math.floor(nahrungmenge);
				bevoelkerung += 1;
				document.getElementById("bevoelkerung").innerHTML = Math.floor(bevoelkerung);
				farmermenge += 1;
				document.getElementById("farmermenge").innerHTML = Math.floor(farmermenge);
			}
		}
	}
}

function Buergerholen() {
	
	if (nahrungmenge >= 10) {
		if (maxbevoelkerung > bevoelkerung) {
			nahrungmenge -= 10;
			document.getElementById("nahrungmenge").innerHTML = Math.floor(nahrungmenge);
			bevoelkerung += 1;
			document.getElementById("bevoelkerung").innerHTML = Math.floor(bevoelkerung);
			buergermenge += 1;
			document.getElementById("buergermenge").innerHTML = Math.floor(buergermenge);
			
		}
	}
}

/* Erweiterungen */

function buyWoodUpgrade() {
	if (holzmenge >= 50 && steinmenge >= 100 && holzupgrade == 1) {
		holzmenge -= 50;
		document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
		steinmenge -= 100;
		document.getElementById("steinmenge").innerHTML = Math.floor(steinmenge);
		holzupgrade = 2;
		document.getElementById('holz1').style.visibility= 'hidden';
	}
}

function buyMetalUpgrade() {
	if (holzmenge >= 100 && steinmenge >= 500 && metalupgrade == 1) {
		holzmenge -= 100;
		document.getElementById("holzmenge").innerHTML = Math.floor(holzmenge);
		steinmenge -= 500;
		document.getElementById("steinmenge").innerHTML = Math.floor(steinmenge);
		metalupgrade = 2;
		document.getElementById('metal0').style.visibility= 'hidden';
	}
}


window.setInterval(function() {
	
	addWood(holzfaellermenge*holzupgrade);
	addStone(mienenarbeitermenge);
	addMetal(mienenarbeitermenge*(metalupgrade-1));
	addFood(farmermenge);
	addGold(buergermenge);
	
}, 50 / geschwindigkeit);