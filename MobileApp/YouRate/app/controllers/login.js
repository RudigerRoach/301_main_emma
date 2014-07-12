function doLogin()
{
	//Gets email address from user input
	var email = $.textArea.value;
	alert(email);
	//Calls login function to determine if user is allowed to access the rest of the application
	var service=require('authentication');
	//Ti.App.log(service);
	var success = service.login(email);
	//if (success == true)
	//{
		//The user is allowed to use the rest of the application, thus display the next page
		var win=Alloy.createController('vote').getView();
	 	win.open();
	//}
	//else
	//{
		//The user is  not allowed to use the rest of the application
		//alert('Login failed');
	//}
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
