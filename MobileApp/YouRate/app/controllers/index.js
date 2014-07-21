function displayLoginPage(e){
	//Make loading image move
	var number = 1;
	setInterval(function(){$.loadingImage.image=number+".png"; number++; if (number > 8){number=1;}},500);
		
	//Call autoLogin
	service=require('Authentication');
	service.autoLogin();
	testStatus(service);
};

$.startPage.open();

function goForward(service){
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
		//alert("err: "+service.error());
	    var win=Alloy.createController('login').getView();
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
