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

var asyncDone = false;

//Private functions
function populateThis(e) {
	/*
	 This funtion is to be called in very onSuccess callback
	 */
	e = JSON.parse(e);
	status = e.status;
	if (status == 0) {//device should wait

	} else if (status == 1) {//new judge-able object recieved
		sessionType = e.sessionType;
		if (sessionType == "normal") {
			description = e.description;
			imgPath = e.imgPath;
			if (e.rangeBottom !== undefined) { //this exicutes only on the first call of a session
				rangeBottom = e.rangeBottom;
				rangeTop = e.rangeTop;
				comments = e.comments;
			}
		} else if (sessionType == "yn") {

		} else if (sessionType == "winner") {

		}
	} else if (status == 2) {//no session currently running

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
		/* check code if populateThis refactoring was unsuccessful
		
		response = JSON.parse(e.data);
		responsestatus = response.status;
		if (responsestatus == "0")//device should wait
		{

		} else if (responsestatus == "1")//device can continue to get image from server
		{
			if (response.sessionType == "normal") {
				rangeBottom = response.rangeBottom;
				rangeTop = response.rangeTop;
				description = response.description;
				comments = response.comments;
				imgPath = response.imgPath;
				sessionType = response.sessionType;
			} else if (response.sessionType == "yesNo") {
				//TODO add support for other session types
			}
		} else if (responsestatus == "2")//voting session is done
		{

		}
		getImgDone = true;
		status = responsestatus;
		*/
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
	net.getImgPost(payload, onSuccessCallback1, onErrorCallback1);
};

exports.submitResult = function(_path, _result, _comment) {
	/*
	 This function will be called to send the result of any type of event({ y/n | winner | normal }) back to the server
	 */
	var payload = {
		imgPath : _path,
		result : _result,
		comment : _comment
	};
	var onSuccessCallback = function(e) {
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

