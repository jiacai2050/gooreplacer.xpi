const {Cc, Ci} = require('chrome');
const { ActionButton } = require("sdk/ui/button/action");
const { ToggleButton } = require('sdk/ui/button/toggle');
const tabs = require("sdk/tabs");
const panels = require("sdk/panel");
const data = require("sdk/self").data;

var option = require("./option");

var Toggle = function(prefs) {
    var self = this;
    this.button = ToggleButton({
        id: "gooreplacer",
        label: "gooreplacer 想去哪儿，就去哪儿",
        "icon" : {
            "16": "./img/gooreplacer-16.png",
            "32": "./img/gooreplacer-32.png",
            "64": "./img/gooreplacer-64.png"
        },
        onChange: function(state) {
            if (state.checked) {
                self.panel.show({
                    position: self.button
                });
            }
        },
    });
    this.panel = panels.Panel({
        width:100,
        height:80,
        contentURL: data.url("popup.html"),
        contentScriptFile: [data.url("js/jquery-1.6.2.min.js"), data.url("js/popup.js")],
        onHide: function () {
            self.button.state('window', {checked: false});
            if(prefs.isRedirect) {
                self.enable();
            } else {
                self.disable();
            }
        }
    });
    this.panel.port.on("toggle", function(isRedirect) {
        prefs.isRedirect = isRedirect;
        if(isRedirect) {
            self.enable();
        } else {
            self.disable();
        }
    });
    this.panel.port.on("gosetting", function() {
        if (prefs.isRedirect) {
            self.panel.hide();
            tabs.open(option.tabOptions);
        } else {            
            var prompt = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
            var flag = (prompt.BUTTON_TITLE_IS_STRING * prompt.BUTTON_POS_0) +
                       (prompt.BUTTON_TITLE_IS_STRING * prompt.BUTTON_POS_1);
            var res = prompt.confirmEx(null, "温馨提示","如果想自定义规则，需先“开启重定向”",
                flag,  "开启，并前往自定义页面", "残忍拒绝",null, null, {value:false});
            if (0 == res) {
                prefs.isRedirect = true;
                tabs.open(option.tabOptions);
                self.panel.port.emit("init", prefs.isRedirect);
            };
        }
    });
    this.panel.port.emit("init", prefs.isRedirect);
    this.enable = function() {
        this.button.state("window", {
            "icon" : {
                "16": "./img/gooreplacer-16.png",
                "32": "./img/gooreplacer-32.png",
                "64": "./img/gooreplacer-64.png"
            }
        });
    };
    this.disable = function() {
        this.button.state("window", {
            "icon" : {
                "16": "./img/gooreplacer-off-16.png",
                "32": "./img/gooreplacer-off-32.png",
                "64": "./img/gooreplacer-off-64.png"
            }
        });
    };
    this.init = function() {
        if(prefs.isRedirect) {
            this.enable();
        } else {
            this.disable();
        }
    };
}

module.exports = Toggle; 
