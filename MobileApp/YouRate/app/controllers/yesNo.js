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
var chosen = -1;	
var rangeBottom = 0;
var rangeTop = 50;
var description = "Image title"; 
var displayTitle = "true";
var comments = "false"; 
var imagePath = ospath+"placeholder.png";
//imagePath = ospath+"animalLandscape.jpg";
imagePath = ospath+"kitty.jpg";
photoPath = imagePath; //For yesNo winner events
//alert("IMG path: "+imagePath);
//var sessionType = "yesNo";
var sessionType = "yesNo";
//var sessionType = "winner";
	service=require('VoteSession');	
	
	//Server calls
	rangeBottom = service.rangeBottom();
	rangeTop = service.rangeTop();
	description = service.description(); 
	comments = service.commentsEnabled();
	imagePath = service.imagePath();
	sessionType = service.sessionType();		
	
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
	
	$.yesButton.top = screenLeft - 100;
	$.yesButton.width = screenWidth/2 - 30;
	
	$.noButton.top = screenLeft - 100;
	$.noButton.width = screenWidth/2 - 30;
	
	screenLeft = $.yesButton.top;
	
	if(OS_ANDROID){
		$.currentImage.top -= 30;
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
			$.yesNoPage.remove(commentArea);
		});
		$.yesNoPage.add(commentArea);
	});
		
	$.yesNoPage.add(commentButton);
	screenLeft = commentButton.top;
}
	
$.yesNoPage.open();