//Do all of the heavy lifting(like OS calls) only once. This improves performance a lot.
var uiGenerator = require('ui');
var page = $.startPage;
var activityIndicator = uiGenerator.getWaitIndicator('autoLoginL');

//Configure app settings
if (!Ti.App.Properties.hasProperty('commentEntry')) {
	Ti.App.Properties.setString('commentEntry', 'button');
	//If the property doens't exist, default to a button
}

function displayLoginPage() {
	//Show background activity with an activityindicator
	page.add(activityIndicator);
	activityIndicator.showIndicator();

	//Call autoLogin
	service = require('Authentication');
	service.autoLogin();
	testStatus(service);
};

function goForward(service){
	var success = service.loginStatus();
	activityIndicator.hideIndicator();
	activityIndicator = null;
	//force garbage collector to clean up

	//If autoLogin successful
	if (success == true) {
		//The user is allowed to use the rest of the application, thus display the next page
		var win = Alloy.createController('wait').getView();
		win.open();
	} else {
		//If autoLogin not successful
		var win = Alloy.createController('login').getView();
		win.open();
	}
}

function testStatus(service){
		var done = false;
		var timer = setInterval(function(){ //poll every 1s and stop when autologinDone() returns true
		    done = service.autologinDone();
		    if (done) {
		    	goForward(service);
		        clearInterval(timer);
		    }
		}, 1000); 
}

page.open();
