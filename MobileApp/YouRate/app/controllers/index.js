function displayLoginPage(e){
	//Call autoLogin
	
	//If autoLogin successful
    //var win=Alloy.createController('vote').getView();
 	//win.open();
	
	//If autoLogin not successful
    var win=Alloy.createController('login').getView();
 	win.open();
};

$.startPage.open();
