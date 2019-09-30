class Program {
	constructor(name, desc, buttontxt, author, path) {
		this.name = name;
		this.desc = desc;
		this.buttontxt = buttontxt;
		this.parent = parent;
		this.author = author;
		this.path = path;
	}

	getHTML() {
		let html = '';
		html += '<div class="program">';
		html += '<h3>' + this.name + '</h3>';
		html += '<span id="author">von ' + this.author + '</span><hr>';
		html += '<span id="desc">' + this.desc + '</span><hr>';
		html += '<button onclick="cp(\'' + this.path + '\')">' + this.buttontxt + '</button>';
		html += '</div>';
		return html;
	}
}