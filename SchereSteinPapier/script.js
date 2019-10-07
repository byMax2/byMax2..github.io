var ich = null;
var du = null;

var ichPunkte = 0;
var duPunkte = 0;

var einspieler = true;

var counter = 0;

$(document).ready( function() {

	$("#startButton").on("click", function() {
		if ( $( "#schalterAnzahl" ).is(":checked")) {
			einspieler = true;
		} else {
			einspieler = false;
		}
		$("#overlayAnfang").hide();

		if(einspieler == true) {

			$('.myButton').on("click", function() {
				//console.log($(this).html());

				if($(this).html() == "Schere") {
					$("#bild1").attr("src", "./schere.jpg");
					$("#bild1").css("display", "block");
					ich = "Schere";
				} else if($(this).html() == "Stein") {
					$("#bild1").attr("src", "./stein.jpg");
					$("#bild1").css("display", "block");
					ich = "Stein";
				} else if($(this).html() == "Papier") {
					$("#bild1").attr("src", "./papier.jpg");
					$("#bild1").css("display", "block");
					ich = "Papier";
				}

				$("#vs").css("display", "block");

				zufall();

				ergebnis();
			});
		} else {
			console.log("Zwei Spieler Modus");
			$(".myButton").hide();
			$("h2").html("Drückt die richtigen Tasten <i class='fa fa-heart' aria-hidden='true'></i>");
			$("#erklaerung2spieler").show();
		}
	});

	$( document ).keypress(function(e) {
		if (e.key == 'a') {
			ich = "Schere";			
		} else if(e.key == 's') {
			ich = "Stein";
		} else if(e.key == 'd') {
			ich = "Papier";
		} else if (e.key == '1') {
			du = "Schere";
		} else if(e.key == '2') {
			du = "Stein";
		} else if(e.key == '3') {
			du = "Papier";
		} else {
			sweetAlert("Falsche Taste!", "Bitte halte dich an ", "error");
		}
		counter++;
		if(counter==2) {

			if(ich == "Schere") {
					$("#bild1").attr("src", "./schere.jpg");
					$("#bild1").css("display", "block");
			} else if(ich == "Stein") {
					$("#bild1").attr("src", "./stein.jpg");
					$("#bild1").css("display", "block");
			} else if(ich == "Papier") {
					$("#bild1").attr("src", "./papier.jpg");
					$("#bild1").css("display", "block");
			}

			$("#vs").css("display", "block");

			if(du == "Schere") {
					$("#bild2").attr("src", "./schere.jpg");
					$("#bild2").css("display", "block");
			} else if(du == "Stein") {
					$("#bild2").attr("src", "./stein.jpg");
					$("#bild2").css("display", "block");
			} else if(du == "Papier") {
					$("#bild2").attr("src", "./papier.jpg");
					$("#bild2").css("display", "block");
			}

			ergebnis();
			counter = 0;
		}
	});

});

function zufall() {
	var zufall = Math.round((Math.random() * (3 - 1)) + 1);

		if(zufall == 1) {
			$("#bild2").attr("src", "./schere.jpg");
			$("#bild2").css("display", "block");
			du = "Schere";
		} else if(zufall == 2) {
			$("#bild2").attr("src", "./stein.jpg");
			$("#bild2").css("display", "block");
			du = "Stein";
		} else {
			$("#bild2").attr("src", "./papier.jpg");
			$("#bild2").css("display", "block");
			du = "Papier";
		}
}

function ergebnis() {

	if(du == ich) {
		sweetAlert("Unentschieden!", ich + " hat  gegen " + du + " unentschieden gespielt :)", "error");
	} else if((ich == "Schere" && du == "Papier") || (ich == "Stein" && du == "Schere") || (ich == "Papier" && du == "Stein")) {
		sweetAlert("Gewonnen!", ich + " hat gegen " + du + " gewonnen :)", "success");
		ichPunkte++;
	} else {
		sweetAlert("Verloren!", ich + " hat gegen " + du + " verloren :)", "error");
		duPunkte++;
	}

	if(ichPunkte == 1) {
		$("#p1").html("&nbsp; Punkt");
	} else if(duPunkte == 1) {
		$("#p2").html("&nbsp; Punkt");
	}

	$("#punktestandEins").html(ichPunkte);
	$("#punktestandZwei").html(duPunkte);

}