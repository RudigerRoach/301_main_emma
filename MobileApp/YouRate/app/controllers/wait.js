var uiGenerator = require('ui');
var waiter;
var page = $.waitPage;
var activityIndicator = uiGenerator.getWaitIndicator('Waiting for server...');

function loadImage(){
		/*
	//Make loading image move
	$.loadingImage.top = Ti.Platform.displayCaps.platformHeight/2 - 50;
	$.waitLabel.top = Ti.Platform.displayCaps.platformHeight/2 + 100;

	var number = 1;
	var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "/";
	}
	$.waitPage.backgroundImage = ospath+"bg.jpg";
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
	
	//Check if next image is ready	
	service=require('VoteSession');
	service.getImage();
	testDone(service);	
}

function testDone(service){
		var done = false;
		var timer = setInterval(function(){ //poll every 1s and stop when getImgDone() returns true
		    done = service.getImgDone();
		    if (done) {
		    	testStatus(service);
		        clearInterval(timer);
		    }
		}, 1000);
}

function testStatus(service){
		var done = false;
		var timer = setInterval(function(){ //poll every 1s and stop when loginStatus() returns 1
		    status = service.status();
		    if (status == "1") {
		    	goForward(service);
		    }else if(status == "2"){
		    	alert("Voting session completed");
		    	var win=Alloy.createController('login').getView();
 				win.open();
		    }
		    activityIndicator.hideIndicator();
		    clearInterval(timer);
		}, 1000);
}

function goForward(service)
{
	clearInterval(waiter);
	var win=Alloy.createController('vote').getView();
 	win.open();
}

$.waitPage.open();
