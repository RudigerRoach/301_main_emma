var ui = require('ui');
var service = require('VoteSession');
var isIOS = ui.isIOS();
var updateSlider = false;
var screenLeft;

var ospath = "";
if (!isIOS) {
	ospath = "/images/";
} else {
	ospath = "";
}

//declare variables and use defaults for testing
var photosView = null;
var screenLeft;	
var chosen = -1;
var description = "Image title";
var imagePath = new Array();
imagePath[0] = "/brownLabrador.jpg";
imagePath[1] = "/kitty.jpg";
imagePath[2] = "/whiteLabrador.jpg";

//Server calls
 description = service.description();
 imagePath = service.imagePath();

//Resize all artifacts on the screen to match the screen size and orientation
function resizePage()
{
	var screenWidth = ui.platformWidth();
	var screenHeight = ui.platformHeight();
	if (!isIOS) {
		screenHeight -= 60;
	}
	screenLeft = screenHeight;
	
	$.submitButton.top = screenHeight - 70;
	$.submitButton.width = screenWidth - 40;	
	screenLeft = $.submitButton.top;
	
	$.winnerButton.top = screenLeft - 100;
	$.winnerButton.width = screenWidth - 40;	
	screenLeft = $.winnerButton.top;
	addScrollableImage();	
}

function doSubmit(e)
{	
	//Submit result	
	service=require('VoteSession');	
	//Add languages!!!!!!!!!!
   var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: ['Confirm', 'Cancel'],
	    message: 'Are you sure that this should be the winner?',
	    title: 'Submit as winner'
	  });
	  dialog.addEventListener('click', function(e){
	    if(e.index == 0)
	    {
			service.submitResult(chosen,"");
		    //Go to wait page
			var win=Alloy.createController('wait').getView();
		 	win.open();
	    }
	  });
	  dialog.show();
    //alert("Result successfully submitted");
};

$.winnerButton.addEventListener('click',function(e)
{
	chosen = photosView.currentPage;
	$.winnerButton.borderWidth = 1;
	$.winnerButton.borderColor = "black";
});

function addScrollableImage()
{
	if(photosView == null)
	{
		var wrapperList = new Array();
		for(var k = 0; k < imagePath.length; k++)
		{		
			var img = Ti.UI.createImageView({
		    image:imagePath[k],
			  height: screenLeft - 80,
			  width: "auto"
			});
			var imgWrapper = Ti.UI.createScrollView({
			    maxZoomScale:4.0
			});
			imgWrapper.add(img);
			wrapperList[k] = imgWrapper;
		}
	
		photosView = Ti.UI.createScrollableView({
		    showPagingControl:true,
		    views:wrapperList,
		    top:60
		});
		
		photosView.addEventListener('scroll',function(e)
		{
			if(photosView.currentPage == chosen)
			{
				$.winnerButton.borderWidth = 1;
				$.winnerButton.borderColor = "black";
			}
			else
			{
				$.winnerButton.borderWidth = 0;	
			}
		});
	
		$.winnerPage.add(photosView);
	}
		
	if(!isIOS){
		photosView.top = 30;
	}
	photosView.height = screenLeft - 80;
	photosView.width = "auto";
}
	
Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});

$.winnerPage.open();