var waiter;
function doLogin()
{		
	//Make loading image move
	$.loadingImage.top = Ti.Platform.displayCaps.platformHeight/2 - 50;
	$.emailLabel.opacity=0.0;
	$.textArea.opacity=0.0;
	$.loginButton.opacity=0.0;
	$.loadingImage.opacity=1.0;
	$.textArea.blur();
	
	var number = 1;
	var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "";
	}
	
	$.loginPage.backgroundImage = ospath+"bg.jpg";
	
	waiter = setInterval(function(){
			switch(number){
				case 1:
					$.loadingImage.image = ospath+"a.png";
				break;
				case 2:
					$.loadingImage.image = ospath+"b.png";
				break;
				case 3:
					$.loadingImage.image = ospath+"c.png";
				break;
				case 4:
					$.loadingImage.image = ospath+"d.png";
				break;
				case 5:
					$.loadingImage.image = ospath+"e.png";
				break;
				case 6:
					$.loadingImage.image = ospath+"f.png";
				break;
				case 7:
					$.loadingImage.image = ospath+"g.png";
				break;
				case 8:
					$.loadingImage.image = ospath+"h.png";
				break;
			}
			number++;
			if (number > 8){number=1;}
		},500);
	
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
		clearInterval(waiter);
	
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
		$.loadingImage.opacity=0.0;
		$.emailLabel.opacity=1.0;
		$.textArea.opacity=1.0;
		$.loginButton.opacity=1.0;
		alert("Error: "+service.error());
		//Offline testing
		var win=Alloy.createController('vote').getView();
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
