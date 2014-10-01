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
var chosen = -1;
var description = "Image title";
var imagePath = ospath + "placeholder.png";
//imagePath = ospath+"animalLandscape.jpg";

//Server calls
 /*description = service.description();
 imagePath = service.imagePath();*/

//Resize all artifacts on the screen to match the screen size and orientation
function resizePage()
{
	var screenWidth = ui.platformWidth();
	var screenHeight = ui.platformHeight();
	if (!isIOS) {
		screenHeight -= 90;
	}
	var screenLeft = screenHeight;
	
	$.submitButton.top = screenHeight - 70;
	$.submitButton.width = screenWidth - 40;	
	screenLeft = $.submitButton.top;
	
	$.winnerButton.top = screenLeft - 100;
	$.winnerButton.width = screenWidth - 40;	
	screenLeft = $.winnerButton.top;
	alert(screenLeft);
	addScrollableImage();	
	alert(screenLeft);
}

function doSubmit(e)
{	
	//Submit result	
	service=require('VoteSession');	
		service.submitResult(photosView.currentPage,"");
    //alert("Result successfully submitted");
    
    //Go to wait page
	var win=Alloy.createController('wait').getView();
 	win.open();
};

$.winnerButton.addEventListener('click',function(e)
{
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
	    	doSubmit();
	    }
	  });
	  dialog.show();
});

function addScrollableImage()
{
	var total = 2;	
	var wrapperList = new Array();
	for(var k = 0; k < total; k++)
	{		
		var img = Ti.UI.createImageView({
	    image:"whiteLabrador.jpg",
		  height: screenLeft - 80,
		  width: "auto"
		});
		var imgWrapper = Ti.UI.createScrollView({
		    maxZoomScale:4.0
		});
		imgWrapper.add(img);
	alert("2 " + imgWrapper);
		wrapperList[k] = imgWrapper;
	}

alert("|"+wrapperList+"|");
	photosView = Ti.UI.createScrollableView({
	    showPagingControl:true,
	    views:[wrapperList],
		  height: 300,
		  width: 300,
		  top: 60
	});
	//alert(photosView.currentPage);
	$.winnerPage.add(photosView);
}
	
$.winnerPage.open();