var getLabel = function(status) {
    if (status == "true") {
        return "停用";
    } else {
        return "开启";
    }
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
            var asteriskRE = /\.\*/g;
            var srcURL = key;
            if (key.match(asteriskRE)) {
                srcURL = key.replace(asteriskRE, "*");
            };
            rowHTML.push(
                "<td>"+srcURL+"</td>",
                "<td>----></td>",
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

                srcUrlValue = srcUrlValue.replace(/\*/g,".*"); 
                dstUrlValue = dstUrlValue.replace(/\*/g,".*"); 

                rules[srcUrlValue] = {
                    dstURL : dstUrlValue,
                    enable : true
                };

                this.value = "";
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
            "<td>----></td>",
            "<td><input type='text' id='dstURL"+total+"'></td>",
            "</tr>"].join("");
        $("#rules").append(rowHTML);

        total+=1;
    } 
    $('input[type="text"]').blur(function() {
        var val = this.value.trim();
        var stopwords = [
            "\\(",
            "\\)",
            "\\[",
            "\\]",
            "\\{",
            "\\}",
            "\\?",
            "\\\\",
            "\\+"
        ].join("|");
        var keywordsRE = new RegExp(stopwords, 'g');
        if (val.match(keywordsRE)) {
            alert("URL中不能包含 (, ), [, ], {, }, ?, \\, + 这些特殊字符！");
            this.value = "";
            $(this).focus();
        };
        
    });    
}
