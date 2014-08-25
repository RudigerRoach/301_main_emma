require("/tijasmine/tijasmine").infect(this);

describe("VoteSession start of session test", function() {

	var voteSession = require('VoteSession');
	var goodTime = 10000;
	//The network call should exicute within 10 seconds
	it("service status", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.status()).toBe("1"); //doResults(service);// 
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("session type", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.sessionType()).toBe("normal");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("image path", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.imagePath()).toBe("testPath");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("range bottom", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.rangeBottom()).toBe("0");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("range top", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.rangeBottom()).toBe("15");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("description", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.description()).toBe("testDetails");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("comments enables", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.commentsEnabled()).toBe(true);
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
});

describe("Next image request tests", function() {

	var voteSession = require('VoteSession');
	var goodTime = 10000;
	//The network call should exicute within 10 seconds
	it("service status", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.status()).toBe("1"); //doResults(service);// 
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("session type", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.sessionType()).toBe("normal");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("image path", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.imagePath()).toBe("testPath");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
	
	it("description", function() {
		function testStatus(service) {
			var done = false;
			var timer = setInterval(function() {
				done = service.getImgDone();
				if (done) {
					expect(service.description()).toBe("testDetails");
					clearInterval(timer);
				}
			}, goodTime);
		}
		voteSession.getImage();
		testStatus(voteSession);
	});
});
