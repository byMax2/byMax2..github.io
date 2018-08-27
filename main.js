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
function addGold(i) {
	goldmenge += i;
	document.getElementById("goldmenge").innerHTML = goldmenge;
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
		holzfaellermax += 2;
		document.getElementById("holzfaellermax").innerHTML = holzfaellermax;
	}
}

function addOneMine() {
	
	if (holzmenge >= minecst) {
		holzmenge -= minecst;
		document.getElementById("holzmenge").innerHTML = holzmenge;
		mine += 1;
		document.getElementById("mine").innerHTML = mine;
		minecst = Math.floor(10*mine/4+20);
		document.getElementById("minecst").innerHTML = minecst;
		mienenarbeitermax += 2;
		document.getElementById("mienenarbeitermax").innerHTML = mienenarbeitermax;
	}
}

function addOneFarmerHod() {
	
	if (holzmenge >= farmerhodcst) {
		holzmenge -= farmerhodcst;
		document.getElementById("holzmenge").innerHTML = holzmenge;
		farmerhod += 1;
		document.getElementById("farmerhod").innerHTML = farmerhod;
		farmerhodcst = Math.floor(10*farmerhod/4+40);
		document.getElementById("farmerhodcst").innerHTML = farmerhodcst;
		farmermax += 2;
		document.getElementById("farmermax").innerHTML = farmermax;
	}
}

function addOneResidence() {
	
	if (holzmenge >= residencecst && steinmenge >= residencestonecst) {
		holzmenge -= residencecst;
		document.getElementById("holzmenge").innerHTML = holzmenge;
		steinmenge -= residencestonecst;
		document.getElementById("steinmenge").innerHTML = steinmenge;
		residence += 1;
		document.getElementById("residence").innerHTML = residence;
		maxbevoelkerung += 5;
		document.getElementById("maxbevoelkerung").innerHTML = maxbevoelkerung;
		
		residencecst = Math.floor(10*residence/4+50);
		document.getElementById("residencecst").innerHTML = residencecst;
		residencestonecst = Math.floor(10*residence/4+10);
		document.getElementById("residencestonecst").innerHTML = residencestonecst;
	}
}

/* Function Buy Workers */

function Holzfaellereinstellen() {
	
	if (nahrungmenge >= 5) {
		if (maxbevoelkerung > bevoelkerung) {
			if (holzfaellermax > holzfaellermenge) {
				nahrungmenge -= 5;
				document.getElementById("nahrungmenge").innerHTML = nahrungmenge;
				bevoelkerung += 1;
				document.getElementById("bevoelkerung").innerHTML = bevoelkerung;
				holzfaellermenge += 1;
				document.getElementById("holzfaellermenge").innerHTML = holzfaellermenge;
			}
		}
	}
}

function Mienenarbeitereinstellen() {
	
	if (nahrungmenge >= 5) {
		if (maxbevoelkerung > bevoelkerung) {
			if (mienenarbeitermax > mienenarbeitermenge) {
				nahrungmenge -= 5;
				document.getElementById("nahrungmenge").innerHTML = nahrungmenge;
				bevoelkerung += 1;
				document.getElementById("bevoelkerung").innerHTML = bevoelkerung;
				mienenarbeitermenge += 1;
				document.getElementById("mienenarbeitermenge").innerHTML = mienenarbeitermenge;
			}
		}
	}
}

function Farmereinstellen() {
	
	if (nahrungmenge >= 5) {
		if (maxbevoelkerung > bevoelkerung) {
			if (farmermax> farmermenge) {
				nahrungmenge -= 5;
				document.getElementById("nahrungmenge").innerHTML = nahrungmenge;
				bevoelkerung += 1;
				document.getElementById("bevoelkerung").innerHTML = bevoelkerung;
				farmermenge += 1;
				document.getElementById("farmermenge").innerHTML = farmermenge;
			}
		}
	}
}

function Buergerholen() {
	
	if (nahrungmenge >= 10) {
		if (maxbevoelkerung > bevoelkerung) {
			nahrungmenge -= 10;
			document.getElementById("nahrungmenge").innerHTML = nahrungmenge;
			bevoelkerung += 1;
			document.getElementById("bevoelkerung").innerHTML = bevoelkerung;
			buergermenge += 1;
			document.getElementById("buergermenge").innerHTML = buergermenge;
			
		}
	}
}

window.setInterval(function() {
	
	addWood(holzfaellermenge);
	addStone(mienenarbeitermenge);
	addFood(farmermenge);
	addGold(buergermenge);
	
}, 5000);