/**
 * @author Rudiger Roach
 */

var XHR = require("xhr");
var xhr = new XHR();
var LoginURL='http://192.168.0.101:5555/login';

exports.post = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(LoginURL, payload , onSuccessCallback, onErrorCallback);
};
