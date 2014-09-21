var platformName = Ti.Platform.name;
var platformHeight = Ti.Platform.displayCaps.platformHeight;

exports.getWaitIndicator = function(message){
	var style = platformName === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG;
	
	var view = Ti.UI.createView({
		layout: 'vertical',
		top: platformHeight/2-60
		});
		
	var indicator = Ti.UI.createActivityIndicator({
	  style:style,
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE,
	});
	
	var label = Ti.UI.createLabel({
		text: message,
		font: {fontFamily:'Helvetica Neue', fontSize:26},
		color: 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	view.add(indicator);
	view.add(label);
	
	view.showIndicator = function(){
		Ti.API.info('show called');
		view.show();
		indicator.show();
	};
	view.hideIndicator = function(){
		Ti.API.info('hide called');
		indicator.hide();
		view.hide();
	};
	
	return view;
	
}; 