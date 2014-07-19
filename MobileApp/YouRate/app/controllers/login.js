function doLogin()
{		
	//Make loading image move
	$.loadingImage.opacity=1.0;
	var number = 1;
	setInterval(function(){$.loadingImage.image=number+".png"; number++; if (number > 8){number=1;}},500);
	
	//Gets email address from user input
	var email = $.textArea.value;
	
	//Call login
	service=require('Authentication');
	service.login(email);
	testStatus(service);
};

function goForward(service){
	var success = service.loginStatus();
	
	//If login successful
	if (success == true)
	{
		//The user is allowed to use the rest of the application, thus display the next page
		var win=Alloy.createController('vote').getView();
	 	win.open();
	}
	else
	{	
		//If login not successful
		$.loadingImage.opacity=0.0;
		alert("Error: "+service.error());
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

function doClickMenu(evt) 
{
    alert(evt.source.title);
}

function setActionBar(evt) 
{
    if (OS_ANDROID) 
    {
    	try
    	{
    		var actionBar = $.mainWindow.activity.actionBar; 	//get a handle to the action bar
    		actionBar.title = 'YouRate';						//change the App Title
    		actionBar.displayHomeAsUp=false;					//show the "angle" pointing back
    		actionBar.onHomeIconItemSelected = function()		//what to do when the "home" icon is pressed
    		{
    			alert("Home icon clicked!");
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
