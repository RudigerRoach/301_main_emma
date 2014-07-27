function fixPage()
{
	//If normal event create a slider for scoring
	//service=require('VoteSession');
	//if(service.sessionType() == "normal")
	//{
		var slider = Titanium.UI.createSlider(
		{
			top:"260",
			color: "black",
			min:"0",
			max:"100",
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
	//}
	
	//If comments are enabled create comment box
	//if(service.commentsEnabled() == "true")
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