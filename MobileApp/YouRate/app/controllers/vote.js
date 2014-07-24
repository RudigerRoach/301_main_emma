function doLogout(e){
    var win=Alloy.createController('login').getView();
 	win.open();
};

$.slider.text = $.slider.value;
function updateLabel(e){
    $.sliderLabel.text = "Score: " + String.format("%3.1f", e.value);
}

$.votePage.open();