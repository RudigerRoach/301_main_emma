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
	imagePath = ospath+"kitty.jpg";
	photoPath = imagePath; //For yesNo winner events
	//alert("IMG path: "+imagePath);
	var sessionType = "normal";
	//var sessionType = "yesNo";
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
	var screenLeft = screenHeight;
	
	//If comments are enabled create comment box
	if(comments == "t")
	{				   
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
		    top: screenHeight - 90,
		    width: screenWidth - 20,
		    left: 10,
		    height: 40
		});	
	
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
			$.votePage.add(commentArea);
		});
		
		/*commentArea.addEventListener('blur',function(e)
		{
			$.votePage.remove(commentArea);
		});*/
			
		//$.votePage.add(commentArea);
		//$.votePage.add(commentLabel);
		$.votePage.add(commentButton);
		screenLeft = commentButton.top;
	}	
	
	//Display interface according to type of session
	//If normal event create a slider for scoring
	if(sessionType == "normal")
	{	    			
		var submitButton = Titanium.UI.createButton({
	   		title: 'Submit',
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
		    top: screenHeight - 70,
		    height: 50,
		    width: screenWidth - 20,
		    left: 10
		});	
		screenLeft = submitButton.top;		
		
	//If comments are enabled create comment box
	if(comments == "true")
	{				   
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
		    top: screenLeft - 60,
		    width: screenWidth - 20,
		    left: 10,
		    height: 40
		});	
	
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
			$.votePage.add(commentArea);
		});
		
		/*commentArea.addEventListener('blur',function(e)
		{
			$.votePage.remove(commentArea);
		});*/
			
		//$.votePage.add(commentArea);
		//$.votePage.add(commentLabel);
		$.votePage.add(commentButton);
		screenLeft = commentButton.top;
	}	
	
		commentButton.addEventListener('click',function(e)
		{	
			doSubmit();
		});	
			
		slider = Titanium.UI.createSlider(
		{
			top:screenLeft - 90,
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
			top: screenLeft - 50,
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
			top: screenLeft - 50,
			left: screenWidth/2 + 10,
		    width:50,
		    height:30,
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			}
		});
		screenLeft = slider.top;
	
		slider.addEventListener('change', function(e) 
		{
		    sliderArea.value = Math.floor(Number(slider.value));
		});
	
		sliderArea.addEventListener('change', function(e) 
		{
		    slider.value = sliderArea.value;
		});
		$.votePage.add(submitButton);
		$.votePage.add(slider);
		$.votePage.add(sliderLabel);
		$.votePage.add(sliderArea);
	}
	else if(sessionType == "yesNo")
	{
		//If comments are enabled create comment box
		if(comments == "true")
		{				   
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
			    top: screenLeft - 60,
			    width: screenWidth - 20,
			    left: 10,
			    height: 40
			});	
		
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
				$.votePage.add(commentArea);
			});
			
			/*commentArea.addEventListener('blur',function(e)
			{
				$.votePage.remove(commentArea);
			});*/
				
			//$.votePage.add(commentArea);
			//$.votePage.add(commentLabel);
			$.votePage.add(commentButton);
			screenLeft = commentButton.top;
		}	
	
		var yesButton = Titanium.UI.createButton(
		{		  
			title: "Yes", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "8",
			backgroundColor: "#197519",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
			top: screenLeft - 100,
		    width: screenWidth/2 - 20, 
		    height: "80",
		    right: 10,
		    //left: screenWidth/2 + 5,
		    padding:0,
		});
		
		var noButton = Titanium.UI.createButton(
		{		  
			title: "No", 
			borderWidth: "1",
			borderColor: "#bbb", 
			borderRadius: "8",
			backgroundColor: "#B80000",
		    color: "black", 
		    textAlign: "center",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			}, 
			top: screenLeft - 100,
		    width: screenWidth/2 - 20, 
		    height: "80",
		    left: 10,
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
		screenLeft = yesButton.top;
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
	$.currentImage.height = screenLeft - 80;
	$.currentImage.width = "auto";
}

//used in eventListener
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

Ti.Gesture.addEventListener('orientationchange', function(e){
 	var win=Alloy.createController('vote').getView();
	 	win.open();
 
    /*if (Titanium.UI.orientation === Ti.UI.LANDSCAPE_RIGHT || Titanium.UI.orientation === Ti.UI.LANDSCAPE_LEFT) 
    {
        // change UI for landscape layout
        alert("landscape " + e.orientation);
        fixPage();
    } else {
        // change UI for portrait layout
        alert("portrait " + e.orientation);
        fixPage();
    }   
    
//Ti.Gesture.addEventListener('orientationchange',function(e) {
    // get current device orientation from
    // Titanium.Gesture.orientation
 
    // get orientation from event object
    // from e.orientation
 
    // Ti.Gesture.orientation should match e.orientation
    // but iOS and Android will report different values
 
    // two helper methods return a Boolean
    // e.source.isPortrait()
    // e.source.isLandscape()
//});*/
});

$.votePage.open();