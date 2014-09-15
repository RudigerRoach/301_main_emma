var waiter;
function loadImage(){
	//Make loading image move
	$.loadingImage.top = Ti.Platform.displayCaps.platformHeight/2 - 50;

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
		},600);
	
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
