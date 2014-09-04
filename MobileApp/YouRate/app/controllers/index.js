var waiter;
function displayLoginPage(){
	//Make loading image move
	var number = 1;
	var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "";
	}

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
			//Ti.API.info($.loadingImage.image+" :image");
			number++;
			if (number > 8){number=1;}
		},500);
		
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

function goVote(){
	//For offline testing of vote page - to be taken out!
	var win=Alloy.createController('wait').getView();
	win.open();
}

$.startPage.open();
