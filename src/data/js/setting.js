var getLabel = function(status) {
    if (status == "true") {
        return "停用";
    } else {
        return "开启";
    }
}
var getKind = function(kind) {
    if (kind == "wildcard") {
        return "通配符";
    } else {
        return "正则式";
    }
}
var replaceWildcard = function(url) {
    //js不支持look-behind，所以这里采用将字符串倒转，之后采用look-ahead方式
    //这里需要将*与?替换为.*与.?，而\*与\?保留不变
    var reverse = function(str) {
        return str.split("").reverse().join("");
    };
    var reversedUrl = reverse(url);
 
    return reverse(reversedUrl.replace(/([\*|\?])(?!\\)/g,"$1."));
}
$(function() {
    self.port.on("init", function(rules) {
        $("#list").html("");
        var html = [];
        for(key in rules) {
            var rowHTML = [];
            if (rules[key].enable) {
                rowHTML.push("<tr>");
            } else {
                rowHTML.push("<tr class='disable'>");
            }
            var srcURL = key;
            var kind = rules[key].kind || "wildcard";
            
            if (kind == "wildcard" && key.match(/\.(\*|\?)/g)) {
                srcURL = key.replace(/\.(\*|\?)/g, "$1");
            };
            rowHTML.push(
                "<td >"+srcURL+"</td>",
                "<td>---->"+getKind(kind)+"---></td>",
                "<td>"+rules[key].dstURL+"</td>",
                "<td><input type=button id=change"+key+" value="+rules[key].enable+"></td>",
                "<td><input type=button id=del"+key+" value='删除'></td>",

            "</tr>");
                
            $("#list").append(rowHTML.join(""));
        } 
        $("input[id^=del]").each(function() {
            var key = this.id.substring(3);
            this.onclick = function() {
                if (confirm("确定要删除这条规则吗？")) {
                    self.port.emit("del", key);    
                };
            }
        });    
        $("input[id^=change]").each(function() {
            var key = this.id.substring(6);
            this.value = getLabel(this.value);
            this.onclick = function() {
                self.port.emit("change", key);    
            }
        });
    });
    $("#homepage").click(function() {
        self.port.emit("homepage"); 
    });
    $("#import").click(function() {
        self.port.emit("import");
    });
    $("#export").click(function() {
        self.port.emit("export"); 
    });
    $("#help").click(function() {
        jQuery.fn.center = function () {
            this.css("position","absolute");
            this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
            this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
            return this;
        }
        $('#config').center().css('top', '-=40px').show();
    });
    $('#close').click(function() {
        $('#config').hide();
    });
    
    $("#ok").click(function() {
        var rules = {};
        var number = 0;
        $("input[id^=srcURL]").each(function() {
            var srcUrlValue = this.value.trim();
            if(srcUrlValue !== "") {
                var dstUrlTag = this.id.replace("srcURL", "dstURL");
                var dstUrlValue = $("#" + dstUrlTag).val().trim();

                var kindTag = this.id.replace("srcURL", "kind");
                var kindValue = $("#" + kindTag).val();

                if (kindValue == "wildcard") {
                    srcUrlValue = replaceWildcard(srcUrlValue);
                };

                rules[srcUrlValue] = {
                    dstURL : dstUrlValue,
                    kind: kindValue,
                    enable : true
                };

                this.value = "";
                $("#" + kindTag).attr("value",'wildcard');
                $("#" + dstUrlTag).val("");
                number += 1;
            }
        });
        alert("成功添加" + number + "个规则");
        self.port.emit("add", rules);
    });  
    
    $("#more").click(function() {
        addRows();
    }); 
    addRows(); 
});

var total=0;
var addRows = function() {
    var addLimit = 5 + total;
    while(total < addLimit) {
        
        var rowHTML = ["<tr>",
            "<td><input type='text' id='srcURL"+total+"'></td>",
            "<td><select id='kind"+total+"'><option value='wildcard'>通配符</option><option value='regexp'>正则式</option></td>",
            "<td><input type='text' id='dstURL"+total+"'></td>",

            "</tr>"].join("");
        $("#rules").append(rowHTML);

        total+=1;
    }    
}
