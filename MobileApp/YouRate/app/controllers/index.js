function displayLoginPage(e){
	//Call autoLogin
	var service=require('authentication');
	service.autoLogin();
	var success = service.loginStatus();
	//If autoLogin successful
	if (success == true)
	{
		//The user is allowed to use the rest of the application, thus display the next page
		var win=Alloy.createController('vote').getView();
	 	win.open();
	}
	else
	{	
		//If autoLogin not successful
	    var win=Alloy.createController('login').getView();
	 	win.open();
 	}
};

$.startPage.open();
