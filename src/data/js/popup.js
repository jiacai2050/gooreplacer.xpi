
$(function() {
    var toggle = $("#toggle");
    var gosetting = $("#gosetting");

    self.port.on("init", function(isRedirect) {
        toggle.attr("checked", isRedirect);
    });
    toggle.click(function() {
        self.port.emit("toggle", this.checked);    
    });
    gosetting.click(function() {
        self.port.emit("gosetting");    
    });

});
