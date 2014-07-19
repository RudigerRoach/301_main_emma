/**
 * @author Rudiger Roach
 */
var XHR = require("xhr");

var xhr = new XHR();
var sessionID = -1;
var UDID = Titanium.Platform.id;

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
	   //
	   Ti.API.info(e.data); //just log the message
	   //response = JSON.parse(e.data); //remove comment at integration
	   
	   //remove response overwrite at integration
	   response = {
		    "session": {
		        "status": "success",
		        "session_id": "xxyyzz"
		    }
		};
	   if(response.session.status == "success")
	   {
	   		this.sessionID = response.session.session_id;
	   		return true;
	   }else
	   {
	   		return false;
	   }
	};
	 
	var onErrorCallback = function (e) {
		//TODO Handle device offline errors - do in seperate module for app-wide use.
	   // you'll receive
	   // e.data
	   // e.status
	   // e.code
	   //
	   Ti.API.info(e.status);
	   return false; //Login failed
	};
	 
	xhr.post(url, payload , onSuccessCallback, onErrorCallback);
	//return false; //Login failed
};

exports.autoLogin = function(){
	return false; //Login failed
};
