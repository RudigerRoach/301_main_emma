function loadnames(){
	$.row1.title = 'Set server Address (currently: '+Ti.App.Properties.getString('serverAddress')+')';
}
$.settingsPage.open();
var isIOS = require('ui').isIOS();

function setIP() {
	if (isIOS) {
		var dialog = Ti.UI.createAlertDialog({
			title : 'Set new address',
			style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames : ['OK', 'cancel']
		});
		dialog.addEventListener('click', function(e) {
			if (e.index != 1) {//if the button clicked whas not 'cancel'
				setAdress(e.text);
			}
		});
	} else {
		var textfield = Ti.UI.createTextField();
		var dialog = Ti.UI.createAlertDialog({
			title : 'Set new address',
			androidView : textfield,
			buttonNames : ['OK', 'cancel']
		});
		dialog.addEventListener('click', function(e) {
			if (e.index != 1) {//if the button clicked whas not 'cancel'
				setAdress(textfield.value);
			}
		});
	}
	dialog.show();

	function setAdress(newAddress) {
		Ti.App.Properties.setString('serverAddress', newAddress);
		$.row1.title = 'Set server Address (currently: '+Ti.App.Properties.getString('serverAddress')+')';
		//retrieve: var value = Ti.App.Properties.getString('key');
	}

}

function setCommentType() {

}
