var win = Ti.UI.createWindow({
  backgroundColor: '#DFE4E7',
  exitOnClose: true,
  fullscreen:true
});

var image = Ti.UI.createImageView({
  	image:'1.png',
    top: "150", 
    width: "100", 
    height: "100"
});

var label1 = Ti.UI.createLabel({
	width: "200",
	height: "500",
	color: "black",
	top: "50",
	font: {
		fontSize: 20,
		fontFamily: 'Helvetica Neue'
	},
	textAlign: 'center',
	text: 'Waiting for all scores'
});

win.add(image);
win.add(label1);
win.open();
