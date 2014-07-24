/**
 * @author Rudiger Roach
 */

var XHR = require("xhr");
var xhr = new XHR();
var LoginURL='http://169.254.32.103:55555/login';
var getImgURL='http://169.254.32.103:55555/start';


exports.loginPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(LoginURL, payload , onSuccessCallback, onErrorCallback);
};

exports.getImgPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(getImgURL, payload , onSuccessCallback, onErrorCallback);
};
