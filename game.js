var ctx;
var score = 0;
var timer = 10;
var options = {
	width: $("#canvas").width(),
	height: $("#canvas").height()
};

var canvas = document.getElementById('canvas');
if (canvas.getContext) {
	ctx = canvas.getContext('2d');
	createCircles();
	timerLogic();
}

function createCircles(){
	setTimeout(function(){
		cleanCanvas();
		ctx.beginPath();
		drawCircle();
		ctx.fill();
		canvas.onclick = function (e) {
			var mouseX = e.clientX - canvas.getBoundingClientRect().left;
			var mouseY = e.clientY - canvas.getBoundingClientRect().top;
			if (ctx.isPointInPath(mouseX, mouseY)) {
			  ctx.fill();
			  cleanCanvas();
			  updateScore();
			}
		};
		if (timer > 1)
			createCircles();
		else
			cleanCanvas();
	},2000);
}
function drawCircle(){
	var radius = 10;
	var x = generateRandomNumber(radius, options.width-radius);
	var y = generateRandomNumber(radius, 150-radius);
	ctx.arc( x, y, radius, 0, (Math.PI/180)*360, false);
}
function generateRandomNumber(minValue,maxValue){
	var result = -1;
	while(result < minValue || result > maxValue){
		result = parseInt(Math.floor(Math.random() * maxValue) + 1);
	}
	return result;
}
function cleanCanvas(){
	ctx.clearRect(0, 0, options.width, options.height);
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function updateScore(){
	$(".scoreValue").text(++score);
}
function timerLogic(){
	setTimeout(function(){
		$(".timerValue").text(--timer);
		if (timer > 0)
			timerLogic();
	},1000);
}