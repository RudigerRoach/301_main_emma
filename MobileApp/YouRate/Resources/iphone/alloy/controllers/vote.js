function Controller() {
    function doLogout() {
        var win = Alloy.createController("login").getView();
        win.open();
    }
    function updateLabel(e) {
        $.sliderLabel.text = "Score: " + String.format("%3.1f", e.value);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "vote";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.votePage = Ti.UI.createWindow({
        backgroundColor: "#DFE4E7",
        exitOnClose: true,
        id: "votePage"
    });
    $.__views.votePage && $.addTopLevelView($.__views.votePage);
    $.__views.currentImage = Ti.UI.createImageView({
        top: "50",
        width: "250",
        height: "250",
        image: "1.png",
        id: "currentImage"
    });
    $.__views.votePage.add($.__views.currentImage);
    $.__views.slider = Ti.UI.createSlider({
        top: "310",
        min: "0",
        max: "100",
        width: "300",
        value: "50",
        id: "slider"
    });
    $.__views.votePage.add($.__views.slider);
    updateLabel ? $.__views.slider.addEventListener("change", updateLabel) : __defers["$.__views.slider!change!updateLabel"] = true;
    $.__views.sliderLabel = Ti.UI.createLabel({
        width: "200",
        height: "50",
        color: "blue",
        top: "330",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        shadowColor: "#aaa",
        id: "sliderLabel"
    });
    $.__views.votePage.add($.__views.sliderLabel);
    $.__views.commentLabel = Ti.UI.createLabel({
        width: "200",
        height: "50",
        color: "blue",
        top: "360",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        shadowColor: "pink",
        text: "Comments:",
        id: "commentLabel"
    });
    $.__views.votePage.add($.__views.commentLabel);
    $.__views.commentArea = Ti.UI.createTextArea({
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: "",
        top: "400",
        width: "300",
        height: "70",
        id: "commentArea"
    });
    $.__views.votePage.add($.__views.commentArea);
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
    $.slider.text = $.slider.value;
    $.votePage.open();
    __defers["$.__views.slider!change!updateLabel"] && $.__views.slider.addEventListener("change", updateLabel);
    __defers["$.__views.logout!click!doLogout"] && $.__views.logout.addEventListener("click", doLogout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;