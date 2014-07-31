function fixPage()
{
	//If normal event create a slider for scoring
	service=require('VoteSession');	
	var rangeBottom = 0;
	//rangeBottom = service.rangeBottom();
	var rangeTop = 100;
	//rangeTop = service.rangeTop();
	var description = "My description";
	//description = service.description();  
	var comments = true; 
	//comments = service.commentsEnabled();
	var imagePath = "brownLabrador.jpg";
	//imagePath = service.imagePath();
	var sessionType = "default";
	//sessionType = service.sessionType();
		
	/*var im = Ti.UI.createImageView(
	{
		top: 50,
	    width: "200", 
	    height: "200",
	    image: imagePath
	});*/
	$.currentImage.image = "whiteLabrador.jpg";
	
	//if(sessionType == "normal" || sessionType == "default")
	//{
		var slider = Titanium.UI.createSlider(
		{
			top:"260",
			color: "black",
			min:rangeBottom,
			max:rangeTop,
			width:"300",
			value:"50"
	    });
	    
		var sliderLabel = Ti.UI.createLabel(
		{
		    text: "Score: " + slider.value,
			width: "200",
			height: "50",
			color: "black",
			top: "280",
			font: { 
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			},
			textAlign: 'center',
			shadowColor: "#aaa"
	    });
	
		slider.addEventListener('change', function(e) 
		{
		    sliderLabel.text = "Score: " + String.format("%3.0f", e.value);
		});
		$.votePage.add(slider);
		$.votePage.add(sliderLabel);
		
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
	/*}
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
		    top: "255", 
		    width: "170", 
		    height: "30"
		});
		yesButton.addEventListener('click',function(e)
		{
		   doSubmit();
		});
		$.votePage.add(yesButton);
		
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
		    top: "290", 
		    width: "170", 
		    height: "30"
		});
		noButton.addEventListener('click',function(e)
		{
		   
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
		    top: "275", 
		    width: "170", 
		    height: "30"
		});
		winnerButton.addEventListener('click',function(e)
		{
		   doSubmit();
		});
		$.votePage.add(winnerButton);
	}*/
		
	//If comments are enabled create comment box
	//if(comments == "true")
	//{		
		var commentArea = Ti.UI.createTextArea(
		{
	  		borderWidth:"2",
		    borderColor:"#bbb",
		    borderRadius:"5",
		    color:"#888",
		    textAlign:"left",
		    value:"",
		    top:"350",
		    width:"300",
		    height:"70",
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
			top: "310",
			font: {
				fontSize: 24,
				fontFamily: 'Helvetica Neue'
			},
			textAlign: 'center'
	    });
	
		$.votePage.add(commentArea);
		$.votePage.add(commentLabel);
	//}
}

function doSubmit(e){
	//Submit score
    alert("Score successfully submitted");
};

$.votePage.open();