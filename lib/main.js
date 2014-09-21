const { Ci, Cu, Cc, Cr } = require('chrome');
const xpcom = require("sdk/platform/xpcom");
const { Class } = require("sdk/core/heritage");
const { newURI } = require('sdk/url/utils');
 
var config = require("sdk/simple-prefs");
var prefs = config.prefs;

var observerService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);

var StarObserver = Class({
    extends:  xpcom.Unknown,
    interfaces: [ 'nsIObserver' ],
    topic: 'http-on-modify-request',
    register: function register() {
        observerService.addObserver(this, this.topic, false);
    },  
    unregister: function() {
        observerService.removeObserver(this, this.topic);
    },  
    observe: function observe(subject, topic, data) {
        var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
        var requestUrl = httpChannel.URI.spec;

        var redirectMap = {
        'ajax.googleapis.com': 'ajax.lug.ustc.edu.cn',        
        'fonts.googleapis.com': 'fonts.lug.ustc.edu.cn',        
        'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn',
        'fonts.gstatic.com': 'fonts-gstatic.lug.ustc.edu.cn'   
        };
        for(var key in redirectMap) {
            var redirectReg = new RegExp(key);
            if( requestUrl.match(redirectReg) ) {
                var redirectUrl = requestUrl.replace(redirectReg, redirectMap[key]);    
                //console.log(redirectUrl);
                httpChannel.redirectTo(newURI(redirectUrl));    
            }
        }
    }
});

var starobserver = StarObserver();
if(prefs.isRedirect) {
    starobserver.register();
}

var windows = require("sdk/windows").browserWindows;
windows.on('close', function(w) {
    if(prefs.isRedirect) {
        starobserver.unregister();
    }
});

config.on("isRedirect", function(prefName) {
    if(prefs.isRedirect) {
        starobserver.register();
    } else {
        starobserver.unregister();
    }
});
