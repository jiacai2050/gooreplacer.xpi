const tabs = require("sdk/tabs");
const data = require("sdk/self").data;
var db = require("./db").db;
var sync = require("./sync");


exports.tabOptions = {
    url : data.url("setting.html"),
    onReady : function(tab) {
        var worker = tab.attach({
            contentScriptFile: [data.url("jquery-1.6.2.min.js"), data.url("setting.js")],
        });
        worker.port.on("add", function(rules) {
            db.add(rules);
            worker.port.emit("init", db.select());
        });
        worker.port.on("del", function(key) {
            db.del(key);
            worker.port.emit("init", db.select());
        });
        worker.port.on("change", function(key) {
            db.update(key);
            worker.port.emit("init", db.select());
        });
        worker.port.on("homepage", function() {
            tabs.open("http://liujiacai.net/gooreplacer/");
        });
        worker.port.on("import", function() {
            sync.importRules();
            worker.port.emit("init", db.select());
        });
        worker.port.on("export", function() {
            sync.exportRules();
        });
        worker.port.emit("init", db.select());
    }

}