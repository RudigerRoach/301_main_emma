function Controller() {
    function displayLoginPage() {
        var number = 1;
        setInterval(function() {
            $.loadingImage.image = number + ".png";
            number++;
            number > 8 && (number = 1);
        }, 500);
        var service = require("authentication");
        service.autoLogin();
        var success = service.loginStatus();
        if (true == success) {
            var win = Alloy.createController("vote").getView();
            win.open();
        } else {
            var win = Alloy.createController("login").getView();
            win.open();
        }
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
        top: "200",
        width: "100",
        height: "100",
        id: "loadingImage"
    });
    $.__views.startPage.add($.__views.loadingImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.startPage.open();
    __defers["$.__views.startPage!open!displayLoginPage"] && $.__views.startPage.addEventListener("open", displayLoginPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;