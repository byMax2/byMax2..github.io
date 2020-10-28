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
	$('footer').click(function() {
			swal({
				icon: "info",
				title: "Information",
				text: "Dieses Programmverzeichnis beinhaltet jegliche Inhalte zum Thema des Ausbildungsjahrgangs 2018 der Fachinfomatiker der Ämter Deutschlands.",
			});
	});
});

function buildSide() {

	let gameslist = [];
	let testlist = [];
	let html = "";
	gameslist.push(new Program("Role-Play-Game", "Das Spiel kombiniert Aspekte eines<br> Aufbaustrategiespiels. Das Spiel fordert<br> den Spieler herraus, ein kleines Dorf in<br> Logischer Reihenfolge auf zu bauen", "spielen", "Maximilian Lude", "RPG"));
	gameslist.push(new Program("Mensch Ärgere dich Nicht", "Das Ziel des Klassikers besteht darin, die vier<br> eigenen Spielfiguren von den Startfeldern auf<br> die Zielfelder zu ziehen. Dazu müssen die<br> Figuren das Spielbrett einmal umrunden. <br>Über die Anzahl der zu ziehenden Felder<br> pro Runde entscheidet ein Würfel.", "spielen", "Maximilian Lude", "MADN"));
	gameslist.push(new Program("Lemongame as React", "Ein Clicker in dem man mit Zitronen<br>sehr viel Spaß hat", "spielen", "Maximilian Lude", "LemongameReact"));

	if(allprogramms) {
		gameslist.push(new Program("Lemongame", "Ein Clicker über Zitronen", "spielen", "Nicolai Krechel", "Lemongame"));	
		gameslist.push(new Program("Dimensions", "Ein Clicker bei dem es nur um Dimensionen geht", "spielen", "Nicolai Krechel", "Dimensions"));	
		gameslist.push(new Program("FlappyBird", "Ein Pixel durch einen Pakour bringen", "spielen", "Nicolai Krechel", "FlappyBird"));
		gameslist.push(new Program("Snake", "Sammele Pixel auf um Größer zu werden", "spielen", "Nicolai Krechel", "Snake"));
		gameslist.push(new Program("Matter Merge", "Verschmelze Packete<br>für mehr Materie", "spielen", "Nicolai Krechel", "Merge"));
		gameslist.push(new Program("Galgenmaennchen", "Errate ein Wort inerhalb<br>12 Versuche", "spielen", "Tristan Schmidt", "Galgenmaennchen"));
		gameslist.push(new Program("Quiz", "Fragen Beantworten mit A,B,C oder D", "spielen", "Elena Diehl & Jessica Handke", "Quiz"));
		gameslist.push(new Program("Schere Stein Papier", "Suche ein Zeichen aus<br>und guck wer gewinnt", "spielen", "Elena Diehl & Jessica Handke", "SchereSteinPapier"));
		gameslist.push(new Program("Schiffeversänken", "Logisches Spiel von Erraten<br>von Schiffspositionen", "spielen", "Pierre Steinwart", "Schiffeversaenken"));
		gameslist.push(new Program("Tic Tac Toe", "Wer zu erst auf einem 3x3 Feld<br>3 neben einander oder diagonal hat, gewinnt", "spielen", "Christoph Nothen", "TicTacToe"));							
	}

	testlist.push(new Program("Hörtest", "Es wird eine bestimmte Frequenz abgespielt,<br> die nach belieben verändert werden kann.<br> Jenachdem wie lange man den Ton noch hört,<br> kann man beurteilen, wie gut das eigene Gehör ist.", "starten", "Maximilian Lude", "Hearing"))
	testlist.push(new Program("Arbeitszeitzähler", "Man gibt die Zeit an, zu welcher man eingestochen hat und <br> bekommt die Zeit angezeigt, an der man bedenkenlos gehen darf", "starten", "Maximilian Lude", "Arbeitszeitzaehler"))
	
	html += new Programblock("Spiele", gameslist, "#ffc40d").getHTML();
	html += new Programblock("Tests", testlist, "#da532c").getHTML();

	$('#content').html(html);
	
}


function cp(seite) {
		window.open(seite + "/");
}
