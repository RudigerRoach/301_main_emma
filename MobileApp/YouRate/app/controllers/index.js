var uiGenerator = require('ui');
var waiter;
var page = $.startPage;
var activityIndicator = uiGenerator.getWaitIndicator('Attempting automatic login...');

function displayLoginPage(){
	/*
	//Make loading image move
	$.loadingImage.top = Ti.Platform.displayCaps.platformHeight/2 - 50;
	var number = 1;
	var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "/";
	}
	$.startPage.backgroundImage = ospath+"bg.jpg";
	ospath += "spinner/";
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
				case 9:
					$.loadingImage.image = ospath+"i.png";
				break;
				case 10:
					$.loadingImage.image = ospath+"j.png";
				break;
				case 11:
					$.loadingImage.image = ospath+"k.png";
				break;
				case 12:
					$.loadingImage.image = ospath+"l.png";
				break;
				case 13:
					$.loadingImage.image = ospath+"m.png";
				break;
				case 14:
					$.loadingImage.image = ospath+"n.png";
				break;
				case 15:
					$.loadingImage.image = ospath+"o.png";
				break;
				case 16:
					$.loadingImage.image = ospath+"p.png";
				break;
			}

			number++;
			if (number > 16){number=1;}
		},150);
		*/
		
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
	clearInterval(waiter);
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
