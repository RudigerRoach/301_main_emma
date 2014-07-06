function doLogin()
{
	var textareaValue = $.textArea.value;
	alert(textareaValue);
	var service=require('../lib/authentication');
	Ti.App.log(service);
	//service.login('Melany@gmail.com');
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

$.mainWindow.open();
