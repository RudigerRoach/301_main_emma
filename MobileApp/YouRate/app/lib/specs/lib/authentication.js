require("/tijasmine/tijasmine").infect(this);

describe("Authentication tests", function() {
	
	var auth = require('Authentication');
	it("login", function() {
		var status = auth.login('test@mail.com');
		expect(status).toBe(true);
	});
  
  it("autoLogin", function() {
    expect(auth.autoLogin()).toBe(true);
  });
  
});

