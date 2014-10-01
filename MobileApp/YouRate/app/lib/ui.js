var platformName = Ti.Platform.name;
var platformHeight = Ti.Platform.displayCaps.platformHeight;
var platformWidth = Ti.Platform.displayCaps.platformWidth;
var isIOS = OS_IOS;
var isPortrait = platformHeight > platformWidth ? true : false;

/*
Helper variables
*/
var indicatorRunning = false;

Ti.Gesture.addEventListener('orientationchange', function(e) {
 	platformHeight = Ti.Platform.displayCaps.platformHeight;
	platformWidth = Ti.Platform.displayCaps.platformWidth;
	isPortrait = e.source.isPortrait();
});

/*
 UI artifacts
 */
exports.getWaitIndicator = function(message){
	var style = platformName === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG;
	
	var view = Ti.UI.createView({
		layout: 'vertical',
	});
	view.top = isPortrait ? platformHeight/2-60 : platformHeight/2-70;
	
	var indicator = Ti.UI.createActivityIndicator({
	  style:style,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	
	var label = Ti.UI.createLabel({
		text: message,
		font: {fontFamily:'Helvetica Neue', fontSize:18},
		color: 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	view.add(indicator);
	view.add(label);
	
	view.showIndicator = function(){
		view.show();
		indicator.show();
	};
	
	view.hideIndicator = function(){
		indicator.hide();
		view.hide();
	};

	return view;
}; 

/*
 Device information
 */
exports.platformHeight = function(){
	return platformHeight;
};

exports.platformWidth = function(){
	return platformWidth;
};

exports.isIOS = function(){
	return isIOS;
};

exports.isPortrait = function(){
	return isPortrait;
};
