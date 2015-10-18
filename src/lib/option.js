const tabs = require("sdk/tabs");
const data = require("sdk/self").data;
var db = require("./db");
var sync = require("./sync");
var online = require("./updateOnlineRules");

const {Loader, resolveURI} = require('toolkit/loader');
const options = require('@loader/options');
const loader = Loader(options);
var GooRuleURI = resolveURI("./GooRule", loader.mapping);

function initOptionPage(worker) {
    worker.port.emit("init", {
        localRules: db.getRules(), 
        onlineURL: db.getOnlineURL(),
        lastUpdateTime: db.getLastUpdateTime()
    });
}
exports.tabOptions = {
    url : data.url("option.html"),
    onReady : function(tab) {
        var worker = tab.attach({
            contentScriptFile: [data.url("js/jquery-1.6.2.min.js"), GooRuleURI, data.url("js/option.js")]
        });
        worker.port.on("add", function(rule) {
            db.addRule(rule);
            initOptionPage(worker);
        });
        worker.port.on("delete", function(key) {
            db.deleteRule(key);
            initOptionPage(worker);
        });
        worker.port.on("change", function(key) {
            db.updateRule(key);
            initOptionPage(worker);
        });
        worker.port.on("toggle", function(key) {
            db.toggleRule(key);
            initOptionPage(worker);
        });
        worker.port.on("import", function() {
            sync.importRules();
            initOptionPage(worker);
        });
        worker.port.on("export", function() {
            sync.exportRules();
        });
        worker.port.on("onlineSave", function(jsonOnlineURL) {
            db.setOnlineURL(jsonOnlineURL);
            online.saveUpdateTask(jsonOnlineURL.interval);
            worker.port.emit("onlineSaveDone", "保存成功！");    
        });
        worker.port.on("onlineUpdate", function() {
            var now = Date.now();
            online.updateRules(function(ret) {
                ret["updateTime"] = now;
                worker.port.emit("onlineUpdateDone", ret);
            });
            
        });
        initOptionPage(worker);
    }
}
