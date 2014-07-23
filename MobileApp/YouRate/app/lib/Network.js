/**
 * @author Rudiger Roach
 */

var XHR = require("xhr");
var xhr = new XHR();
var LoginURL='http://192.168.0.101:5555/login';
var getImgURL='http://192.168.0.101:5555/getImg';


exports.loginPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(LoginURL, payload , onSuccessCallback, onErrorCallback);
};

exports.getImgPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(getImgURL, payload , onSuccessCallback, onErrorCallback);
};
