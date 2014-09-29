var uiGenerator = require('ui');
var page = $.startPage;
var activityIndicator = uiGenerator.getWaitIndicator('Attempting automatic login...');

function displayLoginPage(){		
	//Show background activity with an activityindicator
	page.add(activityIndicator);
	activityIndicator.showIndicator();
	
	//Call autoLogin
	service=require('Authentication');
	service.autoLogin();
	testStatus(service);
};

function goForward(service){
	var success = service.loginStatus();
	//If autoLogin successful
	if (success == true) 
	{
		//The user is allowed to use the rest of the application, thus display the next page
		var win=Alloy.createController('wait').getView();
	 	win.open();
	}
	else
	{	
		//If autoLogin not successful
		//alert("err: "+service.error());
	    var win=Alloy.createController('login').getView(); //must be login
	 	win.open();
 	}
}

function testStatus(service){
		var done = false;
		var timer = setInterval(function(){ //poll every 1s and stop when autologinDone() returns true
		    done = service.autologinDone();
		    if (done) {
		    	activityIndicator.hideIndicator();
		    	goForward(service);
		        clearInterval(timer);
		    }
		}, 1000); 
}

function goVote(){
	//For offline testing of vote page - to be taken out!
	var win=Alloy.createController('vote').getView();
	win.open();
}

$.startPage.open();
