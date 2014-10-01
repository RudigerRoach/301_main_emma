var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "";
	}	

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;
if(OS_ANDROID){
		screenHeight -= 90;
}

var screenLeft = screenHeight;
var commentText = "";	
var rangeBottom = 0;
var rangeTop = 50;
var description = "Image title"; 
var displayTitle = "true";
var comments = "true"; 
var imagePath = ospath+"placeholder.png";
//imagePath = ospath+"animalLandscape.jpg";
imagePath = ospath+"kitty.jpg";
photoPath = imagePath; //For yesNo winner events
//alert("IMG path: "+imagePath);
//var sessionType = "normal";
var sessionType = "yesNo";
//var sessionType = "winner";
	service=require('VoteSession');	
	
	//Server calls
	/*rangeBottom = service.rangeBottom();
	rangeTop = service.rangeTop();
	description = service.description(); 
	comments = service.commentsEnabled();
	imagePath = service.imagePath();
	sessionType = service.sessionType();*/	
	
	if(comments == "true")
	{
		commentsEnabled();
	}

function resizePage()
{
	$.submitButton.top = screenHeight - 70;
	$.submitButton.width = screenWidth - 40;	
	screenLeft = $.submitButton.top;
	
	if(comments == "true")
	{
		commentButton.top = screenLeft - 60;
	    commentButton.width = screenWidth - 40;
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
	
	if(OS_ANDROID){
		$.currentImage.top -= 30;
	}
	$.currentImage.image = imagePath;
	$.currentImage.height = screenLeft - 80;
	$.currentImage.width = "auto";

	$.slider.addEventListener('change', function(e) 
	{
	    $.sliderArea.value = Math.floor(Number($.slider.value));
	});

	$.sliderArea.addEventListener('change', function(e) 
	{
	    $.slider.value = $.sliderArea.value;
	});
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

function commentsEnabled()
{
	var commentButton = Titanium.UI.createButton({
		titleid: 'commentB',
		borderWidth: "1",
		borderColor: "#bbb", 
		borderRadius: "8",
		backgroundColor: "#bbb",
		//backgroundColor: "#E5E5E9",
		color: "black", 
		textAlign: "center",
		font: {
			fontSize: 24,
			fontFamily: 'Helvetica Neue'
		},
	    top: screenLeft - 60,
	    width: screenWidth - 40,
	    left: 20,
	    height: 40
	});	
	
	screenLeft = commentButton.top;

	commentButton.addEventListener('click',function(e)
	{		   
		commentArea = Ti.UI.createTextArea(
		{
	  		borderWidth:"2",
		    borderColor:"#bbb",
		    borderRadius:"5",
		    color:"black",			    
		    opacity: 70,
		    textAlign:"left",
		    value:"",
		    top:60,
		    width:screenWidth - 40,
		    left:20,
		    height:200,
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			}
		});
	
		commentArea.addEventListener('blur',function(e)
		{
			commentText = commentArea.value;
			$.normalPage.remove(commentArea);
		});
		$.normalPage.add(commentArea);
	});
		
	$.normalPage.add(commentButton);
	screenLeft = commentButton.top;
}

Ti.Gesture.addEventListener('orientationchange', function(e) {
 	screenHeight = ui.platformHeight();
	screenWidth = ui.platformWidth();
	resizePage();
});
	
$.normalPage.open();