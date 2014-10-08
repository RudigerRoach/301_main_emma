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
var description = "Image title";
var comments = "true";
var imagePath = "/universal/placeholder.png";
var displayAsButton = (Ti.App.Properties.getString('commentEntry') == 'button') ? true : false;
//imagePath = ospath+"animalLandscape.jpg";

//Server calls
rangeBottom = service.rangeBottom();
rangeTop = service.rangeTop();
description = service.description();
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

//Resize all artifacts on the screen to match the screen size and orientation
function resizePage() {
	var screenWidth = ui.platformWidth();
	var screenHeight = ui.platformHeight();
	if (!isIOS) {
		screenHeight -= 60;
	}
	var screenLeft = screenHeight;

	$.submitButton.top = screenHeight - 70;
	$.submitButton.width = screenWidth - 40;
	screenLeft = $.submitButton.top;

	if (comments == "true") {
		if(displayAsButton && commentButton == null)
		{
			commentButtonEnabled();
			commentButton.top = screenLeft - 70;
			screenLeft = commentButton.top;
			$.sliderArea.blur();	
		}
		else if(!displayAsButton && commentBox == null)
		{
			commentsEnabled();
			commentBox.top = screenLeft - 70;
			commentLab.top = screenLeft - 100;
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
		firstload = false;
	}

	$.scoreSlider.width = screenWidth - 40;
	screenLeft = $.scoreSlider.top;

	if (!isIOS) {
		$.currentImage.top = 30;
	}

	$.currentImage.height = screenLeft - 80;
	$.currentImage.width = "auto";
}

function doSubmit(e) {
	//Submit result
	service = require('VoteSession');
	service.submitResult(Math.floor(Number($.scoreSlider.value)), commentText);
	//service.submitResult(photosView.currentPage,"");
	//alert("Result successfully submitted");

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

Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});
$.normalPage.open();
