const { setTimeout, setInterval, clearInterval} = require("sdk/timers");
const { XMLHttpRequest } = require("sdk/net/xhr");

var gooDB = require("./db"),
    GooRule = require("./GooRule");

var online = gooDB.getOnlineURL(),
 onlineURL = online.url,
  interval = online.interval * 60 * 1000;


var updateTask = setInterval(function() {
    fetchRules();
}, interval);

if (0 === interval) {
    setTimeout(function() {
        fetchRules();
    }, 5000);
}

function fetchRules(cb) {
    cb = cb || function() {};
    if (onlineURL.trim() !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", onlineURL, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var jsonRules = JSON.parse(xhr.responseText).rules;
                    var db = "onlineRules";
                    gooDB.deleteRule(null, db);
                    for (var key in jsonRules) {
                        gooDB.addRule(new GooRule(key, jsonRules[key]).toJson(), db);
                    }
                    gooDB.setLastUpdateTime(Date.now());
                    cb({msg: "更新成功！", code: 0});
                } else {
                    cb({msg: "更新失败！", code: xhr.status});
                }
            }
        }
        xhr.send();
    }
}
exports.saveUpdateTask = function(interval) {
    clearInterval(updateTask);
    interval = interval * 60 * 1000;
    updateTask = setInterval(function() {
        fetchRules();
    }, interval);
}
exports.updateRules = function(cb) {
    fetchRules(cb);
}
