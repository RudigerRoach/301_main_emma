$.settingsPage.open();

var isIOS = require('ui').isIOS();

function closePage() {
	$.settingsPage.close();
}

function loadnames() {
	$.adrHint.text = '(Currently: ' + Ti.App.Properties.getString('serverAddress') + ')';
	$.comHint.text = '(Currently: ' + Ti.App.Properties.getString('commentEntry') + ')';
}

function setIP() {
	if (isIOS) {
		var dialog = Ti.UI.createAlertDialog({
			titleid : 'newAddress',
			value : Ti.App.Properties.getString('serverAddress'),
			style : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			buttonNames : [L('ok'), L('cancel')]
		});
		dialog.addEventListener('click', function(e) {
			if (e.index != 1) {//If the button clicked was not 'cancel'
				setAdress(e.text);
			}
		});
	} else {
		var textfield = Ti.UI.createTextField();
		var dialog = Ti.UI.createAlertDialog({
			titleid : 'newAddress',
			value : Ti.App.Properties.getString('serverAddress'),
			androidView : textfield,
			buttonNames : [L('confirm'), L('cancel')]
		});
		dialog.addEventListener('click', function(e) {
			if (e.index != 1) {//If the button clicked was not 'cancel'
				setAdress(textfield.value);
			}
		});
	}
	dialog.show();

	function setAdress(newAddress) {
		Ti.App.Properties.setString('serverAddress', newAddress);
		$.adrHint.text = '(Currently: ' + Ti.App.Properties.getString('serverAddress') + ')';
	}

}

function setCommentType() {
	if (isIOS) {
		var dialog = Ti.UI.createAlertDialog({
			titleid : 'entryMethod',
			style : Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
			buttonNames : [L('btn'), L('txt'), L('cancel')]
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {//If the button clicked was 'Show button'
				setType('button');
			} else if (e.index == 1) {
				setType('textbox');
			}
		});
	} else {
		var textfield = Ti.UI.createTextField();
		var dialog = Ti.UI.createAlertDialog({
			titleid : 'entryMethod',
			buttonNames : [L('btn'), L('txt'), L('cancel')]
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {//If the button clicked was 'Show button'
				setType('button');
			} else if (e.index == 1) {
				setType('textbox');
			}
		});
	}
	dialog.show();

	function setType(newType) {
		Ti.App.Properties.setString('commentEntry', newType);
		$.comHint.text = '(Currently: ' + Ti.App.Properties.getString('commentEntry') + ')';
	}

}
