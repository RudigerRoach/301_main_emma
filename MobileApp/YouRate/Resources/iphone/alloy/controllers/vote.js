function Controller() {
    function fixPage() {
        service = require("VoteSession");
        var comments = "true";
        var imagePath = ospath + "placeholder.png";
        imagePath = ospath + "kitty.jpg";
        photoPath = imagePath;
        var sessionType = "winner";
        var controlled = "false";
        if ("normal" == sessionType) {
            createSubmitButton();
            "true" == comments && commentsEnabled();
            createSlider();
        } else if ("yesNo" == sessionType) {
            "false" == controlled && createSubmitButton();
            "true" == comments && commentsEnabled();
            createYesNoButtons();
        } else if ("winner" == sessionType) {
            createWinnerButton();
            addScrollableImage();
        }
        $.currentImage.image = imagePath;
        $.currentImage.height = screenLeft - 80;
        $.currentImage.width = "auto";
    }
    function createSubmitButton() {
        var submitButton = Titanium.UI.createButton({
            title: "Submit",
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
            width: screenWidth - 20,
            left: 10
        });
        screenLeft = submitButton.top;
    }
    function commentsEnabled() {
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
            top: screenLeft - 60,
            width: screenWidth - 20,
            left: 10,
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
            $.votePage.add(commentArea);
        });
        commentArea.addEventListener("blur", function() {
            $.votePage.remove(commentArea);
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
            text: "Score: ",
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
        $.votePage.add(submitButton);
        $.votePage.add(slider);
        $.votePage.add(sliderLabel);
        $.votePage.add(sliderArea);
    }
    function createYesNoButtons() {
        var yesButton = Titanium.UI.createButton({
            title: "Yes",
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
            width: screenWidth / 2 - 20,
            height: "80",
            right: 10,
            padding: 0
        });
        var noButton = Titanium.UI.createButton({
            title: "No",
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
            width: screenWidth / 2 - 20,
            height: "80",
            left: 10,
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
        screenLeft = yesButton.top;
    }
    function createWinnerButton() {
        var winnerButton = Titanium.UI.createButton({
            title: "Winner",
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
        winnerButton.addEventListener("click", function() {});
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
        var photosView = Ti.UI.createScrollableView({
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