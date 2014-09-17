const { Cc, Ci } = require("chrome");
const xpcom = require("sdk/platform/xpcom");
const { Class } = require("sdk/core/heritage");
 
exports.gcleaner = Class({
  extends: xpcom.Unknown,
  interfaces: ["nsIContentPolicy"],
  shouldLoad: function (contType, contLoc, reqOrig, ctx, typeGuess, extra) {
  //https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy#shouldLoad()	
  	if (contType === 2) 
	{
		var googleReg = new RegExp('googleapis.com');
		if (contLoc['spec'].match(googleReg)) 
		{	
			return Ci.nsIContentPolicy.REJECT;
		};
		
	};
	return Ci.nsIContentPolicy.ACCEPT;
  },
 
  shouldProcess: function (contType, contLoc, reqOrig, ctx, mimeType, extra) {
    return Ci.nsIContentPolicy.ACCEPT;
  }
});
 
let factory = xpcom.Factory({
  Component:   exports.gcleaner,
  description: "a firefox addon to replace google links",
  contract:    "@liujiacai.net/gcleaner"
});
 
var catman = Cc["@mozilla.org/categorymanager;1"].getService(Ci.nsICategoryManager);
catman.addCategoryEntry("content-policy", "speeding.gcleaner", factory.contract, false, true);