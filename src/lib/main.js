const { Ci, Cu, Cc, Cr } = require('chrome');
const xpcom = require("sdk/platform/xpcom");
const { Class } = require("sdk/core/heritage");
const { newURI } = require('sdk/url/utils');

var gooDB = require("./db");
var GooRule = require("../data/js/GooRule");
gooDB.init();

var contractID = '@mozilla.org/observer-service;1';
var observerService = Cc[contractID].getService(Ci.nsIObserverService);

function findRedirectUrl(requestURL, jsonRules) {
    for(var ruleKey in jsonRules) {
        var gooRule = new GooRule(ruleKey, jsonRules[ruleKey]);
        var redirectRE = new RegExp(gooRule.srcURL);
        if (gooRule.enable) {
            var redirectMatch = redirectRE.exec(requestURL);
            if (redirectMatch) {
                var redirectURL = "";
                if (gooRule.isWildcard()) { // kind 默认为wildcard
                    redirectURL = requestURL.replace(redirectRE, gooRule.dstURL);
                } else {
                    redirectURL = requestURL.replace(redirectMatch[0], gooRule.dstURL);
                    redirectMatch = redirectMatch.splice(1);
                    for (var i = 0; i < redirectMatch.length; i++) {
                        redirectURL = redirectURL.replace("$" + (i + 1), redirectMatch[i]);
                    }
                }
                return redirectURL;
            }
        }
    }
}
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

        // 1. 检查本地自定义规则
        var gooRules = gooDB.getRules();

        var redirectURL = findRedirectUrl(requestURL, gooRules);
        if (redirectURL) {
            httpChannel.redirectTo(newURI(redirectURL));
            return;
        }
        var onlineURL = gooDB.getOnlineURL();
        // 2. 检查在线URL所定义规则
        if (onlineURL.enable) {
            var gooRules = gooDB.getRules("onlineRules");

            var redirectURL = findRedirectUrl(requestURL, gooRules);
            if (redirectURL) {
                httpChannel.redirectTo(newURI(redirectURL));
                return;
            }
        }
    }
});

require("./pref").init(goorepalcerObserver());
require("./updateOnlineRules");
