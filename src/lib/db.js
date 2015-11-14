const config = require("sdk/simple-prefs");
const prefs = config.prefs;

var updater = require("./updateOnlineRules"),
    GooRule = require("./GooRule");

var gooDB = new(function() {
    var that = this;
    var ISREDIRECT_KEY = "isRedirect";
        ONLINE_URL_KEY = "onlineRulesURL",
        UPDATE_INTERVAL_KEY = "updateInterval",
        UPDATE_NOW_KEY = "updateNow",
        LAST_UPDATE_KEY = "onlineLastUpdateTime",
        ONLINE_RULES_KEY = "onlineRules";
    
    this.init = function(goobserver) {
        config.on(UPDATE_NOW_KEY, function() {
            that.updateRules();
        });
        config.on(UPDATE_INTERVAL_KEY, function() {
            updater.updateTask(that.getOnlineURL(), that.getUpdateInterval());
        });
        config.on(ISREDIRECT_KEY, function() {
            if(prefs[ISREDIRECT_KEY]) {
                goobserver.register();
            } else {
                goobserver.unregister();
            }
        });
        that.updateRules();
    }
    this.addJsonRule = function(jsonRules) {
        for (var key in jsonRules) {
            that.addRule(new GooRule(key, jsonRules[key]));
        }
    }
    this.getOnlineURL = function() {
        return prefs[ONLINE_URL_KEY];
    }
    this.getUpdateInterval = function() {
        return prefs[UPDATE_INTERVAL_KEY];
    }
    this.getLastUpdateTime = function() {
        return prefs[LAST_UPDATE_KEY];
    }
    this.setLastUpdateTime = function(updateTime) {
        prefs[LAST_UPDATE_KEY] = updateTime;
    }
    this.getRules = function() {
        return JSON.parse(prefs[ONLINE_RULES_KEY]);
    }
    this.addRule = function(gooRule) {
        var rules = that.getRules(ONLINE_RULES_KEY);
        rules[gooRule.getSrcURLLabel()] = gooRule.getValue();
        prefs[ONLINE_RULES_KEY] = JSON.stringify(rules);
    }
    this.deleteRule = function(ruleKey) {
        if (ruleKey) {
            var rules = this.getRules(ONLINE_RULES_KEY);
            delete rules[ruleKey];
            prefs[ONLINE_RULES_KEY] = JSON.stringify(rules);
        } else {
            //如果 ruleKey == null， 清空之前的所有规则
            prefs[ONLINE_RULES_KEY] = '{}';
        }
    }
    this.updateRules = function() {
        updater.updateRules(that.getOnlineURL(), function(ret) {
            if (ret.code === 0) {
                that.deleteRule(null);
                that.addJsonRule(ret.data);
                that.setLastUpdateTime(new Date().toLocaleString());
            };
        });    
    }
});
module.exports = gooDB;
