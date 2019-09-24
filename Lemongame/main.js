var res_money = 0;
var res_lemons = 0;
var res_lemonjuice = 0;
var res_volt = 0;
var res_science = 0;

var pres_limes = 0;

var damage_taken = 0;
var damage_dealt = 0;

var exploration_stage = 1;
var explorationpart_cur = 1;
var golems_owned = 0;
var golems_died = 0;

var golem_hpmax = 50;
var golem_hpcur = 0;

var golem_atkcur = 0;

var enemy_hpcur = 35;

var enemy_atkcur = 1;

var enemy_died = 0;

var cst_golem_juice = 6666;
var cst_golem_volt = 666;
var cst_golem_science = 666;
var cst_golem_money = 20000;
	
var bld_lemontrees = 0;
var cst_lemontrees = 25;
var incr_lemontrees = 1.085;
	
var bld_lemonsqueezers = 0;
var cst_lemonsqueezers = 30;
var incr_lemonsqueezers = 1.105;
	
var bld_lemonstands = 0;
var cst_lemonstands = 120;
var incr_lemonstands = 1.16;
	
var bld_agenerators = 0;
var cst_agenerators = 1200;
var incr_agenerators = 1.26;
	
var bld_sciencecenters = 0;
var cst_sciencecenters = 5500;
var incr_sciencecenters = 1.36;
	
var lemonstands_money = 5;
var lemonade_money = 3;
var lemontrees_produce = 1;
var lemontrees_limit = 50;
var lemonjuice_amount = 1;
var generatorspeed = 1;
var generatorjuice = 13;
var sciencespeed = 1;
var sciencevolt = 3;

var cst_lemonamountupgr = 450;
var cst_juiceamountupgr = 550;
var cst_standamountupgr = 300;
var cst_treelimitupgr = 100;
var cst_generatorspeedupgr = 700;
var cst_sciencespeedupgr = 350;
	
var togglesci = 0;
var togglegen = 0;
var togglestand = 0;

function prestige(){
	togglesci = 0;
	togglegen = 0;
	togglestand = 0;
	
	cst_sciencespeedupgr = 350;
	cst_generatorspeedupgr = 700;
	cst_treelimitupgr = 100;
	cst_standamountupgr = 300;
	cst_juiceamountupgr = 550;
	cst_lemonamountupgr = 450;
	
	sciencevolt = 3;
	sciencespeed = 1;
	generatorjuice = 13;
	generatorspeed = 1;
	lemonjuice_amount = 1;
	lemontrees_limit = 50;
	lemontrees_produce = 1;
	lemonade_money = 3;
	lemonstands_money = 5;
	
	cst_golem_juice = 7500;
	cst_golem_volt = 750;
	cst_golem_science = 750;
	cst_golem_money = 20000;
	
	bld_lemontrees = 0;
	cst_lemontrees = 25;
	incr_lemontrees = 1.085;
	
	bld_lemonsqueezers = 0;
	cst_lemonsqueezers = 30;
	incr_lemonsqueezers = 1.105;
	
	bld_lemonstands = 0;
	cst_lemonstands = 120;
	incr_lemonstands = 1.16;
	
	bld_agenerators = 0;
	cst_agenerators = 1200;
	incr_agenerators = 1.26;
	
	bld_sciencecenters = 0;
	cst_sciencecenters = 5500;
	incr_sciencecenters = 1.36;
	
	exploration_stage = 1;
	explorationpart_cur = 1;
	golems_owned = 0;
	golems_died = 0;

	golem_hpmax = 50;
	golem_hpcur = 0;

	golem_atkcur = 0;

	enemy_hpcur = 35;

	enemy_atkcur = 1;

	enemy_died = 0;
}
function getLemon()
{
	res_lemons = res_lemons + lemontrees_produce;
	
   	document.getElementById("res_lemons").innerHTML = res_lemons;
};

function squeezeLemon()
{
	if(res_lemons >= 1) 
	{	
		res_lemons = res_lemons - 1;
		res_lemonjuice = res_lemonjuice + lemonjuice_amount;
		
		document.getElementById("res_lemons").innerHTML = res_lemons;
		document.getElementById("res_lemonjuice").innerHTML = res_lemonjuice;
	}
};

function sellLemonade()
{
if (res_lemonjuice >= 5) 
	{
	res_money = res_money + lemonade_money;
	res_lemonjuice = res_lemonjuice - 5;

	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("res_lemonjuice").innerHTML = res_lemonjuice;
	};
};

function makeGolem()
{
if (res_lemonjuice >= cst_golem_juice && res_volt >= cst_golem_volt && res_science >= cst_golem_science && res_money >= cst_golem_money) 
	{
	res_lemonjuice = res_lemonjuice - cst_golem_juice;
	res_volt = res_volt - cst_golem_volt;
	res_science = res_science - cst_golem_science;
	res_money = res_money - cst_golem_money;
	
	golems_owned = golems_owned + 1;
	
	golem_hpcur = golem_hpcur + 50;
	golem_hpmax = golems_owned * 50;
	golem_atkcur = golems_owned * 5;
	
	document.getElementById("res_lemonjuice").innerHTML = res_lemonjuice;
	document.getElementById("res_volt").innerHTML = res_volt;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("golems_owned").innerHTML = golems_owned;
	document.getElementById("golem_hpcur").innerHTML = golem_hpcur;
	document.getElementById("golem_hpmax").innerHTML = golem_hpmax;
	document.getElementById("golem_atkcur").innerHTML = golem_atkcur;
	};
};

function buyTree(){
if (res_money >= cst_lemontrees && bld_lemontrees < lemontrees_limit) 
	{
	res_money = res_money - cst_lemontrees;
	bld_lemontrees = bld_lemontrees + 1;
	cst_lemontrees = Math.floor(cst_lemontrees * incr_lemontrees);
	};
	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("bld_lemontrees").innerHTML = bld_lemontrees;
	document.getElementById("cst_lemontrees").innerHTML = cst_lemontrees;
};

function buySqueezer()
{
if (res_money >= cst_lemonsqueezers) 
	{
	res_money = res_money - cst_lemonsqueezers;
	bld_lemonsqueezers = bld_lemonsqueezers + 1;
	cst_lemonsqueezers = Math.floor(cst_lemonsqueezers * incr_lemonsqueezers);
	};
	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("bld_lemonsqueezers").innerHTML = bld_lemonsqueezers;
	document.getElementById("cst_lemonsqueezers").innerHTML = cst_lemonsqueezers;
};

function buyStand()
{
if (res_money >= cst_lemonstands) 
	{
	res_money = res_money - cst_lemonstands;
	bld_lemonstands = bld_lemonstands + 1;
	cst_lemonstands = Math.floor(cst_lemonstands * incr_lemonstands);
	};
	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("bld_lemonstands").innerHTML = bld_lemonstands;
	document.getElementById("cst_lemonstands").innerHTML = cst_lemonstands;
};

function buyGenerator()
{
if (res_money >= cst_agenerators) 
	{
	res_money = res_money - cst_agenerators;
	bld_agenerators = bld_agenerators + 1;
	cst_agenerators = Math.floor(cst_agenerators * incr_agenerators);
	};
	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("bld_agenerators").innerHTML = bld_agenerators;
	document.getElementById("cst_agenerators").innerHTML = cst_agenerators;
};

function buyScienceCenter()
{
if (res_money >= cst_sciencecenters) 
	{;
	res_money = res_money - cst_sciencecenters;
	bld_sciencecenters = bld_sciencecenters + 1;
	cst_sciencecenters = Math.floor(cst_sciencecenters * incr_sciencecenters);
	};
	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("bld_sciencecenters").innerHTML = bld_sciencecenters;
	document.getElementById("cst_sciencecenters").innerHTML = cst_sciencecenters;
};

function tickTrees()
{
	res_lemons = res_lemons + bld_lemontrees * lemontrees_produce;
	document.getElementById("res_lemons").innerHTML = res_lemons;
	document.getElementById("res_money").innerHTML = res_money;
};

function tickSqueezers()
{
	if (bld_lemonsqueezers >= 1)
	{
		if (res_lemons >= bld_lemonsqueezers) 
		{
			res_lemons = res_lemons - bld_lemonsqueezers * lemonjuice_amount;
			res_lemonjuice = res_lemonjuice + bld_lemonsqueezers * lemonjuice_amount;
			document.getElementById("res_lemons").innerHTML = res_lemons;
			document.getElementById("res_lemonjuice").innerHTML = res_lemonjuice;
			
		};
	};
};

function tickStands()
{
if (res_lemonjuice >= bld_lemonstands * 6) 
	{
		res_lemonjuice = res_lemonjuice - bld_lemonstands * 6;
		res_money = res_money + bld_lemonstands * lemonstands_money;
		document.getElementById("res_lemonjuice").innerHTML = res_lemonjuice;
		document.getElementById("res_money").innerHTML = res_money;
	};
};

function tickGenerators()
{
if (bld_agenerators >= 1) 
	{
	if (res_lemonjuice >= bld_agenerators * generatorjuice) 
		{
		res_lemonjuice = res_lemonjuice - bld_agenerators * 13 * generatorspeed;
		res_volt = res_volt + bld_agenerators * generatorspeed;
		document.getElementById("res_lemons").innerHTML = res_lemons;
		document.getElementById("res_volt").innerHTML = res_volt;
		
		
		};
	};
};

function tickScienceCenter()
{
if (bld_sciencecenters >= 1) 
	{
	if (res_volt >= bld_sciencecenters * sciencevolt) 
		{
		res_science = res_science + bld_sciencecenters * sciencespeed;
		res_volt = res_volt - bld_sciencecenters *  sciencevolt;
		res_money = res_money + bld_sciencecenters * 18;
		document.getElementById("res_science").innerHTML = res_science;
		document.getElementById("res_volt").innerHTML = res_volt;
		};
	};
};

function tickGolems()
{
	golem_atkcur = golems_owned * 5;
	
	document.getElementById("golem_hpcur").innerHTML = golem_hpcur;
	document.getElementById("enemyhp").innerHTML = enemy_hpcur;
	document.getElementById("enemyatk").innerHTML = enemy_atkcur;
	document.getElementById("golems_died").innerHTML = golems_died;
	document.getElementById("enemies_died").innerHTML = enemy_died;
	
	if (golems_owned >= 1)
	{
		if (golem_hpcur >= 1) {
			damage_taken = Math.floor(Math.random() * 2);
			golem_hpcur = golem_hpcur - damage_taken;
			damage_dealt = (Math.floor(Math.random() * (golem_atkcur * 1.5)) + (golem_atkcur / 2));
			enemy_hpcur = enemy_hpcur - damage_dealt;
			
			if (enemy_hpcur <= 0) {
				enemy_died = enemy_died + 1;
				enemy_hpcur = 35 * exploration_stage;
				enemy_atkcur = exploration_stage;
				if (exploration_stage >= 20) {
					var numv = Math.floor(Math.random() * 100)
					if (numv == 0){
						pres_limes = pres_limes + exploration_stage - 19;
					}
				}
				var num = Math.floor(Math.random() * 100)
				if (num < 5) {
					golem_hpcur = golem_hpcur - (5 + Math.floor(Math.random() * 10));
				}
				if (num >= 5 && num < 55) {
					golem_hpcur = golem_hpcur - 3;
					explorationpart_cur = explorationpart_cur + 1;
					var numx = Math.floor(Math.random() * 5)
					if (numx == 0) {
						res_money = res_money + 20 * Math.floor(exploration_stage * 0.5);
					}
					if (numx == 1) {
						res_money = res_money + 35 * Math.floor(exploration_stage * 0.5);
					}
					if (numx == 2) {
						res_money = res_money + 5 * Math.floor(exploration_stage * 0.5);
					}
					if (numx == 3) {
						res_lemons = res_lemons + 35 * Math.floor(exploration_stage * 0.5);
					}
					if (numx == 4) {
						res_lemons = res_lemons + 25 * Math.floor(exploration_stage * 0.5);
						res_money = res_money + 25 * Math.floor(exploration_stage * 0.5);
					}
				}
				if (num >= 55 && num < 80) {
					golem_hpcur = golem_hpcur - 1;
					explorationpart_cur = explorationpart_cur + 1;
					var numy = Math.floor(Math.random() * 5)
					if (numy == 0) {
						res_money = res_money + 35 * Math.floor(exploration_stage * 0.5);
					}
					if (numy == 1) {
						res_lemonjuice = res_lemonjuice + 40 * Math.floor(exploration_stage * 0.5);
					}
					if (numy == 2) {
						res_science = res_science + 5 * Math.floor(exploration_stage * 0.5);
					}
					if (numy == 3) {
						res_volt = res_volt + 5 * Math.floor(exploration_stage * 0.5);
					}
					if (numy == 4) {
						res_lemons = res_lemons + 40 * Math.floor(exploration_stage * 0.5);
						res_money = res_money + 40 * Math.floor(exploration_stage * 0.5);
					}
					document.getElementById("exploration_stage").innerHTML = exploration_stage;
					document.getElementById("explorationpart_cur").innerHTML = explorationpart_cur;
				}
				if (num >= 80 && num < 98) {
					golem_hpcur = golem_hpcur - 1;
					explorationpart_cur = explorationpart_cur + 1;
					var numy = Math.floor(Math.random() * 5)
					if (numw == 0) {
						res_money = res_money + 45 * Math.floor(exploration_stage * 0.5);
					}
					if (numw == 1) {
						res_lemonjuice = res_lemonjuice + 50 * Math.floor(exploration_stage * 0.5);
					}
					if (numw == 2) {
						res_science = res_science + 8 * Math.floor(exploration_stage * 0.5);
					}
					if (numw == 3) {
						res_volt = res_volt + 8 * Math.floor(exploration_stage * 0.5);
					}
					if (numw == 4) {
						res_lemons = res_lemons + 50 * Math.floor(exploration_stage * 0.5);
						res_money = res_money + 50 * Math.floor(exploration_stage * 0.5);
					}
					document.getElementById("exploration_stage").innerHTML = exploration_stage;
					document.getElementById("explorationpart_cur").innerHTML = explorationpart_cur;
				}
				if (num >= 98) {
					golem_hpcur = golem_hpcur + 5;
					pres_limes = pres_limes + exploration_stage;
					explorationpart_cur = explorationpart_cur + 1;
					var numz = Math.floor(Math.random() * 10)
					if (numz == 0) {
						res_volt = res_volt + 25 * Math.floor(exploration_stage * 0.5);
					}
					if (numz >= 1 && numz <= 8) {
						res_science = res_science + 25 * Math.floor(exploration_stage * 0.5);
					}
					if (numz == 9) {
						golems_owned = golems_owned + 1;
					}
					document.getElementById("exploration_stage").innerHTML = exploration_stage;
					document.getElementById("explorationpart_cur").innerHTML = explorationpart_cur;
					
				}
				if (explorationpart_cur >= 100) {
					explorationpart_cur = 1;
					exploration_stage = exploration_stage + 1;
				
					document.getElementById("exploration_stage").innerHTML = exploration_stage;
					document.getElementById("explorationpart_cur").innerHTML = explorationpart_cur;
				}
				if (damage_taken >= 50) 
				{golems_owned = golems_owned - 1;
			golems_died = golems_died + 1;
			damage_taken = 0;}
			}
		}
	document.getElementById("explorationupdate").innerText = damage_dealt + ' Schaden gemacht';
	}
}

function toggleGenerator()
{
	if (togglegen == 0) {
	document.getElementById("togglegen").innerText = 'An';
	togglegen = 1;
	} else if (togglegen == 1) {
	document.getElementById("togglegen").innerText = 'Aus';
	togglegen = 0;
	}
};

function toggleScience()
{
	if (togglesci == 0) {
	document.getElementById("togglesci").innerText = 'An';
	togglesci = 1;
	} else if (togglesci == 1) {
	document.getElementById("togglesci").innerText = 'Aus';
	togglesci = 0;
	}
};

function toggleStands()
{
	if (togglestand == 0) {
	document.getElementById("togglestand").innerText = 'An';
	togglestand = 1;
	} else if (togglestand == 1) {
	document.getElementById("togglestand").innerText = 'Aus';
	togglestand = 0;
	}
};

function upgradeLemonamount()
{
	if (res_science >= cst_lemonamountupgr) {
	res_science = res_science - cst_lemonamountupgr;
	cst_lemonamountupgr = Math.floor(cst_lemonamountupgr * 2.5);
	lemontrees_produce = lemontrees_produce * 2;
	}
	document.getElementById("cst_lemonamountupgr").innerHTML = cst_lemonamountupgr;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("lemontrees_produce").innerHTML = lemontrees_produce;
};

function upgradeJuiceamount()
{
	if (res_science >= cst_juiceamountupgr) {
	res_science = res_science - cst_juiceamountupgr;
	cst_juiceamountupgr = Math.floor(cst_juiceamountupgr * 2.5);
	lemonjuice_amount = lemonjuice_amount * 2;
	}
	document.getElementById("cst_juiceamountupgr").innerHTML = cst_juiceamountupgr;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("lemonjuice_amount").innerHTML = lemonjuice_amount;
};

function upgradeStandamount()
{
	if (res_science >= cst_standamountupgr) {
	res_science = res_science - cst_standamountupgr;
	cst_standamountupgr = Math.floor(cst_standamountupgr * 2.5);
	lemonstands_money = lemonstands_money * 2;
	lemonade_money = lemonade_money * 2;
	}
	document.getElementById("cst_standamountupgr").innerHTML = cst_standamountupgr;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("lemonstands_money").innerHTML = lemonstands_money;
	document.getElementById("lemonade_money").innerHTML = lemonade_money;
};

function upgradeTreelimit()
{
	if (res_science >= cst_treelimitupgr) {
	res_science = res_science - cst_treelimitupgr;
	cst_treelimitupgr = Math.floor(cst_treelimitupgr * 2.5);
	lemontrees_limit = lemontrees_limit * 2;
	}
	document.getElementById("cst_treelimitupgr").innerHTML = cst_treelimitupgr;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("lemontrees_limit").innerHTML = lemontrees_limit;
};
function upgradeGeneratorspeed()
{
	if (res_science >= cst_generatorspeedupgr) {
	res_science = res_science - cst_generatorspeedupgr;
	cst_generatorspeedupgr = Math.floor(cst_generatorspeedupgr * 2.5);
	generatorspeed = generatorspeed * 2;
	generatorjuice = generatorjuice * 2;
	}
	document.getElementById("cst_generatorspeedupgr").innerHTML = cst_generatorspeedupgr;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("generatorspeed").innerHTML = generatorspeed;
	document.getElementById("generatorjuice").innerHTML = generatorspeed;
};
function upgradeSciencespeed()
{
	if (res_science >= cst_sciencespeedupgr) {
	res_science = res_science - cst_sciencespeedupgr;
	cst_sciencespeedupgr = Math.floor(cst_sciencespeedupgr * 2.5);
	sciencespeed = sciencespeed * 2;
	sciencevolt = sciencevolt * 2;
	}
	document.getElementById("cst_sciencespeedupgr").innerHTML = cst_sciencespeedupgr;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("sciencespeed").innerHTML = sciencespeed;
	document.getElementById("sciencevolt").innerHTML = sciencevolt;
};
window.setInterval(function(){
	document.getElementById("lemontrees_limit").innerHTML = lemontrees_limit;
	document.getElementById("lemonstands_money").innerHTML = lemonstands_money;
	document.getElementById("lemontrees_produce").innerHTML = lemontrees_produce;
	document.getElementById("res_money").innerHTML = res_money;
	document.getElementById("res_volt").innerHTML = res_volt;
	document.getElementById("res_lemons").innerHTML = res_lemons;
	document.getElementById("res_lemonjuice").innerHTML = res_lemonjuice;
	document.getElementById("res_science").innerHTML = res_science;
	document.getElementById("pres_limes").innerHTML = pres_limes;
	document.getElementById("exploration_stage").innerHTML = exploration_stage;
	document.getElementById("explorationpart_cur").innerHTML = explorationpart_cur;
	document.getElementById("golems_owned").innerHTML = golems_owned;
	document.getElementById("golem_hpcur").innerHTML = golem_hpcur;
	document.getElementById("golem_hpmax").innerHTML = golem_hpmax;
	document.getElementById("golem_atkcur").innerHTML = golem_atkcur;
	document.getElementById("cst_golem_juice").innerHTML = cst_golem_juice;
	document.getElementById("cst_golem_money").innerHTML = cst_golem_money;
	document.getElementById("cst_golem_volt").innerHTML = cst_golem_volt;
	document.getElementById("cst_golem_science").innerHTML = cst_golem_science;
	
	if (togglesci == 1) {
		tickScienceCenter();
	}
	if (togglegen == 1) {
		tickGenerators();
	}
	if (togglestand == 1) {
		tickStands();
	}
	tickTrees();
	tickSqueezers();
	tickGolems();
}, 1000);