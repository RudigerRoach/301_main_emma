$.settingsPage.open();

var isIOS = require('ui').isIOS();

function closePage() {
	$.settingsPage.close();
}

function loadnames() {
	//$.row1.title = 'Set server Address (currently: '+Ti.App.Properties.getString('serverAddress')+')';
	$.adrHint.text = '(Currently: ' + Ti.App.Properties.getString('serverAddress') + ')';
	$.comHint.text = '(Currently: ' + Ti.App.Properties.getString('commentEntry') + ')';
}

function setIP() {
	if (isIOS) {
		var dialog = Ti.UI.createAlertDialog({
			title : 'Set new address',
			value : Ti.App.Properties.getString('serverAddress'),
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
			value : Ti.App.Properties.getString('serverAddress'),
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
		$.adrHint.text = '(Currently: ' + Ti.App.Properties.getString('serverAddress') + ')';
		//retrieve: var value = Ti.App.Properties.getString('key');
	}

}

function setCommentType() {
	if (isIOS) {
		var dialog = Ti.UI.createAlertDialog({
			title : 'Set comment entry method',
			style : Ti.UI.iPhone.AlertDialogStyle.DEFAULT,
			buttonNames : ['Show button', 'Show text box', 'Cancel']
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {//if the button clicked whas 'Show button'
				setType('button');
			} else if (e.index == 1) {
				setType('textbox');
			}
		});
	} else {
		var textfield = Ti.UI.createTextField();
		var dialog = Ti.UI.createAlertDialog({
			title : 'Set comment entry method',
			buttonNames : ['Show button', 'Show text box', 'Cancel']
		});
		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {//if the button clicked whas 'Show button'
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
