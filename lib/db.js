var ss = require("sdk/simple-storage");
let { merge } = require("sdk/util/object");

if (!ss.storage.rules)
    ss.storage.rules = {
        'ajax.googleapis.com': 'ajax.lug.ustc.edu.cn',        
        'fonts.googleapis.com': 'fonts.lug.ustc.edu.cn',        
        'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn',
        'fonts.gstatic.com': 'fonts-gstatic.lug.ustc.edu.cn'   
    }

var add = function (newRules) {
    ss.storage.rules = merge(ss.storage.rules, newRules);
}
var del = function (key) {
    if (ss.storage.rules.hasOwnProperty(key)) {
        delete ss.storage.rules[key];
    };
}
var select = function() {
    return ss.storage.rules;
}
exports.db = {
    add: add,
    del: del,
    select: select
}