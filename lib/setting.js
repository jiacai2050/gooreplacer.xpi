var data = require("sdk/self").data;
var db = require("./db").db;

var init = function(config) {
    config.on("setting", function() {
        var tabs = require("sdk/tabs");
        tabs.open({
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
                worker.port.emit("init", db.select());
            }
          
        });
    });
}    
exports.init = init;