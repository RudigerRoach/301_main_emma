var commentArea = "";
var photoPath = "";
var slider;
var ospath = "";
	if(OS_ANDROID){
		ospath = "/images/";
	}else if(OS_IOS){
		ospath = "";
	}	
	
$.votePage.backgroundImage = ospath+"bg.jpg";

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;
if(OS_ANDROID){
		screenHeight -= 90;
}
var screenLeft = screenHeight;
	
var chosen = 0;	
var photosView;
var rangeBottom = 0;
var rangeTop = 50;
var description = "Image title"; 
var displayTitle = "true";
var comments = "true"; 
var imagePath = ospath+"placeholder.png";
//imagePath = ospath+"animalLandscape.jpg";
//imagePath = ospath+"kitty.jpg";
photoPath = imagePath; //For yesNo winner events
//alert("IMG path: "+imagePath);
//var sessionType = "normal";
//var sessionType = "yesNo";
var sessionType = "winner";
	
function fixPage()
{
	//For offline testing
	service=require('VoteSession');	
	
	//Server calls
	/*rangeBottom = service.rangeBottom();
	rangeTop = service.rangeTop();
	description = service.description(); 
	comments = service.commentsEnabled();
	imagePath = service.imagePath();
	sessionType = service.sessionType();*/
	
	//Display interface according to type of session
	if(sessionType == "normal")
	{	    			
		createSubmitButton();	
		
		if(comments == "true")
		{				   
			commentsEnabled();   
		}		
			
		createSlider();	
	}
	else if(sessionType == "yesNo")
	{
		createSubmitButton();
		
		if(comments == "true")
		{				   
		   commentsEnabled();
		}	
	
		createYesNoButtons();
	}
	else if(sessionType == "winner")
	{
		createWinnerButton();
		$.votePage.remove($.currentImage);
		addScrollableImage();
	}
		
	//Change image to path received from server	
	//Try portrait image	
	if(OS_ANDROID){
		$.currentImage.top -= 30;
	}
	$.currentImage.image = imagePath;
	$.currentImage.height = screenLeft - 80;
	$.currentImage.width = "auto";
}

//used in eventListener
function doSubmit(e)
{	
	//Submit result	
	service=require('VoteSession');	
	if(sessionType == "normal")
	{
		//alert(photoPath + "," + slider.value + "," + commentArea.value);
		if(comments == "true")
		{
			service.submitResult(Math.floor(Number(slider.value)),commentArea.value);	
		}	
		else
		{
			service.submitResult(Math.floor(Number(slider.value)),"");
		}
	}	
	if(sessionType == "yesNo")
	{
		if(comments == "true")
		{
			service.submitResult(chosen,commentArea.value);	
		}	
		else
		{
			service.submitResult(chosen,"");
		}
	}
	if(sessionType == "winner")
	{
		service.submitResult(photosView.currentPage,"");
	}
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

function createSubmitButton()
{				
	var submitButton = Titanium.UI.createButton({
		titleid: 'submitB',
	   	//title: 'Submit',
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
		width: screenWidth - 40,
		left: 20
	});	
	screenLeft = submitButton.top;
	
	submitButton.addEventListener('click',function(e)
	{
		doSubmit(e);
	});	
	$.votePage.add(submitButton);
}

function commentsEnabled()
{
	var commentButton = Titanium.UI.createButton({
	titleid: 'commentB',
   		//title: 'Add comment',
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
			$.votePage.remove(commentArea);
		});
		$.votePage.add(commentArea);
	});
		
	$.votePage.add(commentButton);
	screenLeft = commentButton.top;
}

function createSlider()
{
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
	titleid: 'SliderT',
	    //text: "Score: ",
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
	$.votePage.add(slider);
	$.votePage.add(sliderLabel);
	$.votePage.add(sliderArea);		
}

function createYesNoButtons()
{
	var yesButton = Titanium.UI.createButton(
	{		  
		titleid: 'yesB',
		//title: "Yes", 
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
	    width: screenWidth/2 - 30, 
	    height: "80",
	    right: 20,
	    //left: screenWidth/2 + 5,
	    padding:0,
	});
	
	var noButton = Titanium.UI.createButton(
	{		  
		titleid: 'noB',
		//title: "No", 
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
	    width: screenWidth/2 - 30, 
	    height: "80",
	    left: 20,
	    //right: screenWidth/2 + 5,
	    padding:0,
	});
	
	yesButton.addEventListener('click',function(e)
	{
	   	yesButton.opacity = 1;
		noButton.opacity = 0.5;
		chosen = 1;
	});
	$.votePage.add(yesButton);
	noButton.addEventListener('click',function(e)
	{
	   	yesButton.opacity = 0.5;
		noButton.opacity = 1;	
		chosen = 0;	   
	});
	$.votePage.add(noButton);
	screenLeft = yesButton.top;
}

function createWinnerButton()
{	
	var winnerButton = Titanium.UI.createButton(
	{		  
		titleid: 'winnerB',
		//title: "Winner", 
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
	    left:20,
	    width: screenWidth - 40, 
	    height: "80",
	    padding: 0
	});
	winnerButton.addEventListener('click',function(e)
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
	$.votePage.add(winnerButton);
	screenLeft = winnerButton.top;
}

function addScrollableImage()
{
	var img1 = Ti.UI.createImageView({
    image:"whiteLabrador.jpg",
	  height: screenLeft - 80,
	  width: "auto"
	});
	var img1Wrapper = Ti.UI.createScrollView({
	    maxZoomScale:4.0
	});
	img1Wrapper.add(img1);
	
	var img2 = Ti.UI.createImageView({
	    image:"brownLabrador.jpg",
		  height: screenLeft - 80,
		  width: "auto"
	});
	var img2Wrapper = Ti.UI.createScrollView({
	    maxZoomScale:4.0
	});
	img2Wrapper.add(img2);
	photosView = Ti.UI.createScrollableView({
	    showPagingControl:true,
	    views:[img1Wrapper, img2Wrapper],
		  height: screenLeft - 80,
		  width: "auto",
		  top: 50
	});
	alert(photosView.currentPage);
	$.votePage.add(photosView);
}

$.votePage.open();