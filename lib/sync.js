const {Cc, Ci} = require("chrome");
const nsIFilePicker = Ci.nsIFilePicker;
const fileIO = require("sdk/io/file");

var prefs = require("sdk/simple-prefs").prefs;
var db = require("./db").db;


function pick(caption, mode) {
    var window = require("sdk/window/utils").getMostRecentBrowserWindow();
    var fp = Cc["@mozilla.org/filepicker;1"]
                .createInstance(nsIFilePicker);

    fp.init(window, caption, mode);
    if (mode == nsIFilePicker.modeSave) {
        fp.defaultString = "gooreplacer.gson";    
    };
    fp.defaultExtension = "gson";
    
    if (prefs.defaultDir) {
        var dir = Cc["@mozilla.org/file/local;1"].
                    createInstance(Ci.nsILocalFile);
        dir.initWithPath(prefs.defaultDir);
        fp.displayDirectory = dir;
    };
    
    fp.appendFilter("gooreplacer rules (*.gson)","*.gson");

    if (fp.show() == nsIFilePicker.returnCancel) {
        return null;
    }
    
    prefs.defaultDir = fileIO.dirname(fp.file.path);
    
    return fp.file;
}
function importRules() {
    var file = pick("导入...", nsIFilePicker.modeOpen);
    if (!file) {
        return;
    };
    var inStream = Cc["@mozilla.org/network/file-input-stream;1"]           
                    .createInstance(Ci.nsIFileInputStream);

    var MODE_RDONLY = 0x01;
    inStream.init(file, MODE_RDONLY, 0444, 0);

    var converter = Cc["@mozilla.org/intl/converter-input-stream;1"].
                        createInstance(Ci.nsIConverterInputStream);

    converter.init(inStream, "UTF-8", 8192, Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
    var str = {};
    var gson = '';
    while (converter.readString(4096, str) != 0) {
        gson += str.value;
    }
    converter.close();
    db.add(JSON.parse(gson).rules);

}
function exportRules() {
    var file = pick("导出...", nsIFilePicker.modeSave);
    if (!file) {
        return;
    };
    var outStream = Cc["@mozilla.org/network/file-output-stream;1"].
               createInstance(Ci.nsIFileOutputStream);
    /*
    https://developer.mozilla.org/docs/Mozilla/JavaScript_code_modules/FileUtils.jsm#Constants
    */
    var MODE_WRONLY = 0x02;
    var MODE_CREATE = 0x08;
    var MODE_TRUNCATE = 0x20;
    outStream.init(file, MODE_WRONLY | MODE_CREATE | MODE_TRUNCATE, 0444, 0); 

    var converter = Cc["@mozilla.org/intl/converter-output-stream;1"].
                createInstance(Ci.nsIConverterOutputStream);
    converter.init(outStream, "UTF-8", 8192, Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
    var gson = {
        createBy: "http://liujiacai.net/gooreplacer/",
        createAt: new Date(), 
        rules: db.select()
    };
    converter.writeString(JSON.stringify(gson,null,5));
    converter.close();

}

exports.importRules = importRules;
exports.exportRules = exportRules;