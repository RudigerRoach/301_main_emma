require("/tijasmine/tijasmine").infect(this);

describe("Authentication tests", function() {
    var auth = require("Authentication");
    it("login", function() {
        expect(auth.login("test@mail.com")).toBe(true);
    });
    it("autoLogin", function() {
        expect(auth.autoLogin()).toBe(true);
    });
});