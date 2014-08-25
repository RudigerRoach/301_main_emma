require("/tijasmine/tijasmine").infect(this);

describe("VoteSession tests", function() {

	var voteSession = require('VoteSession');
	var goodTime = 10000;
	//The network call should exicute within 10 seconds

	describe("Start of session test", function() {
		
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					doResults(service);
					clearInterval(timer);
				}
			}, goodTime);
		}
		function doResults(service){
			it("login status", function() {
				expect(service.status()).toBe(1);
			});
			
		}
		
		voteSession.getImage();
		testStatus(voteSession);
				
	});

}); 