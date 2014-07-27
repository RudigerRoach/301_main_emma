require("/tijasmine/tijasmine").infect(this);

describe("Authentication tests", function() {
    var auth = require("Authentication");
    var goodTime = 1e4;
    it("login", function() {
        var status = false;
        var flag = false;
        runs(function() {
            auth.login("test@mail.com");
            setTimeout(function() {
                flag = true;
            }, goodTime - 100);
            status = auth.loginStatus;
        });
        waitsFor(function() {
            return flag;
        }, "The call timed out", goodTime);
        runs(function() {
            expect(status).toBe(true);
        });
    });
    it("autoLogin", function() {
        expect(auth.autoLogin()).toBe(true);
    });
});