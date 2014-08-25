require("/tijasmine/tijasmine").infect(this);

describe("Authentication tests", function() {

	var auth = require('Authentication');
	var goodTime = 10000; //The network call should exicute within 10 seconds
	
	it("login with correct cridentials", function() {
		function goForward(service){
			var success = service.loginStatus();
			expect(success).toBe(true);
		}
		
		function testStatus(service){
				var done = false;
				var timer = setInterval(function(){
				    done = service.autologinDone();
				    if (done) {
				    	goForward(service);
				        clearInterval(timer);
				    }
				}, goodTime);
		}
		auth.login("login@unitTest.com");
		testStatus(auth);
	});
	
	it("login with incorrect cridentials", function() {
		function goForward(service){
			var success = service.loginStatus();
			expect(success).toBe(false);
		}
		
		function testStatus(service){
				var done = false;
				var timer = setInterval(function(){
				    done = service.autologinDone();
				    if (done) {
				    	goForward(service);
				        clearInterval(timer);
				    }
				}, goodTime);
		}
		auth.login("unknown@address.com");
		testStatus(auth);
	});
	
	it("autologin with iphone retina 3.5in", function() {
		function goForward(service){
			var success = service.loginStatus();
			expect(success).toBe(true);
		}
		
		function testStatus(service){
				var done = false;
				var timer = setInterval(function(){
				    done = service.autologinDone();
				    if (done) {
				    	goForward(service);
				        clearInterval(timer);
				    }
				}, goodTime);
		}
		auth.autoLogin();
		testStatus(auth);
	});
	
	/*
	it("autoLogin", function() {
		expect(auth.autoLogin()).toBe(true);
		
	});*/
  
});
