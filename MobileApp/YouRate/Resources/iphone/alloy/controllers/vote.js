function Controller() {
    function fixPage() {
        var screenWidth = Ti.Platform.displayCaps.platformWidth;
        var screenHeight = Ti.Platform.displayCaps.platformHeight;
        service = require("VoteSession");
        var rangeBottom = 0;
        var rangeTop = 50;
        var comments = "true";
        var imagePath = "brownLabrador.jpg";
        photoPath = imagePath;
        var sessionType = "yesNo";
        $.currentImage.height = screenHeight / 2 - 50;
        $.currentImage.width = "auto";
        $.currentImage.image = imagePath;
        if ("normal" == sessionType || "default" == sessionType) {
            slider = Titanium.UI.createSlider({
                top: "260",
                color: "black",
                min: rangeBottom,
                max: rangeTop,
                width: "300",
                value: (rangeBottom + rangeTop) / 2
            });
            var sliderLabel = Ti.UI.createLabel({
                text: "Score: " + slider.value,
                width: "200",
                height: "50",
                color: "black",
                top: "280",
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                textAlign: "center",
                shadowColor: "#aaa"
            });
            slider.addEventListener("change", function(e) {
                sliderLabel.text = "Score: " + String.format("%3.0f", e.value);
            });
            $.votePage.add(slider);
            $.votePage.add(sliderLabel);
        } else if ("yesNo" == sessionType) {
            var yesButton = Titanium.UI.createButton({
                title: "Yes",
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
                top: screenHeight / 2 + 15,
                width: screenWidth / 2 + 10,
                height: "30",
                left: screenWidth / 2 + 5,
                padding: 0
            });
            var noButton = Titanium.UI.createButton({
                title: "No",
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
                top: screenHeight / 2 + 15,
                width: screenWidth / 2 + 10,
                height: "30",
                right: screenWidth / 2 + 5,
                padding: 0
            });
            yesButton.addEventListener("click", function() {
                yesButton.opacity = 1;
                noButton.opacity = .5;
            });
            $.votePage.add(yesButton);
            noButton.addEventListener("click", function() {
                yesButton.opacity = .5;
                noButton.opacity = 1;
            });
            $.votePage.add(noButton);
        } else if ("winner" == sessionType) {
            var winnerButton = Titanium.UI.createButton({
                title: "Winner",
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
                top: "275",
                width: "170",
                height: "30"
            });
            winnerButton.addEventListener("click", function() {
                doSubmit();
            });
            $.votePage.add(winnerButton);
        }
        if ("true" == comments) {
            commentArea = Ti.UI.createTextArea({
                borderWidth: "2",
                borderColor: "#bbb",
                borderRadius: "5",
                color: "#888",
                textAlign: "left",
                value: "",
                top: screenHeight / 2 + 80,
                width: screenWidth + 10,
                height: screenHeight / 2 - 140,
                font: {
                    fontSize: 20,
                    fontFamily: "Helvetica Neue"
                }
            });
            var commentLabel = Ti.UI.createLabel({
                text: "Comments:",
                width: "200",
                height: "50",
                color: "black",
                top: screenHeight / 2 + 40,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                textAlign: "center"
            });
            $.votePage.add(commentArea);
            $.votePage.add(commentLabel);
        }
        $.submit.top = screenHeight - 50;
    }
    function doSubmit() {
        service = require("VoteSession");
        service.submitResult(String.format("%3.0f", slider.value), commentArea.value);
        var win = Alloy.createController("wait").getView();
        win.open();
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
    fixPage ? $.__views.votePage.addEventListener("focus", fixPage) : __defers["$.__views.votePage!focus!fixPage"] = true;
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
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        top: "5",
        width: "270",
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
    $.__views.submit = Ti.UI.createButton({
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        top: "300",
        width: "200",
        height: "35",
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5",
        backgroundColor: "#bbb",
        title: "Submit score",
        id: "submit"
    });
    $.__views.votePage.add($.__views.submit);
    doSubmit ? $.__views.submit.addEventListener("click", doSubmit) : __defers["$.__views.submit!click!doSubmit"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var commentArea = "";
    var photoPath = "";
    var slider;
    $.votePage.open();
    __defers["$.__views.votePage!focus!fixPage"] && $.__views.votePage.addEventListener("focus", fixPage);
    __defers["$.__views.submit!click!doSubmit"] && $.__views.submit.addEventListener("click", doSubmit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;