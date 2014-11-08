const tabs = require("sdk/tabs");
const config = require("sdk/simple-prefs");
const prefs = config.prefs;
const windows = require("sdk/windows").browserWindows;

var option = require("./option");
var button = require("./button");

exports.init = function(goobserver) {
    if(prefs.isRedirect) {
        button.enable();
        goobserver.register();
    } else {
        button.disable();
    }
    windows.on('close', function(w) {
        if(prefs.isRedirect) {
            goobserver.unregister();
        }
    });
    config.on("setting", function() {
        tabs.open(option.tabOptions);
    });
    config.on("isRedirect", function(prefName) {
        if(prefs.isRedirect) {
            button.enable();
            goobserver.register();
        } else {
            button.disable();
            goobserver.unregister();
        }
    });
}
exports.prefs = prefs;
 

