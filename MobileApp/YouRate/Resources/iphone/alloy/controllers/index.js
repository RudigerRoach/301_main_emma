function Controller() {
    function displayLoginPage() {
        var win = Alloy.createController("login").getView();
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
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        top: "200",
        width: "100",
        height: "100",
        id: "loadingImage",
        image: "loadingImage.gif"
    });
    $.__views.startPage.add($.__views.loadingImage);
    displayLoginPage ? $.__views.loadingImage.addEventListener("click", displayLoginPage) : __defers["$.__views.loadingImage!click!displayLoginPage"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.startPage.open();
    __defers["$.__views.startPage!open!displayLoginPage"] && $.__views.startPage.addEventListener("open", displayLoginPage);
    __defers["$.__views.loadingImage!click!displayLoginPage"] && $.__views.loadingImage.addEventListener("click", displayLoginPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;