function Controller() {
    function doSubmit() {
        alert("Score successfully submitted");
    }
    function updateLabel(e) {
        $.sliderLabel.text = "Score: " + String.format("%3.0f", e.value);
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
    $.__views.votePage.add($.__views.toolbar);
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
        top: "430",
        width: "170",
        height: "35",
        title: "YouRate - Voting",
        id: "wintitle"
    });
    $.__views.toolbar.add($.__views.wintitle);
    $.__views.currentImage = Ti.UI.createImageView({
        top: 50,
        width: "200",
        height: "200",
        image: "brownLabrador.jpg",
        id: "currentImage"
    });
    $.__views.votePage.add($.__views.currentImage);
    $.__views.slider = Ti.UI.createSlider({
        top: "260",
        color: "black",
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
        color: "black",
        top: "280",
        font: {
            fontSize: 24,
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
        color: "black",
        top: "310",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
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
        top: "350",
        width: "300",
        height: "70",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
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
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        top: "430",
        width: "170",
        height: "35",
        title: "Submit score",
        id: "logout"
    });
    $.__views.votePage.add($.__views.logout);
    doSubmit ? $.__views.logout.addEventListener("click", doSubmit) : __defers["$.__views.logout!click!doSubmit"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.slider.text = $.slider.value;
    $.votePage.open();
    __defers["$.__views.slider!change!updateLabel"] && $.__views.slider.addEventListener("change", updateLabel);
    __defers["$.__views.logout!click!doSubmit"] && $.__views.logout.addEventListener("click", doSubmit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;