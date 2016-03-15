var ctx;
var score = 0;
var timer = 30;
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
	var radius = 10;
	function doProcess(){
		cleanCanvas();
		ctx.beginPath();
		var xyObj = drawCircle(generateRandomNumber(radius, options.width-radius), generateRandomNumber(radius, 150-radius), 10);
		ctx.fill();
		canvas.onclick = function (e) {
			var mouseX = e.clientX - canvas.getBoundingClientRect().left;
			var mouseY = e.clientY - canvas.getBoundingClientRect().top;
			if (ctx.isPointInPath(mouseX, mouseY)) {
				clearTimeout(timerDoProcess);
				eliminiateCircle({x: mouseX, y: mouseY});
				canvas.onclick = null;;
			  updateScore();
			}
		};
		if (timer > 1)
			createCircles();
		else
			cleanCanvas();
	}
	timerDoProcess = setTimeout(doProcess, 1000);
}
function eliminiateCircle(xyObj){
	cleanCanvas();
	ctx.beginPath();
	drawCircle(xyObj.x, xyObj.y, 10);
	ctx.fill();
	xyObj.y += 1;
	if (xyObj.y < 200)
		setTimeout(function(){eliminiateCircle(xyObj)},10);
	else
		createCircles();
}
function drawCircle(x, y, radius){
	ctx.arc( x, y, radius, 0, (Math.PI/180)*360, false);
	return xyObj = {
		x: x,
		y: y
	};
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
		if (timer == 10)
			changeMusic('starman');
		if (timer > 0)
			timerLogic();
		else
			changeMusic('flag');
	},1000);
}
function changeMusic(name){
	$("#backgroundMusic").remove();
	$("body").append("<embed id='backgroundMusic' src='music/"+name+".mp3' width='180' height='90' loop='false' hidden='true' volume='99'  />")
}