var fields = [7, 10, 13, 16, 23, 24, 25, 26, 27, 38, 49, 48, 47, 46, 45, 52, 55, 58, 61, 60, 59, 56, 53, 50, 43, 42, 41, 40, 39, 28, 17, 18, 19, 20, 21, 14, 11, 8, 5, 6];
var fieldsgruen = [7, 10, 13, 16, 23, 24, 25, 26, 27, 38, 49, 48, 47, 46, 45, 52, 55, 58, 61, 60, 59, 56, 53, 50, 43, 42, 41, 40, 39, 28, 17, 18, 19, 20, 21, 14, 11, 8, 5, 6, 9, 12, 15, 22];
var fieldsrot = [49, 48, 47, 46, 45, 52, 55, 58, 61, 60, 59, 56, 53, 50, 43, 42, 41, 40, 39, 28, 17, 18, 19, 20, 21, 14, 11, 8, 5, 6, 7, 10, 13, 16, 23, 24, 25, 26, 27, 38, 37, 36, 35, 34];
var fieldsgelb = [17, 18, 19, 20, 21, 14, 11, 8, 5, 6, 7, 10, 13, 16, 23, 24, 25, 26, 27, 38, 49, 48, 47, 46, 45, 52, 55, 58, 61, 60, 59, 56, 53, 50, 43, 42, 41, 40, 39, 28, 29, 30, 31, 32];
var fieldsblau = [59, 56, 53, 50, 43, 42, 41, 40, 39, 28, 17, 18, 19, 20, 21, 14, 11, 8, 5, 6, 7, 10, 13, 16, 23, 24, 25, 26, 27, 38, 49, 48, 47, 46, 45, 52, 55, 58, 61, 60, 57, 54, 51, 44];
var current = "gruen";
var currentamount = 0;
var start = [["gelb1", "gelb2", "gelb3", "gelb4"], ["gruen1", "gruen2", "gruen3", "gruen4"], ["blau1", "blau2", "blau3", "blau4"], ["rot1", "rot2", "rot3", "rot4"]];
var hausfelder = [[29, 30, 31, 32], [9, 12, 15, 22], [44, 51, 54, 57], [34, 35, 36, 37]];
var figuren = [["gelb1", "gelb2", "gelb3", "gelb4"], ["gruen1", "gruen2", "gruen3", "gruen4"], ["blau1", "blau2", "blau3", "blau4"], ["rot1", "rot2", "rot3", "rot4"]];
var selection = null;
var dice = 0;
var actionneed = false;
var endgame = false;
var player = 4;

$(document).ready(function() {
	getRightsize();
	var html = "";
	for (var i = 0; i < 12; i++)
		html += '<div class="feld spielfeldfeld feld' + parseInt(i+5) + '" id="feld' + parseInt(i+5) + '"></div>';
	$('#oben').html(html);
	html = "";
	for (var i = 0; i < 33; i++)
		html += '<div class="feld spielfeldfeld feld' + parseInt(i+17) + '" id="feld' + parseInt(i+17) + '"></div>';
	$('#mitte').html(html);
	html = "";
	for (var i = 0; i < 12; i++)
		html += '<div class="feld spielfeldfeld feld' + parseInt(i+50) + '" id="feld' + parseInt(i+50) + '"></div>';
	$('#unten').html(html);
	
	$('#feld7').css('background-color', "green");
	$('#feld9').css('background-color', "green").addClass("zielgruen");
	$('#feld12').css('background-color', "green").addClass("zielgruen");
	$('#feld15').css('background-color', "green").addClass("zielgruen");
	$('#feld22').css('background-color', "green").addClass("zielgruen");

	$('#feld17').css('background-color', "yellow");
	$('#feld29').css('background-color', "yellow").addClass("zielgelb");
	$('#feld30').css('background-color', "yellow").addClass("zielgelb");
	$('#feld31').css('background-color', "yellow").addClass("zielgelb");
	$('#feld32').css('background-color', "yellow").addClass("zielgelb");

	$('#feld33').html("<p><b>Würfel</b><br>(D)</p>");

	$('#feld34').css('background-color', "red").addClass("zielrot");
	$('#feld35').css('background-color', "red").addClass("zielrot");
	$('#feld36').css('background-color', "red").addClass("zielrot");
	$('#feld37').css('background-color', "red").addClass("zielrot");
	$('#feld49').css('background-color', "red");

	$('#feld44').css('background-color', "#2E2EFE").addClass("zielblau");
	$('#feld51').css('background-color', "#2E2EFE").addClass("zielblau");
	$('#feld54').css('background-color', "#2E2EFE").addClass("zielblau");
	$('#feld57').css('background-color', "#2E2EFE").addClass("zielblau");
	$('#feld59').css('background-color', "#2E2EFE");
	$('.hausfeld').each(function() {
		var id = $(this).prop('id');
		$(this).html('<div class="spielfigur" id="figur' + id + '"></div>');
	});
	
	$('.spielfigur').each(function() {
		var id = $(this).prop('id');
		if (id.includes("gelb")) {
			$(this).css("background-color", "yellow");
		} else if (id.includes("gruen")) {
			$(this).css("background-color", "green");
		} else if (id.includes("blau")) {
			$(this).css("background-color", "#2E2EFE");
		} else if (id.includes("rot")) {
			$(this).css("background-color", "red");
		}
	});
	$('h1').html("Mensch &Auml;rgere Dich <b>Nicht</b>");
	$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> startet das Spiel!");
	//$('#feld33').css('background-color', 'green');
	$('#feld33').on('click', rollNewDice);
	$('.feld').on('click', selectfigur);
});

$(window).resize(function() {
	getRightsize();
});

$(window).on("keypress", function(e) {
	if (e.which == 100)
		rollNewDice();
});

function selectfigur() {
	if (actionneed) 
		if ( $(this).children().length > 0) {
			var child = $(this).children().eq(0);
			if (child.hasClass("spielfigur") && !($(this).hasClass("zielgruen") || $(this).hasClass("zielgelb") || $(this).hasClass("zielblau") || $(this).hasClass("zielrot"))) 
				if (child.prop('id').includes(current)) {
						clearSelection();
						selection = child.prop('id');
						var figurarray = getFigurenArray();
						var figur = figuren[figurarray[0]][figurarray[1]];
						if (needsASix()) { // AUS DEM HAUS RAUSGEHEN
							var figurdiv = $('#' + figur).html();
							$('#' + figur).html("");
							var newfield = 'feld' + fields[getFirstField()];
							if ($('#' + newfield).html() != "")
								kickFigur(newfield);
								$('#' + newfield).html(figurdiv);
							figuren[figurarray[0]][figurarray[1]] = newfield;
							clearSelection();
							$('#info').html("Diese Figur ist nun auf deinem Startfeld, würfle nochmal!")
							actionneed = false;
						} else {
							if (child.parent().hasClass("hausfeld")) {
								if ($('#feld' + fields[getFirstField()]).html() != null && $('#feld' + fields[getFirstField()]).html().includes("figur" + current)) {
									$('#info').html("Du kannst deine eigenen Figuren nicht rausschmeißen, wähle eine andere Figur aus!");
								} else {
									var figurdiv = $('#' + figur).html();
									$('#' + figur).html("");
									var newfield = 'feld' + fields[getFirstField()];
									if ($('#' + newfield).html() != "")
										kickFigur(newfield);
										$('#' + newfield).html(figurdiv);
									figuren[figurarray[0]][figurarray[1]] = newfield;
									clearSelection();
										$('#info').html("Diese Figur ist nun auf deinem Startfeld, würfle nochmal!");
									actionneed = false;
								}
							} else {

								if ($('#' + getNextField(figur, dice)).html() != null && $('#' + getNextField(figur, dice)).html().includes("figur" + current)) {
									if (canDoSomething()) {
										$('#info').html("Du kannst deine eigenen Figuren nicht rausschmeißen, wähle eine andere Figur aus!");
									} else {
										clearSelection();
										actionneed = false;
										currentamount = 0;
										current = getNextPlayer();
										$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> ist nun am Zug!");
										$('#info').html("Weil du mit dieser Zahl nichts machen kannst, ist nun " + current.toUpperCase() + " am Zug!")
									}
								} else {
									var figurdiv = $('#' + figur).html();
									$('#' + figur).html("");
									var newfield = getNextField(figur, dice);
									if ($('#' + newfield).html() != "")
										kickFigur(newfield);
									$('#' + newfield).html(figurdiv);
									figuren[figurarray[0]][figurarray[1]] = newfield;
									clearSelection();
									actionneed = false;
									checkWin();
									if (!endgame)
										if (dice == 6) 
											$('#info').html("Da du eine Sechs gewürfet hast, darfst du nocheinmal würfeln!");
										else {
											currentamount = 0;
											current = getNextPlayer();
											$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> ist nun am Zug!");
											$('#info').html("Weil ist nun der Zug abgeschlossen wurde ist nun " + current.toUpperCase() + " am Zug!")
										}
								}
							}

						}
					}
		}
}

function rollNewDice() {
	if (!actionneed && !endgame) {
		dice = getRndZahl();
		$('#dice').html("Es wurde eine <b>" + dice + "</b> Gewürfelt!");
		if (needsASix()) 
			if (dice == 6) {
				actionneed = true;
				$('#info').html("Wähle jetzt die Figur aus, mit der du aufs Spielbrett gehen willst!");
			} else 
				if (currentamount <= 1)
					currentamount++;
				else {
					currentamount = 0;
					current = getNextPlayer();
					$('#info').html("Es wurde keine Sechs gewürfelt, deswegen ist nun " + current.toUpperCase() + " am Zug!")
					$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> ist nun am Zug!");
					clearSelection();
				
			}
		else {
			actionneed = true;
			$('#info').html("Wähle jetzt die Figur aus, mit der du weitergehen willst!");
		}
	}
}

function getRightsize() {
	if ($('#content').width() < $('#content').height()) {
		$('#content').width($(document).width()*0.9);
		$('#content').height($('#content').width());
	} else {
		$('#content').height($(document).height()*0.9);
		$('#content').width($('#content').height());
	}
}

// LOGIK

function checkWin() {
	var felder = getRightFieldList();
	var win = true;
	for (var i = felder.length-4; i < felder.length; i++) {
		if ($('#feld' + felder[i]).html() == "") {
			win = false;
			return false;
		}
	}
	if (win) {
		endgame = true;
		$('#info').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> hat das Spiel gewonnen!");
		$('#current').html("");
		$('#dice').html("");
		confetti.start();
	}

}

function canDoSomething() {
	var farbe = -1;
	switch (current) {
		case "gelb":
			farbe = 0;
			break;
		case "gruen":
			farbe = 1;
			break;
		case "blau":
			farbe = 2;
			break;
		case "rot":
			farbe = 3;
			break;
	}
	for (var i = 0; i < figuren[farbe].length; i++){
		var currentfield = figuren[farbe][i];
		var nxtField = $('#' + getNextField(currentfield, dice));
		var nxtFieldhtml = nxtField.html();
		var isInGoal = $('#' + currentfield).hasClass("ziel" + current);
		if (!isInGoal) {
			if (nxtFieldhtml == null) {
				return true;
			} else {
				if (!nxtFieldhtml.includes("figur" + current)) {
					return true;
				}
			}
		}
	}
	return false;
}

function kickFigur(field) {
	var id = $('#' + field).children().eq(0).prop('id').replace('figur', '');
	for (var i = 0; i < start.length; i++) {
		for (var j = 0; j < start[i].length; j++) {
			if (id == start[i][j]) {
				figuren[i][j] = id;
			}
		}
	}
	$('#' + id).html($('#' + field).html());
	$('#' + field).html("");
}

function clearSelection() {
	if (selection != null) {
		$('#' + selection).css("border-width", "1px");
		selection = null;
	}
}

function isOnlyOneOut() {
	var tru = null;
	switch(current) {
			case "gelb":
			for (var i = 0; i < 4; i++) 
				if (figuren[0][i] != "gelb" + (i+1)) 
					if (!tru) 
						tru = [0, i];
					else
						return null;
				break;
			case "gruen":
			for (var i = 0; i < 4; i++) 
				if (figuren[1][i] != "gruen" + (i+1))
					if (!tru) 
						tru = [1, i];
					else
						return null;
				break;
			case "blau":
			for (var i = 0; i < 4; i++) 
				if (figuren[2][i] != "blau" + (i+1)) 
					if (!tru) 
						tru = [2, i];
					else
						return null;
				break;
			case "rot":
			for (var i = 0; i < 4; i++) 
				if (figuren[3][i] != "rot" + (i+1))
					if (!tru) 
						tru = [3, i];
					else
						return null;
			break;
		}
		return tru;
}

function getFigurenArray() {
	if (selection != null) {
		for (var i = 0; i < figuren.length; i++) {
			for (var j = 0; j < figuren[i].length; j++) {
				if ($('#' + selection).parent().prop('id') == figuren[i][j]) {
					return [i, j];
				}
			}
		}
	}
}

function getFirstField() {
	switch(current) {
			case "gelb":
				return 30;
				break;
			case "gruen":
				return 0;
				break;
			case "blau":
				return 20;
				break;
			case "rot":
				return 10;
				break;
		}
}

function getNextHomeFigur() {
	switch(current) {
			case "gelb":
			for (var i = 0; i < 4; i++) 
				if (figuren[0][i] == "gelb" + (i+1)) 
					return [0, i];
				break;
			case "gruen":
			for (var i = 0; i < 4; i++) 
				if (figuren[1][i] == "gruen" + (i+1))
					return [1, i];
				break;
			case "blau":
			for (var i = 0; i < 4; i++) 
				if (figuren[2][i] == "blau" + (i+1)) 
					return [2, i];
				break;
			case "rot":
			for (var i = 0; i < 4; i++) 
				if (figuren[3][i] == "rot" + (i+1)) 
					return [3, i];
			break;
		}
		return null;
}

function needsASix() {
	switch(current) {
			case "gelb":
				return (figuren[0][0].includes("gelb1") || $('#' + figuren[0][0]).hasClass("zielgelb")) &&
				 (figuren[0][1].includes("gelb2") || $('#' + figuren[0][1]).hasClass("zielgelb")) &&
				 (figuren[0][2].includes("gelb3") || $('#' + figuren[0][2]).hasClass("zielgelb")) &&
				 (figuren[0][3].includes("gelb4") || $('#' + figuren[0][3]).hasClass("zielgelb"));
				break;
			case "gruen":
				return (figuren[1][0].includes("gruen1") || $('#' + figuren[1][0]).hasClass("zielgruen")) &&
				 (figuren[1][1].includes("gruen2") || $('#' + figuren[1][1]).hasClass("zielgruen")) &&
				 (figuren[1][2].includes("gruen3") || $('#' + figuren[1][2]).hasClass("zielgruen")) &&
				 (figuren[1][3].includes("gruen4") || $('#' + figuren[1][3]).hasClass("zielgruen"));
				break;
			case "blau":
				return (figuren[2][0].includes("blau1") || $('#' + figuren[2][0]).hasClass("zielblau")) &&
				 (figuren[2][1].includes("blau2") || $('#' + figuren[2][1]).hasClass("zielblau")) &&
				 (figuren[2][2].includes("blau3") || $('#' + figuren[2][2]).hasClass("zielblau")) &&
				 (figuren[2][3].includes("blau4") || $('#' + figuren[2][3]).hasClass("zielblau"));
				break;
			case "rot":
				return (figuren[3][0].includes("rot1") || $('#' + figuren[3][0]).hasClass("zielrot")) &&
				 (figuren[3][1].includes("rot2") || $('#' + figuren[3][1]).hasClass("zielrot"))  &&
				 (figuren[3][2].includes("rot3") || $('#' + figuren[3][2]).hasClass("zielrot"))  &&
				 (figuren[3][3].includes("rot4") || $('#' + figuren[3][3]).hasClass("zielrot"));
			break;
		}
}

function getNextPlayer() {
	if (player == 2) {
	switch(current) {
		case "gelb":
			return "rot";
			break;
		case "gruen":
			return "rot";
			break;
		case "rot":
			return "gruen";
			break;
		case "blau":
			return "gruen";
		break;
		}
	} else if (player == 3) {
	switch(current) {
		case "gelb":
			return "rot";
			break;
		case "gruen":
			return "rot";
			break;
		case "rot":
			return "blau";
			break;
		case "blau":
			return "gruen";
		break;
	}
	}
	switch(current) {
			case "gelb":
				return "gruen";
				break;
			case "gruen":
				return "rot";
				break;
			case "rot":
				return "blau";
				break;
			case "blau":
				return "gelb";
			break;
		}
}

function show() {
	i = 0;
	var felder = getRightFieldList();
	var currentfield = "feld" + felder[0];
	var showinterval = setInterval(function () {
		if (i > felder.length)
			clearInterval(showinterval);
			var nxtField = getNextField(currentfield, 1);
			$('#' + nxtField).text(i);
			currentfield = nxtField;
		i++;
	}, 50);
}



function getRightFieldList() {
	var felder;
	switch (current) {
		case "gruen": 
			felder = fieldsgruen;
			break;
		case "gelb":
			felder = fieldsgelb;
			break;
		case "blau":
			felder = fieldsblau;
			break;
		case "rot":
			felder = fieldsrot;
			break;
	}
	return felder;
}

function getNextField(currentfield, dice) {
	var felder = getRightFieldList();
	
	for (var i = 0; i < felder.length; i++) {
		if (currentfield == "feld" + felder[i]) {
			if (i+dice <= felder.length)
				return "feld" + felder[i + dice];
			else
				return "feld" + felder[felder.length-1];
		}
	}
}

function getRndZahl() {
	return Math.floor((Math.random() * 6) + 1);
}