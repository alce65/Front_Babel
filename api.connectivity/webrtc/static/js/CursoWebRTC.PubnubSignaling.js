var CursoWebRTC = CursoWebRTC || {};

CursoWebRTC.PubnubSignaling = (function(C, PUBNUB, undefined) {

	var PUBNUB_PUBLISH_KEY = "pub-c-7978eed3-f54c-471f-9ec2-b1d1062adf1b";
	var PUBNUB_SUBSCRIBE_KEY = "sub-c-17d069a6-f09b-11e3-bffd-02ee2ddab7fe";
	var pubnub = null;
	var callback = null;
	var params = {};

	var init = function(channel, cb){
		params["userid"] = new Date().getTime() + Math.floor((Math.random() * 100000) + 1);
		if(!channel)
			params["channel"] = "default_channel";
		else
			params["channel"] = channel;

		if(cb)
			callback = cb;

		pubnub = PUBNUB.init({
			publish_key: PUBNUB_PUBLISH_KEY,
			subscribe_key: PUBNUB_SUBSCRIBE_KEY
		});

		pubnub.subscribe({
			channel: params["channel"],
			callback: function(message){
				var msg = JSON.parse(message);
				if(msg.user_id != params["userid"]){
					callback(msg.message);
				}
			},
			connect: function () {
				console.log("CHANNEL CONNECTED & READY WITH ID: " + params["userid"]);
			}
		});

	};

	var publish = function(message){
		var msg = {
			user_id: params["userid"],
			message: message
		};

		pubnub.publish({
			channel: params["channel"],
			message: JSON.stringify(msg)
		});
	};

	return {
		init: init,
		publish: publish
	};

})(CursoWebRTC, PUBNUB);