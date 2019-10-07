var counter = 0;
var spieler1richtig = false;

var tastatur = true;

var punkteSpielerEins = 0;
var punkteSpielerZwei = 0;

var spieler1Beantwortet = false;
var spieler2Beantwortet = false;

var beantwortet = [];

var questions = [
{
    "id": 0,
    "frage" : "Machen wir Mittag?",
    "antworten" : {
      "a":"Ja",
      "b":"Nein",
      "c":"Vllt",
      "d":"Auf keinen Fall"
 },"richtig":"a"
}, {
    "id": 1,
    "frage" : "Was macht man mit einer Programmiersprache?",
    "antworten" : {
      "a":"Wandern",
      "b":"Kochen",
      "c":"Programmieren",
      "d":"Zeichnen"
 },
 "richtig":"c"
},{
    "id":2,
    "frage" : "Wie alt ist Franzi? (Tipp: Es ist nicht 27)",
    "antworten": {
      "a":"24",
      "b":"29",
      "c":"14",
      "d":"27"
 },
 "richtig":"a"
},{
    "id":3,
    "frage" : "Wer sucht den Defi in A.02?",
    "antworten" : {
      "a":"ich",
      "b":"Christoph",
      "c":"du",
      "d":"wir"
 },
 "richtig":"b"
},{
    "id":4,
    "frage" : "Was muss Mert-Can immer sagen? Tut es aber nie... :(",
    "antworten" : {
      "a":"Hallo",
      "b":"Danke",
      "c":"Ich bin eine Biene",
      "d":"Oke"
 },
 "richtig":"d"
},{
    "id":5,
    "frage" : "Wer mag gerne Äppel?",
    "antworten" : {
      "a":"Max",
      "b":"Danone",
      "c":"Mark Zuckerberg",
      "d":"Marvin"
 },
 "richtig":"a"
},{
    "id": 6,
    "frage" : "Wie nennt man Finnen, Schweden und Norweger?",
    "antworten" : {
      "a":"KopierDINA3",
      "b":"LöschDINA5",
      "c":"ScanDINA4",
      "d":"DruckDINA6"
 },
 "richtig":"c"
},{
    "id": 7,
    "frage" : "Wie viele Hotdogs hat der derzeitige Weltrekordhalter in zehn Minuten verschlungen?",
    "antworten" : {
      "a":"101",
      "b":"14",
      "c":"250",
      "d":"72"
 },
 "richtig":"d"
},{
    "id": 8,
    "frage" : "Wie viele Mordversuche überlebte Fidel Castro?",
    "antworten" : {
      "a":"638",
      "b":"869",
      "c":"26",
      "d":"564"
 },
 "richtig":"a"
},{
    "id": 9,
    "frage" : "Wie viele Tage verbringt ein Deutscher in seinem Leben durchschnittlich auf dem Klo?",
    "antworten" : {
      "a":"120",
      "b":"230",
      "c":"480",
      "d":"560"
 },
 "richtig":"b"
},{
    "id": 10,
    "frage" : "Wie viele Monate verbringt man, unerwünschte E-Mails zu löschen?",
    "antworten" : {
      "a":"1",
      "b":"8",
      "c":"24",
      "d":"11"
 },
 "richtig":"b"
},{
    "id": 11,
    "frage" : "In welchem Land sind Barbie-Puppen illegal?",
    "antworten" : {
      "a":"USA",
      "b":"Indien",
      "c":"Nordkorea",
      "d":"Saudi-Arabien"
 },
 "richtig":"d"
},{
    "id": 12,
    "frage" : "Was bedeutet: Kognitiv beeinträchtigtes, maskulines Individuum der lokalen Umgebung?",
    "antworten" : {
      "a":"Stadtmensch",
      "b":"Bruder",
      "c":"Dorftrottel",
      "d":"Mann"
 },
 "richtig":"c"
},{
    "id": 13,
    "frage" : "Was bedeutet: Paraskavedekatriaphobie?",
    "antworten" : {
      "a":"Angst vor Freitag, dem 13.",
      "b":"Angst vor Menschen",
      "c":"Angst vor Schwangerschaft",
      "d":"Angst vor Frauen"
 },
 "richtig":"a"
},{
    "id": 14,
    "frage" : "Rechne: 5+5*54",
    "antworten" : {
      "a":"275",
      "b":"300",
      "c":"270",
      "d":"305"
 },
 "richtig":"a"
},{
    "id": 15,
    "frage" : "Nenne die Netzaddresse des folgenden Netzes: 232.12.45.274/24",
    "antworten" : {
      "a":"232.12.45.0",
      "b":"232.12.45.255",
      "c":"232.12.0.0",
      "d":"Keine angegebene Antwort ist richtig"
 },
 "richtig":"d"
},{
    "id": 16,
    "frage" : "Warum tragen die Herren auf dem Wiener Opernball weiße Fliegen?",
    "antworten" : {
      "a":"Unterschied zu Kellner",
      "b":"Besserer Eintritt",
      "c":"Schwarz ist ausgegangen",
      "d":"Keine angegebene Antwort ist richtig"
 },
 "richtig":"a"
},{
    "id": 17,
    "frage" : "Wie kommunizieren Heringe miteinander?",
    "antworten" : {
      "a":"Pfeifen",
      "b":"Springen",
      "c":"Furzen",
      "d":"Blubbern"
 },
 "richtig":"c"
},{
    "id": 18,
    "frage" : "Wenn ich die Daten von meinem Computer lösche, wird er dann leichter?",
    "antworten" : {
      "a":"JA",
      "b":"NEIN",
      "c":"VIELLEICHT",
      "d":"EVENTUELL"
 },
 "richtig":"d"
},{
    "id": 19,
    "frage" : "Was kommt in Ostasien häufig auf den Tisch?",
    "antworten" : {
      "a":"Sonicht",
      "b":"Soschoneher",
      "c":"Soja",
      "d":"Sovielleicht"
 },
 "richtig":"c"
},{
    "id": 20,
    "frage" : "Wenn man eins von zwei Löchern im Reifen flickt, dann wird er ...?",
    "antworten" : {
      "a":"bildhauer",
      "b":"maler",
      "c":"dichter",
      "d":"sänger"
 },
 "richtig":"c"
},{
    "id": 21,
    "frage" : "1/4 ist ...?",
    "antworten" : {
      "a":"bank Raub",
      "b":"dieb Stahl",
      "c":"scheck Betrug",
      "d":"ein Bruch"
 },
 "richtig":"d"
},{
    "id": 22,
    "frage" : "Wobei handelt es sich um ein beliebtes Getränk an kalten Tagen?",
    "antworten" : {
      "a":"call me strawberry",
      "b":"heiße Zitrone",
      "c":"nennt mich Kirsche",
      "d":"bin die Banane"
 },
 "richtig":"b"
}

];



function onStartseite() {
	document.getElementById("overlayStartseite").style.display = "block";
}

function offStartseite() {
	document.getElementById("overlayStartseite").style.display = "none";
} 

function onEnde() {
	document.getElementById("overlayEnde").style.display = "block";
}

function offEnde() {
	document.getElementById("overlayEnde").style.display = "none";
} 

$(document).ready( function() {
	$( "#spieler2" ).hide();
	$( "#mehrspieler" ).hide();
	$( ".tooltip" ).hide();
     $( ".tooltiptext" ).hide();
     $("#overlayEnde").hide();
     $( "#nameSpielerZwei" ).hide();
     schalter();

     $('#schalterAnzahl').on('click', function() {
          schalter();
     });


     $('#schalterAuswahltyp').on('click', function() {
          if ( $( "#schalterAuswahltyp" ).is(":checked")) { //tastatur
               tastatur = true;
          } else { // maus
              tastatur = false; 
          }
     });


     $("#grad").on('change', function() {
          var schwierigkeit = $("#grad").val();
          switch (schwierigkeit) {
               case "leicht": $("#fragen").val("5");
               $("#stand").html("1/5");
               break;
               case "mittel": $("#fragen").val("15");
               $("#stand").html("1/15");
               break;
               case "schwer": $("#fragen").val(questions.length);
               $("#stand").html("1/" + questions.length);
               break;
               default: $("#fragen").val("5");
               $("#stand").html("1/5");
               break;
          }
     });

     $("#startButton").on('click', function() {
          $("#overlayStartseite").hide();
          $("#spielfeld").show();
          $("#nameSpielerEins").html($("#spielername1").val() + " : 0");
          $("#nameSpielerZwei").html($("#spielername2").val() + " : 0");

          $("#stand").html("1/" + $("#fragen").val());

          if($("#fragen").val() > questions.length) {
               $("#fragen").val(questions.length);
               sweetAlert("Maximal " + questions.length + " Fragen!", "Viel Spaß!", "error");
               $("#stand").html("1/" + $("#fragen").val());
          }

          ladenFragen();
     });

     $("#weiterButton").on('click', function() {
          sweetAlert("HALT - STOP", "Bitte zuerst die Frage beantworten!", "error");

     }); 

     $("#fragen").on("change", function() {

          $("#stand").html("0/" + $("#fragen").val());

          if($("#fragen").val() > questions.length) {
               $("#fragen").val(questions.length);
               sweetAlert("Maximal " + questions.length + " Fragen!", "Viel Spaß!", "error");
               $("#stand").html("0/" + $("#fragen").val());
          }

     });

     $("#neuesSpielButton").on("click", function() {
          window.location.reload();
     });

     $(".antwortButton").on("click", function() {
        
     if(tastatur == false  || $( "#schalterAnzahl" ).is(":checked")) {

          $(this).css("border", "4px solid black");

          var aktuelleFrage = beantwortet[beantwortet.length-1];
          var richtigeAntwort = questions[aktuelleFrage].richtig;
          console.log(richtigeAntwort);

          var antwortensatz = questions[aktuelleFrage].antworten;

          if($( "#schalterAnzahl" ).is(":checked")) { // 1 Spieler Modus

               if(richtigeAntwort == "a" && $(this).html() == antwortensatz.a) {
                    sweetAlert($(this).html(), "wurde als richtige Antwort ausgewählt!", "success");
                    punkteSpielerEins++;
               } else if(richtigeAntwort == "b" && $(this).html() == antwortensatz.b) {
                    sweetAlert($(this).html(), "wurde als richtige Antwort ausgewählt!", "success");
                    punkteSpielerEins++;
               } else if(richtigeAntwort == "c" && $(this).html() == antwortensatz.c) {
                    sweetAlert($(this).html(), "wurde als richtige Antwort ausgewählt!", "success");
                    punkteSpielerEins++;
               } else if(richtigeAntwort == "d" && $(this).html() == antwortensatz.d) {
                    sweetAlert($(this).html(), "wurde als richtige Antwort ausgewählt!", "success");
                    punkteSpielerEins++;
               } else {
                    sweetAlert($(this).html(), "wurde als falsche Antwort ausgewählt!", "error");
               }


               $("#nameSpielerEins").html($("#spielername1").val() + " : " + punkteSpielerEins);

               counter++;

               $(this).css("border", "solid #337FED 1px"); 

          
               counter++;
               naechsteFrage();



          } else { // 2 Spieler Modus

               if(counter%2 == 0) { //Spieler 1 ist an der Reihe
                    if(richtigeAntwort == "a" && $(this).html() == antwortensatz.a) {
                         spieler1richtig =true;
                    } else if(richtigeAntwort == "b" && $(this).html() == antwortensatz.b) {
                         spieler1richtig =true;
                    } else if(richtigeAntwort == "c" && $(this).html() == antwortensatz.c) {
                         spieler1richtig =true;
                    } else if(richtigeAntwort == "d" && $(this).html() == antwortensatz.d) {
                         spieler1richtig =true;
                    } else {                         
                         spieler1richtig =false;
                    }
                    sweetAlert("Nächster Spieler, bitte!", $("#spielername2").val() + " ist nun an der Reihe!", "null");
                    $("#nameSpielerEins").css("color", "black");
                    $("#nameSpielerZwei").css("color", "#0084D0");
                    $(this).css("border", "solid #337FED 1px"); 
                    counter++;

               } else { //Spieler 2 ist an der Reihe

                    if(richtigeAntwort == "a" && $(this).html() == antwortensatz.a) {
                              punkteSpielerZwei++;
                    } else if(richtigeAntwort == "b" && $(this).html() == antwortensatz.b) {
                              punkteSpielerZwei++;
                    } else if(richtigeAntwort == "c" && $(this).html() == antwortensatz.c) {
                              punkteSpielerZwei++;
                    } else if(richtigeAntwort == "d" && $(this).html() == antwortensatz.d) {
                              punkteSpielerZwei++;
                    } 

                    //Richtige Anwtort: 

                    if(richtigeAntwort == "a") {
                         sweetAlert(antwortensatz.a, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } else if(richtigeAntwort == "b") {
                         sweetAlert(antwortensatz.b, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } else if(richtigeAntwort == "c") {
                         sweetAlert(antwortensatz.c, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } else if(richtigeAntwort == "d") {
                         sweetAlert(antwortensatz.d, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } 

                    if(spieler1richtig == true) {
                         punkteSpielerEins++;
                    }

                    $("#nameSpielerEins").html($("#spielername1").val() + " : " + punkteSpielerEins);
                    $("#nameSpielerZwei").html($("#spielername2").val() + " : " + punkteSpielerZwei);

                    counter++;

                    $(this).css("border", "solid #337FED 1px"); 

                    //sweetAlert("Nächster Spieler, bitte!", $("#spielername1").val() + " ist nun an der Reihe!", "null");

                    $("#nameSpielerEins").css("color", "#0084D0");
                    $("#nameSpielerZwei").css("color", "black");

                    naechsteFrage();
               }
          }
     } else {
          sweetAlert("Bitte verwendet die Tastatur!", " Spieler 1: a, b, c, d \n Spieler 2: 1, 2, 3, 4", "error");
     }
     });


});

$( document ).keypress(function(e) {
     if(tastatur == true) {
     console.log(e.key);
     var aktuelleFrage = beantwortet[beantwortet.length-1];
     var richtigeAntwort = questions[aktuelleFrage].richtig;
     var antwortensatz = questions[aktuelleFrage].antworten;

     var antwortUser = e.key;
     
     counter++;
     
     //Spieler 1 hat gedrückt
                    if(richtigeAntwort == 'a' && antwortUser == 'a' && spieler1Beantwortet == false) {
                         punkteSpielerEins++;
                         spieler1Beantwortet = true;
                    } else if(richtigeAntwort == 'b' && antwortUser == 'b' && spieler1Beantwortet == false) {
                         punkteSpielerEins++;
                         spieler1Beantwortet = true;
                    } else if(richtigeAntwort == 'c' && antwortUser == 'c' && spieler1Beantwortet == false) {
                         punkteSpielerEins++;
                         spieler1Beantwortet = true;
                    } else if(richtigeAntwort == 'd' && antwortUser == 'd' && spieler1Beantwortet == false) {
                         punkteSpielerEins++;
                         spieler1Beantwortet = true;
                    } else if(antwortUser == 'a' || antwortUser == 'b' || antwortUser == 'c' || antwortUser == 'd') {
                         spieler1Beantwortet = true;
                    }

     //Spieler 2 hat gedrückt

                    if(richtigeAntwort == 'a' && antwortUser == '1' && spieler2Beantwortet == false) {
                              punkteSpielerZwei++;
                              spieler2Beantwortet = true;
                    } else if(richtigeAntwort == 'b' && antwortUser == '2' && spieler2Beantwortet == false) {
                              punkteSpielerZwei++;
                              spieler2Beantwortet = true;
                    } else if(richtigeAntwort == 'c' && antwortUser == '3' && spieler2Beantwortet == false) {
                              punkteSpielerZwei++;
                              spieler2Beantwortet = true;
                    } else if(richtigeAntwort == 'd' && antwortUser == '4' && spieler2Beantwortet == false) {
                              punkteSpielerZwei++;
                              spieler2Beantwortet = true;
                    } else if(antwortUser == '1' || antwortUser == '2' || antwortUser == '3' || antwortUser == '4') {
                              spieler2Beantwortet = true;
                    }

          if(spieler1Beantwortet == true && spieler2Beantwortet == true) { 
                    
                    //Richtige Antwort: 
                    if(richtigeAntwort == 'a') {
                         sweetAlert(antwortensatz.a, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } else if(richtigeAntwort == 'b') {
                         sweetAlert(antwortensatz.b, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } else if(richtigeAntwort == 'c') {
                         sweetAlert(antwortensatz.c, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    } else if(richtigeAntwort == 'd') {
                         sweetAlert(antwortensatz.d, "ist die richtige Antwort! \n Nächster Spieler, bitte!", "success");
                    }

                    $("#nameSpielerEins").html($("#spielername1").val() + " : " + punkteSpielerEins);
                    $("#nameSpielerZwei").html($("#spielername2").val() + " : " + punkteSpielerZwei);

                    counter++;
                    spieler1Beantwortet = false;
                    spieler2Beantwortet = false;
                    naechsteFrage();

     }             
     }
});

function schalter() {
     if ( $( "#schalterAnzahl" ).is(":checked")) {
          $( "#spieler2" ).hide();
          $( "#mehrspieler" ).hide();
          $( ".tooltip" ).hide();
          $( ".tooltiptext" ).hide();
          $( "#nameSpielerZwei" ).hide();
     } else {
          $( "#spieler2" ).show(); 
          $( "#mehrspieler" ).show();
          $( "#nameSpielerZwei" ).show();
               //$( ".tooltip" ).show();
               //$( ".tooltiptext" ).show();                
     }
}

function ladenFragen() {

$("#nameSpielerEins").css("color", "#0084D0");
var brauchIch = questions.length-1;

 var zufall= Math.round((Math.random() * (brauchIch - 0)) + 0);
 if(zufall > brauchIch || zufall < 1) {
     zufall= Math.round((Math.random() * (brauchIch - 0)) + 0);
}
for(var i = 0; i < beantwortet.length; i++) {
     if(zufall == beantwortet[i]) {
          zufall= Math.round((Math.random() * (brauchIch - 0)) + 0);
          i = -1;
     }
}
console.log(questions[zufall]);
var objekt = questions[zufall];
$("#frage").html(objekt.frage);
var antwortenObjekt = objekt.antworten;
$("#antwort1").html(antwortenObjekt.a);
$("#antwort2").html(antwortenObjekt.b);
$("#antwort3").html(antwortenObjekt.c);
$("#antwort4").html(antwortenObjekt.d);
beantwortet.push(objekt.id);
}

function naechsteFrage() {
     if($("#stand").html().split('/')[0] == $("#stand").html().split("/")[1]) {
          $("#overlayStartseite").hide();
          $("#spielfeld").hide();

          if($("#schalterAnzahl" ).is(":checked")) {
               $("#gewinnerName").html("1. Verlierer: " + $("#spielername1").val());
               $("#punktestandGewinner").html("Punktestand: " + punkteSpielerEins);
               $("#loser").hide();
          } else {     
               if(punkteSpielerEins > punkteSpielerZwei) {
                    $("#gewinnerName").html("1. Verlierer: " + $("#spielername1").val());
                    $("#punktestandGewinner").html("Punktestand: " + punkteSpielerEins);
                    $("#loserName").html("2. Verlierer: " + $("#spielername2").val());
                    $("#punktestandLoser").html("Punktestand: " + punkteSpielerZwei);
               } else if(punkteSpielerZwei > punkteSpielerEins) {
                    $("#gewinnerName").html("1. Verlierer: " + $("#spielername2").val());
                    $("#punktestandGewinner").html("Punktestand: " + punkteSpielerZwei);
                    $("#loserName").html("2. Verlierer: " + $("#spielername1").val());
                    $("#punktestandLoser").html("Punktestand: " + punkteSpielerEins);
               } else {                    
                    $("#gewinnerName").html("1. Verlierer: " + $("#spielername1").val());
                    $("#punktestandGewinner").html("Punktestand: " + punkteSpielerEins);
                    $("#loserName").html("1. Verlierer: " + $("#spielername2").val());
                    $("#punktestandLoser").html("Punktestand: " + punkteSpielerZwei);
               }
          }

          $("#overlayEnde").show();
          confetti.start();          
     } else {
          var frageZahl = parseInt($("#stand").html().split('/')[0]) + 1;
          $("#stand").html(frageZahl + "/" + $("#stand").html().split("/")[1]);
          ladenFragen()
     }
}


