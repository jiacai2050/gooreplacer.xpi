//document.body.style.border = "5px solid red";
var getLabel = function(status) {
    if (status == "true") {
        return "停用";
    } else {
        return "开启";
    }
}
$(function() {
    self.port.on("init", function(data) {
        $("#list").html("");
        var html = [];
        for(key in data) {
            var rowHTML = [];
            if (data[key].enable) {
                rowHTML.push("<tr>");
            } else {
                rowHTML.push("<tr class='disable'>");
            }
            rowHTML.push(
                "<td>"+key+"</td>",
                "<td>----></td>",
                "<td>"+data[key].dstURL+"</td>",
                "<td><input type=button id=change"+key+" value="+data[key].enable+"></td>",
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
    $("#ok").click(function() {
        var rules = {};
        var number = 0;
        $("input[id^=srcURL]").each(function() {
            if(this.value.trim() !== "") {
                var dstURL = this.id.replace("srcURL", "dstURL");
                var value = $("#" + dstURL).val();
                rules[this.value] = {
                    dstURL : value,
                    enable : true
                };

                this.value = "";
                $("#" + dstURL).val("");
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
            "<td><input id='srcURL"+total+"'></td>",
            "<td>----></td>",
            "<td><input id='dstURL"+total+"'></td>",
            "</tr>"].join("");
        $("#rules").append(rowHTML);

        total+=1;
    } 
}