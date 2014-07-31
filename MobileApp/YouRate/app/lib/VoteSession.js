/**
 * @author Rudiger Roach
 */

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

exports.imagePath = function(){
	var net = require("Network");
	return net.serverPath()+"/"+imgPath;
};
exports.rangeBottom = function(){
	return rangeBottom;
};
exports.rangeTop = function(){
	return rangeTop;
};
exports.description = function(){
	return description;
};
exports.commentsEnabled = function(){
	return comments;
};
exports.sessionType = function(){
	return sessionType;
};
exports.status = function(){
	return status;
};
exports.getImgDone = function(){
	return getImgDone;
};

exports.getImage = function(){
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
	
	var payload={
		//TODO test if this should be removed, if the cookie
	    session_id:sessionObj.id 
	};
	
	var onSuccessCallback1 = function (e) {
	   response = JSON.parse(e.data);
	   responsestatus = response.status;
	   if(responsestatus == "0") //device should wait
	   {

	   }	   
	   else if(responsestatus == "1") //device can continue to get image from server
	   {
	   		if(response.sessionType == "normal")
	   		{
				rangeBottom = response.rangeBottom;
				rangeTop = response.rangeTop;
				description = response.description;
				comments = response.comments;
				imgPath = response.imgPath;
				sessionType = response.sessionType;
			}else if(response.sessionType == "yesNo"){
				//TODO add support for other session types
			}
	   }
	   else if(responsestatus == "2") //voting session is done
	   {

	   }
	   getImgDone = true;
	   status = responsestatus;
	};
	
	var onErrorCallback1 = function (e) {
	   if(e.status == 'error')
	   {
	   		error = "Device cannot reach the voting network";
	   }
	   else
	   {
	   		error = "An unknown error occured: "+e.data;
	   }
	   getImgDone = true;
	   status = -1;
	};
	net.getImgPost(payload , onSuccessCallback1, onErrorCallback1);
};

