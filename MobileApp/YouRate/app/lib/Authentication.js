/**
 * @author Rudiger Roach
 */
var XHR = require("xhr");

var xhr = new XHR();
var sessionID = -1;
var UDID = Titanium.Platform.id;
var error = -1;

exports.login = function(email){
	var mayReturn = false;
	var returnStatus = false;
	
	//TODO unit test fail, die test wag nie vir die xhr callback nie - make it wait!
	
	/*
	   expected response:
	   {
		    "session": {
		        "status": "success",
		        "session_id": "xxyyzz"
		    }
		}
	*/
	
	var url='http://www.posttestserver.com/post.php'; //verander na server address en port
	 
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
	   //s
	   Ti.API.info(e.data); //just log the message
	   
	   //-----------------------------------------
	   //response = JSON.parse(e.data); //remove comment at integration
	   
	   //remove response overwrite at integration
	   response = {
		    "session": {
		        "status": "success",
		        "session_id": "xxyyzz"
		    }
		};
		//------------------------------------
		alert("succ: "+response.session.status);
	   if(response.session.status == "success")
	   {
	   		this.sessionID = response.session.session_id;
	   		returnStatus = true;
	   }else{
	   		error = "Invalid Login cridentials";
	   }
	   
	};
	 
	var onErrorCallback = function (e) {
		//TODO Handle device offline errors - do in seperate module for app-wide use.
	   // you'll receive
	   // e.data
	   // e.status
	   // e.code
	   //
	   error = "A network error occured";
	   Ti.API.info(e.status);
	   returnStatus = false; //Login failed
	};
	 
	xhr.post(url, payload , onSuccessCallback, onErrorCallback);
	//return false; //Login failed

	return returnStatus;
};

exports.autoLogin = function(){
	return false; //Login failed
};

exports.error = function(){
	if(error != -1)
	{
		return error;
	}else
	{
		return "Everything seems fine here";
	}
};
