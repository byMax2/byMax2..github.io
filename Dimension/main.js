class Player {
	constructor(tempdimnumber, dimshifts, shift_dims_req, dimboosts, boost_dims_req, unlocked_theories, unlocked_sresets, dzerobonus_cur, dzerobonus_max, dzerobonus_perclick, dzerobonus_drain) {
		this.tempdimnumber = tempdimnumber;
		this.dimshifts = dimshifts;
		this.shift_dims_req = shift_dims_req;
		this.dimboosts = dimboosts;
		this.boost_dims_req = boost_dims_req;
		this.unlocked_theories = unlocked_theories;
		this.unlocked_sresets = unlocked_sresets;
		this.dzerobonus_cur = dzerobonus_cur;
		this.dzerobonus_max = dzerobonus_max;
		this.dzerobonus_perclick = dzerobonus_perclick;
		this.dzerobonus_drain = dzerobonus_drain;
	}
}

class Resource {
	constructor(name, amount, persec) {
		this.name = name;
		this.amount = amount;
		this.persec = persec;
  }
}

class Building {
	constructor(unlocked, name, cost, amount, purchased, desc, persec, multiplier, theoriemult, totalmult) {
		this.unlocked = unlocked;
		this.name = name;
		this.cost = cost;
		this.amount = amount;
		this.purchased = purchased;
		this.desc = desc;
		this.persec = persec;
		this.multiplier = multiplier;
		this.theoriemult = theoriemult;
		this.totalmult = totalmult;
  }
}

class Upgrade {
	constructor(name, cost, incr, multiplier, purchased, desc) {
		this.name = name;
		this.cost = cost;
		this.incr = incr;
		this.multiplier = multiplier;
		this.purchased = purchased;
		this.desc = desc;
	}
}

class Theorie {
	constructor(name, cost, incr, purchased, desc) {
		this.name = name;
		this.cost = cost;
		this.incr = incr;
		this.purchased = purchased;
		this.desc = desc;
	}
}
let player = [];
let resources = [];
let buildings = [];
let upgrades = [];
let theories = [];
let dmatteronboost = 0;
let gameIsPaused = 1;
let saveTimer = 0;

window.onload = function() {
	gameIsPaused = 0;
	saveTimer = 0;
	
	player = [
	new Player(0, 0, 20, 0, 30, 0, 0, 0, 100, 1, 1)
	];
	
	resources = [
	new Resource("Materie", 10, 0),
	new Resource("Dunkle Materie", 0, 0),
	new Resource("Anti-Materie", 0, 0)
	];
	
	upgrades = [
	new Upgrade("Schnellere Sekunden", 1000, 10, 1, 0, "Erhöht die Produktion aller Dimensionen um 5%")
	];
	
	buildings = [
	new Building(1, "Erste Dimension",   10, 0, 0, "Erschafft 1 Materie pro Sekunde", 0, 1, 1, 1),
	new Building(1, "Zweite Dimension",  100, 0, 0, "Erschafft alle 5 Sekunden 1 Erste Dimension", 0, 1, 1, 1),
	new Building(1, "Dritte Dimension",  1000, 0, 0, "Erschafft alle 5 Sekunden 1 Zweite Dimension", 0, 1, 1, 1),
	new Building(1, "Vierte Dimension",  100000, 0, 0, "Erschafft alle 5 Sekunden 1 Dritte Dimension", 0, 1, 1, 1),
	new Building(1, "Fünfte Dimension",  10000000, 0, 0, "Erschafft alle 5 Sekunden 1 Vierte Dimension", 0, 1, 1, 1),
	new Building(0, "Sechste Dimension", 1000000000, 0, 0, "Erschafft alle 5 Sekunden 1 Fünfte Dimension", 0, 1, 1, 1),
	new Building(0, "Siebte Dimension",  1000000000000, 0, 0, "Erschafft alle 5 Sekunden 1 Sechste Dimension", 0, 1, 1, 1),
	new Building(0, "Achte Dimension",   1000000000000000, 0, 0, "Erschafft alle 5 Sekunden 1 Siebte Dimension", 0, 1, 1, 1),
	new Building(0, "Neunte Dimension",  100000000000000000000, 0, 0, "Erschafft alle 5 Sekunden 1 Achte Dimension", 0, 1, 1, 1),
	new Building(0, "Zehnte Dimension",  1000000000000000000000000000, 0, 0, "Erschafft alle 5 Sekunden 1 Neunte Dimension", 0, 1, 1, 1),
	new Building(0, "Nullte Dimension",  0, 0, 0, "Erhöht die Geschwindigkeit der anderen Dimensionen um 2x", 0, 1, 1, 1)
	];
	
	theories = [
	new Theorie("Dim1 Boost", 6, 4, 0, "Erhöht die Produktion deiner Ersten Dimension um das 2fache"),
	new Theorie("Dim234 Boost", 3, 4, 0, "Erhöht die Produktion deiner 2, 3 und 4 Dim. um das 2fache"),
	new Theorie("Dim567 Boost", 3, 4, 0, "Erhöht die Produktion deiner 5, 6 und 7 Dim. um das 2fache"),
	new Theorie("Dim8910 Boost", 3, 4, 0, "Erhöht die Produktion deiner 8, 9 und 10 Dim. um das 2fache"),
	new Theorie("Dim9 Unlock", 25, 0, 0, "Schaltet Dimension 9 frei"), /* one time */
	new Theorie("Dim10 Unlock", 125, 0, 0, "Schaltet Dimension 10 frei"), /* one time */
	new Theorie("Dim0 maxbonus", 10, 5, 0, "Verlängert die Dauer von dem Bonus der Nullten Dimension"),
	new Theorie("Dim0 bonusmult", 45, 10, 0, "Erhöht den Bonus der Nullten Dimension um das doppelte")
	];
	
	document.getElementById("matter_name").innerHTML = resources[0].name;
	document.getElementById("dmatter_name").innerHTML = resources[1].name;
	
	document.getElementById("desc_building_0").innerHTML = buildings[10].desc;
	document.getElementById("name_building_0").innerHTML = buildings[10].name;
	
	document.getElementById("theorie_1_cost").innerHTML = theories[0].cost;
	document.getElementById("theorie_1_desc").innerHTML = theories[0].desc;
	document.getElementById("theorie_1_incr").innerHTML = theories[0].incr;
	document.getElementById("theorie_1_purchased").innerHTML = theories[0].purchased;
	
	document.getElementById("theorie_2_cost").innerHTML = theories[1].cost;
	document.getElementById("theorie_2_desc").innerHTML = theories[1].desc;
	document.getElementById("theorie_2_incr").innerHTML = theories[1].incr;
	document.getElementById("theorie_2_purchased").innerHTML = theories[1].purchased;
	
	document.getElementById("theorie_3_cost").innerHTML = theories[2].cost;
	document.getElementById("theorie_3_desc").innerHTML = theories[2].desc;
	document.getElementById("theorie_3_incr").innerHTML = theories[2].incr;
	document.getElementById("theorie_3_purchased").innerHTML = theories[2].purchased;
	
	document.getElementById("theorie_4_cost").innerHTML = theories[3].cost;
	document.getElementById("theorie_4_desc").innerHTML = theories[3].desc;
	document.getElementById("theorie_4_incr").innerHTML = theories[3].incr;
	document.getElementById("theorie_4_purchased").innerHTML = theories[3].purchased;
	
	document.getElementById("theorie_5_cost").innerHTML = theories[4].cost;
	document.getElementById("theorie_5_desc").innerHTML = theories[4].desc;
	
	document.getElementById("theorie_6_cost").innerHTML = theories[5].cost;
	document.getElementById("theorie_6_desc").innerHTML = theories[5].desc;
	
	document.getElementById("theorie_7_cost").innerHTML = theories[6].cost;
	document.getElementById("theorie_7_desc").innerHTML = theories[6].desc;
	document.getElementById("theorie_7_incr").innerHTML = theories[6].incr;
	document.getElementById("theorie_7_purchased").innerHTML = theories[6].purchased;
	
	document.getElementById("theorie_8_cost").innerHTML = theories[7].cost;
	document.getElementById("theorie_8_desc").innerHTML = theories[7].desc;
	document.getElementById("theorie_8_incr").innerHTML = theories[7].incr;
	document.getElementById("theorie_8_purchased").innerHTML = theories[7].purchased;
	
	document.getElementById("upgrade_1_cost").innerHTML = upgrades[0].cost;
	document.getElementById("upgrade_1_desc").innerHTML = upgrades[0].desc;
	document.getElementById("upgrade_1_incr").innerHTML = upgrades[0].incr;
	document.getElementById("upgrade_1_purchased").innerHTML = upgrades[0].purchased;
	
	buildings[0].desc = "Erschafft " + 				   format(buildings[0].totalmult) + " Materie pro Sekunde";
	buildings[1].desc = "Erschafft alle 5 Sekunden " + format(buildings[1].totalmult) + " Erste Dimension";
	buildings[2].desc = "Erschafft alle 5 Sekunden " + format(buildings[2].totalmult) + " Zweite Dimension";
	buildings[3].desc = "Erschafft alle 5 Sekunden " + format(buildings[3].totalmult) + " Dritte Dimension";
	buildings[4].desc = "Erschafft alle 5 Sekunden " + format(buildings[4].totalmult) + " Vierte Dimension";
	buildings[5].desc = "Erschafft alle 5 Sekunden " + format(buildings[5].totalmult) + " Fünfte Dimension";
	buildings[6].desc = "Erschafft alle 5 Sekunden " + format(buildings[6].totalmult) + " Sechste Dimension";
	buildings[7].desc = "Erschafft alle 5 Sekunden " + format(buildings[7].totalmult) + " Siebte Dimension";
	buildings[8].desc = "Erschafft alle 5 Sekunden " + format(buildings[8].totalmult) + " Achte Dimension";
	buildings[9].desc = "Erschafft alle 5 Sekunden " + format(buildings[9].totalmult) + " Neunte Dimension";
	buildings[10].desc = "Erhöht die Geschwindigkeit der anderen Dimensionen um " + format(buildings[10].totalmult) + "x";
	
	document.getElementById("desc_building_1").innerHTML = buildings[0].desc;
	document.getElementById("desc_building_2").innerHTML = buildings[1].desc;
	document.getElementById("desc_building_3").innerHTML = buildings[2].desc;
	document.getElementById("desc_building_4").innerHTML = buildings[3].desc;
	document.getElementById("desc_building_5").innerHTML = buildings[4].desc;
	document.getElementById("desc_building_6").innerHTML = buildings[5].desc;
	document.getElementById("desc_building_7").innerHTML = buildings[6].desc;
	document.getElementById("desc_building_8").innerHTML = buildings[7].desc;
	document.getElementById("desc_building_9").innerHTML = buildings[8].desc;
	document.getElementById("desc_building_10").innerHTML = buildings[9].desc;
	
	document.getElementById("cost_building_1").innerHTML = format(buildings[0].cost) + " " + resources[0].name;
	document.getElementById("cost_building_2").innerHTML = format(buildings[1].cost) + " " + resources[0].name;
	document.getElementById("cost_building_3").innerHTML = format(buildings[2].cost) + " " + resources[0].name;
	document.getElementById("cost_building_4").innerHTML = format(buildings[3].cost) + " " + resources[0].name;
	document.getElementById("cost_building_5").innerHTML = format(buildings[4].cost) + " " + resources[0].name;
	document.getElementById("cost_building_6").innerHTML = format(buildings[5].cost) + " " + resources[0].name;
	document.getElementById("cost_building_7").innerHTML = format(buildings[6].cost) + " " + resources[0].name;
	document.getElementById("cost_building_8").innerHTML = format(buildings[7].cost) + " " + resources[0].name;
	document.getElementById("cost_building_9").innerHTML = format(buildings[8].cost) + " " + resources[0].name;
	document.getElementById("cost_building_10").innerHTML = format(buildings[9].cost) + " " + resources[0].name;
	
	document.getElementById("name_building_1").innerHTML = buildings[0].name + " | " + format(buildings[0].multiplier) + "x";
	document.getElementById("name_building_2").innerHTML = buildings[1].name + " | " + format(buildings[1].multiplier) + "x";
	document.getElementById("name_building_3").innerHTML = buildings[2].name + " | " + format(buildings[2].multiplier) + "x";
	document.getElementById("name_building_4").innerHTML = buildings[3].name + " | " + format(buildings[3].multiplier) + "x";
	document.getElementById("name_building_5").innerHTML = buildings[4].name + " | " + format(buildings[4].multiplier) + "x";
	document.getElementById("name_building_6").innerHTML = buildings[5].name + " | " + format(buildings[5].multiplier) + "x";
	document.getElementById("name_building_7").innerHTML = buildings[6].name + " | " + format(buildings[6].multiplier) + "x";
	document.getElementById("name_building_8").innerHTML = buildings[7].name + " | " + format(buildings[7].multiplier) + "x";
	document.getElementById("name_building_9").innerHTML = buildings[8].name + " | " + format(buildings[8].multiplier) + "x";
	document.getElementById("name_building_10").innerHTML = buildings[9].name + " | " + format(buildings[9].multiplier) + "x";
		
	document.getElementById("dmatter_onboost").innerHTML = format(dmatteronboost);
	document.getElementById("shift_dims_required").innerHTML = format(player[0].shift_dims_req);
	document.getElementById("boost_dims_required").innerHTML = format(player[0].boost_dims_req);
	
	document.getElementById("SoftReset").style.display = "none";
	document.getElementById("Theories").style.display = "none";
	document.getElementById("Options").style.display = "none";
	document.getElementById("Upgrades").style.display = "none";
	
}

function saveToBrowser(){
	if (typeof(Storage) !== "undefined") 
	{
		gameIsPaused = 1;
		
		for (let i = 0; i < resources.length - 1; i++) {
			localStorage.setItem("Aresource" + i, Math.floor(resources[i].amount));
			localStorage.setItem("Bresource" + i, Math.floor(resources[i].persec));
		}
		for (let i = 0; i < buildings.length - 1; i++) {
			localStorage.setItem("Abuilding" + i, Math.floor(buildings[i].amount));
			localStorage.setItem("Bbuilding" + i, Math.floor(buildings[i].purchased));
			localStorage.setItem("Cbuilding" + i, Math.floor(buildings[i].persec));
			localStorage.setItem("Dbuilding" + i, buildings[i].unlocked);
			localStorage.setItem("Ebuilding" + i, buildings[i].desc);
			localStorage.setItem("Fbuilding" + i, Math.floor(buildings[i].cost));
			localStorage.setItem("Gbuilding" + i, buildings[i].multiplier);
			localStorage.setItem("Hbuilding" + i, buildings[i].theoriemult);
			localStorage.setItem("Ibuilding" + i, buildings[i].totalmult);
		}
		for (let i = 0; i < theories.length - 1; i++) {
			localStorage.setItem("Atheorie" + i, theories[i].incr);
			localStorage.setItem("Btheorie" + i, Math.floor(theories[i].purchased));
			localStorage.setItem("Ctheorie" + i, theories[i].desc);
			localStorage.setItem("Dtheorie" + i, Math.floor(theories[i].cost));
		}
		for (let i = 0; i < upgrades.length - 1; i++) {
			localStorage.setItem("Aupgrade" + i, upgrades[i].incr);
			localStorage.setItem("Bupgrade" + i, Math.floor(upgrades[i].purchased));
			localStorage.setItem("Cupgrade" + i, upgrades[i].desc);
			localStorage.setItem("Dupgrade" + i, Math.floor(upgrades[i].cost));
			localStorage.setItem("Eupgrade" + i, upgrades[i].multiplier);
		}
		localStorage.setItem("dimshifts", player[0].dimshifts);
		localStorage.setItem("dimshiftreq", player[0].shift_dims_req);
		localStorage.setItem("dimboosts", player[0].dimboosts);
		localStorage.setItem("dimboostreq", player[0].boost_dims_req);
		localStorage.setItem("tempdimnum", player[0].tempdimnumber);
		localStorage.setItem("unlockedtheories", player[0].unlocked_theories);
		localStorage.setItem("unlockedsresets", player[0].unlocked_sresets);
		
		localStorage.setItem("dzeromax", player[0].dzerobonus_max);
		localStorage.setItem("dzeropcl", player[0].dzerobonus_perclick);
		localStorage.setItem("dzerodrn", player[0].dzerobonus_drain);
		
		gameIsPaused = 0;
	} else {
		console.log("i broke on saving");
	}
}

function loadFromBrowser(){
	if (typeof(Storage) !== "undefined") 
	{
		gameIsPaused = 1;
		
		for (let i = 0; i < resources.length - 1; i++) {
			resources[i].amount = parseInt(localStorage.getItem("Aresource" + i), 10);
			resources[i].persec = parseInt(localStorage.getItem("Bresource" + i), 10);
		}
		for (let i = 0; i < buildings.length - 1; i++) 	
		{
			buildings[i].amount = parseInt(localStorage.getItem("Abuilding" + i), 10);
			buildings[i].purchased = parseInt(localStorage.getItem("Bbuilding" + i), 10);
			buildings[i].persec = parseInt(localStorage.getItem("Cbuilding" + i), 10);
			buildings[i].unlocked = localStorage.getItem("Dbuilding" + i);
			buildings[i].desc = localStorage.getItem("Ebuilding" + i);
			buildings[i].cost = parseInt(localStorage.getItem("Fbuilding" + i), 10);
			buildings[i].multiplier = parseFloat(localStorage.getItem("Gbuilding" + i));
			buildings[i].theoriemult = parseFloat(localStorage.getItem("Hbuilding" + i));
			buildings[i].totalmult = parseFloat(localStorage.getItem("Ibuilding" + i));
		}
		for (let i = 0; i < theories.length - 1; i++) 	
		{
			theories[i].incr = parseFloat(localStorage.getItem("Atheorie" + i));
			theories[i].purchased = parseInt(localStorage.getItem("Btheorie" + i), 10);
			theories[i].desc = localStorage.getItem("Ctheorie" + i);
			theories[i].cost = parseInt(localStorage.getItem("Dtheorie" + i), 10);
		}
		for (let i = 0; i < upgrades.length - 1; i++) 	
		{
			upgrades[i].incr = parseFloat(localStorage.getItem("Aupgrade" + i));
			upgrades[i].purchased = parseInt(localStorage.getItem("Bupgrade" + i), 10);
			upgrades[i].desc = localStorage.getItem("Cupgrade" + i);
			upgrades[i].cost = parseInt(localStorage.getItem("Dupgrade" + i), 10);
			upgrades[i].multiplier = parseFloat(localStorage.getItem("Eupgrade" + i));
		}
		player[0].dimshifts = parseInt(localStorage.getItem("dimshifts"));
		player[0].dimboosts = parseInt(localStorage.getItem("dimboosts"));
		player[0].shift_dims_req = parseInt(localStorage.getItem("dimshiftreq"));
		player[0].boost_dims_req = parseInt(localStorage.getItem("dimboostreq"));
		player[0].tempdimnumber = parseInt(localStorage.getItem("tempdimnum"));
		player[0].unlocked_theories = parseInt(localStorage.getItem("unlockedtheories"));
		player[0].unlocked_sresets = parseInt(localStorage.getItem("unlockedsresets"));
		
		
		player[0].dzerobonus_max = parseInt(localStorage.getItem("dzeromax"),10 );
		player[0].dzerobonus_perclick = parseInt(localStorage.getItem("dzeropcl"),10 );
		player[0].dzerobonus_drain = parseInt(localStorage.getItem("dzerodrn"),10 );
		
		gameIsPaused = 0;
	} else {
		console.log("i broke on loading");
	}
}

function format(input){
	suffix = ["", "K", "M", "B", "T", "Aa", "Ab", "Ac", "Ad", "Ae", "Af", "Ag", "Ah", "Ai", "Aj", "Ak", "Al", "Am", "An", "Ao", "Ap", "Aq", "Ar", "As", "At", "Au", "Av", "Aw", "Ax", "Ay", "Az", "Ba", "Bb", "Bc", "Bd", "Be", "Bf", "Bg", "Bh", "Bi", "Bj", "Bk", "Bl", "Bm", "Bn", "Bo", "Bp", "Bq", "Br", "Bs", "Bt", "Bu", "Bv", "Bw", "Bx", "By", "Bz", "Ca", "Cb", "Cc", "Cd", "Ce", "Cf", "Cg", "Ch", "Ci", "Cj", "Ck", "Cl", "Cm", "Cn", "Co", "Cp", "Cq", "Cr", "Cs", "Ct", "Cu", "Cv", "Cw", "Cx", "Cy", "Cz"];
	let logResult = Math.floor(Math.log10(input) / (3 * Math.log10(10)));
	if (input <= 999 && input > 0) {logResult = 0;}
	if (input <= 0) {return 0;}
	return (Math.floor(input / Math.pow(1000, logResult),3)).toString() + " " + suffix[logResult];
}

function getHighestDimension(){
	if (buildings[0].unlocked >= 1){
		if (buildings[1].unlocked >= 1){
			if (buildings[2].unlocked >= 1){
				if (buildings[3].unlocked >= 1){
					if (buildings[4].unlocked >= 1){
						if (buildings[5].unlocked >= 1){
							if (buildings[6].unlocked >= 1){
								if (buildings[7].unlocked >= 1){
									if (buildings[8].unlocked >= 1){
										if (buildings[9].unlocked >= 1){
											return 10;}
										return 9;}
									return 8;}
								return 7;}
							return 6;}
						return 5;}
					return 4;}
				return 3;}
			return 2;}
		return 1;
	} else {return 0;}
}

function sreset_stats() {
	for (let i = 0; i < buildings.length - 1; i++) 
	{
		buildings[i].amount = 0;
		buildings[i].purchased = 0;
		buildings[i].persec = 0;
	}
	for (let i = 0; i < upgrades.length; i++) {
		upgrades[i].cost = 1000;
		upgrades[i].purchased = 0;
		upgrades[i].multiplier = 1;
	}
	buildings[0].cost = 10;
	buildings[1].cost = 100;
	buildings[2].cost = 1000;
	buildings[3].cost = 100000;
	buildings[4].cost = 10000000;
	buildings[5].cost = 1000000000;
	buildings[6].cost = 1000000000000;
	buildings[7].cost = 1000000000000000;
	buildings[8].cost = 100000000000000000000;
	buildings[9].cost = 1000000000000000000000000000;
	
	if (theories[4].purchased >= 1) {
		buildings[8].unlocked = 1;
	}
	if (theories[5].purchased >= 1) {
		buildings[9].unlocked = 1;
	}
	
	resources[0].amount = 10;
	resources[0].persec = 0;
	
	document.getElementById("cost_building_1").innerHTML = format(buildings[0].cost) + " " + resources[0].name;
	document.getElementById("cost_building_2").innerHTML = format(buildings[1].cost) + " " + resources[0].name;
	document.getElementById("cost_building_3").innerHTML = format(buildings[2].cost) + " " + resources[0].name;
	document.getElementById("cost_building_4").innerHTML = format(buildings[3].cost) + " " + resources[0].name;
	document.getElementById("cost_building_5").innerHTML = format(buildings[4].cost) + " " + resources[0].name;
	document.getElementById("cost_building_6").innerHTML = format(buildings[5].cost) + " " + resources[0].name;
	document.getElementById("cost_building_7").innerHTML = format(buildings[6].cost) + " " + resources[0].name;
	document.getElementById("cost_building_8").innerHTML = format(buildings[7].cost) + " " + resources[0].name;
	document.getElementById("cost_building_9").innerHTML = format(buildings[8].cost) + " " + resources[0].name;
	document.getElementById("cost_building_10").innerHTML = format(buildings[9].cost) + " " + resources[0].name;
	
	buildings[0].desc = "Erschafft " + 				   format(buildings[0].totalmult) + " Materie pro Sekunde";
	buildings[1].desc = "Erschafft alle 5 Sekunden " + format(buildings[1].totalmult) + " Erste Dimension";
	buildings[2].desc = "Erschafft alle 5 Sekunden " + format(buildings[2].totalmult) + " Zweite Dimension";
	buildings[3].desc = "Erschafft alle 5 Sekunden " + format(buildings[3].totalmult) + " Dritte Dimension";
	buildings[4].desc = "Erschafft alle 5 Sekunden " + format(buildings[4].totalmult) + " Vierte Dimension";
	buildings[5].desc = "Erschafft alle 5 Sekunden " + format(buildings[5].totalmult) + " Fünfte Dimension";
	buildings[6].desc = "Erschafft alle 5 Sekunden " + format(buildings[6].totalmult) + " Sechste Dimension";
	buildings[7].desc = "Erschafft alle 5 Sekunden " + format(buildings[7].totalmult) + " Siebte Dimension";
	buildings[8].desc = "Erschafft alle 5 Sekunden " + format(buildings[8].totalmult) + " Achte Dimension";
	buildings[9].desc = "Erschafft alle 5 Sekunden " + format(buildings[9].totalmult) + " Neunte Dimension";
	buildings[10].desc = "Erhöht die Geschwindigkeit der anderen Dimensionen um " + format(buildings[10].totalmult) + "x";
	
	document.getElementById("sreset_dimShift").disabled = false;
	document.getElementById("dmatter_owned").innerHTML = format(resources[1].amount);
}

function dimShift()
{
	if (buildings[4 + player[0].tempdimnumber].purchased >= player[0].shift_dims_req) {
		player[0].tempdimnumber += 1;
		player[0].dimshifts += 1;
		sreset_stats();
		buildings[getHighestDimension()].unlocked = 1;
		
		for (let i = 0; i < buildings.length - 1; i++) {
			buildings[i].multiplier = 1;
		}
		for (let i = 0; i < player[0].dimboosts; i++) {
			for (let j = 0; j < buildings.length - 1; j++)
			{
				buildings[j].multiplier *= 2;
			}
		}
		saveToBrowser();
	}
}

function dimBoost()
{
	if (buildings[7].purchased >= player[0].boost_dims_req) {
		player[0].tempdimnumber = 0;
		player[0].dimboosts += 1;
		for (let i = 5; i < buildings.length - 3; i++){	
			buildings[i].unlocked = 0;
		}
		sreset_stats();
		buildings[10].unlocked = 1;
		resources[1].amount += dmatteronboost;
		
		for (let i = 0; i < buildings.length - 1; i++) {
			buildings[i].multiplier = 1;
		}
		for (let i = 0; i < player[0].dimboosts; i++) {
			for (let j = 0; j < buildings.length - 1; j++)
			{
				buildings[j].multiplier *= 2;
			}
		}
		saveToBrowser();
	}
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function clickDimZero()
{
	if (player[0].dzerobonus_cur >= player[0].dzerobonus_max)
	{
		player[0].dzerobonus_cur = player[0].dzerobonus_max;
	} else {
		player[0].dzerobonus_cur += player[0].dzerobonus_perclick;
	}	
}

function buyUpgrade(index)
{
	
	if (resources[0].amount >= upgrades[index - 1].cost)
	{
		resources[0].amount -= upgrades[index - 1].cost;
		upgrades[index-1].cost *= upgrades[index-1].incr;
		upgrades[index-1].purchased += 1;
		if (index == 1)
		{
			upgradeGlobalMultiplier();
		}
		document.getElementById("upgrade_1_cost").innerHTML = format(upgrades[0].cost);
		document.getElementById("upgrade_1_desc").innerHTML = upgrades[0].desc;
		document.getElementById("upgrade_1_incr").innerHTML = upgrades[0].incr;
		document.getElementById("upgrade_1_purchased").innerHTML = upgrades[0].purchased;
	}
}

function buyTheorie(index)
{
	
	if (resources[1].amount >= theories[index - 1].cost)
	{
		resources[1].amount -= theories[index - 1].cost;
		theories[index - 1].cost *= theories[index - 1].incr;
		theories[index - 1].purchased += 1;
		if (index == 1) 
		{
			buildings[0].theoriemult *= 2;
		}
		if (index == 2) 
		{
			buildings[1].theoriemult *= 2;
			buildings[2].theoriemult *= 2;
			buildings[3].theoriemult *= 2;
		}
		if (index == 3) 
		{
			buildings[4].theoriemult *= 2;
			buildings[5].theoriemult *= 2;
			buildings[6].theoriemult *= 2;
		}
		if (index == 4) 
		{
			buildings[7].theoriemult *= 2;
			buildings[8].theoriemult *= 2;
			buildings[9].theoriemult *= 2;
		}
		if (index == 5) {
			buildings[8].unlocked = 1;
		}
		if (index == 6) {
			buildings[9].unlocked = 1;
		}
		if (index == 7) {
			player[0].dzerobonus_drain *= 1.25;
		}
		if (index == 8) {
			buildings[10].theoriemult *= 1.75;
		}
		
		document.getElementById("theorie_1_cost").innerHTML = theories[0].cost;
		document.getElementById("theorie_1_desc").innerHTML = theories[0].desc;
		document.getElementById("theorie_1_incr").innerHTML = theories[0].incr;
		document.getElementById("theorie_1_purchased").innerHTML = theories[0].purchased;
		
		document.getElementById("theorie_2_cost").innerHTML = theories[1].cost;
		document.getElementById("theorie_2_desc").innerHTML = theories[1].desc;
		document.getElementById("theorie_2_incr").innerHTML = theories[1].incr;
		document.getElementById("theorie_2_purchased").innerHTML = theories[1].purchased;
		
		document.getElementById("theorie_3_cost").innerHTML = theories[2].cost;
		document.getElementById("theorie_3_desc").innerHTML = theories[2].desc;
		document.getElementById("theorie_3_incr").innerHTML = theories[2].incr;
		document.getElementById("theorie_3_purchased").innerHTML = theories[2].purchased;
		
		document.getElementById("theorie_4_cost").innerHTML = theories[3].cost;
		document.getElementById("theorie_4_desc").innerHTML = theories[3].desc;
		document.getElementById("theorie_4_incr").innerHTML = theories[3].incr;
		document.getElementById("theorie_4_purchased").innerHTML = theories[3].purchased;
		
		document.getElementById("theorie_5_cost").innerHTML = theories[4].cost;
		document.getElementById("theorie_5_desc").innerHTML = theories[4].desc;
		
		document.getElementById("theorie_6_cost").innerHTML = theories[5].cost;
		document.getElementById("theorie_6_desc").innerHTML = theories[5].desc;
		
		document.getElementById("theorie_7_cost").innerHTML = theories[6].cost;
		document.getElementById("theorie_7_desc").innerHTML = theories[6].desc;
		document.getElementById("theorie_7_incr").innerHTML = theories[6].incr;
		document.getElementById("theorie_7_purchased").innerHTML = theories[6].purchased;
		
		document.getElementById("theorie_8_cost").innerHTML = theories[7].cost;
		document.getElementById("theorie_8_desc").innerHTML = theories[7].desc;
		document.getElementById("theorie_8_incr").innerHTML = theories[7].incr;
		document.getElementById("theorie_8_purchased").innerHTML = theories[7].purchased;
		
		buildings[0].totalmult = buildings[0].multiplier * buildings[0].theoriemult;
			
		buildings[0].desc = "Erschafft " + 				   format(buildings[0].totalmult) + " Materie pro Sekunde";
		buildings[1].desc = "Erschafft alle 5 Sekunden " + format(buildings[1].totalmult) + " Erste Dimension";
		buildings[2].desc = "Erschafft alle 5 Sekunden " + format(buildings[2].totalmult) + " Zweite Dimension";
		buildings[3].desc = "Erschafft alle 5 Sekunden " + format(buildings[3].totalmult) + " Dritte Dimension";
		buildings[4].desc = "Erschafft alle 5 Sekunden " + format(buildings[4].totalmult) + " Vierte Dimension";
		buildings[5].desc = "Erschafft alle 5 Sekunden " + format(buildings[5].totalmult) + " Fünfte Dimension";
		buildings[6].desc = "Erschafft alle 5 Sekunden " + format(buildings[6].totalmult) + " Sechste Dimension";
		buildings[7].desc = "Erschafft alle 5 Sekunden " + format(buildings[7].totalmult) + " Siebte Dimension";
		buildings[8].desc = "Erschafft alle 5 Sekunden " + format(buildings[8].totalmult) + " Achte Dimension";
		buildings[9].desc = "Erschafft alle 5 Sekunden " + format(buildings[9].totalmult) + " Neunte Dimension";
		buildings[10].desc = "Erhöht die Geschwindigkeit der anderen Dimensionen um " + format(buildings[10].totalmult) + "x";
	
		saveToBrowser();
	}
}

function buyBuilding(index)
{
	
	if (resources[0].amount >= buildings[index].cost)
	{
		buildings[index].purchased += 1;
		buildings[index].amount += 1;
		resources[0].amount -= buildings[index].cost;
		if (buildings[index].purchased % 10 == 0)
		{
			buildings[index].multiplier *= 2;
			
			if (index == 0) {
				buildings[0].cost *= 100;
			}
			if (index == 1) {
				buildings[1].cost *= 10000;
			}
			if (index == 2) {
				buildings[2].cost *= 1000000;
			}
			if (index == 3) {
				buildings[3].cost *= 100000000;
			}
			if (index == 4) {
				buildings[4].cost *= 10000000000;
			}
			if (index == 5) {
				buildings[5].cost *= 1000000000000;
			}
			if (index == 6) {
				buildings[6].cost *= 100000000000000;
			}
			if (index == 7) {
				buildings[7].cost *= 10000000000000000;
			}
			if (index == 8) {
				buildings[8].cost *= 1000000000000000000;
			}
			if (index == 9) {
				buildings[9].cost *= 100000000000000000000;
			}
		}
	}
	
	buildings[0].desc = "Erschafft " + 				   format(buildings[0].totalmult) + " Materie pro Sekunde";
	buildings[1].desc = "Erschafft alle 5 Sekunden " + format(buildings[1].totalmult) + " Erste Dimension";
	buildings[2].desc = "Erschafft alle 5 Sekunden " + format(buildings[2].totalmult) + " Zweite Dimension";
	buildings[3].desc = "Erschafft alle 5 Sekunden " + format(buildings[3].totalmult) + " Dritte Dimension";
	buildings[4].desc = "Erschafft alle 5 Sekunden " + format(buildings[4].totalmult) + " Vierte Dimension";
	buildings[5].desc = "Erschafft alle 5 Sekunden " + format(buildings[5].totalmult) + " Fünfte Dimension";
	buildings[6].desc = "Erschafft alle 5 Sekunden " + format(buildings[6].totalmult) + " Sechste Dimension";
	buildings[7].desc = "Erschafft alle 5 Sekunden " + format(buildings[7].totalmult) + " Siebte Dimension";
	buildings[8].desc = "Erschafft alle 5 Sekunden " + format(buildings[8].totalmult) + " Achte Dimension";
	buildings[9].desc = "Erschafft alle 5 Sekunden " + format(buildings[9].totalmult) + " Neunte Dimension";
	buildings[10].desc = "Erhöht die Geschwindigkeit der anderen Dimensionen um " + format(buildings[10].totalmult) + "x";
	
	document.getElementById("desc_building_1").innerHTML = buildings[0].desc;
	document.getElementById("desc_building_2").innerHTML = buildings[1].desc;
	document.getElementById("desc_building_3").innerHTML = buildings[2].desc;
	document.getElementById("desc_building_4").innerHTML = buildings[3].desc;
	document.getElementById("desc_building_5").innerHTML = buildings[4].desc;
	document.getElementById("desc_building_6").innerHTML = buildings[5].desc;
	document.getElementById("desc_building_7").innerHTML = buildings[6].desc;
	document.getElementById("desc_building_8").innerHTML = buildings[7].desc;
	document.getElementById("desc_building_9").innerHTML = buildings[8].desc;
	document.getElementById("desc_building_10").innerHTML = buildings[9].desc;
	
	document.getElementById("cost_building_1").innerHTML = format(buildings[0].cost) + " " + resources[0].name;
	document.getElementById("cost_building_2").innerHTML = format(buildings[1].cost) + " " + resources[0].name;
	document.getElementById("cost_building_3").innerHTML = format(buildings[2].cost) + " " + resources[0].name;
	document.getElementById("cost_building_4").innerHTML = format(buildings[3].cost) + " " + resources[0].name;
	document.getElementById("cost_building_5").innerHTML = format(buildings[4].cost) + " " + resources[0].name;
	document.getElementById("cost_building_6").innerHTML = format(buildings[5].cost) + " " + resources[0].name;
	document.getElementById("cost_building_7").innerHTML = format(buildings[6].cost) + " " + resources[0].name;
	document.getElementById("cost_building_8").innerHTML = format(buildings[7].cost) + " " + resources[0].name;
	document.getElementById("cost_building_9").innerHTML = format(buildings[8].cost) + " " + resources[0].name;
	document.getElementById("cost_building_10").innerHTML = format(buildings[9].cost) + " " + resources[0].name;
	
	document.getElementById("name_building_1").innerHTML = buildings[0].name + " | " + format(buildings[0].multiplier) + "x";
	document.getElementById("name_building_2").innerHTML = buildings[1].name + " | " + format(buildings[1].multiplier) + "x";
	document.getElementById("name_building_3").innerHTML = buildings[2].name + " | " + format(buildings[2].multiplier) + "x";
	document.getElementById("name_building_4").innerHTML = buildings[3].name + " | " + format(buildings[3].multiplier) + "x";
	document.getElementById("name_building_5").innerHTML = buildings[4].name + " | " + format(buildings[4].multiplier) + "x";
	document.getElementById("name_building_6").innerHTML = buildings[5].name + " | " + format(buildings[5].multiplier) + "x";
	document.getElementById("name_building_7").innerHTML = buildings[6].name + " | " + format(buildings[6].multiplier) + "x";
	document.getElementById("name_building_8").innerHTML = buildings[7].name + " | " + format(buildings[7].multiplier) + "x";
	document.getElementById("name_building_9").innerHTML = buildings[8].name + " | " + format(buildings[8].multiplier) + "x";
	document.getElementById("name_building_10").innerHTML = buildings[9].name + " | " + format(buildings[9].multiplier) + "x";
		
	document.getElementById("dmatter_onboost").innerHTML = format(dmatteronboost);
};

function upgradeGlobalMultiplier(){
	for (let i = 0; i < buildings.length - 1; i++)
	{
		buildings[i].multiplier *= 1.05;
	}
}

window.setInterval(function(){
	if (gameIsPaused == 0) {
		saveTimer += 1;
		
		if (saveTimer >= 600) {
			saveTimer = 0;
			saveToBrowser();
		}
		
		
		if (player[0].dimshifts >= 1){player[0].unlocked_theories = 1;}
		if (buildings[0].amount >= 1000){player[0].unlocked_sresets = 1;}
		
		if (player[0].unlocked_theories == 1){
			document.getElementById("theorie_tab_button").style.display = "block";
		} else {
			document.getElementById("theorie_tab_button").style.display = "none";
		}
		
		if (player[0].unlocked_sresets == 1){
			document.getElementById("sreset_tab_button").style.display = "block";
		} else {
			document.getElementById("sreset_tab_button").style.display = "none";
		}
		
		dmatteronboost = format(1 + Math.log10(buildings[0].amount));
		document.getElementById("dmatter_onboost").innerHTML = format(dmatteronboost);
		
		if (buildings[7].unlocked == 1){
			document.getElementById("sreset_dimShift").disabled = true;
		} else {
			document.getElementById("sreset_dimShift").disabled = false;
		}
		if (theories[4].purchased == 1){
			document.getElementById("theoriedim9").style.display = "none";
		} else {
			document.getElementById("theoriedim9").style.display = "block";
		}
		if (theories[5].purchased == 1){
			document.getElementById("theoriedim10").style.display = "none";
		} else {
			document.getElementById("theoriedim10").style.display = "block";
		}
		
		if (player[0].dzerobonus_cur >= 0.1) {
			buildings[10].totalmult = buildings[10].multiplier * buildings[10].theoriemult;
		} else {
			buildings[10].totalmult = 0;
		}
		
		player[0].dzerobonus_cur -= 1 / player[0].dzerobonus_drain;
		
		if (player[0].dzerobonus_cur <= 0) {
			document.getElementById("desc_building_0").innerHTML = buildings[10].desc;
			player[0].dzerobonus_cur = 0;
		}
		document.getElementById("currentclickbonus").innerHTML = format(player[0].dzerobonus_cur);
		
		for (let i = 0; i < buildings.length - 1; i++) 
		{
		let j = 0;
		j = i + 1;
		buildings[i].totalmult = buildings[i].multiplier * buildings[i].theoriemult * (1 + buildings[10].totalmult);
		buildings[i].persec = buildings[j].amount * buildings[i].totalmult;
		buildings[i].amount += (buildings[i].persec / 60) * upgrades[0].multiplier;
		}
		buildings[0].totalmult = buildings[0].multiplier * buildings[0].theoriemult * (1 + buildings[10].totalmult);
		resources[0].persec = buildings[0].amount * buildings[0].totalmult;
		resources[0].amount += (resources[0].persec / 12) * upgrades[0].multiplier;
		
		for (let i = 0; i < buildings.length - 1; i++) {
			if (buildings[i].unlocked == 0) {
				document.getElementById("dim" + (i + 1).toString()).style.display = "none";
				
			} else {
				document.getElementById("dim" + (i + 1).toString()).style.display = "block";
			}
		}
		
		if (buildings[10].unlocked == 0) {
			document.getElementById("dim0").style.display = "none";
		} else {
			document.getElementById("dim0").style.display = "block";
		}
		
		buildings[0].desc = "Erschafft " + 				   format(buildings[0].totalmult) + " Materie pro Sekunde";
		buildings[1].desc = "Erschafft alle 5 Sekunden " + format(buildings[1].totalmult) + " Erste Dimension";
		buildings[2].desc = "Erschafft alle 5 Sekunden " + format(buildings[2].totalmult) + " Zweite Dimension";
		buildings[3].desc = "Erschafft alle 5 Sekunden " + format(buildings[3].totalmult) + " Dritte Dimension";
		buildings[4].desc = "Erschafft alle 5 Sekunden " + format(buildings[4].totalmult) + " Vierte Dimension";
		buildings[5].desc = "Erschafft alle 5 Sekunden " + format(buildings[5].totalmult) + " Fünfte Dimension";
		buildings[6].desc = "Erschafft alle 5 Sekunden " + format(buildings[6].totalmult) + " Sechste Dimension";
		buildings[7].desc = "Erschafft alle 5 Sekunden " + format(buildings[7].totalmult) + " Siebte Dimension";
		buildings[8].desc = "Erschafft alle 5 Sekunden " + format(buildings[8].totalmult) + " Achte Dimension";
		buildings[9].desc = "Erschafft alle 5 Sekunden " + format(buildings[9].totalmult) + " Neunte Dimension";
		buildings[10].desc = "Erhöht die Geschwindigkeit der anderen Dimensionen um " + format(1 + buildings[10].totalmult) + "x";
			
		
		document.getElementById("amount_building_1").innerHTML = format(buildings[0].amount) + " | " + buildings[0].purchased;
		document.getElementById("amount_building_2").innerHTML = format(buildings[1].amount) + " | " + buildings[1].purchased;
		document.getElementById("amount_building_3").innerHTML = format(buildings[2].amount) + " | " + buildings[2].purchased;
		document.getElementById("amount_building_4").innerHTML = format(buildings[3].amount) + " | " + buildings[3].purchased;
		document.getElementById("amount_building_5").innerHTML = format(buildings[4].amount) + " | " + buildings[4].purchased;
		document.getElementById("amount_building_6").innerHTML = format(buildings[5].amount) + " | " + buildings[5].purchased;
		document.getElementById("amount_building_7").innerHTML = format(buildings[6].amount) + " | " + buildings[6].purchased;
		document.getElementById("amount_building_8").innerHTML = format(buildings[7].amount) + " | " + buildings[7].purchased;
		document.getElementById("amount_building_9").innerHTML = format(buildings[8].amount) + " | " + buildings[8].purchased;
		document.getElementById("amount_building_10").innerHTML = format(buildings[9].amount) + " | " + buildings[9].purchased;
		
		document.getElementById("desc_building_1").innerHTML = buildings[0].desc;
		document.getElementById("desc_building_2").innerHTML = buildings[1].desc;
		document.getElementById("desc_building_3").innerHTML = buildings[2].desc;
		document.getElementById("desc_building_4").innerHTML = buildings[3].desc;
		document.getElementById("desc_building_5").innerHTML = buildings[4].desc;
		document.getElementById("desc_building_6").innerHTML = buildings[5].desc;
		document.getElementById("desc_building_7").innerHTML = buildings[6].desc;
		document.getElementById("desc_building_8").innerHTML = buildings[7].desc;
		document.getElementById("desc_building_9").innerHTML = buildings[8].desc;
		document.getElementById("desc_building_10").innerHTML = buildings[9].desc;
		
		document.getElementById("desc_building_0").innerHTML = buildings[10].desc;
		document.getElementById("name_building_0").innerHTML = buildings[10].name;
		document.getElementById("cost_building_0").innerHTML = (buildings[10].theoriemult * buildings[10].multiplier) * 2 + "x";
		
		document.getElementById("matter_ps").innerHTML = format(resources[0].persec);
		document.getElementById("matter_owned").innerHTML = format(resources[0].amount);
		document.getElementById("dmatter_owned").innerHTML = format(resources[1].amount);
	} else {
		console.log("currently paused");
	}
}, 100);
