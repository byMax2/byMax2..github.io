function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

let words = ["Haselnuss","Walnuss","Keller","Kräftig", "Deftig","Duftet", "Maximal","Behindert","Jaloussie","Zimt", "Ketchup", "Brillenschlange", "Nacktsnegge", "Kurz", "Affe","Lang", "Jazz","Romanisiert", "Zelosko","Jehova","Google","Windows","Schwert","Kaktus","Krechel","Spekulatius", "Apfelbaumgarten", "Birnenbaumgarten","Kerze","Hund","Tasse","Whiteboard","Bauz","Pizza","Wasser","Taschentuch","Fenster","Siebzig","Kuchen", "Javascript", "Maximilian", "Ein Kasten Wasser"];

var win = document.getElementById("win");
var wrong = document.getElementById("wrong");
var right = document.getElementById("right");
var lost = document.getElementById("lost");

wrong.volume = 0.5;
lost.volume = 0.5;
right.playbackRate = 0.5

var index;
var check = true;
var counter = 12;
var numb;
var started = false;

var loesung;
var key;
var coded = "";
var zwSp = "";

window.onload =function(){
	loadMp3();
	$(document).keypress(function(event){
		if(started){
			check = true;
			key = event.originalEvent.key.toLowerCase();
			for(var i=0; i<loesung.length;i++){
				if(key == loesung.toLowerCase().charAt(i,1)){
					var char = loesung.charAt(i,1);
					let zwSp = coded.split("");
					zwSp[i] = char;
					coded = zwSp.join('');					
					right.play();
					$("#loesung").text(coded);
					checkWin();
					check = false;
				};
			};
			if(check){
				counter--;
				
				if(counter>0){
					numb++;
					$("#letter").append(key +"  ");
					wrong.play();
					update();
				}
				else{
					lost.play();
					alert("Sie haben verloren!");
					refresh();
				}
			}
		}
	});
};

$("#btnPly").on("click",start);

function update(){
	$("#img").attr("src", "./img/"+numb+".PNG");
	$("#versuche").text("Versuche: " +counter);
};

function start(){
	started = true;
	refresh();
	update();
	index = Math.floor(Math.random()*(words.length-1));
	loesung = words[index];
	for (var i = 0; i < loesung.length; i++) {
		if (loesung.charAt(i) != " ")
			coded+="_";
		else
			coded+= "   ";
	}
	$("#loesung").text(coded);
};

function refresh(){
	coded = "";
	counter = 12;
	numb=0;
	$("#letter").text("");
	$("#loesung").text("");
	update();
}
function checkWin(){
	var bool = true;
	for (var i = 0; i < coded.length; i++) {
		if(coded[i] == "_"){
			bool=false;
		}
	}
		if(bool){
			win.play();
			confetti.start(3);
			alert("Sie haben gewonnen. Das Wort war " + coded +".");
			start();
		}	
}
function loadMp3(){
	right.load();
	wrong.load();
	win.load();
}