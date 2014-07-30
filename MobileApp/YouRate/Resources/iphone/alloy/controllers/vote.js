function Controller() {
    function fixPage() {
        var slider = Titanium.UI.createSlider({
            top: "260",
            color: "black",
            min: "0",
            max: "100",
            width: "300",
            value: "50"
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
            top: "255",
            width: "170",
            height: "30"
        });
        yesButton.addEventListener("click", function() {
            doSubmit();
        });
        $.votePage.add(yesButton);
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
            top: "290",
            width: "170",
            height: "30"
        });
        noButton.addEventListener("click", function() {});
        $.votePage.add(noButton);
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
        var commentArea = Ti.UI.createTextArea({
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
                fontSize: 20,
                fontFamily: "Helvetica Neue"
            }
        });
        var commentLabel = Ti.UI.createLabel({
            text: "Comments:",
            width: "200",
            height: "50",
            color: "black",
            top: "310",
            font: {
                fontSize: 24,
                fontFamily: "Helvetica Neue"
            },
            textAlign: "center"
        });
        $.votePage.add(commentArea);
        $.votePage.add(commentLabel);
    }
    function doSubmit() {
        alert("Score successfully submitted");
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
    fixPage ? $.__views.votePage.addEventListener("load", fixPage) : __defers["$.__views.votePage!load!fixPage"] = true;
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
    $.__views.submit = Ti.UI.createButton({
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
        id: "submit"
    });
    $.__views.votePage.add($.__views.submit);
    doSubmit ? $.__views.submit.addEventListener("click", doSubmit) : __defers["$.__views.submit!click!doSubmit"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.votePage.open();
    __defers["$.__views.votePage!load!fixPage"] && $.__views.votePage.addEventListener("load", fixPage);
    __defers["$.__views.submit!click!doSubmit"] && $.__views.submit.addEventListener("click", doSubmit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;