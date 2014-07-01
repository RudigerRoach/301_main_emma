function Controller() {
    function setActionBar() {
    }
    function lblClick() {
        alert("Label works");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mainWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        exitOnClose: true,
        navBarHidden: false,
        id: "mainWindow"
    });
    $.__views.mainWindow && $.addTopLevelView($.__views.mainWindow);
    setActionBar ? $.__views.mainWindow.addEventListener("open", setActionBar) : __defers["$.__views.mainWindow!open!setActionBar"] = true;
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        top: "0",
        padding: "10",
        borderTop: false,
        borderBottom: true,
        height: "100",
        id: "toolbar"
    });
    $.__views.mainWindow.add($.__views.toolbar);
    $.__views.wintitle = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
        color: "black",
        title: "YouRate - Login",
        id: "wintitle"
    });
    $.__views.toolbar.add($.__views.wintitle);
    $.__views.emailLabel = Ti.UI.createLabel({
        width: "200",
        height: "50",
        color: "black",
        top: "50",
        left: "10",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "left",
        text: "Email Address:",
        id: "emailLabel"
    });
    $.__views.mainWindow.add($.__views.emailLabel);
    lblClick ? $.__views.emailLabel.addEventListener("click", lblClick) : __defers["$.__views.emailLabel!click!lblClick"] = true;
    $.__views.textArea = Ti.UI.createTextArea({
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: "",
        top: "100",
        width: "200",
        height: "40",
        id: "textArea"
    });
    $.__views.mainWindow.add($.__views.textArea);
    $.__views.login = Ti.UI.createButton({
        borderWidth: "1",
        borderColor: "black",
        borderRadius: "5",
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        top: "160",
        width: "100",
        height: "40",
        title: "Login",
        id: "login"
    });
    $.__views.mainWindow.add($.__views.login);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.mainWindow.open();
    __defers["$.__views.mainWindow!open!setActionBar"] && $.__views.mainWindow.addEventListener("open", setActionBar);
    __defers["$.__views.emailLabel!click!lblClick"] && $.__views.emailLabel.addEventListener("click", lblClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;