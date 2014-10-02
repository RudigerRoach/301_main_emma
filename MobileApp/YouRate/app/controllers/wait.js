var uiGenerator = require('ui');
var page = $.waitPage;
var activityIndicator = uiGenerator.getWaitIndicator('Waiting for server...');

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
		    }else if(status == "2"){
		    	//Add languages!!!!!!!!!!
			   var dialog = Ti.UI.createAlertDialog({
				    cancel: 1,
				    buttonNames: ['OK'],
				    message: 'Voting session completed',
				    title: 'Submit as winner'
				  });
				  dialog.addEventListener('click', function(e){
				    if(e.index == 0)
				    {
				    	var win=Alloy.createController('login').getView();
		 				win.open();
				    }
				  });
				  dialog.show();
		    }
		    activityIndicator.hideIndicator();
		    activityIndicator = null; //force garbage collection
		    clearInterval(timer);
		}, 1000);
}

function goForward(service){
	var win=Alloy.createController(service.sessionType()).getView(); //service.sessionType()
 	win.open();
}

page.open();
