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
var udid = require("Authentication").deviceID();
var callcount = 0;
var asyncDone = false;

//Private functions
function populateThis(e) {
	/*
	 This funtion is to be called in very onSuccess callback
	 */
	e = JSON.parse(e.data);
	//Ti.API.info("e: " + JSON.stringify(e));
	status = e.status;
	sessionType = e.sessionType;
	if (sessionType == "winner") {
		/*
		 {"rangeBottom":0,"status":"1","imgPaths":["temp/1.jpg","temp/2.jpg","temp/3.jpg","temp/4.jpg","temp/5.jpg"],"description":"Beauty comes in all shapes and sizes","imgTotaal":5,"sessionType":"winner","rangeTop":10,"comments":"true"}
		 {"imgPaths":["temp/1.jpg","temp/2.jpg"],"comments":"true","sessionType":"winner","description":"","rangeTop":10,"imgTotaal":2,"rangeBottom":0,"status":"1"}
		 * */
		imgPath = e.imgPaths;
		description = e.description;
		rangeBottom = e.rangeBottom;
		rangeTop = e.rangeTop;
		comments = e.comments;
		imgTotaal = e.imgTotaal;
	} else {
		description = e.description;
		imgPath = e.imgPath;
		if (e.rangeBottom !== undefined) {//this exicutes only on the first call of a session
			rangeBottom = e.rangeBottom;
			rangeTop = e.rangeTop;
			comments = e.comments;
		}
	}

	};

//Getters
exports.imagePath = function() {
	var net = require("Network");
	//Ti.API.info('get img: '+net.serverPath() + "/" + imgPath);
	return net.serverPath() + "/" + imgPath;
};
exports.imageArray = function(){
	return imgPath;
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
exports.asyncDone = function() {
	return asyncDone;
};

//Network calls
exports.getImage = function() {

	//Ti.API.info("getImage Called");
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
		session_id : sessionObj.id,
		deviceUID : udid
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
	callcount = callcount + 1;
	require('alloy').Globals.callCount = callcount;
	if (callcount == 1) {
		net.getImgPost(payload, onSuccessCallback1, onErrorCallback1);
	} else {
		//net.getNextImgPost(payload, onSuccessCallback1, onErrorCallback1);
	}
};

exports.submitResult = function(_result, _comment) {
	Ti.API.info("subM called");
	/*
	 This function will be called to send the result of any type of event({ y/n | winner | normal }) back to the server
	 */

	var payload = {
		deviceUID : udid,
		result : _result,
		comment : _comment
	};
	var onSuccessCallback = function(e) {
		Ti.API.info("OSC subm:" + e.toString());
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
