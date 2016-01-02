var GooRule = function(srcURL, dstObj) {
    var WILDCARD = "wildcard",
        REGEXP   = "regexp";

    var replaceWildcard = function(url) {
            //js不支持look-behind，所以这里采用将字符串倒转，之后采用look-ahead方式
            //这里需要将*与?替换为.*与.?，而\*与\?保留不变
            var reverse = function(str) {
                return str.split("").reverse().join("");
            };
            var reversedUrl = reverse(url);
            return reverse(reversedUrl.replace(/([\*|\?])(?!\\)/g,"$1."));
    };
    this.kind   = dstObj.kind || WILDCARD; //规则默认为WILDCARD类型
    this.dstURL = dstObj.dstURL;
    this.enable = dstObj.hasOwnProperty("enable")? dstObj.enable : true;   //规则默认开启

    this.isWildcard = function() {
        return this.kind === WILDCARD;
    }
    this.srcURL = this.isWildcard() ? replaceWildcard(srcURL) : srcURL;
    
    this.toJson = function() {
        var json = {};
        json[this.getSrcURLLabel()] = this.getValue();
        return json;
    }
    this.getKey = function() {
        return this.srcURL;
    }
    this.getValue = function() {
        return {
            dstURL : this.dstURL,
            kind: this.kind,
            enable : this.enable    
        }; 
    }
    this.getKindLabel = function() {
        if (this.isWildcard()) {
            return "通配符";
        } else {
            return "正则式";
        }
    }
    this.getSrcURLLabel = function() {
        if (this.isWildcard() && this.srcURL.match(/\.(\*|\?)/g)) {
            return this.srcURL.replace(/\.(\*|\?)/g, "$1");
        } else {
            return this.srcURL;
        }
    }
}
if ("module" in this) {
    module.exports = GooRule;
}