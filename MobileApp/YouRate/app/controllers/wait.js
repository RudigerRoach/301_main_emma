function loadImage(){
	//Make loading image move
	var number = 1;
	setInterval(function(){$.loadingImage.image=number+".png"; number++; if (number > 8){number=1;}},500);
	
	//Check if next image is ready	
	service=require('VoteSession');
	
	do
	{
		service.getImage();
		while(service.getImgDone() == false){ }; //And server reachable!!!!!! Infinite loop...
	}
	while (service.status() == "0"); //And server reachable!!!!!! Infinite loop... 
	
	var rangeBottom = service.rangeBottom();
	var rangeTop = service.rangeTop();
	var description = service.description();
	var comments = service.comments();
	var imagePath = service.imagePath();
	var sessionType = service.sessionType();
	
	//setTimeout(function(){var win=Alloy.createController('vote').getView();
	 							//win.open();},2000);
}

$.waitPage.open();
