function process(link, replacement, tag) {

    var linkReg = new RegExp(link);
    var results = document.getElementsByTagName(tag);
    
    for(i=0; i<results.length; i++) {
        var element = results[i];
        if( tag === "script") {
            if(element.src && element.src.match(linkReg)) {
                //script.parentNode.removeChild(script);
               element.src = element.src.replace(linkReg, replacement);
            }
        } else if ( tag === "link") {
            if(element.href && element.href.match(linkReg)) {
               element.href = element.href.replace(linkReg, replacement);
            }
        }
    }
}
process("ajax.googleapis.com", "ajax.useso.com", "script");
process("fonts.googleapis.com", "fonts.useso.com", "link");
