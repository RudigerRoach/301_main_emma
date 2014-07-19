var XHR = require("xhr");

var xhr = new XHR();

var sessionID = -1;

var UDID = Titanium.Platform.id;

exports.login = function(email) {
    var url = "http://www.posttestserver.com/post.php";
    var payload = {
        email: email,
        deviceUID: UDID
    };
    var onSuccessCallback = function(e) {
        Ti.API.info(e.data);
        response = {
            session: {
                status: "success",
                session_id: "xxyyzz"
            }
        };
        if ("success" == response.session.status) {
            this.sessionID = response.session.session_id;
            return true;
        }
        return false;
    };
    var onErrorCallback = function(e) {
        Ti.API.info(e.status);
        return false;
    };
    xhr.post(url, payload, onSuccessCallback, onErrorCallback);
};

exports.autoLogin = function() {
    return false;
};