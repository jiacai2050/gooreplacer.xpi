var pfs = require("sdk/simple-prefs").prefs;
const ss = require("sdk/simple-storage");
const { merge } = require("sdk/util/object");

var GooRuleObj = require("../data/js/GooRule");

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
    var migrateFromSS = function (name) {
        if (ss.storage[name]) {
            pfs[name] = JSON.stringify(ss.storage[name]);
            delete ss.storage[name];
        }
    };
    this.init = function() {
        migrateFromSS(ONLINE_URL_KEY);
        migrateFromSS(ONLINE_RULES_KEY);
        migrateFromSS(RULES_KEY);
        migrateFromSS(LAST_UPDATE_KEY);

        if (!pfs[ONLINE_URL_KEY]) {
            pfs[ONLINE_URL_KEY] = JSON.stringify(online_url);
        }
        if (!pfs[RULES_KEY]) {
            pfs[RULES_KEY] = '{}';
        }
    }
    this.getOnlineURL = function() {
        return JSON.parse(pfs[ONLINE_URL_KEY]);
    }
    this.setOnlineURL = function(onlineURL) {
        pfs[ONLINE_URL_KEY] = JSON.stringify(onlineURL);
    }
    this.getLastUpdateTime = function() {
        return pfs[LAST_UPDATE_KEY] ? parseInt(pfs[LAST_UPDATE_KEY], 10) : 0;
    }
    this.setLastUpdateTime = function(updateTime) {
        pfs[LAST_UPDATE_KEY] = updateTime.toString();
    }
    this.getRules = function(db) {
        var db = db || RULES_KEY;
        if (pfs[db]) {
            return JSON.parse(pfs[db]);
        } else {
            return {};
        }
    }
    this.addRule = function(jsonRule, db) {
        var db = db || RULES_KEY;
        var rules = this.getRules(db);
        merge(rules, jsonRule);
        pfs[db] = JSON.stringify(rules);
    }
    this.deleteRule = function(ruleKey, db) {
        var db = db || RULES_KEY;
        if (ruleKey) {
            var rules = this.getRules(db);
            delete rules[ruleKey];
            pfs[db] = JSON.stringify(rules);
        } else {
            //如果 ruleKey == null， 清空之前的所有规则
            pfs[db] = '{}';
        }
    }
    this.updateRule = function(ruleKey, jsonRule, db) {
        this.deleteRule(ruleKey, db);
        this.addRule(jsonRule, db);
    }
    this.toggleRule = function(ruleKey, db) {
        var rules = this.getRules(db);
        var gooRule = rules.ruleKey;
        gooRule["enable"] = ! gooRule["enable"];
        return gooRule["enable"];
    }
});
module.exports = gooDB;
