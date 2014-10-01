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
var rangeBottom = 0;
var rangeTop = 50;
var description = "Image title";
var comments = "true";
var imagePath = ospath + "placeholder.png";
//imagePath = ospath+"animalLandscape.jpg";

//Server calls
 rangeBottom = service.rangeBottom();
 rangeTop = service.rangeTop();
 description = service.description();
 comments = service.commentsEnabled();
 imagePath = service.imagePath();

//Bind event listeners to the slider and score input box to make them play nice
$.slider.addEventListener('change', function(e) {
	if(!updateSlider)
	{
		$.sliderArea.value = Math.floor(Number($.slider.value));
	}else{
		updateSlider = false;
	}
});
$.sliderArea.addEventListener('return', function(e) {
	updateSlider = true;
	$.slider.value = $.sliderArea.value;
	$.sliderArea.blur();
});

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
			$.sliderArea.blur();
		}
		commentButton.top = screenLeft - 60;
	    commentButton.width = screenWidth - 40;
	    screenLeft = commentButton.top;
	}
	
	$.sliderLabel.top = screenLeft - 50;
	$.sliderLabel.left = screenWidth/2 - 100;
	
	$.sliderArea.top = screenLeft - 50;
	$.sliderArea.left = screenWidth/2 + 10;
	screenLeft = $.sliderLabel.top;
	
	$.slider.top = screenLeft - 40;
	$.slider.min = rangeBottom;
	$.slider.max = rangeTop;
	$.slider.width = screenWidth - 40;
	$.slider.value = (rangeBottom+rangeTop)/2;	
    $.sliderArea.value = $.slider.value;
	screenLeft = $.slider.top;
	
	if(!isIOS){
		$.currentImage.top = 30;
	}
	$.currentImage.image = imagePath;
	$.currentImage.height = screenLeft - 80;
	$.currentImage.width = "auto";

}

function doSubmit(e)
{	
	//Submit result	
	service=require('VoteSession');	
	service.submitResult(Math.floor(Number($.slider.value)),commentText);
	//service.submitResult(photosView.currentPage,"");
    //alert("Result successfully submitted");
    
   
    //Go to wait page
	var win=Alloy.createController('wait').getView();
 	win.open();
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
			$.normalPage.remove(commentArea);
		});
		commentArea.addEventListener('return',function(e)
		{
			commentArea.blur();
		});
	$.normalPage.add(commentButton);
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
	resizePage();
});
	
$.normalPage.open();
