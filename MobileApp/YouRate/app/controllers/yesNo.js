var ui = require('ui');
var service = require('VoteSession');
var isIOS = ui.isIOS();
var updateSlider = false;

var ospath = "";
if (!isIOS) {
	ospath = "/images/";
} else {
	ospath = "";
}

//declare variables and use defaults for testing
var commentButton = null;
var commentText = "";	
var chosen = -1;
var description = "Image title";
var comments = "true";
var imagePath = ospath + "placeholder.png";
//imagePath = ospath+"animalLandscape.jpg";

//Server calls
 /*description = service.description();
 comments = service.commentsEnabled();
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
	
	if(comments == "true")
	{
		if(commentButton == null)
		{
			commentsEnabled();
		}
		commentButton.top = screenLeft - 60;
	    commentButton.width = screenWidth - 40;
	    screenLeft = commentButton.top;
	}
	
	$.yesButton.top = screenLeft - 100;
	$.yesButton.width = screenWidth/2 - 30;
	
	$.noButton.top = screenLeft - 100;
	$.noButton.width = screenWidth/2 - 30;
	
	screenLeft = $.yesButton.top;
	
	if(!isIOS){
		$.currentImage.top = 30;
	}
	$.currentImage.image = imagePath;
	$.currentImage.height = screenLeft - 80;
	$.currentImage.width = "auto";
}

function doSubmit(e)
{	
	if(chosen == "-1")
	{
		//LANGUAGE
		alert("Please choose yes or no");
	}
	else
	{
		//Submit result	
		service=require('VoteSession');	
		service.submitResult(chosen,commentText);
	    
	    //Go to wait page
		var win=Alloy.createController('wait').getView();
	 	win.open();
 	}
}

function doYes()
{	
   	$.yesButton.opacity = 1;
   	$.yesButton.borderWidth = 2;
	$.noButton.opacity = 0.5;
   	$.noButton.borderWidth = 0;
	chosen = 1;
}

function doNo()
{	
   	$.yesButton.opacity = 0.5;
   	$.yesButton.borderWidth = 0;
	$.noButton.opacity = 1;
   	$.noButton.borderWidth = 2;
	chosen = 0;
}

function commentsEnabled() {
		commentButton = ui.getCommentButton();
		commentArea = ui.getCommentArea();

		commentButton.addEventListener('click',function(e)
		{
				$.normalPage.add(commentArea);
				commentArea.focus();
		});
		commentArea.addEventListener('blur',function(e)
		{
			commentText = commentArea.value;
			$.yesNoPage.remove(commentArea);
		});
		commentArea.addEventListener('return',function(e)
		{
			commentArea.blur();
		});
	$.yesNoPage.add(commentButton);
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});
	
$.yesNoPage.open();