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
exports.getWaitIndicator = function(labelId) {
	var style = platformName === 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG;

	var view = Ti.UI.createView({
		layout : 'vertical'
	});
	view.top = isPortrait ? platformHeight / 2 - 70 : platformHeight / 2 - 80;
	
	var indicator = Ti.UI.createActivityIndicator({
		style : style,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	var label = Ti.UI.createLabel({
		textid : labelId,
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 18
		},
		color : 'white',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	view.add(indicator);
	view.add(label);

	view.showIndicator = function() {
		view.show();
		indicator.show();
	};

	view.hideIndicator = function() {
		indicator.hide();
		view.hide();
	};

	return view;
};

exports.getCommentLabel = function(){
	label = Ti.UI.createLabel({
		textid : "commentB",
		color : 'black',
		font: {
			fontSize: 20,
			fontFamily: 'Helvetica Neue'
		},
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	return label;
};

exports.getCommentBox = function() {
	commentArea = Ti.UI.createTextArea({
			value : "",
			width : platformWidth - 40,
			left : 20,
			height : 50,
			borderRadius : "8",
		});
		return commentArea;
};

exports.getCommentButton = function() {
	var commentButton = Titanium.UI.createButton({
		titleid : 'commentB',
		borderWidth : "1",
		borderColor : "#bbb",
		borderRadius : "8",
		backgroundColor : "#bbb",
		color : "black",
		
		textAlign : "center",
		font : {
			fontSize : 24,
			fontFamily : 'Helvetica Neue'
		},
		width : platformWidth - 40,
		left : 20,
		height : 50
	});
	return commentButton;
};

exports.getCommentArea = function(){
	commentArea = Ti.UI.createTextArea({
			opacity : 50,
			value : "",
			top : 60,
			width : platformWidth - 40,
			left : 20,
			height : 200,
			color: "black",
			backgroundColor:"white",
			borderWidth:"2",
		    borderColor:"#bbb",
		    borderRadius:"5",
		    textAlign:"left",
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			}
		});
		return commentArea;
};
/*
 Device information
 */
exports.platformHeight = function() {
	return platformHeight;
};

exports.platformWidth = function() {
	return platformWidth;
};

exports.isIOS = function() {
	return isIOS;
};

exports.isPortrait = function() {
	return isPortrait;
};
