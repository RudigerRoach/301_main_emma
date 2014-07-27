var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.sessionObj = {
    id: "0"
};

if ("production" !== Ti.App.deployType) {
    Alloy.CFG.environment = "test";
    require("testRunner").run();
}

Alloy.createController("index");