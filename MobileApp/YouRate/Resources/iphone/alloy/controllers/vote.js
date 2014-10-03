function Controller() {
    function fixPage() {
        if ("normal" == sessionType) {
            createSubmitButton();
            "true" == comments && commentsEnabled();
            createSlider();
        } else if ("yesNo" == sessionType) {
            createSubmitButton();
            "true" == comments && commentsEnabled();
            createYesNoButtons();
        } else if ("winner" == sessionType) {
            createWinnerButton();
            $.votePage.remove($.currentImage);
            addScrollableImage();
        }
        $.currentImage.image = imagePath;
        $.currentImage.height = screenLeft - 80;
        $.currentImage.width = "auto";
    }
    function doSubmit() {
        service = require("VoteSession");
        "normal" == sessionType && ("true" == comments ? service.submitResult(Math.floor(Number(slider.value)), commentArea.value) : service.submitResult(Math.floor(Number(slider.value)), ""));
        "yesNo" == sessionType && ("true" == comments ? service.submitResult(chosen, commentArea.value) : service.submitResult(chosen, ""));
        "winner" == sessionType && service.submitResult(photosView.currentPage, "");
        var win = Alloy.createController("wait").getView();
        win.open();
    }
    function createSubmitButton() {
        var submitButton = Titanium.UI.createButton({
            titleid: "submitB",
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
            top: screenHeight - 70,
            height: 50,
            width: screenWidth - 40,
            left: 20
        });
        screenLeft = submitButton.top;
        submitButton.addEventListener("click", function(e) {
            doSubmit(e);
        });
        $.votePage.add(submitButton);
    }
    function commentsEnabled() {
        var commentButton = Titanium.UI.createButton({
            titleid: "commentB",
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
            top: screenLeft - 60,
            width: screenWidth - 40,
            left: 20,
            height: 40
        });
        commentButton.addEventListener("click", function() {
            commentArea = Ti.UI.createTextArea({
                borderWidth: "2",
                borderColor: "#bbb",
                borderRadius: "5",
                color: "black",
                opacity: 70,
                textAlign: "left",
                value: "",
                top: 60,
                width: screenWidth - 40,
                left: 20,
                height: 200,
                font: {
                    fontSize: 20,
                    fontFamily: "Helvetica Neue"
                }
            });
            commentArea.addEventListener("blur", function() {
                $.votePage.remove(commentArea);
            });
            $.votePage.add(commentArea);
        });
        $.votePage.add(commentButton);
        screenLeft = commentButton.top;
    }
    function createSlider() {
        slider = Titanium.UI.createSlider({
            top: screenLeft - 90,
            color: "black",
            min: rangeBottom,
            max: rangeTop,
            width: screenWidth - 40,
            left: 20,
            value: (rangeBottom + rangeTop) / 2
        });
        var sliderLabel = Ti.UI.createLabel({
            titleid: "SliderT",
            width: "150",
            height: "30",
            color: "black",
            top: screenLeft - 50,
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
            top: screenLeft - 50,
            left: screenWidth / 2 + 10,
            width: 50,
            height: 30,
            font: {
                fontSize: 20,
                fontFamily: "Helvetica Neue"
            }
        });
        screenLeft = slider.top;
        slider.addEventListener("change", function() {
            sliderArea.value = Math.floor(Number(slider.value));
        });
        sliderArea.addEventListener("change", function() {
            slider.value = sliderArea.value;
        });
        $.votePage.add(slider);
        $.votePage.add(sliderLabel);
        $.votePage.add(sliderArea);
    }
    function createYesNoButtons() {
        var yesButton = Titanium.UI.createButton({
            titleid: "yesB",
            borderWidth: "1",
            borderColor: "#bbb",
            borderRadius: "8",
            backgroundColor: "#197519",
            color: "black",
            textAlign: "center",
            font: {
                fontSize: 24,
                fontFamily: "Helvetica Neue"
            },
            top: screenLeft - 100,
            width: screenWidth / 2 - 30,
            height: "80",
            right: 20,
            padding: 0
        });
        var noButton = Titanium.UI.createButton({
            titleid: "noB",
            borderWidth: "1",
            borderColor: "#bbb",
            borderRadius: "8",
            backgroundColor: "#B80000",
            color: "black",
            textAlign: "center",
            font: {
                fontSize: 24,
                fontFamily: "Helvetica Neue"
            },
            top: screenLeft - 100,
            width: screenWidth / 2 - 30,
            height: "80",
            left: 20,
            padding: 0
        });
        yesButton.addEventListener("click", function() {
            yesButton.opacity = 1;
            noButton.opacity = .5;
            chosen = 1;
        });
        $.votePage.add(yesButton);
        noButton.addEventListener("click", function() {
            yesButton.opacity = .5;
            noButton.opacity = 1;
            chosen = 0;
        });
        $.votePage.add(noButton);
        screenLeft = yesButton.top;
    }
    function createWinnerButton() {
        var winnerButton = Titanium.UI.createButton({
            titleid: "winnerB",
            borderWidth: "1",
            borderColor: "#bbb",
            borderRadius: "8",
            backgroundColor: "#197519",
            color: "black",
            textAlign: "center",
            font: {
                fontSize: 24,
                fontFamily: "Helvetica Neue"
            },
            top: screenLeft - 100,
            left: 20,
            width: screenWidth - 40,
            height: "80",
            padding: 0
        });
        winnerButton.addEventListener("click", function() {
            var dialog = Ti.UI.createAlertDialog({
                cancel: 1,
                buttonNames: [ "Confirm", "Cancel" ],
                message: "Are you sure that this should be the winner?",
                title: "Submit as winner"
            });
            dialog.addEventListener("click", function(e) {
                0 == e.index && doSubmit();
            });
            dialog.show();
        });
        $.votePage.add(winnerButton);
        screenLeft = winnerButton.top;
    }
    function addScrollableImage() {
        var img1 = Ti.UI.createImageView({
            image: "whiteLabrador.jpg",
            height: screenLeft - 80,
            width: "auto"
        });
        var img1Wrapper = Ti.UI.createScrollView({
            maxZoomScale: 4
        });
        img1Wrapper.add(img1);
        var img2 = Ti.UI.createImageView({
            image: "brownLabrador.jpg",
            height: screenLeft - 80,
            width: "auto"
        });
        var img2Wrapper = Ti.UI.createScrollView({
            maxZoomScale: 4
        });
        img2Wrapper.add(img2);
        photosView = Ti.UI.createScrollableView({
            showPagingControl: true,
            views: [ img1Wrapper, img2Wrapper ],
            height: screenLeft - 80,
            width: "auto",
            top: 50
        });
        $.votePage.add(photosView);
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
        backgroundImage: "/universal/bg.png",
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
        defaultImage: "/universal/placeholder.png",
        top: 60,
        borderRadius: "5",
        width: "200",
        height: "200",
        id: "currentImage"
    });
    $.__views.votePage.add($.__views.currentImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var commentArea = "";
    var photoPath = "";
    var slider;
    var ospath = "";
    ospath = "";
    var screenWidth = Ti.Platform.displayCaps.platformWidth;
    var screenHeight = Ti.Platform.displayCaps.platformHeight;
    var screenLeft = screenHeight;
    var chosen = 0;
    var photosView;
    var rangeBottom = 0;
    var rangeTop = 50;
    var description = "Image title";
    var comments = "true";
    var imagePath = ospath + "placeholder.png";
    photoPath = imagePath;
    var sessionType = "winner";
    service = require("VoteSession");
    rangeBottom = service.rangeBottom();
    rangeTop = service.rangeTop();
    description = service.description();
    comments = service.commentsEnabled();
    imagePath = service.imagePath();
    sessionType = service.sessionType();
    Ti.Gesture.addEventListener("orientationchange", function() {
        var win = Alloy.createController("vote").getView();
        win.open();
    });
    $.votePage.open();
    __defers["$.__views.votePage!focus!fixPage"] && $.__views.votePage.addEventListener("focus", fixPage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;