/**
 * @author Rudiger Roach
 */
var XHR = require("xhr");

var xhr = new XHR();
var sessionID = -1;
var UDID = Titanium.Platform.id;
var error = -1;
var returnStatus = false;

exports.loginStatus = function(){
	return returnStatus;
};

exports.login = function(email){
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
	
	if(email.toString().length < 6) //shortest possible email address "a@b.c" is of length 5
	{
		error = "Invalid email address entered, please revise your email address.";
		returnStatus = false;
		return;
	}
	
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
		
	   if(response.session.status == "success")
	   {
	   		this.sessionID = response.session.session_id;
	   		returnStatus = true;
	   }else{
	   		error = "Invalid Login cridentials";
	   }
	   
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
	   		error = "An error occured: "+e.data;
	   }
	   returnStatus = false; //Login failed
	};
	 
	xhr.post(url, payload , onSuccessCallback, onErrorCallback);
	
};

exports.autoLogin = function(){
	return false; //Login failed
};

exports.error = function(){
	if(error != -1)
	{
		return error;
	}
	else
	{
		return "Everything seems fine here";
	}
};
