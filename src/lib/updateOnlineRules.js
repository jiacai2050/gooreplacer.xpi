const { setTimeout, setInterval, clearInterval} = require("sdk/timers");
const { XMLHttpRequest } = require("sdk/net/xhr");

var updateTask = null;

function fetchRules(onlineURL, cb) {
    cb = cb || function() {};
    if (onlineURL.trim() !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", onlineURL, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var jsonRules = JSON.parse(xhr.responseText).rules;
                    cb({msg: "更新成功！", code: 0, data: jsonRules});
                } else {
                    cb({msg: "更新失败！", code: xhr.status});
                }
            }
        }
        xhr.send();
    }
}
exports.updateTask = function(onlineURL, interval, cb) {
    if(updateTask) {
        clearInterval(updateTask);    
    }
    if(interval !== 0) {
        interval = interval * 60 * 1000;
        updateTask = setInterval(function() {
            fetchRules(onlineURL, cb);
        }, interval);    
    }
    
}
exports.updateRules = function(onlineURL, cb) {
    fetchRules(onlineURL, cb);
}
