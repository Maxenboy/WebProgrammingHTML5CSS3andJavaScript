/*  Max Åberg
 mabe1411
 aaberg.max@gmail.com   */
var nbrOfTeams;
var ok;

function init() {
	while (!ok) {
		hide();
		nbrOfTeams = prompt("Please specify the number of teams that will participate:");
		var pattern = /^[2-9]+$|[1-9][0-9]+$/;
		if (!pattern.test(nbrOfTeams)) {
			window.alert("Sorry, the input can only be numbers and at least 2");
		} else {
			ok = true;
		}
	}
}

function hide() {
	if (document.getElementById("random").checked) {
		document.getElementById("wrapper").setAttribute("class", "hidden");
		document.getElementById("wrapper1").setAttribute("class", "");
	} else {
		document.getElementById("wrapper1").setAttribute("class", "hidden");
		document.getElementById("wrapper").setAttribute("class", "");
	}
}

function generate() {
	var text = decodeURIComponent(window.location.search.substring(1)).replace(/\s+/g, '\\n');
	text = text.replace(/\+/g, ' ');
	var choise = text.substr(text.search("radio") + 6, 6);
	if (choise == "random") {
		text = text.substring(text.search("area") + 5, text.length);
		var names = text.split("\\n");
		document.getElementById("result").innerHTML=names[0];
		random(names);
	} else {
		var men = text.substring(text.search("mentext") + 8, text.search("womentext") - 1);
		var women = text.substring(text.search("womentext") + 10, text.search("area") - 1);
		gender(men, women);
	}
}

function random(text) {

}

function gender(men, women) {

}
