const { Ci, Cu, Cc, Cr } = require('chrome');
const xpcom = require("sdk/platform/xpcom");
const { Class } = require("sdk/core/heritage");
const { newURI } = require('sdk/url/utils');

var config = require("sdk/simple-prefs");
var prefs = config.prefs;
var db = require("./db").db;

var contractID = '@mozilla.org/observer-service;1';
var observerService = Cc[contractID].getService(Ci.nsIObserverService);

var goorepalcerObserver = Class({
    extends:  xpcom.Unknown,
    interfaces: [ 'nsIObserver' ],
    topic: 'http-on-modify-request',
    register: function() {
        observerService.addObserver(this, this.topic, false);
    },  
    unregister: function() {
        observerService.removeObserver(this, this.topic);
    },  
    observe: function(subject, topic, data) {
        var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
        var requestUrl = httpChannel.URI.spec;

        var redirectRules = db.select();

        for(var key in redirectRules) {
            var redirectRE = new RegExp(key);
            requestUrl.match(redirectRE);
            if( redirectRules[key].enable && requestUrl.match(redirectRE)) {
                var redirectUrl = requestUrl.replace(redirectRE, redirectRules[key].dstURL);    
                httpChannel.redirectTo(newURI(redirectUrl));    
            }
        }
    }
});

var goobserver = goorepalcerObserver();
if(prefs.isRedirect) {
    goobserver.register();
}

var windows = require("sdk/windows").browserWindows;
windows.on('close', function(w) {
    if(prefs.isRedirect) {
        goobserver.unregister();
    }
});

config.on("isRedirect", function(prefName) {
    if(prefs.isRedirect) {
        goobserver.register();
    } else {
        goobserver.unregister();
    }
});

require("./setting").init(config);