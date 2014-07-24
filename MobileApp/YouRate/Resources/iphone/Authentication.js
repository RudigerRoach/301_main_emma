function out(msg) {
    Ti.API.info(msg);
}

var net = require("Network");

var sessionID = -1;

var UDID = Titanium.Platform.id;

var error = -1;

var returnStatus = false;

var loginIsDone = false;

var autologinIsDone = false;

var sessionObj = require("alloy").Globals.sessionObj;

exports.loginStatus = function() {
    return returnStatus;
};

exports.login = function(email) {
    out("login called");
    if (5 > email.toString().length) {
        error = "Invalid email address entered, please revise your email address.";
        returnStatus = false;
        return;
    }
    var payload = {
        email: email,
        deviceUID: UDID
    };
    var onSuccessCallback = function(e) {
        response = JSON.parse(e.data);
        if ("success" == response.status) {
            sessionID = response.session_id;
            returnStatus = true;
            sessionObj.id = sessionID;
        } else {
            error = "Invalid Login cridentials";
            returnStatus = false;
        }
        loginIsDone = true;
    };
    var onErrorCallback = function(e) {
        error = "error" == e.status ? "Device cannot reach the voting network" : "An unknown error occured: " + e.data;
        returnStatus = false;
        loginIsDone = true;
    };
    net.loginPost(payload, onSuccessCallback, onErrorCallback);
};

exports.autoLogin = function() {
    var payload = {
        deviceUID: UDID
    };
    var onSuccessCallback = function(e) {
        response = JSON.parse(e.data);
        if ("success" == responsestatus) {
            sessionID = response.session_id;
            returnStatus = true;
            sessionObj.id = sessionID;
        } else {
            error = "Autologin not yet available for this device.";
            returnStatus = false;
        }
        autologinIsDone = true;
    };
    var onErrorCallback = function(e) {
        error = "error" == e.status ? "Device cannot reach the voting network" : "An unknown error occured: " + e.data;
        returnStatus = false;
        autologinIsDone = true;
    };
    net.loginPost(payload, onSuccessCallback, onErrorCallback);
};

exports.error = function() {
    return error;
};

exports.loginDone = function() {
    return loginIsDone;
};

exports.autologinDone = function() {
    return autologinIsDone;
};