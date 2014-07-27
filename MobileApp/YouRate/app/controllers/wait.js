function loadImage(){
	//Make loading image move
	var number = 1;
	setInterval(function(){$.loadingImage.image=number+".png"; number++; if (number > 8){number=1;}},500);
	
	//Check if next image is ready	
	service=require('VoteSession');
	var image = service.getImage();
	
	setTimeout(function(){var win=Alloy.createController('vote').getView();
	 							win.open();},2000);
}

$.waitPage.open();
