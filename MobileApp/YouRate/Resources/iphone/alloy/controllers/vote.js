function Controller() {
<<<<<<< HEAD
    function doLogout() {
        var win = Alloy.createController("login").getView();
        win.open();
    }
=======
>>>>>>> a5b2cd10cf1f6dc0b11d1e767c8ffb4094bc65a5
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vote";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
<<<<<<< HEAD
    var __defers = {};
=======
>>>>>>> a5b2cd10cf1f6dc0b11d1e767c8ffb4094bc65a5
    $.__views.votePage = Ti.UI.createWindow({
        backgroundColor: "#DFE4E7",
        exitOnClose: true,
        id: "votePage"
    });
    $.__views.votePage && $.addTopLevelView($.__views.votePage);
    $.__views.underConstruction = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "black",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Page under construction",
        id: "underConstruction"
    });
    $.__views.votePage.add($.__views.underConstruction);
<<<<<<< HEAD
    $.__views.logout = Ti.UI.createButton({
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5",
        backgroundColor: "#bbb",
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        top: "160",
        width: "140",
        height: "35",
        title: "Logout",
        id: "logout"
    });
    $.__views.votePage.add($.__views.logout);
    doLogout ? $.__views.logout.addEventListener("click", doLogout) : __defers["$.__views.logout!click!doLogout"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.votePage.open();
    __defers["$.__views.logout!click!doLogout"] && $.__views.logout.addEventListener("click", doLogout);
=======
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.votePage.open();
>>>>>>> a5b2cd10cf1f6dc0b11d1e767c8ffb4094bc65a5
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;