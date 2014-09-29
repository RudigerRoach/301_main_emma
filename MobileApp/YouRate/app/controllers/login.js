var uiGenerator = require('ui');
var page = $.loginPage;
var activityIndicator = uiGenerator.getWaitIndicator('Attempting automatic login...');

var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "";
	}
	
function doLogin()
{		
	//$.loadingImage.top = Ti.Platform.displayCaps.platformHeight/2 - 50;
	$.emailLabel.opacity=0.0;
	$.textArea.opacity=0.0;
	$.loginButton.opacity=0.0;
	//$.loadingImage.opacity=1.0;
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
	//testStatus(service);
	
	goForward(service);
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
		//$.loadingImage.opacity=0.0;
		$.emailLabel.opacity=1.0;
		$.textArea.opacity=1.0;
		$.loginButton.opacity=1.0;
		alert("Error: "+service.error());
		//Offline testing
		var win=Alloy.createController('normal').getView();
	 	win.open();
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

function setActionBar(evt) 
{
    if (OS_ANDROID) 
    {
    	try
    	{
    		var actionBar = $.mainWindow.activity.actionBar; 	//get a handle to the action bar
    		actionBar.title = 'uRate';						//change the App Title
    		actionBar.displayHomeAsUp=false;					//show the "angle" pointing back
    		actionBar.onHomeIconItemSelected = function()		//what to do when the "home" icon is pressed
    		{
    			alert("Home icon clicked!");
    			//This is not the back door you where looking for
    			var win=Alloy.createController('vote').getView();
	 			win.open();
    		};  
    		$.mainWindow.activity.invalidateOptionsMenu();		//makes sure the menu is visible  		
    	}
    	catch(e)
    	{
    		//
    	}
    }
}

$.loginPage.open();
