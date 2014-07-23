function Controller() {
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
    $.__views.loadingImage = Ti.UI.createImageView({
        top: "200",
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
    __defers["$.__views.loadingImage!click!goVote"] && $.__views.loadingImage.addEventListener("click", goVote);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;