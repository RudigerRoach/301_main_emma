function Controller() {
    function fixPage() {
        service = require("VoteSession");
        var rangeBottom = 0;
        var rangeTop = 50;
        var comments = "true";
        var imagePath = "portrait.jpg";
        photoPath = imagePath;
        var sessionType = "yesNo";
        var screenWidth = Ti.Platform.displayCaps.platformWidth;
        var screenHeight = Ti.Platform.displayCaps.platformHeight;
        $.submit.top = screenHeight - 70;
        $.submit.height = 50;
        $.submit.width = screenWidth - 40;
        $.submit.left = 20;
        var sizeLeft = $.submit.top;
        if ("true" == comments) {
            var commentButton = Titanium.UI.createButton({
                title: "Add comment",
                borderWidth: "1",
                borderColor: "#bbb",
                borderRadius: "8",
                backgroundColor: "#bbb",
                color: "black",
                textAlign: "center",
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                top: sizeLeft - 60,
                width: screenWidth - 40,
                left: 20,
                height: 40
            });
            $.votePage.add(commentButton);
            sizeLeft = commentButton.top;
        }
        if ("normal" == sessionType) {
            slider = Titanium.UI.createSlider({
                top: sizeLeft - 90,
                color: "black",
                min: rangeBottom,
                max: rangeTop,
                width: screenWidth - 40,
                left: 20,
                value: (rangeBottom + rangeTop) / 2
            });
            var sliderLabel = Ti.UI.createLabel({
                text: "Score: ",
                width: "150",
                height: "30",
                color: "black",
                top: sizeLeft - 50,
                left: screenWidth / 2 - 100,
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                textAlign: "center",
                shadowColor: "#aaa"
            });
            sliderArea = Ti.UI.createTextArea({
                borderWidth: "2",
                borderColor: "#bbb",
                borderRadius: "5",
                color: "#888",
                textAlign: "left",
                value: slider.value,
                top: sizeLeft - 50,
                left: screenWidth / 2 + 10,
                width: 50,
                height: 30,
                font: {
                    fontSize: 20,
                    fontFamily: "Helvetica Neue"
                }
            });
            sizeLeft = slider.top;
            slider.addEventListener("change", function(e) {
                sliderArea.value = String.format("%3.0f", e.value);
            });
            sliderArea.addEventListener("change", function() {
                slider.value = sliderArea.value;
            });
            $.votePage.add(slider);
            $.votePage.add(sliderLabel);
            $.votePage.add(sliderArea);
        } else if ("yesNo" == sessionType) {
            var yesButton = Titanium.UI.createButton({
                title: "Yes",
                borderWidth: "1",
                borderColor: "#bbb",
                borderRadius: "8",
                backgroundColor: "green",
                color: "black",
                textAlign: "center",
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                top: sizeLeft - 70,
                width: screenWidth / 2 - 30,
                height: "50",
                right: 20,
                padding: 0
            });
            var noButton = Titanium.UI.createButton({
                title: "No",
                borderWidth: "1",
                borderColor: "#bbb",
                borderRadius: "8",
                backgroundColor: "red",
                color: "black",
                textAlign: "center",
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                top: sizeLeft - 70,
                width: screenWidth / 2 - 30,
                height: "50",
                left: 20,
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
            sizeLeft = yesButton.top;
        } else if ("winner" == sessionType) {
            var winnerButton = Titanium.UI.createButton({
                title: "Winner",
                borderWidth: "1",
                borderColor: "#bbb",
                borderRadius: "8",
                backgroundColor: "#bbb",
                color: "black",
                textAlign: "center",
                font: {
                    fontSize: 24,
                    fontFamily: "Helvetica Neue"
                },
                top: screenHeight / 2 + 15,
                width: "auto",
                height: "40"
            });
            winnerButton.addEventListener("click", function() {
                doSubmit();
            });
            $.votePage.add(winnerButton);
        }
        $.currentImage.image = imagePath;
        $.currentImage.height = sizeLeft - 80;
        $.currentImage.width = "auto";
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
    $.__views.appName = Ti.UI.createButton({
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        top: "10",
        width: "150",
        height: "35",
        title: "uRate",
        id: "appName"
    });
    $.__views.toolbar.add($.__views.appName);
    $.__views.currentImage = Ti.UI.createImageView({
        top: 60,
        borderRadius: "5",
        width: "200",
        height: "200",
        image: "brownLabrador.jpg",
        id: "currentImage"
    });
    $.__views.votePage.add($.__views.currentImage);
    $.__views.submit = Ti.UI.createButton({
        borderWidth: "1",
        borderColor: "black",
        borderRadius: "8",
        backgroundColor: "#bbb",
        color: "black",
        textAlign: "center",
        font: {
            fontSize: 24,
            fontFamily: "Helvetica Neue"
        },
        title: "Submit",
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