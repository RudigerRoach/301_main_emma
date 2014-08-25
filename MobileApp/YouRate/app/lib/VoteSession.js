/**
 * @author Rudiger Roach
 */

//Private variables
var net = require("Network");
var sessionObj = require('alloy').Globals.sessionObj;
var getImgDone = false;
var rangeBottom = -1;
var rangeTop = -1;
var description = "";
var comments = false;
var imgPath = "";
var sessionType = "normal";
var status = -1;

var callcount = 0;
var asyncDone = false;

//Private functions
function populateThis(e) {
	/*
	 This funtion is to be called in very onSuccess callback
	 */
	Ti.API.info("pop this called");
	e = JSON.parse(e.data);
	//Ti.API.info("e: "+e.toString());
	status = e.status;
	if (status == 0) {//device should wait

	} else if (status == 1) {//new judge-able object recieved
		sessionType = e.sessionType;
		if (sessionType == "normal") {
			description = e.description;
			imgPath = e.imgPath;
			Ti.API.info("new path: "+imgPath);
			if (e.rangeBottom !== undefined) { //this exicutes only on the first call of a session
				rangeBottom = e.rangeBottom;
				rangeTop = e.rangeTop;
				comments = e.comments;
			}
		} else if (sessionType == "yn") {

		} else if (sessionType == "winner") {

		}
	} else if (status == 2) {//no session currently running
		Ti.API.info("Status 2 recieved");
	}
};

//Getters
exports.imagePath = function() {
	var net = require("Network");
	return net.serverPath() + "/" + imgPath;
};
exports.rangeBottom = function() {
	return rangeBottom;
};
exports.rangeTop = function() {
	return rangeTop;
};
exports.description = function() {
	return description;
};
exports.commentsEnabled = function() {
	return comments;
};
exports.sessionType = function() {
	return sessionType;
};
exports.status = function() {
	return status;
};
exports.getImgDone = function() {
	return getImgDone;
};
exports.asyncDone = function(){
	return asyncDone;
};

//Network calls
exports.getImage = function() {
	
	Ti.API.info("getImage Called");
	serverpath = "";
	/*
	 expected response example:
	 {
	 "status": "1", //0 if the app should keep waiting, 1 for success, 2 if the votong session has fininshed
	 "sessionType": "normal", //alternatively Yes/No or winner
	 "rangeBottom": "0",
	 "rangeTop": "15",
	 "description": "image discription here",
	 "comments": "True",  //True if comments are allowed, False if not
	 "imgPath": "path/to/image.jpg" //the path where the image resides on the server
	 }
	 */

	var payload = {
		//TODO test if this should be removed, if the cookie works
		session_id : sessionObj.id
	};

	var onSuccessCallback1 = function(e) {
		populateThis(e);
		getImgDone = true;
		status = 1;
		
	};

	var onErrorCallback1 = function(e) {
		if (e.status == 'error') {
			error = "Device cannot reach the voting network";
		} else {
			error = "An unknown error occured: " + e.data;
		}
		getImgDone = true;
		status = -1;
	};
	callcount = require('alloy').Globals.callCount;
	callcount = callcount+1;
	require('alloy').Globals.callCount = callcount;
	Ti.API.info("callcount: "+require('alloy').Globals.callCount);
	if(callcount == 1){
		net.getImgPost(payload, onSuccessCallback1, onErrorCallback1);
	}else{
		//net.getNextImgPost(payload, onSuccessCallback1, onErrorCallback1);	
	}
};

exports.submitResult = function(_result, _comment) {
	Ti.API.info("subM called");
	/*
	 This function will be called to send the result of any type of event({ y/n | winner | normal }) back to the server
	 */
	
	var payload = {
		deviceUID : require("Authentication").deviceID(),
		result : _result,
		comment : _comment
	};
	var onSuccessCallback = function(e) {
		Ti.API.info("OSC subm:"+e.toString());
		populateThis(e);
		asyncDone = true;
	};
	var onErrorCallback = function(e) {
		if (e.status == 'error') {
			error = "Device cannot reach the voting network";
		} else {
			error = "An unknown error occured: " + e.data;
		}
		asyncDone = true;
		status = -1;
	};
	net.resultPost(payload, onSuccessCallback, onErrorCallback);
};


