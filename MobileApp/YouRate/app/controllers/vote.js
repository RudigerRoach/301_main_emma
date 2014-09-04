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
	//For offline testing
	service=require('VoteSession');	
	
	var rangeBottom = 0;
	var rangeTop = 50;
	var description = "Image title"; 
	var displayTitle = "true";
	var comments = "true"; 
	var imagePath = ospath+"placeholder.png";
	//imagePath = ospath+"animalLandscape.jpg";
	imagePath = ospath+"portrait.jpg";
	photoPath = imagePath; //For yesNo winner events
	//alert("IMG path: "+imagePath);
	//var sessionType = "normal";
	var sessionType = "yesNo";
	//var sessionType = "winner";
	
	//Server calls
	/*rangeBottom = service.rangeBottom();
	rangeTop = service.rangeTop();
	description = service.description(); 
	comments = service.commentsEnabled();
	imagePath = service.imagePath();
	sessionType = service.sessionType();*/
	
	var screenWidth = Ti.Platform.displayCaps.platformWidth;
	var screenHeight = Ti.Platform.displayCaps.platformHeight;
	
	//Submit button position
	$.submit.top = screenHeight - 70;
	$.submit.height = 50;
	$.submit.width = screenWidth - 40;
	$.submit.left = 20;
	var sizeLeft = $.submit.top;
	
	//If comments are enabled create comment box
	if(comments == "true")
	{			    
	    /*var commentLabel = Ti.UI.createLabel(
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
	    });*/
	   
	   var commentButton = Titanium.UI.createButton({
	   		title: 'Add comment',
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
		    top: sizeLeft - 60,
		    width: screenWidth - 40,
		    left: 20,
		    height: 40
		});
	
		//$.votePage.add(commentArea);
		//$.votePage.add(commentLabel);
		$.votePage.add(commentButton);
		sizeLeft = commentButton.top;
	}	
	
	//Display interface according to type of session
	//If normal event create a slider for scoring
	if(sessionType == "normal")
	{	    				
		slider = Titanium.UI.createSlider(
		{
			top:sizeLeft - 90,
			color: "black",
			min:rangeBottom,
			max:rangeTop,
			width:screenWidth - 40,
			left:20,
			value:(rangeBottom+rangeTop)/2
	    });
	    
		var sliderLabel = Ti.UI.createLabel(
		{
		    text: "Score: ",
			width: "150",
			height: "30",
			color: "black",
			top: sizeLeft - 50,
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
			top: sizeLeft - 50,
			left: screenWidth/2 + 10,
		    width:50,
		    height:30,
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			}
		});
		sizeLeft = slider.top;
	
		slider.addEventListener('change', function(e) 
		{
		    sliderArea.value = Math.floor(Number(slider.value));
		});
	
		sliderArea.addEventListener('change', function(e) 
		{
		    slider.value = sliderArea.value;
		});
		
		$.votePage.add(slider);
		$.votePage.add(sliderLabel);
		$.votePage.add(sliderArea);
	}
	else if(sessionType == "yesNo")
	{
		var yesButton = Titanium.UI.createButton(
		{		  
			title: "Yes", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "8",
			backgroundColor: "green",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
			top: sizeLeft - 70,
		    width: screenWidth/2 - 30, 
		    height: "50",
		    right: 20,
		    //left: screenWidth/2 + 5,
		    padding:0,
		});
		
		var noButton = Titanium.UI.createButton(
		{		  
			title: "No", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "8",
			backgroundColor: "red",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
			top: sizeLeft - 70,
		    width: screenWidth/2 - 30, 
		    height: "50",
		    left: 20,
		    //right: screenWidth/2 + 5,
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
		sizeLeft = yesButton.top;
	}
	else if(sessionType == "winner")
	{
		var winnerButton = Titanium.UI.createButton(
		{		  
			title: "Winner", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "8", 
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
		
	//Change image to path received from server	
	//Try portrait image	
	$.currentImage.image = imagePath;
	$.currentImage.height = sizeLeft - 80;
	$.currentImage.width = "auto";
}

function doSubmit(e){
	//Submit result	
	service=require('VoteSession');	
	//alert(photoPath + "," + slider.value + "," + commentArea.value);
	service.submitResult(Math.floor(Number(slider.value)),commentArea.value);	
    //alert("Result successfully submitted");
    
    //Go to wait page
	var win=Alloy.createController('wait').getView();
 	win.open();
};

$.votePage.open();