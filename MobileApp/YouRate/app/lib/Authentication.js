/**
 * @author Rudiger Roach
 */
var net = require("Network");
var sessionID = -1;
var UDID = Titanium.Platform.id;
var error = -1;
var returnStatus = false;
var loginIsDone = false;
var autologinIsDone = false;
var sessionObj = require('alloy').Globals.sessionObj;

exports.loginStatus = function(){
	return returnStatus;
};

exports.login = function(email){
	out("login called");
	//TODO unit test fail, die test wag nie vir die xhr callback nie - make it wait!
	
	/*
	   expected response:
	   {
		        "status": "success",
		        "session_id": "xxyyzz"
		}
	*/
	
	if(email.toString().length < 5) //shortest possible email address "a@b.c" is of length 5
	{
		error = "Invalid email address entered, please revise your email address.";
		returnStatus = false;
		return;
	}

	// this is the data you'll send to the web service
	var payload={
	    email:email,
	    deviceUID:UDID
	};
	
	var onSuccessCallback = function (e) {
	   // you'll receive:
	   //e.data
	   //e.status
	   //e.code
	   
	   //-----------------------------------------
	   response = JSON.parse(e.data); //remove comment at integration
		
	   if(response.status == "success")
	   {
	   		sessionID = response.session_id;
	   		returnStatus = true;
	   		sessionObj.id = sessionID;
	   }else{
	   		error = "Invalid Login cridentials";
	   		returnStatus = false;
	   } 
	   loginIsDone = true;
	};
	 
	var onErrorCallback = function (e) {
	   // you'll receive
	   // e.data
	   // e.status
	   // e.code
	   
	   if(e.status == 'error')
	   {
	   		error = "Device cannot reach the voting network";
	   }
	   else
	   {
	   		error = "An unknown error occured: "+e.data;
	   }
	   returnStatus = false; //Login failed
	   loginIsDone = true;
	};
	 
	net.loginPost(payload , onSuccessCallback, onErrorCallback);
};

exports.autoLogin = function(){
	var payload={
	    deviceUID:UDID
	};
	
	var onSuccessCallback = function (e) {
	   response = JSON.parse(e.data);

	   if(response.status == "success")
	   {
	   		sessionID = response.session_id;
	   		returnStatus = true;
	   		sessionObj.id = sessionID;
	   }else{
	   		error = "Autologin not yet available for this device.";
	   		returnStatus = false;
	   }
		autologinIsDone = true;
	};
	
	var onErrorCallback = function (e) {
	   if(e.status == 'error')
	   {
	   		error = "Device cannot reach the voting network";
	   }
	   else
	   {
	   		error = "An unknown error occured: "+e.data;
	   }
	   returnStatus = false; //Login failed
	   autologinIsDone = true;
	};
	
	net.loginPost(payload , onSuccessCallback, onErrorCallback);

};

exports.error = function(){
		return error;
};

exports.loginDone = function(){
	return loginIsDone;
};

exports.autologinDone = function(){
	return autologinIsDone;
};

function out(msg){
	Ti.API.info(msg);
};
