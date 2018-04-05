var CursoWebRTC = CursoWebRTC || {};

CursoWebRTC.Ej2 = (function(C, undefined) {

	var CONSTRAINTS = {
		audio: true,
		video: {"optional":[{"minWidth":"1280"},{"minHeight":"720"}]}
	};

	var PCCONFIG = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}, { url: 'turn:104.155.26.203', credential: 'ejemplo', username: 'ejemplo@cursowebrtc.com'}]};
	var PCCONSTRAINTS = {"optional": [{"googImprovedWifiBwe": true}]};
	var OFFERCONSTRAINTS = {"optional": [], "mandatory": {}};
	var SDPCONSTRAINTS = {
		'mandatory': {
			'OfferToReceiveAudio': true,
			'OfferToReceiveVideo': true
		},
		'optional': [
			{'VoiceActivityDetection': false}
		]
	};

	var params = {};

	var prepare = function(){
		params['video'] = document.getElementById("myvideo");
		params['remotevideo'] = document.getElementById("remotevideo");

		//We need to ensure a crossbrowser getUserMedia
		navigator.getUserMedia = (navigator.getUserMedia ||
								navigator.webkitGetUserMedia ||
								navigator.mozGetUserMedia ||
								navigator.msGetUserMedia );
	};

	var init = function(){
		//1.) GetUserMedia
		if(navigator.getUserMedia){
			navigator.getUserMedia(CONSTRAINTS, gotStream, error);
		}else{
			error("Your browser does not support WebRTC");
		}
	};

	var initSignaling = function(){
		//2.) Initialize Signaling
		C.PubnubSignaling.init("mysuperchannel", gotMessage);
	};

	var initPeerConnection = function(ICaller){
		//3.) Init peer connection
		params["peerConnection"] = new RTCPeerConnection(PCCONFIG, PCCONSTRAINTS);

		//Prepare listeners
		params["peerConnection"].onicecandidate = onIceCandidate;
		params["peerConnection"].onaddstream = onAddStream;
		params["peerConnection"].onremovestream = onRemoveStream;
		params["peerConnection"].onsignalingstatechange = onSignalingStateChange;
		params["peerConnection"].oniceconnectionstatechange = onIceConnectionStateChange;

		//Add my stream to the peerconnection
		params["peerConnection"].addStream(params['stream']);

		if(ICaller){
			//I am calling
			var constraints = mergeConstraints(OFFERCONSTRAINTS, SDPCONSTRAINTS);
			params["peerConnection"].createOffer(SDPofferReady, SDPofferError, constraints);
		} else{
			//I am the one being called
			//TODO
		}
	};

	var sendSDPOffer = function(){
		//4. Send SDP Offer
		var message = JSON.stringify(params['sdpoffer']);
		C.PubnubSignaling.publish(message);
	};

	var sendSDPAnswer = function(){
		console.log("sendSDPAnswer");
		params["peerConnection"].createAnswer(function(answer){
			params["peerConnection"].setLocalDescription(answer);
			C.PubnubSignaling.publish(JSON.stringify(answer));
		}, function(error){
			console.log(error);
		},SDPCONSTRAINTS);
	};

	var gotMessage = function(message){
		console.log("gotMessage: " + message);

		//Start processing:
		try{
			var msg = JSON.parse(message);
			if(msg.type === 'offer'){
				console.log('JUST RECEIVED AN SDP OFFER');
				params["peerConnection"].setRemoteDescription(new RTCSessionDescription(msg), onSetRemoteDescriptionSuccess, onSetSessionDescriptionError);
			} else if(msg.candidate){
				console.log('JUST RECEIVED AN ICE CANDIDATE');
				var buildcandidate = new RTCIceCandidate({sdpMLineIndex: msg.label, candidate: msg.candidate});
				params["peerConnection"].addIceCandidate(buildcandidate);
			} else{
				console.log('JUST RECEIVED AN SDP ANSWER');
				params["peerConnection"].setRemoteDescription(new RTCSessionDescription(msg), onSetRemoteDescriptionSuccess, onSetSessionDescriptionError);
			}
			console.log("End of processing");
		}catch(e){
			console.warn("Unable to parse signaling message: " + e);
		}
	};

	var gotStream = function(stream){
		console.log("STREAM READY");
		console.log(this);
		params['stream'] = stream;
		params['video'].src = window.URL.createObjectURL(stream);
	};

	//PeerConnection Listeners
	var onIceCandidate = function(evt){
		console.log("onIceCandidate");
		console.log(evt);
		C.PubnubSignaling.publish(JSON.stringify(evt.candidate));
	};
	
	var onAddStream = function(evt){
		console.log("onAddStream");
		params['remotevideo'].src = window.URL.createObjectURL(evt.stream);
	};

	var onRemoveStream = function(evt){
		console.log("onRemoveStream");
	};

	var onSignalingStateChange = function(){
		console.log("onSignalingStateChange");
	};

	var onIceConnectionStateChange = function(){
		console.log("onIceConnectionStateChange");
	};
	//End of PeerConnection Listeners

	//SDP Listeners
	var SDPofferReady = function(sdpOffer){
		console.log("SDPofferReady");
		console.log(sdpOffer);
		params["peerConnection"].setLocalDescription(sdpOffer);
		params['sdpoffer'] = sdpOffer;

		//Send SDPOffer
		sendSDPOffer();
	};

	var SDPofferError = function(error){
		console.log("SDPofferError: " + error);
	};

	var onSetRemoteDescriptionSuccess = function(){
		console.log("onSetRemoteDescriptionSuccess");
		console.log(params['peerConnection'].iceConnectionState);
		console.log(params['peerConnection'].iceGatheringState);
		console.log(params['peerConnection'].signalingState);
	};

	var onSetSessionDescriptionError = function(error){
		console.log("onSetSessionDescriptionError");
		console.log(params['peerConnection'].iceConnectionState);
		console.log(params['peerConnection'].iceGatheringState);
		console.log(params['peerConnection'].signalingState);
	};
	//End of SDP Listeners

	var sendTestMessage = function(){
		C.PubnubSignaling.publish("This is a test WIIIII");
	};

	//Copy from apprtc.appspot.com
	var mergeConstraints = function(cons1, cons2) {
		var merged = cons1;
		for (var name in cons2.mandatory) {
			merged.mandatory[name] = cons2.mandatory[name];
		}
		merged.optional = merged.optional.concat(cons2.optional);
		return merged;
	};

	var error = function(text){
		console.warn(text);
	};

	return {
		params: params,
		prepare: prepare,
		init: init,
		initSignaling: initSignaling,
		sendTestMessage: sendTestMessage,
		initPeerConnection: initPeerConnection,
		sendSDPOffer: sendSDPOffer,
		sendSDPAnswer: sendSDPAnswer
	};

})(CursoWebRTC);