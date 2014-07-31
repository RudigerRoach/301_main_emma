function Controller() {
    function __alloyId1() {
        $.__views.loginPage.removeEventListener("open", __alloyId1);
        if ($.__views.loginPage.activity) $.__views.loginPage.activity.onCreateOptionsMenu = function(e) {
            var __alloyId0 = {
                id: "menu1",
                title: "YouRate - Login"
            };
            $.__views.menu1 = e.menu.add(_.pick(__alloyId0, Alloy.Android.menuItemCreateArgs));
            $.__views.menu1.applyProperties(_.omit(__alloyId0, Alloy.Android.menuItemCreateArgs));
            doClickMenu ? $.__views.menu1.addEventListener("click", doClickMenu) : __defers["$.__views.menu1!click!doClickMenu"] = true;
        }; else {
            Ti.API.warn("You attempted to attach an Android Menu to a lightweight Window");
            Ti.API.warn("or other UI component which does not have an Android activity.");
            Ti.API.warn("Android Menus can only be opened on TabGroups and heavyweight Windows.");
        }
    }
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
    function doClickMenu(evt) {
        alert(evt.source.title);
    }
    function setActionBar() {
        try {
            var actionBar = $.mainWindow.activity.actionBar;
            actionBar.title = "YouRate";
            actionBar.displayHomeAsUp = false;
            actionBar.onHomeIconItemSelected = function() {
                alert("Home icon clicked!");
            };
            $.mainWindow.activity.invalidateOptionsMenu();
        } catch (e) {}
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
    $.__views.loginPage.addEventListener("open", __alloyId1);
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
    __defers["$.__views.menu1!click!doClickMenu"] && $.__views.menu1.addEventListener("click", doClickMenu);
    __defers["$.__views.loginButton!click!doLogin"] && $.__views.loginButton.addEventListener("click", doLogin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;