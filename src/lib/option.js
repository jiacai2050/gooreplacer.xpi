const tabs = require("sdk/tabs");
const data = require("sdk/self").data;
var db = require("./db");
var sync = require("./sync");


exports.tabOptions = {
    url : data.url("option.html"),
    onReady : function(tab) {
        var worker = tab.attach({
            contentScriptFile: [data.url("js/jquery-1.6.2.min.js"), data.url("js/option.js")],
        });
        worker.port.on("add", function(rule) {
            db.addRule(rule);
            worker.port.emit("init", db.getRules());
        });
        worker.port.on("delete", function(key) {
            db.deleteRule(key);
            worker.port.emit("init", db.getRules());
        });
        worker.port.on("change", function(key) {
            db.updateRule(key);
            worker.port.emit("init", db.getRules());
        });
        worker.port.on("toggle", function(key) {
            db.toggleRule(key);
            worker.port.emit("init", db.getRules());
        });
        worker.port.on("import", function() {
            sync.importRules();
            worker.port.emit("init", db.getRules());
        });
        worker.port.on("export", function() {
            sync.exportRules();
        });
        worker.port.emit("init", db.getRules());
    }
}
