/*  Max Åberg
mabe1411
aaberg.max@gmail.com   */

//the variable that contains the URI string
var text = "";
//The variable that contains the number of teams provided by the user
var nbrOfTeams = 0;
//the variable that contains which type, provided by the user, of generation should be performed
var choice = "";
//the variable that contains the end result of the generation
var endResult = "";
//the variable that contains the index, which the random function uses
var index = 0;
//the variable that contains the index for a man, which is used in the gender function
var manindex = 0;
//the variable that contains the index for a woman, which is used in the gender function
var womenindex = 0;
//the variable that contains an array where the different names are placed in each element, used by the random function
var names = [];
//the variable that contains an array where the different names are placed in each element, the elements order are changed
var participants = [];
//the variable that contains an array where the different men names are placed in each element
var men = [];
//the variable that contains an array where the different women names are placed in each element
var women = [];

/*The functions that calls the function hide
 * It's called when the start page is loaded
 * Hide, hides the opposite generation textarea(s) */
function init() {
	hide();
}

/*The function hides the gender or the random variant of div depending on which radiobutton that's checked'*/
function hide() {
	if (document.getElementById("random").checked) {//checks if the radibutton random is checked/clicked
		document.getElementById("genderwrapper").setAttribute("class", "hidden");
		//applies the css class hidden to the gender div
		document.getElementById("randomwrapper").setAttribute("class", "");
		//removes the css class hidden to the random div
	} else {
		document.getElementById("randomwrapper").setAttribute("class", "hidden");
		//applies the css class hidden to the random div
		document.getElementById("genderwrapper").setAttribute("class", "");
		//removes the css class hidden to the gender div
	}
}

/*The function that calls the different functions depending on which radiobutton that is checked*/
function generate() {
	//stores the form part from the URI and replaces all newlines with \n
	text = decodeURIComponent(window.location.search.substring(1)).replace(/\s+/g, '\\n');
	//replaces all the +-signs with white-spaces
	text = text.replace(/\+/g, ' ');
	//searches and stores the part from the URI that states which radiobutto is checked
	choice = text.substr(text.search("radio") + 6, 6);
	//searches and stores the part from the URI that states how many teams the user provided
	nbrOfTeams = text.substr(text.search("nbrOfTeams") + 11, text.search("radio") - 12);
	//stores the number of teams to the local storage
	localStorage.setItem('nbrOfTeams', nbrOfTeams);
	if (choice == "random") {
		//searches and stores the names given in the textarea, split on newline, returning an array with all the names in separate elements
		names = text.substring(text.search("area") + 5, text.length).split("\\n");
		names = names.filter(function(e) {/*Removes white-space elements*/
			return (/\S+/).test(e);
		});
		localStorage.setItem('names', JSON.stringify(names)); //stores the names to the local storage, uses JSON to make a representative string of the object
		random(names);
	} else {
		men = text.substring(text.search("mentext") + 8, text.search("womentext") - 1).split("\\n");
		women = text.substring(text.search("womentext") + 10, text.search("area") - 1).split("\\n");
		men = men.filter(function(e) {/*Removes white-space elements*/
			return (/\S+/).test(e);
		});
		women = women.filter(function(e) {/*Removes white-space elements*/
			return (/\S+/).test(e);
		});
		localStorage.setItem('men', JSON.stringify(men));
		localStorage.setItem('women', JSON.stringify(women));
		gender(men, women);
	}
}

function random(names) {
	if (names.length !== 0 && names.length > localStorage.getItem('nbrOfTeams')) {
		nbrOfTeams = localStorage.getItem('nbrOfTeams');
		randomConcat(names);
		for ( i = 0; i < participants.length; i++) {
			endResult += participants[i];
		}
	} else {
		endResult += "Sorry, the number of participants must be greater then the number of teams <br> Please close this tab to re-generate";
	}
	document.getElementById("result").innerHTML = endResult;
}

function gender(men, women) {
	if (men.length !== 0 && women.length !== 0 && (men.length + women.length) > localStorage.getItem('nbrOfTeams')) {
		nbrOfTeams = localStorage.getItem('nbrOfTeams');
		concat(men, women);
		for ( i = 0; i < participants.length; i++) {
			endResult += participants[i];
		}
	} else {
		endResult += "Sorry, the number of participants must be greater then the number of teams <br> Please close this tab to re-generate";
	}
	document.getElementById("result").innerHTML = endResult;
}

function randomConcat(names) {
	var team = 0;
	for ( i = 0; i < nbrOfTeams; i++) {
		participants.push("<h1><u>Team " + (i + 1) + "</u></h1>");
	}
	while (names.length > 0) {
		index = Math.floor((Math.random() * names.length));
		participants[team] += (names[index]) + "<br>";
		names.splice(index, 1);
		team++;
		if (team >= nbrOfTeams) {
			team = 0;
		}
	}
}

function concat(men, women) {
	var team = 0;
	for ( i = 0; i < nbrOfTeams; i++) {
		participants.push("<h1><u>Team " + (i + 1) + "</u></h1>");
	}
	while (men.length > 0) {
		manindex = Math.floor((Math.random() * men.length));
		participants[team] += (men[manindex]) + "<br>";
		men.splice(manindex, 1);
		team++;
		if (team >= nbrOfTeams) {
			team = 0;
		}
	}
	while (women.length > 0) {
		womenindex = Math.floor((Math.random() * women.length));
		participants[team] += (women[womenindex]) + "<br>";
		women.splice(womenindex, 1);
		team++;
		if (team >= nbrOfTeams) {
			team = 0;
		}
	}
}

function switchOnRadio() {
	var path = window.location.pathname;
	var page = path.substring(path.lastIndexOf('/') + 1);
	if (page == "index.html") {
		document.getElementById("random").addEventListener("click", hide, false);
		document.getElementById("gender").addEventListener("click", hide, false);
	}
}

function view() {
	var path = window.location.pathname;
	var page = path.substring(path.lastIndexOf('/') + 1);
	if (page == "view.html") {
		generate();
	}
}

function initiate() {
	var path = window.location.pathname;
	var page = path.substring(path.lastIndexOf('/') + 1);
	if (page == "index.html") {
		init();
	}
}

window.addEventListener("load", switchOnRadio, false);
window.addEventListener("load", view, false);
window.addEventListener("load", initiate, false);
