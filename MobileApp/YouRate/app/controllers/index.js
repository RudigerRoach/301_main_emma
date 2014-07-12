function displayLoginPage(e){
	//Call autoLogin
	
	//If autoLogin successfull
    //var win=Alloy.createController('vote').getView();
 	//win.open();
	
	//If autoLogin not successfull
    var win=Alloy.createController('login').getView();
 	win.open();
};

$.startPage.open();
