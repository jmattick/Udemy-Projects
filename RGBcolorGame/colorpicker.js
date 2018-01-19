

var randRGB = function(){
	var r = Math.floor(255*Math.random());
	var g = Math.floor(255*Math.random());
	var b = Math.floor(255*Math.random());
	return "rgb("+r+", "+g+", "+b+")";

};
var tiles = document.querySelectorAll(".til");
var colors = [];
var winInd;
var target;
var hmode = true;
var mode = 6;
var generator = function(){
	if (hmode){
		for (var i = 0; i<tiles.length; i++){
			var temp = randRGB();
			colors.push(temp);
			tiles[i].style.backgroundColor = temp;

		}
	} else {
		for (var i = 0; i<3; i++){
		var temp = randRGB();
		colors.push(temp);
		tiles[i].style.backgroundColor = temp;
		}
	}
};
generator();
var winColor = function(m){
	var num =  Math.floor(m*Math.random());
	return num;	
};
winInd = winColor(mode);
var winCol = colors[winInd];
document.querySelector("h2").textContent = winCol;
//add event listeners for clicking on divs
for (var i = 0; i<tiles.length; i++){
	tiles[i].addEventListener("click", function(){
		var id = this.id;
		checker(id);
	});	
}
//evaluate if correct
var checker = function(a){
	if (a == winInd) {
		document.getElementById("topstuff").style.backgroundColor = colors[winInd];
		document.getElementById("topstuff").classList.remove("background-anim");
		reset();
	} else {
		var x = document.getElementById(String(a));
		fade(x);
	}
};
var fade =  function(x){
	console.log(x);
	var target = x;
	target.classList.add("hidden");
};
var reset = function(){
	colors = [];
	winCol = "";
	generator();
	if (hmode){
		for (var i = 0; i < tiles.length; i++) {
		//clearInterval(fade);
	   	tiles[i].classList.remove("hidden");
		}
		mode = 6;
	} else {
		for (var i = 0; i < 3; i++) {
		//clearInterval(fade);
	   	tiles[i].classList.remove("hidden");
		}
		mode = 3;
	}
	winInd = winColor(mode);
	winCol = colors[winInd];
	document.querySelector("h2").textContent = winCol;
	console.log(winCol);
};
//new easy hard buttons
var newButton = document.getElementById("new");
newButton.addEventListener("click", function(){
	reset();
});
var easyButton = document.getElementById("easy");
easyButton.addEventListener("click", function(){
	hardButton.classList.remove("selected-btn");
	easyButton.classList.add("selected-btn");
	hmode = false;
	reset();
	for (var i = 3; i<tiles.length; i++){
		tiles[i].classList.add("hidden");
	}
});
var hardButton = document.getElementById("hard");
hardButton.addEventListener("click", function(){
	hardButton.classList.add("selected-btn");
	easyButton.classList.remove("selected-btn");
	hmode = true;
	reset();
	for (var i = 3; i<tiles.length; i++){
		tiles[i].classList.remove("hidden");
	}
});
