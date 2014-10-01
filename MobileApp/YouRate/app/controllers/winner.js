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
	//alert(photosView.currentPage);
	$.winnerPage.add(photosView);
}
	
$.winnerPage.open();