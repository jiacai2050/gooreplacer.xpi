 var gooRuleDAO = new(function() {
    var dao = this;
    
    this["delete"] = function(e) {
        if (confirm("确定要删除这条规则吗？")) {
            var par = $(e.target).parent().parent(); //tr
            var tdSrcURL  = par.children("td:nth-child(1)");
            var ruleKey = tdSrcURL.children("input[type=hidden]").val();
            self.port.emit("delete", ruleKey);
        }
    };
    this.toggle = function(e) {
        var toggleBtn = $(e.target);
        var par = toggleBtn.parent().parent(); //tr
        var tdSrcURL  = par.children("td:nth-child(1)");
        var ruleKey   = tdSrcURL.children("input[type=hidden]").val();

        self.port.emit("toggle", ruleKey);
    }
    this.edit = function(e) {
        var td = $(e.target).parent(); //td
        var par = td.parent(); //tr
        var tdSrcURL  = par.children("td:nth-child(1)"),
            tdKind    = par.children("td:nth-child(2)"),
            tdDstURL  = par.children("td:nth-child(3)"),
            tdButtons = par.children("td:nth-child(4)");
        var tdSrcURLOldHtml = tdSrcURL.html(),
            tdKindOldHtml   = tdKind.html(),
            tdDstURLOldHtml = tdDstURL.html(),
            tdButtonsOldHtml= tdButtons.html();
        var srcURLVal = tdSrcURL.children("span").html(),
            ruleKey   = tdSrcURL.children("input[type=hidden]").val(),
            kindVal   = tdKind.children("input[type=hidden]").val(),
            dstURLVal = tdDstURLOldHtml;

        tdSrcURL.html("<input type='text' size='" + srcURLVal.length + "' value='" + srcURLVal + "'/>");
        var select = "<select><option value='wildcard' selected>通配符</option><option value='regexp'>正则式</option></select>";
        if (kindVal === "regexp") {
            select = "<select><option value='wildcard'>通配符</option><option value='regexp' selected>正则式</option></select>";
        };
        tdKind.html(select);
        tdDstURL.html("<input type='text' size='" + dstURLVal.length + "' value='" + dstURLVal + "'/>");

        td.html(imageUtil.save + imageUtil.undo);
        imageUtil.bindClick("save", function(e) {
            self.port.emit("delete", ruleKey);
            gooRuleDAO.save(e);    
        });
        imageUtil.bindClick("undo", function() {
            tdSrcURL.html(tdSrcURLOldHtml);
            tdKind.html(tdKindOldHtml);
            tdDstURL.html(tdDstURLOldHtml);
            tdButtons.html(tdButtonsOldHtml);

            imageUtil.bindClick("rule_enable");
            imageUtil.bindClick("edit");
            imageUtil.bindClick("delete");
        });
        addEnterListener();
    }
    this.save = function(e) {
        var par = $(e.target).parent().parent(); //tr
        var tdSrcURL  = par.children("td:nth-child(1)"),
            tdKind    = par.children("td:nth-child(2)"),
            tdDstURL  = par.children("td:nth-child(3)"),
            tdButtons = par.children("td:nth-child(4)");
        var srcURLVal = tdSrcURL.children("input[type=text]").val(),
            kindVal   = tdKind.children("select").val(),
            dstURLVal = tdDstURL.children("input[type=text]").val();

        if (srcURLVal.trim() === "") {
            alert("原始URL不能为空！");
            tdSrcURL.children("input[type=text]").val("");
            return false;
        };
        if (dstURLVal.trim() === "") {
            alert("目的URL不能为空！");
            tdDstURL.children("input[type=text]").val("");
            return false;
        };
        var gooRule = new GooRule(srcURLVal, {
            dstURL: dstURLVal,
            kind  : kindVal,
            enable: true
        });
        self.port.emit("add", gooRule.toJson());
    }
});

var imageUtil = new (function() {
    var assets = {
        edit: {
            src: "img/edit.png",
            title: "编辑",
            "class": "btnEdit",
            onclick: gooRuleDAO.edit
        },
        save: {
            src: "img/save.png",
            title: "保存",    
            "class": "btnSave",
            onclick: gooRuleDAO.save
        },
        undo: {
            src: "img/undo.png",
            title: "取消",
            "class": "btnUndo"
        },
        "delete": {
            src: "img/delete.png",
            title: "删除",
            "class": "btnDelete",
            onclick: gooRuleDAO["delete"]
        },
        rule_enable: {
            src: "img/rule_enable.png",
            title: "开启",
            "class": "btnToggle",
            onclick: gooRuleDAO.toggle
        },
        rule_disable: {
            src: "img/rule_disable.png",
            title: "禁用",
            "class": "btnToggle",
            onclick: gooRuleDAO.toggle
        }
    };
    var getImageElementByName = function(name) {
        var res = assets[name];
        return "<img class='" + res["class"] + "' src='" + res.src + "' title='" + res.title + "' style='cursor: pointer;'/>";   
    }
    this.edit = getImageElementByName("edit");
    this.save = getImageElementByName("save");
    this["delete"] = getImageElementByName("delete");
    this.undo = getImageElementByName("undo");
    this.rule_enable = getImageElementByName("rule_enable");
    this.rule_disable = getImageElementByName("rule_disable");
    this.bindClick = function(name, cb) {
        var cls = $("." + assets[name]["class"]);
        cb = cb || assets[name].onclick || function() {};
        // http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
        cls.unbind("click");
        cls.bind("click", cb);
    }
});
var addEnterListener = function() {
    $("table.gridtable input[type=text]").keyup(function(e){
        if(e.keyCode == 13){  //Enter键
            var par = $(e.target).parent().parent(); //tr
            var tdButtons = par.children("td:nth-child(4)");
            tdButtons.children("img[class=btnSave]").click();
        }
    });
}
var addRow = function() {
    var rowHTML = ["<tr>",
        "<td><input type='text' style='width:200px'/></td>",
        "<td><select><option value='wildcard'>通配符</option><option value='regexp'>正则式</option></td>",
        "<td><input type='text' style='width:200px'/></td>",
        "<td>" + imageUtil.save + "</td>",
        "</tr>"].join("");
    $("#rules tbody").append(rowHTML);
    imageUtil.bindClick("save");
    addEnterListener();
}

$(function() {
    $("#homepage").click(function() {
        window.open("http://liujiacai.net/gooreplacer/");
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
    $("#add").click(addRow);
    self.port.on("init", function(gooRules) {
        initRules(gooRules);
    });
    self.port.on("onlineSaveDone", function(msg) {
        alert(msg);
    });
    self.port.on("onlineUpdateDone", function(ret) {
        if (ret.code === 0) {
            var d = new Date(ret.updateTime);
            $("#lastUpdateTime").html(d.toLocaleString());    
        };
        alert(ret.msg);
    });
});
function initRules(initJson) {
    var jsonRules = initJson.localRules;
    $("#rules tbody").html("");
    var html = [];
    for(var srcURL in jsonRules) {
        var gooRule     = new GooRule(srcURL, jsonRules[srcURL]);
        var srcURLLabel = gooRule.getSrcURLLabel(),
            enable      = gooRule.enable,
            kindLabel   = gooRule.getKindLabel(),
            dstURL      = gooRule.dstURL;

        var rowHTML = [];
        var ruleStatus = "";
        if (gooRule.enable) {
            rowHTML.push("<tr>");
            ruleStatus = "rule_disable";
        } else {
            rowHTML.push("<tr class='disable'>");
            ruleStatus = "rule_enable";
        }
        rowHTML.push(
            "<td><span>" + srcURLLabel + "</span><input type='hidden' value='" + srcURLLabel + "'/></td>",
            "<td><span>" + kindLabel + "</span><input type='hidden' value='" + gooRule.kind + "'/></td>",
            "<td>" + dstURL + "</td>",
            "<td>" + imageUtil[ruleStatus] + imageUtil.edit + imageUtil["delete"] + "</td>",
            "</tr>");
        $("#rules tbody").append(rowHTML.join(""));
        
        imageUtil.bindClick(ruleStatus);
        imageUtil.bindClick("edit");
        imageUtil.bindClick("delete");
    }
    var onlineURL = initJson.onlineURL;

    $("#onlineURL").val(onlineURL.url);
    $("#onlineInterval").val(onlineURL.interval);
    $("#onlineEnable").val(onlineURL.enable + "");
    var d = new Date(initJson.lastUpdateTime);
    $("#lastUpdateTime").html(d.toLocaleString());
    $("#onlineSave").click(function() {
        var url = $("#onlineURL").val();
        var interval = $("#onlineInterval").val();
        var enable = $("#onlineEnable").val();
        self.port.emit("onlineSave", {
            url: url,
            interval: interval,
            enable: enable
        });
    });
    $("#onlineUpdate").click(function() {
        self.port.emit("onlineUpdate");
    });

};
