let lemongame = {
	tps: 20,
	running: true,
	tabs: [0, 0, 0, 0], // Tab 1 - 4
	unlocks: [0, 0, 0], // Lemontreefield, Lemonadestand, Lemonpress
	resources: [],
	specials: [],
	buildings: [],
	upgrades: [],
}

class Lemonfield {
	constructor (treeamount, lemonamount, treelimit, lemonlimit, multiplier, cost, upgradecost, spaceperupgrade) {
		this.treeamount = treeamount || 0;
		this.lemonamount = lemonamount || 0;
		this.treelimit = treelimit || 20;
		this.lemonlimit = lemonlimit || 0;
		this.multiplier = multiplier || 1;
		this.cost = cost || 25;
		this.upgradecost = upgradecost || 200;
		this.spaceperupgrade = 20 || 20;
	}
	
	unlock() {
		lemongame.unlocks[0] = 1;
		updateWindows();
	}

	tick() {
		this.lemonlimit = 25 * this.treeamount;
		if (this.treeamount > 0) {
			document.getElementById("lemonbartext").innerHTML = lemongame.specials[0].lemonamount.toFixed(2) + " / " + lemongame.specials[0].lemonlimit;
			if (this.lemonamount < this.lemonlimit) {
				this.lemonamount += ((this.treeamount / 10) * this.multiplier) / lemongame.tps;
			}
		}
		if (this.lemonamount > this.lemonlimit) {this.lemonamount = this.lemonlimit};
	}
	
	pick() {
		if (this.lemonamount >= 1) {
			lemongame.resources[0].add(1);
			this.lemonamount -= 1;
			document.getElementById("lemontreegetlemondescription").innerHTML = "Pflücke eine der Zitronen";

			lemongame.unlocks[1] = 1;
			updateWindows();
		}
	}
	
	upgradeLimit() {
		if (lemongame.resources[1].check(this.upgradecost) == true) {
			lemongame.resources[1].sub(this.upgradecost)
			this.treelimit = this.treelimit + this.spaceperupgrade;
			this.upgradecost = this.upgradecost * 100;
			document.getElementById("lemontreelimitbuydescription").innerHTML = "Kaufe für " + this.upgradecost + " Euro, " + this.spaceperupgrade +" mehr Platz für deine Bäume";
			document.getElementById("lemontreebartext").innerHTML = this.treeamount + " / " + this.treelimit;
		} else {return;}
	}
	
	buyTree() {
		if (this.treeamount < this.treelimit) {
			if (lemongame.resources[1].check(this.cost) == true) {
				lemongame.resources[1].sub(this.cost)
				this.treeamount += 1;
				if (this.treeamount % 10 == 0 && this.treeamount != 0) {this.cost = this.cost * 10;}
				document.getElementById("lemontreebartext").innerHTML = this.treeamount + " / " + this.treelimit;
				document.getElementById("lemontreebuydescription").innerHTML = "Kaufe einen Zitronenbaum für " + this.cost + " Euro. Jeder Baum braucht 10 Sekunden für eine Zitrone";
			} else {return;}
		} else {return;}
	}
}

class Lemonstand {
	constructor (standamount, lemonamount, lemonlimit, multiplier, cost, upgradecost, timeupgradecost) {
		this.standamount = standamount || 1;
		this.lemonamount = lemonamount || 0;
		this.lemonlimit = lemonlimit || 100;
		this.multiplier = multiplier || 1;
		this.cost = cost || 0;
		this.upgradecost = upgradecost || 100;
		this.timeupgradecost = timeupgradecost || 100;


		this.level = 1;
		
		this.lemonadeprice = 2;
		this.lemonsforlemonade = 0.2;
		
		this.fame = 0;
		this.fameNextLvl = 25;
		this.lvlMultiplier = 5;
		
		this.sellCooldown = 120;
		this.timer = 0;
		this.multisell = 3;
	}
	
	unlock() {
		lemongame.unlocks[1] = 1;
		updateWindows();
	}

	tick() {
		if (this.fame >= this.fameNextLvl) {
			this.fame = this.fame - this.fameNextLvl;
			this.fameNextLvl = this.fameNextLvl * this.lvlMultiplier;
			this.lvlMultiplier ++;
			this.level ++;
			lemongame.unlocks[2] = 1;
			updateWindows();
			document.getElementById("lemonstandleveltext").innerHTML = "Limonadenlevel " + this.level;
		}
		
		if (this.timer < this.sellCooldown) {this.timer ++;} else {
			for (let i = 0; i < this.multisell; i++) {
				if (this.lemonamount > (this.lemonsforlemonade)) {
					this.lemonamount -= this.lemonsforlemonade;
					lemongame.resources[1].add(this.lemonadeprice);
					this.fame += 1 * this.multiplier;
					document.getElementById("lemonstandleveltext").innerHTML = "Limonadenlevel " + this.level;
				}
			}
			this.timer = 0;
		}
		document.getElementById("lemonstandlemonbartext").innerHTML = this.lemonamount.toFixed(1) + " / " + this.lemonlimit;
		document.getElementById("lemonstandbartext").innerHTML = this.fame + " / " + this.fameNextLvl;
	}
	
	addLemon(n) {
		if ((this.lemonamount + n) <= this.lemonlimit) {
			if (lemongame.resources[0].check(n) == true) {
				this.lemonamount ++;
				lemongame.resources[0].sub(n);
			}
		}
	}
	
	upgradeDelay() {
		if (lemongame.resources[1].check(this.timeupgradecost) == true) {
			lemongame.resources[1].sub(this.timeupgradecost)
			this.timeupgradecost = this.timeupgradecost * 10;
			if(this.sellCooldown > 10) {
				this.sellCooldown = this.sellCooldown / 4 * 3;
			} else if (this.sellCooldown == 10) {
				return;
			}
			if (this.sellCooldown < 10) {
				this.sellCooldown = 10;
			}
			document.getElementById("upgradestanddelay").innerHTML = "Verringert die Zeit zwischen Kunden für " + (this.timeupgradecost) + " Euro";
		} else {return;}
	}
	
	upgradeLimit() {
		if (lemongame.resources[1].check(this.upgradecost) == true) {
			lemongame.resources[1].sub(this.upgradecost)
			this.lemonlimit = this.lemonlimit * 2;
			this.upgradecost = this.upgradecost * 10;
			document.getElementById("lemonstandlimitbuydescription").innerHTML = "Verdopple den Platz für deine Zitronen für " + (this.upgradecost) + " Euro";
			document.getElementById("lemonstandlemonbartext").innerHTML = this.lemonamount + " / " + this.lemonlimit;
		} else {return;}
	}
	
	sellLemonade() {
		if (this.lemonamount >= this.lemonsforlemonade) {
			lemongame.resources[1].add(this.lemonadeprice);
			this.lemonamount -= this.lemonsforlemonade;
		}
	}
}

class Lemonpress {
	constructor (presslevel, lemonamount, lemonlimit, juiceamount, juicelimit, multiplier, cost) {
		this.presslevel = presslevel || 1;
		this.lemonamount = lemonamount || 0;
		this.lemonlimit = lemonlimit || 25;
		this.juiceamount = juiceamount || 0;
		this.juicelimit = juicelimit || 100;
		this.multiplier = multiplier || 1;
		this.cost = cost || 0;

		this.lemonperoperation = 0.5;
		this.juiceforlemon = 1;
		
		this.pressCooldown = 900;
		this.timer = 0;
		this.multipress = 1;

		this.manualpress = 5;
	}
	
	unlock() {
		lemongame.unlocks[2] = 1;
		updateWindows();
	}

	press() {
		if (this.timer < this.pressCooldown) {this.timer += this.manualpress}
	}

	tick() {
		if (this.lemonamount > this.lemonperoperation) {
			if (this.timer < this.pressCooldown) {this.timer ++;} else {
				for (let i = 0; i < this.multipress; i++) {
					if (this.lemonamount > (this.lemonperoperation)) {
						this.lemonamount -= this.lemonperoperation;
						this.juiceamount += this.juiceforlemon;
						document.getElementById("lemonpressjuicebartext").innerHTML = this.juiceamount.toFixed(2) + " / " + this.juicelimit;
					}
				}
				this.timer = 0;
			}
		}	
		document.getElementById("lemonpresslemonbartext").innerHTML = this.lemonamount.toFixed(1) + " / " + this.lemonlimit;
	}
	
	addLemon(n) {
		if ((this.lemonamount + n) <= this.lemonlimit) {
			if (lemongame.resources[0].check(n) == true) {
				this.lemonamount ++;
				lemongame.resources[0].sub(n);
			}
		}
	}
	
	getJuice() {
		if (this.juiceamount > 0) {
			lemongame.resources[4].add(this.juiceamount);
			this.juiceamount = 0;
			lemongame.tabs[2] = 1;
			updateButtons();

			if ((lemongame.specials[2].lemonamount / lemongame.specials[2].lemonlimit) * 100 > 100) {
				document.getElementById("lemonpresslemonbar").style.width = "100%";
			} else {
				document.getElementById("lemonpresslemonbar").style.width = (lemongame.specials[2].lemonamount / lemongame.specials[2].lemonlimit) * 100 + "%";
			}

			if ((lemongame.specials[2].timer / lemongame.specials[2].pressCooldown) * 100 > 100) {
				document.getElementById("lemonpressprogressbar").style.width = "100%";
			} else {
				document.getElementById("lemonpressprogressbar").style.width = (lemongame.specials[2].timer / lemongame.specials[2].pressCooldown) * 100 + "%";
			}
			
			if ((lemongame.specials[2].juiceamount / lemongame.specials[2].juicelimit) * 100 > 100) {
				document.getElementById("lemonpressjuicebar").style.width = "100%";
			} else {
				document.getElementById("lemonpressjuicebar").style.width = (lemongame.specials[2].juiceamount / lemongame.specials[2].juicelimit) * 100 + "%";
			}

		}
		document.getElementById("lemonpressjuicebartext").innerHTML = this.juiceamount.toFixed(2) + " / " + this.juicelimit;
	}
}

class Building {
    constructor (name, amount, multiplier, cost) {
		this.name = name;
		this.amount = amount || 0;
		this.multiplier = multiplier || 1;
		this.cost = cost || 25;
    }
}

class Resource {
    constructor (name, amount, persec, multiplier) {
		this.name = name;
		this.amount = amount || 0;
		this.persec = persec || 0;
		this.multiplier = multiplier || 1;
    }
	
	add(n) {
		this.amount += (n * this.multiplier);
	}
	
	sub(n) {
		this.amount -= (n);
	}
	
	check(n) {
		if (this.amount >= n) {return true;} else {return false;}
	}
}

class Upgrade {
	constructor (div, building, name, description, cost, costincr) {
		this.div = div;
		this.level = 0;
		this.building = building;
		this.name = name;
		this.description = description;
		this.cost = cost;
		this.costincr = costincr;
		this.visible = false;
	}

	hide(){
		document.getElementById(this.div).style.display = "none";
	}

	show() {
		document.getElementById(this.div).style.display = "block";
	}

	buy() {
		if (lemongame.resources[1].check(this.cost) == true) {
			lemongame.resources[1].sub(this.cost);
			this.level += 1;
			this.cost = this.cost * this.costincr;
			hide();
		}
	}
}

function togglePanel(panel) {
	if (document.getElementById(panel).style.display == "block") {
		document.getElementById(panel).style.display = "none";
	} else {
		document.getElementById(panel).style.display = "block";
	}
	
	if (panel == "stats") {
		document.getElementById("settings").style.display = "none";
	}
	if (panel == "settings") {
		document.getElementById("stats").style.display = "none";
	}
}

function purchaseUpgrade(building, type) {
	if (building == "lemonfield") {
		if (type == "unlock") {
			lemongame.specials[0].unlock();
		} else if (type == "limit") {
			lemongame.specials[0].upgradeLimit();
		}
	} else if (building == "lemonstand") {
		if (type == "unlock") {
			lemongame.specials[1].unlock();
			document.getElementById("statsstand").style.display = "block";
		} else if (type == "limit") {
			lemongame.specials[1].upgradeLimit();
		} else if (input == "delay") {
			lemongame.specials[1].upgradeDelay();
		}
	} else if (building == "lemonpress") {
		if (type == "unlock") {
			lemongame.specials[2].unlock();
			document.getElementById("statspress").style.display = "block";
		} else if (type == "limit") {
			lemongame.specials[2].upgradeLimit();
		}
	}
}

function purchaseThing(input) {
	if (input == "lemontree") {
		lemongame.specials[0].buyTree();
	}
}

function doThing(input) {
	if (input == "getLemon") {
		lemongame.specials[0].pick();
	} else if (input == "press") {
		lemongame.specials[2].press();
	} else if (input == "getJuice") {
		lemongame.specials[2].getJuice();
	} else if (input == "lemonToStand") {
		lemongame.specials[1].addLemon(1);
	} else if (input == "lemonToPress") {
		lemongame.specials[2].addLemon(1);
	}

	if ((lemongame.specials[0].treeamount / lemongame.specials[0].treelimit) * 100 > 100) {
		document.getElementById("lemontreebar").style.width = "100%";
	} else {
		document.getElementById("lemontreebar").style.width = (lemongame.specials[0].treeamount / lemongame.specials[0].treelimit) * 100 + "%";
	}
	
	if ((lemongame.specials[0].lemonamount / lemongame.specials[0].lemonlimit) * 100 > 100) {
		document.getElementById("lemonbar").style.width = "100%";
	} else {
		document.getElementById("lemonbar").style.width = (lemongame.specials[0].lemonamount / lemongame.specials[0].lemonlimit) * 100 + "%";
	}
	
	if ((lemongame.specials[1].fame / lemongame.specials[1].fameNextLvl) * 100 > 100) {
		document.getElementById("lemonstandbar").style.width = "100%";
	} else {
		document.getElementById("lemonstandbar").style.width = (lemongame.specials[1].fame / lemongame.specials[1].fameNextLvl) * 100 + "%";
	}
	
	if ((lemongame.specials[1].lemonamount / lemongame.specials[1].lemonlimit) * 100 > 100) {
		document.getElementById("lemonstandlemonbar").style.width = "100%";
	} else {
		document.getElementById("lemonstandlemonbar").style.width = (lemongame.specials[1].lemonamount / lemongame.specials[1].lemonlimit) * 100 + "%";
	}

	if ((lemongame.specials[2].lemonamount / lemongame.specials[2].lemonlimit) * 100 > 100) {
		document.getElementById("lemonpresslemonbar").style.width = "100%";
	} else {
		document.getElementById("lemonpresslemonbar").style.width = (lemongame.specials[2].lemonamount / lemongame.specials[2].lemonlimit) * 100 + "%";
	}

	if ((lemongame.specials[2].timer / lemongame.specials[2].pressCooldown) * 100 > 100) {
		document.getElementById("lemonpressprogressbar").style.width = "100%";
	} else {
		document.getElementById("lemonpressprogressbar").style.width = (lemongame.specials[2].timer / lemongame.specials[2].pressCooldown) * 100 + "%";
	}
	
	if ((lemongame.specials[2].juiceamount / lemongame.specials[2].juicelimit) * 100 > 100) {
		document.getElementById("lemonpressjuicebar").style.width = "100%";
	} else {
		document.getElementById("lemonpressjuicebar").style.width = (lemongame.specials[2].juiceamount / lemongame.specials[2].juicelimit) * 100 + "%";
	}
}

function updateWindows() {
	if (lemongame.unlocks[0] == 0) {
        document.getElementById("lemontreefield").style.display = "none";
    } else {
        document.getElementById("lemontreefield").style.display = "block";
	}
	
	if (lemongame.unlocks[1] == 0) {
        document.getElementById("lemonstand").style.display = "none";
    } else {
        document.getElementById("lemonstand").style.display = "block";
	}

	if (lemongame.unlocks[2] == 0) {
        document.getElementById("lemonpress").style.display = "none";
    } else {
        document.getElementById("lemonpress").style.display = "block";
	}


}

function updateButtons() {
    tablinks = document.getElementsByClassName("tablinks");
	
    let activeTabs = 0;
	
    for (let i = 0; i < lemongame.tabs.length; i++) {
        if (lemongame.tabs[i] == 1) {activeTabs++;}
    }
	
    if (lemongame.tabs[0] == 0) {
        document.getElementById("tablinkbuttonZitronen").style.display = "none";
    } else {
        document.getElementById("tablinkbuttonZitronen").style.display = "block";
    }
	
    if (lemongame.tabs[1] == 0) {
        document.getElementById("tablinkbuttonEuro").style.display = "none";
    } else {
        document.getElementById("tablinkbuttonEuro").style.display = "block";
    }
	
    if (lemongame.tabs[2] == 0) {
        document.getElementById("tablinkbuttonWissenschaft").style.display = "none";
    } else {
        document.getElementById("tablinkbuttonWissenschaft").style.display = "block";
    }
	
    if (lemongame.tabs[3] == 0) {
        document.getElementById("tablinkbuttonLimetten").style.display = "none";
    } else {
        document.getElementById("tablinkbuttonLimetten").style.display = "block";
    }
	
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].style.width = "calc(" + (100 / activeTabs).toString() + "% - 2px)";
    }
}

function gameLoop() {
    document.getElementById("tablinkbuttonZitronen").innerHTML = lemongame.resources[0].amount + " Zitronen";
    document.getElementById("tablinkbuttonEuro").innerHTML = lemongame.resources[1].amount + " Euro";
    document.getElementById("tablinkbuttonWissenschaft").innerHTML = lemongame.resources[2].amount + " Wissenschaft";
    document.getElementById("tablinkbuttonLimetten").innerHTML = lemongame.resources[3].amount + " Limetten";
	
	if ((lemongame.specials[0].treeamount / lemongame.specials[0].treelimit) * 100 > 100) {
		document.getElementById("lemontreebar").style.width = "100%";
	} else {
		document.getElementById("lemontreebar").style.width = (lemongame.specials[0].treeamount / lemongame.specials[0].treelimit) * 100 + "%";
	}
	
	if ((lemongame.specials[0].lemonamount / lemongame.specials[0].lemonlimit) * 100 > 100) {
		document.getElementById("lemonbar").style.width = "100%";
	} else {
		document.getElementById("lemonbar").style.width = (lemongame.specials[0].lemonamount / lemongame.specials[0].lemonlimit) * 100 + "%";
	}
	
	if ((lemongame.specials[1].fame / lemongame.specials[1].fameNextLvl) * 100 > 100) {
		document.getElementById("lemonstandbar").style.width = "100%";
	} else {
		document.getElementById("lemonstandbar").style.width = (lemongame.specials[1].fame / lemongame.specials[1].fameNextLvl) * 100 + "%";
	}
	
	if ((lemongame.specials[1].lemonamount / lemongame.specials[1].lemonlimit) * 100 > 100) {
		document.getElementById("lemonstandlemonbar").style.width = "100%";
	} else {
		document.getElementById("lemonstandlemonbar").style.width = (lemongame.specials[1].lemonamount / lemongame.specials[1].lemonlimit) * 100 + "%";
	}

	if ((lemongame.specials[2].lemonamount / lemongame.specials[2].lemonlimit) * 100 > 100) {
		document.getElementById("lemonpresslemonbar").style.width = "100%";
	} else {
		document.getElementById("lemonpresslemonbar").style.width = (lemongame.specials[2].lemonamount / lemongame.specials[2].lemonlimit) * 100 + "%";
	}

	if ((lemongame.specials[2].timer / lemongame.specials[2].pressCooldown) * 100 > 100) {
		document.getElementById("lemonpressprogressbar").style.width = "100%";
	} else {
		document.getElementById("lemonpressprogressbar").style.width = (lemongame.specials[2].timer / lemongame.specials[2].pressCooldown) * 100 + "%";
	}
	
	if ((lemongame.specials[2].juiceamount / lemongame.specials[2].juicelimit) * 100 > 100) {
		document.getElementById("lemonpressjuicebar").style.width = "100%";
	} else {
		document.getElementById("lemonpressjuicebar").style.width = (lemongame.specials[2].juiceamount / lemongame.specials[2].juicelimit) * 100 + "%";
	}

	lemongame.specials[0].tick();
	lemongame.specials[1].tick();
	lemongame.specials[2].tick();
}

function loaded() {
    updateButtons();
	updateWindows();
	
	document.getElementById("settings").style.display = "none";
	document.getElementById("stats").style.display = "none";
	document.getElementById("workers").style.display = "none";

	document.getElementById("statsfield").style.display = "none";
	document.getElementById("statsstand").style.display = "none";
	document.getElementById("statspress").style.display = "none";

    document.getElementById("tabZitronen").style.display = "none";
    document.getElementById("tabEuro").style.display = "none";
    document.getElementById("tabWissenschaft").style.display = "none";
    document.getElementById("tabLimetten").style.display = "none";
}

function startGame() {
	lemongame.tabs = [1, 1, 0, 0]; // Tab 1 - 4
	lemongame.unlocks = [0, 0, 0]; // Lemontreefield, Lemonadestand, Lemonpress

	if (document.getElementById("nameinput").value != "") {
		lemongame.user = document.getElementById("nameinput").value;
	}
	
	document.getElementById("welcomescreen").style.display = "none";
	togglePanel("tabZitronen");
	
	lemongame.resources =
	[
	new Resource("Zitronen"),
	new Resource("Euro", 25),
	new Resource("Wissenschaft"),
	new Resource("Limetten"),
	new Resource("Zitronensaft"),
	];
	
	lemongame.specials = 
	[
	new Lemonfield(),
	new Lemonstand(),
	new Lemonpress(),
	];
	
	lemongame.buildings = 
	[
	];
	
	lemongame.upgrades = 
	[
	new Upgrade("upgradefieldlimit", "Zitronenfeld", "Baumlimit", "Schafft Platz für 20 mehr Bäume", 100, 40),
	new Upgrade("upgradestandlimit", "Limonadenstand", "Lagerlimit", "Dein Zitronenstand kann doppelt soviele Zitronen lagern", 1000, 10),
	new Upgrade("upgradestanddelay", "Limonadenstand", "Mehr Kunden", "Dein Zitronenstand verkauft jetzt schneller Limonade", 1000, 40),
	new Upgrade("upgradepressspeed", "Zitronenpresse", "Größere Presse", "Deine Presse produziert schneller Zitronensaft", 10000, 5),
	]

	for (let i = 0; i < lemongame.upgrades.length; i++) {
		lemongame.upgrades[i].hide();
	}

	lemongame.specials[0].unlock();
	document.getElementById("statsfield").style.display = "block";

    updateButtons();
	updateWindows();
    setInterval(gameLoop, 1000 / lemongame.tps);
}

loaded();