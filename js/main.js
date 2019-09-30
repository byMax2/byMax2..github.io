let allprogramms = false;

$(window).ready(function() {
	buildSide();
	$('h1').click(function() {
		if (!allprogramms) {
			allprogramms = true;
			buildSide();
		} else {
			allprogramms = false;
			buildSide();
		}
	});
});

function buildSide() {

	let gameslist = [];
	let testlist = [];
	let html = "";
	gameslist.push(new Program("Role-Play-Game", "Das Spiel kombiniert Aspekte eines<br> Aufbaustrategiespiels. Das Spiel fordert<br> den Spieler herraus, ein kleines Dorf in<br> Logischer Reihenfolge auf zu bauen", "spielen", "Maximilian Lude", "RPG"));
	gameslist.push(new Program("Mensch Ärgere dich Nicht", "Das Ziel des Klassikers besteht darin, die vier<br> eigenen Spielfiguren von den Startfeldern auf<br> die Zielfelder zu ziehen. Dazu müssen die<br> Figuren das Spielbrett einmal umrunden. <br>Über die Anzahl der zu ziehenden Felder<br> pro Runde entscheidet ein Würfel.", "spielen", "Maximilian Lude", "MADN"));

	if(allprogramms) {
		gameslist.push(new Program("Lemongame", "...", "spielen", "Nicolai Krechel", "Lemongame"));	
		gameslist.push(new Program("Dimensions", "...", "spielen", "Nicolai Krechel", "Dimensions"));	
		gameslist.push(new Program("FlappyBird", "...", "spielen", "Nicolai Krechel", "FlappyBird"));
		gameslist.push(new Program("Snake", "...", "spielen", "Nicolai Krechel", "Snake"));				
	}

	testlist.push(new Program("Hörtest", "Es wird eine bestimmte Frequenz abgespielt,<br> die nach belieben verändert werden kann.<br> Jenachdem wie lange man den Ton noch hört,<br> kann man beurteilen, wie gut das eigene Gehör ist.", "starten", "Maximilian Lude", "Hearing"))
	
	html += new Programblock("Spiele", gameslist, "#ffc40d").getHTML();
	html += new Programblock("Tests", testlist, "#da532c").getHTML();

	$('#content').html(html);
	
}


function cp(seite) {
		window.open(seite + "/index.html");
}
