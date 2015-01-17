const tabs = require("sdk/tabs");
const config = require("sdk/simple-prefs");
const prefs = config.prefs;
const windows = require("sdk/windows").browserWindows;

var option = require("./option");
var Toggle = require("./button");

exports.init = function(goobserver) {
    var toggle = new Toggle(prefs);
    if(prefs.isRedirect) {
        toggle.enable();
        goobserver.register();
    } else {
        toggle.disable();
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
            toggle.enable();
            goobserver.register();
        } else {
            toggle.disable();
            goobserver.unregister();
        }
    });
}
exports.prefs = prefs;
