var commentArea = "";
var photoPath = "";
var slider;
var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "";
	}
function fixPage()
{
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	//alert(screenWidth);
	//alert(screenHeight);
	//Ti.App.SCREEN_WIDTH = (pWidth > pHeight) ? pHeight : pWidth;
	//Ti.App.SCREEN_HEIGHT = (pWidth > pHeight) ? pWidth : pHeight;
	//For offline testing
	service=require('VoteSession');	
	
	var rangeBottom = 0;
	var rangeTop = 50;
	var description = "My description"; 
	var comments = "true"; 

	var imagePath = ospath+"placeholder.png";

	//var imagePath = "portrait.jpg";
	photoPath = imagePath; //For yesNo winner events
	//alert("IMG path: "+imagePath);
	var sessionType = "yesNo";
	
	rangeBottom = service.rangeBottom();
	rangeTop = service.rangeTop();
	description = service.description(); 
	comments = service.commentsEnabled();
	imagePath = service.imagePath();
	sessionType = service.sessionType();
		
	//Change image to path received from server	
	//Try portrait image
	$.currentImage.height = screenHeight/2 - 50;
	$.currentImage.width = "auto";
	
	//Landscape image
	if($.currentImage.height < $.currentImage.width)
	{		
		$.currentImage.width = screenWidth;
		$.currentImage.height = "auto";
		$.currentImage.left = "auto";
		$.currentImage.right = "auto";
		$.currentImage.top = ((screenHeight/2 - 50) - $.currentImage.height)/2;
	}
	
	$.currentImage.image = imagePath;
	
	//Display interface according to type of session
	//If normal event create a slider for scoring
	if(sessionType == "normal" || sessionType == "default") //Default for offline testing purposes, to be taken out
	{
		slider = Titanium.UI.createSlider(
		{
			top:screenHeight/2 + 5,
			color: "black",
			min:rangeBottom,
			max:rangeTop,
			width:screenWidth - 100,
			left:50,
			value:(rangeBottom+rangeTop)/2
	    });
	    
		var sliderLabel = Ti.UI.createLabel(
		{
		    text: "Score: ",
			width: "150",
			height: "50",
			color: "black",
			top: screenHeight/2 + 20,
			left: screenWidth/2 - 100,
			font: { 
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			},
			textAlign: 'center',
			shadowColor: "#aaa"
	    });	
	    
		sliderArea = Ti.UI.createTextArea(
		{
	  		borderWidth:"2",
		    borderColor:"#bbb",
		    borderRadius:"5",
		    color:"#888",
		    textAlign:"left",
		    value:slider.value,
		    top: screenHeight/2 + 30,
			left: screenWidth/2 + 50,
		    width:50,
		    height:30,
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			}
		});
	
		slider.addEventListener('change', function(e) 
		{
		    sliderArea.value = String.format("%3.0f", e.value);
		});
	
		sliderArea.addEventListener('change', function(e) 
		{
		    slider.value = sliderArea.value;
		});
		
		$.votePage.add(slider);
		$.votePage.add(sliderLabel);
		$.votePage.add(sliderArea);
		
		/*var submitButton = Titanium.UI.createButton(
		{		   
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "5",
			backgroundColor: "#bbb",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
		    top: "430", 
		    width: "170", 
		    height: "35"
		});
		submitButton.addEventListener('click',function(e)
		{
		   doSubmit();
		});
		$.votePage.add(submitButton);*/
	}
	else if(sessionType == "yesNo")
	{
		var yesButton = Titanium.UI.createButton(
		{		  
			title: "Yes", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "5",
			backgroundColor: "#bbb",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
		    top: screenHeight/2 + 15, 
		    width: screenWidth/2 + 10, 
		    height: "40",
		    left: screenWidth/2 + 5,
		    padding:0,
		});
		
		var noButton = Titanium.UI.createButton(
		{		  
			title: "No", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "5",
			backgroundColor: "#bbb",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
		    top: screenHeight/2 + 15, 
		    width: screenWidth/2 + 10, 
		    height: "40",
		    right: screenWidth/2 + 5,
		    padding:0,
		});
		
		yesButton.addEventListener('click',function(e)
		{
		   	yesButton.opacity = 1;
			noButton.opacity = 0.5;
		   //doSubmit();
		});
		$.votePage.add(yesButton);
		noButton.addEventListener('click',function(e)
		{
		   	yesButton.opacity = 0.5;
			noButton.opacity = 1;		   
		});
		$.votePage.add(noButton);
	}
	else if(sessionType == "winner")
	{
		var winnerButton = Titanium.UI.createButton(
		{		  
			title: "Winner", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "5", 
			backgroundColor: "#bbb",
		    color: "black",  
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
		    top: screenHeight/2 + 15, 
		    width: "auto", 
		    height: "40"
		});
		winnerButton.addEventListener('click',function(e)
		{
		   doSubmit();
		});
		$.votePage.add(winnerButton);
	}
		
	//If comments are enabled create comment box
	if(comments == "true")
	{		
		commentArea = Ti.UI.createTextArea(
		{
	  		borderWidth:"2",
		    borderColor:"#bbb",
		    borderRadius:"5",
		    color:"#888",
		    textAlign:"left",
		    value:"",
		    top: screenHeight/2 + 95,
		    width:screenWidth + 10,
		    height:screenHeight/2 - 160,
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			}
		});
	    
		var commentLabel = Ti.UI.createLabel(
		{
			text: "Comments:",
			width: "200",
			height: "50",
			color: "black",
			top: screenHeight/2 + 55,
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			},
			textAlign: 'center'
	    });
	
		$.votePage.add(commentArea);
		$.votePage.add(commentLabel);
	}
	$.submit.top = screenHeight - 50;
	$.submit.width = screenWidth + 10;
}

function doSubmit(e){
	//Submit result	
	service=require('VoteSession');	
	//alert(photoPath + "," + slider.value + "," + commentArea.value);
	service.submitResult(String.format("%3.0f", slider.value),commentArea.value);	
    //alert("Result successfully submitted");
    
    //Go to wait page
	var win=Alloy.createController('wait').getView();
 	win.open();
};

$.votePage.open();