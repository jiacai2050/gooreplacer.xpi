//document.body.style.border = "5px solid red";
$(function() {
    self.port.on("init", function(data) {
        $("#list").html("");
        var html = [];
        for(key in data) {
            var rowHTML = ["<tr>",
                "<td>"+key+"</td>",
                "<td>----></td>",
                "<td>"+data[key]+"</td>",
                "<td><input type=button id=del"+key+" value='删除'></td>",
                "</tr>"].join("");
                
            $("#list").append(rowHTML);
        } 
        $("input[id^=del]").each(function() {
            var key = this.id.substring(3);
            this.onclick = function() {
                if (confirm("确定要删除这条规则吗？")) {
                    self.port.emit("del", key);    
                };
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
                rules[this.value] = value;

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