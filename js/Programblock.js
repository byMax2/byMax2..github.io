class Programblock {


	constructor(name, programms, color) {
		this.name = name;
		this.programms = programms;
		this.color = color;
	}

	getHTML() {
		let html = '';

		html += '<div class="programblock" id="' + this.name.toLowerCase() + '" style="background-color: ' + this.color + '">';
		html += '<h2>' + this.name + ':</h2>';
		if(this.programms.length > 0)
			for (let i = 0; i < this.programms.length; i++) 
				html += this.programms[i].getHTML();
		html += '</div>';
		return html;
	}
}