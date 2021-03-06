var ui = require('ui');
var service = require('VoteSession');
var isIOS = ui.isIOS();
var updateSlider = false;
var screenLeft;

//Declare variables and use defaults for testing
var photosView = null;
var screenLeft;
var chosen = "-1";
var cancelIcon;
var label;
var im;
var topSpace;
var index = 0;
var title = new Array();
title[0] = "";
title[1] = "";
title[2] = "";
var fullScreen = false;
var imagePath = new Array();
imagePath[0] = "/brownLabrador.jpg";
imagePath[1] = "/kitty.jpg";
imagePath[2] = "/whiteLabrador.jpg";

//Server calls
title = service.description();
imagePath = service.imageArray();
var net = require("Network");

//Resize all artifacts on the screen to match the screen size and orientation
function resizePage() {
	var screenWidth = ui.platformWidth();
	var screenHeight = ui.platformHeight();
	if (!isIOS) {
		screenHeight -= 70;
	}
	screenLeft = screenHeight;

	if(chosen == "-1")
	{
		$.submitButton.opacity = 0.3;
	}
	$.submitButton.top = screenHeight - 70;
	$.submitButton.width = screenWidth - 40;
	screenLeft = $.submitButton.top;

	$.winnerButton.top = screenLeft - 100;
	$.winnerButton.width = screenWidth - 40;
	screenLeft = $.winnerButton.top;

	if (fullScreen == false) {
		addScrollableImage();
	} else {
		im.height = screenHeight - 40 - topSpace;
		im.width = "auto";
		im.top = topSpace + 20;
		im.zIndex = 5;
	}
}

function doSubmit(e) {
	//Submit result
	if(chosen == "-1")
	{
		var dialog = Ti.UI.createAlertDialog({
			okid : 'ok',
			messageid : 'winnerMessage',
			titleid : 'please'
		});		
	}
	else
	{
		service = require('VoteSession');
		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : [L('confirm'), L('cancel')],
			messageid : 'winnerSubmit2',
			titleid : 'winnerSubmit1'
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				service.submitResult(""+chosen+"", "");
				//Go to wait page
				var win = Alloy.createController('wait').getView();
				win.open();
			}
		});
		dialog.show();
	}
};

$.winnerButton.addEventListener('click', function(e) {	
	chosen = photosView.currentPage;
	$.submitButton.opacity = 1;
	$.winnerButton.borderWidth = 3;
	$.winnerButton.borderColor = "black";
});

function addScrollableImage() {
	if (photosView == null) {
		var wrapperList = new Array();
		for (var k = 0; k < imagePath.length; k++) {
			var img = Ti.UI.createImageView({
				image : imagePath[k],
				image : net.serverPath() + "/" + imagePath[k],
				height : screenLeft - 80,
				width : "auto"
			});
			var imgWrapper = Ti.UI.createScrollView({
				maxZoomScale : 4.0
			});
			img.addEventListener('singletap', function(e) {
				fullScreenImage();
			});
			imgWrapper.add(img);
			wrapperList[k] = imgWrapper;
		}

		photosView = Ti.UI.createScrollableView({
			showPagingControl : true,
			views : wrapperList,
			top : 60
		});

		photosView.addEventListener('scroll', function(e) {
			index = photosView.currentPage;
			if (photosView.currentPage == chosen) {
				$.winnerButton.borderWidth = 3;
				$.winnerButton.borderColor = "black";
			} else {
				$.winnerButton.borderWidth = 0;
			}
		});

		$.winnerPage.add(photosView);
	}

	if (!isIOS) {
		photosView.top = 30;
	}
	photosView.height = screenLeft - 80;
	photosView.width = "auto";
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
		if (title[index] != "") {
			label = Ti.UI.createLabel({
				text : title[index],
				color : 'black',
				font : {
					fontSize : 24,
					fontFamily : 'Helvetica Neue'
				},
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			label.top = topSpace;
			topSpace = topSpace + 20;
			$.winnerPage.add(label);
		}

		im = Ti.UI.createImageView({
			image : imagePath[index],
			image : net.serverPath() + "/" + imagePath[index],
			height : h - 40 - topSpace,
			width : "auto",
			top : topSpace + 20,
			zIndex : 5
		});
		$.winnerPage.add(im);
		photosView.opacity = 0;
		$.submitButton.opacity = 0.3;
		$.winnerButton.opacity = 0.3;

		cancelIcon = ui.getCancelIcon();
		if (!isIOS) {
			cancelIcon.top = 20;
		} else
			cancelIcon.top = 50;
		cancelIcon.right = 20;

		cancelIcon.addEventListener('click', function(e) {
			if (!isIOS) {
				photosView.top = 30;
			}
			photosView.height = screenLeft - 80;
			photosView.width = "auto";
			photosView.opacity = 1;
			$.submitButton.opacity = 1;
			$.winnerButton.opacity = 1;

			$.winnerPage.remove(im);
			$.winnerPage.remove(cancelIcon);
			if (title[index] != "") {
				$.winnerPage.remove(label);
			}
			fullScreen = false;
		});
		$.winnerPage.add(cancelIcon);
		fullScreen = true;
	}
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});

$.winnerPage.open();
