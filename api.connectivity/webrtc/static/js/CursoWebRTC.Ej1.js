var CursoWebRTC = CursoWebRTC || {};

CursoWebRTC.Ej1 = (function(C, undefined) {

	var CONSTRAINTS = {
		audio: true,
		video: {
			mandatory: {
				maxWidth: 320,
				maxHeight: 240
			}
		}
	};

	var SCREEN_SHARE = {
		video: {
			mandatory: {
				chromeMediaSource: 'screen'
			}
		}
	};

	var params = {};

	var prepare = function(){
		params['video'] = document.getElementById("myvideo");
		params['screen'] = document.getElementById("myscreen");
		params['canvas'] = document.getElementById("mycanvas");
		params['photo'] = document.getElementById("myphoto");
		params['effectcanvas'] = document.getElementById("myeffectcanvas");

		//We need to ensure a crossbrowser getUserMedia
		navigator.getUserMedia = (navigator.getUserMedia ||
								navigator.webkitGetUserMedia ||
								navigator.mozGetUserMedia ||
								navigator.msGetUserMedia );
	};

	var init = function(){
		if(navigator.getUserMedia){
			navigator.getUserMedia(CONSTRAINTS, gotStream, error);
		}else{
			error("Your browser does not support WebRTC");
		}
	};

	var gotStream = function(stream){
		params['stream'] = stream;
		params['video'].src = window.URL.createObjectURL(stream);
	};

	var stop = function(){
		params['stream'].stop();
	};

	var takePhoto = function(){
		//First we draw to a canvas tag
		var ctx = params["canvas"].getContext('2d');
		ctx.drawImage(params["video"],0,0,320,240);
	};

	var canvasToImage = function(){
		//After that to an image tag
		var data = params["canvas"].toDataURL('image/png');
		console.error(data);
		params["photo"].setAttribute('src', data);
	};

	var videoToCanvas = function(){
		//Take a photo and show it at 30fps
		params["interval"] = setInterval(takePhoto, 1000/30);
	};

	var stopVideoToCanvas = function(){
		clearInterval(params["interval"]);
	};

	var effectCanvas = function(firstTime){
		//Draw the "regular" image to the first canvas
		var ctx = params["canvas"].getContext('2d');
		ctx.drawImage(params["video"],0,0,320,240);

		//Take the canvas data
		var idata = ctx.getImageData(0,0,320,240);
		var data = idata.data;
		
		var center_x = - 240 / 2;
		var center_y = - 320 / 2;

		var row = 0;
		var col = 0;

		//Iterate trough the pixels (jump 4)
		for(var i = 0; i < data.length; i+=4) {

			var r = data[i];
			var g = data[i+1];
			var b = data[i+2];

			//Calc greyscale
			var brightness = (3*r+4*g+b)>>>3;

			if(_distance_A_B([center_x,center_y],[row, col]) < 100){
				//Set greyscale
				data[i] = brightness;
				data[i+1] = brightness;
				data[i+2] = brightness;				
			} else{
				data[i] = 255;
				data[i+1] = 255;
				data[i+2] = 255;	
				data[i+3] = 0;		
			}


			col ++;
			if(col==320){
				col = 0;
				row++;
			}
		}
		idata.data = data;

		//Draw it to the effect canvas
		var ctx2 = params["effectcanvas"].getContext('2d');
		ctx2.save();
		ctx2.beginPath();
		ctx2.moveTo(100,100);
		ctx2.lineTo(100,200);
		ctx2.lineTo(200,200);
		ctx2.lineTo(100,100);
		ctx2.clip();

		ctx2.putImageData(idata,0,0);

		//Repeat at 30fps
		if(firstTime)
			params["interval"] = setInterval(effectCanvas, 1000/30);
	};

	var initScreenSharing = function(){
		if(navigator.getUserMedia){
			navigator.getUserMedia(SCREEN_SHARE, gotScreenStream, error);
		}else{
			error("Your browser does not support WebRTC");
		}
	};

	var gotScreenStream = function(stream){
		params['screenstream'] = stream;
		params['screen'].src = window.URL.createObjectURL(stream);
	};

	var stopScreenSharing = function(){
		params['screenstream'].stop();
	};

	var error = function(text){
		console.warn(text);
	};

	var _distance_A_B =  function(A,B){
		var d = Math.sqrt(( (A[0]+B[0]) * (A[0]+B[0]) ) + ( (A[1]+B[1]) * (A[1]+B[1]) ))
		return d;
	};

	return {
		prepare: prepare,
		init: init,
		stop: stop,
		takePhoto: takePhoto,
		canvasToImage: canvasToImage,
		videoToCanvas: videoToCanvas,
		stopVideoToCanvas: stopVideoToCanvas,
		effectCanvas: effectCanvas,
		initScreenSharing: initScreenSharing,
		stopScreenSharing: stopScreenSharing,
		params: params,
		_distance_A_B: _distance_A_B
	};

})(CursoWebRTC);