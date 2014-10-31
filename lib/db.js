var ss = require("sdk/simple-storage");
let { merge } = require("sdk/util/object");

if (!ss.storage.rules) {
    ss.storage.rules = {
        'ajax.googleapis.com': {dstURL: 'ajax.lug.ustc.edu.cn', enable: true},        
        'fonts.googleapis.com': {dstURL:'fonts.lug.ustc.edu.cn', enable: true},        
        'themes.googleusercontent.com': {dstURL:'google-themes.lug.ustc.edu.cn', enable: true},
        'fonts.gstatic.com': {dstURL:'fonts-gstatic.lug.ustc.edu.cn', enable: true}
    };
}

var add = function (newRules) {
    ss.storage.rules = merge(ss.storage.rules, newRules);
}
var del = function (key) {
    if (ss.storage.rules.hasOwnProperty(key)) {
        delete ss.storage.rules[key];
    };
}
var update = function (key) {
    ss.storage.rules[key]["enable"] = ! ss.storage.rules[key]["enable"];
}
var select = function() {
    return ss.storage.rules;
}
exports.db = {
    add: add,
    del: del,
    select: select,
    update: update
}
