var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;

pageMod.PageMod({
      contentScriptWhen: "ready",
      include: "*",
//      contentScript: ''
      contentScriptFile: [data.url('jquery.js'), data.url('check.js')]
});
