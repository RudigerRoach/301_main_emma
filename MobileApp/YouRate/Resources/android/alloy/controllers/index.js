function Controller() {
    function displayLoginPage() {
        var number = 1;
        setInterval(function() {
            $.loadingImage.image = number + ".png";
            number++;
            number > 8 && (number = 1);
        }, 500);
        service = require("Authentication");
        service.autoLogin();
        testStatus(service);
    }
    function goForward(service) {
        var success = service.loginStatus();
        if (true == success) {
            var win = Alloy.createController("vote").getView();
            win.open();
        } else {
            var win = Alloy.createController("login").getView();
            win.open();
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
    function goVote() {
        var win = Alloy.createController("wait").getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.startPage = Ti.UI.createWindow({
        backgroundColor: "#DFE4E7",
        exitOnClose: true,
        id: "startPage"
    });
    $.__views.startPage && $.addTopLevelView($.__views.startPage);
    displayLoginPage ? $.__views.startPage.addEventListener("open", displayLoginPage) : __defers["$.__views.startPage!open!displayLoginPage"] = true;
    $.__views.loadingImage = Ti.UI.createImageView({
        top: "180",
        width: "100",
        height: "100",
        id: "loadingImage",
        image: "1.png"
    });
    $.__views.startPage.add($.__views.loadingImage);
    goVote ? $.__views.loadingImage.addEventListener("click", goVote) : __defers["$.__views.loadingImage!click!goVote"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.startPage.open();
    __defers["$.__views.startPage!open!displayLoginPage"] && $.__views.startPage.addEventListener("open", displayLoginPage);
    __defers["$.__views.loadingImage!click!goVote"] && $.__views.loadingImage.addEventListener("click", goVote);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;