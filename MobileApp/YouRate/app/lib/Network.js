/**
 * @author Rudiger Roach
 */

var XHR = require("xhr");
var xhr = new XHR();
var netAddress = 'http://192.168.0.102';
if(Ti.App.Properties.hasProperty('serverAddress')){
	netAddress = Ti.App.Properties.getString('serverAddress');
}else{
	Ti.App.Properties.setString('serverAddress', 'http://192.168.0.102');
}
var port = "5555";
var LoginURL= netAddress+':'+port+'/login';
var getImgURL=netAddress+':'+port+'/start';
var submitVoteURL=netAddress+':'+port+'/nextImage';

exports.serverPath = function(){
	return netAddress+":"+port;
};

exports.loginPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(LoginURL, payload , onSuccessCallback, onErrorCallback);
};

exports.getImgPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(getImgURL, payload , onSuccessCallback, onErrorCallback);
};

exports.getNextImgPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(submitVoteURL, payload , onSuccessCallback, onErrorCallback);
};

exports.resultPost = function(payload , onSuccessCallback, onErrorCallback){
	xhr.post(submitVoteURL, payload , onSuccessCallback, onErrorCallback);
};
