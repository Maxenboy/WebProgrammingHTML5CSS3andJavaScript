/*  Max Åberg
 mabe1411
 aaberg.max@gmail.com   */
var ok;
var nbrOfTeams;
var rest;
var minimumParticipants;
var endResult;
var index;
var names;

function init() {
	while (!ok) {
		hide();
		var nbrOfTeams = prompt("Please specify the number of teams that will participate:");
		var pattern = /^[2-9]+$|[1-9][0-9]+$/;
		if (!pattern.test(nbrOfTeams)) {
			window.alert("Sorry, the input can only be numbers and at least 2");
		} else {
			ok = true;
			localStorage.setItem('nbrOfTeams', nbrOfTeams);
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
		names = text.substring(text.search("area") + 5, text.length).split("\\n");
		names = names.filter(function(e) {/*Removes white-space elements*/
			return /\S+/.test(e);
		});
		random(names);
	} else {
		var men = text.substring(text.search("mentext") + 8, text.search("womentext") - 1).split("\\n");
		var women = text.substring(text.search("womentext") + 10, text.search("area") - 1).split("\\n");
		men = men.filter(function(e) {/*Removes white-space elements*/
			return /\S+/.test(e);
		});
		women = women.filter(function(e) {/*Removes white-space elements*/
			return /\S+/.test(e);
		});
		gender(men, women);
	}
}

function random(names) {
	nbrOfTeams = localStorage.getItem('nbrOfTeams');
	rest = names.length % nbrOfTeams;
	minimumParticipants = Math.floor(names.length / nbrOfTeams);
	document.getElementById("result").innerHTML = names.length;
	endResult = "";
	index = 0;
	switch(true) {
	case (rest==1):
		for ( i = 0; i < nbrOfTeams; i++) {
			endResult += ("<h1><u>Team " + (i + 1) + "</u></h1>");
			for ( j = 0; j < minimumParticipants + rest; j++) {
				index = Math.floor((Math.random() * names.length));
				endResult += names[index] + "<br>";
				names.splice(index, 1);
			}
			rest = 0;
		}
		break;
	case (rest>1):
		var count = 0;
		for ( i = 0; i < nbrOfTeams; i++) {
			endResult += ("<h1><u>Team " + (i + 1) + "</u></h1>");
			if (count < rest) {
				arrayFetch(1);
				count++;
			} else {
				arrayFetch(0);
			}
		}
		break;
	default:
		for ( i = 0; i < nbrOfTeams; i++) {
			endResult += ("<h1><u>Team " + (i + 1) + "</u></h1>");
			arrayFetch(0);
		}
	}
	document.getElementById("result").innerHTML = endResult;
}

function gender(men, women) {

}

function arrayFetch(diff) {
	for ( j = 0; j < minimumParticipants + diff; j++) {
		index = Math.floor((Math.random() * names.length));
		endResult += names[index] + "<br>";
		names.splice(index, 1);
	}
}

function switchOnRadio() {
	document.getElementById("random").addEventListener("click", hide, false);
	document.getElementById("gender").addEventListener("click", hide, false);
}

window.addEventListener("load", init, false);
window.addEventListener("load", switchOnRadio, false);
window.addEventListener("load", generate, false);
