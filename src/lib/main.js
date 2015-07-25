const { Ci, Cu, Cc, Cr } = require('chrome');
const xpcom = require("sdk/platform/xpcom");
const { Class } = require("sdk/core/heritage");
const { newURI } = require('sdk/url/utils');

var gooDB = require("./db");
gooDB.init();

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
        var requestURL = httpChannel.URI.spec;

        var gooRules = gooDB.getRules();

        for(var srcURL in gooRules) {
            var gooRule = gooRules[srcURL];
            var redirectRE = new RegExp(srcURL);
            if( gooRule.enable) {
                var redirectMatch = redirectRE.exec(requestURL);
                if (redirectMatch) {
                    var redirectURL = "";
                    if (gooRule.kind === "regexp") { // kind 默认为wildcard
                        redirectURL = requestURL.replace(redirectMatch[0], gooRule.dstURL);
                        redirectMatch = redirectMatch.splice(1);
                        for (var i = 0; i < redirectMatch.length; i++) {
                            redirectURL = redirectURL.replace("$" + (i+1), redirectMatch[i]);
                        };
                    } else {
                        redirectURL = requestURL.replace(redirectRE, gooRule.dstURL);
                    }
                    httpChannel.redirectTo(newURI(redirectURL));
                    break;
                }
            }
        }
    }
});

require("./pref").init(goorepalcerObserver());
