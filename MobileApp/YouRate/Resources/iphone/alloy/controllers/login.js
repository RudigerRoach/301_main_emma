function Controller() {
    function doLogin() {
        $.emailLabel.opacity = 0;
        $.textArea.opacity = 0;
        $.loginButton.opacity = 0;
        $.loadingImage.opacity = 1;
        $.textArea.blur();
        var number = 1;
        setInterval(function() {
            $.loadingImage.image = number + ".png";
            number++;
            number > 8 && (number = 1);
        }, 500);
        var email = $.textArea.value;
        service = require("Authentication");
        service.login(email);
        testStatus(service);
    }
    function goForward(service) {
        var success = service.loginStatus();
        if (true == success) {
            var win = Alloy.createController("vote").getView();
            win.open();
        } else {
            $.loadingImage.opacity = 0;
            $.emailLabel.opacity = 1;
            $.textArea.opacity = 1;
            $.loginButton.opacity = 1;
            alert("Error: " + service.error());
        }
    }
    function testStatus(service) {
        var done = false;
        var timer = setInterval(function() {
            done = service.autologinDone();
            if (done) {
                goForward(service);
                clearInterval(timer);
            }
        }, 1e3);
    }
    function setActionBar() {
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.loginPage = Ti.UI.createWindow({
        backgroundColor: "#DFE4E7",
        exitOnClose: true,
        id: "loginPage"
    });
    $.__views.loginPage && $.addTopLevelView($.__views.loginPage);
    setActionBar ? $.__views.loginPage.addEventListener("open", setActionBar) : __defers["$.__views.loginPage!open!setActionBar"] = true;
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        backgroundColor: "black",
        top: "0",
        padding: "10",
        borderTop: false,
        borderBottom: true,
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        height: "100",
        id: "toolbar"
    });
    $.__views.loginPage.add($.__views.toolbar);
    $.__views.wintitle = Ti.UI.createButton({
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5",
        backgroundColor: "#bbb",
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        top: "160",
        width: "140",
        height: "35",
        title: "YouRate - Login",
        id: "wintitle"
    });
    $.__views.toolbar.add($.__views.wintitle);
    $.__views.emailLabel = Ti.UI.createLabel({
        width: "200",
        height: "50",
        color: "black",
        top: "50",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Email Address:",
        id: "emailLabel"
    });
    $.__views.loginPage.add($.__views.emailLabel);
    $.__views.textArea = Ti.UI.createTextArea({
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "center",
        value: "",
        top: "100",
        width: "250",
        height: "40",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        id: "textArea"
    });
    $.__views.loginPage.add($.__views.textArea);
    $.__views.loginButton = Ti.UI.createButton({
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5",
        backgroundColor: "#bbb",
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        top: "160",
        width: "140",
        height: "35",
        title: "Login",
        id: "loginButton"
    });
    $.__views.loginPage.add($.__views.loginButton);
    doLogin ? $.__views.loginButton.addEventListener("click", doLogin) : __defers["$.__views.loginButton!click!doLogin"] = true;
    $.__views.loadingImage = Ti.UI.createImageView({
        top: "180",
        width: "100",
        height: "100",
        opacity: 0,
        id: "loadingImage"
    });
    $.__views.loginPage.add($.__views.loadingImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.loginPage.open();
    __defers["$.__views.loginPage!open!setActionBar"] && $.__views.loginPage.addEventListener("open", setActionBar);
    __defers["$.__views.loginButton!click!doLogin"] && $.__views.loginButton.addEventListener("click", doLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;