var fields = [7, 10, 13, 16, 23, 24, 25, 26, 27, 38, 49, 48, 47, 46, 45, 52, 55, 58, 61, 60, 59, 56, 53, 50, 43, 42, 41, 40, 39, 28, 17, 18, 19, 20, 21, 14, 11, 8, 5, 6];
var current = "gruen";
var currentamount = 0;
var start = [["gelb1", "gelb2", "gelb3", "gelb4"], ["gruen1", "gruen2", "gruen3", "gruen4"], ["blau1", "blau2", "blau3", "blau4"], ["rot1", "rot2", "rot3", "rot4"]];
var hausfelder = [[29, 30, 31, 32], [9, 12, 15, 22], [44, 51, 54, 57], [34, 35, 36, 37]];
var figuren = [["gelb1", "gelb2", "gelb3", "gelb4"], ["gruen1", "gruen2", "gruen3", "gruen4"], ["blau1", "blau2", "blau3", "blau4"], ["rot1", "rot2", "rot3", "rot4"]];
var selection = null;

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
	$('#feld9').css('background-color', "green");
	$('#feld12').css('background-color', "green");
	$('#feld15').css('background-color', "green");
	$('#feld22').css('background-color', "green");

	$('#feld17').css('background-color', "yellow");
	$('#feld29').css('background-color', "yellow");
	$('#feld30').css('background-color', "yellow");
	$('#feld31').css('background-color', "yellow");
	$('#feld32').css('background-color', "yellow");

	$('#feld33').html("<p><b>Würfel</b></p>");

	$('#feld34').css('background-color', "red");
	$('#feld35').css('background-color', "red");
	$('#feld36').css('background-color', "red");
	$('#feld37').css('background-color', "red");
	$('#feld49').css('background-color', "red");

	$('#feld44').css('background-color', "#2E2EFE");
	$('#feld51').css('background-color', "#2E2EFE");
	$('#feld54').css('background-color', "#2E2EFE");
	$('#feld57').css('background-color', "#2E2EFE");
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
	$('#feld33').on('click', rollDice);
	$('.spielfeldfeld').on('click', function() {
		if ( $(this).children().length > 0 ) {
			if ($(this).children().eq(0).hasClass("spielfigur")) {
				if ($(this).children().eq(0).prop('id').includes(current)) {
					if (isOnlyOneOut() == null) {
						clearSelection();
						selection = $(this).children().eq(0).prop('id');
						$('#' + selection).css("border-width", "2px");
					} else {
						alert("Du kannst nur Figuren auswaehlen, wenn du mehrere auf dem Feld hast!");
					}
				}
			}
		}
	});
});

$(window).resize(function() {
	getRightsize();
});

$(window).on("keypress", function(e) {
	if (e.which == 100)
		rollDice();
});

function rollDice() {
var dice =  getRndZahl();
		$('#dice').html("Es wurde eine <b>" + dice + "</b> Gewürfelt!");
		if (needsASix()) {
			if (dice == 6) {
				var figurarray = getNextHomeFigur();
				var figur = figuren[figurarray[0]][figurarray[1]];
				var figurdiv = $('#' + figur).html();
				$('#' + figur).html("");
				var newfield = 'feld' + fields[getFirstField()];
				if ($('#' + newfield).html() != "")
					kickFigur(newfield);
					$('#' + newfield).html(figurdiv);
				figuren[figurarray[0]][figurarray[1]] = newfield;
			} else {
				if (currentamount <= 1)
					currentamount++;
				else {
					currentamount = 0;
					current = getNextPlayer();
					$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> ist nun am Zug!");
						clearSelection();
				}
			}
		} else {
			if (dice == 6) {
				if ($('#feld' + fields[getFirstField()]).html() == "") {
					if (getNextHomeFigur() != null) {
						var figurarray = getNextHomeFigur();
						var figur = figuren[figurarray[0]][figurarray[1]];
						var figurdiv = $('#' + figur).html();
						$('#' + figur).html("");
						var newfield = 'feld' + fields[getFirstField()];
						if ($('#' + newfield).html() != "")
							kickFigur(newfield);
						$('#' + newfield).html(figurdiv);
						figuren[figurarray[0]][figurarray[1]] = newfield;
						clearSelection();
						selection = $('#' + newfield).children().eq(0).prop('id');
						$('#' + selection).css("border-width", "2px");
						return;
					}
				}
			}
			var figurarray = isOnlyOneOut();
			if (figurarray != null ) {
				var figur = figuren[figurarray[0]][figurarray[1]];
				var figurdiv = $('#' + figur).html();
				$('#' + figur).html("");
				var newfield = getNextField(figur, dice);
				if ($('#' + newfield).html() != "")
					kickFigur(newfield);
				$('#' + newfield).html(figurdiv);
				figuren[figurarray[0]][figurarray[1]] = newfield;
				current = getNextPlayer();
					$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> ist nun am Zug!");
				clearSelection();
			} else {
				if (selection != null) {
				var figurarray = getFigurenArray();
				var figur = figuren[figurarray[0]][figurarray[1]];
					var figurdiv = $('#' + figur).html();
					$('#' + figur).html("");
					var newfield = getNextField(figur, dice);
					if ($('#' + newfield).html() != "")
						kickFigur(newfield);
					$('#' + newfield).html(figurdiv);
					figuren[figurarray[0]][figurarray[1]] = newfield;
					current = getNextPlayer();
					$('#current').html("Der Spieler mit der Farbe <b>" + current.toUpperCase() + "</b> ist nun am Zug!");
					clearSelection();
				} else {
					alert("Du musst erst noch eine Figur auswaehlen!");
					return;
				}
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
				return figuren[0][0] == "gelb1" &&
				 figuren[0][1] == "gelb2" &&
				 figuren[0][2] == "gelb3" &&
				 figuren[0][3] == "gelb4";
				break;
			case "gruen":
				return figuren[1][0] == "gruen1" &&
				 figuren[1][1] == "gruen2" &&
				 figuren[1][2] == "gruen3" &&
				 figuren[1][3] == "gruen4";
				break;
			case "blau":
				return figuren[2][0] == "blau1" &&
				 figuren[2][1] == "blau2" &&
				 figuren[2][2] == "blau3" &&
				 figuren[2][3] == "blau4";
				break;
			case "rot":
				return figuren[3][0] == "rot1" &&
				 figuren[3][1] == "rot2" &&
				 figuren[3][2] == "rot3" &&
				 figuren[3][3] == "rot4";
			break;
		}
}

function getNextPlayer() {
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
		return current;
}

function getNextField(currentfield, dice) {
	/*switch(current){
		case "gruen":
			if (currentfield+dice > )
			break;
	}*/
for (var i = 0; i < fields.length; i++) {
	if (currentfield == "feld" + fields[i]) {
		if (i+dice >= fields.length)
			return "feld" + fields[i + dice - fields.length];
		else
		return "feld" + fields[i + dice];
		}
	}
}

function getRndZahl() {
	return /*Math.floor((Math.random() * 6) + 1)*/6;
}