var ui = require('ui');
var service = require('VoteSession');
var isIOS = ui.isIOS();

//Declare variables and use defaults for testing
var commentButton = null;
var commentBox = null;
var commentText = "";
var chosen = -1;
var cancelIcon;
var label;
var title = "";
var fullScreen = false;
var comments = false;
var imagePath = "/universal/placeholder.png";
var screenLeft = 0;
var displayAsButton = (Ti.App.Properties.getString('commentEntry') == 'button') ? true : false;

//Server calls
title = service.description();
comments = service.commentsEnabled();
imagePath = service.imagePath();

$.currentImage.addEventListener('click', function(e) {
	fullScreenImage();
});

$.submitButton.opacity = 0.3;

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
		} else if (displayAsButton && commentButton != null) {
			commentButton.top = screenLeft - 70;
			commentButton.width = screenWidth - 40;
			commentArea.width = screenWidth - 40;
			screenLeft = commentButton.top;
		} else if (!displayAsButton && commentBox == null) {
			commentsEnabled();
			commentBox.top = screenLeft - 70;
			commentLab.top = screenLeft - 100;
			screenLeft = commentLab.top;
		} else if (!displayAsButton && commentBox != null) {
			commentBox.top = screenLeft - 70;
			commentLab.top = screenLeft - 100;
			commentBox.width = screenWidth - 40;
			commentArea.width = screenWidth - 40;
			screenLeft = commentLab.top;
		}
	}

	$.yesButton.top = screenLeft - 100;
	$.yesButton.width = screenWidth / 2 - 30;

	$.noButton.top = screenLeft - 100;
	$.noButton.width = screenWidth / 2 - 30;

	screenLeft = $.yesButton.top;

	if (fullScreen == false) {
		if (!isIOS) {
			$.currentImage.top = 30;
		}
		$.currentImage.image = imagePath;
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
	if (chosen == "-1") {
		var dialog = Ti.UI.createAlertDialog({
				okid : 'ok',
				messageid : 'yesNoMessage',
				titleid : 'yesNoCaption'
			});
		dialog.show();
	} else {
		//Submit result
		service = require('VoteSession');
		service.submitResult(chosen, commentText);

		//Go to wait page
		var win = Alloy.createController('wait').getView();
		win.open();
	}
}

function doYes() {
	$.yesButton.opacity = 1;
	$.yesButton.borderWidth = 2;
	$.noButton.opacity = 0.5;
	$.noButton.borderWidth = 0;
	$.submitButton.opacity = 1;
	chosen = 1;
}

function doNo() {
	$.yesButton.opacity = 0.5;
	$.yesButton.borderWidth = 0;
	$.noButton.opacity = 1;
	$.noButton.borderWidth = 2;
	$.submitButton.opacity = 1;
	chosen = 0;
}

function commentsEnabled() {
	commentLab = ui.getCommentLabel();
	commentBox = ui.getCommentBox();
	commentArea = ui.getCommentArea();
	commentArea.addEventListener('setFocus', function(e) {
		commentArea.focus();
	});
	commentBox.addEventListener('focus', function(e) {
		$.yesNoPage.add(commentArea);
		commentArea.fireEvent('setFocus');
	});
	commentArea.addEventListener('blur', function(e) {
		commentText = commentArea.value;
		commentBox.value = commentText;
		commentArea.blur();
		$.yesNoPage.remove(commentArea);
	});
	commentArea.addEventListener('return', function(e) {
		commentArea.blur();
	});
	$.yesNoPage.add(commentLab);
	$.yesNoPage.add(commentBox);
}

function commentButtonEnabled() {
	commentButton = ui.getCommentButton();
	commentArea = ui.getCommentArea();

	commentArea.addEventListener('setFocus', function(e) {
		commentArea.focus();
	});
	commentButton.addEventListener('click', function(e) {
		$.yesNoPage.add(commentArea);
		commentArea.fireEvent('setFocus');
	});
	commentArea.addEventListener('blur', function(e) {
		commentText = commentArea.value;
		commentArea.blur();
		$.yesNoPage.remove(commentArea);
	});
	commentArea.addEventListener('return', function(e) {
		commentArea.blur();
	});
	$.yesNoPage.add(commentButton);
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
			$.yesNoPage.add(label);
		}

		$.currentImage.height = h - 40 - topSpace;
		$.currentImage.width = "auto";
		$.currentImage.top = topSpace + 20;
		$.currentImage.zIndex = 5;
		$.yesButton.opacity = 0.3;
		$.noButton.opacity = 0.3;
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
			if (chosen == 0) {
				$.yesButton.opacity = 0.5;
				$.yesButton.borderWidth = 0;
				$.noButton.opacity = 1;
				$.noButton.borderWidth = 2;
				$.submitButton.opacity = 1;
			} else if (chosen == 1) {
				$.yesButton.opacity = 1;
				$.yesButton.borderWidth = 2;
				$.noButton.opacity = 0.5;
				$.noButton.borderWidth = 0;
				$.submitButton.opacity = 1;
			} else {
				$.submitButton.opacity = 0.3;
				$.yesButton.opacity = 1;
				$.noButton.opacity = 1;
			}

			$.yesNoPage.remove(cancelIcon);
			if (title != "") {
				$.yesNoPage.remove(label);
			}
			fullScreen = false;
		});
		$.yesNoPage.add(cancelIcon);
		fullScreen = true;
	}
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});

$.yesNoPage.open(); 