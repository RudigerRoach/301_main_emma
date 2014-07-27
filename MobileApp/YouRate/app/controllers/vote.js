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
	    
		var label = Ti.UI.createLabel(
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
		    label.text = "Score: " + String.format("%3.0f", e.value);
		});
		$.votePage.add(slider);
		$.votePage.add(label);
	//}
}

function doSubmit(e){
	//Submit score
    alert("Score successfully submitted");
};

$.votePage.open();