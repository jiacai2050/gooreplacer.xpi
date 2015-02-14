const ss = require("sdk/simple-storage");
const { merge } = require("sdk/util/object");

var DB = function() {
    this.add = function (newRules) {
        ss.storage.rules = merge(ss.storage.rules, newRules);
    };
    this.del = function (key) {
        if (ss.storage.rules.hasOwnProperty(key)) {
            delete ss.storage.rules[key];
        };
    };
    this.update = function (key) {
        ss.storage.rules[key]["enable"] = ! ss.storage.rules[key]["enable"];
    };
    this.select = function() {
        return ss.storage.rules;
    };
    this.init = function() {
        if (!ss.storage.rules) {
            ss.storage.rules = {
                'ajax.googleapis.com': {dstURL: 'ajax.lug.ustc.edu.cn', enable: true},        
                'fonts.googleapis.com': {dstURL:'fonts.lug.ustc.edu.cn', enable: true},        
                'themes.googleusercontent.com': {dstURL:'google-themes.lug.ustc.edu.cn', enable: true},
                'fonts.gstatic.com': {dstURL:'fonts-gstatic.lug.ustc.edu.cn', enable: true},
                'http.*://platform.twitter.com/widgets.js': {dstURL: 'https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/widgets.js', enable: true},
                'http.*://apis.google.com/js/api.js': {dstURL: 'https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/api.js', enable: true},
                'http.*://apis.google.com/js/plusone.js': {dstURL: 'https://raw.githubusercontent.com/jiacai2050/gooreplacer/gh-pages/proxy/plusone.js', enable: true}
            };
        }
    
    }
}
module.exports = DB;
