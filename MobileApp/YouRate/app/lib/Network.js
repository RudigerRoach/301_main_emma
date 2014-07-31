/**
 * @author Rudiger Roach
 */

var XHR = require("xhr");
var xhr = new XHR();

var netAddress = 'http://192.168.0.100';
var port = "5555";
var LoginURL= netAddress+':'+port+'/login';
var getImgURL=netAddress+':'+port+'/start';

exports.serverPath = function(){
	return netAddress+":"+port;
};

exports.loginPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(LoginURL, payload , onSuccessCallback, onErrorCallback);
};

exports.getImgPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(getImgURL, payload , onSuccessCallback, onErrorCallback);
};
