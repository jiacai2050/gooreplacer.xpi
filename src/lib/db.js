const ss = require("sdk/simple-storage");
const { merge } = require("sdk/util/object");

var GooRuleObj = require("./GooRule");

var gooDB = new(function() {
    var RULES_KEY = "rules",
        ISREDIRECT_KEY = "isRedirect";
    var ONLINE_URL_KEY = "onlineRulesURL",
        online_url = {
            url: "https://raw.githubusercontent.com/jiacai2050/gooreplacer4chrome/master/gooreplacer.gson",
            interval: 5,
            enable: true
        };
    var LAST_UPDATE_KEY = "onlineLastUpdateTime";
    var ONLINE_RULES_KEY = "onlineRules";
    this.init = function() {
        if (!ss.storage[ONLINE_URL_KEY]) {
            ss.storage[ONLINE_URL_KEY] = online_url;
        }
        if (!ss.storage[RULES_KEY]) {
            ss.storage[RULES_KEY] = {};
        }
    }
    this.getOnlineURL = function() {
        return ss.storage[ONLINE_URL_KEY];
    }
    this.setOnlineURL = function(onlineURL) {
        ss.storage[ONLINE_URL_KEY] = onlineURL;
    }
    this.getLastUpdateTime = function() {
        return ss.storage[LAST_UPDATE_KEY] || 0;
    }
    this.setLastUpdateTime = function(updateTime) {
        ss.storage[LAST_UPDATE_KEY] = updateTime;
    }
    this.getRules = function(db) {
        var db = db || RULES_KEY;
        return ss.storage[db] || {};
    }
    this.addRule = function(jsonRule, db) {
        var db = db || RULES_KEY;
        merge(ss.storage[db], jsonRule);
    }
    this.deleteRule = function(ruleKey, db) {
        var db = db || RULES_KEY;
        if (ruleKey) {
            delete ss.storage[db][ruleKey];
        } else {
            //如果 ruleKey == null， 清空之前的所有规则
            ss.storage[db] = {};
        }
    }
    this.updateRule = function(ruleKey, jsonRule, db) {
        var db = db || RULES_KEY;
        delete ss.storage[db][ruleKey];
        this.addRule(jsonRule, db);
    }
    this.toggleRule = function(ruleKey, db) {
        var db = db || RULES_KEY;
        var gooRule = ss.storage[db][ruleKey];
        gooRule["enable"] = ! gooRule["enable"];
        return gooRule["enable"];
    }
});
module.exports = gooDB;
