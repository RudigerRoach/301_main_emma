var XHR = require("xhr");

var xhr = new XHR();

var sessionID = -1;

var UDID = Titanium.Platform.id;

var error = -1;

var returnStatus = false;

var url = "http://www.posttestserver.com/post.php";

exports.loginStatus = function() {
    return returnStatus;
};

exports.login = function(email) {
    if (6 > email.toString().length) {
        error = "Invalid email address entered, please revise your email address.";
        returnStatus = false;
        return;
    }
    var payload = {
        email: email,
        deviceUID: UDID
    };
    var onSuccessCallback = function() {
        response = {
            session: {
                status: "success",
                session_id: "xxyyzz"
            }
        };
        if ("success" == response.session.status) {
            sessionID = response.session.session_id;
            returnStatus = true;
        } else error = "Invalid Login cridentials";
    };
    var onErrorCallback = function(e) {
        error = "error" == e.status ? "Device cannot reach the voting network" : "An error occured: " + e.data;
        returnStatus = false;
    };
    xhr.post(url, payload, onSuccessCallback, onErrorCallback);
};

exports.autoLogin = function() {
    var payload = {
        deviceUID: UDID
    };
    var onSuccessCallback = function() {
        response = {
            session: {
                status: "success",
                session_id: "xxyyzz"
            }
        };
        if ("success" == response.session.status) {
            sessionID = response.session.session_id;
            returnStatus = true;
        } else {
            error = "Autologin not yet available for this device.";
            returnStatus = false;
        }
    };
    var onErrorCallback = function(e) {
        error = "error" == e.status ? "Device cannot reach the voting network" : "An unknown error occured: " + e.data;
        returnStatus = false;
    };
    xhr.post(url, payload, onSuccessCallback, onErrorCallback);
    returnStatus = false;
};

exports.error = function() {
    return -1 != error ? error : "Everything seems fine here";
};