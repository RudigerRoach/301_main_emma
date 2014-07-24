function doSubmit(e){
	//Submit score
    alert("Score successfully submitted");
};

$.slider.text = $.slider.value;
function updateLabel(e){
    $.sliderLabel.text = "Score: " + String.format("%3.0f", e.value);
}

$.votePage.open();