const ss = require("sdk/simple-storage");
const { merge } = require("sdk/util/object");

var gooDB = new (function () {
    var RULES_KEY = "rules",
        rules     = {
            'ajax.googleapis.com': {dstURL: 'ajax.lug.ustc.edu.cn', enable: true},        
            'fonts.googleapis.com': {dstURL:'fonts.lug.ustc.edu.cn', enable: true},        
            'themes.googleusercontent.com': {dstURL:'google-themes.lug.ustc.edu.cn', enable: true},
            'fonts.gstatic.com': {dstURL:'fonts-gstatic.lug.ustc.edu.cn', enable: true},
            'http.*://platform.twitter.com/widgets.js': {dstURL: 'https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/widgets.js', enable: true},
            'http.*://apis.google.com/js/api.js': {dstURL: 'https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/api.js', enable: true},
            'http.*://apis.google.com/js/plusone.js': {dstURL: 'https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/plusone.js', enable: true}
        };
    this.init = function() {
        if (!ss.storage[RULES_KEY]) {
            ss.storage[RULES_KEY] = rules;
        }
    }
    this.getRules = function() {
        return ss.storage[[RULES_KEY]];
    }
    this.addRule = function(jsonRule) {
        merge(ss.storage[[RULES_KEY]], jsonRule);
    }
    this.deleteRule = function(srcURL) {
        delete ss.storage[RULES_KEY][srcURL];
    }
    this.updateRule = function(srcURL, jsonRule) {
        delete ss.storage[RULES_KEY][srcURL];
        this.addRule(jsonRule);
    }
    this.toggleRule = function(srcURL) {
        var gooRule = ss.storage[RULES_KEY][srcURL];
        gooRule["enable"] = ! gooRule["enable"];
        return gooRule["enable"];
    }
});
module.exports = gooDB;
