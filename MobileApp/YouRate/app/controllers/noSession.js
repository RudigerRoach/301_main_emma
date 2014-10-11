var uiGenerator = require('ui');
var page = $.noSessionPage;
var activityIndicator = uiGenerator.getWaitIndicator('noSessionL');

function loadImage(){
	//Show background activity with an activityindicator
	page.add(activityIndicator);
	activityIndicator.showIndicator();
	
	//Check if next image is ready	
	service=require('VoteSession');
	service.getImage();
	testDone(service);	
}

function testDone(service)
{
		var done = false;
		var timer = setInterval(function() //poll every 1s and stop when getImgDone() returns true
		{
		    done = service.getImgDone();
		    if (done) 
		    {
		    	testStatus(service);
		        clearInterval(timer);
		    }
		}, 1000);
}

function testStatus(service)
{
		var done = false;
		var timer = setInterval(function() //poll every 1s and stop when loginStatus() returns 1
		{
		    status = service.status();
		    if (status == "1") 
		    {
		    	goForward(service);
		    }
		    activityIndicator.hideIndicator();
		    activityIndicator = null; //force garbage collection
		    clearInterval(timer);
		}, 1000);
}

function goForward(service){
	var win=Alloy.createController("index.js").getView();
 	win.open();
}

page.open();
