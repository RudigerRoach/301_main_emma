//TODO : remove focus from sliderArea when page opens

var ui = require('ui');
var service = require('VoteSession');
var isIOS = ui.isIOS();
var updateSlider = false;
var firstload = true;
//a boolean that will ONLY be true up untill the page has completed drawing for the first time

//declare variables and use defaults for testing
var commentButton = null;
var commentBox = null;
var commentText = "";
var rangeBottom = 0;
var rangeTop = 50;
var topSpace = 50;
var cancelIcon;
var label;
var title = "";
var fullScreen = false;
var screenLeft;
var comments = true;
var imagePath = "/universal/placeholder.png";
var displayAsButton = (Ti.App.Properties.getString('commentEntry') == 'button') ? true : false;

//Server calls
rangeBottom = service.rangeBottom();
rangeTop = service.rangeTop();
title = service.description();
comments = service.commentsEnabled();
imagePath = service.imagePath();

//Bind event listeners to the slider and score input box to make them play nice
$.scoreSlider.addEventListener('change', function(e) {
	if (!updateSlider) {
		$.sliderArea.value = Math.floor(Number($.scoreSlider.value));
	} else {
		updateSlider = false;
	}
});
$.sliderArea.addEventListener('return', function(e) {
	updateSlider = true;
	newValue = Math.floor(Number($.sliderArea.value));
	$.scoreSlider.value = newValue;
	$.sliderArea.blur();
});
$.currentImage.addEventListener('click', function(e) {
	fullScreenImage();
});
//Temporary solution to hide sliderarea at page load
$.sliderArea.addEventListener('focus', function f(e) {
	$.sliderArea.blur();
	$.sliderArea.removeEventListener('focus', f);
});

//Resize all artifacts on the screen to match the screen size and orientation
function resizePage() {
	var screenWidth = ui.platformWidth();
	var screenHeight = ui.platformHeight();
	if (!isIOS) {
		screenHeight -= 70;
	}
	screenLeft = screenHeight;

	$.submitButton.top = screenHeight - 70;
	$.submitButton.width = screenWidth - 40;
	screenLeft = $.submitButton.top;

	if (comments == true) {
		if (displayAsButton && commentButton == null) {
			commentButtonEnabled();
			commentButton.top = screenLeft - 70;
			screenLeft = commentButton.top;
			$.sliderArea.blur();
		} else if (displayAsButton && commentButton != null) {
			commentButton.top = screenLeft - 70;
			commentButton.width = screenWidth - 40;
			commentArea.width = screenWidth - 40;
			screenLeft = commentButton.top;
			$.sliderArea.blur();
		} else if (!displayAsButton && commentBox == null) {
			commentsEnabled();
			commentBox.top = screenLeft - 70;
			commentLab.top = screenLeft - 100;
			screenLeft = commentLab.top;
			$.sliderArea.blur();
		} else if (!displayAsButton && commentBox != null) {
			commentBox.top = screenLeft - 70;
			commentLab.top = screenLeft - 100;
			commentBox.width = screenWidth - 40;
			commentArea.width = screenWidth - 40;
			screenLeft = commentLab.top;
			$.sliderArea.blur();
		}
	}

	$.sliderLabel.top = screenLeft - 50;
	$.sliderLabel.right = screenWidth / 2 + 10;

	$.sliderArea.top = screenLeft - 50;
	$.sliderArea.left = screenWidth / 2 + 20;
	screenLeft = $.sliderLabel.top;

	$.scoreSlider.top = screenLeft - 40;
	if (firstload) {
		$.scoreSlider.min = rangeBottom;
		$.scoreSlider.max = rangeTop;
		$.scoreSlider.value = (rangeBottom + rangeTop) / 2;
		$.sliderArea.value = $.scoreSlider.value;
		$.currentImage.image = imagePath;
		//alert("firstLoad " + $.currentImage.image);
		firstload = false;
	}

	$.scoreSlider.width = screenWidth - 40;
	screenLeft = $.scoreSlider.top;

	if (fullScreen == false) {
		if (!isIOS) {
			$.currentImage.top = 30;
		}
		$.currentImage.height = screenLeft - 80;
		$.currentImage.width = "auto";
	} else {
		$.currentImage.height = screenHeight - 40 - topSpace;
		$.currentImage.width = "auto";
		$.currentImage.top = topSpace + 20;
		$.currentImage.zIndex = 5;
	}
}

function doSubmit(e) {

	//$.currentImage.image = imagePath;
	//alert("changed " + $.currentImage.image);

	//Submit result
	service = require('VoteSession');
	service.submitResult(Math.floor(Number($.scoreSlider.value)), commentText);

	//Go to wait page
	var win = Alloy.createController('wait').getView();
	win.open();
}

function commentsEnabled() {
	commentLab = ui.getCommentLabel();
	commentBox = ui.getCommentBox();
	commentArea = ui.getCommentArea();
	commentArea.addEventListener('setFocus', function(e) {
		commentArea.focus();
	});
	commentBox.addEventListener('focus', function(e) {
		$.normalPage.add(commentArea);
		commentArea.fireEvent('setFocus');
	});
	commentArea.addEventListener('blur', function(e) {
		commentText = commentArea.value;
		commentBox.value = commentText;
		commentArea.blur();
		$.normalPage.remove(commentArea);
	});
	commentArea.addEventListener('return', function(e) {
		commentArea.blur();
	});
	$.normalPage.add(commentLab);
	$.normalPage.add(commentBox);
}

function commentButtonEnabled() {
	commentButton = ui.getCommentButton();
	commentArea = ui.getCommentArea();

	commentArea.addEventListener('setFocus', function(e) {
		commentArea.focus();
	});
	commentButton.addEventListener('click', function(e) {
		$.normalPage.add(commentArea);
		commentArea.fireEvent('setFocus');
	});
	commentArea.addEventListener('blur', function(e) {
		commentText = commentArea.value;
		commentArea.blur();
		$.normalPage.remove(commentArea);
	});
	commentArea.addEventListener('return', function(e) {
		commentArea.blur();
	});
	$.normalPage.add(commentButton);
}

function fullScreenImage() {
	if (fullScreen == false) {
		var w = ui.platformWidth();
		var h = ui.platformHeight();
		if (!isIOS) {
			h -= 70;
			topSpace = 20;
		} else
			topSpace = 50;
		if (title != "") {
			label = Ti.UI.createLabel({
				text : title,
				color : 'black',
				font : {
					fontSize : 24,
					fontFamily : 'Helvetica Neue'
				},
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			label.top = topSpace;
			topSpace = topSpace + 20;
			$.normalPage.add(label);
		}

		$.currentImage.height = h - 40 - topSpace;
		$.currentImage.width = "auto";
		$.currentImage.top = topSpace + 20;
		$.currentImage.zIndex = 5;
		$.scoreSlider.opacity = 0.3;
		$.sliderLabel.opacity = 0.3;
		$.sliderArea.opacity = 0.3;
		if (comments == true) {
			commentButton.opacity = 0.3;
		}
		$.submitButton.opacity = 0.3;

		cancelIcon = ui.getCancelIcon();
		if (!isIOS) {
			cancelIcon.top = 20;
		} else
			cancelIcon.top = 50;
		cancelIcon.right = 20;

		cancelIcon.addEventListener('click', function(e) {
			if (!isIOS) {
				$.currentImage.top = 30;
			} else {
				$.currentImage.top = 60;
			}
			$.currentImage.height = screenLeft - 80;
			$.currentImage.width = "auto";
			if (comments == true) {
				commentButton.opacity = 1;
			}
			$.submitButton.opacity = 1;
			$.scoreSlider.opacity = 1;
			$.sliderLabel.opacity = 1;
			$.sliderArea.opacity = 1;

			$.normalPage.remove(cancelIcon);
			if (title != "") {
				$.normalPage.remove(label);
			}
			fullScreen = false;
		});
		$.normalPage.add(cancelIcon);
		fullScreen = true;
	}
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});

$.normalPage.open();

