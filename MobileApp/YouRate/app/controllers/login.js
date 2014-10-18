var uiGenerator = require('ui');
var page = $.loginPage;
var activityIndicator = uiGenerator.getWaitIndicator('loginL');
var isIOS = require('ui').isIOS();

function doLogin()
{		
	var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (!filter.test($.textArea.value))//shortest possible email address "a@b.c" is of length 5
	{
		error = "Invalid email address entered, please revise your email address.";
		var dialog = Ti.UI.createAlertDialog({
			buttonNames : ['Ok'],
			message : error,
			title : 'Invalid input.'
		});
		dialog.show();
		return;
	}
	
	$.emailLabel.opacity=0.0;
	$.textArea.opacity=0.0;
	$.loginButton.opacity=0.0;
	$.textArea.blur();
	$.loginButton.titleid = 'loginB';
		
	//Show background activity with an activityindicator
	page.add(activityIndicator);
	activityIndicator.showIndicator();	
		
	//Gets email address from user input
	var email = $.textArea.value;
	
	//Call login
	service=require('Authentication');
	service.login(email);
	
	//INFINITE LOOP???
	testStatus(service);

	//goForward(service);
};

function goForward(service){
	var success = service.loginStatus();
		activityIndicator.hideIndicator();
		
	//If login successful
	if (success == true)
	{
		//The user is allowed to use the rest of the application, thus display the next page
		var win=Alloy.createController('wait').getView();
	 	win.open();
	}
	else
	{	
		//If login not successful
		$.emailLabel.opacity=1.0;
		$.textArea.opacity=1.0;
		$.loginButton.opacity=1.0;
		alert("Error: "+service.error());
 	}
}

function testStatus(service){
		var done = false;
		var timer = setInterval(function(){ //poll every 1s and stop when loginDone() returns true
		    done = service.loginDone();
		    if (done) {
		    	goForward(service);
		        clearInterval(timer);
		    }
		}, 1000);
}

//show the settings menu
if (!isIOS) {
	var activity = $.loginPage.activity;

	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({
			title : "Settings",
			icon : '/universal/settingsIcon.png'
		});
		menuItem.addEventListener("click", function(e) {
			var win = Alloy.createController('settings').getView();
			win.open();
		});
	};
}else{
	var img = Ti.UI.createImageView({
		image : '/universal/settingsIcon.png',
		bottom : 0,
		right : 0
	});
	img.addEventListener('click',function(e){
		var win = Alloy.createController('settings').getView();
		win.open();
	});
	$.loginPage.add(img);
}

$.loginPage.open();
