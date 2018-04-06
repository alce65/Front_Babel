$(function(){
	var canvas = document.getElementById("game");  
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "red";
	ctx.arc(100, 100, 50 , 0, Math.PI*2, true); 
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(210, 100, 50, 0, Math.PI*2, true);
	ctx.fillStyle = "green";
	ctx.fill();
});
