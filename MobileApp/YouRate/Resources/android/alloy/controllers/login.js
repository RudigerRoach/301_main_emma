function Controller() {
    function __alloyId2() {
        $.__views.mainWindow.removeEventListener("open", __alloyId2);
        if ($.__views.mainWindow.activity) $.__views.mainWindow.activity.onCreateOptionsMenu = function(e) {
            var __alloyId0 = {
                title: "YouRate - Login",
                showAsAction: Ti.Andoid.SHOW_AS_ACTION_ALWAYS,
                id: "menu1"
            };
            $.__views.menu1 = e.menu.add(_.pick(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.__views.menu1.applyProperties(_.omit(__alloyId0, Alloy.Android.menuItemCreateArgs));
            doClickMenu ? $.__views.menu1.addEventListener("click", doClickMenu) : __defers["$.__views.menu1!click!doClickMenu"] = true;
            var __alloyId1 = {
                title: "Help",
                showAsAction: Ti.Andoid.SHOW_AS_ACTION_NEVER,
                id: "menu2"
            };
            $.__views.menu2 = e.menu.add(_.pick(__alloyId1, Alloy.Android.menuItemCreateArgs));
            $.__views.menu2.applyProperties(_.omit(__alloyId1, Alloy.Android.menuItemCreateArgs));
            doClickMenu ? $.__views.menu2.addEventListener("click", doClickMenu) : __defers["$.__views.menu2!click!doClickMenu"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
    function doLogin() {
        var service = require("../lib/authentication");
        Ti.App.log(service);
    }
    function doClickMenu(evt) {
        alert(evt.source.title);
    }
    function setActionBar() {
        try {
            var actionBar = $.mainWindow.activity.actionBar;
            actionBar.title = "Mella";
            actionBar.displayHomeAsUp = false;
            actionBar.onHomeIconItemSelected = function() {
                alert("Home icon clicked!");
            };
            $.mainWindow.activity.invalidateOptionsMenu();
        } catch (e) {}
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
    $.__views.mainWindow.addEventListener("open", __alloyId2);
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
    doLogin ? $.__views.login.addEventListener("click", doLogin) : __defers["$.__views.login!click!doLogin"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.mainWindow.open();
    __defers["$.__views.mainWindow!open!setActionBar"] && $.__views.mainWindow.addEventListener("open", setActionBar);
    __defers["$.__views.menu1!click!doClickMenu"] && $.__views.menu1.addEventListener("click", doClickMenu);
    __defers["$.__views.menu2!click!doClickMenu"] && $.__views.menu2.addEventListener("click", doClickMenu);
    __defers["$.__views.emailLabel!click!lblClick"] && $.__views.emailLabel.addEventListener("click", lblClick);
    __defers["$.__views.login!click!doLogin"] && $.__views.login.addEventListener("click", doLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;