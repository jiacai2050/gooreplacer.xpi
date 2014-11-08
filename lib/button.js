const {Cc, Ci} = require('chrome');
const { ActionButton } = require("sdk/ui/button/action");
const tabs = require("sdk/tabs");
const panels = require("sdk/panel");
const data = require("sdk/self").data;

var option = require("./option");
var prefs = require("./pref").prefs;

var button = ActionButton({
    id: "gooreplacer",
    label: "gooreplacer 想去哪儿，就去哪儿",
    icon: {
      "16": "./png/gooreplacer-16.png",
      "32": "./png/gooreplacer-32.png",
      "64": "./png/gooreplacer-64.png"
    },
    onClick: function () {
        if (prefs.isRedirect) {
            tabs.open(option.tabOptions);
        } else {            
            var prompt = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
            var flag = (prompt.BUTTON_TITLE_IS_STRING * prompt.BUTTON_POS_0) +
                       (prompt.BUTTON_TITLE_IS_STRING * prompt.BUTTON_POS_1);
            var res = prompt.confirmEx(null, "温馨提示","如果想使用重定向功能，请先在gooreplacer配置页中选中“开启重定向”",
                flag,  "前往配置页", "残忍拒绝",null, null, {value:false});
    
            if (0 == res) {
                var wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
                wm.getMostRecentWindow('navigator:browser').BrowserOpenAddonsMgr('addons://detail/gooreplacer%40liujiacai.net/preferences');    
            };
        }
    }
});

function enable() {
    button.state("window", {
        "icon" : {
            "16": "./png/gooreplacer-16.png",
            "32": "./png/gooreplacer-32.png",
            "64": "./png/gooreplacer-64.png"
        }
    });
}
function disable() {
    button.state("window", {
        "icon" : {
            "16": "./png/gooreplacer-off-16.png",
            "32": "./png/gooreplacer-off-32.png",
            "64": "./png/gooreplacer-off-64.png"
        }
    });
}
exports.enable = enable;
exports.disable = disable;