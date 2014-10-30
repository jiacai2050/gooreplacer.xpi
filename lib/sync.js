var {Cc, Ci} = require("chrome");
const nsIFilePicker = Ci.nsIFilePicker;


function pick(caption, mode) {
    var window = require("sdk/window/utils").getMostRecentBrowserWindow();
    var fp = Cc["@mozilla.org/filepicker;1"]
                .createInstance(nsIFilePicker);

    fp.init(window, caption, mode);

    fp.defaultExtension = ".json";
    fp.defaultString = "gooreplacer.json";

    
    fp.appendFilter("gooreplacerFiles","*.json");
    if (fp.show() == nsIFilePicker.returnCancel) {
        return null;
    }
    return fp.file;
}
function importRules() {
    var file = pick("导入", nsIFilePicker.modeOpen);
    if (!file) {
        return;
    };
    var f = Cc["@mozilla.org/file/local;1"]
                .createInstance(Ci.nsILocalFile);
    f.initWithPath(file);
    var inStream = Cc["@mozilla.org/network/file-input-stream;1"]           
                    .createInstance(Ci.nsIFileInputStream);
    // open for reading
    inStream.init(f, 0x01, 0444, 0);
    var converter = Cc["@mozilla.org/intl/converter-input-stream;1"].
                        createInstance(Ci.nsIConverterInputStream);

    converter.init(inStream, "UTF-8", 10240, Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
    var str = {};
    var json = '';
    while (converter.readString(4096, str) != 0) {
        json += str.value;
    }
    converter.close();
    console.log(json); 
}
function exportRules() {
    var file = pick("导出", nsIFilePicker.modeSave);
    if (!file) {
        return;
    };
    var outStream = Cc["@mozilla.org/network/file-output-stream;1"].
               createInstance(Ci.nsIFileOutputStream);

    // use 0x02 | 0x10 to open file for appending.
    // write, create, truncate
    // In a c file operation, we have no need to set file mode with or operation,
    // directly using "r" or "w" usually.

    outStream.init(file, 0x02 | 0x08 | 0x20, 0666, 0); 

    var converter = Cc["@mozilla.org/intl/converter-output-stream;1"].
                createInstance(Ci.nsIConverterOutputStream);
    converter.init(outStream, "UTF-8", 10240, Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
    converter.writeString("data");
    converter.close();

}

exports.importRules = importRules;
exports.exportRules = exportRules;