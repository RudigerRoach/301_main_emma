var uiGenerator = require('ui');
var page = $.noSessionPage;
//var activityIndicator = uiGenerator.getWaitIndicator('noSessionL');

function loadImage() {
	//Show background activity with an activityindicator
	// Create a Label.
	var aLabel = Ti.UI.createLabel({
		text : 'There is no open session currently running',
		color : '#textColor',
		font : {fontSize:myFontSize},
		height : myHeight,
		width : myWidth,
		top : myTop,
		left : myLeft,
		textAlign : 'center'
	});
	
	// Add to the parent view.
	parentView.add(aLabel);
	
	page.add(activityIndicator);
	activityIndicator.showIndicator();

	//Check if next image is ready
	service = require('VoteSession');
	service.getImage();
	testDone(service);
}

function testDone(service) {
	var done = false;
	var timer = setInterval(function()//poll every 1s and stop when getImgDone() returns true
	{
		done = service.getImgDone();
		if (done) {
			testStatus(service);
			clearInterval(timer);
		}
	}, 1000);
}

function testStatus(service) {
	var done = false;
	var timer = setInterval(function()//poll every 1s and stop when loginStatus() returns 1
	{
		status = service.status();
		if (status == "1") {
			goForward(service);
		}
		activityIndicator.hideIndicator();
		activityIndicator = null;
		//force garbage collection
		clearInterval(timer);
	}, 1000);
}

function goForward(service) {
	var win = Alloy.createController("index").getView();
	win.open();
}

page.open();
