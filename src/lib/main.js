const { Ci, Cu, Cc, Cr } = require('chrome');
const xpcom = require("sdk/platform/xpcom");
const { Class } = require("sdk/core/heritage");
const { newURI } = require('sdk/url/utils');

var db = new (require("./db"))();
db.init();

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
            if( redirectRules[key].enable) {
                var matched = redirectRE.exec(requestUrl);
                if (matched) {
                    var redirectUrl = "";
                    var kind = redirectRules[key].kind || "wildcard";
                    if (kind == "wildcard") {
                        redirectUrl = requestUrl.replace(redirectRE, redirectRules[key].dstURL);
                    } else {
                        redirectUrl = requestUrl.replace(matched[0], redirectRules[key].dstURL);
                        matched = matched.splice(1);
                        for (var i = 0; i < matched.length; i++) {
                            redirectUrl = redirectUrl.replace("$" + (i+1), matched[i]);
                        };
                    }
                    httpChannel.redirectTo(newURI(redirectUrl));
                };
            }
        }
    }
});

require("./pref").init(goorepalcerObserver());
